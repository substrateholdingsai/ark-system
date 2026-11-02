import React, { useState, useMemo } from 'react';
import { Check, Copy, Printer, Shield } from 'lucide-react';

interface CheckItem {
  id: string;
  title: string;
  desc: string;
  tag: string;
}

const satItems: CheckItem[] = [
  { id: "c1-1", title: "Art. 30 CFF – Contabilidad 5-10 años", desc: "con Sello SHA-256 + QR verificación pública /verify?hash=", tag: "#01" },
  { id: "c1-2", title: "Art. 17-A y 21 CFF", desc: "Actualización y Recargos automáticos", tag: "#02" },
  { id: "c1-3", title: "CFDI 4.0 Anexo 20", desc: "Timbrado + Complementos + Detector Atípicos (Benford, EFOS 69-B, Z-Score)", tag: "#20" },
  { id: "c1-4", title: "Art. 69-B CFF", desc: "Listas negras EFOS / EDOS – validación diaria", tag: "#06" },
  { id: "c1-5", title: "Buzón Tributario", desc: "Notificaciones y ventana de 72hrs", tag: "#04" },
  { id: "c1-6", title: "e.firma / CSD", desc: "Vigencia, revocación y custodia", tag: "#05" },
  { id: "c1-7", title: "Contabilidad Electrónica", desc: "Balanza, Pólizas, Catálogo XML mensual", tag: "#08" },
  { id: "c1-8", title: "Dictamen Fiscal Art. 32-A CFF", desc: "SIPRED + umbrales obligatorios", tag: "#18" },
];

const imssItems: CheckItem[] = [
  { id: "c2-1", title: "Cruce Laboral-Fiscal #12", desc: "SUA vs Nómina vs CFDI – inconsistencias", tag: "#12" },
  { id: "c2-2", title: "IMSS Modalidad 40 #19", desc: "Cálculo retroactivo y proyección", tag: "#19" },
  { id: "c2-3", title: "NOM-151 / ATEB PSC", desc: "Conservación mensajes 10 años – Bóveda Offline .zip + offline-viewer.html", tag: "#09" },
  { id: "c2-4", title: "REPSE", desc: "Registro prestadoras especializadas + ICSOE/SISUB", tag: "#11" },
  { id: "c2-5", title: "PTU", desc: "Participación trabajadores 10% + CFDI anual", tag: "#14" },
  { id: "c2-6", title: "Nómina CFDI 4.0", desc: "Subsidio, ISR, IMSS, INFONAVIT conciliado", tag: "#10" },
  { id: "c2-7", title: "Vacaciones Ley 2023", desc: "Días proporcionales + prima vacacional", tag: "#15" },
  { id: "c2-8", title: "Buzón IMSS", desc: "Opinión de cumplimiento y requerimientos", tag: "#13" },
];

const camaraItems: CheckItem[] = [
  { id: "c3-1", title: "Ley de Cámaras Art. 17 – SIEM", desc: "Obligatorio – Padrón CANACO y sincronización automática", tag: "#03" },
  { id: "c3-2", title: "DOF / SAT / CONDUSEF / CNBV / BANXICO", desc: "Monitor Sentinela con webhooks HMAC", tag: "#07" },
  { id: "c3-3", title: "NOM-037 Teletrabajo", desc: "Contrato, política y checklist puesto", tag: "#16" },
  { id: "c3-4", title: "NOM-035 Psicosocial + NOM-019 STPS", desc: "Cuestionarios, comisiones, evidencias", tag: "#16" },
  { id: "c3-5", title: "LFPDPPP – Aviso privacidad", desc: "Aviso + Derechos ARCO + transferencias", tag: "#17" },
  { id: "c3-6", title: "Código Comercio Art. 33-46", desc: "Conservación 10 años – mercantil", tag: "#09" },
  { id: "c3-7", title: "CONDUSEF / REDECO / REUNE", desc: "Para SOFOM / FINTECH / SOC", tag: "#07" },
  { id: "c3-8", title: "Profeco / Antilavado UIF", desc: "Contratos adhesión + Avisos Art. 17 LFPIORPI", tag: "#21" },
];

const coverageMatrix = [
  { k: "LEDGER", d: "Col 1+2 · 19 tools · Papel de Trabajo Oficial PDF", h: "@media print", color: "bg-[#2563EB]" },
  { k: "ANGEL", d: "NOM-151 Voz $0.25/min · Bitácora SHA-256", h: "Voz nativa", color: "bg-[#0F1A2E]" },
  { k: "COMMERCE", d: "Profeco · Contratos adhesión · Comercio", h: "Retail", color: "bg-[#334155]" },
  { k: "SALES", d: "Triador riesgo SAT · 4 agentes clasificadores", h: "Riesgo", color: "bg-[#475569]" },
  { k: "SENTINELA", d: "DOF / SAT / CNBV / Banxico monitor HMAC", h: "Alertas", color: "bg-[#1E40AF]" },
  { k: "HERMES US", d: "SOS / SEC Delaware para expansión", h: "US", color: "bg-[#1E293B]" },
  { k: "SELLO", d: "SHA-256 + QR verificación sin login", h: "/verify", color: "bg-[#2563EB]" },
];

export default function RegulatoryChecklistApp() {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const allItems = useMemo(() => [...satItems, ...imssItems, ...camaraItems], []);
  const completedCount = checkedIds.size;
  const percentage = Math.round((completedCount / allItems.length) * 100);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyMissing = () => {
    const missing = allItems
      .filter((item) => !checkedIds.has(item.id))
      .map((item) => `- [ ] ${item.title} (${item.tag})`)
      .join('\n');

    const text = `Checklist Regulatorio México - ${completedCount}/${allItems.length} completados\n\nFALTANTES POR ATENDER:\n${missing}\n\nGenerado desde ARK SYSTEMS (arksystems.site/checklist)`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const columns = [
    { title: "OBLIGATORIO SAT / CFF", sub: "Lo que te pide el SAT en auditoría", items: satItems, accent: "SAT" },
    { title: "LABORAL / IMSS / FISCAL CRUZADO", sub: "Lo que cruza el IMSS con el SAT", items: imssItems, accent: "IMSS" },
    { title: "OPERATIVO / CÁMARAS / REGULATORIO", sub: "Lo que te pide tu Cámara y regulador", items: camaraItems, accent: "CÁMARA" },
  ];

  return (
    <div className="w-full box-border text-slate-900">
      {/* Top action / status bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6EEFF] pb-6">
        <div className="flex items-center gap-2">
          <span className="mono rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
            AUDITORÍA PREVENTIVA · 24 CONTROLES
          </span>
          <span className="mono text-xs text-slate-500 hidden sm:inline">
            Alineado a CFF, IMSS, LFT y NOM-151
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyMissing}
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-slate-900 px-4 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copied ? "¡Copiado para contador!" : "Copiar faltantes"}</span>
          </button>

          <button
            onClick={handlePrint}
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Imprimir PDF (Ctrl+P)</span>
          </button>
        </div>
      </div>

      {/* Hero statement */}
      <div className="mt-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
        <div>
          <h1 className="instrument text-4xl sm:text-5xl lg:text-[56px] leading-[1.02] tracking-tight text-slate-950">
            En México, operar una empresa <span className="italic text-slate-500 font-normal">no es usar un CRM bonito.</span>
            <br />
            Es pasar el checklist del regulador.
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 max-w-xl">
            Si te falta uno, te multa el SAT, te inhabilita el IMSS o te invalidan contratos por carecer de constancia <strong className="font-semibold text-slate-900">NOM-151</strong>. HubSpot o Salesforce no saben qué es esto. Nosotros sí, y lo convertimos en software edge-native.
          </p>
        </div>

        {/* Coverage summary card */}
        <div className="rounded-2xl border border-[#DCE7FF] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="mono text-xs font-semibold uppercase tracking-wider text-slate-700">
              CÓMO CUBRE ARK ESTOS 24 CONTROLES
            </span>
            <span className="mono text-xs font-bold text-blue-600">
              {completedCount}/24 marcados ({percentage}%)
            </span>
          </div>

          <div className="mt-3.5 space-y-2">
            {coverageMatrix.map((item) => (
              <div
                key={item.k}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-[#F8FBFF] px-3 py-2 text-xs transition hover:border-blue-200"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`h-6 w-6 rounded-md ${item.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>
                    {item.k.slice(0, 2)}
                  </span>
                  <div className="truncate">
                    <span className="font-bold text-slate-900">{item.k}</span>
                    <span className="ml-2 text-slate-500">{item.d}</span>
                  </div>
                </div>
                <span className="mono text-[10px] font-medium text-slate-400 shrink-0">
                  {item.h}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3.5 flex items-center gap-2 text-[11px] text-slate-500">
            <Shield className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span>Doctrina SHA-256 · Validación pública /verify · Bóveda offline WORM</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
          <span>Progreso de cumplimiento regulatorio</span>
          <span className="mono font-bold text-blue-600">{percentage}% ({completedCount} de {allItems.length} controles)</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* 3 Columns Checklist */}
      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        {columns.map((col, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#DCE7FF] bg-white overflow-hidden shadow-sm flex flex-col"
          >
            <div className="border-b border-slate-100 bg-[#F8FBFF] p-4">
              <div className="flex items-center justify-between">
                <span className="mono rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold text-white">
                  {col.accent}
                </span>
                <span className="mono text-xs text-slate-400">
                  {col.items.filter((i) => checkedIds.has(i.id)).length}/{col.items.length}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-slate-900">{col.title}</h3>
              <p className="mt-0.5 text-xs text-slate-500">{col.sub}</p>
            </div>

            <div className="p-3 space-y-2 flex-1">
              {col.items.map((item) => {
                const isChecked = checkedIds.has(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    type="button"
                    className={`w-full text-left rounded-xl border p-3 flex items-start gap-3 transition ${
                      isChecked
                        ? 'border-blue-300 bg-blue-50/50'
                        : 'border-slate-100 bg-[#FAFCFF] hover:border-slate-200 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 transition ${
                        isChecked
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white text-transparent'
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-1">
                        <span className={`text-xs font-semibold ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {item.title}
                        </span>
                        <span className="mono text-[10px] text-slate-400 shrink-0">{item.tag}</span>
                      </div>
                      <p className={`mt-0.5 text-[11px] leading-relaxed ${isChecked ? 'line-through text-slate-400' : 'text-slate-500'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Dispatch / Pitch */}
      <div className="mt-10 rounded-3xl border border-blue-200 bg-gradient-to-r from-[#EFF6FF] via-[#F8FBFF] to-white p-7 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="max-w-xl">
          <h4 className="instrument text-2xl sm:text-3xl text-slate-950">
            Pásale este checklist a tu contador. <span className="italic text-blue-600">Si te falta 1, hablemos.</span>
          </h4>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            No es un discurso de ventas. Es auditoría preventiva. Cada uno de estos puntos mapea a un módulo activo y probado de Ark Systems. Si ya cumples con todos, no nos necesitas. Si no, te ahorramos requerimientos y multas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-xs font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            Hablar con un asesor técnico
          </a>
          <a
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-xs font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Ver la plataforma Ark →
          </a>
        </div>
      </div>
    </div>
  );
}
