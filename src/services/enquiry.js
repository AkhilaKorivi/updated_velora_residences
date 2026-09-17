import { enquiryApi } from "../config";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function submitEnquiry(payload) {
  const { endpoint } = enquiryApi;

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Submission failed. Please try again.");
    return res.json();
  }

  // Mock/local submission flow (no backend configured).
  await delay(1400);
  return {
    ok: true,
    ref: `VR-${Date.now().toString().slice(-6)}`,
    message: "Enquiry recorded (demo).",
  };
}