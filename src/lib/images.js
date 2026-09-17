const base = (id, w = 1200, q = 80) =>
  `https://images.unsplash.com/${id}?q=${q}&w=${w}&auto=format&fit=crop`;

const srcset = (id, sizes) => sizes.map((w) => `${base(id, w)} ${w}w`).join(", ");

export const img = (id, w = 1200) => base(id, w);
export const imgSrcset = srcset;

export const hero = img("photo-1512917774080-9991f1c4c750", 2000);
export const heroMobile = img("photo-1512917774080-9991f1c4c750", 900);
export const intro = img("photo-1600607687939-ce8a6c25118c", 1400);
export const statsBg = img("photo-1486406146926-c627a92ad1ab", 1600);
export const res3 = img("photo-1560448204-e02f11c3d0e2", 1200);
export const res4 = img("photo-1600607686527-6fb886090705", 1200);
export const lobby = img("photo-1600585154340-be6161a56a0c", 1600);
export const nightCity = img("photo-1512453979798-5ea266f8880c", 1600);

export const lifestyle = {
  morning: img("photo-1502672260266-1c1ef2d93688", 1400),
  day: img("photo-1522708323590-d24dbb6b0267", 1400),
  evening: img("photo-1571896349842-33c89424de2d", 1400),
  night: img("photo-1512453979798-5ea266f8880c", 1400),
};