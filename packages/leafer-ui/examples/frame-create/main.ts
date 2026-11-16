// Frame: a clipping artboard
import { Ellipse, Frame, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the circle across the frame border.', paper: 'transparent' });
  const leafer = stage.own(new Leafer({ view: stage.view, fill: '#333' }));

  const S = size(stage);
  const frame = new Frame({ x: stage.width / 2 - S / 2, y: stage.height / 2 - S / 2, width: S, height: S });
  const circle = new Ellipse({ x: S * 0.6, y: S * 0.6, width: S / 2, height: S / 2, fill: '#32cd79', draggable: true });
  leafer.add(frame);
  frame.add(circle);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      const p = { x: frame.x! + S * 0.6 + S / 4, y: frame.y! + S * 0.6 + S / 4 };
      await ghost.drag(p, { x: p.x + S * 0.3, y: p.y + S * 0.2 }, 700);
      await stage.wait(500);
      await ghost.drag({ x: p.x + S * 0.3, y: p.y + S * 0.2 }, p, 700);
      await stage.wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
