'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Coins,
  FileCheck,
  Headphones,
  Info,
  Loader2,
  MessageSquare,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import type { AssistantConfig, AssistantContextConfig } from '../data/config';

export interface NoahChatWidgetProps {
  mode: 'hero' | 'floating';
  assistant: AssistantConfig;
  contexts?: AssistantContextConfig[];
  defaultContext?: string;
  lang?: 'es' | 'en';
  showDisclaimer?: boolean;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  hash?: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

const ICON_MAP = {
  scale: Scale,
  shield: ShieldCheck,
  coins: Coins,
  file: FileCheck,
  headphones: Headphones,
} as const;

const DEFAULT_CONTEXTS_BY_LINE: Record<AssistantConfig['line'], AssistantContextConfig[]> = {
  legal: [
    { key: 'cumplimiento', label: 'Cumplimiento', iconName: 'shield' },
    { key: 'fiscal', label: 'Fiscal', iconName: 'scale' },
    { key: 'pld', label: 'PLD / Lavado', iconName: 'shield' },
    { key: 'cripto', label: 'Criptoactivos', iconName: 'coins' },
    { key: 'expediente', label: 'Expediente', iconName: 'file' },
    { key: 'soporte', label: 'Soporte', iconName: 'headphones' },
  ],
  commerce: [
    { key: 'productos', label: 'Productos', iconName: 'file' },
    { key: 'pagos', label: 'Pagos', iconName: 'coins' },
    { key: 'envios', label: 'Envíos', iconName: 'shield' },
    { key: 'soporte', label: 'Soporte', iconName: 'headphones' },
  ],
  lab: [
    { key: 'datos', label: 'Datos', iconName: 'file' },
    { key: 'bitcoin', label: 'Bitcoin', iconName: 'coins' },
    { key: 'api', label: 'API', iconName: 'shield' },
    { key: 'soporte', label: 'Soporte', iconName: 'headphones' },
  ],
};

const DEFAULT_DISCLAIMER = {
  es: 'Respuesta generada por IA. No constituye asesoría legal. Valida con tu abogado o contador.',
  en: 'AI-generated response. Not legal advice. Validate with your lawyer or accountant.',
};

async function hashResponse(response: string): Promise<string | undefined> {
  if (!globalThis.crypto?.subtle) return undefined;
  const digest = await globalThis.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(response),
  );
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function SourceBadge({ source, legalRef }: { source: string; legalRef?: string | null }) {
  const config = {
    kb: {
      icon: FileCheck,
      label: 'Base de conocimiento',
      color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    },
    llm: {
      icon: Sparkles,
      label: 'Generado por IA',
      color: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
    },
    fallback: {
      icon: AlertTriangle,
      label: 'Requiere revisión',
      color: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
    },
  }[source] ?? {
    icon: Info,
    label: source,
    color: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/25',
  };

  const Icon = config.icon;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${config.color}`}
      >
        <Icon className="h-2.5 w-2.5" />
        {config.label}
      </span>
      {legalRef && (
        <span className="font-mono text-[10px] text-zinc-500">{legalRef}</span>
      )}
    </div>
  );
}

function ChatBubble({
  message,
  showDisclaimer,
  disclaimer,
  lang,
}: {
  message: Message;
  showDisclaimer: boolean;
  disclaimer: string;
  lang: 'es' | 'en';
}) {
  const isUser = message.role === 'user';

  return (
    <div className={`mb-5 flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-up`}>
      <div className={`max-w-[88%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`relative rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed shadow-sm transition-all ${
            isUser
              ? 'bg-gradient-to-br from-ark-accent to-ark-accent/90 text-white shadow-ark-glow/40'
              : 'border border-white/10 bg-white/[0.04] text-zinc-100 backdrop-blur-md'
          }`}
        >
          {!isUser && (
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent" />
          )}
          <p className="relative whitespace-pre-wrap font-sans">{message.content}</p>
          {!isUser && message.isStreaming && (
            <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse rounded-sm bg-ark-accent align-middle" />
          )}
        </div>

        {!isUser && !message.isStreaming && (
          <div className="mt-2.5 flex flex-col gap-1.5 px-0.5">
            {message.metadata && (
              <SourceBadge
                source={message.metadata.source as string}
                legalRef={message.metadata.legal_reference as string | null}
              />
            )}
            {message.hash && message.timestamp && (
              <div className="ark-seal flex flex-col gap-0.5">
                <span className="ark-seal__label text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                  {lang === 'es' ? 'Huella local' : 'Local fingerprint'}
                </span>
                <span className="ark-seal__value font-mono text-[10px] text-zinc-400">
                  {message.hash.slice(0, 12)}… · {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            )}
            {showDisclaimer && (
              <div className="flex items-start gap-1.5 text-[10px] leading-snug text-zinc-500">
                <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 opacity-70" />
                <span>{disclaimer}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Header({
  assistant,
  ActiveIcon,
  onClose,
}: {
  assistant: AssistantConfig;
  ActiveIcon: React.ComponentType<{ className?: string }>;
  onClose?: () => void;
}) {
  const lineLabel = {
    legal: 'ARK LEGAL',
    commerce: 'ARK COMMERCE',
    lab: 'ARK LAB',
  }[assistant.line];

  return (
    <div className="relative flex shrink-0 items-center justify-between border-b border-white/8 bg-gradient-to-b from-white/[0.06] to-transparent px-5 py-4">
      <div className="pointer-events-none absolute -left-8 -top-10 h-28 w-28 rounded-full bg-ark-accent/20 blur-3xl" />

      <div className="relative flex items-center gap-3.5">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-ark-accent/30 bg-ark-accent/15 shadow-inner">
            <ActiveIcon className="h-5 w-5 text-ark-accent" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-base bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-[15px] font-bold tracking-tight text-white">
              {assistant.name}
            </h3>
            <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-zinc-400">
              {lineLabel}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-zinc-400">{assistant.tagline}</p>
        </div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/8 hover:text-white"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

function ContextBar({
  contexts,
  context,
  onSwitch,
}: {
  contexts: AssistantContextConfig[];
  context: string;
  onSwitch: (key: string) => void;
}) {
  return (
    <div className="flex shrink-0 gap-1.5 overflow-x-auto border-b border-white/6 bg-black/20 px-3 py-2.5 no-scrollbar">
      {contexts.map(({ key, label, iconName }) => {
        const Icon = ICON_MAP[iconName];
        const active = context === key;

        return (
          <button
            key={key}
            onClick={() => onSwitch(key)}
            aria-pressed={active}
            className={`group flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${
              active
                ? 'bg-ark-accent text-white shadow-[0_0_12px_rgba(var(--ark-accent-rgb,245,158,11),0.35)]'
                : 'border border-white/8 bg-white/[0.03] text-zinc-400 hover:border-white/15 hover:bg-white/[0.06] hover:text-zinc-200'
            }`}
          >
            <Icon className={`h-3 w-3 ${active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function MessagesArea({
  messages,
  showDisclaimer,
  disclaimer,
  lang,
  messagesEndRef,
  line,
  minHeight,
}: {
  messages: Message[];
  showDisclaimer: boolean;
  disclaimer: string;
  lang: 'es' | 'en';
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  line: AssistantConfig['line'];
  minHeight?: string;
}) {
  const emptyCopy = {
    legal: {
      title: lang === 'es' ? '¿Qué necesita resguardar hoy?' : 'What do you need to safeguard today?',
      subtitle:
        lang === 'es'
          ? 'Selecciona un tema o pregúntame lo que necesites.'
          : 'Select a topic or ask me anything.',
    },
    commerce: {
      title: lang === 'es' ? '¿Buscas algo en particular?' : 'Looking for something?',
      subtitle:
        lang === 'es' ? 'Selecciona un tema o escribe tu duda.' : 'Select a topic or write your question.',
    },
    lab: {
      title: lang === 'es' ? '¿Exploramos datos?' : 'Shall we explore data?',
      subtitle:
        lang === 'es'
          ? 'Selecciona un tema o escribe tu duda técnica.'
          : 'Select a topic or write your technical question.',
    },
  }[line];

  return (
    <div
      className="flex-1 space-y-1 overflow-y-auto p-4 custom-scrollbar"
      style={minHeight ? { minHeight } : undefined}
    >
      {messages.length === 0 && (
        <div className="flex h-full min-h-[220px] flex-col items-center justify-center px-6 text-center">
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-full bg-ark-accent/20 blur-xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-ark-accent/25 bg-gradient-to-br from-ark-accent/20 to-ark-accent/5 shadow-inner">
              <Sparkles className="h-7 w-7 text-ark-accent" />
            </div>
          </div>
          <p className="text-[15px] font-medium tracking-tight text-zinc-100">{emptyCopy.title}</p>
          <p className="mt-1.5 max-w-[240px] text-xs leading-relaxed text-zinc-500">
            {emptyCopy.subtitle}
          </p>
        </div>
      )}

      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message}
          showDisclaimer={showDisclaimer}
          disclaimer={disclaimer}
          lang={lang}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

function Composer({
  input,
  setInput,
  isLoading,
  onSubmit,
  lang,
  inputRef,
}: {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  onSubmit: (event: React.SyntheticEvent) => void;
  lang: 'es' | 'en';
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const placeholder = lang === 'es' ? 'Pregúntame lo que necesites…' : 'Ask me anything…';

  return (
    <form
      onSubmit={onSubmit}
      className="shrink-0 border-t border-white/8 bg-gradient-to-t from-black/30 to-transparent p-4"
    >
      <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 shadow-inner transition-all focus-within:border-ark-accent/50 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_0_3px_rgba(var(--ark-accent-rgb,245,158,11),0.12)]">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label={lang === 'es' ? 'Enviar mensaje' : 'Send message'}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ark-accent text-white shadow-md transition-all hover:bg-ark-accent-hover hover:shadow-ark-glow disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500 disabled:shadow-none"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </div>
      <p className="mt-2 text-center text-[10px] text-zinc-600">
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px]">
          ⌘K
        </kbd>{' '}
        para enfocar
      </p>
    </form>
  );
}

export default function NoahChatWidget({
  mode = 'floating',
  assistant,
  contexts,
  defaultContext,
  lang = 'es',
  showDisclaimer = true,
}: NoahChatWidgetProps) {
  const resolvedContexts =
    contexts ?? assistant.contexts ?? DEFAULT_CONTEXTS_BY_LINE[assistant.line];
  const resolvedDefaultContext =
    defaultContext ?? assistant.defaultContext ?? resolvedContexts[0]?.key ?? 'fiscal';
  const disclaimer = assistant.disclaimer || DEFAULT_DISCLAIMER[lang];

  const [isMounted, setIsMounted] = useState(false);
  const [context, setContext] = useState(resolvedDefaultContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sessionId = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const stored = localStorage.getItem('noah_session');
    if (stored) return stored;
    const fresh = crypto.randomUUID();
    localStorage.setItem('noah_session', fresh);
    return fresh;
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape' && isOpen && !input.trim()) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, input]);

  useEffect(() => {
    if (isMounted && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isMounted]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading || !isMounted) return;

      setIsLoading(true);
      const userMsgId = crypto.randomUUID();
      const assistantMsgId = crypto.randomUUID();
      setMessages((previous) => [
        ...previous,
        { id: userMsgId, role: 'user', content: text },
        { id: assistantMsgId, role: 'assistant', content: '', isStreaming: true },
      ]);
      setInput('');

      let fullContent = '';

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            context,
            line: assistant.line,
            lang,
            session_id: sessionId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Error en el servidor');
        }

        if (!response.body) throw new Error('No response stream');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const payload = line.slice(6).trim();
            if (payload === '[DONE]') continue;

            try {
              const parsed = JSON.parse(payload);

              if (parsed.type === 'meta') {
                setMessages((m) => {
                  const copy = [...m];
                  const last = copy[copy.length - 1];
                  if (last.id === assistantMsgId) {
                    last.metadata = {
                      source: parsed.source,
                      legal_reference: parsed.legal_reference,
                      model: parsed.model,
                    };
                  }
                  return copy;
                });
                continue;
              }

              const token = parsed.response ?? '';
              if (token) {
                fullContent += token;
                setMessages((m) => {
                  const copy = [...m];
                  const last = copy[copy.length - 1];
                  if (last.id === assistantMsgId) {
                    last.content = fullContent;
                  }
                  return copy;
                });
              }
            } catch {
              // ignore parse errors
            }
          }
        }

        let hash: string | undefined;
        if (fullContent) {
          try {
            hash = await hashResponse(fullContent);
          } catch (error) {
            console.error('[NoahChatWidget] No se pudo calcular la huella local:', error);
          }
        }
        const timestamp = new Date().toISOString();

        setMessages((m) => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          if (last.id === assistantMsgId) {
            last.isStreaming = false;
            last.hash = hash;
            last.timestamp = timestamp;
          }
          return copy;
        });
      } catch (err) {
        console.error('[NoahChatWidget] Error al enviar mensaje:', err);
        setMessages((m) => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          if (last.id === assistantMsgId) {
            last.content =
              lang === 'es'
                ? `⚠️ ${assistant.name} no está disponible en este momento. Intenta de nuevo.`
                : `⚠️ ${assistant.name} is unavailable right now. Please try again.`;
            last.isStreaming = false;
          }
          return copy;
        });
      } finally {
        setIsLoading(false);
      }
    },
    [assistant.line, assistant.name, context, isLoading, isMounted, lang, sessionId],
  );

  const handleContextSwitch = (key: string) => {
    if (key === context) return;
    setContext(key);
    setMessages([]);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (input.trim()) sendMessage(input.trim());
  };

  const ActiveIcon =
    ICON_MAP[resolvedContexts.find((item) => item.key === context)?.iconName ?? 'scale'];

  const contents = (
    <>
      <Header
        assistant={assistant}
        ActiveIcon={ActiveIcon}
        onClose={mode === 'floating' ? () => setIsOpen(false) : undefined}
      />
      <ContextBar contexts={resolvedContexts} context={context} onSwitch={handleContextSwitch} />
      <MessagesArea
        messages={messages}
        showDisclaimer={showDisclaimer}
        disclaimer={disclaimer}
        lang={lang}
        messagesEndRef={messagesEndRef}
        line={assistant.line}
        minHeight={mode === 'hero' ? '300px' : undefined}
      />
      <Composer
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        lang={lang}
        inputRef={inputRef}
      />
      {showDisclaimer && (
        <div className="flex shrink-0 items-start gap-1.5 border-t border-white/6 bg-black/20 px-4 py-2.5 text-[10px] leading-snug text-zinc-500">
          <Info className="mt-0.5 h-3 w-3 shrink-0 opacity-60" />
          <span>{disclaimer}</span>
        </div>
      )}
    </>
  );

  if (mode === 'floating') {
    return (
      <div data-theme={assistant.line}>
        <button
          onClick={() => setIsOpen(true)}
          className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-ark-accent/40 bg-base shadow-[0_0_24px_rgba(var(--ark-accent-rgb,245,158,11),0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(var(--ark-accent-rgb,245,158,11),0.4)]"
          aria-label={lang === 'es' ? `Abrir ${assistant.name}` : `Open ${assistant.name}`}
          aria-expanded={isOpen}
        >
          <MessageSquare className="h-6 w-6 text-ark-accent transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-base bg-emerald-400" />
        </button>

        {isOpen && (
          <section
            aria-label={`${assistant.name} chat`}
            className="fixed bottom-24 right-6 z-50 flex h-[560px] w-[min(92vw,400px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-base/90 shadow-2xl shadow-black/50 backdrop-blur-2xl animate-scale-in"
          >
            <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-ark-accent/15 blur-3xl" />
            {contents}
          </section>
        )}
      </div>
    );
  }

  return (
    <section
      data-theme={assistant.line}
      aria-label={`${assistant.name} chat`}
      className="relative mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-base/90 shadow-2xl shadow-black/40 backdrop-blur-2xl animate-fade-up"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-ark-accent/12 blur-3xl" />
      {contents}
    </section>
  );
}