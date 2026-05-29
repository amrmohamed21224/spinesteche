import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { ConsultationModal } from "../components/consultation/ConsultationModal";
import { playConsultationChime } from "../lib/sounds/consultationChime";

const OPEN_DELAY_MS = 200;

type ConsultationContextValue = {
  open: boolean;
  openConsultation: () => void;
  closeConsultation: () => void;
};

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openingRef = useRef(false);

  const openConsultation = useCallback(() => {
    if (open || openingRef.current) return;
    openingRef.current = true;
    playConsultationChime();
    window.setTimeout(() => {
      setOpen(true);
      openingRef.current = false;
    }, OPEN_DELAY_MS);
  }, [open]);

  const closeConsultation = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openConsultation, closeConsultation }),
    [open, openConsultation, closeConsultation],
  );

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <ConsultationModal open={open} onOpenChange={setOpen} />
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) {
    throw new Error("useConsultation must be used within ConsultationProvider");
  }
  return ctx;
}
