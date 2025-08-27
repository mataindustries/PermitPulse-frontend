import React, { useState } from 'react';

export default function WaitlistModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const close = () => { if (typeof onClose === 'function') onClose(); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[92%] max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-5 text-zinc-100 shadow-xl">
        <h3 className="mb-2 text-lg font-semibold">Join the waitlist</h3>
        <p className="mb-4 text-sm text-zinc-400">We’ll email you as we add more cities.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // (Waitlist POST wired later)
            setStatus('ok');
          }}
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="you@example.com"
            className="mb-3 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm outline-none placeholder:text-zinc-500"
          />
          <div className="flex gap-2">
            <button type="submit" className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium">
              Notify me
            </button>
            <button type="button" onClick={close} className="rounded-md border border-zinc-700 px-3 py-2 text-sm">
              Close
            </button>
          </div>
        </form>

        {status === 'ok' && (
          <p className="mt-3 text-emerald-400 text-sm">Thanks! You’re on the list.</p>
        )}
      </div>
    </div>
  );
}
