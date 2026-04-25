# Plan: Features pendientes del portfolio

## 1. i18n — Español / Inglés

**Objetivo:** Toggle ES/EN en la Navbar sin routing. La URL no cambia.

**Arquitectura propuesta:**
- `LanguageContext` en `src/context/LanguageContext.tsx` con `lang: "es" | "en"` y `setLang`
- `portfolio.json` añade bloque `"i18n"` con claves de texto traducibles:
  ```json
  "i18n": {
    "es": { "about": "...", "nav": { "skills": "Skills", ... }, "sections": {...} },
    "en": { "about": "...", "nav": { "skills": "Skills", ... }, "sections": {...} }
  }
  ```
- Los datos estáticos (empresa, fechas, tech stacks) no se traducen.
- `Navbar` incorpora el toggle ES | EN.
- `layout.tsx` cambia `lang` del `<html>` dinámicamente.

**Textos que se traducen:** `personal.about`, títulos de sección, descripción de proyectos, skill categories, texto de Contact.

**Decisión pendiente:** ¿traducir también las descripciones de experiencia y educación?

---

## 2. Imágenes — Hacer el portfolio más visual

**Opciones (de menor a mayor trabajo):**

| Opción | Descripción | Esfuerzo |
|--------|-------------|----------|
| A | Foto de perfil en Hero (circular, junto al nombre) | Bajo — solo añadir imagen |
| B | Screenshots de proyectos en las cards | Medio — capturar y añadir |
| C | Banner/gradiente decorativo en Hero con formas SVG | Bajo — solo CSS/SVG |
| D | Iconos de tecnologías (devicons) en Skills | Bajo — librería de iconos |

**Recomendación:** A + D primero, luego B si se consiguen capturas de los proyectos.

**Para la foto de perfil:** añadir `photo` a `PersonalInfo` en el JSON, apuntando a `public/photo.jpg`. Cristian proporciona la imagen.

**Para los iconos de tecnología:** usar `simple-icons` o imágenes de `devicons` como avatares en los pills de Skills.

---

## 3. Experience — Mostrar `tech` y `location`

**Problema:** Los campos existen en el JSON pero el componente solo muestra descripción.

**Propuesta de diseño:**
```
[role]                              [fecha — Actualidad]
[empresa ↗]  · [location]
[descripción]
[Angular] [TypeScript] [Node.js]    ← pills de tech al final
```

Los pills de tech en Experience usarán el mismo estilo que en Projects (bg-slate-700, text-sky-300).

**Acción:** Actualizar `Experience.tsx` para renderizar `job.tech` como pills bajo la descripción.

---

## 4. Company links — Moontech

**Pendiente:** Añadir URL de Moontech cuando se conozca.
- NTT Data: https://www.nttdata.com ✓
- Indra: https://www.indracompany.com ✓
- Inetum: https://www.inetum.com ✓
- Moontech: URL desconocida — rellenar en portfolio.json cuando se tenga.
