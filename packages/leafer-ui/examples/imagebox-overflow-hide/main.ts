// ImageBox: overflow show or hide
import { Leafer, Ellipse } from 'leafer-ui';
import { ImageBox } from '@leafer-in/box';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch overflow, and drag the circle across the edge.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const url = photo();
  const box = new ImageBox({ ...mid(stage, S * 1.3), width: S, height: S * 0.75, url });
  const circle = new Ellipse({ x: 60 * k, y: 40 * k, width: 50 * k, height: 50 * k, fill: '#FEB027', draggable: true });
  leafer.add(box);
  box.add(circle);

  pick(stage, 'overflow', ['hide', 'show'] as const, (v) => (box.overflow = v), 1800);

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const a = { x: box.x! + 85 * k, y: box.y! + 65 * k };
    script(stage, async () => {
      await ghost.drag(a, { x: a.x - 5, y: a.y + 20 }, 700);
      await stage.wait(500);
      await ghost.drag({ x: a.x - 5, y: a.y + 20 }, a, 700);
      await stage.wait(400);
    });
  }

  return stage.dispose;
};

export default mount;
