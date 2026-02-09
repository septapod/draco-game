#!/usr/bin/env python3
"""
Resize all Codex images to 512px max dimension.
- PNGs: resize in-place
- GIFs (animated): resize all frames, preserve animation
"""

import os
from PIL import Image

IMAGES_DIR = os.path.join(os.path.dirname(__file__), "images")
MAX_SIZE = 512

# Only these GIFs keep their animation; all others will be served as static PNGs
KEEP_ANIMATED = {
    "hero-banner.gif",
    "the-crystal.gif",
    "dragon-eye-amulet.gif",
    "keeper-transformation.gif",
    "night-scene.gif",
    "elemental-clash.gif",
}

def resize_png(filepath):
    """Resize a PNG to MAX_SIZE max dimension."""
    img = Image.open(filepath)
    if max(img.size) <= MAX_SIZE:
        print(f"  SKIP {os.path.basename(filepath)} — already {img.size[0]}x{img.size[1]}")
        return False

    old_size = img.size
    img.thumbnail((MAX_SIZE, MAX_SIZE), Image.LANCZOS)
    img.save(filepath, optimize=True)
    new_size = img.size
    print(f"  RESIZE {os.path.basename(filepath)}: {old_size[0]}x{old_size[1]} → {new_size[0]}x{new_size[1]}")
    return True


def resize_gif(filepath):
    """Resize an animated GIF, preserving all frames and timing."""
    img = Image.open(filepath)

    if max(img.size) <= MAX_SIZE:
        print(f"  SKIP {os.path.basename(filepath)} — already {img.size[0]}x{img.size[1]}")
        return False

    old_size = img.size
    frames = []
    durations = []

    try:
        while True:
            # Get frame duration
            duration = img.info.get('duration', 200)
            durations.append(duration)

            # Resize frame
            frame = img.copy()
            frame.thumbnail((MAX_SIZE, MAX_SIZE), Image.LANCZOS)
            frames.append(frame)

            img.seek(img.tell() + 1)
    except EOFError:
        pass

    if not frames:
        return False

    # Save resized GIF
    frames[0].save(
        filepath,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        optimize=True,
    )

    new_size = frames[0].size
    print(f"  RESIZE {os.path.basename(filepath)}: {old_size[0]}x{old_size[1]} → {new_size[0]}x{new_size[1]}")
    return True


def main():
    print(f"Optimizing images in {IMAGES_DIR}")
    print(f"Max dimension: {MAX_SIZE}px\n")

    resized_count = 0
    skipped_count = 0

    for filename in sorted(os.listdir(IMAGES_DIR)):
        filepath = os.path.join(IMAGES_DIR, filename)

        if filename.endswith(".png"):
            if resize_png(filepath):
                resized_count += 1
            else:
                skipped_count += 1

        elif filename.endswith(".gif"):
            if filename in KEEP_ANIMATED:
                # Resize but keep animated
                if resize_gif(filepath):
                    resized_count += 1
                else:
                    skipped_count += 1
            else:
                # Not in keep list — just skip, HTML will point to .png
                skipped_count += 1

    print(f"\nDone: {resized_count} resized, {skipped_count} skipped")


if __name__ == "__main__":
    main()
