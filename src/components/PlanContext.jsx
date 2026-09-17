import { createContext, useContext, useState, useCallback } from "react";

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState("3 BHK");
  const selectPlan = useCallback((p) => setPlan(p), []);
  return (
    <PlanContext.Provider value={{ plan, selectPlan }}>{children}</PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}