"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "./gsap";

export type AnimationType =
  | "fade"
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scaleIn"
  | "stagger";

export interface EntranceAnimationOptions {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  ease?: string;
  scrollTrigger?: boolean;
  scrollStart?: string;
  stagger?: number;
  selector?: string;
}

/**
 * Hook de React para aplicar animaciones de entrada con GSAP de manera sencilla.
 * 
 * @param ref Referencia al elemento HTML contenedor
 * @param options Opciones de configuración de la animación
 */
export function useEntranceAnimation(
  ref: React.RefObject<HTMLElement | null>,
  options: EntranceAnimationOptions = {}
) {
  const {
    type = "fadeUp",
    duration = 0.8,
    delay = 0,
    ease = "power2.out",
    scrollTrigger = true,
    scrollStart = "top 85%",
    stagger = 0.15,
    selector,
  } = options;

  useGSAP(
    () => {
      if (!ref.current) return;

      // Determinar los elementos a animar
      // Si hay selector, buscamos los hijos dentro del contenedor. Si no, animamos el propio contenedor.
      let targets: any = ref.current;
      if (selector) {
        targets = gsap.utils.toArray(ref.current.querySelectorAll(selector));
        if (targets.length === 0) return;
      }

      // Configurar valores iniciales basados en el tipo de animación
      const fromVars: gsap.TweenVars = {
        opacity: 0,
      };

      switch (type) {
        case "fadeUp":
          fromVars.y = 40;
          break;
        case "fadeDown":
          fromVars.y = -40;
          break;
        case "fadeLeft":
          fromVars.x = 40;
          break;
        case "fadeRight":
          fromVars.x = -40;
          break;
        case "scaleIn":
          fromVars.scale = 0.9;
          break;
        case "stagger":
          fromVars.y = 30;
          break;
        case "fade":
        default:
          break;
      }

      // Configurar animación final
      const toVars: gsap.TweenVars = {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease,
        overwrite: "auto",
      };

      // Si hay stagger de hijos, lo añadimos
      if (selector || type === "stagger") {
        toVars.stagger = stagger;
      }

      // Si ScrollTrigger está activado, animamos al entrar en el viewport
      if (scrollTrigger) {
        toVars.scrollTrigger = {
          trigger: ref.current,
          start: scrollStart,
          toggleActions: "play none none none", // Se ejecuta solo al entrar una vez
        };
      }

      // Ejecutar la animación
      gsap.fromTo(targets, fromVars, toVars);
    },
    { 
      scope: ref, 
      dependencies: [type, duration, delay, ease, scrollTrigger, scrollStart, stagger, selector] 
    }
  );
}

interface EntranceAnimationProps extends EntranceAnimationOptions {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Componente contenedor para animar cualquier elemento hijo al montar o al entrar en el viewport.
 * Evita la necesidad de convertir componentes hijos estáticos/servidor a cliente ya que encapsula
 * la lógica del cliente y la referencia DOM.
 */
export const EntranceAnimation: React.FC<EntranceAnimationProps> = ({
  children,
  className,
  style,
  as: Component = "div",
  ...options
}) => {
  const elementRef = useRef<HTMLElement>(null);
  useEntranceAnimation(elementRef as React.RefObject<HTMLElement | null>, options);

  const Element = Component as any;

  // Si se está animando una lista de hijos específicos (selector), el contenedor no debe ser invisible,
  // ya que de lo contrario ocultaría todo su contenido.
  const initialOpacity = options.selector ? undefined : 0;

  return (
    <Element 
      ref={elementRef} 
      className={className} 
      style={{ opacity: initialOpacity, ...style }}
    >
      {children}
    </Element>
  );
};
