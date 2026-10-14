import React, { useState, useMemo, useRef, useEffect } from 'react';

const UMA_2026 = 113.14;
const TOPE_UMAS = 25;
const TOPE_SBC = UMA_2026 * TOPE_UMAS;
const MIN_SBC = 278.8;

export default function SbcCalculator() {
  const [salario, setSalario] = useState(580);
  const [vacaciones, setVacaciones] = useState(12);
  const [prima, setPrima] = useState(25);
  const [aguinaldo, setAguinaldo] = useState(15);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef(null);

  const { factor, sbcRaw, sbcFinal, topeAplicado, tipoTope, aporteVac, aporteAgu, aportePrimaDias } = useMemo(() => {
    const S = vacaciones * (prima / 100);
    const P = S / 365;
    const H = aguinaldo / 365;
    const L = 1 + P + H;
    let fe = salario * L;
    let Fn = fe;
    let Dl = false;
    let Ol = null;

    if (salario > 0) {
      if (fe > TOPE_SBC) {
        Fn = TOPE_SBC;
        Dl = true;
        Ol = 'max';
      } else if (fe < MIN_SBC) {
        Fn = MIN_SBC;
        Dl = true;
        Ol = 'min';
      }
    } else {
      Fn = 0;
    }
    return { factor: L, sbcRaw: fe, sbcFinal: Fn, topeAplicado: Dl, tipoTope: Ol, aporteVac: P, aporteAgu: H, aportePrimaDias: S };
  }, [salario, vacaciones, prima, aguinaldo]);

  const porcentajeTope = useMemo(() => {
    if (sbcFinal === 0) return 0;
    return Math.min(100, sbcFinal / TOPE_SBC * 100);
  }, [sbcFinal]);

  const porcentajeMin = MIN_SBC / TOPE_SBC * 100;

  const formatCurrency = (val) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 }).format(val);
  const formatNumber = (val, n = 4) => new Intl.NumberFormat('es-MX', { minimumFractionDigits: n, maximumFractionDigits: n }).format(val);

  const copySummary = async () => {
    const txt = `SBC 2026: ${formatCurrency(sbcFinal)} | Factor: ${formatNumber(factor)} | Salario $${salario} | Vac ${vacaciones}d | Prima ${prima}% | Aguinaldo ${aguinaldo}d`;
    try { await navigator.clipboard.writeText(txt); }
    catch { /* fallback */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToResult = () => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#e2e8f2] bg-[#f7f8fa] font-sans text-[#0a2540] shadow-[0_12px_32px_rgba(10,37,64,0.07),0_2px_8px_rgba(10,37,64,0.05)] selection:bg-[#c9a86a]/20 sm:rounded-[24px]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');`}</style>

      <div className="bg-[#0a2540] text-white text-[10px] font-black tracking-[0.2em] text-center py-2">
        DEMO INTERACTIVA • UMA 2026 $113.14 • CÁLCULO LOCAL • SIN BACKEND • ARK COMMERCE
      </div>

      <div className="p-4 sm:p-8 lg:p-10">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div>
              <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[#eadcc2] bg-[#f7eee0] px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b8965a]" />
                <span className="text-[11px] font-[700] tracking-[0.08em] text-[#8a7a5e]">CALCULADORA OFICIAL SBC 2026</span>
              </div>
              <h1 className="break-words text-[26px] font-[800] leading-[1.05] tracking-[-0.04em] text-[#0a2540] sm:text-[44px] sm:leading-[0.98] sm:tracking-[-0.03em]">
                Calculadora SBC 2026
                <br />
                <span className="mt-2 block break-words text-[20px] font-[500] tracking-[-0.02em] text-[#5a6d85] sm:text-[26px]">
                  ARK COMMERCE · Precisión contable
                </span>
              </h1>
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.6] text-[#5a6d85] max-w-[520px]">
                Calcula en tiempo real el Salario Base de Cotización con la UMA 2026 ($113.14).
                Incluye topes, factor de integración y desglose visual para nómina sin errores IMSS.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <div className="flex-1 lg:flex-none px-4 py-3 rounded-[14px] bg-white border border-[#e2e8f2] shadow-[var(--shadow)] min-w-[140px]">
                <div className="text-[10px] font-[700] tracking-[0.1em] text-[#8a9bb0]">UMA 2026</div>
                <div className="text-[18px] font-[700] text-[#0a2540] mt-1">{formatCurrency(UMA_2026)}</div>
                <div className="text-[11px] text-[#8a9bb0] mt-0.5">Diario</div>
              </div>
              <div className="flex-1 lg:flex-none px-4 py-3 rounded-[14px] bg-[#0a2540] text-white min-w-[140px] shadow-[var(--shadow)]">
                <div className="text-[10px] font-[700] tracking-[0.1em] text-white/60">TOPE 25 UMAs</div>
                <div className="text-[18px] font-[700] mt-1">{formatCurrency(TOPE_SBC)}</div>
                <div className="text-[11px] text-white/60 mt-0.5">Máximo SBC 2026</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8 items-start">
            <div className="rounded-[20px] bg-white border border-[#e2e8f2] shadow-[var(--shadow)] overflow-hidden">
              <div className="px-6 sm:px-8 py-6 bg-[#0a2540] flex items-center justify-between">
                <div>
                  <h2 className="text-white font-[700] text-[15px] tracking-[-0.01em]">Parámetros del colaborador</h2>
                  <p className="text-white/60 text-[12px] mt-1">Ajusta y ve el impacto en tiempo real</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-[#c9a86a] text-[14px]">◧</span>
                </div>
              </div>
              <div className="p-5 sm:p-8 space-y-7 sm:space-y-8">
                <div>
                  <label className="flex items-center justify-between mb-3">
                    <span className="text-[13px] font-[700] tracking-[0.02em] text-[#0a2540] uppercase">Salario diario</span>
                    <span className="text-[11px] px-2 py-1 rounded-full bg-[#e8edf5] text-[#0a2540] font-[600]">Base cotización</span>
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-[700] text-[#8a9bb0]">$</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={salario}
                      onChange={(e) => setSalario(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full h-[56px] pl-8 pr-20 rounded-[14px] border border-[#e2e8f2] bg-[#fbfcfe] text-[19px] font-[700] text-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#0a2540]/20 focus:border-[#0a2540] transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-[700] tracking-[0.06em] text-[#8a9bb0]">MXN / DÍA</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[278.8, 400, 580, 850].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSalario(s)}
                        className={`px-3.5 py-1.5 rounded-full text-[11px] font-[600] border transition-colors ${salario === s ? 'bg-[#0a2540] text-white border-[#0a2540]' : 'bg-white text-[#5a6d85] border-[#e2e8f2] hover:border-[#cbd5e1]'}`}
                      >
                        ${s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[13px] font-[700] tracking-[0.02em] text-[#0a2540] uppercase">Días de vacaciones</label>
                    <div className="flex items-center gap-2">
                      <span className="min-w-[40px] h-[28px] px-2 rounded-full bg-[#f7eee0] border border-[#eadcc2] text-[13px] font-[800] text-[#8a7a5e] flex items-center justify-center">{vacaciones}</span>
                      <span className="text-[11px] text-[#8a9bb0]">días · LFT 6-32</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={32}
                    step={1}
                    value={vacaciones}
                    onChange={(e) => setVacaciones(Number(e.target.value))}
                    className="w-full"
                    style={{ background: `linear-gradient(to right, #0a2540 0%, #0a2540 ${(vacaciones - 6) / 26 * 100}%, #e8edf5 ${(vacaciones - 6) / 26 * 100}%, #e8edf5 100%)` }}
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-[600] tracking-[0.06em] text-[#8a9bb0]">
                    <span>6 DÍAS</span><span>19 DÍAS</span><span>32 DÍAS</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[13px] font-[700] tracking-[0.02em] text-[#0a2540] uppercase mb-3 block">Prima vacacional</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={prima}
                        onChange={(e) => setPrima(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                        className="w-full h-[52px] pl-4 pr-12 rounded-[14px] border border-[#e2e8f2] bg-[#fbfcfe] text-[18px] font-[700] text-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#0a2540]/20 focus:border-[#0a2540]"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[16px] font-[700] text-[#8a9bb0]">%</span>
                    </div>
                    <div className="mt-2 text-[11px] text-[#8a9bb0]">Por defecto LFT: 25%</div>
                  </div>
                  <div>
                    <label className="text-[13px] font-[700] tracking-[0.02em] text-[#0a2540] uppercase mb-3 block">Aguinaldo</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={aguinaldo}
                        onChange={(e) => setAguinaldo(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full h-[52px] pl-4 pr-12 rounded-[14px] border border-[#e2e8f2] bg-[#fbfcfe] text-[18px] font-[700] text-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#0a2540]/20 focus:border-[#0a2540]"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-[700] tracking-[0.06em] text-[#8a9bb0]">DÍAS</span>
                    </div>
                    <div className="mt-2 text-[11px] text-[#8a9bb0]">Mínimo legal: 15 días</div>
                  </div>
                </div>

                <div className="rounded-[14px] bg-[#f6f8fb] border border-[#e2e8f2] p-4 flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#0a2540] text-white flex items-center justify-center text-[12px] font-[800] shrink-0">ƒ</div>
                  <div className="text-[12px] leading-[1.5] text-[#5a6d85]">
                    <span className="font-[700] text-[#0a2540]">Fórmula IMSS:</span> Factor = 1 + (Vacaciones × Prima% + Aguinaldo) ÷ 365.
                    <br />
                    <span className="text-[#8a9bb0]">Ej: 1 + ({vacaciones} × {prima}% + {aguinaldo}) ÷ 365 = {formatNumber(factor)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6" ref={resultRef}>
              <div className="rounded-[20px] bg-white border border-[#e2e8f2] shadow-[var(--shadow)] overflow-hidden">
                <div className="px-4 pb-5 pt-6 sm:px-7 sm:pt-7">
                  <div className="flex min-w-0 flex-col gap-3">
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[11px] font-[700] tracking-[0.1em] text-[#8a9bb0] uppercase">Salario Base de Cotización 2026</div>
                        <div className="mt-2 flex flex-wrap items-baseline gap-3">
                          <div className="text-[34px] font-[900] leading-none tracking-[-0.05em] text-[#0a2540] sm:text-[46px] sm:tracking-[-0.04em]">
                            {sbcFinal === 0 ? '$0.00' : formatCurrency(sbcFinal)}
                          </div>
                          {topeAplicado && sbcRaw !== sbcFinal && (
                            <div className="text-[13px] font-[600] text-[#8a9bb0] line-through">{formatCurrency(sbcRaw)}</div>
                          )}
                        </div>
                      </div>
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[#eadcc2] bg-[#f7eee0]">
                        <span className="text-[16px] font-[900] text-[#b8965a]">$</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className={`px-2.5 py-1 rounded-full text-[11px] font-[700] tracking-[0.02em] border ${
                        topeAplicado
                          ? tipoTope === 'max'
                            ? 'bg-[#fffbeb] text-[#b45309] border-[#fde68a]'
                            : 'bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe]'
                          : 'bg-[#f0fdf4] text-[#047857] border-[#a7f3d0]'
                      }`}>
                        {topeAplicado ? (tipoTope === 'max' ? '⚑ Tope 25 UMA aplicado' : '⚑ Mínimo aplicado') : '✓ Dentro de rango IMSS'}
                      </div>
                      <span className="text-[11px] text-[#8a9bb0]">Factor {formatNumber(factor)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  <div className="flex justify-between text-[10px] font-[700] tracking-[0.08em] text-[#8a9bb0] mb-2">
                    <span>MÍN {formatCurrency(MIN_SBC)}</span>
                    <span>25 UMA {formatCurrency(TOPE_SBC)}</span>
                  </div>
                  <div className="relative h-[14px] rounded-full bg-[#edf1f6] border border-[#e2e8f2] overflow-hidden p-[3px] max-w-full">
                    <div className="h-full rounded-full bg-[#0a2540] transition-all duration-500 ease-out" style={{ width: `${porcentajeTope}%` }} />
                    <div className="absolute top-0 bottom-0 w-[2px] bg-white/90" style={{ left: `${porcentajeMin}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#c9a86a] border-2 border-white shadow-sm transition-all duration-500" style={{ left: `calc(${Math.min(100, Math.max(0, porcentajeTope))}% - 6px)` }} />
                  </div>
                  <div className="mt-2 flex flex-wrap justify-between gap-2 text-[11px]">
                    <span className="text-[#8a9bb0]">{porcentajeTope.toFixed(1)}% del tope</span>
                    <span className="font-[600] text-[#0a2540]">{sbcFinal > 0 ? `${formatCurrency(TOPE_SBC - sbcFinal)} restantes al tope` : 'Ingresa salario'}</span>
                  </div>
                </div>
                <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(96px,1fr))] gap-2 sm:gap-3">
                  <div className="rounded-[14px] bg-[#f8fafc] border border-[#e2e8f2] p-3">
                    <div className="text-[10px] font-[700] tracking-[0.08em] text-[#8a9bb0]">BASE</div>
                    <div className="mt-1 text-[16px] font-[800] text-[#0a2540]">1.0000</div>
                    <div className="mt-1 text-[10px] text-[#8a9bb0] leading-tight">Salario diario</div>
                  </div>
                  <div className="rounded-[14px] bg-[#f7eee0] border border-[#eadcc2] p-3">
                    <div className="text-[10px] font-[700] tracking-[0.08em] text-[#8a7a5e]">VACACIONES</div>
                    <div className="mt-1 text-[16px] font-[800] text-[#0a2540]">+{formatNumber(aporteVac)}</div>
                    <div className="mt-1 text-[10px] text-[#8a7a5e] leading-tight">{vacaciones}d × {prima}% ÷ 365</div>
                  </div>
                  <div className="rounded-[14px] bg-[#0a2540] p-3 text-white">
                    <div className="text-[10px] font-[700] tracking-[0.08em] text-white/60">AGUINALDO</div>
                    <div className="mt-1 text-[16px] font-[800]">+{formatNumber(aporteAgu)}</div>
                    <div className="mt-1 text-[10px] text-white/60 leading-tight">{aguinaldo}d ÷ 365</div>
                  </div>
                </div>
                <div className="mt-6 rounded-[14px] border border-dashed border-[#cbd5e1] p-4">
                  <div className="grid grid-cols-2 gap-4 text-[12px]">
                    <div>
                      <div className="text-[#8a9bb0]">Días prima</div>
                      <div className="font-[700] text-[#0a2540] mt-1">{formatNumber(aportePrimaDias, 2)} días pagados</div>
                    </div>
                    <div>
                      <div className="text-[#8a9bb0]">Integración anual</div>
                      <div className="font-[700] text-[#0a2540] mt-1">{formatNumber(aportePrimaDias + aguinaldo, 2)} días</div>
                    </div>
                    <div>
                      <div className="text-[#8a9bb0]">SBC bruto</div>
                      <div className="font-[700] text-[#0a2540] mt-1">{formatCurrency(sbcRaw)}</div>
                    </div>
                    <div>
                      <div className="text-[#8a9bb0]">UMA 2026</div>
                      <div className="font-[700] text-[#0a2540] mt-1">{UMA_2026} × 25 = {formatCurrency(TOPE_SBC)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e2e8f2] bg-[#f9fbfd] px-4 py-4 sm:px-7">
                <div className="text-[11px] text-[#8a9bb0]">Cálculo conforme LSS Art. 27</div>
                <button
                  onClick={copySummary}
                  className={`text-[11px] font-[700] tracking-[0.04em] transition-all px-3 py-1.5 rounded-full border ${copied ? 'bg-[#0a2540] text-white border-[#0a2540]' : 'text-[#0a2540] border-transparent hover:border-[#e2e8f2] hover:bg-white'}`}
                >
                  {copied ? '✓ COPIADO' : 'COPIAR RESUMEN'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-7 grid md:grid-cols-3 gap-4 max-w-full">
            <div className="rounded-[16px] bg-white border border-[#e2e8f2] p-5 flex gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#eff6ff] border border-[#dbeafe] flex items-center justify-center text-[16px]">🛡</div>
              <div>
                <div className="text-[13px] font-[700] text-[#0a2540]">Validación IMSS en tiempo real</div>
                <div className="text-[12px] text-[#5a6d85] mt-1 leading-[1.5]">Detecta si tu SBC rebasa 25 UMAs o cae bajo el mínimo. Evita rechazos en IDSE.</div>
              </div>
            </div>
            <div className="rounded-[16px] bg-white border border-[#e2e8f2] p-5 flex gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#f7eee0] border border-[#eadcc2] flex items-center justify-center text-[16px]">📊</div>
              <div>
                <div className="text-[13px] font-[700] text-[#0a2540]">Desglose para contadores</div>
                <div className="text-[12px] text-[#5a6d85] mt-1 leading-[1.5]">Factor con 4 decimales, aporte de vacaciones y aguinaldo separado. Listo para póliza.</div>
              </div>
            </div>
            <div className="rounded-[16px] bg-white border border-[#e2e8f2] p-5 flex gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#f0fdf4] border border-[#dcfce7] flex items-center justify-center text-[16px]">⚡</div>
              <div>
                <div className="text-[13px] font-[700] text-[#0a2540]">Onboarding 24h</div>
                <div className="text-[12px] text-[#5a6d85] mt-1 leading-[1.5]">Infraestructura de pagos segura, soporte para contadores y nómina masiva.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}