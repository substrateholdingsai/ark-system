import { useState, useRef, useEffect } from 'react';
import { demos } from '@/data/config';
import {
  Banknote,
  Check,
  Clock,
  Copy,
  CreditCard,
  Flame,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  X,
  Zap,
} from 'lucide-react';

const DEMO = demos.temozonia;
const CONFIG = {
  BTCPAY_POS_URL: DEMO.payments.btcpayUrl,
  CLABE: DEMO.payments.clabe.number,
  BANK: DEMO.payments.clabe.bank,
  CLABE_HOLDER: DEMO.payments.clabe.holder,
  WHATSAPP: DEMO.payments.whatsapp,
  WHATSAPP_DISPLAY: DEMO.payments.whatsappDisplay,
  LIGHTNING_ADDRESS: DEMO.payments.lightningAddress,
  SATS_RATE: DEMO.payments.satsRate,
  DEMO_MODE: DEMO.demoMode,
};

const PRODUCTS = DEMO.products;

export default function TemozoniaApp() {
  if (!DEMO.enabled) return null;

  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [copiedClabe, setCopiedClabe] = useState(false);
  const [copiedLightning, setCopiedLightning] = useState(false);
  const [customer, setCustomer] = useState({ name: '', address: '', phone: '', notes: '' });
  const checkoutRef = useRef(null);

  const total = cart.reduce((acc, item) => {
    const p = PRODUCTS.find((pr) => pr.id === item.id);
    return acc + (p ? p.price * item.qty : 0);
  }, 0);
  const totalItems = cart.reduce((acc, i) => acc + i.qty, 0);

  const addToCart = (id, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });
    setDrawerOpen(true);
  };
  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0),
    );
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const copyClabe = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.CLABE);
    } catch {
      /* fallback */
    }
    setCopiedClabe(true);
    setTimeout(() => setCopiedClabe(false), 2000);
  };
  const copyLightning = async () => {
    const text = `${CONFIG.LIGHTNING_ADDRESS} - $${total} MXN (~${Math.round(total * CONFIG.SATS_RATE * 100)} sats)`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
    setCopiedLightning(true);
    setTimeout(() => setCopiedLightning(false), 2000);
  };

  const getWhatsAppLink = () => {
    const items = cart
      .map((item) => {
        const p = PRODUCTS.find((pr) => pr.id === item.id);
        return `• ${item.qty}x ${p?.name} ${p?.weight} - $${p ? p.price * item.qty : 0}`;
      })
      .join('%0A');
    const text = `Hola ${DEMO.brand.name} 🔥%0AQuiero pedir:%0A${items}%0A%0ATotal: $${total} MXN%0APago: ${paymentMethod.toUpperCase()}%0A%0ANombre: ${customer.name || '(por confirmar)'}%0ADirección: ${customer.address || '(por confirmar)'}%0ATel: ${customer.phone}%0A${customer.notes ? `Nota: ${customer.notes}%0A` : ''}`;
    return `https://wa.me/${CONFIG.WHATSAPP}?text=${text}`;
  };

  const scrollToCheckout = () =>
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="w-full bg-[#FFF9F3] text-[#2B0E0A] rounded-[24px] overflow-hidden border border-[#7E1D0F]/10 shadow-[0_20px_60px_rgba(126,29,15,0.08)] font-sans selection:bg-[#FF8800]/20">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap'); .display{font-family:'Playfair Display',serif;}`}</style>

      {/* Demo Banner */}
      {CONFIG.DEMO_MODE && (
        <div className="bg-[#2B0E0A] text-[#FFD60A] text-[10px] font-black tracking-[0.2em] text-center py-2">
          DEMO INTERACTIVA • DATOS FICTICIOS • CLABE Y PAGOS DE PRUEBA • ARK SYSTEM
        </div>
      )}

      {/* Top bar */}
      <div className="bg-[#7E1D0F] text-[#FFE9D6] text-[11px] font-semibold tracking-wide">
        <div className="max-w-[1160px] mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> ENTREGA CAUCEL &lt;90 MIN
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> MÉRIDA
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-3.5 h-3.5 fill-[#FF8800] text-[#FF8800]" />
            <span>4.9 • 347 pedidos este mes</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#FFF9F3]/90 border-b border-[#7E1D0F]/10">
        <div className="max-w-[1160px] mx-auto px-4 h-[64px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#7E1D0F] text-white grid place-items-center font-black display text-[18px]">
              T
            </div>
            <div className="leading-none">
              <div className="display font-black text-[18px] tracking-tight">TEMOZONIA</div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-[#7E1D0F]/70 -mt-0.5">
                CARNES AHUMADAS
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 ml-6 pl-6 border-l border-[#7E1D0F]/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold">
                Ahumando ahora • Quedan {PRODUCTS.reduce((a, b) => a + b.stock, 0)} piezas hoy
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${CONFIG.WHATSAPP}`}
              target="_blank"
              rel="noopener"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-full bg-[#25D366] text-white font-bold text-sm"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative inline-flex items-center gap-2 h-10 px-4 rounded-full bg-[#7E1D0F] text-white font-bold text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-[#FF8800] text-[#2B0E0A] text-[11px] grid place-items-center font-black">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero + Products */}
      <div className="max-w-[1160px] mx-auto px-4 pt-6">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FF8800]/15 border border-[#FF8800]/20 text-[#7E1D0F] text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-[#FF8800]" /> ARTESANAL • MEZQUITE • 8 HORAS
            </div>
            <h1 className="display font-black text-[32px] sm:text-[44px] leading-[0.95] tracking-tight mt-4">
              Carnes Ahumadas
              <br />
              <span className="text-[#7E1D0F]">Artesanales en Caucel</span>
              <br />
              <span className="text-[#FF8800]">Pide y Paga en Segundos</span>
            </h1>
            <p className="mt-4 text-[15px] leading-6 text-[#5A2A22] max-w-[52ch]">
              Sin apps. Sin esperas. Eliges, pagas como quieres y te llega humeante. Transferencia,
              tarjeta vía BTCPay, Lightning ⚡ a USDT Solana Phantom, o efectivo.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { k: 'Entrega', v: '<90 min Caucel' },
                { k: 'Pago', v: '4 métodos al instante' },
                { k: 'Garantía', v: 'Si no te gusta, te lo cambiamos' },
              ].map((i) => (
                <div
                  key={i.k}
                  className="flex items-center gap-2 bg-white border border-[#7E1D0F]/10 rounded-full px-3 py-1.5"
                >
                  <span className="text-[10px] font-black tracking-widest text-[#7E1D0F]/60">
                    {i.k}
                  </span>
                  <span className="text-xs font-semibold">{i.v}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={scrollToCheckout}
                className="h-12 px-6 rounded-full bg-[#FF8800] text-[#2B0E0A] font-black text-[15px] shadow-[0_8px_20px_rgba(255,136,0,0.35)]"
              >
                Ver carnes • desde $280
              </button>
              <button
                onClick={() =>
                  document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="h-12 px-5 rounded-full bg-white border border-[#7E1D0F]/15 font-bold text-sm"
              >
                Cómo funciona
              </button>
            </div>
          </div>
          <div className="bg-white rounded-[20px] border border-[#7E1D0F]/10 overflow-hidden">
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop"
                  className="w-10 h-10 rounded-full object-cover"
                  alt="cliente"
                />
                <div>
                  <div className="font-bold text-sm">Lupita, Caucel</div>
                  <div className="text-xs text-[#7E1D0F]/60 -mt-0.5">
                    Hoy 2:14pm • Pack Parrillero
                  </div>
                </div>
              </div>
              <div className="text-[#FF8800] flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF8800]" />
                ))}
              </div>
            </div>
            <div className="px-5 pb-4 text-[13px] leading-5 text-[#4A2A24]">
              “Llegó en 45 min, aún humeando. La carne se deshace. Pagué con Lightning y me cayó en
              Phantom en USDT, súper rápido.”
            </div>
            <div className="grid grid-cols-3 gap-px bg-[#7E1D0F]/10">
              <div className="bg-[#FFF9F3] p-3 text-center">
                <div className="font-black text-[18px]">347</div>
                <div className="text-[10px] font-bold tracking-widest text-[#7E1D0F]/60">
                  PEDIDOS / MES
                </div>
              </div>
              <div className="bg-[#FFF9F3] p-3 text-center">
                <div className="font-black text-[18px]">52 min</div>
                <div className="text-[10px] font-bold tracking-widest text-[#7E1D0F]/60">
                  ENTREGA PROM.
                </div>
              </div>
              <div className="bg-[#FFF9F3] p-3 text-center">
                <div className="font-black text-[18px]">98%</div>
                <div className="text-[10px] font-bold tracking-widest text-[#7E1D0F]/60">
                  REPITEN
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="productos" className="pt-10 pb-6">
          <div className="flex items-end justify-between gap-4 mb-4">
            <h2 className="display font-black text-[24px] sm:text-[30px] tracking-tight">
              Elige tu ahumado
            </h2>
            <div className="text-xs font-semibold text-[#7E1D0F]/60">
              5 cortes • Listo para calentar
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((p) => {
              const inCart = cart.find((c) => c.id === p.id)?.qty || 0;
              return (
                <div
                  key={p.id}
                  className="group bg-white rounded-[20px] border border-[#7E1D0F]/10 overflow-hidden hover:shadow-[0_16px_40px_rgba(126,29,15,0.12)] transition-shadow"
                >
                  <div className="relative h-[200px] overflow-hidden bg-[#FFF1E6]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {p.badge && (
                        <span className="px-2.5 py-1 rounded-full bg-[#7E1D0F] text-white text-[10px] font-black tracking-widest">
                          {p.badge}
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold border border-black/5">
                        Quedan {p.stock}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#FF8800] text-[#2B0E0A] text-xs font-black">
                      ${p.price} • {p.weight}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-black text-[16px] leading-tight">{p.name}</div>
                    <div className="text-xs text-[#7E1D0F]/60 font-semibold mt-0.5">
                      {p.weight.toUpperCase()} • {p.desc}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      {inCart === 0 ? (
                        <button
                          onClick={() => addToCart(p.id, 1)}
                          className="flex-1 h-10 rounded-full bg-[#2B0E0A] text-white font-bold text-sm hover:bg-black flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" /> Agregar
                        </button>
                      ) : (
                        <div className="flex-1 flex items-center justify-between h-10 rounded-full bg-[#2B0E0A] text-white px-1">
                          <button
                            onClick={() => updateQty(p.id, -1)}
                            className="w-9 h-8 rounded-full bg-white/10 grid place-items-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-black text-sm">{inCart} en carrito</span>
                          <button
                            onClick={() => updateQty(p.id, 1)}
                            className="w-9 h-8 rounded-full bg-[#FF8800] text-[#2B0E0A] grid place-items-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <div className="h-10 px-3 rounded-full bg-[#FFF1E6] border border-[#FF8800]/20 text-[#7E1D0F] font-black text-sm grid place-items-center">
                        ${p.price}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Checkout */}
        <div ref={checkoutRef} className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 pb-10">
          <div className="bg-white rounded-[24px] border border-[#7E1D0F]/10 p-5 sm:p-7">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#7E1D0F] text-white grid place-items-center">
                <Truck className="w-4 h-4" />
              </div>
              <h3 className="display font-black text-[20px]">Checkout Express</h3>
              <span className="ml-auto text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
                1 archivo • sin iframes
              </span>
            </div>
            <div className="mt-6">
              <div className="text-[11px] font-black tracking-widest text-[#7E1D0F]/50">
                TU PEDIDO
              </div>
              {cart.length === 0 ? (
                <div className="mt-3 rounded-[16px] bg-[#FFF9F3] border border-dashed border-[#7E1D0F]/20 p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-white border border-[#7E1D0F]/10 grid place-items-center">
                    <ShoppingBag className="w-5 h-5 text-[#7E1D0F]/40" />
                  </div>
                  <div className="mt-3 font-bold text-sm">Tu carrito está vacío</div>
                  <div className="text-xs text-[#7E1D0F]/60 mt-1">
                    Agrega una carne arriba para ver el checkout dinámico
                  </div>
                </div>
              ) : (
                <div className="mt-3 divide-y divide-[#7E1D0F]/10 rounded-[16px] border border-[#7E1D0F]/10 overflow-hidden">
                  {cart.map((item) => {
                    const pr = PRODUCTS.find((p) => p.id === item.id);
                    return (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-white">
                        <img
                          src={pr.image}
                          className="w-12 h-12 rounded-[10px] object-cover"
                          alt={pr.name}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm truncate">
                            {pr.name}{' '}
                            <span className="font-normal text-[#7E1D0F]/60">• {pr.weight}</span>
                          </div>
                          <div className="text-xs text-[#7E1D0F]/60">${pr.price} c/u</div>
                        </div>
                        <div className="flex items-center gap-1 bg-[#FFF9F3] border border-[#7E1D0F]/10 rounded-full p-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 rounded-full bg-white border border-[#7E1D0F]/10 grid place-items-center"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-black text-sm">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 rounded-full bg-[#2B0E0A] text-white grid place-items-center"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="w-[64px] text-right font-black text-sm">
                          ${pr.price * item.qty}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 rounded-full bg-[#7E1D0F]/5 grid place-items-center"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                  <div className="p-3 bg-[#FFF9F3] flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest text-[#7E1D0F]/60">
                      TOTAL
                    </span>
                    <span className="display font-black text-[20px]">${total} MXN</span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[11px] font-black tracking-widest text-[#7E1D0F]/60">
                  NOMBRE
                </span>
                <input
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Ej. Carlos Caucel"
                  className="mt-1 w-full h-11 px-4 rounded-full bg-[#FFF9F3] border border-[#7E1D0F]/10 focus:outline-none focus:ring-2 focus:ring-[#FF8800]/30 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-black tracking-widest text-[#7E1D0F]/60">
                  TEL / WHATSAPP
                </span>
                <input
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="999 ..."
                  className="mt-1 w-full h-11 px-4 rounded-full bg-[#FFF9F3] border border-[#7E1D0F]/10 focus:outline-none focus:ring-2 focus:ring-[#FF8800]/30 text-sm"
                />
              </label>
              <label className="sm:col-span-2 block">
                <span className="text-[11px] font-black tracking-widest text-[#7E1D0F]/60">
                  DIRECCIÓN EN CAUCEL
                </span>
                <input
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Calle, cruzamientos, referencia"
                  className="mt-1 w-full h-11 px-4 rounded-full bg-[#FFF9F3] border border-[#7E1D0F]/10 focus:outline-none focus:ring-2 focus:ring-[#FF8800]/30 text-sm"
                />
              </label>
              <label className="sm:col-span-2 block">
                <span className="text-[11px] font-black tracking-widest text-[#7E1D0F]/60">
                  NOTAS (opcional)
                </span>
                <input
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="Sin picante, timbre, etc."
                  className="mt-1 w-full h-11 px-4 rounded-full bg-[#FFF9F3] border border-[#7E1D0F]/10 focus:outline-none focus:ring-2 focus:ring-[#FF8800]/30 text-sm"
                />
              </label>
            </div>
          </div>

          <div className="bg-[#2B0E0A] rounded-[24px] text-white overflow-hidden border border-[#7E1D0F]">
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="display font-black text-[20px]">Paga en segundos</h3>
                <div className="flex items-center gap-1.5 text-[11px] font-bold bg-white/10 border border-white/10 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> PAGOS DIRECTOS
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {[
                  {
                    id: 'transfer',
                    label: 'Transferencia',
                    sub: `CLABE • ${CONFIG.BANK}`,
                    icon: Banknote,
                  },
                  { id: 'card', label: 'Tarjeta', sub: 'BTCPay POS', icon: CreditCard },
                  { id: 'lightning', label: 'Lightning ⚡', sub: 'Blink → USDT', icon: Zap },
                  {
                    id: 'whatsapp',
                    label: 'Efectivo / WA',
                    sub: 'Paga al recibir',
                    icon: MessageCircle,
                  },
                ].map((m) => {
                  const active = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`text-left rounded-[16px] p-3 border transition ${active ? 'bg-[#FF8800] text-[#2B0E0A] border-[#FF8800]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                      <div className="flex items-center gap-2">
                        <m.icon
                          className={`w-4 h-4 ${active ? 'text-[#2B0E0A]' : 'text-[#FF8800]'}`}
                        />
                        <span className="font-black text-[13px] leading-none">{m.label}</span>
                      </div>
                      <div
                        className={`text-[11px] mt-1 font-semibold ${active ? 'text-[#2B0E0A]/70' : 'text-white/60'}`}
                      >
                        {m.sub}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-[18px] bg-white text-[#2B0E0A] p-4 sm:p-5">
                {paymentMethod === 'transfer' && (
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#2B0E0A] text-white grid place-items-center">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-black text-sm">Transferencia CLABE</div>
                        <div className="text-xs text-[#7E1D0F]/60 -mt-0.5">
                          {CONFIG.BANK} • {CONFIG.CLABE_HOLDER}
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-[10px] font-black tracking-widest text-[#7E1D0F]/50">
                          TOTAL A TRANSFERIR
                        </div>
                        <div className="font-black text-[18px]">${total || 0} MXN</div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 bg-[#FFF9F3] border border-[#7E1D0F]/10 rounded-full px-3 h-12">
                      <span className="text-[11px] font-black tracking-widest text-[#7E1D0F]/50">
                        CLABE
                      </span>
                      <span className="flex-1 font-mono font-bold tracking-wider text-[13px] truncate">
                        {CONFIG.CLABE}
                      </span>
                      <button
                        onClick={copyClabe}
                        className="h-8 px-3 rounded-full bg-[#2B0E0A] text-white font-bold text-xs inline-flex items-center gap-1.5"
                      >
                        {copiedClabe ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}{' '}
                        {copiedClabe ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>
                    <div className="mt-3 text-[11px] leading-4 text-[#5A2A22] bg-[#FFF1E6] border border-[#FF8800]/20 rounded-[12px] p-3">
                      1) Copia CLABE. 2) Transfiere <b>${total || 0}</b> exactos. 3) En WhatsApp
                      manda comprobante + dirección. Entrega &lt;90min Caucel.
                    </div>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener"
                      className={`mt-4 w-full h-12 rounded-full font-black text-sm flex items-center justify-center gap-2 ${total === 0 ? 'bg-zinc-200 text-zinc-400 pointer-events-none' : 'bg-[#25D366] text-white'}`}
                    >
                      <MessageCircle className="w-4 h-4" /> Enviar comprobante por WhatsApp
                    </a>
                  </div>
                )}
                {paymentMethod === 'card' && (
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#FF8800] text-[#2B0E0A] grid place-items-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-black text-sm">Tarjeta vía BTCPay</div>
                        <div className="text-xs text-[#7E1D0F]/60 -mt-0.5">
                          POS seguro • Clip / Stripe backend
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-[10px] font-black tracking-widest text-[#7E1D0F]/50">
                          TOTAL
                        </div>
                        <div className="font-black text-[18px]">${total || 0}</div>
                      </div>
                    </div>
                    <div className="mt-4 rounded-[12px] bg-[#FFF9F3] border border-[#7E1D0F]/10 p-3 text-[11px] leading-4 text-[#5A2A22]">
                      Se abre tu POS de BTCPay en nueva pestaña con el monto{' '}
                      <b>${total || 0} MXN</b> precargado. Pago con tarjeta, Apple Pay, etc. No
                      guardamos datos de tarjeta.
                    </div>
                    <button
                      onClick={() =>
                        window.open(
                          `${CONFIG.BTCPAY_POS_URL}?amount=${total}&currency=MXN`,
                          '_blank',
                        )
                      }
                      disabled={total === 0}
                      className="mt-4 w-full h-12 rounded-full bg-[#7E1D0F] text-white font-black text-sm disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" /> Pagar ${total || 0} con Tarjeta
                    </button>
                    <div className="mt-2 text-[10px] text-center text-[#7E1D0F]/50 font-semibold">
                      Abre {CONFIG.BTCPAY_POS_URL}?amount={total}
                    </div>
                  </div>
                )}
                {paymentMethod === 'lightning' && (
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#2B0E0A] text-[#FFD60A] grid place-items-center">
                        <Zap className="w-4 h-4 fill-[#FFD60A]" />
                      </div>
                      <div>
                        <div className="font-black text-sm">Pagar con Lightning ⚡ - Blink</div>
                        <div className="text-xs text-[#7E1D0F]/60 -mt-0.5">
                          Te cae en USDT Solana Phantom
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-[10px] font-black tracking-widest text-[#7E1D0F]/50">
                          ~SATS
                        </div>
                        <div className="font-black text-[18px]">
                          {Math.round((total || 0) * CONFIG.SATS_RATE * 100).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-[96px_1fr] gap-3 items-center bg-[#FFF9F3] border border-[#7E1D0F]/10 rounded-[16px] p-3">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`lightning:${CONFIG.LIGHTNING_ADDRESS}?amount=${Math.round((total || 0) * CONFIG.SATS_RATE * 100)}`)}`}
                        alt="QR Lightning"
                        className="w-[96px] h-[96px] rounded-[10px] bg-white border border-black/5"
                      />
                      <div>
                        <div className="text-[11px] font-black tracking-widest text-[#7E1D0F]/60">
                          LIGHTNING ADDRESS
                        </div>
                        <div className="font-mono font-bold text-[12px] mt-1 break-all">
                          {CONFIG.LIGHTNING_ADDRESS}
                        </div>
                        <div className="text-[11px] text-[#5A2A22] mt-1 leading-4">
                          Monto: <b>${total || 0} MXN</b> (~
                          {Math.round((total || 0) * CONFIG.SATS_RATE * 100)} sats). En Blink pon “$
                          {DEMO.brand.name} ${total}”.
                        </div>
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={copyLightning}
                            className="h-8 px-3 rounded-full bg-[#2B0E0A] text-white text-xs font-bold inline-flex items-center gap-1.5"
                          >
                            {copiedLightning ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}{' '}
                            {copiedLightning ? 'Copiado' : 'Copiar datos'}
                          </button>
                          <button
                            onClick={() => window.open('https://blink.sv', '_blank')}
                            className="h-8 px-3 rounded-full bg-[#FFD60A] text-[#2B0E0A] text-xs font-black"
                          >
                            Abrir Blink
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-[11px] leading-4 text-[#5A2A22] bg-[#FFFBEB] border border-[#FFD60A]/40 rounded-[12px] p-3">
                      Flujo Sherman: Cliente paga LN → Blink → auto-convierte a <b>USDT Solana</b> →
                      cae a tu Phantom. 0 comisiones bancarias. Confirmación instantánea.
                    </div>
                  </div>
                )}
                {paymentMethod === 'whatsapp' && (
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#25D366] text-white grid place-items-center">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-black text-sm">Efectivo / WhatsApp</div>
                        <div className="text-xs text-[#7E1D0F]/60 -mt-0.5">
                          Paga al recibir • Caucel
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-[10px] font-black tracking-widest text-[#7E1D0F]/50">
                          TOTAL
                        </div>
                        <div className="font-black text-[18px]">${total || 0}</div>
                      </div>
                    </div>
                    <div className="mt-4 rounded-[12px] bg-[#FFF9F3] border border-[#7E1D0F]/10 p-3">
                      <div className="text-[11px] font-black tracking-widest text-[#7E1D0F]/60">
                        RESUMEN PARA WHATSAPP
                      </div>
                      <div className="mt-2 text-[12px] leading-5 font-mono bg-white border border-[#7E1D0F]/10 rounded-[10px] p-3 whitespace-pre-wrap">{`Hola Temozonia, quiero:\n${
                        cart.length
                          ? cart
                              .map((c) => {
                                const pr = PRODUCTS.find((p) => p.id === c.id);
                                return `• ${c.qty}x ${pr.name} ${pr.weight} $${pr.price * c.qty}`;
                              })
                              .join('\n')
                          : '• (carrito vacío)'
                      }\nTotal $${total} MXN\nPago: ${paymentMethod}\nNombre: ${customer.name || '(agregar)'}\nDirección: ${customer.address || '(agregar)'}`}</div>
                    </div>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener"
                      className={`mt-4 w-full h-12 rounded-full font-black text-sm flex items-center justify-center gap-2 ${total === 0 ? 'bg-zinc-200 text-zinc-400 pointer-events-none' : 'bg-[#2B0E0A] text-white'}`}
                    >
                      <MessageCircle className="w-4 h-4" /> Pedir por WhatsApp •{' '}
                      {CONFIG.WHATSAPP_DISPLAY}
                    </a>
                    <div className="mt-2 text-[10px] text-center text-[#7E1D0F]/50">
                      Se arma el mensaje wa.me/{CONFIG.WHATSAPP} con tu pedido + dirección
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-white/60">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  Checkout Express v2 • Sin iframes de 680px • Todo en 1 HTML • Cloudflare Pages
                  ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-[#2B0E0A]/60 backdrop-blur-[2px]"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[92%] sm:w-[420px] bg-[#FFF9F3] shadow-[-20px_0_60px_rgba(0,0,0,0.25)] flex flex-col">
            <div className="h-[64px] px-5 flex items-center justify-between border-b border-[#7E1D0F]/10">
              <div className="flex items-center gap-2 font-black">
                <ShoppingBag className="w-5 h-5" /> Carrito • {totalItems} items
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-[#2B0E0A] text-white grid place-items-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="mt-10 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#7E1D0F]/10 grid place-items-center">
                    <Flame className="w-7 h-7 text-[#FF8800]" />
                  </div>
                  <div className="mt-4 font-black">Aún no hay humo</div>
                  <div className="text-sm text-[#7E1D0F]/60 mt-1">
                    Agrega tu primer kilo y te lo llevamos en &lt;90min
                  </div>
                </div>
              ) : (
                cart.map((c) => {
                  const pr = PRODUCTS.find((p) => p.id === c.id);
                  return (
                    <div
                      key={c.id}
                      className="flex gap-3 bg-white border border-[#7E1D0F]/10 rounded-[16px] p-3"
                    >
                      <img
                        src={pr.image}
                        className="w-16 h-16 rounded-[12px] object-cover"
                        alt={pr.name}
                      />
                      <div className="flex-1">
                        <div className="font-bold text-sm">{pr.name}</div>
                        <div className="text-xs text-[#7E1D0F]/60">
                          {pr.weight} • ${pr.price}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => updateQty(c.id, -1)}
                            className="w-7 h-7 rounded-full bg-[#FFF9F3] border border-[#7E1D0F]/10 grid place-items-center"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-black text-sm w-5 text-center">{c.qty}</span>
                          <button
                            onClick={() => updateQty(c.id, 1)}
                            className="w-7 h-7 rounded-full bg-[#2B0E0A] text-white grid place-items-center"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <span className="ml-auto font-black text-sm">${pr.price * c.qty}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="p-4 border-t border-[#7E1D0F]/10 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-widest text-[#7E1D0F]/60">TOTAL</span>
                <span className="display font-black text-[22px]">${total} MXN</span>
              </div>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  scrollToCheckout();
                }}
                disabled={total === 0}
                className="mt-3 w-full h-12 rounded-full bg-[#FF8800] text-[#2B0E0A] font-black text-sm disabled:opacity-40"
              >
                Pagar Ahora • ${total}
              </button>
              <div className="mt-2 text-[10px] text-center text-[#7E1D0F]/50">
                4 pagos • Entrega Caucel • Sin apps
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky mobile */}
      {total > 0 && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 p-3 pointer-events-none">
          <div className="max-w-[1160px] mx-auto pointer-events-auto bg-[#2B0E0A] text-white rounded-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-white/10 flex items-center gap-3 p-2 pl-4">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-black tracking-widest text-white/60">
                TOTAL • {totalItems} ITEMS
              </div>
              <div className="font-black text-[18px] leading-none">${total} MXN</div>
            </div>
            <button
              onClick={() => setDrawerOpen(true)}
              className="h-10 px-4 rounded-full bg-white/10 border border-white/15 font-bold text-xs"
            >
              Ver carrito
            </button>
            <button
              onClick={scrollToCheckout}
              className="h-11 px-5 rounded-full bg-[#FF8800] text-[#2B0E0A] font-black text-sm"
            >
              Pagar Ahora
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
