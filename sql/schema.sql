-- Apply with: npx wrangler d1 execute ark-fiscal-db --file=./sql/schema.sql --remote
-- Local dev:  npx wrangler d1 execute ark-fiscal-db --file=./sql/schema.sql --local

-- ============================================================================
-- ARK SYSTEMS - Base de Conocimiento (Knowledge Base) para Noah AI Assistant
-- ============================================================================

DROP TABLE IF EXISTS knowledge_base;

CREATE TABLE IF NOT EXISTS knowledge_base (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    line TEXT NOT NULL DEFAULT 'legal',   -- 'legal', 'commerce', 'lab'
    context TEXT NOT NULL,                -- Identificador del tab/módulo UI
    topic TEXT NOT NULL,                  -- Subtema dentro del contexto
    answer TEXT NOT NULL,                 -- Contenido pre-aprobado para RAG-lite
    legal_reference TEXT DEFAULT '',      -- Citaciones de artículos o normativas
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_knowledge_base_line_context ON knowledge_base(line, context);

-- ============================================================================
-- CHAT LOGS - Telemetría de conversaciones para auditoría y mejora
-- ============================================================================

CREATE TABLE IF NOT EXISTS chat_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    line TEXT NOT NULL,              -- 'legal' | 'commerce' | 'lab'
    context TEXT NOT NULL,           -- 'fiscal' | 'pld' | etc.
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    model TEXT NOT NULL,
    source TEXT NOT NULL,            -- 'kb' | 'llm' | 'fallback'
    pld_alert INTEGER DEFAULT 0,
    latency_ms INTEGER,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_chat_logs_session ON chat_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_logs_created ON chat_logs(created_at DESC);

-- ============================================================================
-- SEED DATA: LINEA LEGAL
-- Contextos: cumplimiento, fiscal, pld, cripto, expediente, soporte
-- ============================================================================

-- ----------------------------------------------------------------------------
-- LEGAL: Fiscal
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'legal',
    'fiscal',
    'ISR Personas Morales - Tasa y Pagos Provisionales',
    'Las personas morales que tributan bajo el régimen general deben aplicar la tasa del 30% sobre el resultado fiscal determinado al final del ejercicio. Asimismo, tienen la obligación de efectuar pagos provisionales mensuales a cuenta del impuesto del ejercicio a más tardar el día 17 del mes posterior, calculados con base en el coeficiente de utilidad determinado a partir del último ejercicio fiscal.',
    'Ley del Impuesto sobre la Renta (LISR), Artículos 9 y 14'
),
(
    'legal',
    'fiscal',
    'ISR Personas Físicas con Actividades Profesionales y Empresariales',
    'Las personas físicas que perciban ingresos por la prestación de servicios profesionales independientes o actividades empresariales deben calcular y enterar pagos provisionales mensuales a cuenta del impuesto anual. La base se determina restando las deducciones autorizadas efectivamente pagadas de los ingresos acumulables efectivamente cobrados.',
    'Ley del Impuesto sobre la Renta (LISR), Artículo 106'
),
(
    'legal',
    'fiscal',
    'IVA - Causación y Requisitos para el Acreditamiento',
    'El Impuesto al Valor Agregado grava a la tasa general del 16% la enajenación de bienes, prestación de servicios independientes, otorgamiento de uso o goce temporal y la importación en territorio nacional. Para que el IVA trasladado sea acreditable, debe corresponder a bienes o servicios estrictamente indispensables deducibles para ISR, y el impuesto debe haber sido efectivamente pagado y amparado por un CFDI vigente.',
    'Ley del Impuesto al Valor Agregado (LIVA), Artículos 1 y 5'
),
(
    'legal',
    'fiscal',
    'CFDI Versión 4.0 - Requisitos Obligatorios y Validación',
    'A partir de la entrada en vigor obligatoria del CFDI 4.0, es imperativo que los comprobantes incluyan de manera exacta el RFC, Nombre o Razón Social (sin régimen societario), Código Postal del domicilio fiscal del receptor y su Régimen Fiscal correspondiente, además del Uso de CFDI. Toda discrepancia con la Constancia de Situación Fiscal (CSF) genera rechazo inmediato por parte de los PACs y del SAT.',
    'Código Fiscal de la Federación (CFF), Artículo 29-A; Reglas RMF vigentes'
),
(
    'legal',
    'fiscal',
    'Declaración Anual y Conciliación Contable-Fiscal',
    'Las personas morales deben presentar su declaración anual dentro de los tres meses siguientes al cierre del ejercicio fiscal (a más tardar el 31 de marzo). Se requiere presentar estados financieros básicos, conciliación contable-fiscal, desglose del coeficiente de utilidad y determinación de la CUFIN y CUCA.',
    'Código Fiscal de la Federación (CFF), Artículo 32; LISR Artículo 9'
);

-- ----------------------------------------------------------------------------
-- LEGAL: PLD (Prevención de Lavado de Dinero)
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'legal',
    'pld',
    'Identificación de Actividades Vulnerables y Umbrales',
    'El artículo 17 de la LFPIORPI cataloga las actividades vulnerables sujetas a obligaciones PLD (inmuebles, metales, donativos, mutuo/crédito, activos virtuales, blindaje, entre otros). Quienes las realicen deben identificar a sus clientes y beneficiarios controladores mediante expedientes únicos, integrando identificación oficial, comprobante de domicilio y CURP/RFC.',
    'Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita (LFPIORPI), Artículo 17'
),
(
    'legal',
    'pld',
    'Restricciones y Prohibición de Efectivo (>100k / Umbrales UMA)',
    'Está legalmente prohibido liquidar o pagar actos u operaciones mediante el uso de monedas y billetes en moneda nacional o divisas y metales preciosos cuando superen los umbrales fijados en UMAS: constitución de derechos reales sobre inmuebles (8,025 UMAs), adquisición de vehículos (3,210 UMAs), metales o joyería (3,210 UMAs). Toda transacción en efectivo relevante debe ser documentada estrictamente y cotejada contra los límites legales.',
    'LFPIORPI, Artículo 32; Reglas de Carácter General de la UIF'
),
(
    'legal',
    'pld',
    'Avisos e Informes a la Unidad de Inteligencia Financiera (UIF)',
    'Los sujetos obligados deben presentar los avisos correspondientes a través del Portal de Prevención de Lavado de Dinero (SPPLD) a más tardar el día 17 del mes inmediato posterior a aquel en que se realizó la operación que rebase el umbral de aviso. Si en el mes no se realizaron operaciones objeto de aviso, se debe enviar el informe en ceros (informe de no operaciones).',
    'LFPIORPI, Artículos 17 y 23'
),
(
    'legal',
    'pld',
    'Construcción y Monitoreo del Perfil Transaccional',
    'Es obligatorio establecer un perfil transaccional por cliente basado en el origen y destino de recursos, ocupación o giro mercantil, frecuencia y montos promedio. Cualquier desviación notable frente al perfil histórico debe detonar un proceso de debida diligencia reforzada (EDD) y análisis de posibles operaciones inusuales o preocupantes.',
    'Disposiciones de Carácter General CNBV / UIF en materia de PLD/FT'
);

-- ----------------------------------------------------------------------------
-- LEGAL: Cumplimiento (Compliance / Gobierno Corporativo)
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'legal',
    'cumplimiento',
    'Obligaciones del Oficial de Cumplimiento (Compliance Officer)',
    'El Oficial de Cumplimiento debe estar debidamente certificado ante la CNBV (en entidades financieras o supervisadas) y gozar de independencia funcional respecto a las áreas de negocio y operativas. Es responsable de diseñar, implementar y vigilar el Manual de Cumplimiento, gestionar alertas, coordinar auditorías anuales y actuar como enlace con la autoridad reguladora.',
    'Disposiciones de la CNBV aplicables a Entidades Financieras; Lineamientos UIF'
),
(
    'legal',
    'cumplimiento',
    'Políticas KYC / AML y Debida Diligencia (Due Diligence)',
    'Los programas de Conocimiento del Cliente (Know Your Customer) exigen verificar la identidad del cliente previo al inicio de relaciones comerciales. Se debe clasificar a los clientes en niveles de riesgo (Bajo, Medio, Alto) y aplicar debida diligencia ampliada a Personas Políticamente Expuestas (PEPs) tanto nacionales como extranjeras.',
    'Recomendaciones del GAFI / FATF (Recomendaciones 10 y 12); Normativa CNBV'
),
(
    'legal',
    'cumplimiento',
    'Auditoría y Supervisión Regulatoria CNBV',
    'Las entidades supervisadas deben someterse anualmente a una evaluación de auditoría independiente que dictamine el grado de cumplimiento de los sistemas automatizados, controles internos y políticas PLD/FT. Dicho informe debe remitirse a la Comisión Nacional Bancaria y de Valores dentro de los plazos normativos establecidos.',
    'Disposiciones de Carácter General emitidas por la CNBV en materia de Auditoría PLD/FT'
);

-- ----------------------------------------------------------------------------
-- LEGAL: Cripto y Activos Virtuales
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'legal',
    'cripto',
    'Régimen de Activos Virtuales y Ley Fintech',
    'En México, el Artículo 30 de la Ley para Regular las Instituciones de Tecnología Financiera define activo virtual como la representación de valor registrada electrónicamente y utilizada por el público como medio de pago. Banco de México (Banxico) determina mediante Circulares cuáles activos virtuales pueden operar las Instituciones de Fondos de Pago Electrónico (IFPE) e Instituciones de Financiamiento Colectivo (IFC).',
    'Ley Fintech, Artículo 30; Circular 4/2019 de Banco de México'
),
(
    'legal',
    'cripto',
    'Obligaciones VASP / Proveedores de Servicios de Activos Virtuales',
    'El ofrecimiento habitual y profesional de intercambio o compraventa de activos virtuales por plataformas independientes constituye actividad vulnerable bajo la fracción XVI del Artículo 17 de la LFPIORPI. Requiere alta en el padrón del SAT, integración de expedientes de identificación KYC, umbrales de identificación y reporte de avisos a la UIF a partir de 645 UMAs.',
    'LFPIORPI, Artículo 17, Fracción XVI; Criterios UIF/SAT sobre VASPs'
),
(
    'legal',
    'cripto',
    'Tratamiento Fiscal de Ganancias en Criptoactivos (SAT)',
    'La enajenación de activos virtuales genera ingresos gravables para ISR. Para personas físicas, se asimila a la enajenación de bienes muebles (Título IV, Capítulo IV LISR) o actividades empresariales/plataformas tecnológicas según la habitualidad. Se debe determinar ganancia gravable restando el costo comprobado de adquisición debidamente documentado en moneda nacional.',
    'LISR Artículos 126 y correlativos; Criterios no vinculativos del SAT'
);

-- ----------------------------------------------------------------------------
-- LEGAL: Expediente Digital y Archivo Fiscal
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'legal',
    'expediente',
    'Plazos de Conservación de Contabilidad y Documentos',
    'La contabilidad y la documentación comprobatoria deben conservarse durante un plazo general de cinco años a partir de la fecha en que se presentaron o debieron haberse presentado las declaraciones. Para actos cuyos efectos fiscales se prolonguen en el tiempo (actas de asamblea, aumentos de capital, pérdidas fiscales pendientes de amortizar), el plazo se computa a partir del último ejercicio en que surtieron efectos.',
    'Código Fiscal de la Federación (CFF), Artículo 30'
),
(
    'legal',
    'expediente',
    'Firma Electrónica Avanzada (e.firma) y Validez Legal',
    'La firma electrónica avanzada (e.firma) amparada por un certificado digital vigente expedido por el SAT o un Prestador de Servicios de Certificación (PSC) acreditado produce los mismos efectos jurídicos que la firma autógrafa, garantizando integridad, autoría, confidencialidad y no repudio.',
    'CFF Artículo 17-D; Ley de Firma Electrónica Avanzada (LFEA); Código de Comercio Art. 89'
),
(
    'legal',
    'expediente',
    'Constancia de Situación Fiscal y Actualización de Datos',
    'Los contribuyentes están obligados a mantener actualizada su información en el Registro Federal de Contribuyentes (RFC), informando todo cambio de domicilio fiscal, apertura de sucursales o modificación de actividades económicas preponderantes dentro de los 30 días posteriores al suceso.',
    'CFF Artículo 27; Reglamento del Código Fiscal de la Federación'
);

-- ----------------------------------------------------------------------------
-- LEGAL: Soporte Legal / Plataforma
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'legal',
    'soporte',
    'Alcance de la Asistencia de Noah en Materia Legal',
    'Noah es un copiloto de inteligencia artificial diseñado para orientar, referenciar y agilizar la consulta normativa fiscal, societaria y de PLD. Sus respuestas constituyen guías de referencia técnica y operativa, pero no reemplazan el dictamen formal ni la asesoría legal personalizada de un abogado o contador público certificado.',
    'Términos y Condiciones de ARK SYSTEMS Legal Cloud'
),
(
    'legal',
    'soporte',
    'Privacidad de Datos y Confidencialidad de Documentos',
    'Toda la documentación cargada en los módulos de Expediente y Cumplimiento está encriptada en reposo y en tránsito. ARK SYSTEMS no comparte información corporativa ni expedientes de clientes con terceros sin consentimiento expreso, en estricto cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
    'LFPDPPP Artículos 15, 16 y 21'
),
(
    'legal',
    'soporte',
    'Reporte de Inconsistencias o Cambios Normativos',
    'Si detecta una discrepancia entre una disposición recién publicada en el Diario Oficial de la Federación (DOF) y los criterios sugeridos por el asistente, puede levantar un ticket de revisión normativa en el menú de soporte o notificar al equipo jurídico para actualización de la base de conocimiento.',
    'Manual Operativo ARK Legal'
);

-- ============================================================================
-- SEED DATA: LINEA COMMERCE
-- Contextos: productos, pagos, envios, soporte
-- ============================================================================

-- ----------------------------------------------------------------------------
-- COMMERCE: Productos
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'commerce',
    'productos',
    'Estructura de Catálogo, SKUs y Variantes',
    'El catálogo centralizado de ARK Commerce permite gestionar productos simples y configurables con variantes (talla, color, material, presentación). Cada variante cuenta con su propio SKU, código de barras (EAN/UPC) y control individual de existencias y costos unitarios.',
    'ARK Commerce Product Engine v2'
),
(
    'commerce',
    'productos',
    'Gestión de Inventario y Alertas de Stock Mínimo',
    'El sistema descuenta inventario en tiempo real al confirmarse la orden de compra. Se pueden configurar umbrales de stock mínimo por sucursal o almacén centralizado para disparar alertas automáticas de reorden y prevenir ventas en descubierto (backorders no planificados).',
    'Guía de Operaciones de Inventario'
),
(
    'commerce',
    'productos',
    'Categorización, Atributos y SEO de Fichas',
    'Cada ficha de producto incluye campos optimizados para motores de búsqueda (meta title, slug canónico, descripción enriquecida, etiquetas OpenGraph) y taxonomías jerárquicas multinivel para facilitar la navegación y filtros por facetas en el storefront.',
    'ARK SEO Commerce Best Practices'
);

-- ----------------------------------------------------------------------------
-- COMMERCE: Pagos
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'commerce',
    'pagos',
    'Integración con Pasarelas de Pago (Stripe / Openpay)',
    'ARK Commerce soporta pagos con tarjeta de crédito y débito a través de Stripe y Openpay con tokenización segura PCI-DSS Nivel 1 y autenticación 3D Secure (3DS 2.0) para mitigar riesgos de contracargo y fraude.',
    'Estándar PCI-DSS v4.0'
),
(
    'commerce',
    'pagos',
    'Transferencias SPEI y Conciliación Automatizada',
    'Los cobros vía SPEI generan referencias bancarias únicas CLABE interbancaria (STP / Openpay / Banco). Al recibir el webhook de dispersión de fondos, el estado de la orden pasa automáticamente a Pagado sin intervención manual de tesorería.',
    'Reglas del Sistema de Pagos Electrónicos Interbancarios (SPEI)'
),
(
    'commerce',
    'pagos',
    'Pagos en Efectivo en Tiendas de Conveniencia (OXXO Pay)',
    'Las órdenes generadas con pago en efectivo cuentan con un código de barras digital y número de referencia OXXO con vigencia configurable (típicamente 24 a 72 horas). La orden queda en estado Pendiente hasta la notificación del pago.',
    'Documentación de Pasarelas OXXO Pay'
);

-- ----------------------------------------------------------------------------
-- COMMERCE: Envíos
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'commerce',
    'envios',
    'Integración Logística y Generación de Guías',
    'La plataforma se conecta vía API con agregadores logísticos (Envíoclick, Skydropx, DHL, FedEx, Estafeta) para cotizar tarifas dinámicas en el checkout y generar automáticamente las guías de rastreo con código QR.',
    'Módulo ARK Shipping Integration'
),
(
    'commerce',
    'envios',
    'Tiempos de Entrega y Cobertura Nacional',
    'Los envíos estándar a nivel nacional tienen un tiempo de entrega estimado de 2 a 5 días hábiles, mientras que los envíos express se entregan al siguiente día hábil en zonas metropolitanas. Zonas extendidas pueden requerir de 2 a 4 días adicionales.',
    'Políticas de Logística y Cobertura'
),
(
    'commerce',
    'envios',
    'Rastreo y Notificaciones Transaccionales al Cliente',
    'Una vez emitida la guía, el comprador recibe un correo electrónico y notificación SMS/WhatsApp con el enlace de rastreo en tiempo real y las actualizaciones de estatus (En preparación, En tránsito, En reparto, Entregado).',
    'Notificaciones de Despacho ARK'
);

-- ----------------------------------------------------------------------------
-- COMMERCE: Soporte
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'commerce',
    'soporte',
    'Políticas de Garantías y Devoluciones (RMA)',
    'Los clientes disponen de 30 días naturales posteriores a la entrega para solicitar la devolución o cambio de productos que presenten defectos de fabricación o daños de envío. Se genera una guía prepagada de retorno para la inspección de calidad.',
    'Ley Federal de Protección al Consumidor (LFPC), Art. 77-84'
),
(
    'commerce',
    'soporte',
    'Emisión de Facturas Electrónicas para Clientes',
    'Los clientes cuentan con un portal de autofacturación donde pueden ingresar su número de ticket/orden y RFC para emitir su CFDI 4.0 durante el mes natural de su compra.',
    'Resolución Miscelánea Fiscal - Regla de Facturación Global y CFDI'
),
(
    'commerce',
    'soporte',
    'Canales de Atención y Horarios de Servicio',
    'El equipo de atención al cliente de ARK Commerce opera de lunes a viernes de 8:00 a 19:00 hrs y sábados de 9:00 a 14:00 hrs (hora CDMX) a través del chat en vivo, ticketera y correo electrónico comercial.',
    'SLA Soporte Comercio'
);

-- ============================================================================
-- SEED DATA: LINEA LAB
-- Contextos: datos, bitcoin, api, soporte
-- ============================================================================

-- ----------------------------------------------------------------------------
-- LAB: Datos
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'lab',
    'datos',
    'Arquitectura de Datos y Cloudflare D1 / Vectorize',
    'ARK Lab implementa un diseño serverless sobre la red global de Cloudflare. Se utiliza Cloudflare D1 (SQLite distribuido) para datos relacionales transaccionales y Vectorize junto a Workers AI para almacenamiento de embeddings e inferencia semántica de baja latencia en el edge.',
    'Cloudflare Workers & D1 Architecture Blueprint'
),
(
    'lab',
    'datos',
    'Pipelines de Ingestión y Privacidad de Datos',
    'Los datos ingresados se procesan mediante pipelines de limpieza que anonimizan datos personales sensibles (PII). Las respuestas de los modelos de lenguaje pasan por capas de guardrails para evitar la exposición inadvertida de secretos y llaves de acceso.',
    'Estándares ISO/IEC 27001 y RGPD/LFPDPPP'
),
(
    'lab',
    'datos',
    'Políticas de Respaldo, Snapshotting y Retención',
    'Las bases de datos D1 cuentan con copias de seguridad continuas y snapshots diarios automatizados. Los logs operativos y de telemetría se conservan durante 90 días en almacenamiento R2 antes de ser depurados o archivados en almacenamiento en frío.',
    'Manual de Gobernanza de Datos ARK Lab'
);

-- ----------------------------------------------------------------------------
-- LAB: Bitcoin
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'lab',
    'bitcoin',
    'Integración Lightning Network para Micropagos',
    'La infraestructura de ARK Lab cuenta con nodos Lightning de enrutamiento y soporte para facturas BOLT11 y direcciones Lightning (LNURL-pay). Permite liquidaciones instantáneas de micropagos con costos de transacción inferiores a 1 satoshi.',
    'Lightning Network BOLT Specifications (BOLT 11, LNURL)'
),
(
    'lab',
    'bitcoin',
    'Esquemas de Custodia No Custodial y Multisig',
    'Las soluciones experimentales de Bitcoin en ARK Lab priorizan la autocustodia institucional mediante billeteras multifirma (2 de 3 o 3 de 5) utilizando descriptores miniscript y dispositivos de hardware aislados (air-gapped signers).',
    'BIP-340/341/342 (Taproot), Miniscript Specification'
),
(
    'lab',
    'bitcoin',
    'Liquidación On-Chain y Gestión de Tarifas Mempool',
    'Para pagos y fondeo on-chain de canales, el sistema monitorea dinámicamente el estado de la mempool mediante APIs de estimación de comisiones (sat/vB) aplicando Replace-By-Fee (RBF) para evitar transacciones estancadas en periodos de congestión.',
    'BIP-125 (Opt-in Full Replace-by-Fee)'
),
(
    'lab',
    'bitcoin',
    'Nodos Propios y Verificación Descentralizada',
    'La infraestructura no depende de proveedores centralizados para consultar el estado de la blockchain: opera nodos completos de Bitcoin Core sobre redes privadas con indexación Electrum para validación soberana e independiente de transacciones.',
    'Bitcoin Core Protocol Reference'
);

-- ----------------------------------------------------------------------------
-- LAB: API
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'lab',
    'api',
    'Autenticación mediante API Keys y JWT en Workers',
    'Todas las solicitudes a la API de ARK Systems deben incluir un encabezado de autorización Bearer con API Token firmado o llave API generada desde el panel de desarrollador. Las validaciones criptográficas se ejecutan en milisegundos en el edge de Cloudflare Workers.',
    'RFC 7519 (JSON Web Token); Auth v2 Docs'
),
(
    'lab',
    'api',
    'Webhooks, Firmas Criptográficas (HMAC) y Reintentos',
    'Las notificaciones por webhook se transmiten con un encabezado X-ARK-Signature calculado mediante HMAC-SHA256 utilizando el secreto compartido del cliente. En caso de fallas (códigos 5xx o timeout), el sistema reintenta con retroceso exponencial (exponential backoff) hasta por 24 horas.',
    'Webhook Integration Guide & Security Spec'
),
(
    'lab',
    'api',
    'Rate Limiting, Cuotas y Respuestas HTTP Estándar',
    'Las APIs de ARK aplican límites por ventana de tiempo móvil (100 peticiones por minuto en plan estándar). Al exceder el umbral, el servidor responde con código HTTP 429 Too Many Requests e incluye los encabezados Retry-After y X-RateLimit-Reset.',
    'RFC 6585 (Additional HTTP Status Codes)'
);

-- ----------------------------------------------------------------------------
-- LAB: Soporte
-- ----------------------------------------------------------------------------
INSERT INTO knowledge_base (line, context, topic, answer, legal_reference) VALUES
(
    'lab',
    'soporte',
    'Entornos de Sandbox y Pruebas para Desarrolladores',
    'Los desarrolladores disponen de un entorno de pruebas (Sandbox/Staging) aislado con saldo simulado de prueba y soporte para webhooks locales mediante túneles seguros para depurar antes de promover integraciones a producción.',
    'ARK Developer Portal - Sandbox Environment'
),
(
    'lab',
    'soporte',
    'SLA y Nivel de Servicio para APIs Institucionales',
    'El servicio de API en producción ofrece una disponibilidad garantizada del 99.9% mensual. Mantenimientos programados se notifican con al menos 72 horas de anticipación a través de la página de estatus oficial.',
    'Acuerdo de Nivel de Servicio (SLA) ARK Lab'
),
(
    'lab',
    'soporte',
    'Reporte de Vulnerabilidades y Programa Bug Bounty',
    'Cualquier hallazgo de seguridad debe reportarse a través del canal de divulgación responsable (security@arksystems.local). Solicitamos abstenerse de realizar ataques de denegación de servicio o divulgación pública antes de la mitigación oficial.',
    'Política de Divulgación Responsable de Vulnerabilidades ARK'
);
