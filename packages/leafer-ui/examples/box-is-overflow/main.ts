// Box: isOverflow after layout
import { Box, Ellipse, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the circle in and out.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const box = new Box({ x: stage.width / 2 - S / 2, y: stage.height / 2 - S / 2 - 10, width: S, height: S, fill: '#4B8BFF', overflow: 'hide' });
  const circle = new Ellipse({ x: S * 0.2, y: S * 0.2, width: S / 2, height: S / 2, fill: '#FEB027', draggable: true });
  leafer.add(box);
  box.add(circle);
  const note = caption(stage, leafer);
  stage.loop((_dt, t) => {
    if (stage.preview) circle.x = S * 0.5 + Math.sin(t * 1.3) * S * 0.45;
    note.text = `isOverflow: ${box.isOverflow}`;
  });

  return stage.dispose;
};

export default mount;
