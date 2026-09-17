export const site = {
  name: "Velora Residences",
  brand: "VELORA",
  brandSub: "RESIDENCES",
  tagline: "A Life Above Ordinary",
  locationLine: "Madhapur, Hyderabad, Telangana",
  description:
    "Premium luxury 3 & 4 BHK residences in Madhapur, Hyderabad. Contemporary architecture, refined interiors and expansive views.",
};

export const contact = {
  phone: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  whatsapp: "+91 90000 00000",
  whatsappHref:
    "https://wa.me/919000000000?text=Hi%2C%20I%27m%20interested%20in%20Velora%20Residences.",
  email: "sales@veloraresidences.com",
  emailHref: "mailto:sales@veloraresidences.com",
  address: "Velora Residences, Madhapur, Hyderabad 500081, Telangana",
};

export const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
];

export const enquiryApi = {
  endpoint: import.meta.env.VITE_ENQUIRY_ENDPOINT || "",
  mapApiKey: import.meta.env.VITE_MAPS_API_KEY || "",
  mapsEmbedUrl: import.meta.env.VITE_MAPS_EMBED_URL || "",
};

// Whole-apartment layout image — paste your image URL here to display it
// in the "Apartment Layout" section, e.g.:
//   layoutImage: "https://your-domain.com/images/layout.jpg"
export const layoutImage = "";

export const layout = {
  image: layoutImage,
  caption: "Whole-apartment layout · Indicative",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Floor Plans", href: "#floor-plans" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export const contactSectionId = "contact";
export const enquiryNote =
  "Sample enquiry form — submissions currently use a demo flow. Our team will get in touch with you shortly.";