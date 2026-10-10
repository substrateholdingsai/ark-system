import React, { useState, useEffect, useRef } from 'react';

// --- DATA (extraída de tu artifact) ---
const SECTIONS = [
  { key: 'I', label: 'I. IDENTIDAD Y ESTRUCTURA LEGAL', range: '1.1-1.7', count: 7 },
  { key: 'II', label: 'II. COBRANZA Y ACOSO', range: '2.1-2.9', count: 9 },
  { key: 'III', label: 'III. SMISHING Y FRAUDE', range: '3.1-3.7', count: 7 },
  { key: 'IV', label: 'IV. CICLO DEUDA-EXTORSIÓN', range: '4.1-4.7', count: 7 },
  { key: 'V', label: 'V. OPERATIVOS JUDICIALES', range: '5.1-5.3', count: 3 },
  { key: 'VI', label: 'VI. ESTRUCTURA FINANCIERA', range: '6.1-6.4', count: 4 },
  { key: 'VII', label: 'VII. CONTRADICCIONES', range: '7.1-7.6', count: 6 },
  { key: 'VIII', label: 'VIII. CONTRATO vs CRM — EJE DE GRAVEDAD', range: '8.1-8.12', count: 12 },
];

const CONDUCTAS = [
  {
    id: '1.1',
    sec: 'I',
    title: 'Usurpación de identidad corporativa',
    desc: 'Mensajes sin razón social registrada ante CONDUSEF',
    articulo: 'Art 112 Bis LFPC',
    riesgo: 'CRITICO',
    blockedToday: 2,
    lastBlock: '09:12',
  },
  {
    id: '1.2',
    sec: 'I',
    title: 'Representación sin poder legal',
    desc: 'Cobrador dice ser abogado sin cédula',
    articulo: 'Art 250 CP + Art 112 LFPC',
    riesgo: 'CRITICO',
    blockedToday: 0,
  },
  {
    id: '1.3',
    sec: 'I',
    title: 'Nombre comercial ≠ Razón social',
    desc: "Dices 'Clara Cash' pero contrato dice otra SAPI",
    articulo: 'Art 32 LFPC',
    riesgo: 'ALTO',
    blockedToday: 1,
    lastBlock: '11:40',
  },
  {
    id: '1.4',
    sec: 'I',
    title: 'Sin registro REDECO',
    desc: 'Despacho no registrado como cobranza',
    articulo: 'Art 17 Bis CONDUSEF',
    riesgo: 'CRITICO',
    blockedToday: 0,
  },
  {
    id: '1.5',
    sec: 'I',
    title: 'Uso indebido de logotipos oficiales',
    desc: 'Logo tipo gobierno / juzgado en SMS',
    articulo: 'Art 386 Fraude',
    riesgo: 'CRITICO',
    blockedToday: 3,
    lastBlock: '10:02',
  },
  {
    id: '1.6',
    sec: 'I',
    title: 'Suplantación de funcionario',
    desc: '"Actuario" que no existe',
    articulo: 'Art 178 Bis CP',
    riesgo: 'CRITICO',
    blockedToday: 0,
  },
  {
    id: '1.7',
    sec: 'I',
    title: 'Domicilio fiscal fantasma',
    desc: 'Dirección de cobranza no verificable',
    articulo: 'Art 110 CFF',
    riesgo: 'MEDIO',
    blockedToday: 0,
  },
  {
    id: '2.1',
    sec: 'II',
    title: 'Amenaza fuera de proceso',
    desc: 'Te vamos a embargar mañana sin juicio',
    articulo: 'Art 284 Bis CP - Amenazas',
    riesgo: 'CRITICO',
    blockedToday: 7,
    lastBlock: '13:55',
  },
  {
    id: '2.2',
    sec: 'II',
    title: 'Contacto a referencias con dolo',
    desc: 'Llamar a familia para avergonzar',
    articulo: 'Art 16 Const + NOM-184',
    riesgo: 'CRITICO',
    blockedToday: 4,
    lastBlock: '12:30',
  },
  {
    id: '2.3',
    sec: 'II',
    title: 'Hostigamiento continuo',
    desc: 'Más de 3 impactos en <24h al mismo deudor',
    articulo: 'Art 284 Bis - Acoso',
    riesgo: 'CRITICO',
    blockedToday: 12,
    lastBlock: '13:59',
  },
  {
    id: '2.4',
    sec: 'II',
    title: 'Horario prohibido',
    desc: 'Mensaje 23:47 cuando NOM dice 08:00-22:00',
    articulo: 'NOM-184 SCFI',
    riesgo: 'ALTO',
    blockedToday: 5,
    lastBlock: '00:12',
  },
  {
    id: '2.5',
    sec: 'II',
    title: 'Lenguaje denigrante',
    desc: "Insultos, 'ratero', 'muerto de hambre'",
    articulo: 'Art 259 Bis Acoso',
    riesgo: 'ALTO',
    blockedToday: 2,
    lastBlock: '10:45',
  },
  {
    id: '2.6',
    sec: 'II',
    title: 'Falsos abogados en llamada',
    desc: "Plantilla 'Lic. X de jurídico'",
    articulo: 'Art 250 CP',
    riesgo: 'CRITICO',
    blockedToday: 1,
    lastBlock: '09:30',
  },
  {
    id: '2.7',
    sec: 'II',
    title: 'Grabación sin consentimiento',
    desc: 'CRM graba sin aviso de privacidad',
    articulo: 'LFPDPPP Art 16',
    riesgo: 'MEDIO',
    blockedToday: 0,
  },
  {
    id: '2.8',
    sec: 'II',
    title: 'Desfase CRM vs Realidad',
    desc: 'Agente reporta 0 intentos, sistema detectó 3. Prueba de mala fe',
    articulo: 'Art 284 Bis + 386 Fraude Procesal',
    riesgo: 'CRITICO',
    blockedToday: 9,
    lastBlock: '13:58',
  },
  {
    id: '2.9',
    sec: 'II',
    title: 'Mensajes anónimos de cobranza',
    desc: 'Número privado sin identificación',
    articulo: 'Art 16 LFPC',
    riesgo: 'ALTO',
    blockedToday: 0,
  },
  {
    id: '3.1',
    sec: 'III',
    title: 'Smishing link apócrifo',
    desc: 'https://pago-clara-seguro.com (typo)',
    articulo: 'Art 386 Fraude + 211 Bis',
    riesgo: 'CRITICO',
    blockedToday: 3,
    lastBlock: '11:02',
  },
  {
    id: '3.2',
    sec: 'III',
    title: 'QR de pago no trazable',
    desc: 'SPEI a cuenta física sin CLABE del contrato',
    articulo: 'Art 400 Bis - Lavado',
    riesgo: 'CRITICO',
    blockedToday: 0,
  },
  {
    id: '3.3',
    sec: 'III',
    title: 'WhatsApp con logo falso',
    desc: 'Perfil con escudo nacional',
    articulo: 'Art 386 + 211',
    riesgo: 'ALTO',
    blockedToday: 2,
    lastBlock: '12:10',
  },
  {
    id: '3.4',
    sec: 'III',
    title: 'Cobro con intimidación digital',
    desc: 'Foto de INE + amenaza de difusión',
    articulo: 'Ley Olimpia Art 199',
    riesgo: 'CRITICO',
    blockedToday: 1,
    lastBlock: '13:20',
  },
  {
    id: '3.5',
    sec: 'III',
    title: 'Suplantación de CONDUSEF',
    desc: 'Te contactamos de CONDUSEF para cobrar',
    articulo: 'Art 172 Bis',
    riesgo: 'CRITICO',
    blockedToday: 0,
  },
  {
    id: '3.6',
    sec: 'III',
    title: 'Deepfake de voz',
    desc: 'Audio sintético del titular',
    articulo: 'Art 211 Bis + LFPDPPP',
    riesgo: 'CRITICO',
    blockedToday: 0,
  },
  {
    id: '3.7',
    sec: 'III',
    title: 'Link acortado sin dominio propio',
    desc: 'bit.ly/cobra-ya',
    articulo: 'NOM-184 + LFPC',
    riesgo: 'MEDIO',
    blockedToday: 4,
    lastBlock: '09:00',
  },
  {
    id: '4.1',
    sec: 'IV',
    title: 'Refinanciamiento forzado',
    desc: 'Si no pagas hoy, sube a $14k auto',
    articulo: 'Art 17 LFPC - Prácticas abusivas',
    riesgo: 'ALTO',
    blockedToday: 0,
  },
  {
    id: '4.2',
    sec: 'IV',
    title: 'Interés sobre interés no pactado',
    desc: 'Capitalización no firmada',
    articulo: 'Art 23 LCTC',
    riesgo: 'CRITICO',
    blockedToday: 2,
    lastBlock: '10:30',
  },
  {
    id: '4.3',
    sec: 'IV',
    title: 'Cobro de lo indebido',
    desc: 'Cargo $500 por gestión inexistente',
    articulo: 'Art 386 Fraude',
    riesgo: 'CRITICO',
    blockedToday: 1,
    lastBlock: '08:15',
  },
  {
    id: '4.4',
    sec: 'IV',
    title: 'Extorsión por contactos',
    desc: 'Si no pagas difundimos a tus contactos',
    articulo: 'Art 390 Extorsión',
    riesgo: 'CRITICO',
    blockedToday: 6,
    lastBlock: '13:45',
  },
  {
    id: '4.5',
    sec: 'IV',
    title: 'Préstamo espejo',
    desc: 'Ofrecer otro crédito para pagar el actual',
    articulo: 'Art 72 LFPC',
    riesgo: 'ALTO',
    blockedToday: 0,
  },
  {
    id: '4.6',
    sec: 'IV',
    title: 'Retención de documentos',
    desc: 'No entrega pagaré aunque liquide',
    articulo: 'Art 17 LFPC',
    riesgo: 'MEDIO',
    blockedToday: 0,
  },
  {
    id: '4.7',
    sec: 'IV',
    title: 'Venta de deuda sin aviso',
    desc: 'Ceden a despacho sin notificación',
    articulo: 'Art 2035 CC',
    riesgo: 'ALTO',
    blockedToday: 0,
  },
  {
    id: '5.1',
    sec: 'V',
    title: 'Falso embargo sin juicio',
    desc: 'Notificación de embargo extrajudicial',
    articulo: 'Art 284 Bis + 16 Const',
    riesgo: 'CRITICO',
    blockedToday: 5,
    lastBlock: '12:55',
  },
  {
    id: '5.2',
    sec: 'V',
    title: 'Simulación de orden judicial',
    desc: 'PDF con sello falso de juzgado',
    articulo: 'Art 386 Fraude Procesal',
    riesgo: 'CRITICO',
    blockedToday: 3,
    lastBlock: '11:55',
  },
  {
    id: '5.3',
    sec: 'V',
    title: 'Diligencia sin actuario',
    desc: 'Ir a domicilio con papel no oficial',
    articulo: 'Art 1172 CPC + 178',
    riesgo: 'CRITICO',
    blockedToday: 0,
  },
  {
    id: '6.1',
    sec: 'VI',
    title: 'CLABE no coincide contrato',
    desc: 'SPEI a cuenta de persona física',
    articulo: 'Art 400 Bis + 112 LFPC',
    riesgo: 'CRITICO',
    blockedToday: 2,
    lastBlock: '10:00',
  },
  {
    id: '6.2',
    sec: 'VI',
    title: 'Sin comprobante CFDI',
    desc: 'Recibe pago sin recibo deducible',
    articulo: 'Art 29 CFF',
    riesgo: 'MEDIO',
    blockedToday: 0,
  },
  {
    id: '6.3',
    sec: 'VI',
    title: 'Desvío a wallet cripto',
    desc: 'Paga aquí en USDT',
    articulo: 'Art 400 Bis',
    riesgo: 'CRITICO',
    blockedToday: 0,
  },
  {
    id: '6.4',
    sec: 'VI',
    title: 'Intermediario sin registro',
    desc: 'Cobrador cobra en su cuenta personal',
    articulo: 'Art 111 Bis',
    riesgo: 'ALTO',
    blockedToday: 1,
    lastBlock: '09:45',
  },
  {
    id: '7.1',
    sec: 'VII',
    title: 'Contradicción monto original',
    desc: 'Landing dice $5k, contrato $8.5k',
    articulo: 'Art 386 Fraude + LFPC 32',
    riesgo: 'CRITICO',
    blockedToday: 0,
  },
  {
    id: '7.2',
    sec: 'VII',
    title: 'Tasa engañosa',
    desc: 'Anuncio 0% pero CAT 450%',
    articulo: 'Art 32 LFPC Publicidad Engañosa',
    riesgo: 'CRITICO',
    blockedToday: 0,
  },
  {
    id: '7.3',
    sec: 'VII',
    title: 'Plazo fantasma',
    desc: 'Ofrece 30 días, CRM exige 7',
    articulo: 'Art 69 LFPC',
    riesgo: 'ALTO',
    blockedToday: 0,
  },
  {
    id: '7.4',
    sec: 'VII',
    title: 'Aval no informado',
    desc: 'Usa contactos como aval sin firmar',
    articulo: 'Art 16 Const + LFPDPPP',
    riesgo: 'CRITICO',
    blockedToday: 2,
    lastBlock: '12:00',
  },
  {
    id: '7.5',
    sec: 'VII',
    title: 'Penalización no pactada',
    desc: 'Cargo $200 por día extra no en contrato',
    articulo: 'Art 17 LFPC',
    riesgo: 'ALTO',
    blockedToday: 0,
  },
  {
    id: '7.6',
    sec: 'VII',
    title: 'Promesa de borrado Buró',
    desc: 'Te borramos si pagas hoy $2k extra',
    articulo: 'Art 386 + Ley Buró',
    riesgo: 'CRITICO',
    blockedToday: 1,
    lastBlock: '13:10',
  },
  {
    id: '8.1',
    sec: 'VIII',
    title: 'Monto contrato $8,500 vs CRM $12,000',
    desc: 'Comparador clave: inflación artificial de deuda',
    articulo: 'Art 386 Fraude - Eje Gravedad',
    riesgo: 'CRITICO',
    blockedToday: 8,
    lastBlock: '13:52',
  },
  {
    id: '8.2',
    sec: 'VIII',
    title: 'Interés contrato 0.8%/día vs CRM 2.5%/día',
    desc: 'Tasa alterada en CRM',
    articulo: 'Art 23 LCTC',
    riesgo: 'CRITICO',
    blockedToday: 4,
    lastBlock: '13:30',
  },
  {
    id: '8.3',
    sec: 'VIII',
    title: 'Fecha venc contrato 30 días vs CRM 7 días',
    desc: 'Acortan plazo para forzar mora',
    articulo: 'Art 386',
    riesgo: 'CRITICO',
    blockedToday: 3,
    lastBlock: '12:45',
  },
  {
    id: '8.4',
    sec: 'VIII',
    title: 'Plataforma pago contrato SPEI vs CRM OXXO persona física',
    desc: 'Desvío de fondos',
    articulo: 'Art 400 Bis',
    riesgo: 'CRITICO',
    blockedToday: 2,
    lastBlock: '11:15',
  },
  {
    id: '8.5',
    sec: 'VIII',
    title: 'Nombre beneficiario contrato Fintech SA vs CRM Juan P. López',
    desc: 'Cobro a persona física no facultada',
    articulo: 'Art 111 Bis + 400 Bis',
    riesgo: 'CRITICO',
    blockedToday: 5,
    lastBlock: '13:00',
  },
  {
    id: '8.6',
    sec: 'VIII',
    title: 'Consentimiento Aviso Privacidad SÍ vs CRM lo omite',
    desc: 'Tratamiento de datos sin base',
    articulo: 'LFPDPPP Art 16',
    riesgo: 'ALTO',
    blockedToday: 1,
    lastBlock: '08:45',
  },
  {
    id: '8.7',
    sec: 'VIII',
    title: 'Llamadas registradas 1 vs Real 4 (0:45, 6:58, 22:21, 23:10)',
    desc: 'Falsedad de declaraciones + violación horario',
    articulo: 'Art 284 Bis + NOM-184',
    riesgo: 'CRITICO',
    blockedToday: 9,
    lastBlock: '13:59',
  },
  {
    id: '8.8',
    sec: 'VIII',
    title: 'Monto pagado $4,850 no resta en CRM',
    desc: 'Pago no aplicado = fraude',
    articulo: 'Art 386 + 17 LFPC',
    riesgo: 'CRITICO',
    blockedToday: 6,
    lastBlock: '13:40',
  },
  {
    id: '8.9',
    sec: 'VIII',
    title: 'Contrato dice sin aval vs CRM usa 3 contactos',
    desc: 'Aval fantasma',
    articulo: 'Art 16 Const',
    riesgo: 'CRITICO',
    blockedToday: 2,
    lastBlock: '12:20',
  },
  {
    id: '8.10',
    sec: 'VIII',
    title: 'CAT contrato 120% vs Landing 15%',
    desc: 'Publicidad engañosa sistemática',
    articulo: 'Art 32 LFPC',
    riesgo: 'ALTO',
    blockedToday: 0,
  },
  {
    id: '8.11',
    sec: 'VIII',
    title: 'Comisión apertura $0 contrato vs $1,200 CRM',
    desc: 'Cargo no pactado',
    articulo: 'Art 17 LFPC + 386',
    riesgo: 'CRITICO',
    blockedToday: 3,
    lastBlock: '10:20',
  },
  {
    id: '8.12',
    sec: 'VIII',
    title: 'Penalización $0 vs CRM $2,800 por gestión',
    desc: 'Gestión extrajudicial no pactada',
    articulo: 'Art 72 LFPC',
    riesgo: 'CRITICO',
    blockedToday: 4,
    lastBlock: '13:15',
  },
];

const CASOS = [
  {
    id: 'CAS-8821',
    nombre: 'María G. López',
    dias: 3,
    monto: 4850,
    voluntad: 85,
    score: 92,
    canal: 'WhatsApp',
    tipo: 'E1',
    tel: '55****1234',
    estado: 'PERMITIDO',
    intento: 1,
  },
  {
    id: 'CAS-8822',
    nombre: 'Jorge R. Pérez',
    dias: 7,
    monto: 12000,
    voluntad: 40,
    score: 45,
    canal: 'SMS',
    tipo: 'E2',
    tel: '33****5432',
    estado: 'BLOQUEADO',
    intento: 4,
    bloqueo: 'Art 284 Bis - Max 3/día',
  },
  {
    id: 'CAS-8823',
    nombre: 'Ana K. Torres',
    dias: 1,
    monto: 8500,
    voluntad: 90,
    score: 88,
    canal: 'Llamada',
    tipo: 'E1',
    tel: '81****9876',
    estado: 'BLOQUEADO',
    intento: 1,
    bloqueo: 'NOM-184 - Fuera de 08:00-22:00 (intento 22:21)',
  },
  {
    id: 'CAS-8824',
    nombre: 'Roberto D. Silva',
    dias: 15,
    monto: 6700,
    voluntad: 20,
    score: 22,
    canal: 'WhatsApp',
    tipo: 'E3',
    tel: '56****3344',
    estado: 'BLOQUEADO',
    intento: 2,
    bloqueo: 'Art 386 Fraude - Monto contrato $8,500 vs CRM $12,000',
  },
  {
    id: 'CAS-8825',
    nombre: 'Sofía M. Ruiz',
    dias: 5,
    monto: 9200,
    voluntad: 70,
    score: 76,
    canal: 'SMS',
    tipo: 'E2',
    tel: '33****1122',
    estado: 'PERMITIDO',
    intento: 2,
  },
  {
    id: 'CAS-8826',
    nombre: 'Carlos V. Juárez',
    dias: 22,
    monto: 15000,
    voluntad: 10,
    score: 15,
    canal: 'WhatsApp',
    tipo: 'E3',
    tel: '55****8899',
    estado: 'BLOQUEADO',
    intento: 5,
    bloqueo: 'Art 390 Extorsión - Amenaza a contactos',
  },
];

const LEDGER = [
  {
    time: '14:00:05',
    caso: 'CAS-8822',
    tel: '33****5432',
    conducta: '2.8',
    canal: 'SMS',
    estado: 'BLOQUEADO',
    detalle: 'Max 3/día - 4to intento',
    hash: '0x7a1f9c...e3d1',
    prev: '0x9f3a2b...b2c1',
  },
  {
    time: '13:59:12',
    caso: 'CAS-8822',
    tel: '33****5432',
    conducta: '2.3',
    canal: 'SMS',
    estado: 'BLOQUEADO',
    detalle: 'Hostigamiento continuo',
    hash: '0x9f3a2b...b2c1',
    prev: '0x4c8e1a...a9f0',
  },
  {
    time: '13:58:44',
    caso: 'CAS-8824',
    tel: '56****3344',
    conducta: '8.1',
    canal: 'WhatsApp',
    estado: 'BLOQUEADO',
    detalle: '$8,500 vs $12,000',
    hash: '0x4c8e1a...a9f0',
    prev: '0x1b2d3c...f8e2',
  },
  {
    time: '13:55:33',
    caso: 'CAS-8826',
    tel: '55****8899',
    conducta: '4.4',
    canal: 'WhatsApp',
    estado: 'BLOQUEADO',
    detalle: 'Extorsión contactos',
    hash: '0x1b2d3c...f8e2',
    prev: '0x8e7f6a...c3b1',
  },
  {
    time: '13:52:10',
    caso: 'CAS-8821',
    tel: '55****1234',
    conducta: '-',
    canal: 'WhatsApp',
    estado: 'PERMITIDO',
    detalle: 'E1 - Voluntad 85% - 1er impacto 14:00',
    hash: '0x8e7f6a...c3b1',
    prev: '0x3a2b1c...d4e5',
  },
];

export default function ArkangelApp() {
  const [clock, setClock] = useState('--:--:-- MX');
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [openSections, setOpenSections] = useState(['II', 'VIII']);
  const ledgerRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const fmt = new Intl.DateTimeFormat('es-MX', {
        timeZone: 'America/Mexico_City',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setClock(`${fmt.format(new Date())} MX`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const totalBlocks = CONDUCTAS.reduce((a, b) => a + b.blockedToday, 0);
  const activeConducts = CONDUCTAS.filter((c) => c.blockedToday > 0).length;

  const toggle = (k) =>
    setOpenSections((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  const onConductClick = (c) => {
    setSelected(c);
    if (c.blockedToday > 0) {
      setToast({
        id: c.id,
        text: `Conducta ${c.id} bloqueada • ${c.articulo} • ${c.blockedToday} hoy`,
      });
      setTimeout(() => setToast(null), 3200);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#FFF7ED] antialiased rounded-[24px] overflow-hidden border border-white/10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
        .mono{font-family:'JetBrains Mono',monospace}
        @keyframes pulse-red{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.7)}50%{box-shadow:0 0 0 7px rgba(239,68,68,0)}}
        @keyframes pulse-green{0%,100%{box-shadow:0 0 0 0 rgba(18,183,106,.7)}50%{box-shadow:0 0 0 6px rgba(18,183,106,0)}}
        .pulse-red{animation:pulse-red 1.6s infinite} .pulse-green{animation:pulse-green 1.8s infinite}
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0A0A0F]/90 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 min-h-[64px] flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-white text-black grid place-items-center font-black text-[18px]">
              A
            </div>
            <span className="font-black text-[16px] sm:text-[18px] tracking-tight">ARKANGEL</span>
            <span className="hidden sm:inline-flex mono text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/15 tracking-widest">
              LEY COMO CÓDIGO • v2.0
            </span>
            <span className="mono text-[10px] px-2.5 py-1 rounded-full bg-[#F59E0B] text-black font-bold">
              <span className="sm:hidden">SIMULACIÓN</span>
              <span className="hidden sm:inline">SIMULACIÓN • SIN D1/R2 EN VIVO</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <div className="mono text-[12px] font-bold tracking-widest">{clock}</div>
              <div className="mono text-[10px] text-white/50">
                America/Mexico_City • NOM-184 08:00-22:00
              </div>
            </div>
            <div className="mono text-[10px] leading-tight text-right hidden sm:block">
              <div className="text-white/60">Propietaria IP</div>
              <div className="font-bold">Substrate Holdings LLC</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 bg-white/[0.02] h-[32px] flex items-center gap-3 px-6 mono text-[11px] text-white/50 overflow-x-auto whitespace-nowrap">
          <span className="text-white/80">SIMULACIÓN LOCAL •</span> Datos de ejemplo •{' '}
          <span className="text-[#F59E0B]">{CONDUCTAS.length} conductas ilustrativas •</span>{' '}
          <span className="text-[#12B76A]">{SECTIONS.length} secciones • 12 comparadores</span>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
        {/* STATUS */}
        <section>
          <div className="mb-4 rounded-[12px] border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-4 py-3 font-mono text-[11px] leading-relaxed text-[#FCD34D]">
            Demo interactiva con cifras y registros ficticios. No está conectada a sistemas de
            cobranza, D1 ni R2. Las referencias legales son ilustrativas y no constituyen asesoría
            legal.
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
            <h2 className="min-w-0 break-words font-black text-[18px] tracking-tight sm:text-[22px]">
              01 — ESTADO DE LA SIMULACIÓN
            </h2>
            <span className="mono text-[10px] text-white/40">DATOS LOCALES • {clock}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-[16px] bg-[#FFF7ED] text-black p-5 border relative overflow-hidden">
              <div className="mono text-[10px] tracking-[0.18em] text-black/50 flex justify-between">
                CRON JOBS • EJEMPLO DE UI{' '}
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] inline-block" />
              </div>
              <div className="mt-3 font-black text-[28px] leading-none">Horario demo</div>
              <div className="mono text-[12px] text-black/60 mt-1">Sin tareas programadas</div>
              <div className="mt-5 mono text-[11px] bg-black text-[#FFF7ED] rounded-[10px] p-3 space-y-1">
                <div className="flex justify-between">
                  <span>triggers/cron.ts</span>
                  <span className="text-[#F59E0B]">EJEMPLO</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>d1: arkangel_ledger</span>
                  <span>sin conexión</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>r2: evidence/</span>
                  <span>sin conexión</span>
                </div>
              </div>
            </div>
            <div className="rounded-[16px] bg-[#0A0A0F] border border-[#EF4444]/30 p-5">
              <div className="mono text-[10px] tracking-[0.18em] text-[#EF4444]">
                BLOQUEOS HOY • SEMÁFORO ROJO
              </div>
              <div className="mt-3 flex items-baseline gap-3">
                <div className="font-black text-[44px] leading-none text-[#EF4444]">
                  {totalBlocks}
                </div>
                <div className="mono text-[12px] text-white/60">
                  bloqueos
                  <br />
                  {activeConducts} conductas
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#EF4444]"
                    style={{
                      width: `${Math.min(100, (activeConducts / CONDUCTAS.length) * 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between mono text-[10px] mt-2 text-white/40">
                  <span>0</span>
                  <span>{CONDUCTAS.length} conductas de ejemplo</span>
                  <span>{CONDUCTAS.length}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {CONDUCTAS.filter((m) => m.blockedToday > 0)
                  .slice(0, 6)
                  .map((m) => (
                    <span
                      key={m.id}
                      className="mono text-[10px] px-2 py-1 rounded-full bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30"
                    >
                      {m.id} ×{m.blockedToday}
                    </span>
                  ))}
              </div>
            </div>
            <div className="rounded-[16px] bg-[#12121A] border border-white/10 p-5">
              <div className="mono text-[10px] tracking-[0.18em] text-white/50">
                LEDGER DE EJEMPLO • NO PERSISTENTE
              </div>
              <div className="mt-3 font-black text-[20px]">1,247 registros ficticios</div>
              <div className="mono text-[11px] text-white/50">
                vista ilustrativa • integridad no verificada
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                  <span className="text-white/70">Último hash</span>
                  <span className="ml-auto font-bold">0x9f3a...b2c1</span>
                </div>
                <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-[#12B76A] to-[#EF4444] relative">
                  <div className="absolute -top-1 left-[78%] w-2 h-2 rounded-full bg-[#12B76A] pulse-green" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                  <div className="rounded-[10px] bg-white/[0.04] border border-white/10 p-2.5">
                    <div className="mono text-[9px] text-white/40">SHA256</div>
                    <div className="mono text-[11px] font-bold mt-1">DEMO</div>
                  </div>
                  <div className="rounded-[10px] bg-white/[0.04] border border-white/10 p-2.5">
                    <div className="mono text-[9px] text-white/40">HASH_PREV</div>
                    <div className="mono text-[11px] font-bold mt-1">SIN VERIFICAR</div>
                  </div>
                  <div className="rounded-[10px] bg-[#12B76A]/15 border border-[#12B76A]/30 p-2.5">
                    <div className="mono text-[9px] text-[#12B76A]">VERIFICACIÓN</div>
                    <div className="mono text-[11px] font-bold mt-1 text-[#12B76A]">N/A</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAPA */}
        <section>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 mb-1">
            <h2 className="min-w-0 break-words font-black text-[20px] tracking-tight sm:text-[28px]">
              02 — MAPA DE CONDUCTAS • SEMÁFORO LEGAL
            </h2>
            <span className="mono text-[12px] px-2.5 py-1 rounded-full bg-[#FFF7ED] text-black font-bold">
              {CONDUCTAS.length} CONDUCTAS • {SECTIONS.length} SECCIONES
            </span>
          </div>
          <p className="mono text-[11px] text-white/40 mb-5">
            Ejemplos de controles preventivos; no representan un sistema conectado ni una revisión
            legal.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {SECTIONS.map((s) => {
              const conducts = CONDUCTAS.filter((c) => c.sec === s.key);
              const open = openSections.includes(s.key);
              const blocked = conducts.filter((c) => c.blockedToday > 0).length;
              const isGravity = s.key === 'VIII';
              return (
                <div
                  key={s.key}
                  className={`rounded-[18px] border overflow-hidden ${isGravity ? 'border-[#EF4444] bg-[#EF4444]/[0.06]' : 'border-white/10 bg-[#12121A]'}`}
                >
                  <button
                    onClick={() => toggle(s.key)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-[8px] grid place-items-center mono text-[12px] font-black ${isGravity ? 'bg-[#EF4444] text-white' : 'bg-white text-black'}`}
                      >
                        {s.key}
                      </div>
                      <div>
                        <div
                          className={`font-black text-[16px] leading-tight ${isGravity ? 'text-[#EF4444]' : ''}`}
                        >
                          {s.label}{' '}
                          <span className="mono text-[11px] font-medium text-white/40">
                            [{s.range}]
                          </span>
                        </div>
                        {isGravity && (
                          <div className="mono text-[10px] text-[#EF4444] mt-1">
                            EJE DE GRAVEDAD — Contrato vs CRM • 12 comparadores ilustrativos
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`mono text-[10px] px-2 py-1 rounded-full ${blocked ? 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30' : 'bg-[#12B76A]/15 text-[#12B76A] border border-[#12B76A]/30'}`}
                      >
                        {blocked ? `${blocked} BLOQUEADAS HOY` : 'SIN BLOQUEOS'}
                      </span>
                      <span className="mono text-[10px] text-white/30">
                        {conducts.length} conductas
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full border border-white/10 grid place-items-center transition ${open ? 'rotate-180 bg-white/10' : ''}`}
                      >
                        ⌄
                      </div>
                    </div>
                  </button>
                  {open && (
                    <div
                      className={`px-5 pb-5 border-t ${isGravity ? 'border-[#EF4444]/20' : 'border-white/5'} pt-4`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                        {conducts.map((c) => {
                          const bad = c.blockedToday > 0;
                          return (
                            <button
                              key={c.id}
                              onClick={() => onConductClick(c)}
                              className={`text-left rounded-[12px] border p-3 transition-all hover:scale-[1.01] relative overflow-hidden ${bad ? 'bg-[#EF4444]/10 border-[#EF4444]/40' : 'bg-[#FFF7ED] border-black/5 text-black'}`}
                            >
                              {bad && (
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#EF4444]" />
                              )}
                              <div className="flex items-center justify-between">
                                <span
                                  className={`mono text-[11px] font-black px-2 py-0.5 rounded-full ${bad ? 'bg-[#EF4444] text-white pulse-red' : 'bg-[#12B76A] text-black'}`}
                                >
                                  {c.id}
                                </span>
                                <span
                                  className={`mono text-[9px] px-1.5 py-0.5 rounded-full border ${c.riesgo === 'CRITICO' ? 'border-[#EF4444] text-[#EF4444]' : c.riesgo === 'ALTO' ? 'border-[#F59E0B] text-[#F59E0B]' : 'border-black/20 text-black/50'}`}
                                >
                                  {c.riesgo}
                                </span>
                              </div>
                              <div
                                className={`mt-2 mono text-[11px] font-bold leading-tight line-clamp-2 ${bad ? 'text-[#FFF7ED]' : 'text-black'}`}
                              >
                                {c.title}
                              </div>
                              <div
                                className={`mt-1 mono text-[10px] leading-snug line-clamp-2 ${bad ? 'text-white/50' : 'text-black/60'}`}
                              >
                                {c.desc}
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <span
                                  className={`mono text-[9px] px-2 py-1 rounded-full ${bad ? 'bg-white/10 text-white/60' : 'bg-black/5 text-black/60'}`}
                                >
                                  {c.articulo}
                                </span>
                                {bad ? (
                                  <span className="mono text-[10px] font-bold text-[#EF4444]">
                                    ×{c.blockedToday} hoy • {c.lastBlock}
                                  </span>
                                ) : (
                                  <span className="mono text-[10px] text-[#12B76A] font-bold">
                                    ● EJEMPLO
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CASOS */}
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <div>
              <h2 className="font-black text-[22px]">
                03 — CASOS FICTICIOS • FLUJOS DE DEMOSTRACIÓN
              </h2>
              <p className="mono text-[11px] text-white/40 mt-1">
                Los estados y bloqueos son datos de muestra, no acciones ejecutadas por Arkangel.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="mono text-[10px] px-2.5 py-1 rounded-full bg-[#12B76A] text-black font-bold">
                {CASOS.filter((m) => m.estado === 'PERMITIDO').length} PERMITIDOS
              </span>
              <span className="mono text-[10px] px-2.5 py-1 rounded-full bg-[#EF4444] text-white font-bold">
                {CASOS.filter((m) => m.estado === 'BLOQUEADO').length} BLOQUEADOS
              </span>
            </div>
          </div>
          <div className="rounded-[16px] border border-white/10 bg-[#12121A] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full mono text-[11px]">
                <thead className="bg-white/[0.03] border-b border-white/10 text-white/40 text-[10px] tracking-widest">
                  <tr>
                    <th className="text-left p-3 font-medium">CASO</th>
                    <th className="text-left p-3">DÍAS / MONTO</th>
                    <th className="text-left p-3">VOLUNTAD / SCORE</th>
                    <th className="text-left p-3">CANAL / TIPO</th>
                    <th className="text-left p-3">ESTADO COMPLIANCE</th>
                    <th className="text-left p-3">LEDGER</th>
                  </tr>
                </thead>
                <tbody>
                  {CASOS.map((m) => (
                    <tr key={m.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-3">
                        <div className="font-bold text-[#FFF7ED]">{m.nombre}</div>
                        <div className="text-white/40 text-[10px]">
                          {m.id} • {m.tel}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-white/80">{m.dias} días</div>
                        <div className="font-bold">${m.monto.toLocaleString()}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-[#12B76A]"
                              style={{ width: `${m.voluntad}%` }}
                            />
                          </div>
                          <span>{m.voluntad}%</span>
                        </div>
                        <div className="text-white/40">score {m.score}</div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] border ${m.canal === 'WhatsApp' ? 'bg-[#12B76A]/10 text-[#12B76A] border-[#12B76A]/20' : m.canal === 'SMS' ? 'bg-white/10 text-white/70 border-white/10' : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'}`}
                        >
                          {m.canal}
                        </span>
                        <span className="ml-1 text-white/30">
                          {m.tipo} • intento {m.intento}
                        </span>
                      </td>
                      <td className="p-3 max-w-[280px]">
                        {m.estado === 'PERMITIDO' ? (
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#12B76A] pulse-green" />
                            <span className="text-[#12B76A] font-bold">
                              PERMITIDO — {m.tipo} • Dentro de horario y límites
                            </span>
                          </div>
                        ) : (
                          <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-[8px] px-2.5 py-1.5">
                            <div className="text-[#EF4444] font-bold flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-[#EF4444] text-white grid place-items-center text-[8px]">
                                !
                              </span>{' '}
                              BLOQUEADO
                            </div>
                            <div className="text-[#FFF7ED] mt-1 leading-tight">{m.bloqueo}</div>
                            <div className="text-white/40 text-[9px] mt-1">
                              Hash logged • Prueba de inocencia generada
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => ledgerRef.current?.scrollIntoView({ behavior: 'smooth' })}
                          className="px-2.5 py-1 rounded-full bg-white text-black font-bold text-[10px] hover:bg-[#FFF7ED]"
                        >
                          Ver Ledger →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* LEDGER */}
        <section ref={ledgerRef}>
          <div className="flex items-baseline gap-3 mb-4">
            <h2 className="font-black text-[22px]">04 — LEDGER DE MUESTRA • DATOS FICTICIOS</h2>
            <span className="mono text-[10px] px-2 py-1 rounded-full bg-white/10 border border-white/15">
              SIN D1 • SIN VERIFICACIÓN CRIPTOGRÁFICA
            </span>
          </div>
          <div className="rounded-[16px] border border-white/10 bg-[#0E0E14] overflow-hidden">
            <div className="bg-[#12121A] border-b border-white/10 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A]" />
                </div>
                <span className="mono text-[11px] text-white/50 ml-2">
                  ledger de ejemplo — registros ficticios — integridad no verificada
                </span>
              </div>
              <span className="mono text-[10px] text-[#F59E0B]">● DEMO</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full mono text-[11px]">
                <thead className="text-white/30 text-[10px] tracking-widest border-b border-white/5">
                  <tr>
                    <th className="text-left p-3 font-medium">HORA MX</th>
                    <th className="text-left p-3">CASO / TEL</th>
                    <th className="text-left p-3">CONDUCTA</th>
                    <th className="text-left p-3">CANAL / ESTADO</th>
                    <th className="text-left p-3">RESPUESTA</th>
                    <th className="text-left p-3">HASH / PREV</th>
                  </tr>
                </thead>
                <tbody>
                  {LEDGER.map((m, i) => (
                    <tr
                      key={i}
                      className={`border-b border-white/[0.03] ${m.estado === 'BLOQUEADO' ? 'bg-[#EF4444]/[0.03]' : ''}`}
                    >
                      <td className="p-3 text-white/70">{m.time}</td>
                      <td className="p-3">
                        <span className="font-bold text-[#FFF7ED]">{m.caso}</span>{' '}
                        <span className="text-white/40">{m.tel}</span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full font-bold ${m.conducta === '-' ? 'bg-[#12B76A]/15 text-[#12B76A] border border-[#12B76A]/30' : 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'}`}
                        >
                          {m.conducta}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-white/60">{m.canal}</span>{' '}
                        <span
                          className={`ml-1 font-bold ${m.estado === 'BLOQUEADO' ? 'text-[#EF4444]' : 'text-[#12B76A]'}`}
                        >
                          {m.estado}
                        </span>
                      </td>
                      <td className="p-3 text-white/60 max-w-[220px] truncate">{m.detalle}</td>
                      <td className="p-3">
                        <div className="text-[10px] leading-tight">
                          <div className="text-[#12B76A]">{m.hash}</div>
                          <div className="text-white/30">prev {m.prev}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 bg-[#FFF7ED] text-black flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center font-black text-[14px] shrink-0">
                !
              </div>
              <div className="mono text-[11px] leading-relaxed">
                <span className="font-black">
                  Ledger ilustrativo; no hay conexión a D1 ni persistencia.
                </span>{' '}
                Los hashes y estados se muestran como datos de ejemplo y no constituyen evidencia
                verificable ni garantizan un resultado legal.{' '}
                <span className="bg-black text-[#FFF7ED] px-1.5 py-0.5 rounded">
                  Ley como código ejecutable.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="rounded-[20px] bg-[#FFF7ED] text-black p-10 border border-black/5 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="mono text-[10px] tracking-[0.2em] text-black/40">
                  05 — FILOSOFÍA • LEY COMO CÓDIGO EJECUTABLE
                </div>
                <h3 className="font-black text-[40px] leading-[0.9] tracking-tight mt-3">
                  Landings son volumen.
                  <br />
                  Arkangel es el moat.
                </h3>
                <p className="mono text-[15px] leading-relaxed mt-5 max-w-[60ch] text-black/70">
                  Concepto de producto de{' '}
                  <span className="font-black text-black">Substrate Holdings LLC</span>. No es un
                  servicio de cobranza ni asesoría legal y no promete inmunidad jurídica ni
                  resultados legales. El demo ilustra flujos hipotéticos de validación y bloqueo
                  preventivo.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-[12px] border border-black/10 p-3">
                    <div className="mono text-[10px] text-black/40">MODELO</div>
                    <div className="mono text-[12px] font-black mt-1">
                      Arquitectura propuesta • integración no implementada
                    </div>
                  </div>
                  <div className="rounded-[12px] border border-black/10 p-3">
                    <div className="mono text-[10px] text-black/40">MOAT</div>
                    <div className="mono text-[12px] font-black mt-1">
                      Reglas de muestra sujetas a revisión profesional
                    </div>
                  </div>
                  <div className="rounded-[12px] border border-black/10 p-3 bg-black text-[#FFF7ED]">
                    <div className="mono text-[10px] text-white/50">LEY</div>
                    <div className="mono text-[12px] font-black mt-1">
                      Art 284 Bis • 386 • 178 Bis • NOM-184
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-[340px] w-full shrink-0">
                <div className="rounded-[16px] bg-black text-[#FFF7ED] p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-[12px] bg-white/10 border border-white/20 grid place-items-center font-black text-[20px]">
                      A
                    </div>
                    <div>
                      <div className="font-black text-[14px]">Ley como Código Ejecutable</div>
                      <div className="mono text-[10px] text-white/50 mt-1">
                        El contrato es la verdad. El CRM debe reflejarlo.
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 mono text-[11px] leading-relaxed bg-white/[0.06] rounded-[10px] p-3 border border-white/10">
                    <span className="text-[#EF4444] font-bold">EJEMPLO:</span> Una posible
                    implementación podría evaluar la conducta 2.8 (desfase entre CRM y realidad)
                    antes de un envío. Esta simulación no bloquea envíos ni genera o almacena
                    evidencia.
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="mono text-[9px] px-2 py-1 rounded-full bg-[#EF4444] text-white font-bold">
                      BLOQUEO SIMULADO
                    </span>
                    <span className="mono text-[9px] px-2 py-1 rounded-full bg-white/10 text-white/60 border border-white/10">
                      HASH DE EJEMPLO
                    </span>
                  </div>
                </div>
                <div className="mt-4 rounded-[12px] bg-[#12B76A] text-black p-3 flex items-center justify-between">
                  <span className="mono text-[11px] font-black">ARKANGEL • SIMULACIÓN</span>
                  <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mono text-[10px] text-white/30 flex flex-wrap gap-4 justify-between border-t border-white/5 pt-6 pb-2">
          <span>© Substrate Holdings LLC • Arkangel • Simulación local • Sin conexión a D1/R2</span>
          <span className="text-white/50">
            {CONDUCTAS.length} conductas de ejemplo • {SECTIONS.length} secciones • 12 comparadores
            ilustrativos
          </span>
        </footer>
      </main>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative max-h-[90vh] w-full max-w-[560px] overflow-x-hidden overflow-y-auto rounded-[18px] border border-black/10 bg-[#FFF7ED] text-black shadow-2xl">
            <div
              className={`h-1.5 w-full ${selected.blockedToday > 0 ? 'bg-[#EF4444]' : 'bg-[#12B76A]'}`}
            />
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`mono text-[12px] font-black px-2.5 py-1 rounded-full ${selected.blockedToday > 0 ? 'bg-[#EF4444] text-white pulse-red' : 'bg-[#12B76A] text-black'}`}
                  >
                    {selected.id}
                  </span>
                  <span
                    className={`mono text-[10px] px-2 py-1 rounded-full border ${selected.riesgo === 'CRITICO' ? 'border-[#EF4444] text-[#EF4444]' : selected.riesgo === 'ALTO' ? 'border-[#F59E0B] text-[#F59E0B]' : 'border-black/20 text-black/50'}`}
                  >
                    {selected.riesgo}
                  </span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full bg-black/5 grid place-items-center hover:bg-black/10"
                >
                  ✕
                </button>
              </div>
              <h3 className="font-black text-[20px] leading-tight mt-4">{selected.title}</h3>
              <p className="mono text-[13px] leading-relaxed mt-2 text-black/70">{selected.desc}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-[12px] bg-black text-[#FFF7ED] p-3">
                  <div className="mono text-[9px] text-white/40"> REFERENCIA LEGAL ILUSTRATIVA</div>
                  <div className="mono text-[12px] font-bold mt-1">{selected.articulo}</div>
                </div>
                <div className="rounded-[12px] bg-white border border-black/10 p-3">
                  <div className="mono text-[9px] text-black/40">BLOQUEOS HOY</div>
                  <div className="mono text-[18px] font-black mt-1">
                    {selected.blockedToday} × — {selected.lastBlock ?? 'sin bloqueos'}
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-[12px] bg-[#0A0A0F] text-[#FFF7ED] p-4 mono text-[11px] leading-relaxed">
                <div className="text-[#12B76A] font-bold">FLUJO DEMO ILUSTRATIVO:</div>
                <div className="mt-2 text-white/70">
                  {selected.sec === 'II'
                    ? 'En una posible implementación, un servicio podría revisar límites de frecuencia, horario, lenguaje y consentimiento antes del envío. Aquí solo se muestra un ejemplo; no se intercepta ni se envía ningún mensaje.'
                    : selected.sec === 'VIII'
                      ? 'Un comparador podría contrastar contrato y CRM para señalar diferencias. Esta vista usa cifras ficticias; no lee contratos, no bloquea operaciones y no genera evidencia verificable.'
                      : 'Una implementación podría validar estructura, dominios y consentimiento. Este prototipo solo ilustra el flujo y no evalúa cumplimiento ni genera una prueba legal.'}
                </div>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 rounded-full bg-[#EF4444] text-white text-[10px] font-bold">
                    BLOQUEO
                  </span>
                  <span className="text-white/40">→</span>
                  <span className="px-2 py-1 rounded-full bg-white/10 border border-white/15 text-[10px]">
                    HASH SHA256
                  </span>
                  <span className="text-white/40">→</span>
                  <span className="px-2 py-1 rounded-full bg-[#12B76A]/20 text-[#12B76A] border border-[#12B76A]/30 text-[10px] font-bold">
                    EVENTO DEMO
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setToast({
                      id: selected.id,
                      text: `Bloqueo simulado • Conducta ${selected.id} • ${selected.articulo}`,
                    });
                    setTimeout(() => setToast(null), 3000);
                    setSelected(null);
                  }}
                  className="flex-1 h-11 rounded-full bg-black text-white mono text-[12px] font-bold hover:bg-black/90"
                >
                  Simular alerta
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="h-11 px-5 rounded-full border border-black/15 mono text-[12px] font-bold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-4 right-4 z-[60] animate-[slideIn_0.3s_ease]">
          <div className="rounded-[14px] bg-[#FFF7ED] text-black border border-black/10 shadow-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-[10px] bg-black text-white grid place-items-center font-black text-[12px] shrink-0">
              {toast.id}
            </div>
            <div className="mono text-[11px] leading-tight">{toast.text}</div>
            <div className="w-2 h-2 rounded-full bg-[#EF4444] pulse-red shrink-0" />
          </div>
        </div>
      )}
    </div>
  );
}
