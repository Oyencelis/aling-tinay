import { site } from "@/data/site";
import RevealText from "../RevealText";
import OrderForm from "../OrderForm";
import { Peanut } from "../characters/Characters";

export default function Visit() {
  const { address, hours, contact } = site;

  return (
    <section id="visit" aria-labelledby="visit-title" className="relative overflow-hidden bg-cream py-20 text-ink md:py-28">
      <div className="edge">
        <div className="flex items-center justify-between border-b border-ink/15 pb-4">
          <p className="kicker text-brown/55">( 07 — Bisita )</p>
          <p className="kicker flex items-center gap-2 text-brown/55">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-pandan" aria-hidden="true" />
            Bukas araw-araw
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <RevealText
              className="display text-[clamp(46px,8.6vw,124px)]"
              stagger={0.1}
              lines={[
                <>Sige,</>,
                <>tikim ka</>,
                <span key="na" className="text-chili">
                  na.
                </span>,
              ]}
            />
            <p className="mt-6 max-w-[38ch] text-[13.5px] leading-relaxed text-brown/70">
              Nasa kanto lang kami. Pumasok ka, tanungin mo kung ano ang bagong luto —
              sasagutin ka ni Aling Tinay nang detalyado, kahit hindi mo tinanong.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <div className="rotate-[1.5deg] border-2 border-ink bg-corn p-4 shadow-sticker">
              <p className="kicker text-ink/60">Walk-in o pick-up</p>
              <p className="mt-2 text-[15px] leading-snug">
                Mas mabilis kung mag-message ka muna. Ipapack namin habang papunta ka.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <div id="contact">
              <h3 className="kicker text-brown/50">Puntahan</h3>
              <address className="mt-3 not-italic">
                <p className="text-[17px] font-medium leading-snug">{address.line1}</p>
                <p className="text-[17px] font-medium leading-snug">{address.line2}</p>
                <p className="text-[17px] font-medium leading-snug">{address.region}</p>
                <p className="mt-2 text-[11.5px] leading-relaxed text-brown/55">{address.landmark}</p>
              </address>

              <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden border-2 border-ink bg-[#E9DCC6]">
                {address.mapEmbedUrl ? (
                  <iframe
                    title="Mapa ng Aling Tinay Peanut Store"
                    src={address.mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                ) : (
                  <div
                    className="relative flex h-full w-full flex-col items-center justify-center gap-2 text-center"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(59,35,20,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(59,35,20,.12) 1px, transparent 1px)",
                      backgroundSize: "34px 34px",
                    }}
                  >
                    <Peanut className="h-10 w-10" />
                    <p className="kicker text-brown/70">Map embed</p>
                    <p className="max-w-[30ch] px-4 text-[10.5px] leading-relaxed text-brown/50">
                      Ilagay ang Google Maps embed URL sa{" "}
                      <code className="bg-brown/10 px-1">address.mapEmbedUrl</code> sa{" "}
                      <code className="bg-brown/10 px-1">data/site.ts</code>.
                    </p>
                  </div>
                )}
              </div>

              <a
                href={address.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brown/70 underline decoration-ink/20 underline-offset-4 hover:decoration-chili"
                data-cursor="grow"
              >
                Buksan sa Google Maps
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                  <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <div className="mt-7">
                <h3 className="kicker text-brown/50">Oras</h3>
                <dl className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
                  {hours.map((row) => (
                    <div key={row.day} className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-[13px] font-medium">{row.day}</dt>
                      <dd className="text-[12px] tabular-nums text-brown/65">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-7">
                <h3 className="kicker text-brown/50">Usap tayo</h3>
                <ul className="mt-3 space-y-1.5">
                  <li>
                    <a href={contact.phoneHref} className="group flex items-baseline justify-between gap-3 border-b border-ink/10 py-1.5" data-cursor="grow">
                      <span className="text-[12px] text-brown/55">Telepono</span>
                      <span className="text-[13px] font-medium underline decoration-ink/20 underline-offset-4 group-hover:decoration-chili">
                        {contact.phone}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={contact.messengerUrl} target="_blank" rel="noreferrer" className="group flex items-baseline justify-between gap-3 border-b border-ink/10 py-1.5" data-cursor="grow">
                      <span className="text-[12px] text-brown/55">Messenger</span>
                      <span className="text-[13px] font-medium underline decoration-ink/20 underline-offset-4 group-hover:decoration-chili">
                        {contact.messengerLabel}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={contact.facebookUrl} target="_blank" rel="noreferrer" className="group flex items-baseline justify-between gap-3 border-b border-ink/10 py-1.5" data-cursor="grow">
                      <span className="text-[12px] text-brown/55">Facebook</span>
                      <span className="text-[13px] font-medium underline decoration-ink/20 underline-offset-4 group-hover:decoration-chili">
                        {contact.facebookLabel}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${contact.email.replace(/[[\]]/g, "")}`} className="group flex items-baseline justify-between gap-3 border-b border-ink/10 py-1.5" data-cursor="grow">
                      <span className="text-[12px] text-brown/55">Email</span>
                      <span className="text-[13px] font-medium underline decoration-ink/20 underline-offset-4 group-hover:decoration-chili">
                        {contact.email}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <OrderForm />
            <p className="mt-6 max-w-[34ch] text-[11px] leading-relaxed text-brown/55">
              Para sa bulk orders (handaan, paluwagan ng office, birthday ng pinsan),
              mag-message ng mas maaga. Sinesetyahan namin ang batch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
