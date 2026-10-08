import React, { useMemo, useRef, useState } from 'react';
import {
  Banknote,
  CreditCard,
  Leaf,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  X,
  Zap,
} from 'lucide-react';

const CONFIG = {
  btcpayUrl: 'https://btcpay-c092a-u74190.vm.elestio.app/apps/3qVr5BTaB7uCnpgCUfGaY5JjF3er/pos',
  clabe: '012180012345678901',
  clabeDisplay: '012 180 0123 4567 8901',
  bank: 'BBVA',
  whatsapp: '50379461234',
  whatsappDisplay: '+503 7946 1234',
  location: 'Ciudad Arce, Santa Ana',
  satsRate: 52,
  demoMode: true,
};

const PRODUCTS = [
  {
    id: 'limones',
    name: '500 Limones Criollos',
    subtitle: 'Acidez solar del volcán',
    description: '500 piezas limón persa y criollo, finca regenerativa. Jugo brutal, cáscara viva.',
    price: 280,
    sats: 14500,
    unit: 'costal 500pz',
    badge: 'COSECHA DEL DÍA',
    image:
      'https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=800&auto=format&fit=crop',
    harvest: true,
    emoji: '🍋',
    stock: 8,
  },
  {
    id: 'guayaba',
    name: 'Guayaba Taiwanesa',
    subtitle: 'Crujiente como manzana',
    description: 'Pulpa blanca sin acidez, se come con cáscara. Injerto taiwanés adaptado.',
    price: 120,
    sats: 6200,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=800&auto=format&fit=crop',
    harvest: true,
    emoji: '🍐',
    stock: 5,
  },
  {
    id: 'yaca',
    name: 'Yaca / Jackfruit',
    subtitle: 'Carne del bosque',
    description: 'Jackfruit maduro 8-12kg. Pulpa para curry o helado, dulce a mango-piña.',
    price: 350,
    sats: 18100,
    unit: 'pieza',
    badge: 'COSECHA DEL DÍA',
    image:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop',
    emoji: '🍈',
    stock: 7,
  },
  {
    id: 'mango',
    name: 'Mango Panadés',
    subtitle: 'Miel de la tarde',
    description: 'Mango hilacha corta, maduración en árbol. Caja 10kg cosechada hoy.',
    price: 220,
    sats: 11400,
    unit: 'caja 10kg',
    image:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop',
    emoji: '🥭',
    stock: 4,
  },
  {
    id: 'curcuma',
    name: 'Cúrcuma Viva',
    subtitle: 'Raíz solar + pimienta',
    description: 'Rizoma fresco, curcumina 5%, con brotes activos. No polvo.',
    price: 90,
    sats: 4700,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?q=80&w=800&auto=format&fit=crop',
    emoji: '🫚',
    stock: 6,
  },
  {
    id: 'huisquil',
    name: 'Huisquil / Chayote',
    subtitle: 'Agua del subsuelo',
    description: 'Güisquil espinoso orgánico, tierno para caldo de milpa.',
    price: 65,
    sats: 3400,
    unit: 'red 5kg',
    image:
      'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?q=80&w=800&auto=format&fit=crop',
    emoji: '🥒',
    stock: 9,
  },
];

const PAYMENT_METHODS = [
  { id: 'lightning', label: 'Bitcoin / LN', detail: '0% comisión', icon: Zap, status: 'EN LÍNEA' },
  { id: 'card', label: 'Tarjeta', detail: 'BTCPay', icon: CreditCard, status: 'ACEPTADA' },
  { id: 'transfer', label: 'Transferencia', detail: 'SPEI', icon: Banknote, status: 'SPEI' },
  { id: 'whatsapp', label: 'Efectivo', detail: 'Al recoger', icon: MapPin, status: 'ACEPTADO' },
];

export default function TomatoApp() {
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('lightning');
  const [copiedClabe, setCopiedClabe] = useState(false);
  const [customer, setCustomer] = useState({ name: '', address: '', phone: '' });
  const checkoutRef = useRef(null);
  const rainDrops = useMemo(
    () =>
      Array.from({ length: 28 }, (_, id) => ({
        id,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 3 + Math.random() * 4,
        height: 18 + Math.random() * 26,
      })),
    [],
  );

  const total = cart.reduce((sum, item) => {
    const product = PRODUCTS.find((entry) => entry.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalSats = Math.round(total * CONFIG.satsRate);

  const addToCart = (id, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return current.map((item) =>
          item.id === id ? { ...item, qty: item.qty + quantity } : item,
        );
      }
      return [...current, { id, qty: quantity }];
    });
    setDrawerOpen(true);
  };

  const updateQuantity = (id, change) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + change) } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const copyClabe = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.clabe);
      setCopiedClabe(true);
      window.setTimeout(() => setCopiedClabe(false), 2000);
    } catch (error) {
      console.error('No se pudo copiar la CLABE:', error);
    }
  };

  const getWhatsAppLink = () => {
    const items = cart
      .map((item) => {
        const product = PRODUCTS.find((entry) => entry.id === item.id);
        return product
          ? `• ${item.qty}x ${product.name} (${product.unit}) $${product.price * item.qty}`
          : '';
      })
      .filter(Boolean)
      .join('\n');
    const message = [
      'Hola 🍅⚡ quiero pedido Tomato for Bitcoin:',
      items,
      '',
      `Total $${total} MXN`,
      `Pago: ${paymentMethod}`,
      `Nombre: ${customer.name || '(por confirmar)'}`,
      `Dir: ${customer.address}`,
      `Tel: ${customer.phone}`,
    ].join('\n');
    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  const scrollToProducts = () =>
    document.getElementById('tomato-prods')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToCheckout = () =>
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="relative w-full overflow-hidden rounded-[24px] border border-[#1A3C34]/15 bg-[#FFFCF5] font-sans text-[#1A1A0E] shadow-[0_20px_60px_rgba(26,60,52,0.12)]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@600&display=swap');
        .tomato-display { font-family: 'Space Grotesk', sans-serif; }
        .tomato-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes tomato-rain { 0% { transform: translateY(-20vh); opacity: 0; } 10%, 90% { opacity: .9; } 100% { transform: translateY(120vh); opacity: 0; } }
        @keyframes tomato-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      `}</style>

      {CONFIG.demoMode && (
        <div className="bg-[#1A1A0E] py-2 text-center text-[10px] font-black tracking-[0.2em] text-[#F2C94C]">
          DEMO • TOMATO FOR BITCOIN • COSECHA DEL DÍA • DATOS FICTICIOS
        </div>
      )}

      <header className="relative overflow-hidden bg-gradient-to-br from-[#E94C2A] via-[#FF6B3D] to-[#1A3C34] text-center text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {rainDrops.map((drop) => (
            <span
              key={drop.id}
              className="absolute top-[-10%] w-[2px] rounded-full bg-gradient-to-b from-transparent to-white/70"
              style={{
                left: `${drop.left}%`,
                height: `${drop.height}px`,
                animation: `tomato-rain ${drop.duration}s linear ${drop.delay}s infinite`,
              }}
            />
          ))}
        </div>
        <div className="relative mx-auto max-w-[1160px] px-5 py-12 sm:py-16">
          <div
            className="mx-auto grid h-[84px] w-[84px] place-items-center rounded-[22px] border border-white/80 bg-white text-[42px] shadow-[0_14px_32px_rgba(0,0,0,0.28)]"
            style={{ animation: 'tomato-float 3.2s ease-in-out infinite' }}
            aria-hidden="true"
          >
            🍅
          </div>
          <h1 className="tomato-display mt-5 text-[32px] font-bold leading-[0.95] text-white sm:text-[52px]">
            Cosecha viva,
            <br />
            paga en <span className="text-[#F2C94C]">sats</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-6 text-white/95">
            500 limones, guayaba taiwanesa, yaca y raíces de milpa. Sin intermediarios. Finca
            regenerativa → tu mesa en {CONFIG.location}.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={scrollToProducts}
              className="h-12 rounded-full bg-white px-7 text-sm font-black text-[#E94C2A] shadow-xl"
            >
              VER COSECHA HOY 🍋
            </button>
            <button
              type="button"
              onClick={scrollToCheckout}
              className="h-12 rounded-full bg-[#F2C94C] px-5 text-sm font-bold text-[#1A1A0E]"
            >
              ⚡ Pagar en BTC
            </button>
          </div>
        </div>
      </header>

      <section id="tomato-prods" className="mx-auto max-w-[1040px] px-4 py-8">
        <div className="mb-6 flex items-center gap-2 text-sm font-bold text-[#1A3C34]">
          <Leaf className="h-4 w-4" />
          Cosecha de hoy · directo de productores
        </div>
        <div className="flex flex-col gap-7">
          {PRODUCTS.map((product) => {
            const inCart = cart.find((item) => item.id === product.id)?.qty ?? 0;
            return (
              <article
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-[20px] border-[1.5px] border-[#D4AF37] bg-white shadow-[0_10px_30px_rgba(26,26,14,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(26,26,14,0.14)] sm:flex-row"
              >
                <div className="pointer-events-none absolute inset-[7px] z-10 rounded-[14px] border border-dashed border-[#D4AF37]/60 opacity-60" />
                <div className="relative grid min-h-[260px] overflow-hidden bg-[#FFF8EB] sm:w-[44%]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
                  <span className="relative z-10 self-center text-center text-[84px] drop-shadow-xl">
                    {product.emoji}
                  </span>
                  {product.badge && (
                    <span className="absolute left-0 top-4 z-10 rounded-r-full bg-[#F2C94C] px-3 py-1.5 text-[10px] font-black tracking-wide text-[#1A1A0E] shadow">
                      🌱 {product.badge}
                    </span>
                  )}
                  <span className="absolute right-3 top-3 z-10 rounded-full bg-[#F7931A] px-2.5 py-1 text-[10px] font-black text-white shadow">
                    ⚡ BTC
                  </span>
                </div>
                <div className="relative z-10 flex flex-1 flex-col justify-center bg-white p-6 sm:p-7">
                  <h2 className="tomato-display text-[22px] font-bold leading-tight">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-[14px] font-semibold text-[#E94C2A]">
                    {product.subtitle}
                  </p>
                  <p className="mt-3 text-[13px] leading-6 text-[#6B5E4F]">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-[14px] border border-[#1A1A0E]/10 bg-[#FFF8EB] p-3">
                    <div>
                      <div className="tomato-display text-[20px] font-bold">
                        ${product.price} MXN
                      </div>
                      <div className="tomato-mono text-[12px] font-bold text-[#E94C2A]">
                        {product.sats?.toLocaleString() ??
                          Math.round(product.price * CONFIG.satsRate).toLocaleString()}{' '}
                        sats
                      </div>
                    </div>
                    <div className="text-right text-[11px] font-bold uppercase tracking-widest text-[#6B5E4F]">
                      {product.unit}
                      <div className="mt-1 normal-case tracking-normal">
                        Quedan {product.stock} hoy · cosecha 5am
                      </div>
                    </div>
                  </div>
                  {inCart === 0 ? (
                    <button
                      type="button"
                      onClick={() => addToCart(product.id)}
                      className="mt-4 h-11 w-full rounded-full bg-gradient-to-r from-[#E94C2A] to-[#CC3A1B] text-sm font-bold text-white shadow"
                    >
                      ⚡ Pagar / Pedir ahora
                    </button>
                  ) : (
                    <div className="mt-4 flex h-11 w-full items-center justify-between rounded-full bg-[#1A1A0E] px-1 text-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, -1)}
                        aria-label={`Quitar una unidad de ${product.name}`}
                        className="grid h-9 w-9 place-items-center rounded-full bg-white/10"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-black">{inCart} en canasta</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, 1)}
                        aria-label={`Agregar una unidad de ${product.name}`}
                        className="grid h-9 w-9 place-items-center rounded-full bg-[#F2C94C] text-black"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        ref={checkoutRef}
        className="mx-auto grid max-w-[1160px] gap-6 px-4 pb-10 lg:grid-cols-[1.4fr_0.9fr]"
      >
        <div className="overflow-hidden rounded-[22px] border-[1.5px] border-[#D4AF37] bg-white shadow-[0_20px_50px_rgba(26,26,14,0.12)]">
          <div className="flex h-12 items-center justify-between bg-[#1A3C34] px-4 text-[13px] font-semibold text-[#F5F0E6]">
            <span>⚡ Checkout Seguro (BTC / Tarjeta)</span>
            <a
              href={CONFIG.btcpayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#F2C94C]"
            >
              Abrir ↗
            </a>
          </div>
          <div className="bg-white">
            <iframe
              src={CONFIG.btcpayUrl}
              title="Checkout de demostración Tomato for Bitcoin"
              className="block h-[680px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-[16px] border-[1.8px] border-dashed border-[#E94C2A] bg-white p-4 text-center">
            <div className="text-[10px] font-bold tracking-widest text-[#6B5E4F]">
              TRANSFERENCIA BANCARIA (CLABE)
            </div>
            <div className="tomato-mono mt-2 break-all text-[16px] font-bold tracking-wide">
              {CONFIG.clabeDisplay}
            </div>
            <div className="mt-1 text-[11px] text-[#6B5E4F]">
              {CONFIG.bank} • {CONFIG.location}
            </div>
            <button
              type="button"
              onClick={copyClabe}
              className={`mt-3 h-9 rounded-[10px] px-4 text-[12px] font-bold ${
                copiedClabe ? 'bg-emerald-600 text-white' : 'bg-[#1A3C34] text-[#F2C94C]'
              }`}
            >
              {copiedClabe ? '✓ ¡Copiado!' : '📋 Copiar CLABE'}
            </button>
            <div className="mt-3 flex items-center justify-between text-xs font-bold">
              <span className="text-[10px] tracking-widest text-[#6B5E4F]">TOTAL</span>
              <span className="tomato-display text-[18px]">${total} MXN</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {PAYMENT_METHODS.map((method) => {
              const active = paymentMethod === method.id;
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`rounded-[16px] border p-3 text-left transition ${
                    active
                      ? 'border-[#1A1A0E] bg-[#1A1A0E] text-white'
                      : 'border-[#1A1A0E]/10 bg-white hover:bg-[#FFF8EB]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${active ? 'text-[#F2C94C]' : 'text-[#E94C2A]'}`} />
                    <span className="text-[12px] font-bold">{method.label}</span>
                  </div>
                  <div
                    className={`mt-1 text-[11px] ${active ? 'text-white/60' : 'text-[#6B5E4F]'}`}
                  >
                    {method.detail}
                  </div>
                  {active && (
                    <div className="mt-2 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black text-emerald-300">
                      {method.status}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="rounded-[14px] border border-[#1A3C34]/20 bg-gradient-to-br from-[#1A3C34]/10 to-[#F2C94C]/20 p-3 text-center text-[12px] leading-5">
            <b>🔔 Notificación inmediata:</b> Al pagar, envíanos comprobante por WhatsApp y
            coordinamos entrega en Santa Ana. Cosecha del día, no del refri.
          </div>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={total === 0}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-black ${
              total === 0
                ? 'pointer-events-none bg-zinc-200 text-zinc-400'
                : 'bg-[#25D366] text-white'
            }`}
          >
            <MessageCircle className="h-4 w-4" /> Pedir por WhatsApp • {CONFIG.whatsappDisplay}
          </a>
          <div className="tomato-mono text-center text-[10px] text-[#6B5E4F]">
            #CosechaEnSats • #MilpaDescentralizada
          </div>

          {cart.length > 0 && (
            <div className="rounded-[14px] border border-[#1A1A0E]/10 bg-[#FFF8EB] p-3">
              <div className="text-[10px] font-black tracking-widest text-[#6B5E4F]">
                CANASTA • {totalItems} items
              </div>
              <div className="mt-2 space-y-1.5">
                {cart.map((item) => {
                  const product = PRODUCTS.find((entry) => entry.id === item.id);
                  if (!product) return null;
                  return (
                    <div key={item.id} className="flex justify-between text-[12px]">
                      <span>
                        {item.qty}x {product.name}
                      </span>
                      <span className="font-bold">${product.price * item.qty}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between border-t border-[#1A1A0E]/10 pt-2 font-black">
                <span>Total</span>
                <span>
                  ${total} MXN / {totalSats.toLocaleString()} sats
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Cerrar canasta"
            className="absolute inset-0 h-full w-full bg-[#1A1A0E]/60 backdrop-blur-[2px]"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-[92%] flex-col bg-[#FFFCF5] shadow-[-20px_0_60px_rgba(0,0,0,0.3)] sm:w-[420px]">
            <div className="flex h-[64px] items-center justify-between border-b border-[#1A1A0E]/10 px-5">
              <div className="flex items-center gap-2 font-black">
                <ShoppingBag className="h-5 w-5" /> Canasta • {totalItems}
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar"
                className="grid h-9 w-9 place-items-center rounded-full bg-[#1A1A0E] text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="mt-10 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border bg-white text-[28px]">
                    🍅
                  </div>
                  <div className="mt-4 font-black">Aún no hay cosecha</div>
                  <div className="mt-1 text-sm text-[#6B5E4F]">Agrega limones, guayaba o yaca</div>
                </div>
              ) : (
                cart.map((item) => {
                  const product = PRODUCTS.find((entry) => entry.id === item.id);
                  if (!product) return null;
                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-[16px] border border-[#1A1A0E]/10 bg-white p-3"
                    >
                      <img
                        src={product.image}
                        className="h-16 w-16 rounded-[12px] object-cover"
                        alt={product.name}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-bold">{product.name}</div>
                        <div className="text-xs text-[#6B5E4F]">
                          {product.unit} • {product.sats?.toLocaleString() ?? 0} sats
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Quitar una unidad de ${product.name}`}
                            className="grid h-7 w-7 place-items-center rounded-full border bg-[#FFF8EB]"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm font-black">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Agregar una unidad de ${product.name}`}
                            className="grid h-7 w-7 place-items-center rounded-full bg-[#1A1A0E] text-white"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <span className="ml-auto text-sm font-black">
                            ${product.price * item.qty}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="border-t bg-white p-4">
              <div className="flex justify-between">
                <span className="text-xs font-black tracking-widest text-[#6B5E4F]">TOTAL</span>
                <span className="tomato-display text-[20px] font-black">${total} MXN</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  scrollToCheckout();
                }}
                className="mt-3 h-12 w-full rounded-full bg-[#F2C94C] text-sm font-black text-[#1A1A0E]"
              >
                Pagar Ahora • {totalSats.toLocaleString()} sats
              </button>
            </div>
          </aside>
        </div>
      )}

      <footer className="bg-[#1A3C34] py-6 text-center text-[11px] text-[#EDE6D6]">
        <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-[12px] bg-gradient-to-br from-[#E94C2A] to-[#F2C94C] text-[20px]">
          🍅⚡
        </div>
        Tomato for Bitcoin • Tianguis Descentralizado • {CONFIG.location} • 100% sin intermediarios
      </footer>
    </div>
  );
}
