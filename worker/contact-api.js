import { handleContact, handleOptions, json } from "./contact-shared.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/api/contact") {
      return json(
        request,
        {
          ok: false,
          error: "Not found.",
        },
        404,
      );
    }

    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }

    if (request.method !== "POST") {
      return json(
        request,
        {
          ok: false,
          error: "Method not allowed.",
        },
        405,
      );
    }

    return handleContact(request, env);
  },
};
