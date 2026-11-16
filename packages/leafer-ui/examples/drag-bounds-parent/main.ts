// dragBounds: parent keeps a dragged element inside its Frame
import { Ellipse, Frame, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the green circle past the edge of the white frame: it stops at the border.', paper: 'transparent' });
  const leafer = stage.own(new Leafer({ view: stage.view, fill: '#333' }));
  const f = stage.preview ? 150 : 260;
  const frame = new Frame({ x: (stage.width - f) / 2, y: (stage.height - f) / 2, width: f, height: f, overflow: 'show' });
  const ball = new Ellipse({
    width: f / 4,
    height: f / 4,
    fill: GREEN,
    dragBounds: 'parent', // limit dragging to the parent's box
    draggable: true,
  });
  frame.add(ball);
  leafer.add(frame);

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const o = { x: frame.x! + f / 8, y: frame.y! + f / 8 };
    script(stage, async () => {
      await ghost.drag(o, { x: o.x + f * 1.2, y: o.y + f * 0.4 }, 900);
      await stage.wait(500);
      await ghost.drag({ x: ball.worldBoxBounds.x + f / 8, y: ball.worldBoxBounds.y + f / 8 }, { x: o.x - 60, y: o.y - 50 }, 900);
      await stage.wait(500);
    });
  }
  return stage.dispose;
};

export default mount;
