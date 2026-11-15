// horizontalAlignment x verticalAlignment: nine boxes
import { TextHorizontalAlignment, TextRenderer, TextVerticalAlignment } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { box, scene2d } from '../../shared/twod-kit.ts';

const H = ['Left', 'Center', 'Right'] as const;
const V = ['Top', 'Center', 'Bottom'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const cells: { text: TextRenderer; back: ReturnType<typeof box> }[] = [];
  V.forEach((v, row) => H.forEach((h, col) => {
    const x = (col - 1) * 2.3;
    const y = (1 - row) * 1.3;
    const back = box(root, engine, x, y, 2, 1.1, [0.2, 0.28, 0.45, 1]);
    const text = root.createChild(`${v}-${h}`).addComponent(TextRenderer);
    text.entity.transform.setPosition(x, y, 0);
    text.text = `${h}\n${v}`;
    text.fontSize = 22;
    text.width = 2;
    text.height = 1.1;
    text.horizontalAlignment = TextHorizontalAlignment[h];
    text.verticalAlignment = TextVerticalAlignment[v];
    cells.push({ text, back });
  }));
  const size = (w: number, h: number): void => {
    for (const c of cells) {
      c.text.width = c.back.width = w;
      c.text.height = c.back.height = h;
    }
  };
  if (stage.preview) tick(root, (_dt, t) => size(1.8 + 0.3 * Math.sin(t * 1.4), 1.0 + 0.1 * Math.cos(t * 1.1)));
  else {
    slider(stage.bar, 'width', 1.2, 2.2, 0.01, 2, (v) => size(v, cells[0]!.back.height));
    slider(stage.bar, 'height', 0.7, 1.2, 0.01, 1.1, (v) => size(cells[0]!.back.width, v));
  }
  return stage.dispose;
};

export default mount;
