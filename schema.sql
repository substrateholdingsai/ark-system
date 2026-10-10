CREATE TABLE IF NOT EXISTS knowledge_base (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  legal_reference TEXT
);

-- Insertar datos de ejemplo (esto luego lo cargas desde un CSV o panel admin)
INSERT INTO knowledge_base (topic, question, answer, legal_reference) VALUES 
('pld', '¿Cuál es el umbral para reportar operaciones en efectivo?', 'Las operaciones en efectivo iguales o superiores a $100,000 MXN deben ser reportadas a la UIF.', 'Artículo 13, fracción II, LFPIORPI'),
('fiscal', '¿Cómo se declaran las ganancias por enajenación de criptoactivos?', 'Se consideran como ingreso acumulable en el título que corresponda a la actividad del contribuyente, al tipo de cambio del día de la enajenación.', 'Artículo 14, fracción XIV, LISR');