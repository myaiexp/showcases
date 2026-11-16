// UI: skewOf shears around an origin
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick an axis and press skew.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.6;
  const home = { x: stage.width / 2 - S / 2, y: stage.height / 2 - S / 2 - 8, skewX: 0, skewY: 0 };
  const rect = new Rect({ ...home, width: S, height: S, fill: '#4B8BFF', cornerRadius: 10 });
  leafer.add(rect);
  const note = caption(stage, leafer);
  let axis: 'skewX' | 'skewY' = 'skewX';
  let sign = 1;
  const go = (): void => {
    if (axis === 'skewX') rect.skewOf('center', 15 * sign, 0);
    else rect.skewOf('center', 0, 15 * sign);
    if (Math.abs(rect[axis]!) > 44) sign = -sign;
    note.text = `skewOf('center', ...): ${axis} ${Math.round(rect[axis]!)}`;
  };
  pick(stage, 'axis', ['skewX', 'skewY'] as const, (a) => ((axis = a), rect.set(home), (sign = 1)), 5600);
  if (stage.bar) button(stage.bar, 'skew 15', go);
  else stage.every(700, go);

  return stage.dispose;
};

export default mount;
