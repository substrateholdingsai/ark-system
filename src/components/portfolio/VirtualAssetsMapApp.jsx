import React, { useMemo, useState } from 'react';

const TOPICS = [
  {
    id: 1,
    category: 'PLATAFORMAS',
    title: 'Operación de plataformas de activos virtuales',
    reference: 'Ley Fintech • referencia y alcance por verificar',
    color: '#ff6b1a',
    proposed: false,
  },
  {
    id: 2,
    category: 'CUSTODIA',
    title: 'Uso o transferencia de activos virtuales de clientes',
    reference: 'Ley Fintech • artículo citado en el material: 119',
    color: '#ff1a1a',
    proposed: false,
  },
  {
    id: 3,
    category: 'CUSTODIA',
    title: 'Desvío de activos virtuales bajo administración',
    reference: 'Ley Fintech • artículo citado en el material: 121',
    color: '#ff1a1a',
    proposed: false,
  },
  {
    id: 4,
    category: 'CIBERSEGURIDAD',
    title: 'Acceso o transferencia no autorizada de activos virtuales',
    reference: 'Ley Fintech • artículo citado en el material: 133',
    color: '#ff1a1a',
    proposed: false,
  },
  {
    id: 5,
    category: 'DATOS',
    title: 'Divulgación de información financiera o confidencial',
    reference: 'Ley Fintech • artículo citado en el material: 122',
    color: '#ff6b1a',
    proposed: false,
  },
  {
    id: 6,
    category: 'CUSTODIA',
    title: 'Devolución de activos virtuales encomendados',
    reference: 'Ley Fintech • artículo citado en el material: 120',
    color: '#ff1a1a',
    proposed: false,
  },
  {
    id: 7,
    category: 'PREVENCIÓN',
    title: 'Avisos relacionados con operaciones de activos virtuales',
    reference: 'LFPIORPI • artículo citado en el material: 32',
    color: '#ffcc00',
    proposed: false,
  },
  {
    id: 8,
    category: 'PREVENCIÓN',
    title: 'Operaciones con activos virtuales y prevención de lavado',
    reference: 'CPF y LFPIORPI • aplicabilidad por verificar',
    color: '#ff1a1a',
    proposed: false,
  },
  {
    id: 9,
    category: 'SEGURIDAD PERSONAL',
    title: 'Robo o coacción relacionados con activos virtuales',
    reference: 'CPF • supuestos y artículos por verificar',
    color: '#ff1a1a',
    proposed: false,
  },
  {
    id: 10,
    category: 'FISCAL',
    title: 'Declaración de ganancias relacionadas con activos virtuales',
    reference: 'CFF y disposiciones fiscales • tratamiento por verificar',
    color: '#ff6b1a',
    proposed: false,
  },
  {
    id: 11,
    category: 'PROPUESTAS',
    title: 'Propuestas sobre emisión de activos virtuales estables',
    reference: 'Iniciativa legislativa mencionada en el material; estado por verificar',
    color: '#10e6a0',
    proposed: true,
  },
  {
    id: 12,
    category: 'PROPUESTAS',
    title: 'Propuestas de transparencia y reservas para activos estables',
    reference: 'Iniciativa legislativa mencionada en el material; estado por verificar',
    color: '#10e6a0',
    proposed: true,
  },
];

const CATEGORIES = [
  'TODOS',
  'PLATAFORMAS',
  'CUSTODIA',
  'CIBERSEGURIDAD',
  'DATOS',
  'PREVENCIÓN',
  'SEGURIDAD PERSONAL',
  'FISCAL',
  'PROPUESTAS',
];

export default function VirtualAssetsMapApp() {
  const [category, setCategory] = useState('TODOS');
  const [query, setQuery] = useState('');
  const [proposalsOnly, setProposalsOnly] = useState(false);

  const filteredTopics = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es');

    return TOPICS.filter((topic) => {
      const matchesCategory = category === 'TODOS' || topic.category === category;
      const matchesProposal = !proposalsOnly || topic.proposed;
      const matchesQuery =
        !normalizedQuery ||
        `${topic.title} ${topic.category} ${topic.reference}`
          .toLocaleLowerCase('es')
          .includes(normalizedQuery);

      return matchesCategory && matchesProposal && matchesQuery;
    });
  }, [category, proposalsOnly, query]);

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#050507] font-mono text-white antialiased">
      <div className="sticky top-0 z-20 border-b border-amber-500/30 bg-[#111]/95 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-amber-400" />
            <span className="text-[10px] tracking-[0.2em] text-amber-300 sm:text-[11px]">
              MAPA CONCEPTUAL • ACTIVOS VIRTUALES
            </span>
          </div>
          <span className="border border-amber-400/30 px-2 py-1 text-[9px] tracking-widest text-amber-200">
            REFERENCIAS SIN VALIDAR
          </span>
        </div>
        <div className="border-y border-amber-500/20 bg-amber-500/10 px-5 py-3 text-[11px] leading-relaxed text-amber-100 md:px-8">
          Material educativo de demostración. Las referencias legales provienen del contenido
          proporcionado y no se han verificado: podrían estar incompletas, desactualizadas o ser
          incorrectas. No uses este mapa para decidir ni para obtener asesoría legal.
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <section className="grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr] md:py-16">
          <div>
            <span className="inline-flex border border-[#00FF41]/30 bg-[#00FF41]/5 px-3 py-1.5 text-[9px] tracking-[0.16em] text-[#00FF41] sm:text-[10px]">
              TALOS • MAPA DE TEMAS PARA REVISIÓN
            </span>
            <h1 className="mt-6 text-[34px] font-bold leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-[56px]">
              <span className="text-white">Activos virtuales</span>
              <br />
              <span className="text-white/40">y marco regulatorio</span>
              <br />
              <span className="text-[#ff6b1a]">México • conceptos</span>
            </h1>
            <p className="mt-5 max-w-[62ch] text-[12px] leading-[1.8] text-white/60 sm:text-[13px]">
              Explora temas que podrían requerir análisis jurídico especializado. Cada tarjeta es
              una etiqueta de navegación basada en el material de origen; no determina si una
              conducta es legal, ilegal o sancionable.
            </p>
          </div>

          <aside className="border border-[#00FF41]/20 bg-[#00FF41]/[0.04] p-5">
            <div className="text-[10px] tracking-[0.2em] text-[#00FF41]">ALCANCE DE LA DEMO</div>
            <h2 className="mt-3 text-[18px] font-bold">Organiza temas. No interpreta la ley.</h2>
            <ul className="mt-4 space-y-2 text-[11px] leading-relaxed text-white/60">
              <li>• Referencias y artículos requieren validación profesional.</li>
              <li>• No se muestran sanciones ni conclusiones jurídicas.</li>
              <li>• Las propuestas legislativas pueden cambiar de estado.</li>
              <li>• Talos no evalúa cumplimiento ni determina una “zona segura”.</li>
            </ul>
          </aside>
        </section>

        <section className="-mx-5 border-y border-white/10 bg-white/[0.02] px-5 py-4 md:-mx-8 md:px-8">
          <label className="flex flex-col gap-2 text-[10px] tracking-widest text-white/40 sm:flex-row sm:items-center">
            <span>BUSCAR TEMA</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="conducta, materia o referencia..."
              className="min-h-10 w-full border border-white/20 bg-black px-3 text-[11px] text-white outline-none placeholder:text-white/30 focus:border-[#00FF41]/60 sm:max-w-[420px]"
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Filtrar por materia">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={`border px-2.5 py-1.5 text-[9px] tracking-wider transition-colors ${
                  category === item
                    ? 'border-white bg-white text-black'
                    : 'border-white/20 bg-black text-white/60 hover:border-white/50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[10px] text-white/60">
            <input
              type="checkbox"
              checked={proposalsOnly}
              onChange={(event) => setProposalsOnly(event.target.checked)}
              className="accent-[#00FF41]"
            />
            Mostrar solo temas marcados como propuestas en el material
          </label>
          <p className="mt-3 text-[10px] text-white/40" aria-live="polite">
            {filteredTopics.length} temas visibles • {TOPICS.length} en total • sin clasificación
            legal
          </p>
        </section>

        <section
          aria-label="Temas para revisión jurídica"
          className="grid grid-cols-1 gap-px border-x border-b border-white/10 bg-white/10 py-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredTopics.map((topic) => (
            <article
              key={topic.id}
              className="relative bg-[#0A0A0A] p-5 transition-colors hover:bg-[#101010]"
            >
              <div
                className="absolute left-0 top-0 h-[2px] w-full"
                style={{ background: topic.color }}
              />
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center border border-white/20 bg-black text-[10px]">
                  {String(topic.id).padStart(2, '0')}
                </span>
                <span
                  className="border px-2 py-1 text-right text-[9px] tracking-widest"
                  style={{
                    borderColor: `${topic.color}40`,
                    color: topic.color,
                    background: `${topic.color}15`,
                  }}
                >
                  {topic.category}
                </span>
              </div>
              <h2 className="mt-4 min-h-10 text-[13px] font-bold leading-[1.4] tracking-tight">
                {topic.title}
              </h2>
              <div className="mt-4 border-t border-white/10 pt-3">
                <div className="text-[9px] tracking-widest text-white/30">
                  REFERENCIA APORTADA • PENDIENTE DE VALIDAR
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-white/60">{topic.reference}</p>
              </div>
              <div className="mt-4 border border-amber-400/20 bg-amber-400/[0.04] px-2.5 py-2 text-[9px] leading-relaxed text-amber-100/80">
                Requiere revisión de fuentes oficiales y asesoría profesional.
              </div>
            </article>
          ))}
          {filteredTopics.length === 0 && (
            <p className="col-span-full p-8 text-center text-[12px] text-white/50">
              No se encontraron temas con esos filtros.
            </p>
          )}
        </section>

        <section className="grid gap-6 py-10 md:grid-cols-2 md:py-14">
          <div className="border border-white/10 bg-black p-5 sm:p-6">
            <div className="mb-4 text-[10px] tracking-[0.2em] text-[#00FF41]">
              // FLUJO DE REVISIÓN • ILUSTRATIVO
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap break-words text-[10px] leading-[1.8] text-white/60 sm:text-[11px]">
              {`const topic = "requiere_revision";
const referenceVerified = false;
const legalConclusion = null;

if (!referenceVerified) {
  showNotice("Validación profesional pendiente");
}`}
            </pre>
            <p className="mt-4 border-t border-white/10 pt-4 text-[10px] leading-relaxed text-white/40">
              El bloque representa una interfaz conceptual; no es software de cumplimiento ni un
              motor que evalúe conductas.
            </p>
          </div>
          <aside className="border border-[#ff6b1a]/20 bg-[#ff6b1a]/[0.04] p-5 sm:p-6">
            <div className="text-[10px] tracking-[0.2em] text-[#ff6b1a]">
              ANTES DE USAR UNA REFERENCIA
            </div>
            <h2 className="mt-3 font-serif text-[22px] leading-tight">
              Consulta fuentes oficiales y a una persona profesional del derecho.
            </h2>
            <p className="mt-3 text-[11px] leading-relaxed text-white/60">
              No se incluyeron enlaces legales externos porque el material recibido no proporciona
              fuentes oficiales verificadas. La búsqueda de esta página solo filtra el texto
              visible.
            </p>
          </aside>
        </section>
      </div>
    </div>
  );
}
