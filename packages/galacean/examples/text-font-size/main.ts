// TextRenderer.fontSize in pixels, at several sizes
import { TextHorizontalAlignment, TextRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { scene2d } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await scene2d(el, ctx, { size: 4 });
  const sizes = [20, 32, 48, 64];
  sizes.forEach((size, i) => {
    const t = root.createChild(`size${size}`).addComponent(TextRenderer);
    t.entity.transform.setPosition(-3, 1.45 - i * 0.8, 0);
    t.text = `fontSize ${size}`;
    t.fontSize = size;
    t.horizontalAlignment = TextHorizontalAlignment.Left;
  });
  const grow = root.createChild('grow').addComponent(TextRenderer);
  grow.entity.transform.setPosition(1.6, 0, 0);
  grow.text = 'grow';
  const set = (v: number): void => {
    grow.fontSize = v;
    grow.text = `fontSize ${Math.round(v)}`;
  };
  if (stage.preview) tick(root, (_dt, t) => set(24 + 40 * (0.5 + 0.5 * Math.sin(t * 1.4))));
  else slider(stage.bar, 'right text fontSize', 8, 100, 1, 40, set);
  return stage.dispose;
};

export default mount;
