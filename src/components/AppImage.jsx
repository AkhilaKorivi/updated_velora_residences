import { useState } from "react";
import clsx from "clsx";

export function AppImage({ src, alt, className, imgClassName, sizes = "100vw", onLoad, ...rest }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const srcset = `${src} 480w, ${src.replace(/w=\d+/, "w=900")} 900w, ${src.replace(/w=\d+/, "w=1400")} 1400w`;

  return (
    <div className={clsx("relative overflow-hidden", className)} {...rest}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-graphite">
          <span className="h-10 w-px animate-pulse bg-gold/70" />
        </div>
      )}
      <img
        src={errored ? fallback : src}
        srcSet={errored ? undefined : srcset}
        sizes={errored ? undefined : sizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={() => setErrored(true)}
        className={clsx(
          "h-full w-full object-cover transition-all duration-1000",
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
          imgClassName
        )}
      />
    </div>
  );
}

const fallback =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#16140f'/><stop offset='1' stop-color='#211f1a'/></linearGradient></defs><rect width='1200' height='800' fill='url(#g)'/><text x='600' y='410' font-family='Georgia,serif' font-size='34' fill='#b3965c' text-anchor='middle'>VELORA</text><text x='600' y='450' font-family='Arial' font-size='14' letter-spacing='6' fill='#8f8980' text-anchor='middle'>RESIDENCES</text></svg>`
  );