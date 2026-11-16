// gradientUpdaterWrapper: fold the old per-stop opacity into the stop colour
import { Canvas, Gradient, Rect } from 'fabric';
import { gradientUpdaterWrapper } from 'fabric/extensions';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// A v6 serialized gradient: every colour stop could carry its own `opacity` next to `color`.
const oldGradient = (opacity: number): Record<string, unknown> => ({
  type: 'linear',
  gradientUnits: 'percentage',
  coords: { x1: 0, y1: 0.5, x2: 1, y2: 0.5 },
  colorStops: [
    { offset: 0, color: '#e94b3c', opacity },
    { offset: 0.5, color: '#3b7dd8', opacity: opacity / 2 },
    { offset: 1, color: '#2e9e5b', opacity },
  ],
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['Gradient.fromObject(old)', 'gradientUpdaterWrapper(…)'],
    scene: [160, 170],
    hint: 'In v7 a colour stop is only { offset, color }: the old `opacity` key is kept in the data but never drawn. The wrapper rewrites each stop to an rgba colour first, then calls the original fromObject. The wrapper is just a function here; installGradientUpdater() would swap Gradient.fromObject for the whole page.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const plain = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const fixed = stage.own(new Canvas(pb.el, { selection: false, skipTargetFind: true }), pb);

  const fromOld = gradientUpdaterWrapper(Gradient.fromObject as never) as (o: never) => Promise<Gradient<'linear'>>;
  const mk = (c: Canvas): Rect => {
    const r = new Rect({ left: 80, top: 85, width: 130, height: 110, stroke: '#2b2a33', strokeWidth: 1, objectCaching: false });
    c.clear();
    c.add(r);
    return r;
  };
  const left = mk(plain);
  const right = mk(fixed);

  let token = 0;
  const load = async (opacity: number): Promise<void> => {
    const mine = ++token;
    const [a, b] = await Promise.all([Gradient.fromObject(oldGradient(opacity) as never), fromOld.call(Gradient as never, oldGradient(opacity) as never)]);
    if (stage.disposed || mine !== token) return;
    left.set('fill', a);
    right.set('fill', b);
    plain.requestRenderAll();
    fixed.requestRenderAll();
  };
  void load(1);

  if (stage.bar) slider(stage.bar, 'old stop opacity', 0.1, 1, 0.05, 1, (v) => void load(v), (v) => v.toFixed(2));
  else {
    let i = 0;
    stage.every(1100, () => void load([1, 0.6, 0.3, 0.8][++i % 4]!));
  }
  return stage.dispose;
};

export default mount;
