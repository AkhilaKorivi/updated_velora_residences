import { createContext, useContext, useState, useCallback, useRef } from "react";

const EnquiryContext = createContext(null);

export function EnquiryProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [defaultConfig, setDefaultConfig] = useState("3 BHK");
  const openerRef = useRef(null);

  const openEnquiry = useCallback((config) => {
    openerRef.current = document.activeElement;
    if (config) setDefaultConfig(config);
    setOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setOpen(false);
    openerRef.current?.focus?.();
  }, []);

  return (
    <EnquiryContext.Provider
      value={{ open, setOpen, openEnquiry, closeEnquiry, defaultConfig }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
  return ctx;
}