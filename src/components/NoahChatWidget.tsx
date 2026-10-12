'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-up`}>
      <div className="max-w-[85%]">
<div
            className={`rounded-xl border px-4 py-3 text-sm leading-relaxed transition-colors ${
              isUser
                ? 'bg-ark-accent text-white border-transparent shadow-lg'
                : 'bg-surface/80 backdrop-blur-md border-border text-white'
            }`}
          >
          <p className="whitespace-pre-wrap font-sans">{message.content}</p>
          {!isUser && message.isStreaming && (
            <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-ark-accent align-middle" />
          )}
        </div>

        {!isUser && !message.isStreaming && (
          <div className="mt-2 flex flex-col gap-1">
            {message.hash && message.timestamp && (
              <div className="ark-seal">
                <span className="ark-seal__label">
                  {lang === 'es' ? 'HUELLA LOCAL' : 'LOCAL FINGERPRINT'}
                </span>
                <span className="ark-seal__value font-mono text-xs">
                  {message.hash} · {message.timestamp}
                </span>
                <span className="text-[10px] text-text-muted">
                  {lang === 'es'
                    ? 'Generada en este navegador; no es un registro de auditoría.'
                    : 'Generated in this browser; not an audit record.'}
                </span>
              </div>
            )}
            {showDisclaimer && (
              <div className="flex items-start gap-1.5 text-[10px] leading-tight text-zinc-500">
                <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
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
    <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface/50 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-ark-accent/30 bg-ark-accent/10 p-2">
          <ActiveIcon className="h-5 w-5 text-ark-accent" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-bold text-white">{assistant.name}</h3>
            <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              {lineLabel}
            </span>
          </div>
          <p className="text-xs font-medium text-zinc-400">{assistant.tagline}</p>
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-surface-hover hover:text-white"
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
    <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-border bg-base/50 px-3 py-2 no-scrollbar">
      {contexts.map(({ key, label, iconName }) => {
        const Icon = ICON_MAP[iconName];
        const active = context === key;

        return (
          <button
            key={key}
            onClick={() => onSwitch(key)}
            aria-pressed={active}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              active
                ? 'bg-ark-accent text-white shadow-md'
                : 'border border-border bg-surface text-zinc-300 hover:border-border-strong hover:text-white'
            }`}
          >
            <Icon className="h-3.5 w-3.5" /> {label}
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
      title:
        lang === 'es' ? '¿Qué necesita resguardar hoy?' : 'What do you need to safeguard today?',
      subtitle:
        lang === 'es'
          ? 'Selecciona un tema o pregúntame lo que necesites.'
          : 'Select a topic or ask me anything.',
    },
    commerce: {
      title: lang === 'es' ? '¿Buscas algo en particular?' : 'Looking for something?',
      subtitle:
        lang === 'es'
          ? 'Selecciona un tema o escribe tu duda.'
          : 'Select a topic or write your question.',
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
      className="flex-1 space-y-2 overflow-y-auto p-4 custom-scrollbar"
      style={minHeight ? { minHeight } : undefined}
    >
      {messages.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="mb-3 rounded-full border border-ark-border bg-ark-surface p-3">
            <Scale className="h-8 w-8 text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-200">{emptyCopy.title}</p>
          <p className="mt-1 text-xs text-zinc-500">{emptyCopy.subtitle}</p>
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
}: {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  onSubmit: (event: React.SyntheticEvent) => void;
  lang: 'es' | 'en';
}) {
  return (
    <form onSubmit={onSubmit} className="shrink-0 border-t border-ark-border bg-ark-surface/50 p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={lang === 'es' ? 'Pregúntame lo que necesites...' : 'Ask me anything...'}
          disabled={isLoading}
          className="flex-1 rounded-xl border border-border bg-base px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-ark-accent focus:ring-1 focus:ring-ark-accent"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label={lang === 'es' ? 'Enviar mensaje' : 'Send message'}
          className="flex items-center justify-center rounded-xl bg-ark-accent px-4 font-medium text-white shadow-md transition-all hover:bg-ark-accent-hover disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </div>
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, context, line: assistant.line, lang }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Error en el servidor');
        if (typeof data.response !== 'string') {
          throw new Error('La respuesta del servidor tiene un formato inválido');
        }

        let hash: string | undefined;
        try {
          hash = await hashResponse(data.response);
        } catch (error) {
          console.error('[NoahChatWidget] No se pudo calcular la huella local:', error);
        }
        const timestamp = new Date().toISOString();

        setMessages((previous) =>
          previous.map((message) =>
            message.id === assistantMsgId
              ? { ...message, content: data.response, isStreaming: false, hash, timestamp }
              : message,
          ),
        );
      } catch (error) {
        console.error('[NoahChatWidget] Error al enviar mensaje:', error);
        setMessages((previous) =>
          previous.map((message) =>
            message.id === assistantMsgId
              ? {
                  ...message,
                  content:
                    lang === 'es'
                      ? `⚠️ ${assistant.name} no está disponible en este momento. Intenta de nuevo.`
                      : `⚠️ ${assistant.name} is unavailable right now. Please try again.`,
                  isStreaming: false,
                }
              : message,
          ),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [assistant.line, assistant.name, context, isLoading, isMounted, lang],
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
      />
      {showDisclaimer && (
        <div className="flex shrink-0 items-start gap-1.5 border-t border-border bg-surface/30 px-4 py-2 text-[10px] leading-tight text-zinc-500">
          <Info className="mt-0.5 h-3 w-3 shrink-0" />
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
          className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-border-strong bg-surface shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-ark-glow"
          aria-label={lang === 'es' ? `Abrir ${assistant.name}` : `Open ${assistant.name}`}
          aria-expanded={isOpen}
        >
          <MessageSquare className="h-6 w-6 text-ark-accent transition-transform group-hover:scale-110" />
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-base bg-emerald-500" />
        </button>
        {isOpen && (
          <section
            aria-label={`${assistant.name} chat`}
            className="fixed bottom-24 right-6 z-50 flex h-[550px] w-[min(92vw,400px)] flex-col overflow-hidden rounded-2xl border border-border-strong bg-base/95 shadow-2xl backdrop-blur-xl animate-scale-in"
          >
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
      className="mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border-strong bg-base/95 shadow-2xl backdrop-blur-xl animate-fade-up"
    >
      {contents}
    </section>
  );
}
