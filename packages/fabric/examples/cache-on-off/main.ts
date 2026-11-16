// objectCaching on or off for a heavy rotating group, with a frame-time readout
import { Canvas, Circle, Group } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

/** Many small stroked circles on a seeded grid: costly to paint, cheap to describe. */
function heavy(count: number, cached: boolean): Group {
  let seed = 7;
  const rnd = (): number => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const circles = Array.from({ length: count }, (_, i) => {
    const hue = (i * 37) % 360;
    return new Circle({
      left: (rnd() - 0.5) * 125,
      top: (rnd() - 0.5) * 125,
      radius: 3 + rnd() * 8,
      fill: `hsla(${hue}, 70%, 60%, 0.55)`,
      stroke: `hsl(${hue}, 60%, 30%)`,
      strokeWidth: 1.5,
      strokeDashArray: [3, 2],
      objectCaching: false,
    });
  });
  return new Group(circles, { objectCaching: cached, left: 100, top: 100 });
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['cached', 'not cached'],
    scene: [200, 200],
    hint: 'The same group of circles spins in both panes. Cached, the group is painted once and each frame copies that bitmap; uncached, every circle is drawn again each frame. The readout is the time one renderAll() takes.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const on = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true, renderOnAddRemove: false }), pa);
  const off = stage.own(new Canvas(pb.el, { selection: false, skipTargetFind: true, renderOnAddRemove: false }), pb);
  const sayOn = status(stage, '', pa);
  const sayOff = status(stage, '', pb);

  let count = stage.preview ? 450 : 600;
  let groupOn = heavy(count, true);
  let groupOff = heavy(count, false);
  on.add(groupOn);
  off.add(groupOff);

  const rebuild = (n: number): void => {
    count = n;
    on.remove(groupOn);
    off.remove(groupOff);
    groupOn = heavy(n, true);
    groupOff = heavy(n, false);
    on.add(groupOn);
    off.add(groupOff);
  };

  // Rotation is not a cacheProperty: the cached group is only re-composited, never repainted.
  let msOn = 0;
  let msOff = 0;
  stage.loop((_dt, t) => {
    for (const g of [groupOn, groupOff]) g.rotate((t * 40) % 360);
    let t0 = performance.now();
    on.renderAll();
    msOn = msOn * 0.9 + (performance.now() - t0) * 0.1;
    t0 = performance.now();
    off.renderAll();
    msOff = msOff * 0.9 + (performance.now() - t0) * 0.1;
    sayOn(`${msOn.toFixed(1)} ms/frame`);
    sayOff(`${msOff.toFixed(1)} ms/frame`);
  });

  if (stage.bar) slider(stage.bar, 'circles', 50, 1500, 50, count, rebuild);
  return stage.dispose;
};

export default mount;
