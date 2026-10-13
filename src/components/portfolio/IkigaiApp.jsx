import React, { useState, useMemo } from "react";
import {
  ArrowRight, Check, Clock, Copy, Droplets, Flame,
  MapPin, Minus, Moon, Plus, ShoppingBag, Users,
} from "lucide-react";

/* ============================================================
   CONFIG — única fuente de verdad (dentro de la isla)
   ============================================================ */
const DEMO = {
  whatsapp: "529181229558",
  spei: {
    bank: "STP",
    holder: "Ikigai Wellness",
    clabe: "646180123456789012",
    conceptPrefix: "Reserva Ikigai",
  },
  cash: { depositPct: 0.2 },
  blink: {
    enabled: true,
    lightningAddress: "ikigai@blink.sv",
  },
};

const METHODS = [
  { id: "spei",  label: "Transferencia" },
  { id: "card",  label: "Tarjeta" },
  { id: "cash",  label: "Efectivo" },
];

/* ============================================================
   LÓGICA DE PAGOS — un solo lugar, un solo shape
   ============================================================ */
function buildReceipt({ lines, method, customer }) {
  const subtotal = lines.reduce((s, l) => s + l.subtotal, 0);
  const total = subtotal;

  const details = {
    spei:  `CLABE ${DEMO.spei.clabe} (${DEMO.spei.bank})`,
    card:  "Te enviamos link seguro por WhatsApp",
    cash:  `Anticipo 20%: $${Math.round(total * DEMO.cash.depositPct)} MXN · Resto en sitio`,
    blink: `Lightning a ${DEMO.blink.lightningAddress}`,
  }[method];

  return {
    lines, subtotal, total, method, customer,
    methodLabel: METHODS.find((m) => m.id === method)?.label ?? "Bitcoin",
    methodDetails: details,
  };
}

function receiptToText(r) {
  const body = r.lines.length
    ? r.lines.map((l) => `• ${l.qty} × ${l.name} (${l.when}) — $${l.subtotal}`).join("\n")
    : "• (carrito vacío)";
  return [
    "Hola Ikigai Wellness 🌿",
    "Quiero reservar:",
    body,
    "",
    `Subtotal: $${r.subtotal} MXN`,
    `Total: $${r.total} MXN`,
    "",
    `Nombre: ${r.customer.name || "—"}`,
    `WhatsApp: ${r.customer.whatsapp || "—"}`,
    `Método: ${r.methodLabel}`,
    `Detalle: ${r.methodDetails}`,
    `Nota: ${r.customer.note || "—"}`,
  ].join("\n");
}

function receiptToWhatsAppUrl(r) {
  return `https://wa.me/${DEMO.whatsapp}?text=${encodeURIComponent(receiptToText(r))}`;
}

/* ============================================================
   DATOS DEMO (hardcodeados como Temozonia/Tomato)
   ============================================================ */
const CEREMONIAS = [
  { id: "temazcal", name: "Temazcal • Rapé • Cenote", when: "29 AGO 10:33", price: 999, stock: 15, badge: "15 cupos", desc: "Temazcal tradicional, rapé con intención y cierre en cenote. Grupo contenido.", icon: Flame, accent: "from-[#FFF1E6] to-[#FFB27A]" },
  { id: "cacao",    name: "Cacao & Baño de Sonido",   when: "12 SEP 19:00", price: 444, stock: 20, badge: "20 cupos", desc: "Cacao ceremonial y baño de sonido con gong y cuencos. Apertura suave.",        icon: Moon,  accent: "from-[#EAF9F3] to-[#A8E6CF]" },
  { id: "cenote",   name: "Cenote & Breathwork",       when: "04 OCT 09:00", price: 777, stock: 12, badge: "12 cupos", desc: "Inmersión consciente en cenote y respiración holotrópica en selva.",            icon: Droplets, accent: "from-[#EAF9F3] to-[#A8E6CF]" },
];

/* ============================================================
   COMPONENTE
   ============================================================ */
export default function IkigaiApp() {
  const [cart, setCart] = useState({});
  const [method, setMethod] = useState("spei");
  const [showBlink, setShowBlink] = useState(false);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");

  const lines = useMemo(
    () => Object.entries(cart)
      .filter(([, q]) => q > 0)
      .map(([id, qty]) => {
        const c = CEREMONIAS.find((x) => x.id === id);
        return { id, name: c.name, when: c.when, price: c.price, qty, subtotal: c.price * qty };
      }),
    [cart]
  );

  const total = useMemo(() => lines.reduce((s, l) => s + l.subtotal, 0), [lines]);
  const itemCount = useMemo(() => Object.values(cart).reduce((s, q) => s + q, 0), [cart]);

  const activeMethod = showBlink ? "blink" : method;

  const receipt = useMemo(
    () => buildReceipt({ lines, method: activeMethod, customer: { name, whatsapp, note } }),
    [lines, activeMethod, name, whatsapp, note]
  );

  const add = (id) => setCart((c) => {
    const item = CEREMONIAS.find((x) => x.id === id);
    const q = c[id] ?? 0;
    return q >= item.stock ? c : { ...c, [id]: q + 1 };
  });

  const remove = (id) => setCart((c) => {
    const q = c[id] ?? 0;
    if (q <= 1) { const { [id]: _, ...rest } = c; return rest; }
    return { ...c, [id]: q - 1 };
  });

  const confirm = () => {
    if (!name.trim()) return flash("Agrega tu nombre");
    if (lines.length === 0) return flash("Tu carrito está vacío");
    window.open(receiptToWhatsAppUrl(receipt), "_blank");
  };

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2000); };

  /* ---------- render ---------- */
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] antialiased overflow-x-hidden">
      <style>{`
        :root{
          --mandarina:#FF8A3D; --mandarina-soft:#FFB27A; --mandarina-tint:#FFF1E6;
          --menta:#4FD1A5; --menta-soft:#A8E6CF; --menta-tint:#EAF9F3;
          --cream:#FFFCF7; --sand:#F7F2E8; --line:#EDE4D3;
          --ink:#2A2A28; --muted:#6B6B63;
          --pay-surface:#FFFFFF; --pay-ink:#1F2937; --pay-line:#E5E7EB; --pay-accent:#111827;
        }
        .ik-serif{font-family:ui-serif,Georgia,serif;font-weight:900;letter-spacing:-0.03em;line-height:0.9}
        .ik-num{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:-0.01em}
        .ik-btn{border-radius:999px;padding:12px 22px;font-weight:600;font-size:14px;display:inline-flex;align-items:center;gap:8px;border:1px solid var(--line);background:#fff;transition:.2s}
        .ik-btn:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(255,138,61,.15)}
        .ik-btn-primary{background:var(--mandarina);color:#fff;border-color:var(--mandarina)}
        .ik-btn-mint{background:var(--menta);color:#fff;border-color:var(--menta)}
        .ik-glass{background:linear-gradient(180deg,rgba(255,255,255,.92),rgba(255,252,247,.85));backdrop-filter:blur(20px);border:1px solid var(--line);border-radius:28px;box-shadow:0 20px 60px rgba(255,138,61,.06)}
        .pay-card{background:var(--pay-surface);color:var(--pay-ink);border:1px solid var(--pay-line);border-radius:14px;padding:16px;font-family:ui-sans-serif,system-ui,sans-serif}
        .pay-tab{border-radius:999px;padding:9px 16px;font-size:13px;font-weight:600;border:1px solid var(--pay-line);background:#fff;color:var(--pay-ink);transition:.18s}
        .pay-tab.active{background:var(--pay-accent);color:#fff;border-color:var(--pay-accent)}
        .pay-mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px}
        .pay-link{font-size:12px;color:var(--muted);text-decoration:underline;text-underline-offset:3px}
      `}</style>

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[var(--ink)] text-white text-[12px] font-semibold px-4 py-2 rounded-full">
          {toast}
        </div>
      )}

      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-[rgba(255,252,247,.82)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--mandarina)] text-white grid place-items-center text-[11px] font-bold">IK</div>
            <span className="text-[15px] font-bold tracking-[0.12em] uppercase">Ikigai Wellness</span>
            <span className="hidden md:flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--muted)]">
              <Clock size={12} /> Hoy en Homún
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[var(--muted)]">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-2.5 py-1.5">
              <MapPin size={12} className="text-[var(--mandarina)]" />
              Homún, Yucatán
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-2.5 py-1.5">
              <Users size={12} className="text-[var(--menta)]" />
              4.9/5
            </div>
          </div>
        </div>
      </nav>

      <header className="mx-auto max-w-[1180px] px-5 md:px-8 pt-8 pb-6">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--mandarina-tint)] border border-[var(--mandarina-soft)]/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--mandarina)]">
              <Flame size={12} /> Ceremonias de bienestar
            </div>
            <h1 className="ik-serif text-[42px] md:text-[64px] mt-4 leading-[0.9] text-[var(--ink)]">
              Reserva una
              <span className="text-[var(--mandarina)]"> experiencia</span>
              <br />
              para tu alma.
            </h1>
            <p className="mt-4 max-w-[56ch] text-[14px] md:text-[15px] leading-[1.7] text-[var(--muted)]">
              Rituals de fuego, cacao, cenote y respiración en un entorno íntimo y guiado. Elige tu ceremonia, confirma tu lugar y paga por WhatsApp con la opción que más te convenga.
            </p>
          </div>

          <div className="rounded-[28px] border border-[var(--line)] bg-white p-4 md:p-5 shadow-[0_18px_50px_rgba(42,42,40,0.04)]">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Lo más valorado</div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-[12px]">
              {CEREMONIAS.map((c) => (
                <div key={c.id} className={`rounded-xl bg-gradient-to-br ${c.accent} p-3 border border-white/70`}>
                  <div className="font-semibold leading-tight">{c.name.split("•")[0]}</div>
                  <div className="ik-num text-[var(--ink)] mt-1">${c.price}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[12px] leading-[1.5] text-[var(--muted)]">
              Sin sorpresas. Lo que ves es lo que pagas.
            </p>
          </div>
        </div>
      </header>

      <main id="ceremonias" className="mx-auto max-w-[1180px] px-5 md:px-8 pb-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
        <div className="space-y-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[22px] font-bold tracking-tight">Ceremonias</h2>
            <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--muted)]">Cupos en vivo</span>
          </div>
          {CEREMONIAS.map((c) => {
            const Icon = c.icon;
            const qty = cart[c.id] ?? 0;
            return (
              <div key={c.id} className="relative overflow-hidden rounded-[24px] border border-[var(--line)] bg-white p-5 md:p-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-30 pointer-events-none`} />
                <div className="relative flex gap-4">
                  <div className="w-12 h-12 rounded-[14px] bg-white border border-[var(--line)] grid place-items-center shrink-0">
                    <Icon size={20} className="text-[var(--mandarina)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[16px] md:text-[18px] font-semibold">{c.name}</h3>
                      <span className="bg-[var(--mandarina)] text-white text-[10px] px-2 py-1 rounded-full font-bold">{c.badge}</span>
                      <span className="ik-num text-[11px] px-2 py-1 rounded-full bg-[var(--cream)] border border-[var(--line)] text-[var(--muted)]">{c.when}</span>
                    </div>
                    <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--muted)] max-w-[56ch]">{c.desc}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="ik-num text-[15px] font-bold">${c.price} <span className="text-[11px] font-medium text-[var(--muted)]">MXN</span></div>
                      <div className="text-[11px] text-[var(--muted)]">Stock: {c.stock - qty} restantes</div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      {qty === 0 ? (
                        <button onClick={() => add(c.id)} className="ik-btn ik-btn-primary !py-2 !px-4"><Plus size={14} /> Agregar</button>
                      ) : (
                        <>
                          <button onClick={() => remove(c.id)} className="ik-btn !w-9 !h-9 !p-0"><Minus size={14} /></button>
                          <div className="min-w-[44px] h-9 grid place-items-center rounded-full bg-[var(--mandarina)] text-white ik-num text-[13px]">{qty}</div>
                          <button onClick={() => add(c.id)} className="ik-btn !w-9 !h-9 !p-0"><Plus size={14} /></button>
                          <span className="ml-2 text-[12px] text-[var(--muted)]">${qty * c.price} MXN</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside id="reserva" className="lg:sticky lg:top-[88px] space-y-4">
          <div className="ik-glass p-5 md:p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--mandarina)]">Tu reserva</div>
                <div className="mt-2 text-[11px] text-[var(--muted)]">{itemCount} lugares</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white border border-[var(--line)] grid place-items-center">
                <ShoppingBag size={16} className="text-[var(--mandarina)]" />
              </div>
            </div>

            <div className="mt-6">
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--muted)]">Total</div>
              <div className="ik-serif text-[56px] text-[var(--ink)] leading-[0.9] mt-1">
                ${total.toLocaleString()} <span className="text-[28px] align-super">MXN</span>
              </div>
            </div>

            <div className="mt-5 space-y-2 max-h-[200px] overflow-auto">
              {lines.length === 0 ? (
                <div className="ik-glass p-4 text-[12px] text-[var(--muted)] !rounded-[14px]">Tu carrito está vacío.</div>
              ) : (
                lines.map((l) => (
                  <div key={l.id} className="flex justify-between gap-3 px-3 py-2.5 rounded-[12px] bg-[var(--menta-tint)] border border-[var(--menta-soft)]/40">
                    <div className="min-w-0">
                      <div className="text-[12px] font-semibold truncate">{l.qty}× {l.name}</div>
                      <div className="text-[10px] ik-num text-[var(--muted)]">{l.when}</div>
                    </div>
                    <div className="ik-num text-[12px] font-bold">${l.subtotal}</div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 space-y-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre"
                className="w-full rounded-[14px] border border-[var(--line)] bg-white px-4 py-3 text-[14px] outline-none focus:border-[var(--mandarina)]" />
              <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp"
                className="w-full rounded-[14px] border border-[var(--line)] bg-white px-4 py-3 text-[14px] outline-none focus:border-[var(--mandarina)]" />
              <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Nota (opcional)" rows={2}
                className="w-full rounded-[14px] border border-[var(--line)] bg-white px-4 py-3 text-[14px] outline-none focus:border-[var(--mandarina)] resize-none" />
            </div>

            <div className="mt-5">
              <div className="text-[11px] font-bold tracking-widest uppercase text-[var(--muted)] mb-2">Método de pago</div>
              <div className="flex flex-wrap gap-2">
                {METHODS.map((m) => (
                  <button key={m.id} onClick={() => { setMethod(m.id); setShowBlink(false); }}
                    className={`pay-tab ${activeMethod === m.id ? "active" : ""}`}>
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="pay-card mt-3">
                {activeMethod === "spei" && <SpeiBlock total={total} name={name} />}
                {activeMethod === "card" && <CardBlock total={total} />}
                {activeMethod === "cash" && <CashBlock total={total} />}
                {activeMethod === "blink" && <BlinkBlock />}
              </div>

              {DEMO.blink.enabled && !showBlink && (
                <button onClick={() => setShowBlink(true)} className="pay-link mt-3">¿Pagas en Bitcoin? →</button>
              )}
              {showBlink && (
                <button onClick={() => setShowBlink(false)} className="pay-link mt-3">← Volver a métodos de pago</button>
              )}
            </div>

            <button onClick={confirm} className="ik-btn ik-btn-primary w-full mt-5 !py-4 text-[14px]">
              Confirmar por WhatsApp • ${total.toLocaleString()} MXN <ArrowRight size={16} />
            </button>
            <p className="mt-3 text-[11px] text-center text-[var(--muted)]">
              Abre wa.me/{DEMO.whatsapp} con el mensaje ya escrito.
            </p>
          </div>

          <div className="flex gap-2 text-[10px] text-[var(--muted)] px-2">
            <span className="px-2.5 py-1 rounded-full bg-white border border-[var(--line)]">Factura no incluida</span>
            <span className="px-2.5 py-1 rounded-full bg-white border border-[var(--line)]">Reprogramación 48h</span>
          </div>
        </aside>
      </main>
    </div>
  );
}

/* ============================================================
   SUBCOMPONENTES DE PAGO — todos leen de DEMO, tono sobrio
   ============================================================ */
function SpeiBlock({ total, name }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(DEMO.spei.clabe); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="space-y-2">
      <div className="text-[13px] font-bold">Transferencia SPEI</div>
      <Row k="Banco" v={DEMO.spei.bank} />
      <Row k="Titular" v={DEMO.spei.holder} />
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-widest text-[var(--muted)]">CLABE</span>
        <span className="pay-mono">{DEMO.spei.clabe}</span>
        <button onClick={copy} className="pay-tab !py-1 !px-3">
          {copied ? <><Check size={12} /> Copiado</> : <><Copy size={12} /> Copiar</>}
        </button>
      </div>
      <Row k="Concepto" v={`${DEMO.spei.conceptPrefix} ${name || ""}`.trim()} />
      <Row k="Monto" v={`$${total} MXN`} />
    </div>
  );
}

function CardBlock({ total }) {
  return (
    <div className="space-y-2">
      <div className="text-[13px] font-bold">Tarjeta</div>
      <p className="text-[12px] text-[var(--muted)]">
        Te enviamos un link de pago seguro por WhatsApp por ${total} MXN. No guardamos datos de tarjeta.
      </p>
    </div>
  );
}

function CashBlock({ total }) {
  const dep = Math.round(total * DEMO.cash.depositPct);
  return (
    <div className="space-y-2">
      <div className="text-[13px] font-bold">Efectivo en sitio</div>
      <p className="text-[12px] text-[var(--muted)]">
        Aparta con <b>${dep} MXN</b> (20%) y liquida <b>${total - dep} MXN</b> al llegar a Homún.
      </p>
    </div>
  );
}

function BlinkBlock() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(DEMO.blink.lightningAddress); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="space-y-2">
      <div className="text-[13px] font-bold">Pago con Bitcoin (Lightning)</div>
      <p className="text-[12px] text-[var(--muted)]">
        Pago instantáneo por Lightning. Envía a la dirección o abre Blink.
      </p>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-widest text-[var(--muted)]">Lightning</span>
        <span className="pay-mono">{DEMO.blink.lightningAddress}</span>
        <button onClick={copy} className="pay-tab !py-1 !px-3">
          {copied ? <><Check size={12} /> Copiado</> : <><Copy size={12} /> Copiar</>}
        </button>
      </div>
      <a href={`https://blink.sv/${DEMO.blink.lightningAddress}`} target="_blank" rel="noopener noreferrer" className="pay-link inline-block">
        Abrir en Blink →
      </a>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between gap-2 text-[12px]">
      <span className="text-[var(--muted)]">{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}
