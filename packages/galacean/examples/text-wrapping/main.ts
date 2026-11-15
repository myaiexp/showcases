// enableWrapping: a paragraph breaks at the renderer's width
import { TextHorizontalAlignment, TextRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { box, scene2d } from '../../shared/twod-kit.ts';

const LOREM = 'Galacean builds a scene from entities and components, and a text renderer can wrap a long sentence to fit the width you give it.';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const back = box(root, engine, 0, 0, 4, 3);
  const text = root.createChild('paragraph').addComponent(TextRenderer);
  text.text = LOREM;
  text.fontSize = 26;
  text.enableWrapping = true;
  text.horizontalAlignment = TextHorizontalAlignment.Left;
  const set = (w: number): void => {
    text.width = back.width = w;
    text.height = back.height = 3;
    say(`enableWrapping = ${text.enableWrapping}, width = ${w.toFixed(2)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => set(2 + 1.8 * (0.5 + 0.5 * Math.sin(t * 0.9))));
  else {
    slider(stage.bar, 'width', 1, 6, 0.01, 4, set);
    checkbox(stage.bar, 'enableWrapping', true, (v) => ((text.enableWrapping = v), set(text.width)));
    set(4);
  }
  return stage.dispose;
};

export default mount;
