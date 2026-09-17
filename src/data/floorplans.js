const rooms = (plan) => plan.map((r) => ({ ...r }));

const base3 = [
  { id: "balcony", name: "Balcony", x: 40, y: 24, w: 820, h: 46, type: "outdoor",
    desc: "A 12-ft-wide balustrade balcony running along the northern elevation with panoramic city views." },
  { id: "bedroom2", name: "Bedroom 2", x: 40, y: 98, w: 220, h: 180, type: "bedroom",
    desc: "Quiet courtyard-facing bedroom with generous wardrobe space and abundant natural light." },
  { id: "kitchen", name: "Kitchen", x: 372, y: 98, w: 148, h: 170, type: "kitchen",
    desc: "Modern kitchen with stone counters, modular cabinetry and utility access." },
  { id: "utility", name: "Utility", x: 372, y: 290, w: 148, h: 120, type: "utility",
    desc: "Dedicated utility zone for laundry and daily essentials." },
  { id: "bedroom3", name: "Bedroom 3", x: 40, y: 290, w: 220, h: 186, type: "bedroom",
    desc: "Flexible bedroom that works equally well as a study or guest suite." },
  { id: "living", name: "Living & Dining", x: 528, y: 98, w: 352, h: 312, type: "living",
    desc: "Expansive living and dining space with full-height glazing facing the tower gardens." },
  { id: "master", name: "Master Bedroom", x: 528, y: 418, w: 352, h: 150, type: "bedroom",
    desc: "Spacious master suite with natural lighting and premium flooring." },
];

const base4 = [
  ...base3.filter((r) => r.id !== "living"),
  { id: "living", name: "Living & Dining", x: 528, y: 98, w: 352, h: 170, type: "living",
    desc: "Grand living and dining gallery with double-aspect glazing and skyline views." },
  { id: "bedroom4", name: "Bedroom 4", x: 528, y: 276, w: 352, h: 134, type: "bedroom",
    desc: "Fourth bedroom suite with its own access and wardrobe." },
];

export const floorplans = [
  {
    type: "3 BHK",
    area: "2600+ Sq.Ft.",
    svgW: 900,
    svgH: 620,
    rooms: rooms(base3),
  },
  {
    type: "4 BHK",
    area: "4000+ Sq.Ft.",
    svgW: 900,
    svgH: 620,
    rooms: rooms(base4),
  },
];

export const roomNotes = {
  bedroom: "Bedroom",
  kitchen: "Kitchen",
  living: "Living & Dining",
  utility: "Utility",
  outdoor: "Balcony / Outdoor",
};