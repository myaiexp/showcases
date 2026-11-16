// Arrow: points with curve true
import { Leafer } from 'leafer-ui';
import { Arrow } from '@leafer-in/arrow'; // the arrow plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the slider: the arrowhead follows the stroke width." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const k = stage.preview ? 0.75 : 1.3; // scale the docs-sized polyline to the pane

  const arrow = new Arrow({
    x: (stage.width - 240 * k) / 2,
    y: stage.height / 2,
    points: [0, 0, 60, -50, 120, 10, 180, -40, 240, 20].map((n) => n * k),
    curve: true,
    stroke: '#32cd79',
    strokeWidth: 5,
  });
  leafer.add(arrow);
  drive(stage, 'strokeWidth', [2, 14, 1], 5, (v) => (arrow.strokeWidth = v));

  return stage.dispose;
};

export default mount;
