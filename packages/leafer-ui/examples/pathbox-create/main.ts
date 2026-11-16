// PathBox: a Box with a shape, holding a child element
import { Leafer, Ellipse, Box } from 'leafer-ui';
import { PathBox } from '@leafer-in/box'; // the box plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the box: its child goes along. Drag the circle to move it inside.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage); // the docs use 100 px
  const k = S / 100;
  const box = new PathBox({
    ...mid(stage, S * 1.3),
    path: `X 0 0 ${S} ${S} ${30 * k} P ${50 * k} ${50 * k} ${25 * k}`, // the docs' path, scaled: a rounded square and a circle (X and P are path commands)
    windingRule: 'evenodd',
    fill: '#FF4B4B',
    draggable: true,
  });
  const circle = new Ellipse({ x: 60 * k, y: 60 * k, width: 50 * k, height: 50 * k, fill: '#FEB027', draggable: true });
  leafer.add(box);
  box.add(circle);

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const from = { x: box.x! + 20 * k, y: box.y! + 20 * k };
    script(stage, async () => {
      await ghost.drag(from, { x: from.x + 40, y: from.y + 20 }, 800);
      await stage.wait(400);
      await ghost.drag({ x: from.x + 40, y: from.y + 20 }, from, 800);
      await stage.wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
