import React, { useState } from 'react';

const TIMES = ['09:00', '10:30', '12:00', '16:00'];

const STEPS = [
  {
    number: '01',
    title: 'Elegir un horario',
    description: 'La persona explora horarios de ejemplo, sin crear una cita.',
  },
  {
    number: '02',
    title: 'Revisar el flujo de pago',
    description: 'Stripe y Lightning aparecen como opciones conceptuales, no conectadas.',
    featured: true,
  },
  {
    number: '03',
    title: 'Confirmar con servicios reales',
    description: 'Una implementación requeriría proveedores y datos aprobados por el consultorio.',
  },
];

export default function MedicalApp() {
  const [selectedTime, setSelectedTime] = useState('');
  const [demoMessage, setDemoMessage] = useState('');

  const showPaymentNotice = (method) => {
    setDemoMessage(
      `${method}: simulación únicamente. No se procesó ningún pago ni se reservó una cita.`,
    );
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-[#F8FAFC] font-[Inter,system-ui,sans-serif] text-[#0F172A] antialiased">
      <div className="flex items-center justify-center gap-3 bg-[#0F172A] px-4 py-3 text-center text-[11px] font-semibold tracking-wide text-white">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="uppercase tracking-widest">
          Demo ficticia • Sin servicio médico, agenda ni pagos activos
        </span>
        <span className="rounded bg-[#2563EB] px-2 py-0.5 text-[10px]">DEMO</span>
      </div>

      <nav className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#0F172A] text-[12px] font-bold text-white">
              M
            </div>
            <div className="leading-tight">
              <div className="text-[14px] font-bold tracking-tight">
                CLÍNICA <span className="text-[#2563EB]">DEMO</span>
              </div>
              <div className="text-[11px] text-slate-500">Concepto de agenda • Datos ficticios</div>
            </div>
          </div>
          <span className="hidden rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-medium text-amber-800 md:inline-flex">
            Integraciones deshabilitadas
          </span>
        </div>
      </nav>

      <main className="mx-auto max-w-[1120px] px-5 md:px-8">
        <section className="grid items-start gap-8 pb-10 pt-12 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:pb-14 md:pt-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-wide">
              <span className="rounded-full bg-[#2563EB] px-2 py-0.5 text-[10px] text-white">
                PLANTILLA
              </span>
              <span className="text-slate-600">Prototipo de agenda para consultorios</span>
            </div>
            <h1 className="mt-5 text-[38px] font-extrabold leading-[0.98] tracking-[-0.03em] md:text-[56px]">
              Una agenda clara.
              <br />
              <span className="text-slate-300">Un flujo de pago</span>
              <br />
              <span className="text-[#2563EB]">por diseñar.</span>
            </h1>
            <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-slate-600 md:text-[18px]">
              Explora un concepto para coordinar horarios y explicar un posible prepago. Esta
              demostración no ofrece consultas, atención clínica ni recomendaciones médicas.
            </p>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                ['01', 'flujo conceptual'],
                ['0', 'integraciones activas'],
                ['DEMO', 'sin datos personales'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[14px] border border-slate-200 bg-white p-3 sm:p-4"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 sm:text-[11px]">
                    Muestra
                  </div>
                  <div className="mt-1 text-lg font-extrabold tracking-tight sm:text-[24px]">
                    {value}
                  </div>
                  <div className="mt-1 text-[10px] leading-snug text-slate-500 sm:text-[12px]">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#agenda"
              className="mt-8 inline-flex h-[48px] items-center justify-center rounded-full bg-[#0F172A] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-black"
            >
              Explorar agenda de muestra ↓
            </a>
          </div>

          <aside className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#0F172A] text-[11px] font-bold text-white">
                  M
                </div>
                <div>
                  <div className="text-[13px] font-semibold">Consulta ilustrativa</div>
                  <div className="text-[11px] text-slate-500">Horario y precio de ejemplo</div>
                </div>
              </div>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                No disponible
              </span>
            </div>

            <div className="mt-5 rounded-[14px] border border-slate-200 bg-[#F8FAFC] p-4">
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-semibold">Horarios de muestra</div>
                <div className="text-[11px] text-slate-500">Día ilustrativo</div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {TIMES.map((time) => (
                  <button
                    key={time}
                    type="button"
                    aria-pressed={selectedTime === time}
                    onClick={() => {
                      setSelectedTime(time);
                      setDemoMessage('');
                    }}
                    className={`rounded-[10px] border px-3 py-2.5 text-[12px] font-semibold transition-colors ${
                      selectedTime === time
                        ? 'border-[#2563EB] bg-[#2563EB] text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-[#2563EB]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
                Seleccionar un horario solo cambia esta vista local; no aparta una cita.
              </p>
            </div>

            <div className="mt-3 rounded-[12px] border border-blue-100 bg-blue-50 p-3.5 text-[12px] leading-relaxed text-blue-900">
              {selectedTime
                ? `Horario de muestra seleccionado: ${selectedTime}. Sin reserva ni datos enviados.`
                : 'Elige un horario de muestra para ver cómo respondería una agenda.'}
            </div>
          </aside>
        </section>

        <section className="pb-8">
          <div className="mb-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#2563EB]">
              Flujo conceptual
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              De la agenda a una confirmación
            </h2>
          </div>
          <div className="grid gap-2">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className={`flex gap-3 rounded-[12px] border px-4 py-3 ${
                  step.featured
                    ? 'border-[#0F172A] bg-[#0F172A] text-white'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] font-bold ${
                    step.featured
                      ? 'bg-white text-[#0F172A]'
                      : 'border border-slate-200 bg-[#F8FAFC]'
                  }`}
                >
                  {step.number}
                </div>
                <div>
                  <div className="text-[13px] font-semibold">{step.title}</div>
                  <div
                    className={`mt-1 text-[12px] leading-snug ${
                      step.featured ? 'text-white/70' : 'text-slate-500'
                    }`}
                  >
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="agenda"
          className="mt-6 scroll-mt-24 rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-6"
        >
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center">
            <div>
              <div className="text-[14px] font-bold tracking-tight">Agenda de demostración</div>
              <p className="mt-1 text-[12px] text-slate-500">
                Calendario y horarios ficticios; no se conecta a un proveedor de reservas.
              </p>
            </div>
            <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
              Agenda no configurada
            </span>
          </div>
          <div className="grid gap-2 py-5 sm:grid-cols-3">
            {['Horario seleccionado', 'Prepago conceptual', 'Confirmación no disponible'].map(
              (item, index) => (
                <div key={item} className="rounded-[12px] border border-slate-200 bg-[#F8FAFC] p-4">
                  <div className="text-[10px] font-bold tracking-widest text-[#2563EB]">
                    PASO 0{index + 1}
                  </div>
                  <div className="mt-2 text-[12px] font-semibold">{item}</div>
                </div>
              ),
            )}
          </div>
          <p className="rounded-[12px] border border-amber-200 bg-amber-50 p-3 text-[12px] leading-relaxed text-amber-900">
            No introduzcas información personal o médica. Esta maqueta no transmite ni almacena
            datos.
          </p>
        </section>

        <section className="mt-6 grid gap-4 pb-10 md:grid-cols-[1.1fr_0.9fr] md:pb-14">
          <div className="rounded-[20px] bg-[#0F172A] p-6 text-white md:p-8">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#CCFF00]">
              Prepago ilustrativo
            </div>
            <h2 className="mt-2 text-[22px] font-bold tracking-tight">Sin cobros en esta demo</h2>
            <p className="mt-2 max-w-[46ch] text-[14px] leading-relaxed text-white/65">
              Stripe y Lightning se muestran solo como ejemplos de opciones posibles. No hay
              proveedor conectado y ningún pago puede completarse.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => showPaymentNotice('Stripe')}
                className="flex h-[48px] items-center justify-center gap-2 rounded-[12px] bg-white text-[13px] font-semibold text-black transition-colors hover:bg-[#CCFF00]"
              >
                Simular Stripe
              </button>
              <button
                type="button"
                onClick={() => showPaymentNotice('Lightning')}
                className="flex h-[48px] items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/10 text-[13px] font-semibold text-white transition-colors hover:bg-white/15"
              >
                Simular Lightning
              </button>
            </div>
            {demoMessage && (
              <p
                role="status"
                className="mt-4 rounded-[12px] border border-amber-200/30 bg-amber-200/10 p-3 text-[12px] leading-relaxed text-amber-100"
              >
                {demoMessage}
              </p>
            )}
          </div>

          <aside className="rounded-[20px] border border-slate-200 bg-white p-6 md:p-8">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#2563EB]">
              Alcance de esta maqueta
            </div>
            <h2 className="mt-2 text-[20px] font-bold tracking-tight">Prototipo, no consultorio</h2>
            <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-slate-600">
              <li>• No ofrece atención médica ni consejos clínicos.</li>
              <li>• No hay profesional, cédula, ubicación ni agenda reales.</li>
              <li>• No se envían datos ni se procesan pagos o reservas.</li>
            </ul>
          </aside>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-6 text-center text-[11px] leading-relaxed text-slate-500 md:px-8">
        Clínica Demo es un concepto ficticio de portfolio. No representa un prestador de servicios
        de salud y no sustituye atención médica profesional.
      </footer>
    </div>
  );
}
