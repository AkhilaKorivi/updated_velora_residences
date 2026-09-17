import { useRef } from "react";
import { MapPin, Phone, Mail, ArrowUp, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { contact, navLinks, socials } from "../config";

const socialIcons = { Instagram, Facebook, Linkedin, Youtube };

const scrollTop = (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export function ScrollToTop() {
  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className="fixed bottom-24 right-4 z-[70] hidden h-11 w-11 items-center justify-center border border-line bg-ink/85 text-smoke backdrop-blur-sm transition-colors hover:border-gold hover:text-gold lg:bottom-8 lg:right-6 lg:flex"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const jump = (href) => (e) => {
    e.preventDefault();
    const el = href === "#top" ? document.body : document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative border-t border-line bg-charcoal" aria-label="Footer">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" aria-hidden="true" />

      <div className="container-lux grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
        <div>
          <a href="#top" onClick={jump("#top")} className="inline-flex items-baseline gap-2" aria-label="Velora Residences — home">
            <span className="h-display text-2xl tracking-[0.18em] text-smoke">VELORA</span>
            <span className="text-[10px] font-medium uppercase tracking-lux text-gold">Residences</span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
            Premium Luxury Residences in Madhapur, Hyderabad. A Life Above Ordinary.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {socials.map((s) => {
              const Icon = socialIcons[s.label] || Instagram;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`Velora Residences on ${s.label}`}
                  className="flex h-10 w-10 items-center justify-center border border-line text-mist transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer quick links">
          <p className="eyebrow mb-5">Explore</p>
          <ul className="space-y-3">
            {navLinks.slice(1).map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={jump(l.href)}
                  className="text-sm text-mist transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-5">Residences</p>
          <ul className="space-y-3 text-sm text-mist">
            <li><a href="#residences" onClick={jump("#residences")} className="transition-colors hover:text-gold">3 BHK · 2600+ Sq.Ft.</a></li>
            <li><a href="#residences" onClick={jump("#residences")} className="transition-colors hover:text-gold">4 BHK · 4000+ Sq.Ft.</a></li>
            <li><a href="#floor-plans" onClick={jump("#floor-plans")} className="transition-colors hover:text-gold">Floor Plans</a></li>
            <li><a href="#amenities" onClick={jump("#amenities")} className="transition-colors hover:text-gold">Amenities</a></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Contact</p>
          <ul className="space-y-4 text-sm text-mist">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {contact.address}
            </li>
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-gold">
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="flex items-center gap-3 transition-colors hover:text-gold">
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-lux flex flex-col items-center justify-between gap-4 py-6 pb-20 text-[11px] uppercase tracking-wide2 text-mist sm:flex-row lg:pb-6">
          <p>
            © {year} Velora Residences. All rights reserved.{" "}
            <span className="normal-case text-mist/60">Sample project website — not an actual development offer.</span>
          </p>
          <div className="flex items-center gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="transition-colors hover:text-gold">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="transition-colors hover:text-gold">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}