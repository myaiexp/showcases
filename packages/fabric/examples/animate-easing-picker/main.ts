// Animation: pick a util.ease function, see its curve and an object using it
import { Canvas, Circle, Line, Polyline, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

type EaseName = keyof typeof util.ease;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The curve plots easing(t, 0, 1, 1) against time. The dot rides it; the square runs along the track with the same function.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');
  const names = Object.keys(util.ease) as EaseName[];

  // plot area: x = time, y = eased value (0 at the bottom, 1 at the top)
  // values from -0.4 to 1.4 fit the plot so overshoots stay inside; the grey lines mark 0 and 1
  const yOf = (v: number): number => py + ph - ((v + 0.4) / 1.8) * ph;
  const px = 30, py = 30, pw = 130, ph = 150;
  const frame = new Rect({ left: px + pw / 2, top: py + ph / 2, width: pw, height: ph, fill: 'transparent', stroke: '#c9c3b4', selectable: false });
  const track = new Line([210, 120, 330, 120], { stroke: '#c9c3b4', strokeWidth: 3, selectable: false });
  const box = new Rect({ left: 210, top: 120, width: 28, height: 28, fill: '#e94b3c' });
  const dot = new Circle({ left: px, top: yOf(0), radius: 5, fill: '#3b7dd8' });
  let curve: Polyline | undefined;
  const guides = [0, 1].map((v) => new Line([px, yOf(v), px + pw, yOf(v)], { stroke: '#c9c3b4', strokeDashArray: [4, 4], selectable: false }));
  canvas.add(frame, ...guides, track, box, dot);

  const plot = (name: EaseName): void => {
    if (curve) canvas.remove(curve);
    const fn = util.ease[name];
    const pts = Array.from({ length: 61 }, (_, i) => ({ x: px + (i / 60) * pw, y: yOf(fn(i / 60, 0, 1, 1)) }));
    curve = new Polyline(pts, { fill: 'transparent', stroke: '#2b2b2b', strokeWidth: 2, selectable: false, objectCaching: false });
    canvas.insertAt(3, curve);
  };

  let name: EaseName = stage.preview ? 'easeOutBounce' : 'easeOutElastic';
  let current: ReturnType<typeof util.animate> | undefined;
  const run = (): void => {
    current?.abort();
    const fn = util.ease[name];
    current = util.animate({
      startValue: 0,
      endValue: 1,
      duration: 1600,
      easing: fn,
      target: canvas,
      onChange: (_v, progress, time) => {
        box.set({ left: 210 + progress * 120 });
        dot.set({ left: px + time * pw, top: yOf(progress) });
        canvas.requestRenderAll();
      },
      onComplete: () => say(`${name}: done`),
    });
    say(`${name}`);
  };
  const choose = (n: EaseName): void => {
    name = n;
    plot(n);
  };
  plot(name);
  run();
  if (stage.preview) {
    const picks: EaseName[] = ['easeOutBounce', 'easeInOutBack', 'easeOutElastic', 'easeInQuint'];
    let k = 0;
    stage.every(2000, () => {
      choose(picks[++k % picks.length]!);
      run();
    });
  } else {
    select(stage.bar!, 'easing', names, (n) => {
      choose(n);
      run();
    }, name);
  }

  return stage.dispose;
};

export default mount;
