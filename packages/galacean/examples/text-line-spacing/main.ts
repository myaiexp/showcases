// TextRenderer.lineSpacing between the lines of a text
import { TextRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { scene2d } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const texts = [-2.6, 0, 2.6].map((x) => {
    const t = root.createChild('lines').addComponent(TextRenderer);
    t.entity.transform.setPosition(x, 0, 0);
    t.text = 'first line\nsecond line\nthird line';
    t.fontSize = 24;
    return t;
  });
  const set = (v: number): void => {
    texts[0]!.lineSpacing = 0;
    texts[1]!.lineSpacing = v;
    texts[2]!.lineSpacing = v * 2;
    say(`lineSpacing: 0 | ${v.toFixed(0)} | ${(v * 2).toFixed(0)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => set(12 * (0.5 + 0.5 * Math.sin(t * 1.3))));
  else {
    slider(stage.bar, 'lineSpacing (middle)', 0, 40, 1, 10, set);
    set(10);
  }
  return stage.dispose;
};

export default mount;
