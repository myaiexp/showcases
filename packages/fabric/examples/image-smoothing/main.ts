// imageSmoothing false keeps the hard pixel edges when a small image is scaled up
import { Canvas, FabricImage } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 200], hint: 'A 12 by 12 pixel picture blown up 11 times. Left: imageSmoothing true (default), the browser blurs the scale-up. Right: false, each pixel stays a square.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const art = document.createElement('canvas');
  art.width = 12;
  art.height = 12;
  const g = art.getContext('2d')!;
  const rows = ['............', '..aa....aa..', '.aaaa..aaaa.', '.aaaaaaaaaa.', '.aaaaaaaaaa.', '.aaaaaaaaaa.', '..aaaaaaaa..', '...aaaaaa...', '....aaaa....', '.....aa.....', '............', '............'];
  rows.forEach((row, y) => [...row].forEach((c, x) => c === 'a' && ((g.fillStyle = (x + y) % 3 === 0 ? '#ff7b8a' : '#e94b3c'), g.fillRect(x, y, 1, 1))));

  const smooth = new FabricImage(art, { left: 85, top: 100, scaleX: 11, scaleY: 11, imageSmoothing: true });
  const crisp = new FabricImage(art, { left: 235, top: 100, scaleX: 11, scaleY: 11, imageSmoothing: false });
  canvas.add(smooth, crisp);

  const wobble = (s: number): void => {
    smooth.scale(s);
    crisp.scale(s);
    say(`left imageSmoothing ${smooth.imageSmoothing}\nright imageSmoothing ${crisp.imageSmoothing}`);
    canvas.requestRenderAll();
  };
  wobble(11);
  if (stage.bar) {
    checkbox(stage.bar, 'smoothing on the right image', false, (v) => ((crisp.imageSmoothing = v), crisp.set('dirty', true), canvas.requestRenderAll()));
  } else {
    stage.loop((_dt, t) => wobble(9 + 3 * Math.sin(t * 1.2)));
  }

  return stage.dispose;
};

export default mount;
