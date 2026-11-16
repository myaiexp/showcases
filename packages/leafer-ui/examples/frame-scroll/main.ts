// Frame: overflow scroll
import { Box, Frame, Leafer, Line, Rect, Text } from 'leafer-ui';
import '@leafer-in/scroller'; // scrollbars for Box and Frame
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll with the wheel or drag the bar.', paper: 'transparent' });
  const leafer = stage.own(new Leafer({ view: stage.view, fill: '#333' }));

  const W = stage.preview ? 150 : 300, H = stage.preview ? 120 : 240;
  const frame = new Frame({ x: (stage.width - W) / 2, y: (stage.height - H) / 2, width: W, height: H, overflow: 'scroll', scrollConfig: { theme: 'light' } });
  for (let i = 0; i < 12; i++) frame.add(new Text({ x: 12, y: 8 + i * 30, text: `Line ${i + 1} of the page`, fill: '#333', fontSize: 16 }));
  frame.add(new Rect({ x: W - 30, y: 0, width: 10, height: 12 * 30, fill: '#32cd7966', hittable: false }));
  leafer.add(frame);
  drive(stage, 'scrollY', [0, 12 * 30 - H + 20, 1], 0, (v) => (frame.scrollY = -v), 6);

  return stage.dispose;
};

export default mount;
