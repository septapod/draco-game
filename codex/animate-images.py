"""Batch-animate all PNG images in codex/images/ to sparkly GIFs.

Adapted from animate-hero.py. Adds twinkling sparkle particles with
element-themed colors for dragons, ambient particles for scenes, and
subtle gleam for characters.

Usage:
    cd ~/dev/draco-game
    python codex/animate-images.py
"""

from PIL import Image, ImageDraw
import random
import math
import os
import sys

IMAGES_DIR = "codex/images"
FRAMES = 10
DURATION = 200  # ms per frame (5fps)
MAX_COLORS = 128  # GIF palette size

# Skip these files — old versions or already animated
SKIP = {
    "aloha-v1.png",
    "wonky-donkers-v1.png",
    "hero-banner.png",  # already has .gif
}

# ── Element color maps ──
ELEMENT_COLORS = {
    "fire": [(255, 100, 50), (255, 200, 50), (255, 150, 30)],
    "water": [(50, 150, 255), (100, 200, 255), (150, 220, 255)],
    "grass": [(50, 200, 80), (100, 255, 100), (180, 255, 50)],
    "electric": [(255, 255, 50), (255, 220, 100), (255, 255, 180)],
    "psychic": [(200, 50, 255), (255, 100, 255), (180, 80, 220)],
    "spirit": [(150, 50, 200), (200, 100, 255), (100, 0, 180)],
    "speed": [(255, 200, 50), (255, 180, 0), (255, 230, 100)],
    "power": [(255, 100, 50), (50, 150, 255), (50, 200, 80), (255, 255, 50)],
    "thunder-cloud": [(100, 100, 255), (200, 200, 255), (150, 150, 255)],
    "universe": [(150, 200, 255), (200, 230, 255), (255, 255, 255)],
    "cosmic": [(180, 150, 255), (220, 200, 255), (255, 255, 255)],
    "egg": [(255, 215, 150), (255, 200, 100), (255, 230, 180)],
    "wood": [(180, 140, 80), (100, 180, 50), (200, 170, 100)],
    "starlight": [(220, 220, 255), (255, 255, 255), (200, 200, 230)],
}

# Ambient sparkle colors for scenes and characters
SCENE_COLORS = [
    (255, 255, 220), (220, 235, 255), (255, 215, 0),
    (180, 220, 255), (255, 180, 100),
]
CHARACTER_COLORS = [
    (255, 255, 240), (220, 230, 255), (255, 215, 0),
]

# ── Image classification ──
DRAGON_MAP = {
    "fire-dragon.png": "fire",
    "water-dragon.png": "water",
    "grass-dragon.png": "grass",
    "electric-dragon.png": "electric",
    "psychic-dragon.png": "psychic",
    "spirit-dragon.png": "spirit",
    "speed-dragon.png": "speed",
    "power-dragon.png": "power",
    "thunder-cloud-dragon.png": "thunder-cloud",
    "universe-dragon.png": "universe",
    "cosmic-dragon.png": "cosmic",
    "egg-dragon.png": "egg",
    "wood-dragon.png": "wood",
    "starlight-dragon.png": "starlight",
    "spirit-grass-breed.png": "spirit",  # use spirit colors
}

SCENE_IMAGES = {
    "world-landscape.png",
    "first-choice-stable.png",
    "dragon-eggs-closeup.png",
    "berry-plant.png",
    "the-crystal.png",
    "dragon-eye-amulet.png",
    "racing-stadium.png",
    "racing-trophy.png",
    "race-drone-pink.png",
    "battle-scene.png",
    "force-field.png",
    "elemental-clash.png",
    "keeper-transformation.png",
    "night-scene.png",
}

CHARACTER_IMAGES = {
    "aloha.png",
    "draco-evil-shell.png",
    "wonky-donkers.png",
    "tow-road.png",
    "evil-groundhog.png",
    "jack-o-rabbit.png",
    "jack-o-rabbit-battle.png",
    "snake-friend.png",
    "flash-dragon.png",
    "spirit-grass-breed-encounter.png",
}


def get_image_type(filename):
    """Return (type, colors, particle_count) for the given image."""
    if filename in DRAGON_MAP:
        element = DRAGON_MAP[filename]
        return ("dragon", ELEMENT_COLORS[element], 50)
    elif filename in SCENE_IMAGES:
        return ("scene", SCENE_COLORS, 45)
    elif filename in CHARACTER_IMAGES:
        return ("character", CHARACTER_COLORS, 25)
    else:
        # Unknown — treat as scene
        return ("scene", SCENE_COLORS, 40)


def draw_star(frame, x, y, size, r, g, b, alpha, W, H):
    """Draw a pixel-art sparkle particle."""
    alpha = max(0, min(255, alpha))
    if size <= 2:
        for dx, dy in [(0, 0), (1, 0), (-1, 0), (0, 1), (0, -1)]:
            px, py = x + dx, y + dy
            if 0 <= px < W and 0 <= py < H:
                frame.putpixel((px, py), (r, g, b, alpha))
    elif size <= 3:
        frame.putpixel((x, y), (r, g, b, alpha))
        for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            px, py = x + dx, y + dy
            if 0 <= px < W and 0 <= py < H:
                frame.putpixel((px, py), (r, g, b, int(alpha * 0.8)))
        for dx, dy in [(2, 0), (-2, 0), (0, 2), (0, -2)]:
            px, py = x + dx, y + dy
            if 0 <= px < W and 0 <= py < H:
                frame.putpixel((px, py), (r, g, b, int(alpha * 0.4)))
    else:
        # Diamond core
        for dx in range(-2, 3):
            for dy in range(-2, 3):
                dist = abs(dx) + abs(dy)
                if dist <= 2:
                    px, py = x + dx, y + dy
                    if 0 <= px < W and 0 <= py < H:
                        a = int(alpha * max(0.2, 1.0 - dist * 0.3))
                        frame.putpixel((px, py), (r, g, b, a))
        # Spikes
        for d in range(1, 4):
            for dx, dy in [(d, 0), (-d, 0), (0, d), (0, -d)]:
                px, py = x + dx, y + dy
                if 0 <= px < W and 0 <= py < H:
                    a = int(alpha * max(0.15, 1.0 - d * 0.25))
                    frame.putpixel((px, py), (r, g, b, a))


def animate_image(src_path, out_path, colors, particle_count):
    """Create an animated GIF with sparkle particles from a source PNG."""
    base = Image.open(src_path).convert("RGBA")
    W, H = base.size

    random.seed(hash(os.path.basename(src_path)))

    # Generate particle positions across the full image
    particles = []
    for _ in range(particle_count):
        x = random.randint(8, W - 8)
        y = random.randint(8, H - 8)
        size = random.choice([2, 2, 3, 3, 3, 4])
        speed = random.uniform(0.8, 3.0)
        phase = random.uniform(0, math.pi * 2)
        color = random.choice(colors)
        particles.append((x, y, size, speed, phase, color))

    frames = []
    for i in range(FRAMES):
        t = i / FRAMES
        angle = t * math.pi * 2

        frame = base.copy()

        for (x, y, size, speed, phase, color) in particles:
            brightness = (math.sin(angle * speed + phase) + 1) / 2
            if brightness > 0.15:
                alpha = int(100 + brightness * 155)  # 100-255
                r, g, b = color
                draw_star(frame, x, y, size, r, g, b, alpha, W, H)

        # Convert RGBA → RGB for GIF (dark background fill)
        rgb_frame = Image.new("RGB", (W, H), (15, 15, 26))
        rgb_frame.paste(frame, mask=frame.split()[3])

        # Quantize to reduce palette for smaller GIF
        rgb_frame = rgb_frame.quantize(colors=MAX_COLORS, method=Image.Quantize.MEDIANCUT).convert("RGB")
        frames.append(rgb_frame)

    frames[0].save(
        out_path,
        save_all=True,
        append_images=frames[1:],
        duration=DURATION,
        loop=0,
        optimize=True,
    )

    size_kb = os.path.getsize(out_path) / 1024
    return size_kb


def main():
    if not os.path.isdir(IMAGES_DIR):
        print(f"Error: {IMAGES_DIR} not found. Run from project root.")
        sys.exit(1)

    pngs = sorted(f for f in os.listdir(IMAGES_DIR) if f.endswith(".png"))
    total_animated = 0
    total_skipped = 0
    total_size_kb = 0

    for png in pngs:
        if png in SKIP:
            print(f"  SKIP  {png} (in skip list)")
            total_skipped += 1
            continue

        gif_name = png.replace(".png", ".gif")
        gif_path = os.path.join(IMAGES_DIR, gif_name)

        if os.path.exists(gif_path):
            print(f"  SKIP  {png} (GIF already exists)")
            total_skipped += 1
            continue

        img_type, colors, particle_count = get_image_type(png)
        src_path = os.path.join(IMAGES_DIR, png)

        print(f"  ANIM  {png} → {gif_name} ({img_type}, {particle_count} particles)...", end="", flush=True)
        try:
            size_kb = animate_image(src_path, gif_path, colors, particle_count)
            size_flag = " [LARGE]" if size_kb > 800 else ""
            print(f" {size_kb:.0f}KB{size_flag}")
            total_animated += 1
            total_size_kb += size_kb
        except Exception as e:
            print(f" ERROR: {e}")

    print(f"\nDone: {total_animated} animated, {total_skipped} skipped")
    print(f"Total GIF size: {total_size_kb / 1024:.1f}MB")


if __name__ == "__main__":
    main()
