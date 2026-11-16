// UI: clone with new styles
import { Leafer, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press clone.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.35;
  const original = new Star({ x: 30, y: stage.height / 2 - S / 2 - 12, width: S, height: S, corners: 5, fill: '#32cd79', draggable: true });
  leafer.add(original);
  const colors = ['#FEB027', '#FF4B4B', '#4B8BFF', '#b05cff'];
  let n = 0;
  const note = caption(stage, leafer);
  const go = (): void => {
    if (n === 4) { leafer.children.slice(1).forEach((c) => c.tag === 'Star' && c.remove()); n = 0; }
    n++;
    leafer.add(original.clone({ x: 30 + n * (S + 10), fill: colors[n - 1], rotation: n * 20 }));
    note.text = `original.clone({ x, fill, rotation }): ${n}`;
  };
  go();
  if (stage.bar) button(stage.bar, 'clone', go);
  else stage.every(900, go);

  return stage.dispose;
};

export default mount;
