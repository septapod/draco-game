"""Generate an animated GIF from the hero-banner.png.

Adds bold twinkling stars to create a living, breathing
title screen for the Draco Codex.
"""

from PIL import Image, ImageDraw
import random
import math

SRC = "codex/images/hero-banner.png"
OUT = "codex/images/hero-banner.gif"
FRAMES = 20
DURATION = 150  # ms per frame

# Load source image
base = Image.open(SRC).convert("RGBA")
W, H = base.size

random.seed(42)

# --- STARS: way more, way bigger, way brighter ---
stars = []
for _ in range(150):  # 2.5x more stars
    x = random.randint(10, W - 10)
    y = random.randint(5, int(H * 0.5))  # top half of image
    size = random.choice([2, 2, 3, 3, 3, 4, 4, 5])  # much bigger on average
    speed = random.uniform(0.8, 3.0)  # faster twinkle
    phase = random.uniform(0, math.pi * 2)
    color = random.choice([
        (255, 255, 220),  # warm white
        (220, 235, 255),  # cool white
        (255, 215, 0),    # gold
        (255, 215, 0),    # gold (weighted)
        (255, 180, 100),  # warm orange
        (180, 220, 255),  # ice blue
    ])
    stars.append((x, y, size, speed, phase, color))

def draw_star(frame, x, y, size, r, g, b, alpha):
    """Draw a pixel-art star with glow."""
    if size <= 2:
        # Cross shape
        for dx, dy in [(0, 0), (1, 0), (-1, 0), (0, 1), (0, -1)]:
            px, py = x + dx, y + dy
            if 0 <= px < W and 0 <= py < H:
                frame.putpixel((px, py), (r, g, b, alpha))
    elif size <= 3:
        # Bigger cross with bright center
        for dx, dy in [(0, 0)]:
            frame.putpixel((x + dx, y + dy), (r, g, b, alpha))
        for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            px, py = x + dx, y + dy
            if 0 <= px < W and 0 <= py < H:
                frame.putpixel((px, py), (r, g, b, int(alpha * 0.8)))
        for dx, dy in [(2, 0), (-2, 0), (0, 2), (0, -2)]:
            px, py = x + dx, y + dy
            if 0 <= px < W and 0 <= py < H:
                frame.putpixel((px, py), (r, g, b, int(alpha * 0.4)))
    elif size <= 4:
        # Diamond with glow
        for dx in range(-2, 3):
            for dy in range(-2, 3):
                dist = abs(dx) + abs(dy)
                if dist <= 2:
                    px, py = x + dx, y + dy
                    if 0 <= px < W and 0 <= py < H:
                        a = int(alpha * max(0.2, 1.0 - dist * 0.3))
                        frame.putpixel((px, py), (r, g, b, a))
        # Bright spikes
        for d in range(1, 4):
            for dx, dy in [(d, 0), (-d, 0), (0, d), (0, -d)]:
                px, py = x + dx, y + dy
                if 0 <= px < W and 0 <= py < H:
                    a = int(alpha * max(0.15, 1.0 - d * 0.25))
                    frame.putpixel((px, py), (r, g, b, a))
    else:
        # Big sparkle: 4-pointed star burst
        # Center glow
        for dx in range(-2, 3):
            for dy in range(-2, 3):
                dist = abs(dx) + abs(dy)
                if dist <= 3:
                    px, py = x + dx, y + dy
                    if 0 <= px < W and 0 <= py < H:
                        a = int(alpha * max(0.15, 1.0 - dist * 0.25))
                        frame.putpixel((px, py), (r, g, b, a))
        # Long spikes
        for d in range(1, 6):
            for dx, dy in [(d, 0), (-d, 0), (0, d), (0, -d)]:
                px, py = x + dx, y + dy
                if 0 <= px < W and 0 <= py < H:
                    a = int(alpha * max(0.1, 1.0 - d * 0.18))
                    frame.putpixel((px, py), (r, g, b, a))


frames = []

for i in range(FRAMES):
    t = i / FRAMES
    angle = t * math.pi * 2

    frame = base.copy()

    for (x, y, size, speed, phase, color) in stars:
        brightness = (math.sin(angle * speed + phase) + 1) / 2  # 0 to 1
        # Lower threshold = stars visible more of the time
        if brightness > 0.1:
            # Boost alpha — always at least 50% when visible
            alpha = int(128 + brightness * 127)  # 128-255 range
            r, g, b = color
            draw_star(frame, x, y, size, r, g, b, alpha)

    # Convert to RGB for GIF
    rgb_frame = Image.new("RGB", (W, H), (15, 15, 26))
    rgb_frame.paste(frame, mask=frame.split()[3])
    frames.append(rgb_frame)

# Save with optimization
frames[0].save(
    OUT,
    save_all=True,
    append_images=frames[1:],
    duration=DURATION,
    loop=0,
    optimize=True,
)

import os
size_kb = os.path.getsize(OUT) / 1024
print(f"Saved {OUT} — {len(frames)} frames, {DURATION}ms/frame, {W}x{H}, {size_kb:.0f}KB")
