// Arrow: registerArrow() a custom head
import { Leafer, path, PathArrow } from 'leafer-ui';
import { Arrow } from '@leafer-in/arrow'; // the arrow plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the slider: the arrowhead follows the stroke width." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const len = stage.preview ? 150 : 320; // the docs' line is 100 long
  Arrow.registerArrow('showcase-chevron', {
    // designed for line width 1, pointing right, the end at (0, 0)
    connect: { x: -0.5 }, // where the line joins the head
    offset: {
      x: -0.71, // shift to align with the end
      bevelJoin: 0.36, // extra shift when strokeJoin is bevel
      roundJoin: 0.22, // extra shift when strokeJoin is round
    },
    path: path().moveTo(-5, -5).lineTo(0, 0).lineTo(-5, 3).path, // M, L, C, Q and O commands only
  });
  stage.onDispose(() => delete (PathArrow.list as Record<string, unknown>)['showcase-chevron']); // the registry is page-wide
  const arrow = new Arrow({
    x: (stage.width - len) / 2,
    y: stage.height / 2,
    width: len,
    stroke: '#32cd79',
    strokeWidth: 5,
    endArrow: 'showcase-chevron', // the custom head
  });
  leafer.add(arrow);
  drive(stage, 'strokeWidth', [2, 14, 1], 5, (v) => (arrow.strokeWidth = v));

  return stage.dispose;
};

export default mount;
