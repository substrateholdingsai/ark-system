import { useState, useEffect, useCallback } from 'react';

/* ============================================================
   LÓGICA — intacta del original, solo reordenada
   ============================================================ */
export default function VintageCalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [acc, setAcc] = useState(null);
  const [op, setOp] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [status, setStatus] = useState('Listo • toca un botón');
  const [pulse, setPulse] = useState(0);

  const pulseLCD = () => setPulse((p) => p + 1);

  const format = useCallback((n) => {
    const v = parseFloat(n);
    if (isNaN(v)) return '$0.00';
    return '$' + v.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, []);

  const compute = useCallback((a, b, operator) => {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b !== 0 ? a / b : 0;
      case '%':
        return a * (b / 100);
      default:
        return b;
    }
  }, []);

  const inputDigit = (d) => {
    setStatus(`Ingresado ${d}`);
    pulseLCD();
    if (waiting || justEvaluated) {
      setDisplay(d === '.' ? '0.' : d);
      setWaiting(false);
      setJustEvaluated(false);
    } else {
      if (d === '.' && display.includes('.')) return;
      setDisplay(display === '0' && d !== '.' ? d : display + d);
    }
  };

  const inputOperator = (nextOp) => {
    setStatus(nextOp === 'CE' ? 'CE • entrada borrada' : `Operador ${nextOp} activo`);
    pulseLCD();
    if (nextOp === 'CE') {
      setDisplay('0');
      return;
    }

    const current = parseFloat(display);
    if (op && !waiting && acc !== null) {
      const result = compute(acc, current, op);
      setDisplay(String(result));
      setAcc(result);
    } else {
      setAcc(current);
    }
    setOp(nextOp);
    setWaiting(true);
    setJustEvaluated(false);
  };

  const evaluate = () => {
    setStatus('= • calculado');
    pulseLCD();
    if (!op || acc === null) return;
    const current = parseFloat(display);
    const result = compute(acc, current, op);
    setDisplay(String(result));
    setOp(null);
    setAcc(null);
    setWaiting(true);
    setJustEvaluated(true);
  };

  const clearAll = () => {
    setStatus('AC • reiniciado');
    pulseLCD();
    setDisplay('0');
    setAcc(null);
    setOp(null);
    setWaiting(false);
    setJustEvaluated(false);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable ||
          e.target.closest("input, textarea, select, [contenteditable='true']"))
      ) {
        return;
      }
      if (/[0-9]/.test(e.key)) inputDigit(e.key);
      if (e.key === '.') inputDigit('.');
      if (e.key === '+') inputOperator('+');
      if (e.key === '-') inputOperator('-');
      if (e.key === '*') inputOperator('×');
      if (e.key === '/') {
        e.preventDefault();
        inputOperator('÷');
      }
      if (e.key === '%') inputOperator('%');
      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        evaluate();
      }
      if (e.key === 'Escape') clearAll();
      if (e.key === 'Backspace') setDisplay((d) => (d.length <= 1 ? '0' : d.slice(0, -1)));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [display, op, acc, waiting, justEvaluated]);

  return (
    <div className="vintage-calc-page">
      <style>{`
        .vintage-calc-page {
          --navy:#002B7F; --gold:#D4AF37; --gold-light:#F5D97A; --gold-dark:#A8883F;
          --body:#E8E8E8; --bg:#FAFAF8; --ink:#1A1A1A; --muted:#6B6B63;
          background:
            radial-gradient(900px 500px at 20% -10%, rgba(212,175,55,.08), transparent 60%),
            radial-gradient(700px 500px at 90% 110%, rgba(0,43,127,.06), transparent 60%),
            #FAFAF8;
          color: var(--ink);
          padding: 48px 20px 72px;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif;
          display: flex; flex-direction: column; align-items: center;
        }
        .vintage-calc-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,43,127,.06);
          border: 1px solid rgba(0,43,127,.12);
          color: var(--navy);
          font-size: 10px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase;
          padding: 7px 14px; border-radius: 999px;
        }
        .vintage-calc-eyebrow .dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--navy);
          animation: vp-pulse 2s ease-in-out infinite;
        }
        @keyframes vp-pulse { 50% { opacity: .4; } }
        .vintage-calc-title {
          font-family: ui-serif, Georgia, "Times New Roman", serif;
          font-weight: 900; letter-spacing: -.03em; line-height: .95;
          font-size: 40px; text-align: center; margin: 18px 0 0;
          color: var(--ink);
        }
        .vintage-calc-title span { color: var(--gold-dark); font-style: italic; }
        .vintage-calc-sub {
          max-width: 44ch; text-align: center; margin: 14px 0 0;
          font-size: 14px; line-height: 1.6; color: var(--muted);
        }

        /* ===================== WIDGET ===================== */
        .ark-calc-widget { width: 340px; max-width: 100%; margin: 40px auto 0; }
        .ark-calc-body {
          background: linear-gradient(180deg, #F2F2F2 0%, #E8E8E8 100%);
          border-radius: 22px;
          padding: 18px 18px 14px;
          box-shadow:
            0 20px 50px rgba(0,43,127,.18),
            0 2px 0 #CFCFCF,
            inset 0 2px 0 rgba(255,255,255,.9);
          border: 1px solid #D0D0D0;
        }
        .lcd-display {
          background: linear-gradient(180deg, #8B9478 0%, #9EA792 50%, #A8B09A 100%);
          border: 3px solid #002B7F;
          border-radius: 10px;
          box-shadow:
            inset 0 4px 12px rgba(0,0,0,.4),
            inset 0 -2px 6px rgba(255,255,255,.25),
            0 2px 4px rgba(0,0,0,.15);
          position: relative; overflow: hidden;
          padding: 12px 14px 10px; margin-bottom: 16px;
          transition: transform .12s ease;
        }
        .lcd-display.pulsed { transform: scale(.985); }
        .lcd-display::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 42%;
          background: linear-gradient(180deg, rgba(255,255,255,.28) 0%, transparent 100%);
          pointer-events: none;
        }
        .lcd-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 8px; letter-spacing: .2em; color: rgba(42,47,35,.6);
          margin-bottom: 2px; position: relative; z-index: 1; font-weight: 700;
        }
        .lcd-text {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          color: #2A2F23;
          text-shadow: 0 0 2px rgba(42,47,35,.3), 1px 1px 0 rgba(168,176,154,.45);
          letter-spacing: .05em; font-size: 30px; font-weight: 900;
          text-align: right; line-height: 1; position: relative; z-index: 1;
          font-variant-numeric: tabular-nums;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .calc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .vbtn {
          position: relative;
          background: linear-gradient(180deg, #FFF 0%, #F0F0F0 50%, #D8D8D8 100%);
          border: 1px solid #999; border-radius: 12px;
          box-shadow:
            0 4px 0 #888,
            0 6px 8px rgba(0,0,0,.22),
            inset 0 1px 0 rgba(255,255,255,.9),
            inset 0 -1px 0 rgba(0,0,0,.08);
          cursor: pointer; height: 52px;
          display: flex; align-items: center; justify-content: center;
          transition: all .08s ease; overflow: hidden;
          user-select: none; -webkit-tap-highlight-color: transparent;
        }
        .vbtn::before {
          content: ''; position: absolute; top: 2px; left: 4px; right: 4px; height: 46%;
          background: linear-gradient(180deg, rgba(255,255,255,.9) 0%, rgba(255,255,255,.3) 50%, transparent 100%);
          border-radius: 10px 10px 50% 50%; pointer-events: none;
        }
        .vbtn::after {
          content: ''; position: absolute; bottom: 2px; left: 12%; right: 12%; height: 3px;
          background: rgba(255,255,255,.5); border-radius: 50%; filter: blur(1px); pointer-events: none;
        }
        .vbtn:active {
          transform: translateY(3px);
          box-shadow: 0 1px 0 #888, 0 2px 4px rgba(0,0,0,.25), inset 0 2px 4px rgba(0,0,0,.18);
        }
        .vbtn.is-active {
          outline: 2px solid var(--gold); outline-offset: 2px;
          transform: translateY(1px);
          box-shadow: 0 3px 0 #000, 0 5px 10px rgba(0,0,0,.3);
        }
        .vbtn-dark {
          background: linear-gradient(180deg, #4A4A4A 0%, #2A2A2A 50%, #1A1A1A 100%);
          border-color: #000;
          box-shadow: 0 4px 0 #000, 0 6px 8px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.18);
        }
        .vbtn-dark::before {
          background: linear-gradient(180deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.05) 50%, transparent 100%);
        }
        .vbtn-dark:active {
          box-shadow: 0 1px 0 #000, 0 2px 4px rgba(0,0,0,.35), inset 0 2px 4px rgba(0,0,0,.4);
        }
        .vbtn-red {
          background: linear-gradient(180deg, #E05050 0%, #C43A3A 50%, #9A2525 100%);
          border-color: #6B1515;
          box-shadow: 0 4px 0 #6B1515, 0 6px 8px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.3);
        }
        .vbtn-red:active {
          box-shadow: 0 1px 0 #6B1515, 0 2px 4px rgba(0,0,0,.35), inset 0 2px 6px rgba(0,0,0,.3);
        }
        .vbtn-num {
          font-family: Georgia, ui-serif, serif; font-weight: 900; font-size: 22px;
          color: #1A1A1A; position: relative; z-index: 2;
          text-shadow: 0 1px 0 rgba(255,255,255,.8), 0 0 8px rgba(0,0,0,.12);
          filter: drop-shadow(0 2px 2px rgba(0,0,0,.18));
        }
        .vbtn-dark .vbtn-num { color: #fff; text-shadow: 0 0 4px rgba(255,255,255,.5); }
        .vbtn-red .vbtn-num { color: #fff; text-shadow: 0 1px 0 rgba(0,0,0,.3); }
        .vbtn-op { color: var(--gold-light) !important; }

        .ark-brand {
          text-align: center; margin-top: 12px; padding-top: 10px;
          border-top: 1px solid rgba(0,0,0,.08);
        }
        .ark-brand-title {
          font-family: Georgia, serif; font-style: italic; font-size: 16px;
          color: var(--navy); line-height: 1; font-weight: 700;
        }
        .ark-brand-sub {
          font-size: 8px; letter-spacing: .32em; text-transform: uppercase;
          color: var(--gold-dark); margin-top: 2px; font-weight: 600;
        }

        .vintage-calc-status {
          margin-top: 22px;
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; color: var(--muted);
          background: rgba(0,0,0,.03);
          border: 1px solid rgba(0,0,0,.06);
          padding: 8px 14px; border-radius: 999px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        .vintage-calc-status .sep { opacity: .3; }

        .vintage-calc-meta {
          margin-top: 40px;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
          max-width: 640px; width: 100%;
          padding-top: 28px; border-top: 1px solid rgba(0,0,0,.06);
        }
        .vintage-calc-meta h4 {
          font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--muted); margin: 0 0 6px; font-weight: 700;
        }
        .vintage-calc-meta p {
          font-size: 13px; line-height: 1.5; color: rgba(26,26,26,.75); margin: 0;
        }
        @media (max-width: 640px) {
          .vintage-calc-title { font-size: 30px; }
          .vintage-calc-meta { grid-template-columns: 1fr; gap: 18px; }
        }
      `}</style>

      <span className="vintage-calc-eyebrow">
        <span className="dot" /> Ark Legal • Widget contable
      </span>

      <h2 className="vintage-calc-title">
        Calculadora <span>vintage</span>.<br />
        Para tu despacho.
      </h2>

      <p className="vintage-calc-sub">
        Una calculadora aritmética de escritorio con estética clásica, pensada como microherramienta
        visual para sitios de contabilidad y despachos.
      </p>

      {/* ===== WIDGET ===== */}
      <div className="ark-calc-widget">
        <div className="ark-calc-body">
          <div className={`lcd-display ${pulse % 2 === 1 ? 'pulsed' : ''}`} data-pulse={pulse}>
            <div className="lcd-label">TOTAL A PAGAR</div>
            <div className="lcd-text">{format(display)}</div>
          </div>

          <div className="calc-grid">
            <button className="vbtn vbtn-red" onClick={clearAll} aria-label="Borrar todo">
              <span className="vbtn-num" style={{ fontSize: 18 }}>
                AC
              </span>
            </button>
            <button
              className="vbtn vbtn-dark"
              onClick={() => inputOperator('CE')}
              aria-label="Borrar entrada"
            >
              <span className="vbtn-num" style={{ fontSize: 16 }}>
                CE
              </span>
            </button>
            <button
              className={`vbtn vbtn-dark ${op === '%' ? 'is-active' : ''}`}
              onClick={() => inputOperator('%')}
              aria-label="Porcentaje"
            >
              <span className="vbtn-num">%</span>
            </button>
            <button
              className={`vbtn vbtn-dark ${op === '÷' ? 'is-active' : ''}`}
              onClick={() => inputOperator('÷')}
              aria-label="Dividir"
            >
              <span className="vbtn-num vbtn-op">÷</span>
            </button>

            {['7', '8', '9'].map((n) => (
              <button key={n} className="vbtn" onClick={() => inputDigit(n)}>
                <span className="vbtn-num">{n}</span>
              </button>
            ))}
            <button
              className={`vbtn vbtn-dark ${op === '×' ? 'is-active' : ''}`}
              onClick={() => inputOperator('×')}
              aria-label="Multiplicar"
            >
              <span className="vbtn-num vbtn-op">×</span>
            </button>

            {['4', '5', '6'].map((n) => (
              <button key={n} className="vbtn" onClick={() => inputDigit(n)}>
                <span className="vbtn-num">{n}</span>
              </button>
            ))}
            <button
              className={`vbtn vbtn-dark ${op === '-' ? 'is-active' : ''}`}
              onClick={() => inputOperator('-')}
              aria-label="Restar"
            >
              <span className="vbtn-num vbtn-op">−</span>
            </button>

            {['1', '2', '3'].map((n) => (
              <button key={n} className="vbtn" onClick={() => inputDigit(n)}>
                <span className="vbtn-num">{n}</span>
              </button>
            ))}
            <button
              className={`vbtn vbtn-dark ${op === '+' ? 'is-active' : ''}`}
              onClick={() => inputOperator('+')}
              aria-label="Sumar"
            >
              <span className="vbtn-num vbtn-op">+</span>
            </button>

            <button
              className="vbtn"
              style={{ gridColumn: 'span 2' }}
              onClick={() => inputDigit('0')}
            >
              <span className="vbtn-num">0</span>
            </button>
            <button className="vbtn" onClick={() => inputDigit('.')}>
              <span className="vbtn-num">.</span>
            </button>
            <button className="vbtn vbtn-red" onClick={evaluate} aria-label="Igual">
              <span className="vbtn-num" style={{ fontSize: 26 }}>
                =
              </span>
            </button>
          </div>

          <div className="ark-brand">
            <div className="ark-brand-title">ARK Systems</div>
            <div className="ark-brand-sub">Noah • Jev AI • Widget</div>
          </div>
        </div>
      </div>

      <div className="vintage-calc-status" role="status" aria-live="polite">
        <span>{status}</span>
        <span className="sep">•</span>
        <span>{format(display)}</span>
      </div>

      {/* mini meta al pie, sobria */}
      <div className="vintage-calc-meta">
        <div>
          <h4>Integración</h4>
          <p>Operaciones básicas y porcentajes desde el teclado o los botones.</p>
        </div>
        <div>
          <h4>Estilo</h4>
          <p>Interfaz vintage con pantalla LCD y botones táctiles con relieve.</p>
        </div>
        <div>
          <h4>Uso</h4>
          <p>Prototipo visual; no calcula impuestos ni sustituye herramientas contables.</p>
        </div>
      </div>
    </div>
  );
}
