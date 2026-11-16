// App & engine config: smoothing images on or off
import { Leafer, Image } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycle, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle smooth: the magnified image blurs or keeps its square pixels.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      smooth: false,
      fill: '#333',
    }),
  );
  // A 6 x 6 pixel image, painted in code
  const tiny = document.createElement('canvas');
  tiny.width = tiny.height = 6;
  const g = tiny.getContext('2d')!;
  for (let y = 0; y < 6; y++) for (let x = 0; x < 6; x++) (g.fillStyle = (x + y) % 2 ? '#32cd79' : '#ff4b4b'), g.fillRect(x, y, 1, 1);
  leafer.add(new Image({ url: tiny.toDataURL(), x: u(80), y: u(30), scale: stage.preview ? 14 : 18 }));

  const setSmooth = (on: boolean): void => {
    leafer.canvas.smooth = on; // make it take effect in real time ...
    leafer.forceRender(); // ... then redraw everything
  };

  if (stage.preview) cycle(stage, [false, true], setSmooth, 1800);
  else checkbox(stage.bar!, 'smooth', false, setSmooth);

  return stage.dispose;
};

export default mount;
