// Box: overflow scroll with scrollbars
import { Box, Frame, Leafer, Rect, Text } from 'leafer-ui';
import '@leafer-in/scroller'; // scrollbars for Box and Frame
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll with the wheel, drag the bar, or use the slider.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const W = stage.preview ? 150 : 300, H = stage.preview ? 120 : 240;
  const box = new Box({
    x: (stage.width - W) / 2, y: (stage.height - H) / 2, width: W, height: H, fill: '#1d2b53', overflow: 'scroll',
    scrollConfig: { theme: 'light' },
  });
  for (let i = 0; i < 12; i++) {
    box.add(new Rect({ x: 10, y: 10 + i * 36, width: W - 30, height: 28, cornerRadius: 6, fill: i % 2 ? '#32cd79' : '#FEB027' }));
    box.add(new Text({ x: 20, y: 14 + i * 36, text: `Row ${i + 1}`, fill: '#1d2b53', fontSize: 16, hittable: false }));
  }
  leafer.add(box);
  drive(stage, 'scrollY', [0, 12 * 36 - H + 20, 1], 0, (v) => (box.scrollY = -v), 6);

  return stage.dispose;
};

export default mount;
