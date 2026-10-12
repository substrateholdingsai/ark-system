import React, { useState, useMemo, useRef } from 'react';

const ESTADOS = [
  { id: 'AGS', nombre: 'Aguascalientes', corto: 'AGS', tasa: 2, vigencia: '2026', articulo: 'Art. 12 LHE' },
  { id: 'BC', nombre: 'Baja California', corto: 'BC', tasa: 1.8, vigencia: '2026', articulo: 'Art. 9 LHE + sobretasa' },
  { id: 'BCS', nombre: 'Baja California Sur', corto: 'BCS', tasa: 2.5, vigencia: '2026', articulo: 'Art. 14 LHE' },
  { id: 'CAMP', nombre: 'Campeche', corto: 'CAMP', tasa: 3, vigencia: '2026', articulo: 'Art. 21 LHE' },
  { id: 'CHIS', nombre: 'Chiapas', corto: 'CHIS', tasa: 2, vigencia: '2026', articulo: 'Art. 23 CFC' },
  { id: 'CHIH', nombre: 'Chihuahua', corto: 'CHIH', tasa: 3, vigencia: '2026', articulo: 'Art. 6º LHE' },
  { id: 'CDMX', nombre: 'Ciudad de México', corto: 'CDMX', tasa: 3, vigencia: '2026', articulo: 'Art. 156 CF' },
  { id: 'COAH', nombre: 'Coahuila', corto: 'COAH', tasa: 2, vigencia: '2026', articulo: 'Art. 38 LHE' },
  { id: 'COL', nombre: 'Colima', corto: 'COL', tasa: 2, vigencia: '2026', articulo: 'Art. 41 LHE' },
  { id: 'DGO', nombre: 'Durango', corto: 'DGO', tasa: 2, vigencia: '2026', articulo: 'Art. 15 LHE' },
  { id: 'MEX', nombre: 'Estado de México', corto: 'Edomex', tasa: 3, vigencia: '2026', articulo: 'Art. 56 CF' },
  { id: 'GTO', nombre: 'Guanajuato', corto: 'GTO', tasa: 2.3, vigencia: '2026', articulo: 'Art. 12 LHE' },
  { id: 'GRO', nombre: 'Guerrero', corto: 'GRO', tasa: 2, vigencia: '2026', articulo: 'Art. 28 LHE' },
  { id: 'HGO', nombre: 'Hidalgo', corto: 'HGO', tasa: 2.5, vigencia: '2026', articulo: 'Art. 20 LHE' },
  { id: 'JAL', nombre: 'Jalisco', corto: 'JAL', tasa: 2, vigencia: '2026', articulo: 'Art. 37 LHE' },
  { id: 'MICH', nombre: 'Michoacán', corto: 'MICH', tasa: 2, vigencia: '2026', articulo: 'Art. 17 LHE' },
  { id: 'MOR', nombre: 'Morelos', corto: 'MOR', tasa: 2, vigencia: '2026', articulo: 'Art. 58 LGP' },
  { id: 'NAY', nombre: 'Nayarit', corto: 'NAY', tasa: 2.5, vigencia: '2026', articulo: 'Art. 22 LHE' },
  { id: 'NL', nombre: 'Nuevo León', corto: 'NL', tasa: 3, vigencia: '2026', articulo: 'Art. 57 LHE' },
  { id: 'OAX', nombre: 'Oaxaca', corto: 'OAX', tasa: 3, vigencia: '2026', articulo: 'Art. 50 LHE' },
  { id: 'PUE', nombre: 'Puebla', corto: 'PUE', tasa: 3, vigencia: '2026', articulo: 'Art. 23 LHE' },
  { id: 'QRO', nombre: 'Querétaro', corto: 'QRO', tasa: 2, vigencia: '2026', articulo: 'Art. 44 LHE' },
  { id: 'QROO', nombre: 'Quintana Roo', corto: 'QROO', tasa: 3, vigencia: '2026', articulo: 'Art. 14 LHE' },
  { id: 'SLP', nombre: 'San Luis Potosí', corto: 'SLP', tasa: 2.5, vigencia: '2026', articulo: 'Art. 26 LHE' },
  { id: 'SIN', nombre: 'Sinaloa', corto: 'SIN', tasa: 2.4, vigencia: '2026', articulo: 'Art. 15 LHE' },
  { id: 'SON', nombre: 'Sonora', corto: 'SON', tasa: 2, vigencia: '2026', articulo: 'Art. 189 LHE' },
  { id: 'TAB', nombre: 'Tabasco', corto: 'TAB', tasa: 3, vigencia: '2026', articulo: 'Art. 22 LHE' },
  { id: 'TAM', nombre: 'Tamaulipas', corto: 'TAM', tasa: 2, vigencia: '2026', articulo: 'Art. 42 LHE' },
  { id: 'TLAX', nombre: 'Tlaxcala', corto: 'TLAX', tasa: 3, vigencia: '2026', articulo: 'Art. 30 CF' },
  { id: 'VER', nombre: 'Veracruz', corto: 'VER', tasa: 3, vigencia: '2026', articulo: 'Art. 95 CF' },
  { id: 'YUC', nombre: 'Yucatán', corto: 'YUC', tasa: 2.5, vigencia: '2026', articulo: 'Art. 22 LHE' },
  { id: 'ZAC', nombre: 'Zacatecas', corto: 'ZAC', tasa: 2.5, vigencia: '2026', articulo: 'Art. 16 LHE' },
];

const PERCEPCIONES_DEFAULT = [
  { id: 1, concepto: 'Sueldo base', gravado: 45000, exento: 0 },
  { id: 2, concepto: 'Premio de puntualidad', gravado: 3500, exento: 500 },
  { id: 3, concepto: 'Vales de despensa', gravado: 0, exento: 2800 },
  { id: 4, concepto: 'Horas extra dobles', gravado: 2100, exento: 1050 },
];

export default function IsnCalculator() {
  const [estado, setEstado] = useState('CDMX');
  const [baseInput, setBaseInput] = useState('50600');
  const [percepciones, setPercepciones] = useState(PERCEPCIONES_DEFAULT);
  const [showTable, setShowTable] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [toast, setToast] = useState('');
  const laptopRef = useRef(null);

  const estadoSel = useMemo(() => ESTADOS.find(e => e.id === estado), [estado]);
  const base = useMemo(() => {
    const n = baseInput.replace(/[^0-9.]/g, '');
    return parseFloat(n) || 0;
  }, [baseInput]);
  const totalGravado = useMemo(() => percepciones.reduce((a, p) => a + p.gravado, 0), [percepciones]);
  const totalExento = useMemo(() => percepciones.reduce((a, p) => a + p.exento, 0), [percepciones]);
  const isn = useMemo(() => base * estadoSel.tasa / 100, [base, estadoSel.tasa]);

  const fmt = (n) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 2 }).format(n);

  const updatePerc = (id, field, val) => {
    const n = parseFloat(val.replace(/[^0-9.]/g, '')) || 0;
    setPercepciones(p => p.map(x => x.id === id ? { ...x, [field]: n } : x));
  };

  const downloadCSV = () => {
    const headers = ['Estado', 'Tasa ISN 2026', 'Base Gravable', 'ISN a Pagar', 'Concepto', 'Gravado', 'Exento', 'Total'];
    const rows = [
      ...percepciones.map(p => [estadoSel.nombre, `${estadoSel.tasa}%`, base, isn.toFixed(2), p.concepto, p.gravado, p.exento, p.gravado + p.exento]),
      ['RESUMEN', '', '', '', '', '', '', ''],
      [estadoSel.nombre, `${estadoSel.tasa}%`, base, isn.toFixed(2), 'TOTAL GRAVADO', totalGravado, totalExento, totalGravado + totalExento],
    ];
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ISN_2026_${estadoSel.id}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setToast(`✓ Excel generado: ISN ${estadoSel.corto} ${fmt(isn)} • ${new Date().toLocaleTimeString('es-MX')}`);
    setTimeout(() => setToast(''), 4500);
  };

  return (
    <div className="min-h-screen w-full bg-[#FBFCFD] text-[#0A2540] antialiased selection:bg-[#C9A86A]/30 overflow-x-hidden">
      <style>{`
        :root{
          --navy:#0A2540;
          --gold:#C9A86A;
          --gold-soft:#EFE0C2;
          --paper:#FFFFFF;
          --surface:#F6F7F9;
          --muted:#6B7A90;
          --green-bg:#E8F5E9;
          --green-text:#1B5E20;
          --safe-area-inset-top: env(safe-area-inset-top, 0px);
        }
        *{font-family: Inter, ui-sans-system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif}
        .serif{font-family: Georgia, "Times New Roman", serif; letter-spacing:-0.02em}
        .laptop-screen::-webkit-scrollbar{height:6px;width:6px}
        .laptop-screen::-webkit-scrollbar-thumb{background:#0A2540; border-radius:99px}
        @keyframes fadeIn{from{opacity:0; transform:translateY(6px)} to{opacity:1; transform:translateY(0)}}
      `}</style>

      <div className="w-full" style={{ paddingTop: 'var(--safe-area-inset-top)' }} />

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-[#0A2540]/[0.06]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-[10px] bg-[#0A2540] flex items-center justify-center shadow-[0_4px_12px_rgba(10,37,64,0.2)]">
              <div className="w-[18px] h-[18px] relative [transform:rotateX(12deg)_rotateY(-18deg)] [transform-style:preserve-3d]">
                <div className="absolute inset-0 bg-[#C9A86A] border border-white/20" style={{ transform: 'translateZ(9px)' }} />
                <div className="absolute inset-0 bg-[#0A2540] border border-[#C9A86A]/40" style={{ transform: 'rotateY(90deg) translateZ(9px)' }} />
                <div className="absolute inset-0 bg-white/90 border border-[#0A2540]/10" style={{ transform: 'rotateX(90deg) translateZ(9px)' }} />
              </div>
            </div>
            <div className="leading-[0.95]">
              <div className="font-bold tracking-[0.14em] text-[12px] text-[#0A2540]">ARK SYSTEMS</div>
              <div className="text-[10px] tracking-[0.18em] text-[#6B7A90] font-medium -mt-[1px]">HERRAMIENTAS MODERNAS</div>
            </div>
            <div className="hidden md:flex ml-6 h-7 w-px bg-[#0A2540]/10" />
            <div className="hidden md:flex items-center gap-2">
              <span className="text-[11px] font-semibold tracking-widest text-[#6B7A90]">CALCULADORA</span>
              <span className="text-[11px] font-semibold tracking-widest text-[#0A2540]">ISN 2026</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F5E9] border border-[#2E7D32]/15 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest text-[#1B5E20]">ACTUALIZADO 2026</span>
            </div>
            <button onClick={() => setShowRef(!showRef)} className="hidden sm:inline-flex text-[11px] font-medium tracking-wide text-[#6B7A90] hover:text-[#0A2540] underline underline-offset-4 decoration-[#C9A86A]">Ver referencia</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h1 className="serif text-[32px] sm:text-[44px] leading-[0.95] tracking-[-0.02em] text-[#0A2540]">
              Calculadora ISN 2026
              <br />
              <span className="italic font-light text-[#0A2540]/70">— 32 estados</span>
            </h1>
            <p className="mt-3 text-[14px] leading-6 text-[#6B7A90] max-w-[520px]">
              Tasas oficiales por entidad, cálculo inmediato y desglose de percepciones gravadas / exentas. Lista para contadores, nómina y RH. Exporta a Excel en un clic.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#0A2540]/10 px-3 py-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
              Fuente: Códigos Fiscales Estatales 2026
            </span>
            <span className="inline-flex items-center rounded-full bg-[#0A2540] text-white px-3 py-1.5 font-semibold tracking-wide">3% tope nacional</span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-1 lg:grid-cols-[400px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
        <div className="space-y-5 lg:sticky lg:top-[88px] min-w-0">
          <div className="rounded-[20px] bg-white border border-[#C9A86A]/30 shadow-[0_8px_32px_rgba(10,37,64,0.06)] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#0A2540] via-[#0A2540] to-[#C9A86A]" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[13px] font-bold tracking-widest text-[#0A2540]">1. ENTIDAD FEDERATIVA</h2>
                <span className="text-[11px] text-[#6B7A90]">{ESTADOS.length} opciones</span>
              </div>
              <div className="relative">
                <select value={estado} onChange={e => setEstado(e.target.value)} className="w-full appearance-none rounded-[12px] border border-[#0A2540]/15 bg-[#F6F7F9] px-4 py-3 pr-10 text-[15px] font-semibold text-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/40 focus:border-[#C9A86A] transition">
                  {ESTADOS.map(e => <option key={e.id} value={e.id}>{e.nombre} — {e.tasa}%</option>)}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0A2540] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-[12px] bg-[#0A2540] text-white p-3">
                  <div className="text-[10px] tracking-widest opacity-70">TASA 2026</div>
                  <div className="serif text-[22px] leading-none mt-1">{estadoSel.tasa.toFixed(1)}%</div>
                  <div className="text-[10px] mt-1 opacity-60">{estadoSel.articulo}</div>
                </div>
                <div className="col-span-2 rounded-[12px] bg-[#F6F7F9] border border-[#0A2540]/10 p-3">
                  <div className="text-[10px] tracking-widest text-[#6B7A90]">VIGENCIA · FUENTE</div>
                  <div className="text-[13px] font-semibold mt-1">{estadoSel.vigencia} · Código Fiscal {estadoSel.nombre}</div>
                  <div className="text-[11px] text-[#6B7A90] mt-1">Base: total de erogaciones por trabajo personal subordinado.</div>
                </div>
              </div>
              <button onClick={() => setShowTable(!showTable)} className="mt-4 w-full text-[12px] font-medium tracking-wide text-[#0A2540] hover:text-[#0A2540] flex items-center justify-center gap-1.5 py-2 rounded-full border border-dashed border-[#C9A86A]/60 bg-[#FFFBF0]">
                {showTable ? 'Ocultar tabla de tasas' : 'Ver tabla 32 estados'} {' '}
                <span className="text-[#C9A86A]">↗</span>
              </button>
            </div>
          </div>

          <div className="rounded-[20px] bg-white border border-[#C9A86A]/30 shadow-[0_8px_32px_rgba(10,37,64,0.06)] overflow-hidden">
            <div className="p-5 sm:p-6">
              <h2 className="text-[13px] font-bold tracking-widest text-[#0A2540] mb-4">2. BASE GRAVABLE MENSUAL</h2>
              <label className="block text-[11px] font-semibold tracking-widest text-[#6B7A90] mb-2">IMPORTE GRAVADO PARA ISN</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-bold text-[#0A2540]">$</span>
                <input value={baseInput} onChange={e => { setBaseInput(e.target.value); }} inputMode="decimal" className="w-full rounded-[14px] border-[1.5px] border-[#0A2540] bg-white pl-8 pr-4 py-[14px] text-[22px] font-bold tracking-tight text-[#0A2540] placeholder:text-[#0A2540]/20 focus:outline-none focus:ring-4 focus:ring-[#C9A86A]/20 transition" placeholder="0.00" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <span className="text-[10px] font-bold tracking-widest bg-[#0A2540] text-white rounded-full px-2.5 py-1">MXN</span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#6B7A90]">Suma de percepciones gravadas</span>
                <span className={`text-[11px] font-semibold ${Math.abs(totalGravado - base) > 0.01 ? 'text-amber-600' : 'text-[#6B7A90]'}`}>
                  Tabla: {fmt(totalGravado)} {Math.abs(totalGravado - base) > 0.01 ? '• Diferencia' : '• Coincide'}
                </span>
              </div>
              <div className="mt-5 rounded-[14px] border border-[#0A2540]/10 overflow-hidden">
                <div className="grid grid-cols-[1fr_88px_88px] bg-[#0A2540] text-white text-[10px] tracking-widest font-bold px-3 py-2">
                  <span>CONCEPTO</span>
                  <span className="text-right">GRAVADO</span>
                  <span className="text-right">EXENTO</span>
                </div>
                {percepciones.map(p => (
                  <div key={p.id} className="grid grid-cols-[1fr_88px_88px] items-center px-3 py-2 border-t border-[#0A2540]/[0.06] bg-white even:bg-[#F6F7F9]/70">
                    <span className="text-[12px] font-medium truncate pr-2">{p.concepto}</span>
                    <input value={p.gravado === 0 ? '' : String(p.gravado)} onChange={e => updatePerc(p.id, 'gravado', e.target.value)} placeholder="0" className="text-right text-[12px] font-semibold bg-transparent border border-transparent hover:border-[#C9A86A]/40 focus:border-[#C9A86A] rounded-md px-1 py-0.5 outline-none" />
                    <input value={p.exento === 0 ? '' : String(p.exento)} onChange={e => updatePerc(p.id, 'exento', e.target.value)} placeholder="0" className="text-right text-[12px] text-[#6B7A90] bg-transparent border border-transparent hover:border-[#0A2540]/20 focus:border-[#0A2540]/30 rounded-md px-1 py-0.5 outline-none" />
                  </div>
                ))}
                <div className="grid grid-cols-[1fr_88px_88px] bg-[#FFFBF0] border-t border-[#C9A86A]/30 px-3 py-2 font-bold text-[12px]">
                  <span>TOTAL</span>
                  <span className="text-right">{fmt(totalGravado)}</span>
                  <span className="text-right text-[#6B7A90]">{fmt(totalExento)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] bg-[#0A2540] border border-[#0A2540] shadow-[0_12px_40px_rgba(10,37,64,0.25)] overflow-hidden text-white relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#C9A86A]/20 rounded-full blur-[32px] -translate-y-10 translate-x-10" />
            <div className="p-6 relative">
              <div className="flex items-center justify-between">
                <h2 className="text-[11px] tracking-[0.2em] font-bold opacity-70">RESUMEN ISN 2026</h2>
                <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 border border-white/10 tracking-widest">{estadoSel.corto} · {estadoSel.tasa}%</span>
              </div>
              <div className="mt-5 space-y-3 text-[13px]">
                <div className="flex justify-between"><span className="opacity-60">Estado</span><span className="font-semibold">{estadoSel.nombre}</span></div>
                <div className="flex justify-between"><span className="opacity-60">Tasa aplicable</span><span className="font-semibold">{estadoSel.tasa}%</span></div>
                <div className="flex justify-between"><span className="opacity-60">Base gravable</span><span className="font-semibold">{fmt(base)}</span></div>
                <div className="h-px bg-white/10 my-3" />
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[11px] tracking-widest opacity-60">TOTAL A PAGAR</div>
                    <div className="serif text-[34px] leading-none mt-1">{fmt(isn)}</div>
                    <div className="text-[11px] opacity-60 mt-1">Fórmula: Base × Tasa ({base.toLocaleString('es-MX')} × {estadoSel.tasa}%)</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#C9A86A] flex items-center justify-center text-[#0A2540] font-bold">↗</div>
                </div>
              </div>
              <button onClick={downloadCSV} className="mt-6 w-full rounded-full bg-white text-[#0A2540] font-bold text-[13px] tracking-wide py-3.5 flex items-center justify-center gap-2 hover:bg-[#FFFBF0] transition shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v8M3 8h10" stroke="#0A2540" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M3 12.5h10" stroke="#C9A86A" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Descargar Excel (CSV)
              </button>
              <div className="mt-3 text-center text-[10px] tracking-wide opacity-50">Incluye desglose de percepciones • Compatible con Excel / Sheets</div>
            </div>
          </div>

          <div className="rounded-[16px] bg-[#F6F7F9] border border-[#0A2540]/5 p-4 text-[11px] leading-[1.5] text-[#6B7A90]">
            <strong className="text-[#0A2540]">Nota:</strong> Cálculo informativo. Las tasas pueden incluir sobretasas estatales (ej. BC, CHIH). Verifica retención y fecha de pago en portal tributario estatal. No sustituye asesoría fiscal.
          </div>
        </div>

        <div className="space-y-6 min-w-0">
          <div className="rounded-[20px] bg-white border border-[#C9A86A]/30 shadow-[0_8px_32px_rgba(10,37,64,0.06)] p-3 sm:p-4 overflow-hidden min-w-0">
            <div className="flex items-center justify-between px-2 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="ml-2 sm:ml-3 text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#0A2540]/60 truncate">ISN_CALCULADORA_2026.xlsx — Excel</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#6B7A90]">
                <span className="w-5 h-5 rounded-full bg-[#F6F7F9] border border-[#0A2540]/10 flex items-center justify-center">◰</span>
                Vista previa
              </div>
            </div>
            <div className="relative rounded-[16px] bg-[#0A2540] p-[8px] sm:p-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[88px] h-[18px] bg-black rounded-b-[10px] flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] border border-white/10" />
                <span className="w-6 h-1 rounded-full bg-white/10" />
              </div>
              <div ref={laptopRef} className="laptop-screen rounded-[12px] bg-white overflow-hidden border border-white/20 max-h-[620px] overflow-auto w-full">
                <div className="h-9 bg-[#F3F4F6] border-b border-[#E5E7EB] flex items-center px-3 gap-2 text-[11px]">
                  <span className="px-2 py-1 rounded bg-[#0A2540] text-white font-semibold">Inicio</span>
                  <span className="px-2 py-1 text-[#6B7A90]">Fórmulas</span>
                  <span className="px-2 py-1 text-[#6B7A90]">Datos</span>
                  <span className="ml-auto flex items-center gap-2">
                    <span className="hidden sm:inline text-[#6B7A90]">Autoguardado</span>
                    <span className="w-8 h-4 rounded-full bg-[#27C93F] relative">
                      <span className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                    </span>
                  </span>
                </div>
                <div className="p-0 overflow-x-auto">
                  <div className="min-w-[560px] grid grid-cols-[40px_1fr_110px_110px_110px] text-[11px]">
                    <div className="bg-[#F3F4F6] border-r border-b border-[#E5E7EB] h-8 flex items-center justify-center text-[#9CA3AF]">#</div>
                    <div className="bg-[#0A2540] text-white border-b border-[#0A2540] h-8 flex items-center px-3 font-bold tracking-widest text-[11px]">CONCEPTO DE PERCEPCIÓN</div>
                    <div className="bg-[#FFFBF0] border-b border-l border-[#C9A86A]/40 h-8 flex items-center justify-center font-bold tracking-widest text-[#0A2540]">GRAVADAS</div>
                    <div className="bg-[#F6F7F9] border-b border-l border-[#E5E7EB] h-8 flex items-center justify-center font-bold tracking-widest text-[#6B7A90]">EXENTAS</div>
                    <div className="bg-[#0A2540] text-white border-b border-l border-[#0A2540] h-8 flex items-center justify-center font-bold tracking-widest">TOTAL</div>
                    {percepciones.map((p, i) => (
                      <div key={p.id} className="contents">
                        <div className="h-9 border-r border-b border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-center text-[#9CA3AF]">{i + 1}</div>
                        <div className="h-9 border-b border-[#E5E7EB] flex items-center px-3 text-[12px] font-medium">{p.concepto}</div>
                        <div className="h-9 border-b border-l border-[#E5E7EB] flex items-center justify-end px-3 font-semibold text-[#0A2540] bg-[#FFFBF0]/60">{p.gravado.toLocaleString('es-MX')}</div>
                        <div className="h-9 border-b border-l border-[#E5E7EB] flex items-center justify-end px-3 text-[#6B7A90]">{p.exento.toLocaleString('es-MX')}</div>
                        <div className="h-9 border-b border-l border-[#E5E7EB] flex items-center justify-end px-3 font-medium">{(p.gravado + p.exento).toLocaleString('es-MX')}</div>
                      </div>
                    ))}
                    <div className="contents font-bold">
                      <div className="h-9 bg-[#0A2540] text-white/60 flex items-center justify-center">Σ</div>
                      <div className="h-9 bg-[#0A2540] text-white flex items-center px-3 tracking-wide text-[11px]">BASE GRAVABLE ISN + EXENTOS</div>
                      <div className="h-9 bg-[#0A2540] text-[#C9A86A] border-l border-white/10 flex items-center justify-end px-3">{totalGravado.toLocaleString('es-MX')}</div>
                      <div className="h-9 bg-[#0A2540] text-white/70 border-l border-white/10 flex items-center justify-end px-3">{totalExento.toLocaleString('es-MX')}</div>
                      <div className="h-9 bg-[#0A2540] text-white border-l border-white/10 flex items-center justify-end px-3">{(totalGravado + totalExento).toLocaleString('es-MX')}</div>
                    </div>
                    <div className="col-span-5 grid grid-cols-[40px_1fr_110px_110px_110px] border-t-2 border-[#0A2540] min-w-[560px]">
                      <div className="bg-[#F6F7F9] border-r border-b border-[#E5E7EB]" />
                      <div className="px-3 py-2 text-[11px] font-bold tracking-widest border-b border-[#E5E7EB]">CÁLCULO ISN {estadoSel.nombre.toUpperCase()} {estadoSel.tasa}%</div>
                      <div className="border-b border-l border-[#E5E7EB] bg-[#FFFBF0] flex items-center justify-end px-3 text-[11px] font-semibold">{estadoSel.tasa}%</div>
                      <div className="border-b border-l border-[#E5E7EB] bg-[#F6F7F9] flex items-center justify-center px-3 text-[10px] text-[#6B7A90]">× BASE</div>
                      <div className="border-b border-l border-[#E5E7EB] bg-[#0A2540] text-white flex items-center justify-end px-3 font-bold">{fmt(isn)}</div>
                    </div>
                  </div>
                  <div className="min-w-[560px] h-8 bg-[#F3F4F6] border-t border-[#E5E7EB] flex items-center px-3 gap-2 text-[11px] text-[#6B7A90]">
                    <span className="w-6 h-6 rounded bg-white border border-[#E5E7EB] flex items-center justify-center font-bold text-[#0A2540]">fx</span>
                    <span className="font-mono text-[11px] text-[#0A2540]">=REDONDEAR(C{percepciones.length + 2}* {estadoSel.tasa}%,2) → {fmt(isn)}</span>
                    <span className="ml-auto text-[10px] px-2 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] font-bold tracking-widest">ACTUALIZADO 2026</span>
                  </div>
                </div>
                <div className="min-w-[560px] h-8 bg-gradient-to-b from-[#1A3452] to-[#0A2540] border-t border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
              </div>
            </div>
          </div>

          {showRef && (
            <div className="rounded-[20px] bg-white border border-[#C9A86A]/30 shadow-[0_8px_32px_rgba(10,37,64,0.06)] overflow-hidden animate-[fadeIn_0.3s_ease]">
              <div className="p-5 sm:p-6 border-b border-[#0A2540]/10 flex items-center justify-between">
                <h3 className="serif text-[20px]">Tasas ISN 2026 — 32 entidades</h3>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#0A2540] text-white tracking-widest font-bold">OFICIAL</span>
              </div>
              <div className="max-h-[420px] overflow-auto">
                <table className="w-full text-[13px]">
                  <thead className="sticky top-0 bg-[#0A2540] text-white text-[11px] tracking-widest">
                    <tr>
                      <th className="text-left px-4 py-3">ESTADO</th>
                      <th className="text-center px-3 py-3">TASA</th>
                      <th className="text-left px-3 py-3 hidden sm:table-cell">ARTÍCULO</th>
                      <th className="text-center px-3 py-3">SEL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ESTADOS.map(e => (
                      <tr key={e.id} className={`border-t border-[#0A2540]/5 ${estado === e.id ? 'bg-[#FFFBF0]' : 'hover:bg-[#F6F7F9]'}`}>
                        <td className="px-4 py-2.5 font-medium">{e.nombre} <span className="text-[11px] text-[#6B7A90] ml-1">{e.corto}</span></td>
                        <td className="text-center font-bold text-[#0A2540]">{e.tasa.toFixed(1)}%</td>
                        <td className="hidden sm:table-cell text-[11px] text-[#6B7A90]">{e.articulo}</td>
                        <td className="text-center">
                          <button onClick={() => setEstado(e.id)} className={`w-6 h-6 rounded-full border text-[11px] ${estado === e.id ? 'bg-[#0A2540] text-white border-[#0A2540]' : 'bg-white border-[#0A2540]/15 text-[#0A2540] hover:border-[#C9A86A]'}`}>
                            {estado === e.id ? '✓' : '+'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="rounded-[20px] bg-[#0A2540] border border-[#0A2540] p-1 shadow-[0_8px_32px_rgba(10,37,64,0.18)]">
            <div className="rounded-[16px] bg-white overflow-hidden">
              <div className="h-9 flex items-center px-4 bg-[#F6F7F9] border-b border-[#0A2540]/10 text-[11px] font-bold tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#C9A86A] mr-2" />
                ARK SYSTEMS · HERRAMIENTAS MODERNAS
                <span className="ml-auto text-[11px] font-medium text-[#0A2540]">Panel de utilidades · 2026</span>
              </div>
              <div className="p-4 grid grid-cols-3 gap-3 text-[11px]">
                <div className="rounded-[12px] bg-[#F6F7F9] border border-[#0A2540]/10 p-3">
                  <div className="font-bold">ISN</div>
                  <div className="text-[#6B7A90] mt-1">Cálculo 32 estados</div>
                  <div className="mt-2 w-6 h-6 rounded-full bg-[#0A2540] text-white flex items-center justify-center">✓</div>
                </div>
                <div className="rounded-[12px] bg-[#FFFBF0] border border-[#C9A86A]/30 p-3">
                  <div className="font-bold">Nómina</div>
                  <div className="text-[#6B7A90] mt-1">Percepciones G/E</div>
                  <div className="mt-2 text-[10px] px-2 py-1 rounded-full bg-white border inline-block">Próximamente</div>
                </div>
                <div className="rounded-[12px] bg-white border border-[#0A2540]/10 p-3">
                  <div className="font-bold">Excel</div>
                  <div className="text-[#6B7A90] mt-1">Exporta CSV directo</div>
                  <div className="mt-2 text-[10px] px-2 py-1 rounded-full bg-[#0A2540] text-white inline-block">Listo</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between pt-2">
            <div className="text-[11px] text-[#6B7A90]">© 2026 ARK SYSTEMS · Fintech profesional para contadores · Hecho en México</div>
            <div className="flex gap-2">
              <span className="text-[10px] px-2.5 py-1 rounded-full border border-[#0A2540]/10 bg-white">Base gravable = Percepciones gravadas</span>
              <span className="text-[10px] px-2.5 py-1 rounded-full border border-[#C9A86A]/30 bg-[#FFFBF0]">ISN = Base × Tasa</span>
            </div>
          </div>
        </div>
      </main>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 p-3 bg-gradient-to-t from-white via-white to-white/0 pointer-events-none">
        <div className="pointer-events-auto rounded-[16px] bg-[#0A2540] text-white p-4 shadow-[0_12px_32px_rgba(10,37,64,0.3)] flex items-center justify-between">
          <div>
            <div className="text-[10px] tracking-widest opacity-60">ISN A PAGAR</div>
            <div className="serif text-[20px] leading-none mt-1">{fmt(isn)} • {estadoSel.corto} {estadoSel.tasa}%</div>
          </div>
          <button onClick={downloadCSV} className="w-11 h-11 rounded-full bg-white text-[#0A2540] flex items-center justify-center font-bold">⤓</button>
        </div>
      </div>
      <div className="h-[88px] lg:hidden" />
    </div>
  );
}