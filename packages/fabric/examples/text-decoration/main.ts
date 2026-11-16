// Text: underline, overline and linethrough are separate booleans that combine
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { cycle, INK } from '../../shared/text.ts';

const COMBOS = [
  [true, false, false],
  [false, true, false],
  [false, false, true],
  [true, true, false],
  [true, true, true],
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Any combination works; there is no textDecoration string in v7.' });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText('Decorated text', { left: 180, top: 120, fontFamily: 'Lora', fontSize: 42, fill: INK, underline: true });
  canvas.add(text);

  const say = status(stage);
  const apply = (u: boolean, o: boolean, l: boolean): void => {
    text.set({ underline: u, overline: o, linethrough: l });
    say([u && 'underline', o && 'overline', l && 'linethrough'].filter(Boolean).join(' + ') || 'none');
    canvas.requestRenderAll();
  };
  apply(true, false, false);

  if (stage.bar) {
    const bar = stage.bar;
    const boxes = {
      underline: checkbox(bar, 'underline', true, () => sync()),
      overline: checkbox(bar, 'overline', false, () => sync()),
      linethrough: checkbox(bar, 'linethrough', false, () => sync()),
    };
    const sync = (): void => apply(boxes.underline.checked, boxes.overline.checked, boxes.linethrough.checked);
  } else {
    cycle(stage, COMBOS, 1000, ([u, o, l]) => apply(u, o, l));
  }
  return stage.dispose;
};

export default mount;
