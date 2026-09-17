import { Phone, MessageCircle, PenLine } from "lucide-react";
import { contact } from "../config";
import { useEnquiry } from "./EnquiryContext";

export default function ContactCTA() {
  const { openEnquiry } = useEnquiry();

  return (
    <>
      <div className="fixed right-0 top-1/2 z-[80] hidden -translate-y-1/2 flex-col items-end lg:flex">
        <button
          type="button"
          onClick={() => openEnquiry()}
          className="group flex items-center gap-2 bg-gold py-3 pl-3 pr-4 text-[11px] font-medium uppercase tracking-lux text-ink transition-all duration-300 hover:bg-gold-light"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ink/70" />
          </span>
          Enquire Now
        </button>
        <a
          href={contact.phoneHref}
          aria-label={`Call ${contact.phone}`}
          className="mt-px flex items-center justify-center gap-2 border-r border-l border-line bg-ink/85 px-4 py-3 text-gold backdrop-blur-sm transition-colors hover:bg-graphite"
        >
          <Phone className="h-4 w-4" />
        </a>
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex items-center justify-center gap-2 border-r border-l border-t border-line bg-ink/85 px-4 py-3 text-gold backdrop-blur-sm transition-colors hover:bg-graphite"
        >
          <MessageCircle className="h-4 w-4" />
        </a>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-[80] grid grid-cols-3 border-t border-line bg-ink/95 backdrop-blur-lg lg:hidden">
        <a href={contact.phoneHref} className="flex items-center justify-center gap-2 py-4 text-[11px] font-medium uppercase tracking-lux text-smoke">
          <Phone className="h-4 w-4 text-gold" aria-hidden="true" /> Call
        </a>
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 border-x border-line py-4 text-[11px] font-medium uppercase tracking-lux text-smoke"
        >
          <MessageCircle className="h-4 w-4 text-gold" aria-hidden="true" /> WhatsApp
        </a>
        <button
          type="button"
          onClick={() => openEnquiry()}
          className="flex items-center justify-center gap-2 bg-gold py-4 text-[11px] font-semibold uppercase tracking-lux text-ink"
        >
          <PenLine className="h-4 w-4" aria-hidden="true" /> Enquire
        </button>
      </div>
    </>
  );
}