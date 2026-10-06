#!/usr/bin/env python3
"""
Ark Systems — Vector Asset Generator (SVG Native)
Genera logos, iconos y patrones vectoriales programáticamente.
Requiere: pip install svgwrite
"""

import svgwrite
from pathlib import Path
import math

# ==========================================
# CONFIGURACIÓN ARK SYSTEMS (Cliente 0)
# ==========================================

# Paleta Hexadecimal (coherente con config.ts y designsystem.md)
COLORS = {
    "void": "#0A0A0F",       # Fondo principal
    "surface": "#12121A",    # Tarjetas
    "accent": "#FF6B1A",     # Naranja Fuego (Principal)
    "gold": "#D4AF37",       # Dorado Leasing
    "success": "#12B76A",    # Verde Éxito
    "danger": "#FF4D4D",     # Rojo Error/Museo
    "white": "#FFFFFF",
    "gray_light": "#A1A1AA", # Textos secundarios
}

def get_root() -> Path:
    """Crea la carpeta de assets si no existe."""
    root = Path(__file__).resolve().parents[1] / "public" / "assets" / "vector"
    root.mkdir(parents=True, exist_ok=True)
    return root

# ==========================================
# GENERADORES VECTORIALES
# ==========================================

def generate_logo_mark_ark(path: Path):
    """
    Genera el logotipo abstracto 'A' de Ark Systems.
    Estilo: Tech-Minimalist, Circuit Board aesthetic.
    """
    dwg = svgwrite.Drawing(str(path), size=('512px', '512px'), viewBox='0 0 512 512')
    
    # Configuración de estilos globales
    stroke_width = 40
    accent = COLORS['accent']
    white = COLORS['white']
    
    # 1. La estructura triangular principal (La 'A')
    # Izquierda
    dwg.add(dwg.line(start=(80, 432), end=(256, 80), stroke=accent, stroke_width=stroke_width, stroke_linecap='round'))
    # Derecha
    dwg.add(dwg.line(start=(256, 80), end=(432, 432), stroke=accent, stroke_width=stroke_width, stroke_linecap='round'))
    
    # 2. La barra transversal cortada (Efecto Digital/Glitch)
    bar_y = 300
    bar_left_start = 150
    bar_right_end = 362
    
    # Segmento izquierdo de la barra
    dwg.add(dwg.line(start=(bar_left_start, bar_y), end=(246, bar_y), stroke=white, stroke_width=int(stroke_width * 0.6), stroke_linecap='round'))
    
    # Segmento derecho de la barra (con pequeño gap central)
    dwg.add(dwg.line(start=(266, bar_y), end=(bar_right_end, bar_y), stroke=white, stroke_width=int(stroke_width * 0.6), stroke_linecap='round'))
    
    # 3. Nodo Central (El punto de conexión/data hub)
    center_x, center_y = 256, bar_y
    node_radius = 12
    
    # Círculo exterior (glow simulado con opacidad)
    dwg.add(dwg.circle(center=(center_x, center_y), r=node_radius + 8, fill=accent, opacity=0.3))
    # Círculo interior sólido
    dwg.add(dwg.circle(center=(center_x, center_y), r=node_radius, fill=white))
    
    # 4. Detalles de circuito (líneas finas decorativas)
    thin_stroke = 4
    circuit_color = COLORS['gray_light']
    
    # Línea horizontal superior derecha
    dwg.add(dwg.line(start=(300, 150), end=(380, 150), stroke=circuit_color, stroke_width=thin_stroke, stroke_dasharray='10,5'))
    # Punto final
    dwg.add(dwg.circle(center=(380, 150), r=4, fill=circuit_color))
    
    # Línea vertical inferior izquierda
    dwg.add(dwg.line(start=(130, 350), end=(130, 420), stroke=circuit_color, stroke_width=thin_stroke, stroke_dasharray='10,5'))
    # Punto final
    dwg.add(dwg.circle(center=(130, 420), r=4, fill=circuit_color))

    dwg.save()
    print(f"[OK] Generado: {path.name} (Logo Mark Ark)")


def generate_favicon_base(path: Path):
    """
    Genera un favicon simplificado basado en el logo mark.
    Optimizado para visibilidad a tamaños pequeños (16x16 - 64x64).
    """
    size = 64
    dwg = svgwrite.Drawing(str(path), size=(f'{size}px', f'{size}px'), viewBox=f'0 0 {size} {size}')
    
    bg_color = COLORS['void']
    accent = COLORS['accent']
    
    # Fondo cuadrado redondeado
    corner_radius = 12
    dwg.add(dwg.rect(insert=(0, 0), size=(size, size), rx=corner_radius, ry=corner_radius, fill=bg_color))
    
    # Triángulo 'A' simplificado
    padding = 12
    points = [
        (padding, size - padding),      # Pie izq
        (size // 2, padding),           # Punta sup
        (size - padding, size - padding)# Pie der
    ]
    
    stroke_w = 6
    line_cap = 'round'
    
    # Línea izquierda
    dwg.add(dwg.polyline(points=[points[0], points[1]], stroke=accent, stroke_width=stroke_w, fill='none', stroke_linecap=line_cap))
    # Línea derecha
    dwg.add(dwg.polyline(points=[points[1], points[2]], stroke=accent, stroke_width=stroke_w, fill='none', stroke_linecap=line_cap))
    
    # Punto central simple
    center_x, center_y = size // 2, int(size * 0.6)
    dwg.add(dwg.circle(center=(center_x, center_y), r=3, fill=COLORS['white']))
    
    dwg.save()
    print(f"[OK] Generado: {path.name} (Favicon Base)")


def generate_grid_pattern(path: Path, cell_size=40, color_key="accent"):
    """
    Genera una cuadrícula técnica (tech grid) tenue.
    Ideal para fondos de secciones Hero o Pricing.
    """
    width, height = 1000, 1000
    dwg = svgwrite.Drawing(str(path), size=(f'{width}px', f'{height}px'), viewBox=f'0 0 {width} {height}')
    
    line_color = COLORS[color_key]
    opacity = 0.15 # Muy sutil
    
    # Grupo para líneas verticales
    v_group = dwg.g(id='vertical-lines', stroke=line_color, stroke_width=1, opacity=opacity)
    for x in range(0, width, cell_size):
        v_group.add(dwg.line(start=(x, 0), end=(x, height)))
    dwg.add(v_group)
    
    # Grupo para líneas horizontales
    h_group = dwg.g(id='horizontal-lines', stroke=line_color, stroke_width=1, opacity=opacity)
    for y in range(0, height, cell_size):
        h_group.add(dwg.line(start=(0, y), end=(width, y)))
    dwg.add(h_group)
    
    # Puntos de intersección destacados cada 5 celdas
    dot_group = dwg.g(id='intersection-dots', fill=line_color, opacity=0.4)
    step = cell_size * 5
    for x in range(0, width, step):
        for y in range(0, height, step):
            dot_group.add(dwg.circle(center=(x, y), r=2))
    dwg.add(dot_group)
    
    dwg.save()
    print(f"[OK] Generado: {path.name} (Tech Grid - {color_key})")


def generate_neon_glow_orb_svg(path: Path, radius=300, color_key="accent"):
    """
    Genera una esfera de luz difusa usando gradientes radiales SVG nativos.
    Mucho más ligero que un PNG con blur.
    """
    size = radius * 2 + 100
    center = size // 2
    core_color = COLORS[color_key]
    
    dwg = svgwrite.Drawing(str(path), size=(f'{size}px', f'{size}px'), viewBox=f'0 0 {size} {size}')
    
    # Definir gradiente radial
    defs = dwg.defs
    grad_id = f'grad-{color_key}'
    gradient = dwg.radialGradient(id=grad_id, cx=center, cy=center, r=radius, fx=center, fy=center)
    
    # Stops del gradiente (simulando glow suave hacia afuera)
    stops = [
        {'offset': '0%',   'stop-color': core_color, 'stop-opacity': 0.8},
        {'offset': '40%',  'stop-color': core_color, 'stop-opacity': 0.4},
        {'offset': '70%',  'stop-color': core_color, 'stop-opacity': 0.1},
        {'offset': '100%', 'stop-color': core_color, 'stop-opacity': 0},
    ]
    
    for stop in stops:
        gradient.add_stop_color(offset=stop['offset'], color=stop['stop-color'], opacity=stop['stop-opacity'])
        
    defs.add(gradient)
    
    # Aplicar círculo con el gradiente
    circle = dwg.circle(center=(center, center), r=radius, fill=f'url(#{grad_id})')
    dwg.add(circle)
    
    dwg.save()
    print(f"[OK] Generado: {path.name} ({color_key.upper()} Glow Orb)")


def generate_portfolio_placeholder(path: Path, index: int, color_key: str):
    """
    Genera placeholders abstractos únicos para el portfolio.
    Combina geometría básica con colores de marca.
    """
    size = 800
    dwg = svgwrite.Drawing(str(path), size=(f'{size}px', f'{size}px'), viewBox=f'0 0 {size} {size}')
    
    bg = COLORS['surface']
    accent = COLORS[color_key]
    
    # Fondo
    dwg.add(dwg.rect(insert=(0, 0), size=(size, size), fill=bg))
    
    # Elemento geométrico central variado según índice
    shapes = []
    if index % 3 == 0:
        # Círculos concéntricos
        for i in range(5, 0, -1):
            r = i * 40
            op = 0.1 + (i * 0.05)
            shapes.append(dwg.circle(center=(size//2, size//2), r=r, fill='none', stroke=accent, stroke_width=2, opacity=op))
    elif index % 3 == 1:
        # Cuadrados rotados
        for i in range(4, 0, -1):
            s = i * 60
            angle = i * 15
            transform = f'translate({size//2}, {size//2}) rotate({angle}) translate(-{s//2}, -{s//2})'
            shapes.append(dwg.rect(insert=(0, 0), size=(s, s), fill='none', stroke=accent, stroke_width=2, opacity=0.2, transform=transform))
    else:
        # Triángulos superpuestos
        pts = [(size//2, 100), (100, size-100), (size-100, size-100)]
        for i in range(3, 0, -1):
            scale = 1 - (i * 0.15)
            scaled_pts = [(x * scale + size*(1-scale)/2, y * scale + size*(1-scale)/2) for x, y in pts]
            shapes.append(dwg.polygon(points=scaled_pts, fill='none', stroke=accent, stroke_width=2, opacity=0.3))
            
    for shape in shapes:
        dwg.add(shape)
        
    # Texto discreto de placeholder
    text = dwg.text(f"PORTFOLIO ITEM {index+1}", insert=(size//2, size//2), 
                    font_family="monospace", font_size="24px", 
                    fill=COLORS['gray_light'], text_anchor="middle", dominant_baseline="central", opacity=0.5)
    dwg.add(text)
    
    dwg.save()
    print(f"[OK] Generado: {path.name} (Portfolio Placeholder {index+1})")

# ==========================================
# EJECUCIÓN PRINCIPAL
# ==========================================

if __name__ == "__main__":
    try:
        import svgwrite
    except ImportError:
        print("[ERROR] Falta instalar svgwrite. Ejecuta: pip install svgwrite")
        exit(1)

    root = get_root()
    print("[ARK] Forjando elementos visuales ARK SYSTEMS (Vector Edition)...\n")

    # 1. Branding Core
    generate_logo_mark_ark(root / "logo-mark.svg")
    generate_favicon_base(root / "favicon.svg")
    
    # 2. Patterns & Backgrounds
    generate_grid_pattern(root / "grid-accent.svg", color_key="accent")
    generate_grid_pattern(root / "grid-gold.svg", color_key="gold")
    
    # 3. Effects / Orbs (Lightweight Gradients)
    generate_neon_glow_orb_svg(root / "glow-accent.svg", color_key="accent")
    generate_neon_glow_orb_svg(root / "glow-gold.svg", color_key="gold")
    generate_neon_glow_orb_svg(root / "glow-success.svg", color_key="success", radius=150)
    
    # 4. Portfolio Placeholders
    colors_cycle = ["accent", "gold", "success"]
    for i in range(3):
        path = root / f"portfolio-placeholder-{i+1}.svg"
        generate_portfolio_placeholder(path, i, colors_cycle[i])

    print("\n[OK] Assets vectoriales listos!")
    print("[TIP] Importa los SVGs directamente en tus componentes Astro:")
    print("   <img src='/assets/vector/logo-mark.svg' alt='Ark Logo' class='w-12 h-12' />")
    print("   O úsalos como background-image en CSS/Tailwind.")