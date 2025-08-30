// @ts-nocheck
import React, { useState } from "react";
import WaitlistModal from "../components/WaitlistModal";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistDefaultCity] = useState<string | undefined>(undefined);

  return (
    <main className="p-6 text-slate-100">
      <header className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">PermitPulse</h1>
        <p className="opacity-80">
          California rollout in-progress — San Diego & Sacramento next.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button
            id="cta-waitlist"
            onClick={() => setWaitlistOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Join Waitlist
          </button>
          <a
            href="/pricing"
            className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600"
          >
            Upgrade to Pro
          </a>
        </div>
      </header>

      <section className="max-w-5xl mx-auto mt-10">
        <p className="opacity-70">
          This is a simplified Home screen while we wire up the waitlist flow.
        </p>
      </section>

      <WaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        defaultCity={waitlistDefaultCity}
      />
    </main>
  );
}
