// One texture sheet, several Sprites each with its own region
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { place, scene2d, spriteFrom, textureOf } from '../../shared/twod-kit.ts';

const FRAMES = 8;

/** Eight 64 px cells in a row: a ball squashing and stretching while it hops. */
const sheet = (g: CanvasRenderingContext2D, w: number, h: number): void => {
  const cell = w / FRAMES;
  for (let i = 0; i < FRAMES; i++) {
    const a = (i / FRAMES) * Math.PI * 2;
    const squash = 1 + 0.35 * Math.cos(a);
    const cx = cell * (i + 0.5);
    const cy = h * (0.7 - 0.3 * Math.max(0, Math.sin(a)));
    g.fillStyle = '#ff9f43';
    g.beginPath();
    g.ellipse(cx, cy, (cell * 0.3) * squash, (cell * 0.3) / squash, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#fff';
    g.font = '11px sans-serif';
    g.textAlign = 'center';
    g.fillText(String(i), cx, 12);
    g.strokeStyle = 'rgba(255,255,255,.25)';
    g.strokeRect(cell * i + 0.5, 0.5, cell - 1, h - 1);
  }
};

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const texture = textureOf(engine, 512, 64, sheet);
  const sprites = Array.from({ length: FRAMES }, (_, i) => spriteFrom(engine, texture, { region: [i / FRAMES, 0, 1 / FRAMES, 1] }));
  place(root, spriteFrom(engine, texture), 0, -1.5, 6, 0.75, 'sheet');
  const player = place(root, sprites[0]!, 0, 0.4, 1.8, 1.8, 'player');
  const show = (i: number): void => {
    player.sprite = sprites[i]!;
    say(`frame ${i}: region = (${i}/${FRAMES}, 0, 1/${FRAMES}, 1)`);
  };
  if (stage.preview) steps(root, 0.12, FRAMES, show);
  else {
    slider(stage.bar, 'frame', 0, FRAMES - 1, 1, 0, show);
    show(0);
  }
  return stage.dispose;
};

export default mount;
