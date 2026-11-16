// Paths: getPathSegmentsInfo() measures each segment and getPointOnPath() finds the point at a distance
import { Canvas, Circle, Line, Path, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 200], hint: 'getPointOnPath(path.path, distance) returns the point and the direction (angle) a given distance along the path. The tick shows the direction.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const path = new Path('M 20 160 L 100 40 Q 160 -10 220 60 C 260 110 220 170 300 140', { fill: 'transparent', stroke: '#3b7dd8', strokeWidth: 4, selectable: false, evented: false });
  const dot = new Circle({ radius: 8, fill: '#e94b3c', stroke: '#fff', strokeWidth: 2, selectable: false, evented: false });
  const tick = new Line([0, 0, 24, 0], { stroke: '#e94b3c', strokeWidth: 3, strokeLineCap: 'round', selectable: false, evented: false });
  canvas.add(path, dot, tick);

  // path.path is the simplified command list; its info list ends with the total length
  const infos = util.getPathSegmentsInfo(path.path);
  const total = infos.at(-1)!.length;
  const lengths = infos.slice(0, -1).map((s) => `${'command' in s ? s.command : '?'} ${s.length.toFixed(0)}`);

  const at = (distance: number): void => {
    const p = util.getPointOnPath(path.path, distance, infos);
    if (!p) return;
    dot.set({ left: p.x, top: p.y });
    tick.set({ left: p.x + Math.cos(p.angle) * 12, top: p.y + Math.sin(p.angle) * 12, angle: (p.angle * 180) / Math.PI });
    say(`distance ${distance.toFixed(0)} of ${total.toFixed(0)}` + (stage.preview ? '' : `\nsegments: ${lengths.join(' · ')}`));
    canvas.requestRenderAll();
  };
  at(0);
  if (stage.bar) slider(stage.bar, 'distance', 0, Math.floor(total), 1, 0, at);
  else stage.loop((_dt, t) => at((t * 90) % total));

  return stage.dispose;
};

export default mount;
