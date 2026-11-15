// TextRenderer.bounds: the real box the text occupies
import { TextRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { box, scene2d } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const frame = box(root, engine, 0, 0, 1, 1, [0.9, 0.5, 0.2, 0.55], -1);
  const text = root.createChild('text').addComponent(TextRenderer);
  text.text = 'bounds\nfollow the text';
  text.fontSize = 36;
  const fit = (): void => {
    const { min, max } = text.bounds;
    frame.entity.transform.setPosition((min.x + max.x) / 2, (min.y + max.y) / 2, 0);
    frame.width = max.x - min.x;
    frame.height = max.y - min.y;
    say(`bounds size ${(max.x - min.x).toFixed(2)} x ${(max.y - min.y).toFixed(2)} (width and height are not set)`);
  };
  let size = 36;
  if (stage.preview) tick(root, (_dt, t) => {
    text.fontSize = 30 + 14 * Math.sin(t * 1.2);
    text.text = Math.sin(t * 0.6) > 0 ? 'bounds\nfollow the text' : 'bounds follow';
    fit();
  });
  else {
    slider(stage.bar, 'fontSize', 14, 80, 1, size, (v) => ((text.fontSize = size = v), fit()));
    tick(root, fit);
  }
  return stage.dispose;
};

export default mount;
