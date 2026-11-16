// Box: one-axis scrolling
import { Box, Frame, Leafer, Rect } from 'leafer-ui';
import '@leafer-in/scroller'; // scrollbars for Box and Frame
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick an overflow mode and scroll.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const W = stage.preview ? 150 : 300, H = stage.preview ? 120 : 240;
  const box = new Box({ x: (stage.width - W) / 2, y: (stage.height - H) / 2 - 10, width: W, height: H, fill: '#1d2b53', overflow: 'scroll' });
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      box.add(new Rect({ x: 10 + x * 60, y: 10 + y * 60, width: 50, height: 50, cornerRadius: 8, fill: (x + y) % 2 ? '#32cd79' : '#FEB027' }));
    }
  }
  leafer.add(box);
  const note = caption(stage, leafer);
  pick(stage, 'overflow', ['scroll', 'x-scroll', 'y-scroll'] as const, (v) => {
    box.overflow = v;
    note.text = `overflow: '${v}'`;
  }, 2600);
  if (stage.preview) stage.loop((_dt, t) => ((box.scrollX = -Math.abs(Math.sin(t * 0.5)) * 150), (box.scrollY = -Math.abs(Math.sin(t * 0.7)) * 150)));

  return stage.dispose;
};

export default mount;
