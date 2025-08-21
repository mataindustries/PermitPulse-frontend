// src/lib/api.ts
export async function fetchPermits(city: string) {
  const res = await fetch(`/api/${city}`);
    if (!res.ok) throw new Error(`Failed to fetch permits for ${city}`);
      return res.json();
      }

      export async function joinWaitlist(city: string, email: string) {
        const res = await fetch(`/waitlist/${city}`, {
            method: "POST",
                headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                      });
                        if (!res.ok) throw new Error(`Failed to join waitlist for ${city}`);
                          return res.json();
                          }