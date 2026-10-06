import { useState } from 'react';

// Configuración extraída del artefacto original
const CONFIG = {
  BTCPAY_POS_URL: "https://btcpay.temozonia.com",
  CLABE: "123456789012345678",
  BANK: "BBVA",
  CLABE_HOLDER: "Temozonia Carnes Ahumadas",
  WHATSAPP: "529994918221",
  SATS_RATE: 2.5
};

const PRODUCTS = [
  { id: 'carne', name: 'Carne Ahumada', price: 380, weight: '1kg' },
  { id: 'costilla', name: 'Costilla Ahumada', price: 420, weight: '1kg' },
  { id: 'chorizo', name: 'Chorizo Artesanal', price: 280, weight: '1kg' },
  { id: 'pechuga', name: 'Pechuga Ahumada', price: 350, weight: '1kg' }
];

export default function TemozoniaApp() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('whatsapp');
  const [copied, setCopied] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleCopyClabe = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.CLABE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const getWhatsAppLink = () => {
    const items = cart.map(item => `• ${item.qty}x ${item.name} (${item.weight}) - $${item.price * item.qty}`).join('%0A');
    const text = `Hola Temozonia 🔥%0AQuiero pedir:%0A${items}%0A%0ATotal: $${total} MXN%0APago: ${paymentMethod.toUpperCase()}`;
    return `https://wa.me/${CONFIG.WHATSAPP}?text=${text}`;
  };

  return (
    <div className="w-full bg-[#FFF9F3] border border-[#7E1D0F]/10 rounded-2xl overflow-hidden shadow-xl font-sans text-[#2B0E0A]">
      {/* Header Demo */}
      <div className="bg-[#7E1D0F] p-4 flex justify-between items-center">
        <h3 className="text-white font-black tracking-wider text-sm uppercase">Demo Interactiva • Temozonia</h3>
        <span className="text-white/60 text-xs font-mono">v2.4.0 • Edge Runtime</span>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* Catálogo */}
        <div className="p-6 space-y-3 border-r border-[#7E1D0F]/5">
          <h4 className="font-bold text-lg mb-4 text-[#7E1D0F]">Menú Ahumados</h4>
          {PRODUCTS.map(product => (
            <div key={product.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-[#7E1D0F]/5 hover:border-[#7E1D0F]/20 transition-colors">
              <div>
                <div className="font-bold">{product.name}</div>
                <div className="text-xs text-[#5A2A22]/60">{product.weight} • ${product.price}</div>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="h-8 px-4 bg-[#7E1D0F] text-white text-xs font-bold rounded-full hover:bg-[#5A2A22] active:scale-95 transition-all"
              >
                Agregar
              </button>
            </div>
          ))}
        </div>

        {/* Checkout / Carrito */}
        <div className="p-6 bg-white flex flex-col h-full min-h-[400px]">
          <h4 className="font-bold text-lg mb-4 text-[#7E1D0F]">Tu Pedido ({cart.length})</h4>

          <div className="flex-1 space-y-2 mb-6">
            {cart.length === 0 ? (
              <div className="h-full flex items-center justify-center text-[#5A2A22]/40 text-sm italic border-2 border-dashed border-[#7E1D0F]/10 rounded-xl">
                El carrito está vacío
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex justify-between items-start text-sm p-2 bg-[#FFF9F3] rounded-lg">
                  <div>
                    <span className="font-bold">{item.qty}x</span> {item.name}
                    <div className="text-xs text-[#5A2A22]/60">${item.price * item.qty}</div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500/60 hover:text-red-600 text-xs underline"
                  >
                    Quitar
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Resumen y Pago */}
          <div className="space-y-4 pt-4 border-t border-[#7E1D0F]/10">
            <div className="flex justify-between text-xl font-black text-[#7E1D0F]">
              <span>Total:</span>
              <span>${total} MXN</span>
            </div>

            {/* Selector Método de Pago */}
            <div className="grid grid-cols-3 gap-2">
              {['whatsapp', 'clabe', 'lightning'].map(method => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`text-[10px] font-bold uppercase py-2 rounded-lg border transition-all ${
                    paymentMethod === method
                      ? 'bg-[#2B0E0A] text-white border-[#2B0E0A]'
                      : 'bg-transparent text-[#2B0E0A] border-[#2B0E0A]/20 hover:border-[#2B0E0A]'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {/* Acción Principal */}
            {paymentMethod === 'whatsapp' && (
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-[#25D366] text-white font-black rounded-xl text-center hover:bg-[#20BD5A] transition-colors"
              >
                PEDIR POR WHATSAPP
              </a>
            )}

            {paymentMethod === 'clabe' && (
              <button
                onClick={handleCopyClabe}
                className="w-full py-3 bg-[#2B0E0A] text-white font-bold rounded-xl text-center flex items-center justify-center gap-2"
              >
                {copied ? '✓ COPIADA' : `COPIAR CLABE ${CONFIG.BANK}`}
              </button>
            )}

            {paymentMethod === 'lightning' && (
              <div className="text-center space-y-2">
                <div className="text-xs font-mono bg-[#FFF9F3] p-2 rounded break-all border border-[#7E1D0F]/10">
                  temozonia@blink.sv
                </div>
                <p className="text-[10px] text-[#5A2A22]/60">
                  Escanea o copia para pagar con Lightning Network ⚡
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
