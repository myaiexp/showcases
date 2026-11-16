// Arrow: curve as a number from 0 to 1
import { Leafer } from 'leafer-ui';
import { Arrow } from '@leafer-in/arrow'; // the arrow plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the slider: curve from 0 to 1." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const k = stage.preview ? 0.75 : 1.3; // scale the docs-sized polyline to the pane

  const arrow = new Arrow({
    x: (stage.width - 240 * k) / 2,
    y: stage.height / 2,
    points: [0, 0, 60, -50, 120, 10, 180, -40, 240, 20].map((n) => n * k),
    curve: 0.5,
    stroke: '#32cd79',
    strokeWidth: 5,
  });
  leafer.add(arrow);
  drive(stage, 'curve', [0, 1, 0.1], 0.5, (v) => (arrow.curve = v), 4, (v) => v.toFixed(1));

  return stage.dispose;
};

export default mount;
