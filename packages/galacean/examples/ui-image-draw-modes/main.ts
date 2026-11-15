// Image.drawMode: Simple stretches, Sliced keeps the border, Tiled repeats
import { SpriteDrawMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { image, label, rect, uiScene } from '../../shared/ui-kit.ts';
import { panelArt, spriteOf } from '../../shared/twod-kit.ts';

const MODES = ['Simple', 'Sliced', 'Tiled'] as const;

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  caption(stage, 'Image.drawMode: Simple | Sliced | Tiled, one sprite with a quarter border');
  const imgs = MODES.map((mode, i) => {
    const sprite = spriteOf(stage.engine, 96, 96, panelArt, { border: [0.25, 0.25, 0.25, 0.25] });
    const im = image(canvasEntity, -240 + i * 240, 10, 200, 160, { sprite }, mode);
    im.image.drawMode = SpriteDrawMode[mode];
    label(canvasEntity, -240 + i * 240, -100, mode, 24);
    return im;
  });
  const size = (w: number, h: number): void => imgs.forEach((im) => rect(im.entity).size.set(w, h));
  if (stage.preview) tick(canvasEntity, (_dt, t) => size(180 + 40 * Math.sin(t * 1.2), 140 + 40 * Math.cos(t * 0.9)));
  else {
    slider(stage.bar, 'width', 100, 230, 1, 200, (v) => size(v, rect(imgs[0]!.entity).size.y));
    slider(stage.bar, 'height', 80, 200, 1, 160, (v) => size(rect(imgs[0]!.entity).size.x, v));
  }
  return stage.dispose;
};

export default mount;
