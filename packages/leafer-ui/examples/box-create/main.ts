// Box: group and rect in one
import { Box, Ellipse, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the yellow circle; move the slider to resize the Box.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const box = new Box({ x: stage.width / 2 - S * 0.6, y: stage.height / 2 - S / 2, width: S, height: S, fill: '#FF4B4B' });
  const circle = new Ellipse({ x: S * 0.6, y: S * 0.6, width: S / 2, height: S / 2, fill: '#FEB027', draggable: true });
  leafer.add(box);
  box.add(circle);
  drive(stage, 'width', [60, 340, 2], S, (v) => (box.width = v), 5);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      const p = { x: box.x! + S * 0.6 + S / 4, y: box.y! + S * 0.6 + S / 4 };
      await ghost.drag(p, { x: p.x - S * 0.5, y: p.y - S * 0.4 }, 700);
      await stage.wait(500);
      await ghost.drag({ x: p.x - S * 0.5, y: p.y - S * 0.4 }, p, 700);
      await stage.wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
