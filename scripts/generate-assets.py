#!/usr/bin/env python3
"""
Ark Systems — Vector Asset Generator v2.0 (SVG Native)
Genera logos, sellos y patrones vectoriales para las líneas Legal, Commerce y Lab.
Requiere: pip install svgwrite
"""

import svgwrite
from pathlib import Path

# ==========================================
# CONFIGURACIÓN ARK SYSTEMS (Cliente 0) — v2.0
# ==========================================

# Paletas por línea de negocio.
THEMES = {
    "legal": {
        "accent": "#4F46E5",
        "accent_hover": "#4338CA",
        "accent_to": "#1E3A8A",
        "glow": "rgba(79, 70, 229, 0.12)",
    },
    "commerce": {
        "accent": "#D97706",
        "accent_hover": "#B45309",
        "accent_to": "#78350F",
        "glow": "rgba(217, 119, 6, 0.12)",
    },
    "lab": {
        "accent": "#0891B2",
        "accent_hover": "#0E7490",
        "accent_to": "#164E63",
        "glow": "rgba(8, 145, 178, 0.12)",
    },
}

NEUTRALS = {
    "void": "#0A0A0F",
    "base": "#09090B",
    "surface": "#18181B",
    "surface_hover": "#27272A",
    "border": "rgba(255,255,255,0.08)",
    "border_strong": "rgba(255,255,255,0.15)",
    "white": "#FFFFFF",
    "gray_light": "#A1A1AA",
}

SEMANTIC = {
    "success": "#10B981",
    "warning": "#F59E0B",
    "error": "#EF4444",
    "audit": "#8B5CF6",
}

CLOUDFLARE = {
    "orange": "#F38020",
    "orange_soft_opacity": 0.25,
    "orange_bg_opacity": 0.05,
}

OG_WIDTH = 1200
OG_HEIGHT = 630


def get_theme(theme_name: str = "legal") -> dict[str, str]:
    """Retorna la paleta solicitada; usa legal para nombres desconocidos."""
    return THEMES.get(theme_name, THEMES["legal"])


def get_root() -> Path:
    """Crea la carpeta de assets si no existe."""
    root = Path(__file__).resolve().parents[1] / "public" / "assets" / "vector"
    root.mkdir(parents=True, exist_ok=True)
    return root

# ==========================================
# GENERADORES VECTORIALES — v2.0
# ==========================================

def generate_logo_mark_ark(path: Path, theme_name: str = "legal"):
    """
    Genera el logo mark de Ark Systems: el Arca como constelación.

    Integra el casco del Arca, capas tipo expediente, una balanza,
    un sello de verificación y nodos conectados.
    """
    theme = get_theme(theme_name)
    accent = theme["accent"]
    accent_to = theme["accent_to"]
    white = NEUTRALS["white"]
    gray = NEUTRALS["gray_light"]
    size = 512
    dwg = svgwrite.Drawing(str(path), size=(f"{size}px", f"{size}px"), viewBox=f"0 0 {size} {size}")

    cx = size // 2
    hull_top_y = 180
    hull_bottom_y = 380
    prow_x = size - 90
    stern_x = 90

    dwg.add(dwg.path(
        d=f"M {stern_x},{hull_bottom_y - 30} Q {cx},{hull_bottom_y + 20} {prow_x},{hull_bottom_y - 40}",
        fill="none",
        stroke=accent,
        stroke_width=6,
        stroke_linecap="round",
    ))

    layer_ys = [hull_top_y + 30, hull_top_y + 80, hull_top_y + 130]
    for i, y in enumerate(layer_ys):
        dwg.add(dwg.line(
            start=(stern_x + 40 + i * 10, y),
            end=(prow_x - 60 - i * 10, y - i * 10),
            stroke=accent,
            stroke_width=3,
            stroke_linecap="round",
            opacity=0.9 - i * 0.2,
        ))

    dwg.add(dwg.path(
        d=f"M {prow_x},{hull_bottom_y - 40} Q {prow_x + 10},{hull_top_y + 60} {prow_x - 40},{hull_top_y + 20}",
        fill="none",
        stroke=accent,
        stroke_width=6,
        stroke_linecap="round",
    ))

    balance_x = prow_x - 40
    balance_y_top = hull_top_y + 20
    balance_y_bottom = hull_top_y - 40
    dwg.add(dwg.line(
        start=(balance_x, balance_y_top),
        end=(balance_x, balance_y_bottom),
        stroke=accent_to,
        stroke_width=4,
        stroke_linecap="round",
    ))
    arm_width = 40
    dwg.add(dwg.line(
        start=(balance_x - arm_width, balance_y_bottom + 10),
        end=(balance_x + arm_width, balance_y_bottom + 10),
        stroke=accent_to,
        stroke_width=4,
        stroke_linecap="round",
    ))
    for x in (balance_x - arm_width, balance_x + arm_width):
        dwg.add(dwg.circle(center=(x, balance_y_bottom + 25), r=6, fill=accent_to, opacity=0.8))

    check_x = cx - 20
    check_y = hull_top_y + 10
    dwg.add(dwg.circle(center=(check_x, check_y), r=22, fill="none", stroke=white, stroke_width=3, opacity=0.9))
    dwg.add(dwg.path(
        d=f"M {check_x - 10},{check_y} L {check_x - 3},{check_y + 8} L {check_x + 12},{check_y - 8}",
        fill="none",
        stroke=white,
        stroke_width=3,
        stroke_linecap="round",
        stroke_linejoin="round",
    ))

    nodes = [
        (stern_x + 40, hull_top_y + 30, 6),
        (stern_x + 80, hull_bottom_y - 20, 5),
        (cx - 60, hull_bottom_y, 5),
        (cx + 60, hull_bottom_y - 10, 5),
        (prow_x - 60, hull_top_y + 80, 5),
        (prow_x - 20, hull_bottom_y - 30, 6),
        (balance_x, balance_y_bottom + 10, 4),
    ]
    for nx, ny, radius in nodes:
        dwg.add(dwg.circle(center=(nx, ny), r=radius + 4, fill=accent, opacity=0.25))
        dwg.add(dwg.circle(center=(nx, ny), r=radius, fill=white))

    constellation_pairs = [
        ((stern_x + 40, hull_top_y + 30), (cx - 60, hull_bottom_y)),
        ((cx - 60, hull_bottom_y), (prow_x - 20, hull_bottom_y - 30)),
        ((prow_x - 20, hull_bottom_y - 30), (prow_x - 60, hull_top_y + 80)),
        ((cx - 60, hull_bottom_y), (cx + 60, hull_bottom_y - 10)),
        ((cx + 60, hull_bottom_y - 10), (prow_x - 20, hull_bottom_y - 30)),
    ]
    for start, end in constellation_pairs:
        dwg.add(dwg.line(
            start=start,
            end=end,
            stroke=gray,
            stroke_width=1.5,
            stroke_dasharray="4,6",
            opacity=0.5,
            stroke_linecap="round",
        ))

    dwg.add(dwg.line(
        start=(size - 80, 80),
        end=(size - 30, 80),
        stroke=gray,
        stroke_width=2,
        stroke_dasharray="6,4",
        opacity=0.4,
    ))
    dwg.add(dwg.circle(center=(size - 30, 80), r=3, fill=gray, opacity=0.6))
    dwg.add(dwg.line(
        start=(30, size - 80),
        end=(30, size - 30),
        stroke=gray,
        stroke_width=2,
        stroke_dasharray="6,4",
        opacity=0.4,
    ))
    dwg.add(dwg.circle(center=(30, size - 30), r=3, fill=gray, opacity=0.6))

    dwg.save()
    print(f"[OK] Generado: {path.name} (Logo Mark Ark — theme: {theme_name})")


def generate_logo_mark_by_line(line: str):
    """Genera el logo mark para una línea de negocio."""
    if line not in THEMES:
        raise ValueError(f"Tema desconocido: {line}")
    generate_logo_mark_ark(get_root() / f"logo-mark-{line}.svg", theme_name=line)


def generate_favicon_base(path: Path, theme_name: str = "legal"):
    """Genera el favicon de Ark Systems: el sello chevron sobre pastilla de acento.

    Debe ser legible a 16 px, así que va como badge con fondo propio: un favicon
    cargado por <link> es un documento aislado y no hereda `currentColor` ni las
    custom properties del sitio, de modo que un trazo sin fondo desaparecería
    sobre pestañas claras. Se usa la misma geometría que el sello del header
    (ArkMark), escalada, para que tab y marca se lean como una familia.
    """
    theme = get_theme(theme_name)
    size = 64

    dwg = svgwrite.Drawing(
        str(path),
        size=(f"{size}px", f"{size}px"),
        viewBox=f"0 0 {size} {size}",
    )

    defs = dwg.defs
    grad_id = "ark-favicon-accent"
    gradient = dwg.linearGradient(id=grad_id, x1="0%", y1="0%", x2="100%", y2="100%")
    gradient.add_stop_color("0%", theme["accent"])
    gradient.add_stop_color("100%", theme["accent_to"])
    defs.add(gradient)

    # Pastilla: fondo sólido propio para contrastar con cualquier pestaña.
    dwg.add(
        dwg.rect(
            insert=(0, 0),
            size=(size, size),
            rx=size * 0.25,
            ry=size * 0.25,
            fill=f"url(#{grad_id})",
        )
    )

    # Chevron de la "A" de Ark: la masa principal de la marca.
    dwg.add(
        dwg.path(
            d=f"M {size * 0.25},{size * 0.71875} L {size * 0.5},{size * 0.28125} "
              f"L {size * 0.75},{size * 0.71875}",
            fill="none",
            stroke=NEUTRALS["white"],
            stroke_width=size * 0.10625,
            stroke_linecap="round",
            stroke_linejoin="round",
        )
    )

    # Barra del sello, partida por el nodo central.
    seal_y = size * 0.640625
    dwg.add(
        dwg.path(
            d=f"M {size * 0.33125},{seal_y} h {size * 0.06875} "
              f"M {size * 0.6},{seal_y} h {size * 0.06875}",
            fill="none",
            stroke=NEUTRALS["white"],
            stroke_width=size * 0.0875,
            stroke_linecap="round",
        )
    )

    dwg.add(
        dwg.circle(
            center=(size * 0.5, seal_y),
            r=size * 0.06875,
            fill=NEUTRALS["white"],
        )
    )

    dwg.save()
    print(f"[OK] Generado: {path.name} (Favicon — theme: {theme_name})")


def generate_grid_pattern(path: Path, cell_size=40, theme_name="legal"):
    """Genera una cuadrícula técnica tenue para el tema solicitado."""
    theme = get_theme(theme_name)
    width, height = 1000, 1000
    dwg = svgwrite.Drawing(str(path), size=(f"{width}px", f"{height}px"), viewBox=f"0 0 {width} {height}")
    line_color = theme["accent"]
    opacity = 0.15

    v_group = dwg.g(id="vertical-lines", stroke=line_color, stroke_width=1, opacity=opacity)
    for x in range(0, width, cell_size):
        v_group.add(dwg.line(start=(x, 0), end=(x, height)))
    dwg.add(v_group)

    h_group = dwg.g(id="horizontal-lines", stroke=line_color, stroke_width=1, opacity=opacity)
    for y in range(0, height, cell_size):
        h_group.add(dwg.line(start=(0, y), end=(width, y)))
    dwg.add(h_group)

    dot_group = dwg.g(id="intersection-dots", fill=line_color, opacity=0.4)
    step = cell_size * 5
    for x in range(0, width, step):
        for y in range(0, height, step):
            dot_group.add(dwg.circle(center=(x, y), r=2))
    dwg.add(dot_group)

    dwg.save()
    print(f"[OK] Generado: {path.name} (Tech Grid — theme: {theme_name})")


def generate_neon_glow_orb_svg(path: Path, radius=300, theme_name="legal"):
    """Genera un glow radial ligero en SVG para el tema solicitado."""
    theme = get_theme(theme_name)
    size = radius * 2 + 100
    center = size // 2
    core_color = theme["accent"]
    dwg = svgwrite.Drawing(str(path), size=(f"{size}px", f"{size}px"), viewBox=f"0 0 {size} {size}")

    defs = dwg.defs
    grad_id = f"grad-{theme_name}"
    gradient = dwg.radialGradient(id=grad_id, cx=center, cy=center, r=radius, fx=center, fy=center)

    stops = [
        {"offset": "0%", "stop-color": core_color, "stop-opacity": 0.8},
        {"offset": "40%", "stop-color": core_color, "stop-opacity": 0.4},
        {"offset": "70%", "stop-color": core_color, "stop-opacity": 0.1},
        {"offset": "100%", "stop-color": core_color, "stop-opacity": 0},
    ]

    for stop in stops:
        gradient.add_stop_color(offset=stop["offset"], color=stop["stop-color"], opacity=stop["stop-opacity"])

    defs.add(gradient)
    dwg.add(dwg.circle(center=(center, center), r=radius, fill=f"url(#{grad_id})"))

    dwg.save()
    print(f"[OK] Generado: {path.name} (Glow Orb — theme: {theme_name})")


def generate_cloudflare_seal(path: Path):
    """Genera un distintivo visual de la infraestructura Cloudflare Edge."""
    width, height = 280, 48
    dwg = svgwrite.Drawing(str(path), size=(f"{width}px", f"{height}px"), viewBox=f"0 0 {width} {height}")
    dwg.add(dwg.rect(
        insert=(0, 0),
        size=(width, height),
        rx=height // 2,
        ry=height // 2,
        fill=CLOUDFLARE["orange"],
        fill_opacity=CLOUDFLARE["orange_bg_opacity"],
        stroke=CLOUDFLARE["orange"],
        stroke_opacity=CLOUDFLARE["orange_soft_opacity"],
        stroke_width=1,
    ))
    dot_cx = 24
    dot_cy = height // 2
    dwg.add(dwg.circle(center=(dot_cx, dot_cy), r=4, fill=CLOUDFLARE["orange"]))
    dwg.add(dwg.circle(center=(dot_cx, dot_cy), r=8, fill=CLOUDFLARE["orange"], opacity=0.3))
    dwg.add(dwg.text(
        "Cloudflare Edge · 300+ ciudades",
        insert=(44, dot_cy + 5),
        font_family="'Inter', 'Helvetica Neue', Arial, sans-serif",
        font_size="13px",
        font_weight="500",
        fill=CLOUDFLARE["orange"],
        letter_spacing="0.02em",
    ))
    dwg.save()
    print(f"[OK] Generado: {path.name} (Cloudflare Seal)")


def generate_legal_seal(path: Path, label: str, value: str):
    """Genera un distintivo editorial legal sin certificar cumplimiento normativo."""
    width, height = 320, 64
    accent = get_theme("legal")["accent"]
    dwg = svgwrite.Drawing(str(path), size=(f"{width}px", f"{height}px"), viewBox=f"0 0 {width} {height}")
    dwg.add(dwg.rect(
        insert=(0, 0),
        size=(width, height),
        rx=8,
        ry=8,
        fill="#4F46E5",
        fill_opacity=0.04,
        stroke=NEUTRALS["white"],
        stroke_opacity=0.08,
        stroke_width=1,
    ))
    dwg.add(dwg.rect(insert=(0, 0), size=(3, height), fill=accent))
    dwg.add(dwg.text(
        label,
        insert=(20, 24),
        font_family="'JetBrains Mono', 'Fira Code', monospace",
        font_size="10px",
        font_weight="500",
        fill=NEUTRALS["white"],
        fill_opacity=0.5,
        letter_spacing="0.08em",
    ))
    dwg.add(dwg.text(
        value,
        insert=(20, 46),
        font_family="'Inter', 'Helvetica Neue', Arial, sans-serif",
        font_size="14px",
        font_weight="600",
        fill=NEUTRALS["white"],
        fill_opacity=0.9,
    ))
    dwg.save()
    print(f"[OK] Generado: {path.name} (Ark Legal Seal)")


def generate_portfolio_placeholder(path: Path, index: int, theme_name: str):
    """Genera un placeholder abstracto del portfolio para la línea indicada."""
    theme = get_theme(theme_name)
    size = 800
    dwg = svgwrite.Drawing(str(path), size=(f"{size}px", f"{size}px"), viewBox=f"0 0 {size} {size}")
    accent = theme["accent"]
    dwg.add(dwg.rect(insert=(0, 0), size=(size, size), fill=NEUTRALS["surface"]))

    shapes = []
    if index % 3 == 0:
        for i in range(5, 0, -1):
            r = i * 40
            opacity = 0.1 + i * 0.05
            shapes.append(dwg.circle(
                center=(size // 2, size // 2),
                r=r,
                fill="none",
                stroke=accent,
                stroke_width=2,
                opacity=opacity,
            ))
    elif index % 3 == 1:
        for i in range(4, 0, -1):
            s = i * 60
            angle = i * 15
            transform = f"translate({size // 2}, {size // 2}) rotate({angle}) translate(-{s // 2}, -{s // 2})"
            shapes.append(dwg.rect(
                insert=(0, 0),
                size=(s, s),
                fill="none",
                stroke=accent,
                stroke_width=2,
                opacity=0.2,
                transform=transform,
            ))
    else:
        points = [(size // 2, 150), (150, size - 150), (size - 150, size - 150)]
        for i in range(3, 0, -1):
            scale = 1 - (i * 0.15)
            scaled_points = [
                (x * scale + size * (1 - scale) / 2, y * scale + size * (1 - scale) / 2)
                for x, y in points
            ]
            shapes.append(dwg.polygon(
                points=scaled_points,
                fill="none",
                stroke=accent,
                stroke_width=2,
                opacity=0.3,
            ))

    for shape in shapes:
        dwg.add(shape)

    dwg.add(dwg.text(
        f"ARK PORTFOLIO {index + 1}",
        insert=(size // 2, size // 2),
        font_family="'JetBrains Mono', monospace",
        font_size="20px",
        fill=NEUTRALS["gray_light"],
        text_anchor="middle",
        dominant_baseline="central",
        opacity=0.5,
    ))
    dwg.save()
    print(f"[OK] Generado: {path.name} (Portfolio Placeholder — theme: {theme_name})")


def generate_og_image(path: Path, theme_name: str = "legal"):
    """
    Genera una imagen Open Graph con identidad visual y copy de Ark Systems.
    """
    theme = get_theme(theme_name)
    accent = theme["accent"]
    accent_to = theme["accent_to"]
    width, height = OG_WIDTH, OG_HEIGHT
    dwg = svgwrite.Drawing(str(path), size=(f"{width}px", f"{height}px"), viewBox=f"0 0 {width} {height}")
    defs = dwg.defs

    bg_grad = dwg.linearGradient(id="og-bg", x1="0%", y1="0%", x2="100%", y2="100%")
    bg_grad.add_stop_color("0%", NEUTRALS["void"])
    bg_grad.add_stop_color("50%", NEUTRALS["surface"])
    bg_grad.add_stop_color("100%", NEUTRALS["void"])
    defs.add(bg_grad)

    accent_grad = dwg.linearGradient(id="og-accent", x1="0%", y1="0%", x2="100%", y2="0%")
    accent_grad.add_stop_color("0%", accent)
    accent_grad.add_stop_color("100%", accent_to)
    defs.add(accent_grad)

    dwg.add(dwg.rect(insert=(0, 0), size=(width, height), fill="url(#og-bg)"))
    grid_group = dwg.g(stroke=accent, stroke_width=0.5, opacity=0.06)
    cell_size = 60
    for x in range(0, width, cell_size):
        grid_group.add(dwg.line(start=(x, 0), end=(x, height)))
    for y in range(0, height, cell_size):
        grid_group.add(dwg.line(start=(0, y), end=(width, y)))
    dwg.add(grid_group)

    orb1_grad = dwg.radialGradient(id="orb1", cx=150, cy=150, r=200, fx=150, fy=150)
    orb1_grad.add_stop_color("0%", accent, 0.15)
    orb1_grad.add_stop_color("100%", accent, 0)
    defs.add(orb1_grad)
    dwg.add(dwg.circle(center=(150, 150), r=200, fill="url(#orb1)"))

    orb2_grad = dwg.radialGradient(
        id="orb2",
        cx=width - 150,
        cy=height - 150,
        r=250,
        fx=width - 150,
        fy=height - 150,
    )
    orb2_grad.add_stop_color("0%", accent_to, 0.1)
    orb2_grad.add_stop_color("100%", accent_to, 0)
    defs.add(orb2_grad)
    dwg.add(dwg.circle(center=(width - 150, height - 150), r=250, fill="url(#orb2)"))

    line_y = height // 2 + 20
    dwg.add(dwg.line(
        start=(width * 0.15, line_y),
        end=(width * 0.85, line_y),
        stroke="url(#og-accent)",
        stroke_width=2,
        opacity=0.6,
    ))

    logo_size = 140
    logo_x = width // 2 - logo_size // 2
    logo_y = height // 2 - logo_size // 2 - 40
    hull_y = logo_y + logo_size - 20
    dwg.add(dwg.path(
        d=f"M {logo_x + 10},{hull_y - 5} Q {logo_x + logo_size // 2},{hull_y + 10} {logo_x + logo_size - 10},{hull_y - 10}",
        fill="none",
        stroke=accent,
        stroke_width=6,
        stroke_linecap="round",
    ))
    dwg.add(dwg.path(
        d=f"M {logo_x + logo_size - 10},{hull_y - 10} Q {logo_x + logo_size + 5},{logo_y + logo_size // 2} {logo_x + logo_size - 20},{logo_y + 30}",
        fill="none",
        stroke=accent,
        stroke_width=6,
        stroke_linecap="round",
    ))
    for i in range(3):
        y = logo_y + 50 + i * 15
        dwg.add(dwg.line(
            start=(logo_x + 30 + i * 5, y),
            end=(logo_x + logo_size - 40 - i * 5, y - i * 5),
            stroke=accent,
            stroke_width=2,
            opacity=0.9 - i * 0.2,
            stroke_linecap="round",
        ))
    check_x = logo_x + logo_size // 2 - 5
    check_y = logo_y + 35
    dwg.add(dwg.circle(
        center=(check_x, check_y),
        r=14,
        fill="none",
        stroke=NEUTRALS["white"],
        stroke_width=2,
        opacity=0.9,
    ))
    dwg.add(dwg.path(
        d=f"M {check_x - 6},{check_y} L {check_x - 1},{check_y + 5} L {check_x + 7},{check_y - 5}",
        fill="none",
        stroke=NEUTRALS["white"],
        stroke_width=2,
        stroke_linecap="round",
        stroke_linejoin="round",
    ))
    for nx, ny, radius in [
        (logo_x + 30, logo_y + 50, 3),
        (logo_x + logo_size // 2, hull_y - 5, 4),
        (logo_x + logo_size - 30, hull_y - 10, 3),
    ]:
        dwg.add(dwg.circle(center=(nx, ny), r=radius + 3, fill=accent, opacity=0.25))
        dwg.add(dwg.circle(center=(nx, ny), r=radius, fill=NEUTRALS["white"]))

    brand_y = height // 2 + 70
    dwg.add(dwg.text(
        "ARK SYSTEMS",
        insert=(width // 2, brand_y),
        font_family="'Fraunces', Georgia, serif",
        font_size="48px",
        font_weight="700",
        fill=NEUTRALS["white"],
        text_anchor="middle",
    ))
    tagline_y = brand_y + 44
    dwg.add(dwg.text(
        "Infraestructura Edge para despachos contables y legales.",
        insert=(width // 2, tagline_y),
        font_family="'Inter', 'Helvetica Neue', Arial, sans-serif",
        font_size="20px",
        font_weight="500",
        fill=NEUTRALS["gray_light"],
        text_anchor="middle",
    ))
    subtitle_y = tagline_y + 30
    dwg.add(dwg.text(
        "Expediente digital · Cumplimiento · Cloudflare Edge",
        insert=(width // 2, subtitle_y),
        font_family="'Inter', 'Helvetica Neue', Arial, sans-serif",
        font_size="15px",
        font_weight="400",
        fill=NEUTRALS["gray_light"],
        text_anchor="middle",
        opacity=0.8,
    ))

    domain_y = height - 60
    dwg.add(dwg.text(
        "arksystems.site",
        insert=(width // 2, domain_y),
        font_family="'JetBrains Mono', monospace",
        font_size="16px",
        font_weight="500",
        fill=accent,
        text_anchor="middle",
    ))
    dwg.add(dwg.line(
        start=(width // 2 - 80, domain_y + 10),
        end=(width // 2 + 80, domain_y + 10),
        stroke="url(#og-accent)",
        stroke_width=2,
    ))
    dwg.save()
    print(f"[OK] Generado: {path.name} (OG Image {width}x{height} — theme: {theme_name})")


# ==========================================
# EJECUCIÓN PRINCIPAL
# ==========================================

if __name__ == "__main__":
    try:
        import svgwrite  # noqa: F401
    except ImportError:
        print("[ERROR] Falta instalar svgwrite. Ejecuta: pip install svgwrite")
        raise SystemExit(1)

    root = get_root()
    print("[ARK v2.0] Forjando assets visuales de Ark Systems...\n")

    for line in THEMES:
        generate_logo_mark_by_line(line)
        generate_favicon_base(root / f"favicon-{line}.svg", theme_name=line)
        generate_og_image(root.parent / f"og-{line}.svg", theme_name=line)
        generate_grid_pattern(root / f"grid-{line}.svg", theme_name=line)
        generate_neon_glow_orb_svg(root / f"glow-{line}.svg", theme_name=line)

    # Mantener las rutas existentes que consume el sitio.
    generate_logo_mark_ark(root / "logo-mark.svg", theme_name="legal")
    generate_favicon_base(root / "favicon.svg", theme_name="legal")
    generate_og_image(root.parent / "og-default.svg", theme_name="legal")
    generate_grid_pattern(root / "grid-accent.svg", theme_name="legal")
    generate_grid_pattern(root / "grid-gold.svg", theme_name="commerce")
    generate_neon_glow_orb_svg(root / "glow-accent.svg", theme_name="legal")
    generate_neon_glow_orb_svg(root / "glow-gold.svg", theme_name="commerce")

    generate_cloudflare_seal(root / "seal-cloudflare.svg")
    generate_legal_seal(
        root / "seal-legal-identidad.svg",
        label="ARK LEGAL",
        value="Organización documental",
    )
    generate_legal_seal(
        root / "seal-legal-huella-local.svg",
        label="HUELLA LOCAL",
        value="No es un registro de auditoría",
    )

    for theme_name in THEMES:
        for index in range(3):
            generate_portfolio_placeholder(
                root / f"portfolio-{theme_name}-{index + 1}.svg",
                index,
                theme_name,
            )

    # Compatibilidad con el fallback de imagen usado actualmente en PortfolioGrid.
    for index in range(3):
        generate_portfolio_placeholder(
            root / f"portfolio-placeholder-{index + 1}.svg",
            index,
            "legal",
        )

    print("\n[OK] Assets vectoriales v2.0 listos.")
    print("[TIP] Cada línea conserva su identidad: legal (índigo), commerce (ámbar), lab (cyan).")
    print("[TIP] Las rutas legacy del sitio siguen generándose con el tema legal.")