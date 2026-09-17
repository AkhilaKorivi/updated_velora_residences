import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, Phone, Mail, User, MessageSquare, Building2 } from "lucide-react";
import clsx from "clsx";
import { useEnquiry } from "./EnquiryContext";
import { submitEnquiry } from "../services/enquiry";

const initial = { name: "", phone: "", email: "", config: "", message: "" };

export default function EnquiryModal() {
  const { open, closeEnquiry, defaultConfig } = useEnquiry();
  const [form, setForm] = useState({ ...initial, config: defaultConfig });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) setForm({ ...initial, config: defaultConfig });
    setStatus("idle");
    setErrors({});
  }, [open, defaultConfig]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeEnquiry();
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeEnquiry]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your full name";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, "")))
      er.phone = "Enter a valid 10-digit mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Enter a valid email address";
    if (!form.config) er.config = "Please choose a configuration";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await submitEnquiry({ ...form, source: "website" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrors({ form: err.message });
    }
  };

  const inputBase =
    "w-full border bg-ink/60 px-4 py-3.5 text-sm text-smoke placeholder:text-mist/50 transition-colors focus:border-gold focus:outline-none";
  const Icon = ({ children, ...p }) => (
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold" {...p}>
      {children}
    </span>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[400] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={status === "success" ? undefined : closeEnquiry}
          role="presentation"
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto border border-line bg-charcoal p-7 outline-none sm:p-10"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-line text-smoke transition-colors hover:border-gold hover:text-gold"
              onClick={closeEnquiry}
              aria-label="Close enquiry form"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-gold bg-gold/15 text-gold"
                >
                  <Check className="h-9 w-9" aria-hidden="true" />
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  id="enquiry-title"
                  className="h-display mt-7 text-4xl text-smoke"
                >
                  Thank You
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-4 max-w-sm text-sm leading-relaxed text-mist"
                >
                  Our team will get in touch with you shortly.
                </motion.p>
                <button type="button" onClick={closeEnquiry} className="btn-lux btn-gold mt-9">
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="eyebrow">Enquire Now</p>
                <h3 id="enquiry-title" className="h-display mt-3 text-3xl text-smoke sm:text-4xl">
                  Interested in Velora Residences?
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-mist">
                  Share your details and our team will call you back with pricing and availability.
                </p>

                <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
                  <div className="relative">
                    <Icon><User className="h-4 w-4" /></Icon>
                    <input
                      type="text"
                      className={clsx(inputBase, "pl-12", errors.name && "border-red-400/60")}
                      placeholder="Full Name *"
                      value={form.name}
                      onChange={set("name")}
                      aria-label="Full name"
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-300">{errors.name}</p>}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="relative">
                      <Icon><Phone className="h-4 w-4" /></Icon>
                      <input
                        type="tel"
                        className={clsx(inputBase, "pl-12", errors.phone && "border-red-400/60")}
                        placeholder="Phone Number *"
                        value={form.phone}
                        onChange={set("phone")}
                        inputMode="numeric"
                        maxLength={10}
                        aria-label="Phone number"
                      />
                      {errors.phone && <p className="mt-1.5 text-xs text-red-300">{errors.phone}</p>}
                    </div>
                    <div className="relative">
                      <Icon><Mail className="h-4 w-4" /></Icon>
                      <input
                        type="email"
                        className={clsx(inputBase, "pl-12", errors.email && "border-red-400/60")}
                        placeholder="Email Address *"
                        value={form.email}
                        onChange={set("email")}
                        aria-label="Email"
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-300">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="relative">
                    <Icon><Building2 className="h-4 w-4" /></Icon>
                    <select
                      className={clsx(inputBase, "appearance-none pl-12", !form.config && "text-mist/50", errors.config && "border-red-400/60")}
                      value={form.config}
                      onChange={set("config")}
                      aria-label="Preferred configuration"
                    >
                      <option value="" disabled>Preferred Configuration *</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                    </select>
                  </div>
                  {errors.config && <p className="-mt-3 text-xs text-red-300">{errors.config}</p>}

                  <div>
                    <div className="relative">
                      <Icon className="top-4"><MessageSquare className="h-4 w-4" /></Icon>
                      <textarea
                        rows={3}
                        className={clsx(inputBase, "resize-none pl-12")}
                        placeholder="Message (optional)"
                        value={form.message}
                        onChange={set("message")}
                        aria-label="Message"
                      />
                    </div>
                  </div>

                  {errors.form && (
                    <p className="text-xs text-red-300">{errors.form}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-lux btn-gold w-full disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      "Request a Callback"
                    )}
                  </button>

                  <p className="text-center text-[11px] leading-relaxed text-mist/60">
                    Demo enquiry flow — no backend connected. Data is not transmitted anywhere.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}