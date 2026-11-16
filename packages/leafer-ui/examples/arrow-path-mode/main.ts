// Arrow: path mode
import { Leafer } from 'leafer-ui';
import { Arrow } from '@leafer-in/arrow'; // the arrow plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the slider: the arrowhead follows the stroke width." });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const arrow = new Arrow({
    x: (stage.width - 220) / 2,
    y: stage.height / 2,
    path: 'M 0 0 C 60 -80 140 80 220 0',
    stroke: '#32cd79',
    strokeWidth: 5,
    startArrow: 'diamond',
  });
  leafer.add(arrow);
  drive(stage, 'strokeWidth', [2, 14, 1], 5, (v) => (arrow.strokeWidth = v));

  return stage.dispose;
};

export default mount;
