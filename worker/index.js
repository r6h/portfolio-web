import { handleContact, handleOptions, json } from "./contact-shared.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
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
    }

    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    if (
      request.method !== "GET" &&
      request.method !== "HEAD"
    ) {
      return assetResponse;
    }

    if (/\/[^/]+\.[^/]+$/.test(url.pathname)) {
      return assetResponse;
    }

    const indexRequest = new Request(new URL("/index.html", request.url), request);
    return env.ASSETS.fetch(indexRequest);
  },
};
