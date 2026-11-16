// PathBox: strokeAlign
import { Leafer, Ellipse } from 'leafer-ui';
import { PathBox } from '@leafer-in/box';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The stroke is 14 px wide; see which side of the path it falls on.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const box = new PathBox({ ...mid(stage, S * 1.3), path: 'X 0 0 100 100 30', fill: '#FF4B4B', stroke: '#1d4e89', strokeWidth: 14 });
  box.scale = k;
  const circle = new Ellipse({ x: 60, y: 60, width: 50, height: 50, fill: '#FEB027' });
  leafer.add(box);
  box.add(circle);

  pick(stage, 'strokeAlign', ['center', 'inside', 'outside'] as const, (v) => (box.strokeAlign = v), 1800);

  return stage.dispose;
};

export default mount;
