// Arrow: endArrow "none"
import { Leafer } from 'leafer-ui';
import { Arrow } from '@leafer-in/arrow'; // the arrow plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the slider: the arrowhead follows the stroke width." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const len = stage.preview ? 150 : 320; // the docs' line is 100 long

  const arrow = new Arrow({
    x: (stage.width - len) / 2,
    y: stage.height / 2,
    width: len,
    stroke: '#32cd79',
    strokeWidth: 5,
    endArrow: 'none',
  });
  leafer.add(arrow);
  drive(stage, 'strokeWidth', [2, 14, 1], 5, (v) => (arrow.strokeWidth = v));

  return stage.dispose;
};

export default mount;
