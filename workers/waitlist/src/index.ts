export interface Env {
    WL: KVNamespace; // KV binding
    }

    // --- tiny utils ---
    const ALLOW_ORIGINS = new Set([
      "https://getpermitpulse.com",
        "https://www.getpermitpulse.com",
          "http://localhost:5173",
            "http://127.0.0.1:5173",
            ]);
            const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

            const corsHeaders = (req: Request, extra: Record<string, string> = {}) => {
              const origin = req.headers.get("origin") || "";
                const allow = ALLOW_ORIGINS.has(origin) ? origin : "*"; // permissive on dev
                  return {
                      "access-control-allow-origin": allow,
                          "access-control-allow-methods": "POST, GET, OPTIONS",
                              "access-control-allow-headers": "content-type, authorization",
                                  "access-control-max-age": "86400",
                                      ...extra,
                                        };
                                        };

                                        const json = (req: Request, body: any, init: ResponseInit = {}) =>
                                          new Response(JSON.stringify(body, null, 2), {
                                              headers: { ...JSON_HEADERS, ...corsHeaders(req) },
                                                  ...init,
                                                    });

                                                    const emailOk = (e?: string) =>
                                                      !!e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim().toLowerCase());

                                                      // --- request handlers ---
                                                      async function handleSubscribe(req: Request, env: Env) {
                                                        if (req.method !== "POST") {
                                                            return json(req, { ok: false, error: "method_not_allowed" }, { status: 405 });
                                                              }

                                                                let payload: any = {};
                                                                  try {
                                                                      payload = await req.json();
                                                                        } catch {
                                                                            return json(req, { ok: false, error: "invalid_json" }, { status: 400 });
                                                                              }

                                                                                const email = (payload.email || "").trim().toLowerCase();
                                                                                  const city = (payload.city || "").trim();
                                                                                    const utm = payload.utm ?? {};
                                                                                      if (!emailOk(email)) {
                                                                                          return json(req, { ok: false, error: "invalid_email" }, { status: 422 });
                                                                                            }

                                                                                              // dedupe: use one canonical key per email
                                                                                                const key = `email:${email}`;
                                                                                                  const existing = await env.WL.get(key, { type: "json" });

                                                                                                    const now = new Date().toISOString();
                                                                                                      const item = {
                                                                                                          email,
                                                                                                              city: city || null,
                                                                                                                  utm,
                                                                                                                      ip: req.headers.get("cf-connecting-ip") || null,
                                                                                                                          ua: req.headers.get("user-agent") || null,
                                                                                                                              ts: now,
                                                                                                                                  v: 1,
                                                                                                                                    };

                                                                                                                                      if (existing) {
                                                                                                                                          // refresh timestamp/metadata but keep original data
                                                                                                                                              await env.WL.put(key, JSON.stringify({ ...(existing as any), lastSeen: now }));
                                                                                                                                                  return json(req, { ok: true, status: "exists" }, { status: 200 });
                                                                                                                                                    }

                                                                                                                                                      await env.WL.put(key, JSON.stringify(item));
                                                                                                                                                        return json(req, { ok: true, status: "subscribed" }, { status: 201 });
                                                                                                                                                        }

                                                                                                                                                        function handleHealth(req: Request) {
                                                                                                                                                          return json(req, { ok: true, worker: "pp-waitlist", ts: new Date().toISOString() });
                                                                                                                                                          }

                                                                                                                                                          export default {
                                                                                                                                                            async fetch(req: Request, env: Env): Promise<Response> {
                                                                                                                                                                const url = new URL(req.url);
                                                                                                                                                                    const p = url.pathname;

                                                                                                                                                                        // CORS preflight
                                                                                                                                                                            if (req.method === "OPTIONS") {
                                                                                                                                                                                  return new Response(null, {
                                                                                                                                                                                          status: 204,
                                                                                                                                                                                                  headers: corsHeaders(req, { "content-length": "0" }),
                                                                                                                                                                                                        });
                                                                                                                                                                                                            }

                                                                                                                                                                                                                if (p === "/health") return handleHealth(req);
                                                                                                                                                                                                                    if (p === "/subscribe") return handleSubscribe(req, env);

                                                                                                                                                                                                                        // simple docs/index
                                                                                                                                                                                                                            if (p === "/" || p === "/routes") {
                                                                                                                                                                                                                                  return json(req, {
                                                                                                                                                                                                                                          ok: true,
                                                                                                                                                                                                                                                  routes: ["/health", "/subscribe"],
                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                return json(req, { ok: false, error: "not_found" }, { status: 404 });
                                                                                                                                                                                                                                                                  },
                                                                                                                                                                                                                                                                  };
}