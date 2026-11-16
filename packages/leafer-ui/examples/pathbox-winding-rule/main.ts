// PathBox: the winding rule decides whether the inner circle is a hole
import { Leafer, Ellipse } from 'leafer-ui';
import { PathBox } from '@leafer-in/box';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the winding rule.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const box = new PathBox({ ...mid(stage, S * 1.3), path: 'X 0 0 100 100 30 P 50 50 25', fill: '#FF4B4B' });
  box.scale = k;
  const circle = new Ellipse({ x: 60, y: 60, width: 50, height: 50, fill: '#FEB027' });
  leafer.add(box);
  box.add(circle);

  pick(stage, 'windingRule', ['evenodd', 'nonzero'] as const, (v) => (box.windingRule = v), 1800);

  return stage.dispose;
};

export default mount;
