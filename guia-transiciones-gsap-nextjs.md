# Guía de Implementación: Transiciones de Página con GSAP en Next.js 16 (App Router)

**Propósito:** Este documento sirve como guía técnica para que un modelo de IA pueda implementar transiciones de página con GSAP en cualquier proyecto Next.js 16+ usando el App Router.

## 📋 Índice

- Requisitos Previos
- Instalación de Dependencias
- Arquitectura del Sistema
- Implementación Paso a Paso
- Patrones de Uso
- Mejores Prácticas y Optimización
- Solución de Problemas Comunes
- Ejemplos de Animaciones

## 🔧 Requisitos Previos

- ✅ Next.js 16+ con App Router (`app/` directory)
- ✅ React 19+ con directivas `"use client"`
- ✅ TypeScript (recomendado)
- ✅ Conocimiento básico de GSAP 3.x

## 📦 Instalación de Dependencias

```bash
npm install gsap @gsap/react
# o
yarn add gsap @gsap/react
# o
pnpm add gsap @gsap/react
```

> ⚠️ Nota: Siempre registrar plugins en el lado del cliente para evitar errores de SSR.
> 🔗 gsap.com

## 🏗️ Arquitectura del Sistema

```
// Estructura de carpetas propuesta
project/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── (routes)/
│       └── ...
├── components/
│   ├── TransitionProvider.tsx
│   └── TransitionLink.tsx
├── context/
│   └── TransitionContext.tsx
└── lib/
    └── gsap.ts
```

### Flujo de Transición

1. Usuario hace clic en TransitionLink o navegación programática.
2. Se dispara animación de salida (out).
3. Se cambia la ruta mediante router.push().
4. Se dispara animación de entrada (in) en la nueva página.
5. Se limpian animaciones anteriores.

## 🚀 Implementación Paso a Paso

### Paso 1: Configuración de GSAP (lib/gsap.ts)

```typescript
// lib/gsap.ts
"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Registrar plugins si los usas (ejemplo: ScrollTrigger)
if (typeof window !== "undefined") {
  // gsap.registerPlugin(ScrollTrigger);
}

export { gsap, useGSAP };
```

> ✅ Best Practice: Usar `typeof window !== "undefined"` para evitar errores de hidratación en SSR.

### Paso 2: Crear el Contexto de Transición (context/TransitionContext.tsx)

```typescript
// context/TransitionContext.tsx
"use client";

import { createContext, useContext } from "react";

type TransitionContextType = {
  startTransition: (to: string, options?: { direction?: "forward" | "backward" }) => Promise<void>;
  isTransitioning: boolean;
};

export const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) throw new Error("useTransition must be used within TransitionProvider");
  return context;
};
```

### Paso 3: Implementar el Provider (components/TransitionProvider.tsx)

```typescript
// components/TransitionProvider.tsx
"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TransitionContext } from "@/context/TransitionContext";

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const animateOut = useCallback(async () => {
    if (!overlayRef.current) return;
    return new Promise<void>((resolve) => {
      gsap.to(overlayRef.current, {
        scaleY: 1,
        transformOrigin: "top",
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => resolve(),
      });
    });
  }, []);

  const animateIn = useCallback(async () => {
    if (!overlayRef.current) return;
    return new Promise<void>((resolve) => {
      gsap.to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          resolve();
          setIsTransitioning(false);
          setPendingPath(null);
        },
      });
    });
  }, []);

  const startTransition = useCallback(
    async (to: string) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setPendingPath(to);
      await animateOut();
      router.push(to);
    },
    [isTransitioning, router, animateOut]
  );

  // Efecto para animar entrada cuando cambia la ruta
  useGSAP(() => {
    if (pendingPath === null && isTransitioning) {
      animateIn();
    }
  }, [pendingPath, isTransitioning, animateIn]);

  useGSAP(() => {
    // Configuración inicial del overlay
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { scaleY: 0, transformOrigin: "top" });
    }
  }, []);

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {children}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-50 pointer-events-none"
        style={{ transformOrigin: "top" }}
      />
    </TransitionContext.Provider>
  );
}
```

> 💡 Tip: Usar `pointer-events-none` en el overlay permite interacciones con el contenido durante la animación.

### Paso 4: Crear el Componente TransitionLink (components/TransitionLink.tsx)

```typescript
// components/TransitionLink.tsx
"use client";

import Link, { LinkProps } from "next/link";
import { useTransition } from "@/context/TransitionContext";
import { useRef, MouseEvent } from "react";

type TransitionLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
};

export function TransitionLink({ href, children, className, prefetch = true, ...props }: TransitionLinkProps) {
  const { startTransition, isTransitioning } = useTransition();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isTransitioning) return;
    await startTransition(href.toString());
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={handleClick}
      prefetch={prefetch}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
```

### Paso 5: Integrar en el Layout Principal (app/layout.tsx)

```typescript
// app/layout.tsx
import { TransitionProvider } from "@/components/TransitionProvider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
```

### Paso 6: Usar en Páginas (app/page.tsx)

```typescript
// app/page.tsx
"use client";

import { TransitionLink } from "@/components/TransitionLink";
import { useTransition } from "@/context/TransitionContext";

export default function HomePage() {
  const { startTransition } = useTransition();

  return (
    <div className="p-8">
      <h1>Home</h1>
      <TransitionLink href="/about" className="text-blue-500">
        Ir a About
      </TransitionLink>

      <button
        onClick={() => startTransition("/contact")}
        className="ml-4 bg-black text-white px-4 py-2"
      >
        Contacto (programático)
      </button>
    </div>
  );
}
```

## 🎯 Patrones de Uso

### 🔁 Navegación Programática

```typescript
import { useTransition } from "@/context/TransitionContext";

function MyComponent() {
  const { startTransition } = useTransition();

  const handleSubmit = async () => {
    await saveData(); // alguna operación async
    await startTransition("/success");
  };

  return <button onClick={handleSubmit}>Enviar</button>;
}
```

### 🎨 Personalizar Animaciones por Ruta

```typescript
// Dentro de TransitionProvider
const getAnimationDirection = (to: string, from: string) => {
  if (to === "/about" && from === "/") return "slideUp";
  if (to === "/" && from === "/about") return "slideDown";
  return "default";
};

// Luego usar esa dirección en animateOut/animateIn
```

> 📌 Nota: `template.tsx` se remonta en cada navegación, a diferencia de `layout.tsx` que persiste.

### 🔄 Animaciones Bidireccionales

```typescript
// Usando el hook useGSAP con dependencias de ruta
useGSAP(() => {
  const ctx = gsap.context(() => {
    gsap.from(".page-content", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "back.out(0.4)",
    });
  }, [pathname]); // pathname desde usePathname()

  return () => ctx.revert();
}, [pathname]);
```

## ⚡ Mejores Prácticas y Optimización

### ✅ Cleanup de Animaciones

```typescript
useGSAP(() => {
  const ctx = gsap.context(() => {
    // animaciones aquí
  });
  return () => ctx.revert(); // limpieza automática
}, []);
```

### ✅ Evitar Re-animaciones en Desarrollo

```typescript
if (process.env.NODE_ENV === "development") {
  gsap.config({ nullTargetWarn: false });
}
```

### ✅ Accesibilidad

```typescript
// Respetar prefers-reduced-motion
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReducedMotion) {
  // saltar animaciones o reducir duración
}
```

### ✅ Performance

- 🎯 Usar `will-change: transform` en elementos animados
- 🎯 Animar solo `transform` y `opacity` (GPU-accelerated)
- 🎯 Evitar animar `height`, `width`, `top`, `left`
- 🎯 Usar `gsap.quickTo()` para animaciones frecuentes

## 🐛 Solución de Problemas Comunes

| Problema | Causa Probable | Solución |
|----------|---------------|----------|
| Error de hidratación | GSAP ejecutándose en SSR | Envolver inicialización con `typeof window !== "undefined"` |
| Animaciones se acumulan | Falta de cleanup | Usar `useGSAP()` o `gsap.context()` con `revert()` |
| Transición no se ve | Overlay con z-index bajo | Asegurar `z-50` o mayor en el overlay |
| Contenido interactuable durante animación | Overlay sin pointer-events | Agregar `pointer-events-none` al overlay |
| Scroll no se resetea | Next.js mantiene posición | Usar `scrollToTop: true` en router o `window.scrollTo(0,0)` |
| Animación salta en producción | Optimizaciones de React | Usar `useLayoutEffect` para setup inicial |

## 🎨 Ejemplos de Animaciones

### 🔽 Slide Vertical (Default)

```typescript
gsap.to(overlay, { scaleY: 1, duration: 0.6, ease: "power2.inOut" });
gsap.to(overlay, { scaleY: 0, duration: 0.6, ease: "power2.inOut", delay: 0.2 });
```

### ➡️ Slide Horizontal

```typescript
gsap.to(overlay, { x: "100%", duration: 0.5, ease: "expo.inOut" });
gsap.to(overlay, { x: "-100%", duration: 0.5, ease: "expo.inOut" });
```

### 🔄 Fade + Scale

```typescript
gsap.to(content, { opacity: 0, scale: 0.95, duration: 0.3 });
gsap.from(newContent, { opacity: 0, scale: 0.95, duration: 0.3, delay: 0.2 });
```

### 🎭 Múltiples Capas (Parallax)

```typescript
gsap.to(layer1, { y: -50, duration: 0.6 });
gsap.to(layer2, { y: -100, duration: 0.6 });
gsap.to(layer3, { y: -150, duration: 0.6 });
```

## 📦 Estructura Final Recomendada

```
project/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── TransitionProvider.tsx
│   └── TransitionLink.tsx
├── context/
│   └── TransitionContext.tsx
├── lib/
│   └── gsap.ts
└── package.json
```

## 🔗 Recursos Adicionales

- 📚 [Documentación oficial de GSAP para React](https://gsap.com/docs/react/)
- 🎬 [GSAP useGSAP Hook Guide](https://gsap.com/docs/react/hooks/useGSAP/)
- 🔄 [Next.js App Router Documentation](https://nextjs.org/docs/app)
- 🧪 [GSAP Examples en StackBlitz](https://stackblitz.com/@greensock/collections/gsap-react)

## 🤖 Nota para Modelos de IA

Al implementar esta guía, prioriza:

- ✅ Separación de concerns (lógica vs UI)
- ✅ Cleanup automático de animaciones
- ✅ Compatibilidad con SSR/hidratación
- ✅ Accesibilidad y preferencias de usuario
- ✅ Performance (animar solo propiedades GPU-friendly)

---

Última actualización: Mayo 2026
Compatible con: Next.js 16+, React 19+, GSAP 3.12+
