"use client";

import { useState } from "react";
import { site } from "@/data/site";

const recipient = site.contact.formRecipient.replace(/[[\]]/g, "");

export default function OrderForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(
    `Order / tanong mula kay ${name || "isang gutom"}`
  )}&body=${encodeURIComponent(`${message}\n\n— ${name}`)}`;

  return (
    <div id="order" className="relative">
      <div className="absolute -top-4 left-5 z-10 rotate-[-3deg] border-2 border-ink bg-corn px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-ink shadow-[2px_3px_0_0_#1A1210]">
        Order / tanong
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim() || !message.trim()) return;
          window.location.href = mailto;
          setSent(true);
        }}
        className="border-2 border-ink bg-ink p-5 text-cream shadow-[8px_9px_0_0_#D93A25] sm:p-7"
      >
        <p className="kicker text-cream/45">Sabihin mo lang</p>
        <h3 className="display mt-2 text-[clamp(26px,3vw,38px)] leading-none">
          Ano ang gusto mong tikman?
        </h3>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="kicker block text-cream/55">Pangalan</span>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aling Nena"
              className="mt-2 w-full border-b-2 border-cream/30 bg-transparent pb-2 text-[15px] text-cream placeholder:text-cream/25 focus:border-corn focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="kicker block text-cream/55">Mensahe</span>
            <textarea
              name="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tatlong supot ng mani at isang cornick, please. Kunin ko bukas ng hapon."
              className="mt-2 w-full resize-none border-b-2 border-cream/30 bg-transparent pb-2 text-[15px] leading-relaxed text-cream placeholder:text-cream/25 focus:border-corn focus:outline-none"
            />
          </label>
        </div>

        <button
          type="submit"
          className="btn-ink mt-6 w-full justify-center border-ink bg-corn text-ink hover:bg-cream"
          data-cursor="grow"
        >
          Ipadala ang mensahe
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
            <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <p className="mt-3 text-[10.5px] leading-relaxed text-cream/45">
          Walang backend ito — bubuksan ang email app mo. Puwede rin direktang mag-message sa{" "}
          <a href={site.contact.messengerUrl} className="underline decoration-cream/30 underline-offset-2 hover:text-corn" data-cursor="grow">
            Messenger
          </a>
          .
        </p>

        <p aria-live="polite" className="mt-3 min-h-[1.2em] text-[11px] font-bold text-corn">
          {sent ? "Nabuksan na ang email app mo. Salamat!" : ""}
        </p>
      </form>
    </div>
  );
}
