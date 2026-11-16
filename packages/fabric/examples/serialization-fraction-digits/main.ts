// Serialization: config.NUM_FRACTION_DIGITS rounds numbers in toObject and toSVG
import { Canvas, config, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { createStage } from '../../shared/stage.ts';

/**
 * NUM_FRACTION_DIGITS is page-wide: set it, export, and put it back in the same tick,
 * so no other example sees the change.
 */
function withDigits<T>(digits: number, run: () => T): T {
  const before = config.NUM_FRACTION_DIGITS;
  config.NUM_FRACTION_DIGITS = digits;
  try {
    return run();
  } finally {
    config.NUM_FRACTION_DIGITS = before;
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['original', 'restored'],
    scene: [160, 160],
    hint: 'A large rectangle shrunk with scale 0.0151. With few digits the saved scale is rounded and the restored copy comes back the wrong size.',
  });
  const [a, b] = stage.panes as [typeof stage.panes[0], typeof stage.panes[0]];
  const original = stage.own(new Canvas(a.el, { selection: false, skipTargetFind: true }), a);
  const restored = stage.own(new Canvas(b.el, { selection: false, skipTargetFind: true }), b);
  const say = briefStatus(stage);

  const big = new Rect({ left: 80, top: 80, width: 6000, height: 4500, scaleX: 0.0151, scaleY: 0.0151, fill: '#3b7dd8', stroke: '#1d4a8c', strokeWidth: 80 });
  original.add(big);

  let token = 0;
  const run = async (digits: number): Promise<void> => {
    const mine = ++token;
    const o = withDigits(digits, () => original.toObject());
    const svg = withDigits(digits, () => original.toSVG({ suppressPreamble: true }));
    await restored.loadFromJSON(o);
    restored.requestRenderAll(); // loadFromJSON does not repaint by itself
    if (mine !== token || stage.disposed) return;
    const copy = restored.getObjects()[0]!;
    const w = (copy.getScaledWidth() / big.getScaledWidth()) * 100;
    say(
      `${digits} digits: scaleX ${(o.objects[0] as { scaleX: number }).scaleX}, ` +
        `width ${copy.getScaledWidth().toFixed(1)}px (${w.toFixed(0)}% of the original)\n` +
        (stage.preview ? '' : `SVG: ${svg.match(/<rect[^>]*>/)?.[0].slice(0, 120)}...`),
    );
  };

  if (stage.bar) {
    slider(stage.bar, 'NUM_FRACTION_DIGITS', 0, 6, 1, 2, (v) => void run(v));
    void run(2);
  } else {
    let n = 0;
    const digits = [2, 3, 4, 3];
    const next = (): void => void run(digits[n++ % digits.length]!);
    next();
    stage.every(1300, next);
  }

  return stage.dispose;
};

export default mount;
