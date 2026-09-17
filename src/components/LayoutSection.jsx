import { ImageIcon, ArrowLeftRight } from "lucide-react";
import { layout } from "../config";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./Reveal";

export default function LayoutSection() {
  const { image, caption } = layout;

  return (
    <section id="layout" aria-label="Whole apartment layout" className="relative bg-ink py-24 sm:py-32">
      <div className="container-lux">
        <SectionHeading
          align="center"
          eyebrow="Apartment Layout"
          title={
            <>
              The whole residence,
              <span className="italic text-gold-light"> in plan</span>
            </>
          }
          description="A complete overview of the apartment — every room, every view, in one frame."
        />
      </div>

      <div className="container-lux mt-12">
        {image ? (
          <Reveal>
            <figure className="relative overflow-hidden border border-line bg-charcoal">
              <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-8">
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-lux text-gold">
                  <ArrowLeftRight className="h-4 w-4" aria-hidden="true" /> {caption}
                </span>
                <span className="text-[10px] uppercase tracking-lux text-mist">Not to scale</span>
              </div>
              <div className="relative">
                <img
                  src={image}
                  alt="Whole-apartment layout of Velora Residences"
                  loading="lazy"
                  className="h-auto w-full object-contain"
                />
              </div>
            </figure>
          </Reveal>
        ) : (
          <Reveal>
            <div className="flex min-h-[420px] flex-col items-center justify-center border border-dashed border-line bg-charcoal/60 p-10 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                <ImageIcon className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="h-display mt-7 text-2xl text-smoke">Apartment layout image</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
                Share the layout image link and it will be displayed here, side by side with the
                interactive floor plans.
              </p>
              <p className="mt-5 text-[11px] uppercase tracking-lux text-gold">
                Image link pending
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}