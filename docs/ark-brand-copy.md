# Ark Systems — Brand Copy Source of Truth

> Archivo: `docs/ark-brand-copy.md`
>
> Este documento es la fuente de verdad narrativa del proyecto Ark Systems.
> Todo contenido visible del sitio debe derivar de aquí antes de aterrizar en `src/data/config.ts` o en componentes Astro.
>
> Ark Systems es simultáneamente:
>
> - **Cliente 0**: la primera instancia real del template.
> - **Template 0**: la base reusable para futuros clientes.
> - **Marca producto**: una oferta de infraestructura web edge-native, migración, setup llave en mano y leasing tecnológico.

---

## 0. Regla del repo: Ark es Cliente 0 y Template 0

Ark Systems no debe tratarse como un “cliente ficticio”. Es la primera instancia real del sistema.

Esto significa:

- El sitio público de Ark puede contener copy real de Ark.
- El motor del template no debe hardcodear “Ark” en componentes.
- Los componentes deben leer desde `config.ts`.
- Los tokens visuales deben vivir en CSS variables / Tailwind theme.
- El pricing, links, brand, portfolio, contacto y CTA deben ser configurables.
- Al clonar para Cliente 1, solo se cambia configuración, assets y tokens.

Separación obligatoria:

| Capa             | Contiene                                                         | No contiene                                              |
| ---------------- | ---------------------------------------------------------------- | -------------------------------------------------------- |
| Motor / template | Componentes, tokens, layouts, helpers, CI, schema de config      | Copy de Ark, precios de Ark, logo de Ark, dominio de Ark |
| Cliente 0 / Ark  | `config.ts` de Ark, assets de Ark, pricing de Ark, deploy de Ark | Lógica que rompa reutilización                           |

---

## 1. Posicionamiento central

### One-liner

> Ark Systems es infraestructura web real para negocios que ya no quieren pagar por servidores, plugins, SSL, mantenimiento invisible ni miedo.

### Versión corta

> Ark Systems convierte tu web en un activo estático, rápido, portable y mantenible, desplegado en Cloudflare Pages.

### Versión larga

> WordPress te cobra por respirar. Wix te encierra en su juguete. Ark Systems es la salida: una web rápida, sin servidores propios, sin plugins frágiles, sin lock-in y sin mensualidades ocultas. Todo vive en un `config.ts`, se compila estático y se despliega en el edge global de Cloudflare.

### Promesa de valor

> Tu web deja de ser un gasto recurrente y se convierte en un activo tuyo: código, dominio, deploy y control.

### Enemigo narrativo

No es solo “una web lenta”. El enemigo es:

- el modelo de suscripción perpetua;
- el lock-in de builders;
- la fragilidad de plugins;
- el costo invisible de mantenimiento;
- la dependencia de terceros para cosas básicas como SSL o hosting;
- la sensación de no ser dueño de tu propia web;
- comprar una web y dejarla envejecer como un museo digital.

### Héroe narrativo

El héroe no es Ark. El héroe es el cliente que recupera control, simplicidad, velocidad y tranquilidad.

Ark es la herramienta/guía que lo saca del laberinto.

---

## 2. Voice & tone

### Ark suena como:

- directo;
- técnico pero accesible;
- anti-humo;
- algo irreverente;
- confiado;
- práctico;
- ligeramente agresivo con el statu quo;
- honesto sobre limitaciones;
- enfocado en propiedad, velocidad y control.

### Ark NO suena como:

- corporativo genérico;
- agencia inflada;
- startup con buzzwords vacíos;
- vendedor de cursos;
- “solución integral omnicanaval”;
- tono tierno o demasiado suave;
- promesas mágicas sin mecanismo.

### Regla de tono

> Ataca el problema, no a la persona.
> Sé filoso con el sistema, no con el cliente.

El cliente no es tonto por usar WordPress o Wix. El sistema es el que está roto.

### Densidad de negatividad

El copy original tiene mucha fuerza, pero acumula varios golpes seguidos contra el mismo competidor. Para mejorar conversión, usar la regla:

> 1 dolor + 1 contraste + 1 salida.

Evitar listas largas de queja sin cierre emocional.

---

## 3. Messaging pillars

### Pillar 1 — Propiedad

> Tu web es tuya. El código es tuyo. El dominio es tuyo. El deploy es tuyo.

Frases soporte:

- Sin lock-in.
- Sin exportaciones imposibles.
- Sin depender de una plataforma para existir.
- Si Ark desaparece mañana, tu web sigue viva.
- En compra única, el repo es tuyo desde el día 1.
- En leasing, puedes pagar residual y quedarte con el repo.

### Pillar 2 — Simplicidad radical

> Una fuente de verdad. El resto es ruido.

Frases soporte:

- Todo el contenido vive en `config.ts`.
- Editas texto sin tocar componentes.
- Menos piezas móviles, menos cosas que se rompen.
- No necesitas un ejército de plugins.
- No component owns a color.

### Pillar 3 — Velocidad como feature comercial

> Una web que carga rápido no es un lujo técnico. Es conversión, SEO y tranquilidad.

Frases soporte:

- 0.4s vs 3s.
- Lighthouse 95+.
- Edge global.
- Sin CLS horrible.
- Sin menús PDF.
- Sin esperas que matan ventas.

### Pillar 4 — Costo transparente

> Solo pagas lo que entiendes. El resto es arquitectura.

Frases soporte:

- Hosting edge en Cloudflare Pages.
- SSL automático.
- Sin mantenimiento por plugins rotos.
- Sin renovaciones sorpresa.
- Setup una vez o leasing mensual deducible.

### Pillar 5 — Anti-obsolescencia

> No compres una web que va a envejecer como un museo.

Frases soporte:

- Modelo viejo: pagas una web y la dejas igualita 12 años.
- Modelo Ark: siempre óptima, siempre actual, siempre deducible.
- Renovación anual si renuevas leasing.
- Tech reciente sin que el cliente toque infraestructura.
- Lighthouse 95+ como estándar, no como suerte.

### Pillar 6 — Flexibilidad fiscal

> Para muchos negocios, no es lo mismo comprar un activo que rentar infraestructura.

Frases soporte:

- Leasing mensual como gasto operativo.
- CFDI mensual incluido.
- 100% deducible, sujeto a criterio contable del cliente.
- Sin activo en balance, según estructura acordada.
- Ideal para personas morales y físicas con actividad empresarial.

Pendiente legal/fiscal: validar redacción exacta con contador/abogado antes de publicar “100% deducible” como promesa universal.

---

## 4. Estructura narrativa del sitio

El sitio debe contar esta historia en orden:

1. **Problema emocional y técnico**
   - Tu web actual es frágil, lenta, cara de mantener y envejece mal.

2. **Enemigo claro**
   - WordPress/Wix/cPanel/plugins/SSL/mensualidades/obsolescencia.

3. **Alternativa Ark**
   - Infraestructura real, estática, edge, config-driven, portable.

4. **Cómo funciona**
   - `config.ts`, Astro, Tailwind, Cloudflare Pages, Wrangler.

5. **Para quién es**
   - Negocios que necesitan web rápida, estable y sin renta técnica.

6. **Costo comparado**
   - Lo que pagas hoy vs lo que pagarías con Ark.

7. **Modelos de contratación**
   - Compra única.
   - Leasing tecnológico.
   - Plan museo solo como referencia negativa, no como oferta real.

8. **Beneficio fiscal / flexibilidad**
   - Leasing mensual, CFDI, deducibilidad, sin golpe fuerte al flujo.

9. **Métodos de pago**
   - MXN, USD, USDT, BTC.

10. **CTA principal**

- Agendar demo/call.
- Secundario: ver repo, ver contrato tipo leasing, migrar.

11. **Cierre**

- Recuperas control.
- Dejas de pagar por existir.
- Rentas futuro en vez de comprar obsolescencia.

---

## 5. Copy por sección

## 5.1 Header / Nav

### Marca

```text
ARK SYSTEMS_
```

Donde `_` usa color accent.

### Navegación desktop

```text
QUÉ ES
CÓMO
PARA QUÉ
COSTOS
PRICING
```

Opción más compacta:

```text
PROBLEMA
SOLUCIÓN
PRICING
CONTACTO
```

### CTA header

Primario sugerido:

```text
AGENDAR DEMO
```

Secundario/opcional:

```text
VER REPO
```

Nota: en el prototipo aparece “VER DEMO EN CLOUDFLARE”. Para conversión, “AGENDAR DEMO” o “AGENDAR CALL” debería ser más prominente que “VER DEMO”, especialmente para ticket alto.

### Mobile nav toggle

```text
MENÚ
CERRAR
```

Accesibilidad:

- botón con `aria-expanded`;
- label visible o sr-only;
- cierre con Escape;
- foco gestionado;
- links con estados focus visibles.

---

## 5.2 Hero

### Headline principal

Opción recomendada:

```text
Las webs de museo murieron.
```

Alternativas:

```text
Tu web no debería cobrarte por existir.
```

```text
Deja de pagar renta por tu propia web.
```

```text
WordPress te cobra por respirar. Ark no.
```

```text
Tu web no debería envejecer como un museo.
```

La más fuerte sigue siendo:

```text
Las webs de museo murieron.
```

Porque es memorable, visual y tiene ángulo.

Para pricing/leasing, puede usarse como variante:

```text
Es hora de rentar futuro, no comprar obsolescencia.
```

### Subheadline

Versión pulida:

```text
WordPress te cobra por respirar. Wix te encierra en su juguete.
Yo trabajé dos años en soporte de Wix y sé que es una pesadilla.

Ark Systems es infraestructura real:
1 config, 0 servidores, deploy en 2 comandos.
```

Versión más conversacional:

```text
Si tu web depende de 14 plugins, un cPanel del 2002 y una renovación de SSL que llega como sorpresa, no es tu culpa. El sistema está roto.

Ark Systems te devuelve lo básico: velocidad, control y un costo anual que se puede explicar en una línea.
```

Versión para pricing/leasing:

```text
El modelo viejo: pagas una web y la dejas igualita 12 años hasta que da vergüenza.
El modelo Ark: siempre óptima, siempre actual, siempre deducible.
```

### Stats hero

```text
95+  LIGHTHOUSE
$0   SSL AUTOMÁTICO
2    COMANDOS DE DEPLOY
```

Opcional agregar:

```text
0.4s CARGA EDGE
```

Pero cuidado: no convertir “0.4s” en promesa absoluta sin aclarar condiciones de red, assets externos y presupuesto de performance.

### CTAs hero

Primario:

```text
AGENDAR DEMO →
```

Secundario:

```text
VER PRICING
```

Terciario opcional:

```text
VER REPO
```

El CTA “MIGRAR MI WEB AHORA” puede ser fuerte, pero para un servicio de $999 o leasing puede ser demasiado compromiso arriba. Mejor usarlo más abajo, después de explicar valor.

### Microcopy bajo CTA

```text
Sin contrato largo. Sin mensualidad forzada. Código tuyo si lo quieres.
```

O para leasing:

```text
Setup desde $0. Leasing desde $249 USD/mes. Cancela cuando quieras, según contrato.
```

Excelente mantener una variante corta:

```text
Sin humo. Sin lock-in. Sin museos digitales.
```

---

## 5.3 Sección “Qué es” / Comparativa de paradigmas

### Section label

```text
EL PROBLEMA
```

o

```text
POR QUÉ EXISTE ARK
```

### Heading

```text
El stack que huele a humedad vs la salida real.
```

Alternativa:

```text
Tres formas de tener una web. Solo una no te cobra por existir.
```

### Card 01 — WordPress Museo

Label:

```text
01 / WORDPRESS MUSEO
```

Title:

```text
El stack que huele a humedad
```

Bullets:

```text
hosting $10/mes que se cae en Black Friday
SSL $50/año porque sí
un plugin rompe todo al actualizar
cPanel 2002, FTP y permisos 777
3s de carga + CLS horrible
```

Cost line:

```text
✕ $185/año + $300 de mantenimiento escondido
```

Sugerencia: reducir a 4 bullets máximo para no saturar.

Versión más afilada:

```text
hosting barato que se cae cuando más vendes
SSL que pagas aparte como si fuera lujo
plugins que se rompen entre sí
3s de carga y una experiencia que asusta
```

### Card 02 — Wix / Constructores

Label:

```text
02 / WIX / CONSTRUCTORES
```

Title:

```text
Juguete caro con candado
```

Bullets:

```text
no puedes exportar tu web. nunca.
pagas por cada tontería: popups, analíticas, formularios
editor que se arrastra a 12fps
no puedes tocar código real
te cobran por dominio como si fuera 2008
```

Cost line:

```text
✕ lock-in total. soporte copy/paste que odia su trabajo (yo fui).
```

Sugerencia: mantener “yo fui” porque humaniza, pero no repetir demasiadas quejas.

Versión más limpia:

```text
tu web vive dentro de su jaula
no exportas, no controlas, no te vas fácil
pagas por funciones que deberían ser básicas
el editor se siente como navegar con arena en los ojos
```

### Card 03 — Ark Systems

Label:

```text
03 / ARK SYSTEMS • PARADIGMA NUEVO
```

Badge:

```text
RECOMENDADO
```

Title:

```text
0 servidores. 0 humo.
```

Bullets:

```text
Cloudflare Pages edge global • 300+ pops
SSL gratis para siempre, auto-renew
config.ts única fuente de verdad
0 JS por defecto, islands opcionales
Lighthouse 95+ sin trucos
```

Cost line:

```text
✓ $15/año total. el resto es arquitectura.
```

Sugerencia: cambiar “100/100 Lighthouse sin trucos” por “Lighthouse 95+ garantizado bajo presupuesto claro” para alinearse con oferta y evitar promesa imposible.

Versión final recomendada:

```text
Cloudflare Pages edge global • 300+ pops
SSL $0, automático y para siempre
config.ts como única fuente de verdad
0 JS por defecto, interactividad opcional
Lighthouse 95+ o devolvemos el setup, según términos
```

---

## 5.4 Sección “Cómo lo hace”

### Section label

```text
CÓMO LO HACE
```

### Heading

```text
Una fuente de verdad.
El resto es ruido.
```

Excelente. Mantener.

### Subheading

```text
Ningún componente decide colores. Ningún texto vive escondido en la UI.
Todo el contenido, brand, precios y links viven en un solo lugar.
```

Versión más técnica:

```text
No component owns a color. Tokens en CSS variables.
2 scripts de 16 líneas totales.
Todo lo demás es HTML que no pide permiso para cargar.
```

Mantener ambas: una para negocio, otra para técnico.

### Step 01

```text
01 / src/data/config.ts
```

Title:

```text
Todo vive en un solo archivo
```

Description:

```text
Copy, precios, links, brand y contenido.
Editas texto sin tocar componentes.
```

Meta:

```text
single source of truth
```

### Step 02

```text
02 / Astro 5 + Tailwind
```

Title:

```text
Estático por defecto, rápido por diseño
```

Description:

```text
Build estático, tokens semánticos, zero JS por defecto.
CSS variables, no colores inline.
```

Meta:

```text
16 líneas JS total
```

### Step 03

```text
03 / wrangler pages deploy
```

Title:

```text
Deploy en segundos, no en tickets
```

Description:

```text
Edge global en 12s.
Sin servidores, sin Docker, sin cPanel, sin lágrimas.
```

Meta:

```text
12s deploy • 300 pops
```

### Code block ejemplo

Mostrar un `config.ts` genérico, no necesariamente de Ark, para reforzar plantilla:

```ts
export const config = {
  brand: {
    name: 'Clínica Roca',
    tagline: 'Sin WordPress, sin sustos',
    domain: 'clinicaroca.com',
  },
  contact: {
    whatsapp: '+34 612 345 678',
    email: 'hola@clinicaroca.com',
    address: 'C/ Gran Vía 42, Madrid',
  },
  pricing: {
    setup: 999,
    extraPage: 199,
    hosting: 0,
    ssl: 0,
  },
  stack: ['cloudflare-pages', 'astro@5.18', 'tailwind@3.4', 'typescript-strict'],
} as const;
```

### Regla Ark

```text
Regla Ark:
No component owns a color.
Colores = variables CSS.
Espaciado = tokens.
JS = islas explícitas.
2 scripts de 16 líneas: menú + modal.
El resto es HTML que vuela.
```

Mantener. Es una frase muy identificable.

---

## 5.5 Sección stack técnico

### Label

```text
STACK • SIN HYPE
```

### Items

```text
Cloudflare Pages
Edge global, 300+ pops, deploys atómicos.
```

```text
Astro 5
Static first, islands opcionales, 0 JS default.
```

```text
Tailwind 3.4
Tokens semánticos, sin componente con color hardcodeado.
```

```text
TypeScript strict
config.ts tipada, no any, no sustos.
```

```text
Wrangler
wrangler pages deploy • 12s • una línea.
```

Nota: si el repo usa Astro 5.x, conviene no fijar versión exacta en copy si puede envejecer rápido. Mejor:

```text
Astro 5
```

o

```text
Astro latest 5.x
```

---

## 5.6 Sección “Para qué / para quién”

### Heading sugerido

```text
No es para blogs con 400 plugins.
Es para negocios que necesitan una web que cargue, que no se rompa y que no cobre renta por SSL.
```

Mantener. Es muy bueno porque filtra.

### Use cases

Formato antes/después:

```text
ANTES → DESPUÉS
```

#### Restaurantes

```text
RESTAURANTES
```

Antes:

```text
WP + Elementor 4.1s • menú PDF
```

Después:

```text
Ark edge 0.4s • menú real • reservas directas
```

#### Despachos

```text
DESPACHOS
```

Antes:

```text
Template ThemeForest + 9 plugins
```

Después:

```text
Config tipada • marca sobria • SEO técnico limpio
```

Sugerencia: “100 SEO” puede ser promesa fuerte. Mejor:

```text
SEO técnico limpio
```

o

```text
base SEO sólida
```

#### Clínicas

```text
CLÍNICAS
```

Antes:

```text
Wix booking que cobra comisión
```

Después:

```text
Cal.com embebido • sin comisión • edge
```

#### Real Estate

```text
REAL ESTATE
```

Antes:

```text
WP IDX lento • imágenes 6MB
```

Después:

```text
Astro Image • imágenes optimizadas • mapas edge
```

Sugerencia: “<80kb” puede variar. Mejor:

```text
imágenes optimizadas • mapas edge
```

#### SaaS early

```text
SAAS EARLY
```

Antes:

```text
Next.js en Vercel $200/mes
```

Después:

```text
Astro static + edge • $0 hosting para marketing site
```

Cuidado: comparar Next.js/Vercel con Ark puede ser injusto si el cliente necesita app dinámica. Ark es marketing/conversion site, no plataforma SaaS completa. Conviene aclarar:

```text
sitios marketing, landing, docs básicas y brochureware.
```

#### Portfolios

```text
PORTFOLIOS
```

Antes:

```text
Squarespace lock-in • export no
```

Después:

```text
Código tuyo • deploy tuyo • dominio tuyo
```

---

## 5.7 Sección costos / comparativa del modelo viejo

### Badge

```text
TABLA REAL, NO MARKETING
```

Mantener.

### Heading

```text
¿Cuánto te roban al año sin Ark?
```

Fuerte. Alternativa menos agresiva:

```text
¿Cuánto cuesta realmente tu web hoy?
```

Pero para Ark, la agresiva funciona.

### Tabla comparativa simple

| Concepto        |           WordPress / Wix |               Ark Systems |
| --------------- | ------------------------: | ------------------------: |
| Hosting         |                  $120/año |      $0 incluido en Pages |
| SSL             |                   $50/año |                   $0 auto |
| Dominio         |                   $15/año | $15/año — solo esto pagas |
| Mantenimiento   | $300/año plugins + sustos |                        $0 |
| Tiempo de carga |                      2.8s |                      0.4s |
| Total real      |       $485/año + ansiedad |             $15/año. Fin. |

Notas:

- Los números deben tratarse como estimaciones típicas, no garantías universales.
- Agregar microcopy:

```text
* Costos típicos de un setup pequeño/medio con hosting compartido, SSL externo y mantenimiento básico. Tu caso puede variar.
```

Esto protege legalmente y aumenta credibilidad.

### Versión MXN para pricing/leasing

Si el mercado principal es México, conviene tener una comparativa en MXN:

| Concepto             |           Plan Museo / WP tradicional |                                    Ark Leasing |
| -------------------- | ------------------------------------: | ---------------------------------------------: |
| Hosting              |                 $1,200 MXN/año y sube |                                       Incluido |
| SSL                  |                        $1,000 MXN/año |                       Incluido, auto-renovable |
| Dominio              |                          $400 MXN/año | Según plan, pendiente definir inclusión exacta |
| Mantenimiento        |     $3,600 MXN/año o riesgo de hackeo |                            Incluido en leasing |
| Rediseño cada 3 años |            $8,000 MXN que nunca pagas |                   Renovación anual si renuevas |
| Velocidad            |                               2.8s–4s |                                Edge optimizado |
| Fiscal               | Activo intangible, amortización lenta |                  Gasto operativo mensual, CFDI |
| Total 3 años aprox.  |              ~$45,000 MXN + web vieja |               $249 USD/mes + residual opcional |

Pendiente: validar equivalencia MXN/USD y si dominio está incluido en leasing.

---

## 5.8 Pricing Ark — propuesta integrada

### Section label

```text
PRICING • SIN TRUCOS
```

### Heading

```text
Elige tu forma de no quedarte obsoleto.
```

Alternativa:

```text
No compres un museo. Renta futuro.
```

### Subheading

```text
Compra única si quieres código y control inmediato.
Leasing si quieres web siempre actual, deducible y sin golpe fuerte al flujo.
```

---

### Plan 00 — Plan Museo / WordPress Museo

Este plan no es una oferta real de Ark. Es un anti-plan narrativo para mostrar el modelo viejo.

Label:

```text
PLAN MUSEO
```

Title:

```text
WordPress Museo
```

Precio:

```text
$20,000 MXN + $500 MXN/mes
```

Copy:

```text
Setup + plantilla premium.
Tú pagas hosting, SSL y dominio aparte.
Se ve bien 6 meses.
Luego museo.
```

Bullets:

```text
• Hosting $1,200 MXN/año, y sube cada año
• SSL $1,000 MXN/año si no lo pagas, te marcan inseguro
• Dominio $400 MXN/año
• Mantenimiento WordPress/plugins $3,600 MXN/año o te hackean
• Actualización de diseño $8,000 MXN cada 3 años, que nunca pagas
• Velocidad 2.8s–4s: pierdes clientes
• Obsolescencia garantizada a los 2 años
• Fiscal: se capitaliza, amortizas en 3 años, contador sufre
• Código: te entregan un zip que nadie puede mantener
```

Total:

```text
~$45,000 MXN en 3 años + web vieja
```

Badge:

```text
NO RECOMENDADO • MUSEO DIGITAL
```

CTA:

```text
Ninguno. Es el modelo que queremos matar.
```

---

### Plan 01 — Ark Compra Única

Badge:

```text
PARA TECHIES
```

Title:

```text
Ark Compra Única
```

Precio:

```text
$999 USD una vez
```

Subprecio:

```text
+ $0/mes. Repo tuyo desde día 1.
```

Copy:

```text
Para quien quiere código, control y fork.
Tú hosteas. Nosotros guiamos.
Sin updates incluidos.
```

Incluye:

```text
✓ Código completo Astro 5
✓ config.ts + brand + tokens + contenido inicial
✓ Guía de deploy en Cloudflare Pages
✓ Repo privado GitHub entregado
✓ Dominio configurado por tu cuenta
✓ SSL gestionado por plataforma
```

No incluye:

```text
✗ Updates anuales incluidos
✗ Cambios mensuales incluidos
✗ Hosting administrado
✗ Soporte infinito
```

CTA:

```text
VER REPO →
```

Microcopy:

```text
Ideal si quieres el código y sabes mantenerlo.
```

---

### Plan 02 — Ark Leasing

Badge:

```text
★ RECOMENDADO • LEASING
```

Title:

```text
Ark Leasing
```

Precio:

```text
$0 setup + $249 USD/mes
```

Equivalencia aproximada:

```text
~$4,200 MXN/mes, según tipo de cambio.
```

Contractual:

```text
Contrato sugerido 12 meses.
Sin permanencia forzada, según términos.
Cancela cuando quieras, según contrato.
```

Subprecio:

```text
Residual $499 USD al final, o renueva y te la dejamos como nueva con última tecnología.
```

Copy principal:

```text
TODO incluido por $249 USD/mes — renta fija, no sorpresas.
```

Incluye:

```text
✓ Hosting Edge Global Cloudflare
✓ SSL infinito auto-renovable
✓ Dominio según plan, pendiente definir inclusión exacta
✓ Updates de infraestructura base
✓ 1 hora de cambios/mes incluidos
✓ Rediseño anual si renuevas
✓ 100% deducible + CFDI mensual, sujeto a criterio contable
✓ Lighthouse 95+ como estándar bajo presupuesto definido
✓ Repo privado GitHub durante el contrato
✓ Opción de pagar residual $499 USD y quedarte con repo completo
```

Total 3 años:

```text
$8,964 USD en 36 meses, 100% deducible según estructura fiscal acordada.
```

CTA:

```text
Empezar Leasing →
```

Microcopy botón:

```text
sin setup
```

Microcopy inferior:

```text
Sin permanencia forzada • Cancela cuando quieras • CFDI mensual
```

Pendiente legal/comercial:

- Definir si “contrato 12 meses” convive con “cancela cuando quieras”.
- Definir penalización o condiciones de cancelación anticipada.
- Definir qué incluye exactamente “1 hora de cambios/mes”.
- Definir qué significa “rediseño anual si renuevas”.
- Definir si dominio está incluido, renovado por Ark o pagado por cliente.
- Definir propiedad intelectual durante leasing y al pagar residual.
- Definir condiciones de garantía Lighthouse 95+.
- Validar redacción fiscal con contador/abogado.

---

### Bloque fiscal / deducibilidad

Badge:

```text
100% DEDUCIBLE • TU CONTADOR VA A QUERER SER NUESTRO SOCIO
```

Heading:

```text
No es un gasto.
Es infraestructura deducible mes a mes.
```

Copy:

```text
Compra única = activo intangible que se amortiza en 36 meses.
Tu contador hace malabares, tu flujo sufre.

Leasing Ark = gasto operativo mensual 100% deducible de ISR.
Facturamos desde Substrate Holdings LLC (US) / Substrate México S.A.
CFDI mensual incluido.
Ideal para personas morales y físicas con actividad empresarial.
```

Badges:

```text
Incluye CFDI mensual
ISR 100% deducible
Sin activo en balance
```

Comparativa fiscal:

| Modelo           | Efecto fiscal                 | Flujo          |
| ---------------- | ----------------------------- | -------------- |
| Compra $20k      | Amortizas $555/mes x 36m      | No deduces hoy |
| Leasing $249/mes | Deduces $4,200 MXN aprox. hoy | Flujo intacto  |

Bar visual copy:

```text
Amortización lenta vs Deducción inmediata
```

Disclaimer obligatorio:

```text
* La deducibilidad depende del régimen fiscal, criterio contable y estructura contractual de cada cliente. Esto no es asesoría fiscal.
```

---

### Métodos de pago

Heading:

```text
Aceptamos TODO tipo de moneda.
```

Badge:

```text
SIN COMISIÓN OCULTA
```

Items:

#### MXN

```text
MXN / Pesos Mexicanos
SPEI / Transferencia interbancaria
Más usado
CLABE • Referencia automática • CFDI en MXN
```

#### USD

```text
USD / Dólares
ACH / Wire / USD-MXN sin comisión
Para US LLC
Mercury / Relay • Tipo de cambio FIX sin spread
```

#### USDT

```text
USDT / Stablecoins
TRC20, ERC20, Polygon, Arbitrum
USDT • USDC • DAI
Confirmación <2 min • Sin volatilidad
```

#### BTC

```text
BTC / Bitcoin
On-chain + Lightning Network
0% comisión
BTCPay Server self-hosted • No custodial
```

Frase BTC:

```text
Si aceptas Bitcoin en tu negocio, ¿por qué tu agencia no?
BTCPay Server • Sin intermediarios • Tú controlas tus llaves.
```

Pendiente:

- Validar tratamiento fiscal de crypto.
- Definir conversión contable.
- Definir si se emite CFDI por monto fiat equivalente.
- Definir riesgo/volatilidad aunque sean stablecoins.

---

## 5.9 Sección final CTA

### Heading

```text
¿Tu web sigue igual desde 2012?
```

Alternativa:

```text
¿Listo para matar el cPanel?
```

Ambas son fuertes. Para pricing/leasing, la primera conecta mejor con anti-obsolescencia.

### Subheading

```text
Es hora de rentar futuro, no comprar obsolescencia.

Deja de pagar por un museo digital.
Renta una web que trabaja, deduce, y nunca da vergüenza presentar.
```

### CTAs

Primario:

```text
Agendar demo 15 min ↗
```

Secundario:

```text
Ver contrato tipo leasing
```

Terciario microcopy:

```text
Respuesta < 2h • Contrato en 1 página • Sin letra chica
```

---

## 5.10 Footer

### Copyright

Versión actual:

```text
© 2026 Substrate Holdings LLC
ARK SYSTEMS • LEASING TECNOLÓGICO
Hecho con Astro 5 • Cloudflare Edge • 0.4s
```

Alternativa más personal:

```text
© 2026 ARK SYSTEMS • Hecho por alguien que sufrió Wix y no quiere que tú sufras.
```

Recomendación: usar ambas capas.

```text
© 2026 Substrate Holdings LLC • ARK SYSTEMS
Hecho por alguien que sufrió Wix y no quiere que tú sufras.
Astro 5 • Cloudflare Edge • 0.4s
```

### Links footer

Opcionales:

```text
GitHub
Cal.com
Cloudflare Pages
Legal / Privacidad
Contrato tipo leasing
```

Si es template multi-cliente, footer links deben venir de `config.ts`.

---

## 6. CTA matrix

| Contexto             | CTA primario             | CTA secundario            | Objetivo                |
| -------------------- | ------------------------ | ------------------------- | ----------------------- |
| Hero                 | Agendar demo             | Ver pricing               | Captar lead caliente    |
| Header               | Agendar demo             | Ver repo                  | Conversión persistente  |
| Comparativa          | Ver Ark como alternativa | Agendar demo              | Educar                  |
| Cómo funciona        | Agendar demo             | Ver código                | Converter técnico       |
| Para quién           | Agendar demo             | Ver casos                 | Filtrar cliente ideal   |
| Costos               | Agendar demo             | Ver pricing               | Convertir por ahorro    |
| Pricing compra única | Ver repo                 | Agendar demo              | Lead técnico            |
| Pricing leasing      | Empezar leasing          | Ver contrato              | Cierre comercial        |
| Bloque fiscal        | Agendar demo             | Hablar con contador       | Reducir objeción fiscal |
| Final                | Agendar demo 15 min      | Ver contrato tipo leasing | Última oportunidad      |

Regla:

> El CTA principal del sitio debe ser “Agendar demo” o “Agendar call”, no “Migrar ahora”.

“Migrar ahora” puede usarse como botón secundario o en segmentos ya educados.

---

## 7. Objeciones y respuestas

### Objeción 1 — “Parece caro $999”

Respuesta:

```text
Comparado con $485/año + ansiedad, el setup se paga solo en menos de dos años.
Y después, tu costo anual baja a lo que cuesta tu dominio.
```

### Objeción 2 — “No entiendo lo técnico”

Respuesta:

```text
No necesitas entender Astro, Tailwind o Cloudflare.
Necesitas una web rápida, estable y sin sorpresas. Nosotros armamos el resto.
```

### Objeción 3 — “Ya tengo WordPress/Wix”

Respuesta:

```text
Perfecto. Ark está pensado para migrar, no para hacerte empezar de cero.
Traemos tu contenido, tu marca y tu dominio al nuevo modelo.
```

### Objeción 4 — “¿Y si necesito blog o formularios complejos?”

Respuesta:

```text
Ark cubre marketing sites, landings, portfolios, servicios y reservas.
Si necesitas una app compleja, lo hablamos antes. No vendemos humo.
```

### Objeción 5 — “¿Qué pasa si Cloudflare cambia?”

Respuesta:

```text
Tu web es estática y portable. Puedes compilarla y desplegarla en otro hosting compatible.
No estás casado con una plataforma.
```

### Objeción 6 — “¿Lighthouse 95+ es garantía real?”

Respuesta:

```text
Trabajamos sobre un presupuesto claro: mobile, red 4G, sin recursos externos pesados.
Si no llegamos a 95+ en ese setup, devolvemos el fee de setup o aplicamos la cláusula acordada.
```

Pendiente: definir textualmente la garantía.

### Objeción 7 — “¿Por qué leasing si puedo comprar una vez?”

Respuesta:

```text
Porque una web comprada hoy puede ser un museo en 24 meses.
El leasing mantiene infraestructura actual, cambios mensuales, CFDI y opción de residual para quedarte con el repo.
```

### Objeción 8 — “¿El leasing no sale más caro a 3 años?”

Respuesta:

```text
Depende de tu estructura fiscal y de cuánto vale para ti no quedarte obsoleto.
Compra única te da código hoy. Leasing te da web actual, soporte operativo y deducibilidad mensual.
No es solo precio: es modelo.
```

### Objeción 9 — “¿Puedo cancelar cuando quiera?”

Respuesta tentativa:

```text
Sí, según términos del contrato. No hay permanencia forzada, pero el plan está diseñado sobre 12 meses para mantener costos y servicio estables.
```

Pendiente: redacción legal exacta.

### Objeción 10 — “¿Qué pasa con la propiedad intelectual?”

Respuesta tentativa:

```text
En compra única, el repo es tuyo desde día 1.
En leasing, la infraestructura base pertenece a Substrate Holdings mientras dura el contrato. Al pagar residual, te entregamos repo completo, limpio y documentado. Tu contenido siempre es tuyo.
```

Pendiente: validar legalmente.

---

## 8. Copy aprobado vs pendiente

### Aprobado como dirección

- “Las webs de museo murieron.”
- “0 servidores. 0 humo.”
- “Una fuente de verdad. El resto es ruido.”
- “Sin contrato. Sin mensualidad. Código tuyo.”
- “Hecho por alguien que sufrió Wix y no quiere que tú sufras.”
- Tabla de costos comparativa.
- Tono directo, técnico y anti-plataforma.
- Modelo de pricing: compra única + leasing + anti-plan museo.
- Bloque fiscal como diferenciador para México.
- Métodos de pago MXN/USD/USDT/BTC como señal de modernidad.

### Pendiente de afinar

- Reducir acumulación de insultos a competidores.
- Añadir más beneficio emocional: tranquilidad, control, dormir sin revisar uptime.
- Definir garantía Lighthouse con condiciones.
- Definir URLs reales:
  - Cal.com
  - GitHub
  - demo Cloudflare
  - formulario
  - email/whatsapp
- Confirmar precios en USD y posibles impuestos.
- Confirmar si “$15/año” se presenta como estimado.
- Definir contrato leasing:
  - permanencia;
  - cancelación;
  - residual;
  - propiedad intelectual;
  - cambios incluidos;
  - rediseño anual;
  - dominio incluido o no;
  - soporte;
  - SLA.
- Validar redacción fiscal con contador/abogado.
- Validar tratamiento de crypto pagos.
- Definir si Substrate Holdings LLC / Substrate México S.A. aparecen públicamente o solo en facturación.

---

## 9. Bloques emocionales sugeridos

El copy técnico es fuerte. Falta una capa emocional más clara.

### Bloque sugerido post-hero o pre-pricing

```text
La primera semana sin revisar uptime.
Sin renovar SSL.
Sin rezarle a un plugin.
Sin llamar a un freelance que desapareció.
Sin pagar por funciones básicas.

Eso es lo que realmente compras.
```

Otro:

```text
Una web que no te da miedo no es un detalle técnico.
Es poder dormir, vender y saber que tu negocio no depende de un plugin que se actualizó solo.
```

Otro para leasing:

```text
No estás comprando una web.
Estás rentando tranquilidad, velocidad y actualización continua.
```

---

## 10. Mapping a `src/data/config.ts`

Este documento debe traducirse a una estructura tipo:

```ts
export const config = {
  brand: {
    name: 'ARK SYSTEMS',
    legalName: 'Substrate Holdings LLC',
    tagline: '0 servidores. 0 humo.',
    domain: 'arksystems.dev', // pendiente
    logoSrc: '/assets/ark-logo.svg',
    faviconSrc: '/favicon.ico',
    ogImageSrc: '/assets/og-default.png',
  },

  theme: {
    default: 'fire', // o el tema que represente Ark como Cliente 0
    accent: '#FF6B1A',
  },

  nav: [
    { label: 'QUÉ ES', href: '#que-es' },
    { label: 'CÓMO', href: '#como' },
    { label: 'PARA QUÉ', href: '#para-que' },
    { label: 'COSTOS', href: '#costos' },
    { label: 'PRICING', href: '#pricing' },
  ],

  hero: {
    headline: 'Las webs de museo murieron.',
    subheadline:
      'WordPress te cobra por respirar. Wix te encierra en su juguete. Ark Systems es infraestructura real: 1 config, 0 servidores, deploy en 2 comandos.',
    stats: [
      { value: '95+', label: 'LIGHTHOUSE' },
      { value: '$0', label: 'SSL AUTOMÁTICO' },
      { value: '2', label: 'COMANDOS DEPLOY' },
    ],
    primaryCta: {
      label: 'AGENDAR DEMO',
      href: 'https://cal.com/...',
    },
    secondaryCta: {
      label: 'VER PRICING',
      href: '#pricing',
    },
    microcopy: 'Sin humo. Sin lock-in. Sin museos digitales.',
  },

  problems: [
    {
      label: '01 / WORDPRESS MUSEO',
      title: 'El stack que huele a humedad',
      bullets: [
        'hosting barato que se cae cuando más vendes',
        'SSL que pagas aparte como si fuera lujo',
        'plugins que se rompen entre sí',
        '3s de carga y una experiencia que asusta',
      ],
      cost: '✕ $185/año + $300 de mantenimiento escondido',
    },
    {
      label: '02 / WIX / CONSTRUCTORES',
      title: 'Juguete caro con candado',
      bullets: [
        'tu web vive dentro de su jaula',
        'no exportas, no controlas, no te vas fácil',
        'pagas por funciones que deberían ser básicas',
        'el editor se siente como navegar con arena en los ojos',
      ],
      cost: '✕ lock-in total. soporte copy/paste que odia su trabajo (yo fui).',
    },
    {
      label: '03 / ARK SYSTEMS • PARADIGMA NUEVO',
      title: '0 servidores. 0 humo.',
      badge: 'RECOMENDADO',
      bullets: [
        'Cloudflare Pages edge global • 300+ pops',
        'SSL $0, automático y para siempre',
        'config.ts como única fuente de verdad',
        '0 JS por defecto, interactividad opcional',
        'Lighthouse 95+ o devolvemos el setup, según términos',
      ],
      cost: '✓ $15/año total. el resto es arquitectura.',
    },
  ],

  how: {
    label: 'CÓMO LO HACE',
    headline: 'Una fuente de verdad. El resto es ruido.',
    subheadline:
      'Ningún componente decide colores. Ningún texto vive escondido en la UI. Todo el contenido, brand, precios y links viven en un solo lugar.',
    steps: [
      {
        n: '01',
        title: 'src/data/config.ts',
        desc: 'Copy, precios, links, brand y contenido. Editas texto sin tocar componentes.',
        meta: 'single source of truth',
      },
      {
        n: '02',
        title: 'Astro 5 + Tailwind',
        desc: 'Build estático, tokens semánticos, zero JS por defecto. CSS variables, no colores inline.',
        meta: '16 líneas JS total',
      },
      {
        n: '03',
        title: 'wrangler pages deploy',
        desc: 'Edge global en 12s. Sin servidores, sin Docker, sin cPanel, sin lágrimas.',
        meta: '12s deploy • 300 pops',
      },
    ],
    rule: 'No component owns a color. Colores = variables CSS. Espaciado = tokens. JS = islas explícitas. 2 scripts de 16 líneas: menú + modal. El resto es HTML que vuela.',
  },

  stack: [
    { name: 'Cloudflare Pages', desc: 'Edge global, 300+ pops, deploys atómicos.' },
    { name: 'Astro 5', desc: 'Static first, islands opcionales, 0 JS default.' },
    { name: 'Tailwind 3.4', desc: 'Tokens semánticos, sin componente con color hardcodeado.' },
    { name: 'TypeScript strict', desc: 'config.ts tipada, no any, no sustos.' },
    { name: 'Wrangler', desc: 'wrangler pages deploy • 12s • una línea.' },
  ],

  useCases: {
    intro:
      'No es para blogs con 400 plugins. Es para negocios que necesitan una web que cargue, que no se rompa y que no cobre renta por SSL.',
    items: [
      {
        tag: 'RESTAURANTES',
        before: 'WP + Elementor 4.1s • menú PDF',
        after: 'Ark edge 0.4s • menú real • reservas directas',
      },
      {
        tag: 'DESPACHOS',
        before: 'Template ThemeForest + 9 plugins',
        after: 'Config tipada • marca sobria • SEO técnico limpio',
      },
      {
        tag: 'CLÍNICAS',
        before: 'Wix booking que cobra comisión',
        after: 'Cal.com embebido • sin comisión • edge',
      },
      {
        tag: 'REAL ESTATE',
        before: 'WP IDX lento • imágenes 6MB',
        after: 'Astro Image • imágenes optimizadas • mapas edge',
      },
      {
        tag: 'SAAS EARLY',
        before: 'Next.js en Vercel $200/mes',
        after: 'Astro static + edge • $0 hosting para marketing site',
      },
      {
        tag: 'PORTFOLIOS',
        before: 'Squarespace lock-in • export no',
        after: 'Código tuyo • deploy tuyo • dominio tuyo',
      },
    ],
  },

  costs: {
    badge: 'TABLA REAL, NO MARKETING',
    headline: '¿Cuánto te roban al año sin Ark?',
    disclaimer:
      '* Costos típicos de un setup pequeño/medio con hosting compartido, SSL externo y mantenimiento básico. Tu caso puede variar.',
    rows: [
      { concept: 'Hosting', wpWix: '$120/año', ark: '$0 incluido en Pages' },
      { concept: 'SSL', wpWix: '$50/año', ark: '$0 auto' },
      { concept: 'Dominio', wpWix: '$15/año', ark: '$15/año — solo esto pagas' },
      { concept: 'Mantenimiento', wpWix: '$300/año plugins + sustos', ark: '$0' },
      { concept: 'Tiempo de carga', wpWix: '2.8s', ark: '0.4s' },
    ],
    total: {
      wpWix: '$485/año + ansiedad',
      ark: '$15/año. Fin.',
    },
  },

  pricing: {
    label: 'PRICING • SIN TRUCOS',
    headline: 'Elige tu forma de no quedarte obsoleto.',
    subheadline:
      'Compra única si quieres código y control inmediato. Leasing si quieres web siempre actual, deducible y sin golpe fuerte al flujo.',

    plans: [
      {
        id: 'museum',
        kind: 'anti-plan',
        label: 'PLAN MUSEO',
        name: 'WordPress Museo',
        price: 20000,
        currency: 'MXN',
        billing: 'una vez',
        monthlyEquivalent: 500,
        monthlyCurrency: 'MXN',
        available: false,
        badge: 'NO RECOMENDADO • MUSEO DIGITAL',
        summary:
          'Setup + plantilla premium. Tú pagas hosting, SSL y dominio aparte. Se ve bien 6 meses. Luego museo.',
        bullets: [
          'Hosting $1,200 MXN/año, y sube cada año',
          'SSL $1,000 MXN/año',
          'Dominio $400 MXN/año',
          'Mantenimiento WordPress/plugins $3,600 MXN/año o te hackean',
          'Actualización de diseño $8,000 MXN cada 3 años, que nunca pagas',
          'Velocidad 2.8s–4s: pierdes clientes',
          'Obsolescencia garantizada a los 2 años',
          'Fiscal: se capitaliza, amortizas en 3 años, contador sufre',
          'Código: te entregan un zip que nadie puede mantener',
        ],
        total: '~$45,000 MXN en 3 años + web vieja',
        cta: null,
      },
      {
        id: 'purchase',
        kind: 'offer',
        label: 'PARA TECHIES',
        name: 'Ark Compra Única',
        price: 999,
        currency: 'USD',
        billing: 'one_time',
        subprice: '+ $0/mes. Repo tuyo desde día 1.',
        summary:
          'Para quien quiere código, control y fork. Tú hosteas. Nosotros guiamos. Sin updates incluidos.',
        includes: [
          'Código completo Astro 5',
          'config.ts + brand + tokens + contenido inicial',
          'Guía de deploy en Cloudflare Pages',
          'Repo privado GitHub entregado',
          'Dominio configurado por tu cuenta',
          'SSL gestionado por plataforma',
        ],
        excludes: [
          'Updates anuales incluidos',
          'Cambios mensuales incluidos',
          'Hosting administrado',
          'Soporte infinito',
        ],
        cta: {
          label: 'VER REPO →',
          href: 'https://github.com/...',
        },
        microcopy: 'Ideal si quieres el código y sabes mantenerlo.',
      },
      {
        id: 'leasing',
        kind: 'offer',
        label: '★ RECOMENDADO • LEASING',
        name: 'Ark Leasing',
        setup: 0,
        monthly: 249,
        currency: 'USD',
        monthlyApproxMXN: 4200,
        contractMonths: 12,
        residual: 499,
        residualCurrency: 'USD',
        subprice:
          'Residual $499 USD al final, o renueva y te la dejamos como nueva con última tecnología.',
        summary: 'TODO incluido por $249 USD/mes — renta fija, no sorpresas.',
        includes: [
          'Hosting Edge Global Cloudflare',
          'SSL infinito auto-renovable',
          'Dominio según plan, pendiente definir inclusión exacta',
          'Updates de infraestructura base',
          '1 hora de cambios/mes incluidos',
          'Rediseño anual si renuevas',
          '100% deducible + CFDI mensual, sujeto a criterio contable',
          'Lighthouse 95+ como estándar bajo presupuesto definido',
          'Repo privado GitHub durante el contrato',
          'Opción de pagar residual $499 USD y quedarte con repo completo',
        ],
        total36Months: '$8,964 USD en 36 meses, 100% deducible según estructura fiscal acordada.',
        cta: {
          label: 'Empezar Leasing →',
          href: 'https://cal.com/...',
        },
        ctaBadge: 'sin setup',
        microcopy: 'Sin permanencia forzada • Cancela cuando quieras • CFDI mensual',
      },
    ],

    fiscal: {
      badge: '100% DEDUCIBLE • TU CONTADOR VA A QUERER SER NUESTRO SOCIO',
      headline: 'No es un gasto. Es infraestructura deducible mes a mes.',
      body: 'Compra única = activo intangible que se amortiza en 36 meses. Tu contador hace malabares, tu flujo sufre. Leasing Ark = gasto operativo mensual 100% deducible de ISR. Facturamos desde Substrate Holdings LLC (US) / Substrate México S.A. CFDI mensual incluido. Ideal para personas morales y físicas con actividad empresarial.',
      badges: ['Incluye CFDI mensual', 'ISR 100% deducible', 'Sin activo en balance'],
      comparison: [
        {
          model: 'Compra $20k',
          effect: 'Amortizas $555/mes x 36m',
          cashflow: 'No deduces hoy',
        },
        {
          model: 'Leasing $249/mes',
          effect: 'Deduces $4,200 MXN aprox. hoy',
          cashflow: 'Flujo intacto',
        },
      ],
      disclaimer:
        '* La deducibilidad depende del régimen fiscal, criterio contable y estructura contractual de cada cliente. Esto no es asesoría fiscal.',
    },

    paymentMethods: [
      {
        code: 'MXN',
        title: 'Pesos Mexicanos',
        method: 'SPEI / Transferencia interbancaria',
        badge: 'Más usado',
        detail: 'CLABE • Referencia automática • CFDI en MXN',
      },
      {
        code: 'USD',
        title: 'Dólares',
        method: 'ACH / Wire / USD-MXN sin comisión',
        badge: 'Para US LLC',
        detail: 'Mercury / Relay • Tipo de cambio FIX sin spread',
      },
      {
        code: 'USDT',
        title: 'Stablecoins',
        method: 'TRC20, ERC20, Polygon, Arbitrum',
        badge: 'USDT • USDC • DAI',
        detail: 'Confirmación <2 min • Sin volatilidad',
      },
      {
        code: 'BTC',
        title: 'Bitcoin',
        method: 'On-chain + Lightning Network',
        badge: '0% comisión',
        detail: 'BTCPay Server self-hosted • No custodial',
      },
    ],

    btcCopy:
      'Si aceptas Bitcoin en tu negocio, ¿por qué tu agencia no? BTCPay Server • Sin intermediarios • Tú controlas tus llaves.',
  },

  finalCta: {
    headline: '¿Tu web sigue igual desde 2012?',
    subheadline:
      'Es hora de rentar futuro, no comprar obsolescencia. Deja de pagar por un museo digital. Renta una web que trabaja, deduce, y nunca da vergüenza presentar.',
    primary: {
      label: 'Agendar demo 15 min ↗',
      href: 'https://cal.com/...',
    },
    secondary: {
      label: 'Ver contrato tipo leasing',
      href: '/leasing-contrato', // pendiente
    },
    microcopy: 'Respuesta < 2h • Contrato en 1 página • Sin letra chica',
  },

  footer: {
    copyright: '© 2026 Substrate Holdings LLC • ARK SYSTEMS',
    tagline: 'Hecho por alguien que sufrió Wix y no quiere que tú sufras.',
    tech: 'Astro 5 • Cloudflare Edge • 0.4s',
  },

  contact: {
    email: 'hola@arksystems.dev', // pendiente
    whatsapp: '', // pendiente
    formEndpoint: '', // pendiente: Formspree o Cloudflare Function
    bookingUrl: 'https://cal.com/...', // pendiente
  },
} as const;
```

---

## 11. Próximo paso recomendado

Una vez que este documento quede aprobado o semi-aprobado, el siguiente paso no es tocar componentes todavía.

Es:

1. Revisar y cerrar copy definitivo.
2. Traducirlo a `src/data/config.ts`.
3. Asegurar que componentes como `Hero.astro`, `PricingTable.astro`, `PortfolioGrid.astro`, `Header.astro` y `Footer.astro` lean exclusivamente de config.
4. Recién después hacer `MobileNav.astro`, success page y backend de formulario.

Así evitamos escribir copy dos veces: una en prototipo y otra en componentes.
