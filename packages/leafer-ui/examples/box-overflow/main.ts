// Box: overflow hide clips children
import { Box, Ellipse, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick the overflow value and drag the circle across the edge.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const box = new Box({ x: stage.width / 2 - S / 2, y: stage.height / 2 - S / 2 - 10, width: S, height: S, fill: '#FF4B4B', overflow: 'hide' });
  const circle = new Ellipse({ x: S * 0.6, y: S * 0.6, width: S / 2, height: S / 2, fill: '#FEB027', draggable: true });
  leafer.add(box);
  box.add(circle);
  const note = caption(stage, leafer);
  pick(stage, 'overflow', ['hide', 'show'] as const, (v) => {
    box.overflow = v;
    note.text = `overflow: '${v}'`;
  }, 1600);

  return stage.dispose;
};

export default mount;
