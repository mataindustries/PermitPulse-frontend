// src/components/SubscribeForm.tsx
import { useState } from "react";
import { api } from "../lib/api";

export default function SubscribeForm({
  defaultArea = "weho",
  }: {
    defaultArea?: string;
    }) {
      const [email, setEmail] = useState("");
        const [phone, setPhone] = useState("");
          const [area, setArea] = useState(defaultArea);
            const [status, setStatus] = useState<null | string>(null);
              const [loading, setLoading] = useState(false);

                async function submit(e: React.FormEvent) {
                    e.preventDefault();
                        setLoading(true);
                            setStatus(null);
                                try {
                                      const res = await api.subscribe({
                                              email: email || undefined,
                                                      phone: phone || undefined,
                                                              area,
                                                                    });
                                                                          if (!res.ok) throw new Error(res.error || "Subscribe failed");
                                                                                setStatus("Thanks! You’re on the list.");
                                                                                      setEmail("");
                                                                                            setPhone("");
                                                                                                } catch (err: any) {
                                                                                                      setStatus(err.message || "Error");
                                                                                                          } finally {
                                                                                                                setLoading(false);
                                                                                                                    }
                                                                                                                      }

                                                                                                                        return (
                                                                                                                            <form onSubmit={submit} className="card">
                                                                                                                                  <h3>Get new permit alerts</h3>
                                                                                                                                        <label>
                                                                                                                                                Area
                                                                                                                                                        <select value={area} onChange={(e) => setArea(e.target.value)}>
                                                                                                                                                                  <option value="weho">West Hollywood</option>
                                                                                                                                                                            <option value="beverlyhills">Beverly Hills</option>
                                                                                                                                                                                      <option value="palisades">Pacific Palisades</option>
                                                                                                                                                                                                <option value="altadena">Altadena</option>
                                                                                                                                                                                                          <option value="combined">LA City + County</option>
                                                                                                                                                                                                                    <option value="all">All</option>
                                                                                                                                                                                                                            </select>
                                                                                                                                                                                                                                  </label>
                                                                                                                                                                                                                                        <label>
                                                                                                                                                                                                                                                Email (optional)
                                                                                                                                                                                                                                                        <input
                                                                                                                                                                                                                                                                  type="email"
                                                                                                                                                                                                                                                                            placeholder="you@example.com"
                                                                                                                                                                                                                                                                                      value={email}
                                                                                                                                                                                                                                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                                                              </label>
                                                                                                                                                                                                                                                                                                                    <label>
                                                                                                                                                                                                                                                                                                                            Phone (optional)
                                                                                                                                                                                                                                                                                                                                    <input
                                                                                                                                                                                                                                                                                                                                              type="tel"
                                                                                                                                                                                                                                                                                                                                                        placeholder="555-123-4567"
                                                                                                                                                                                                                                                                                                                                                                  value={phone}
                                                                                                                                                                                                                                                                                                                                                                            onChange={(e) => setPhone(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                                                                                                                                          </label>
                                                                                                                                                                                                                                                                                                                                                                                                <button disabled={loading}>{loading ? "Saving…" : "Subscribe"}</button>
                                                                                                                                                                                                                                                                                                                                                                                                      {status && <p className="status">{status}</p>}
                                                                                                                                                                                                                                                                                                                                                                                                            <p className="muted">
                                                                                                                                                                                                                                                                                                                                                                                                                    You’ll get occasional alerts for your selected area(s). Unsubscribe
                                                                                                                                                                                                                                                                                                                                                                                                                            anytime.
                                                                                                                                                                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                                                                                                                                                                      </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                                        }