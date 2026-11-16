// Polygon: curve true smooths the outline
import { Leafer, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle curve.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const polygon = new Polygon({
    ...mid(stage, S), points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90, 90, 90, 10, 90].map((v) => v * k),
    curve: true, fill: '#32cd79',
  });
  leafer.add(polygon);
  toggle(stage, 'curve', true, (v) => (polygon.curve = v), 1400);

  return stage.dispose;
};

export default mount;
