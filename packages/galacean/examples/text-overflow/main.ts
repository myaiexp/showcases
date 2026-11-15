// OverflowMode: Overflow grows the layout, Truncate keeps the height
import { OverflowMode, TextHorizontalAlignment, TextRenderer, TextVerticalAlignment } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { select, slider } from '../../shared/controls.ts';
import { box, scene2d } from '../../shared/twod-kit.ts';

const POEM = 'one fish\ntwo fish\nred fish\nblue fish\ngreen fish\nold fish\nnew fish';
const ALIGN = ['Top', 'Center', 'Bottom'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const modes = ['Overflow', 'Truncate'] as const;
  const rows = modes.map((mode, i) => {
    const x = -1.8 + i * 3.6;
    const back = box(root, engine, x, 0, 2.6, 1.2);
    const t = root.createChild(mode).addComponent(TextRenderer);
    t.entity.transform.setPosition(x, 0, 0);
    t.text = POEM;
    t.fontSize = 24;
    t.width = 2.6;
    t.height = 1.2;
    t.horizontalAlignment = TextHorizontalAlignment.Center;
    t.overflowMode = OverflowMode[mode];
    return { t, back };
  });
  const align = (v: (typeof ALIGN)[number]): void => {
    for (const r of rows) r.t.verticalAlignment = TextVerticalAlignment[v];
    say(`verticalAlignment = ${v} | left Overflow, right Truncate (7 lines in a box 1.2 tall; 1.6.13 never clips)`);
  };
  if (stage.preview) steps(root, 2, ALIGN.length, (i) => align(ALIGN[i]!));
  else {
    align('Center');
    select(stage.bar, 'verticalAlignment', ALIGN, align, 'Center');
    slider(stage.bar, 'height', 0.4, 2.4, 0.01, 1.2, (h) => rows.forEach((r) => (r.t.height = r.back.height = h)));
  }
  return stage.dispose;
};

export default mount;
