import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  RotateCcw,
  MousePointerClick,
  Ruler,
} from "lucide-react";
import clsx from "clsx";
import { floorplans, roomNotes } from "../data/floorplans";
import { usePlan } from "./PlanContext";

const typeColors = {
  bedroom: { stroke: "#d3bd8f", fill: "rgba(179,150,92,0.12)" },
  bath: { stroke: "#8f8980", fill: "rgba(143,137,128,0.14)" },
  kitchen: { stroke: "#e4dcc9", fill: "rgba(228,220,201,0.08)" },
  living: { stroke: "#cdc3ab", fill: "rgba(205,195,171,0.10)" },
  utility: { stroke: "#6f6a62", fill: "rgba(111,106,98,0.14)" },
  outdoor: { stroke: "#7f9a91", fill: "rgba(127,154,145,0.12)" },
};

const MIN_ZOOM = 0.7;
const MAX_ZOOM = 2.6;

export default function FloorPlanViewer() {
  const { plan, selectPlan } = usePlan();
  const idx = useMemo(() => floorplans.findIndex((f) => f.type === plan), [plan]);
  const active = floorplans[idx < 0 ? 0 : idx];

  const [selectedId, setSelectedId] = useState("master");
  const [zoom, setZoom] = useState(1);
  const [fs, setFs] = useState(false);
  const [hover, setHover] = useState(null);

  const containerRef = useRef(null);
  const svgRef = useRef(null);

  const selected = active.rooms.find((r) => r.id === selectedId);

  useEffect(() => {
    setSelectedId("master");
    setZoom(1);
  }, [plan]);

  useEffect(() => {
    const onFsChange = () => setFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const downloadSvg = () => {
    const node = svgRef.current;
    if (!node) return;
    const clone = node.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
      type: "image/svg+xml",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `velora-${active.type.replace(" ", "-").toLowerCase()}-floorplan.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fit = fs ? 1.5 : 0.9;
  const scale = zoom * fit;
  const frameW = active.svgW * scale;
  const frameH = active.svgH * scale;

  return (
    <section id="floor-plans" className="relative bg-ink py-24 sm:py-32">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <span className="eyebrow">Floor Plans</span>
            </div>
            <h2 className="h-display text-4xl leading-[1.1] text-smoke sm:text-5xl">
              Plan your
              <span className="italic text-gold-light"> life</span>, room by room
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mist">
            Click any room to explore it. Plans are schematic and not to scale — indicative only.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1 border border-line">
            {floorplans.map((f) => (
              <button
                key={f.type}
                type="button"
                onClick={() => selectPlan(f.type)}
                className={clsx(
                  "px-6 py-3 text-xs font-light uppercase tracking-lux transition-colors",
                  f.type === plan ? "bg-gold text-ink" : "text-smoke/70 hover:text-gold"
                )}
                aria-pressed={f.type === plan}
              >
                {f.type}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="mr-2 text-[10px] uppercase tracking-lux text-mist">
              {active.area} · Not to scale
            </span>
            <button type="button" className="btn-lux border border-line px-4 py-2.5 text-xs text-smoke/80 hover:border-gold hover:text-gold" onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - 0.2))} aria-label="Zoom out"><ZoomOut className="h-4 w-4" /></button>
            <button type="button" className="btn-lux border border-line px-4 py-2.5 text-xs text-smoke/80 hover:border-gold hover:text-gold" onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.2))} aria-label="Zoom in"><ZoomIn className="h-4 w-4" /></button>
            <button type="button" className="btn-lux border border-line px-4 py-2.5 text-xs text-smoke/80 hover:border-gold hover:text-gold" onClick={() => setZoom(1)} aria-label="Reset zoom"><RotateCcw className="h-4 w-4" /></button>
            <button type="button" className="btn-lux border border-line px-4 py-2.5 text-xs text-smoke/80 hover:border-gold hover:text-gold" onClick={downloadSvg} aria-label="Download floor plan"><Download className="h-4 w-4" /></button>
            <button type="button" className="btn-lux border border-line px-4 py-2.5 text-xs text-smoke/80 hover:border-gold hover:text-gold" onClick={toggleFullscreen} aria-label={fs ? "Exit fullscreen" : "Open fullscreen"}>
              {fs ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative mt-6 overflow-auto bg-[linear-gradient(135deg,#191713,#100f0d)] p-6 sm:p-10"
          style={
            fs
              ? { position: "fixed", inset: 0, zIndex: 200, background: "#0e0d0b" }
              : undefined
          }
        >
          <motion.div
            className="mx-auto"
            style={{
              width: frameW,
              minWidth: fs ? undefined : "520px",
              minHeight: frameH,
            }}
            animate={{ width: frameW, height: frameH }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 ${active.svgW} ${active.svgH}`}
              className="block h-full w-full"
              role="img"
              aria-label={`${active.type} floor plan — click rooms to explore`}
            >
              <rect x="18" y="12" width={active.svgW - 36} height={active.svgH - 30} rx="10" fill="rgba(22,20,15,0.75)" stroke="rgba(244,240,232,0.18)" strokeWidth="3" />
              <text x="24" y="34" fill="#8f8980" fontSize="13" letterSpacing="4">
                VELORA RESIDENCES · {active.type.toUpperCase()} · INDICATIVE PLAN
              </text>
              {active.rooms.map((room) => {
                const c = typeColors[room.type];
                const isSel = selectedId === room.id;
                const isHover = hover === room.id;
                const cxm = room.x + room.w / 2;
                const cym = room.y + room.h / 2;
                const fontSize = room.w < 120 ? 15 : 18;
                return (
                  <g
                    key={room.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHover(room.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setSelectedId(room.id)}
                    data-cursor="view"
                  >
                    <title>{room.name}</title>
                    <rect x={room.x} y={room.y} width={room.w} height={room.h} rx="6"
                      fill={isSel ? "rgba(179,150,92,0.30)" : isHover ? c.fill : "rgba(255,255,255,0.02)"}
                      stroke={isSel ? "#b3965c" : isHover ? "#d3bd8f" : c.stroke}
                      strokeWidth={isSel ? 3 : 1.5}
                      style={{ transition: "fill .25s, stroke .25s" }}
                    />
                    {room.type === "kitchen" && room.w > 90 && (
                      <g opacity="0.55" aria-hidden="true">
                        <circle cx={room.x + 24} cy={room.y + 24} r="9" fill="none" stroke="#e4dcc9" strokeWidth="1.5" />
                        <circle cx={room.x + 48} cy={room.y + 24} r="9" fill="none" stroke="#e4dcc9" strokeWidth="1.5" />
                        <rect x={room.x + room.w - 66} y={room.y + 26} width="50" height="44" rx="3" fill="rgba(228,220,201,0.12)" stroke="#e4dcc9" strokeWidth="1.2" />
                      </g>
                    )}
                    <text x={cxm} y={cym - (room.w < 120 ? 2 : 7)} fill={room.type === "outdoor" ? "#bfd0ca" : "#f4f0e8"} opacity={isSel ? 1 : 0.92}
                      fontSize={fontSize} textAnchor="middle" fontWeight="500" style={{ pointerEvents: "none" }}>
                      {room.name}
                    </text>
                    {room.type !== "outdoor" && (
                      <text x={cxm} y={cym + (room.w < 120 ? 12 : 17)} fill="#8f8980" fontSize="11" textAnchor="middle" style={{ pointerEvents: "none" }}>
                        {roomNotes[room.type]}
                      </text>
                    )}
                  </g>
                );
              })}
              <g stroke="rgba(244,240,232,0.25)" strokeWidth="1.5" opacity="0.7" aria-hidden="true">
                <line x1="40" y1="70" x2="780" y2="70" strokeDasharray="4 6" />
                <line x1="528" y1="410" x2="880" y2="410" strokeDasharray="4 6" />
              </g>
            </svg>
          </motion.div>

          <p className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 text-[10px] uppercase tracking-lux text-smoke/50">
            <MousePointerClick className="h-3 w-3" aria-hidden="true" /> Click a room to explore
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${plan}-${selectedId}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="border border-line bg-charcoal p-7 sm:p-9"
            >
              <div className="flex flex-wrap items-center gap-4">
                <span className="h-px w-8 bg-gold" aria-hidden="true" />
                <span className="eyebrow">Selected room</span>
                <span className="ml-auto hidden items-center gap-2 text-[10px] uppercase tracking-lux text-mist sm:flex">
                  <Ruler className="h-3 w-3" aria-hidden="true" /> Schematic · not to scale
                </span>
              </div>
              <h3 className="h-display mt-4 text-3xl text-smoke sm:text-4xl">{selected.name}</h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mist">{selected.desc}</p>
              <span className="mt-5 inline-block border border-gold/40 px-4 py-2 text-[10px] uppercase tracking-lux text-gold">
                {roomNotes[selected.type]}
              </span>
            </motion.div>
          </AnimatePresence>

          <div className="border border-line bg-graphite p-7">
            <p className="eyebrow mb-4">Room legend</p>
            <ul className="space-y-2.5">
              {Object.entries(roomNotes).map(([type, label]) => (
                <li key={type} className="flex items-center justify-between gap-3 text-xs uppercase tracking-wide text-smoke/70">
                  <span className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-sm border" style={{ borderColor: typeColors[type].stroke, background: typeColors[type].fill }} aria-hidden="true" />
                    {label}
                  </span>
                  <span className="text-mist" aria-hidden="true">·</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-line pt-4 text-[11px] leading-relaxed text-mist/70">
              This viewer is a demonstration. Actual plans are provided by the developer at booking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}