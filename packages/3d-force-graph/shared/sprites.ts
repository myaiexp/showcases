// Sprites drawn in code: canvas textures for text and images, disposed with the stage
import { CanvasTexture, Sprite, SpriteMaterial, SRGBColorSpace } from 'three';
import type { Stage } from './stage.ts';

export interface Sprites {
  /** A sprite showing `paint`'s drawing on a `w` x `h` canvas, `height` scene units tall. */
  draw(w: number, h: number, paint: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, height: number): Sprite;
  /** A sprite with a line of text, `height` scene units tall. */
  text(text: string, opts?: { color?: string; background?: string; height?: number }): Sprite;
}

/** Makes sprites and frees every texture and material they used when the stage is disposed. */
export function sprites(stage: Stage): Sprites {
  const made: { dispose(): void }[] = [];
  stage.onDispose(() => {
    for (const m of made) m.dispose();
    made.length = 0;
  });
  const draw: Sprites['draw'] = (w, h, paint, height) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    paint(canvas.getContext('2d')!, w, h);
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    const material = new SpriteMaterial({ map, transparent: true, depthWrite: false });
    made.push(map, material);
    const sprite = new Sprite(material);
    sprite.scale.set((height * w) / h, height, 1);
    return sprite;
  };
  return {
    draw,
    text(text, { color = '#ffffff', background, height = 6 } = {}) {
      const font = '600 44px sans-serif';
      const probe = document.createElement('canvas').getContext('2d')!;
      probe.font = font;
      const w = Math.ceil(probe.measureText(text).width) + 32;
      return draw(
        w,
        64,
        (ctx, cw, ch) => {
          if (background) {
            ctx.fillStyle = background;
            ctx.beginPath();
            ctx.roundRect(0, 0, cw, ch, 14);
            ctx.fill();
          }
          ctx.font = font;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = color;
          ctx.fillText(text, cw / 2, ch / 2 + 2);
        },
        height,
      );
    },
  };
}
