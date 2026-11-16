// Box: scrollConfig styles the bars
import { Box, Frame, Leafer, Rect } from 'leafer-ui';
import '@leafer-in/scroller'; // scrollbars for Box and Frame
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive, pick } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the theme and the bar size.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const W = stage.preview ? 150 : 300, H = stage.preview ? 120 : 240;
  const box = new Box({
    x: (stage.width - W) / 2, y: (stage.height - H) / 2 - 10, width: W, height: H, fill: '#ffffff', stroke: '#ccc', overflow: 'scroll',
    scrollConfig: { theme: 'dark', size: 8, endsMargin: 4, sideMargin: 2 },
  });
  for (let i = 0; i < 10; i++) box.add(new Rect({ x: 10, y: 10 + i * 40, width: W * 1.6, height: 30, cornerRadius: 6, fill: i % 2 ? '#32cd79' : '#FEB027' }));
  leafer.add(box);
  const cfg = { theme: 'dark', size: 8, sideMargin: 2 };
  const apply = (): void => { box.scrollConfig = { ...cfg, endsMargin: 4 }; };
  pick(stage, 'theme', ['dark', 'light'], (v) => ((cfg.theme = v), apply()), 2400);
  drive(stage, 'size', [4, 24, 1], 8, (v) => ((cfg.size = v), apply()), 4);
  if (stage.bar) slider(stage.bar, 'sideMargin', 0, 20, 1, 2, (v) => ((cfg.sideMargin = v), apply()));
  if (stage.preview) stage.loop((_dt, t) => ((box.scrollY = -Math.abs(Math.sin(t * 0.6)) * 200), (box.scrollX = -Math.abs(Math.sin(t * 0.4)) * 100)));

  return stage.dispose;
};

export default mount;
