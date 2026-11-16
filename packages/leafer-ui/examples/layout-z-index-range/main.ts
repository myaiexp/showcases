// Layout: zIndex values, negatives and ties
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each rect has its own zIndex (default 0, negatives allowed). Equal values keep the order the rects were added in.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const colors = ['#32cd79', '#FEB027', '#4B8BFF'];
  const names = ['green', 'yellow', 'blue'];
  const rects = colors.map((fill, i) => new Rect({ x: stage.width / 2 - S * 0.9 + i * S * 0.45, y: 20 + i * S * 0.2, width: S, height: S, fill, stroke: '#fff', strokeWidth: 3, cornerRadius: 8 }));
  leafer.add(rects);
  const show = label(stage, '', true);
  const refresh = (): void => show(rects.map((r, i) => `${names[i]} ${r.zIndex}`).join('   '));
  refresh();
  if (stage.bar) {
    rects.forEach((r, i) => slider(stage.bar!, names[i]!, -3, 3, 1, 0, (v) => ((r.zIndex = v), refresh())));
  } else {
    const steps = [[0, 0, 0], [2, 0, 0], [2, -1, 1], [-2, 3, 0]] as const;
    let n = 0;
    stage.every(1300, () => {
      const s = steps[n++ % steps.length]!;
      rects.forEach((r, i) => (r.zIndex = s[i]!));
      refresh();
    });
  }

  return stage.dispose;
};

export default mount;
