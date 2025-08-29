export interface Env {
  ALLOWED_ORIGIN: string
  LA: Fetcher
  SD_SAC: Fetcher
  WAIT: Fetcher
}

function cors(h: Headers, origin: string) {
  h.set("Access-Control-Allow-Origin", origin || "*");
  h.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  h.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  h.set("Vary", "Origin");
  return h;
}

const json = (data: unknown, origin: string, status = 200) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: cors(new Headers({"content-type":"application/json; charset=utf-8"}), origin)
  });

export default {
  async fetch(req: Request, env: Env) {
    const u = new URL(req.url);
    const origin = env.ALLOWED_ORIGIN || "*";

    if (req.method === "OPTIONS") {
      return new Response("", { headers: cors(new Headers(), origin) });
    }

    if (u.pathname === "/health") {
      return json({ ok:true, worker:"core"}, origin);
    }

    if (u.pathname === "/routes") {
      return json({
        ok: true,
        routes: [
          "/health",
          "/routes",
          // LA shard:
          "/weho/recent", "/beverlyhills/recent", "/palisades/recent", "/altadena/recent",
          // SD_SAC shard:
          "/sandiego/recent", "/sacramento/recent",
          // waitlist:
          "/subscribe"
        ]
      }, origin);
    }

    // Dispatch to shards:
    const p = u.pathname;
    const forward = async (svc: Fetcher) => svc.fetch(new Request(new URL(p, "https://internal"), req));

    if (p.startsWith("/weho/") || p.startsWith("/beverlyhills/") || p.startsWith("/palisades/") || p.startsWith("/altadena/")) {
      return forward(env.LA);
    }
    if (p.startsWith("/sandiego/") || p.startsWith("/sacramento/")) {
      return forward(env.SD_SAC);
    }
    if (p === "/subscribe") {
      return forward(env.WAIT);
    }

    return json({ ok:false, error:"not_found", path:p, hint:"See /routes" }, origin, 404);
  }
} satisfies ExportedHandler<Env>;
