const ALLOWED_TYPES = new Set(["backend", "security", "prototype", "other"]);
const ALLOWED_ORIGINS = new Set([
  "https://roger.ac",
  "https://www.roger.ac",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

const trimOrEmpty = (value) =>
  typeof value === "string" ? value.trim() : "";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const clamp = (value, max) => value.slice(0, max);

const buildCorsHeaders = (request) => {
  const origin = request.headers.get("origin");
  const headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
};

export const json = (request, data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...buildCorsHeaders(request),
    },
  });

export const handleOptions = (request) =>
  new Response(null, {
    status: 204,
    headers: buildCorsHeaders(request),
  });

export const handleContact = async (request, env) => {
  const db = env.CONTACTS_DB;

  if (!db) {
    return json(
      request,
      {
        ok: false,
        error: "Contact storage is not configured yet.",
      },
      503,
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(
      request,
      {
        ok: false,
        error: "Request body must be valid JSON.",
      },
      400,
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json(
      request,
      {
        ok: false,
        error: "Invalid contact payload.",
      },
      400,
    );
  }

  const name = clamp(trimOrEmpty(body.name), 120);
  const email = clamp(trimOrEmpty(body.email), 254);
  const type = clamp(trimOrEmpty(body.type), 40);
  const typeLabel = clamp(trimOrEmpty(body.typeLabel) || type, 120);
  const message = clamp(trimOrEmpty(body.message), 4000);

  if (!name || !email || !type || !message) {
    return json(
      request,
      {
        ok: false,
        error: "All fields are required.",
      },
      400,
    );
  }

  if (!ALLOWED_TYPES.has(type)) {
    return json(
      request,
      {
        ok: false,
        error: "Unsupported inquiry type.",
      },
      400,
    );
  }

  if (!isValidEmail(email)) {
    return json(
      request,
      {
        ok: false,
        error: "Email address is not valid.",
      },
      400,
    );
  }

  try {
    await db
      .prepare(
        `
        INSERT INTO contact_submissions (
          name,
          email,
          project_type,
          project_type_label,
          message,
          referrer,
          user_agent
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .bind(
        name,
        email,
        type,
        typeLabel,
        message,
        clamp(trimOrEmpty(request.headers.get("referer")), 500) || null,
        clamp(trimOrEmpty(request.headers.get("user-agent")), 500) || null,
      )
      .run();
  } catch (error) {
    return json(
      request,
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Could not store the contact submission.",
      },
      500,
    );
  }

  return json(request, { ok: true }, 201);
};
