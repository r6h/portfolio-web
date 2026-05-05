const ALLOWED_TYPES = new Set(["backend", "security", "prototype", "other"]);

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

const trimOrEmpty = (value) =>
  typeof value === "string" ? value.trim() : "";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const clamp = (value, max) => value.slice(0, max);

async function handleContact(request, env) {
  const db = env.CONTACTS_DB;

  if (!db) {
    return json(
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
      {
        ok: false,
        error: "Request body must be valid JSON.",
      },
      400,
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json(
      {
        ok: false,
        error: "Invalid contact payload.",
      },
      400,
    );
  }

  const honeypot = trimOrEmpty(body.honeypot);
  if (honeypot) {
    return json({ ok: true }, 200);
  }

  const name = clamp(trimOrEmpty(body.name), 120);
  const email = clamp(trimOrEmpty(body.email), 254);
  const type = clamp(trimOrEmpty(body.type), 40);
  const typeLabel = clamp(trimOrEmpty(body.typeLabel) || type, 120);
  const message = clamp(trimOrEmpty(body.message), 4000);

  if (!name || !email || !type || !message) {
    return json(
      {
        ok: false,
        error: "All fields are required.",
      },
      400,
    );
  }

  if (!ALLOWED_TYPES.has(type)) {
    return json(
      {
        ok: false,
        error: "Unsupported inquiry type.",
      },
      400,
    );
  }

  if (!isValidEmail(email)) {
    return json(
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

  return json({ ok: true }, 201);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return json(
          {
            ok: false,
            error: "Method not allowed.",
          },
          405,
        );
      }

      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
