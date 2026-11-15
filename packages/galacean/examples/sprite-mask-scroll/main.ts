// A SpriteMask as a scroll viewport over a tall column
import { SpriteMask, SpriteMaskInteraction } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { place, scene2d, spriteOf } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  caption(stage, 'a rectangular mask clips a column of rows');
  const mask = root.createChild('viewport').addComponent(SpriteMask);
  mask.sprite = spriteOf(engine, 8, 8, (g) => ((g.fillStyle = '#fff'), g.fillRect(0, 0, 8, 8)));
  mask.width = 3.4;
  mask.height = 2.2;
  const list = root.createChild('list');
  const row = (i: number) => spriteOf(engine, 128, 32, (g, w, h) => {
    g.fillStyle = `hsl(${i * 47} 55% 45%)`;
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#fff';
    g.font = 'bold 20px sans-serif';
    g.textBaseline = 'middle';
    g.fillText(`row ${i + 1}`, 12, h / 2);
  });
  for (let i = 0; i < 12; i++) {
    const r = place(list, row(i), 0, -i * 0.5, 3.2, 0.46, `row${i}`);
    r.maskInteraction = SpriteMaskInteraction.VisibleInsideMask;
  }
  const scroll = (v: number): void => list.transform.setPosition(0, v, 0);
  if (stage.preview) tick(root, (_dt, t) => scroll(2.5 + 2.4 * Math.sin(t * 0.7)));
  else slider(stage.bar, 'scroll', 0, 5.5, 0.01, 2.5, scroll);
  scroll(2.5);
  return stage.dispose;
};

export default mount;
