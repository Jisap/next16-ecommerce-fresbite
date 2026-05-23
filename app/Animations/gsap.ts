"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  
  // Evitar warnings de target null en desarrollo para evitar problemas con Hot Module Replacement (HMR)
  if (process.env.NODE_ENV === "development") {
    gsap.config({ nullTargetWarn: false });
  }
}

export { gsap, useGSAP, ScrollTrigger };
