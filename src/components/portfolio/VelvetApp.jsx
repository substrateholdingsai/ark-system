import React, { useRef } from 'react';

const CONFIG = {
  BAR_NAME: 'VELVET ROOM • DEMO',
  BAR_SHORT: 'VELVET ROOM',
  ADDRESS: 'Ubicación ficticia • Centro, Mérida',
};

const MENU = [
  {
    name: 'Spiced Rum Old Fashioned',
    desc: 'Ron especiado de Yucatán, angostura ahumada, piel de naranja quemada. Servido en roca grande.',
    price: '180',
    accent: 'RON • AHUMADO',
  },
  {
    name: 'Hibiscus Negroni',
    desc: 'Ginebra local, Campari infusionado con jamaica, vermouth rosso. Amargo y floral.',
    price: '165',
    accent: 'JAMAICA • AMARGO',
  },
  {
    name: 'Yucatán Margarita',
    desc: 'Tequila blanco, miel de xtabentún, lima yucateca, sal de gusano. Nuestra casa.',
    price: '155',
    accent: 'CASA • CÍTRICO',
  },
  {
    name: 'Cold Brew Espresso Martini',
    desc: 'Vodka, cold brew de Chiapas 24h, licor de café, espuma de vainilla.',
    price: '170',
    accent: 'CAFÉ • NOCHE',
  },
  {
    name: 'Smoky Mezcal Sour',
    desc: 'Mezcal espadín, miel de agave, clara de huevo, bitter de chocolate. Ahumado y sedoso.',
    price: '190',
    accent: 'MEZCAL • AHUMADO',
  },
  {
    name: 'Basil Smash',
    desc: 'Gin, albahaca fresca del huerto, limón, toque de pimienta rosa. Fresco y verde.',
    price: '160',
    accent: 'FRESCA • HERBAL',
  },
];

const BARRA = [
  {
    src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop',
    label: 'La Barra',
    sub: 'Maderas oscuras, luz tenue',
  },
  {
    src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
    label: 'Backbar',
    sub: '120 etiquetas, 1 historia',
  },
  {
    src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
    label: 'El Ritual',
    sub: 'Hielo tallado a mano',
  },
  {
    src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop',
    label: 'Vinyl Nights',
    sub: 'Jueves a domingo',
  },
];

export default function BarApp() {
  const menuRef = useRef(null);
  const scrollToMenu = () => menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToReservation = () =>
    document.getElementById('demo-reservas')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAF7F2] antialiased rounded-[24px] overflow-hidden border border-white/10 selection:bg-[#CCFF00] selection:text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&family=Oswald:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap');
        .font-anton{font-family:'Anton',sans-serif} .font-oswald{font-family:'Oswald',sans-serif}
        .font-inter{font-family:'Inter',sans-serif} .font-space{font-family:'Space Grotesk',monospace}
        .no-scrollbar::-webkit-scrollbar{display:none} .no-scrollbar{scrollbar-width:none;-ms-overflow-style:none}
      `}</style>

      {/* TOP BANNER */}
      <div className="w-full bg-[#CCFF00] text-black text-[11px] font-space font-bold tracking-[0.18em] uppercase py-2.5 px-4 text-center flex items-center justify-center gap-3">
        <span className="hidden sm:inline">
          ● DEMO INTERACTIVA • BAR FICTICIO • SIN RESERVAS NI PAGOS
        </span>
        <span className="sm:hidden">● DEMO • DATOS FICTICIOS • SIN PAGOS</span>
        <span className="bg-black text-[#CCFF00] px-2 py-0.5 rounded text-[10px]">DEMO</span>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0A0A0A]/80 border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#D4AF37] grid place-items-center font-anton text-black text-[14px]">
              A
            </div>
            <span className="font-oswald font-bold tracking-[0.14em] text-[13px] uppercase">
              {CONFIG.BAR_NAME}
            </span>
            <span className="hidden md:inline h-3 w-px bg-white/20 mx-1" />
            <span className="hidden md:inline font-space text-[11px] tracking-widest text-white/40 uppercase">
              Mérida, MX • HORARIO ILUSTRATIVO
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-space text-[11px] tracking-[0.16em] uppercase text-white/60">
            <button onClick={scrollToMenu} className="hover:text-white">
              Carta
            </button>
            <a href="#barra" className="hover:text-white">
              La Barra
            </a>
            <a href="#pago" className="hover:text-white">
              Pago
            </a>
            <button
              type="button"
              onClick={scrollToReservation}
              className="bg-white text-black px-4 py-2 rounded-full hover:bg-[#CCFF00] font-bold"
            >
              Reservas demo
            </button>
          </nav>
          <div className="md:hidden font-space text-[10px] tracking-widest text-white/50 uppercase">
            Abierto Hoy
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[92vh] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1920&auto=format&fit=crop"
            alt="Bar dark moody"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_70%_30%,#D4AF37,transparent_40%)]" />
        </div>
        <div className="relative z-10 w-full mx-auto max-w-[1280px] px-6 md:px-10 pb-16 md:pb-24 pt-24">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-3 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="font-space text-[10px] tracking-[0.2em] uppercase text-white/70">
                Cocktail bar conceptual • Vinilos • Mérida
              </span>
            </div>
            <h1 className="font-anton uppercase leading-[0.85] tracking-[-0.02em]">
              <span className="block text-[18vw] md:text-[12vw] lg:text-[132px] text-[#FAF7F2]">
                {CONFIG.BAR_SHORT.split(' ')[0]}
              </span>
              <span
                className="block text-[18vw] md:text-[12vw] lg:text-[132px] text-transparent"
                style={{ WebkitTextStroke: '1px #D4AF37' }}
              >
                {CONFIG.BAR_SHORT.split(' ')[1]}
              </span>
            </h1>
            <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-6 md:items-end">
              <p className="font-inter text-[15px] md:text-[17px] leading-relaxed text-white/70 max-w-[420px] text-balance">
                Concepto visual de un bar de cócteles en Mérida: hielo tallado, botellas especiales
                y vinilos hasta tarde.
                <span className="text-[#D4AF37]">
                  {' '}
                  Demo de portfolio; no representa un local real.
                </span>
              </p>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={scrollToMenu}
                  className="h-[48px] px-7 rounded-full bg-[#FAF7F2] text-black font-oswald font-bold tracking-[0.12em] uppercase text-[13px] hover:bg-[#CCFF00]"
                >
                  Ver Carta
                </button>
                <button
                  type="button"
                  onClick={scrollToReservation}
                  className="h-[48px] px-7 rounded-full border border-white/20 font-oswald font-bold tracking-[0.12em] uppercase text-[13px] flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" /> Reservas demo
                </button>
              </div>
            </div>
            <div className="mt-10 md:mt-14 grid grid-cols-3 gap-6 border-t border-white/[0.08] pt-6 max-w-[520px]">
              <div>
                <div className="font-space text-[11px] tracking-[0.2em] uppercase text-white/40">
                  Horario
                </div>
                <div className="font-inter text-[13px] mt-1 text-white/80">
                  Mié—Dom • horario demo
                </div>
              </div>
              <div>
                <div className="font-space text-[11px] tracking-[0.2em] uppercase text-white/40">
                  Dirección
                </div>
                <div className="font-inter text-[13px] mt-1 text-white/80">
                  Centro • ubicación ficticia
                </div>
              </div>
              <div>
                <div className="font-space text-[11px] tracking-[0.2em] uppercase text-white/40">
                  Reservas
                </div>
                <div className="font-inter text-[13px] mt-1 text-[#D4AF37]">No disponibles</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-20 right-6 md:right-10 hidden md:flex items-center gap-3 bg-[#1A1A1A] border border-white/10 rounded-full px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-[#CCFF00] grid place-items-center font-space text-black font-bold text-[11px]">
            18+
          </div>
          <div className="font-space text-[11px] tracking-wide uppercase">
            <div className="text-white/50 leading-none">Plantilla</div>
            <div className="text-white font-bold leading-none mt-1">Solo demo</div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section
        ref={menuRef}
        id="menu"
        className="mx-auto max-w-[1280px] px-6 md:px-10 py-16 md:py-28"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="font-space text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] mb-3">
              / Carta de muestra — 6 cócteles conceptuales
            </div>
            <h2 className="font-oswald font-bold uppercase leading-[0.9] text-[44px] md:text-[72px] tracking-[-0.02em]">
              SIGNATURE
              <br />
              <span className="text-white/20">DRINKS</span>
            </h2>
          </div>
          <div className="font-inter text-[14px] text-white/60 max-w-[360px] leading-relaxed">
            Precios y descripciones ilustrativos. La carta no está disponible para compra en esta
            demo.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.06] border border-white/[0.06] rounded-[20px] overflow-hidden">
          {MENU.map((r) => (
            <div
              key={r.name}
              className="group bg-[#111] p-7 md:p-8 flex flex-col justify-between min-h-[240px] hover:bg-[#1A1A1A] border border-transparent hover:border-[#D4AF37]/30"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-space text-[10px] tracking-[0.2em] uppercase text-white/30 group-hover:text-[#D4AF37]">
                    {r.accent}
                  </span>
                  <span className="font-space font-bold text-[14px] text-[#D4AF37]">
                    ${r.price}
                  </span>
                </div>
                <h3 className="font-oswald font-bold uppercase tracking-[-0.01em] text-[22px] md:text-[24px] leading-[0.95] mt-4 text-[#FAF7F2] group-hover:text-white">
                  {r.name}
                </h3>
                <p className="font-inter text-[13px] leading-relaxed text-white/55 mt-3 max-w-[32ch]">
                  {r.desc}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="h-px w-12 bg-white/10 group-hover:bg-[#D4AF37]/50" />
                <span className="font-space text-[10px] tracking-[0.2em] uppercase text-white/20 group-hover:text-white/40">
                  Hecho a mano
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="font-space text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/[0.06] text-white/50 border border-white/10">
            Sin GSAP
          </span>
          <span className="font-space text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/[0.06] text-white/50 border border-white/10">
            No ScrollTrigger
          </span>
          <span className="font-space text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/20">
            Solo Tailwind + HTML limpio
          </span>
          <span className="font-space text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/[0.06] text-white/50 border border-white/10">
            5% del código, 95% del look
          </span>
        </div>
      </section>

      {/* VIDEO */}
      <section className="relative w-full bg-[#1A1A1A] border-y border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-0 md:px-10 py-0 md:py-10">
          <div className="relative aspect-[16/10] md:aspect-[21/9] md:rounded-[24px] overflow-hidden bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1600&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            >
              <source
                src="https://videos.pexels.com/video-files/3048527/3048527-hd_1920_1080_30fps.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
              <div className="max-w-[720px]">
                <div className="font-space text-[11px] tracking-[0.3em] uppercase text-[#CCFF00] mb-4">
                  — Ambientación visual de demostración
                </div>
                <h3 className="font-anton uppercase text-[38px] md:text-[64px] leading-[0.9] tracking-[-0.01em] text-[#FAF7F2] text-balance">
                  Hecho a mano,
                  <br /> servido con <span className="text-[#D4AF37]">ritmo</span>
                </h3>
                <p className="font-inter text-[14px] md:text-[15px] text-white/60 mt-4 max-w-[48ch] leading-relaxed">
                  Video de ambientación en loop para esta maqueta. Las imágenes y el material
                  audiovisual son ilustrativos y no representan un establecimiento real.
                </p>
              </div>
            </div>
            <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-[#0A0A0A]/80 backdrop-blur rounded-full px-3 py-1.5 border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-space text-[10px] tracking-widest uppercase text-white/70">
                Visual de muestra
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BARRA */}
      <section id="barra" className="mx-auto max-w-[1280px] px-6 md:px-10 py-16 md:py-24">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-oswald font-bold uppercase text-[32px] md:text-[48px] leading-none tracking-[-0.02em]">
            La Barra <span className="text-white/20">— scroll snap, cero JS</span>
          </h2>
          <div className="hidden md:flex font-space text-[11px] tracking-widest uppercase text-white/40 gap-2">
            <span>← Desliza →</span>
            <span className="text-[#CCFF00]">Snap CSS nativo</span>
          </div>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-6 md:scroll-pl-10 pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          {BARRA.map((r, i) => (
            <div key={i} className="snap-start shrink-0 w-[82%] md:w-[380px] group">
              <div className="aspect-[4/3] rounded-[16px] overflow-hidden bg-[#1A1A1A] border border-white/[0.06] relative">
                <img
                  src={r.src}
                  alt={r.label}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div>
                    <div className="font-oswald font-bold uppercase text-[18px] tracking-wide">
                      {r.label}
                    </div>
                    <div className="font-space text-[11px] tracking-widest uppercase text-white/60 mt-1">
                      {r.sub}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur grid place-items-center font-space text-[12px]">
                    0{i + 1}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="snap-start shrink-0 w-[82%] md:w-[380px]">
            <div className="aspect-[4/3] rounded-[16px] bg-[#CCFF00] text-black p-7 flex flex-col justify-between border border-[#CCFF00]">
              <div className="font-space text-[11px] tracking-[0.2em] uppercase">
                En vez de carousel GSAP con drag momentum
              </div>
              <div className="font-anton uppercase text-[32px] leading-[0.9]">
                Scroll-snap
                <br />
                nativo +<br />
                overflow-x-auto
              </div>
              <div className="font-inter text-[13px] leading-relaxed opacity-70">
                Funciona en móvil perfecto, sin librerías, sin hydration, sin 80kb de GSAP.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGO */}
      <section id="pago" className="mx-auto max-w-[1280px] px-6 md:px-10 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[1px] bg-white/[0.06] rounded-[24px] overflow-hidden border border-white/[0.06]">
          <div
            id="demo-reservas"
            className="bg-[#111] p-7 md:p-10 flex flex-col justify-between min-h-[420px]"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#25D366] grid place-items-center text-black font-bold">
                  DEMO
                </div>
                <div>
                  <div className="font-oswald font-bold uppercase tracking-wide text-[16px]">
                    Reservas de muestra
                  </div>
                  <div className="font-space text-[11px] tracking-widest uppercase text-white/40">
                    Contacto y disponibilidad no configurados
                  </div>
                </div>
              </div>
              <h3 className="font-anton uppercase text-[32px] md:text-[44px] leading-[0.9] tracking-[-0.01em]">
                Una experiencia
                <br />
                directa
                <br />
                <span className="text-[#25D366]">sin fricción.</span>
              </h3>
              <div className="mt-6 space-y-3 font-inter text-[14px] text-white/60 leading-relaxed">
                <p>• El flujo de contacto se configuraría con los datos aprobados del local.</p>
                <p>• Esta maqueta no envía solicitudes ni abre servicios externos.</p>
                <p>
                  • Para un lanzamiento, configura un{' '}
                  <span className="font-space text-[#FAF7F2] bg-white/10 px-1.5 py-0.5 rounded">
                    WHATSAPP
                  </span>{' '}
                  verificado.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="button"
                onClick={scrollToMenu}
                className="w-full h-[56px] rounded-full bg-[#25D366] text-black font-oswald font-bold tracking-[0.12em] uppercase text-[14px] flex items-center justify-center gap-2 hover:bg-[#20bd5a]"
              >
                Explorar carta de muestra
              </button>
              <div className="mt-3 text-center font-space text-[10px] tracking-widest uppercase text-white/30">
                {CONFIG.ADDRESS}
              </div>
            </div>
          </div>
          <div className="bg-[#0F0F0F] p-7 md:p-10 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#F7931A] grid place-items-center font-space font-bold text-black text-[14px]">
                $
              </div>
              <div>
                <div className="font-oswald font-bold uppercase tracking-wide text-[16px]">
                  Pagos ilustrativos
                </div>
                <div className="font-space text-[11px] tracking-widest uppercase text-white/40">
                  Sin checkout conectado
                </div>
              </div>
            </div>
            <div className="grid min-h-[160px] place-items-center rounded-[14px] border border-dashed border-[#F7931A]/40 bg-[#F7931A]/[0.06] p-6 text-center">
              <div>
                <div className="font-space font-bold text-[13px] uppercase tracking-wide text-[#F7931A]">
                  Área de pago de demostración
                </div>
                <p className="mt-2 max-w-[40ch] font-inter text-[13px] leading-relaxed text-white/60">
                  No se genera un QR y no se aceptan pagos. En producción, conecta un procesador
                  aprobado y muestra aquí un checkout seguro.
                </p>
              </div>
            </div>
            <div className="mt-8 rounded-[14px] bg-[#1A1A1A] border border-white/10 p-4">
              <div className="font-space text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
                Flujo conceptual
              </div>
              <ol className="font-inter text-[13px] leading-relaxed text-white/60 space-y-1 list-decimal list-inside">
                <li>El cliente consulta la carta.</li>
                <li>El local configura sus métodos de pago.</li>
                <li>El checkout se integra tras validar el proveedor.</li>
              </ol>
            </div>
            <div className="mt-auto pt-8">
              <div className="rounded-full border border-[#F7931A]/30 bg-[#F7931A]/10 px-4 py-2.5 flex items-center justify-between">
                <span className="font-space text-[11px] tracking-widest uppercase text-[#F7931A]">
                  Checkout
                </span>
                <span className="font-space text-[10px] text-white/40">NO CONFIGURADO</span>
              </div>
              <div className="mt-3 h-[120px] rounded-[12px] bg-black border border-white/10 grid place-items-center font-space text-[11px] tracking-widest uppercase text-white/30">
                Sin transacciones • Solo demostración
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] bg-[#0A0A0A]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.8fr_0.8fr] gap-10 md:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D4AF37] grid place-items-center font-anton text-black">
                  A
                </div>
                <div className="font-oswald font-bold tracking-[0.14em] uppercase text-[15px]">
                  {CONFIG.BAR_NAME}
                </div>
              </div>
              <p className="font-inter text-[14px] leading-relaxed text-white/50 mt-4 max-w-[42ch]">
                Demo conceptual de un bar. Nombre, dirección, horarios, carta y precios son
                ilustrativos; no corresponden a un negocio en operación.
                <br />
                <span className="text-[#D4AF37]">No se procesan reservas ni pagos.</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="font-space text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-white/40">
                  #0A0A0A • #D4AF37 • #CCFF00
                </span>
                <span className="font-space text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-white/40">
                  Tailwind only
                </span>
              </div>
            </div>
            <div>
              <div className="font-space text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">
                Horario & ubicación
              </div>
              <div className="font-inter text-[14px] leading-relaxed text-white/70 space-y-2">
                <div>Horario: ilustrativo</div>
                <div className="text-white/40">{CONFIG.ADDRESS}</div>
              </div>
            </div>
            <div>
              <div className="font-space text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">
                Conecta
              </div>
              <div className="flex flex-col gap-3 font-space text-[12px] tracking-wide uppercase text-white/60">
                <span>Redes sociales — no configuradas</span>
                <span>Reservas — deshabilitadas en esta demo</span>
                <span>Pagos — no disponibles</span>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 font-space text-[10px] tracking-widest uppercase text-white/20">
                © Ark System • Velvet Room — demo interactiva
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex gap-3">
        <button
          onClick={scrollToMenu}
          className="flex-1 h-[48px] rounded-full border border-white/15 font-oswald font-bold tracking-[0.12em] uppercase text-[13px] text-white/80"
        >
          Ver Carta
        </button>
        <button
          type="button"
          onClick={scrollToReservation}
          className="flex-[1.3] h-[48px] rounded-full bg-[#CCFF00] text-black font-oswald font-bold tracking-[0.12em] uppercase text-[13px] flex items-center justify-center gap-2"
        >
          Reservas demo
        </button>
      </div>
      <div className="lg:hidden h-[76px]" />
    </div>
  );
}
