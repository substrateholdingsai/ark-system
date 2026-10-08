import React, { useState } from 'react';

const FEATURES = [
  {
    icon: '◫',
    title: 'Fuentes de datos',
    description:
      'Un colector real podría consultar fuentes públicas con límites, permisos y validación explícitos.',
    color: '#F7931A',
    tag: 'INGESTA',
  },
  {
    icon: '◧',
    title: 'Memoria auditable',
    description:
      'Los registros estructurados pueden conservar procedencia y fecha para facilitar su revisión.',
    color: '#06B6D4',
    tag: 'TRAZABILIDAD',
  },
  {
    icon: '◩',
    title: 'Umbrales configurables',
    description:
      'Reglas de ejemplo ilustran cómo una aplicación podría clasificar cambios en los datos.',
    color: '#F7931A',
    tag: 'REGLAS',
  },
  {
    icon: '◪',
    title: 'API conceptual',
    description:
      'Una interfaz podría exponer datos documentados tras implementar y asegurar un servicio real.',
    color: '#00FF41',
    tag: 'API',
  },
  {
    icon: '⬡',
    title: 'Arquitectura edge',
    description:
      'Workers, almacenamiento y tareas programadas son opciones arquitectónicas, no servicios activos aquí.',
    color: '#06B6D4',
    tag: 'EDGE',
  },
  {
    icon: '⬢',
    title: 'Consumo máquina a máquina',
    description:
      'Un producto de datos podría diseñarse para clientes automatizados después de validar su utilidad.',
    color: '#00FF41',
    tag: 'M2M',
  },
];

const BUYERS = [
  {
    title: 'Operadores de minería',
    description:
      'Podrían consultar series históricas para entender cambios entre distintas fuentes.',
    icon: '◈',
  },
  {
    title: 'Analistas de mercado',
    description:
      'Podrían comparar observaciones documentadas sin tratar la demo como señal operativa.',
    icon: '◎',
  },
  {
    title: 'Desarrolladores de software',
    description: 'Podrían integrar conjuntos de datos si existieran una API y licencias aprobadas.',
    icon: '⬔',
  },
];

const ARCHITECTURE = [
  'ARQUITECTURA ILUSTRATIVA',
  '• API y colector',
  '• Registros con procedencia',
  '• Búsqueda conceptual',
  'Tareas programadas',
  'Almacenamiento de datos',
  'Integraciones no configuradas',
];

export default function TalosApp() {
  const [tick, setTick] = useState(0);
  const spread = (7.2 + Math.sin(tick / 5) * 1.8).toFixed(2);

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black text-white antialiased selection:bg-[#00FF41] selection:text-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,255,65,0.08),transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(247,147,26,0.08),transparent_60%)]"
      />
      <div className="relative z-10">
        <div className="w-full border-b border-amber-300/20 bg-amber-300 px-4 py-2 text-center font-mono text-[10px] font-bold tracking-[0.16em] text-black sm:text-[11px]">
          DEMO • SIMULACIÓN LOCAL • SIN DATOS EN VIVO, OPERACIONES NI SERVICIOS FINANCIEROS
        </div>

        <div className="border-b border-white/10 bg-black/80">
          <div className="mx-auto flex min-h-[52px] max-w-[1280px] flex-wrap items-center justify-between gap-2 px-5 py-2 md:px-10">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-amber-200 sm:text-[11px]">
                COLLECTOR_SIMULADO
              </span>
              <span className="hidden h-3 w-px bg-white/20 md:inline" />
              <span className="hidden font-mono text-[11px] text-white/50 md:inline">
                valores ficticios • tick {tick} • spread simulado {spread}%
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-white/50">
              CONCEPTO • SIN CONEXIÓN A SERVICIOS
            </span>
          </div>
        </div>

        <section className="mx-auto max-w-[1280px] px-5 pb-12 pt-12 md:px-10 md:pb-20 md:pt-24">
          <div className="max-w-[900px]">
            <div className="inline-flex flex-wrap items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#00FF41]">
                TALOS // COLECTOR DE DATOS
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="font-mono text-[10px] tracking-[0.12em] text-white/50">
                PROTOTIPO VISUAL
              </span>
            </div>
            <h1 className="mt-8 break-words font-mono text-[13vw] font-bold leading-[0.86] tracking-[-0.04em] sm:text-7xl md:text-[92px]">
              <span className="block text-white">TALOS</span>
              <span
                className="block text-transparent"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}
              >
                AUTOMATED
              </span>
              <span className="block text-[#00FF41]">DATA</span>
              <span className="block text-white/20">COLLECTOR</span>
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <p className="font-mono text-[14px] tracking-[0.1em] text-white/70 md:text-[16px]">
                NO MINA POR TI. RECUERDA POR TI.
              </p>
              <span className="hidden h-4 w-px bg-white/20 md:inline" />
              <p className="max-w-[46ch] font-mono text-[12px] leading-relaxed text-white/40">
                Concepto de recopilación y consulta de datos para el sector de minería Bitcoin. No
                conecta con mercados, pools, nodos ni servicios de terceros.
              </p>
            </div>
          </div>

          <div className="mt-12 grid max-w-[980px] grid-cols-2 gap-px border border-white/10 bg-white/10 md:grid-cols-4">
            {[
              ['ESTADO', 'SIMULADO', 'sin colector activo'],
              ['UMBRAL DE EJEMPLO', '≥8%', 'regla ilustrativa'],
              ['ALMACENAMIENTO', 'N/D', 'sin servicio conectado'],
              ['PRECIO API', 'N/D', 'sin API ni cobros'],
            ].map(([label, value, sub]) => (
              <div key={label} className="bg-black p-4 sm:p-5">
                <div className="font-mono text-[9px] tracking-[0.16em] text-white/40 sm:text-[10px]">
                  {label}
                </div>
                <div className="mt-2 break-words font-mono text-lg font-bold tracking-tight text-white sm:text-[23px]">
                  {value}
                </div>
                <div className="mt-1 font-mono text-[10px] text-white/40 sm:text-[11px]">{sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-[1280px] items-start gap-10 px-5 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-20">
          <div>
            <h2 className="font-serif text-[36px] leading-[0.95] tracking-tight sm:text-[46px] md:text-[54px]">
              De minar datos
              <br />
              <span className="text-white/40">a observarlos</span>
              <br />
              <span className="text-[#00FF41]">con contexto.</span>
            </h2>
            <div className="mt-8 max-w-[55ch] space-y-5 font-mono text-[12px] leading-[1.7] text-white/60 sm:text-[13px]">
              <p>
                La propuesta explora un colector que conservaría observaciones de distintas fuentes
                con marcas de tiempo y procedencia verificables.
              </p>
              <p>
                La interfaz ilustra métricas y reglas ficticias. No consulta exchanges, pools,
                precios ni datos de minería y no ejecuta decisiones automatizadas.
              </p>
              <div className="border-l-2 border-[#00FF41]/40 bg-[#00FF41]/[0.04] py-2 pl-4">
                <span className="font-bold text-[#00FF41]">ALCANCE:</span>
                <span className="ml-2 text-white">
                  visualización de concepto, sin estrategia de inversión ni promesa de rendimiento.
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="relative overflow-hidden border border-[#F7931A]/30 bg-[#F7931A]/[0.06] p-6">
              <div className="font-mono text-[10px] tracking-[0.25em] text-[#F7931A]">
                TALOS_V1 // CONCEPTO
              </div>
              <div className="mt-3 font-mono text-[18px] font-bold">
                Operación intensiva en hardware
              </div>
              <p className="mt-2 font-mono text-[12px] leading-relaxed text-white/60">
                Ejemplo conceptual de un modelo centrado en capacidad de cómputo y exposición
                operativa.
              </p>
              <ul className="mt-4 space-y-2 font-mono text-[12px] text-white/60">
                {[
                  'Capex y riesgo operativo',
                  'Datos que requieren trazabilidad',
                  'Exposición al mercado',
                ].map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-[#F7931A]">—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-[#00FF41]/30 bg-[#00FF41]/[0.06] p-6">
              <div className="font-mono text-[10px] tracking-[0.25em] text-[#00FF41]">
                TALOS_V2 // COLECTOR DE DATOS
              </div>
              <div className="mt-3 font-mono text-[18px] font-bold">
                Observar. Registrar. Consultar.
              </div>
              <p className="mt-2 font-mono text-[12px] leading-relaxed text-white/60">
                Alternativa ilustrativa enfocada en recolectar y consultar datos; no administra
                tesorería ni ejecuta operaciones.
              </p>
              <ul className="mt-4 space-y-2 font-mono text-[12px] text-white/80">
                {[
                  'Fuentes configurables',
                  'Registros con procedencia',
                  'Consultas sujetas a acceso',
                ].map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-[#00FF41]">+</span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="border border-white/20 px-3 py-2 font-mono text-[10px] text-white/50">
                  TESORERÍA NO CONFIGURADA
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  spread simulado {spread}%
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-20">
          <div className="mb-8 flex items-center gap-3">
            <span className="border border-[#00FF41]/30 px-2 py-1 font-mono text-[11px] tracking-[0.2em] text-[#00FF41]">
              CAPACIDADES CONCEPTUALES
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00FF41]/30 to-transparent" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <article
                key={feature.tag}
                className="border border-white/10 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04] sm:p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className="grid h-9 w-9 place-items-center border bg-black/60"
                    style={{ borderColor: `${feature.color}40`, color: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <span
                    className="border bg-black/40 px-2 py-1 font-mono text-[9px] tracking-widest sm:text-[10px]"
                    style={{ borderColor: `${feature.color}30`, color: feature.color }}
                  >
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-mono text-[14px] font-bold tracking-wide">{feature.title}</h3>
                <p className="mt-3 font-mono text-[12px] leading-relaxed text-white/50">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-[1280px] gap-12 px-5 py-12 md:grid-cols-2 md:px-10 md:py-20">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="border border-[#06B6D4]/30 px-2 py-1 font-mono text-[11px] tracking-[0.2em] text-[#06B6D4]">
                ARQUITECTURA
              </span>
            </div>
            <div className="border border-white/10 bg-white/[0.02] p-5 font-mono text-[11px] leading-relaxed sm:p-6">
              {ARCHITECTURE.map((line, index) => (
                <div
                  key={line}
                  className={
                    index === 0
                      ? 'font-bold tracking-widest text-[#F7931A]'
                      : line.startsWith('•')
                        ? 'ml-2 text-white/50'
                        : 'text-white/80'
                  }
                >
                  {line}
                </div>
              ))}
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                <div>
                  <div className="text-[10px] tracking-widest text-white/30">COLECTOR</div>
                  <div className="mt-1 text-white">No configurado</div>
                  <div className="text-[11px] text-white/40">sin tareas activas</div>
                </div>
                <div>
                  <div className="text-[10px] tracking-widest text-white/30">MEMORIA</div>
                  <div className="mt-1 text-white">Conceptual</div>
                  <div className="text-[11px] text-white/40">sin datos persistidos</div>
                </div>
              </div>
              <div className="mt-4 rounded-[12px] border border-white/10 bg-[#0A0A0A] p-4">
                <div className="font-mono text-[11px] text-[#00FF41]">
                  $ ejemplo de respuesta (simulada)
                </div>
                <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-[10px] text-white/40 sm:text-[11px]">
                  {`{ "signal": "DEMO", "spread": "${spread}%", "source": null, "live": false }`}
                </pre>
              </div>
              <button
                type="button"
                onClick={() => setTick((current) => current + 1)}
                className="mt-4 border border-[#00FF41]/30 px-3 py-2 font-mono text-[10px] text-[#00FF41] transition-colors hover:bg-[#00FF41]/10"
              >
                Avanzar tick de simulación
              </button>
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="border border-[#F7931A]/30 px-2 py-1 font-mono text-[11px] tracking-[0.2em] text-[#F7931A]">
                POSIBLES USUARIOS
              </span>
            </div>
            <div className="space-y-3">
              {BUYERS.map((buyer) => (
                <article
                  key={buyer.title}
                  className="flex gap-4 border border-white/10 bg-gradient-to-r from-white/[0.04] to-transparent p-4"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center border border-white/10 bg-black font-mono text-white/50">
                    {buyer.icon}
                  </div>
                  <div>
                    <h3 className="font-mono text-[13px] font-bold">{buyer.title}</h3>
                    <p className="mt-1 font-mono text-[12px] leading-relaxed text-white/50">
                      {buyer.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 border border-[#00FF41]/20 bg-[#00FF41]/[0.04] p-5 sm:p-6">
              <div className="font-mono text-[10px] tracking-[0.18em] text-[#00FF41]">
                ACCESO A DATOS — NO DISPONIBLE
              </div>
              <p className="mt-3 font-serif text-[20px] leading-[1.1]">
                Las rutas de API y el acceso de pago solo se ilustran como posibilidades futuras.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] text-white/50">
                <span className="border border-white/20 px-2 py-1">API no activa</span>
                <span className="border border-white/20 px-2 py-1">Sin L402</span>
                <span className="border border-white/20 px-2 py-1">Sin cobros</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-8 border-t border-white/10">
          <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-6 px-5 py-10 md:flex-row md:px-10 md:py-14">
            <div>
              <div className="font-mono text-[10px] tracking-[0.25em] text-white/40">
                TALOS // COLECTOR DE DATOS
              </div>
              <p className="mt-3 max-w-[48ch] font-mono text-[12px] leading-relaxed text-white/50">
                Concepto visual para explorar una arquitectura de datos. No representa un servicio
                desplegado, una oportunidad de inversión ni una oferta de rendimiento.
              </p>
            </div>
            <div className="font-mono text-[10px] leading-relaxed text-white/40">
              <div>DEMO LOCAL • VALORES FICTICIOS</div>
              <div className="mt-1">Sin colector, tesorería, API ni mercado conectados.</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Workers', 'D1', 'R2', 'Vectorize'].map((item) => (
                  <span key={item} className="border border-white/10 px-2 py-1">
                    {item} • CONCEPTO
                  </span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
