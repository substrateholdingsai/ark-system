'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Send, Loader2, MessageSquare, Scale, ShieldCheck, Coins, FileCheck, Headphones } from 'lucide-react';

export interface BobChatWidgetProps {
  mode: 'hero' | 'floating';
  defaultContext?: string;
  lang?: 'es' | 'en';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

const CONTEXTS = [
  { key: 'fiscal', label: 'Fiscal', icon: Scale },
  { key: 'pld', label: 'PLD / Lavado', icon: ShieldCheck },
  { key: 'cripto', label: 'Criptoactivos', icon: Coins },
  { key: 'facturacion', label: 'Facturación', icon: FileCheck },
  { key: 'soporte', label: 'Soporte', icon: Headphones },
] as const;

const ChatBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-up`}>
      <div
        className={`max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed border transition-colors
          ${isUser
            ? 'bg-ark-accent text-white border-transparent shadow-lg'
            : 'bg-ark-surface/80 backdrop-blur-md border-ark-border text-zinc-100'
          }`}
      >
        <p className="whitespace-pre-wrap font-sans">{message.content}</p>
        {message.role === 'assistant' && message.isStreaming && (
          <span className="inline-block w-1.5 h-4 bg-ark-accent animate-pulse ml-1 align-middle" />
        )}
      </div>
    </div>
  );
};

export default function BobChatWidget({
  mode = 'floating',
  defaultContext = 'fiscal',
  lang = 'es',
}: BobChatWidgetProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [context, setContext] = useState(defaultContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isMounted]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || !isMounted) return;

    setIsLoading(true);
    const userMsgId = crypto.randomUUID();
    const assistantMsgId = crypto.randomUUID();

    const userMsg: Message = { id: userMsgId, role: 'user', content: text };
    const placeholderAssistantMsg: Message = { id: assistantMsgId, role: 'assistant', content: '', isStreaming: true };

    setMessages((prev) => [...prev, userMsg, placeholderAssistantMsg]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, context, lang }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error en el servidor');

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId ? { ...msg, content: data.response, isStreaming: false } : msg
        )
      );
    } catch (_err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? { ...msg, content: '⚠️ B.O.B. está realizando mantenimiento. Intenta de nuevo en un momento.', isStreaming: false }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, context, lang, isMounted]);

  const handleContextSwitch = (key: string) => {
    if (key === context) return;
    setContext(key);
    setMessages([]);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
    }
  };

  const ActiveIcon = CONTEXTS.find((c) => c.key === context)?.icon || Scale;

  if (!isMounted) return null;

  if (mode === 'floating') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-ark-surface border border-ark-border-strong rounded-full flex items-center justify-center shadow-lg hover:shadow-ark-glow transition-all duration-300 hover:-translate-y-1 group"
          aria-label="Abrir Asistente B.O.B."
        >
          <MessageSquare className="w-6 h-6 text-ark-accent transition-transform group-hover:scale-110" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-ark-base" />
        </button>

        {isOpen && (
          <div className="fixed bottom-24 right-6 z-50 w-[min(92vw,400px)] h-[550px] bg-ark-base/95 backdrop-blur-xl border border-ark-border-strong rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-scale-in">
            <div className="px-5 py-4 border-b border-ark-border bg-ark-surface/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-ark-accent/10 border border-ark-accent/30">
                  <ActiveIcon className="w-5 h-5 text-ark-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base">B.O.B.</h3>
                  <p className="text-xs text-zinc-400 font-medium">Asistente Fiscal Inteligente</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-ark-surface-hover rounded-lg transition-colors"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-3 py-2 border-b border-ark-border flex gap-2 overflow-x-auto no-scrollbar shrink-0 bg-ark-base/50">
              {CONTEXTS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => handleContextSwitch(key)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    context === key
                      ? 'bg-ark-accent text-white shadow-md'
                      : 'bg-ark-surface border border-ark-border text-zinc-300 hover:border-ark-border-strong hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" /> {label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="p-3 rounded-full bg-ark-surface border border-ark-border mb-3">
                    <Scale className="w-8 h-8 text-zinc-500" />
                  </div>
                  <p className="text-zinc-200 font-medium text-sm">¿En qué puedo asesorarte hoy?</p>
                  <p className="text-zinc-500 text-xs mt-1">Selecciona un tema o escribe tu pregunta fiscal.</p>
                </div>
              )}
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-ark-border bg-ark-surface/50 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu duda fiscal..."
                  disabled={isLoading}
                  className="flex-1 bg-ark-base border border-ark-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-ark-accent focus:ring-1 focus:ring-ark-accent outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-4 bg-ark-accent hover:bg-ark-accent/90 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all flex items-center justify-center shadow-md"
                  aria-label="Enviar mensaje"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </form>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-ark-base/95 backdrop-blur-xl border border-ark-border-strong rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-fade-up">
      <div className="p-6 text-center border-b border-ark-border">
        <h2 className="font-display text-2xl font-bold text-white mb-2">Consulta con B.O.B.</h2>
        <p className="text-zinc-400 text-sm">Nuestro motor de IA fiscal, disponible 24/7 en el Edge.</p>
      </div>
      <div className="p-8 text-center text-zinc-500 text-sm">Modo Hero simplificado para esta demostración.</div>
    </div>
  );
}