// getRegularPolygonPath(sides, radius) returns the commands for a regular polygon
import { Canvas, Path, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 220], hint: 'The helper returns M, L and Z commands around (0, 0); Path then centres them where you place the object. Odd sides point up, even sides sit flat.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  let path: Path | undefined;
  const show = (sides: number, radius: number): void => {
    if (path) canvas.remove(path);
    path = new Path(util.getRegularPolygonPath(sides, radius), {
      left: 150,
      top: 110,
      fill: `hsl(${(sides * 37) % 360} 65% 60%)`,
      stroke: '#1d2950',
      strokeWidth: 3,
      strokeLineJoin: 'round',
    });
    canvas.add(path);
    say(`getRegularPolygonPath(${sides}, ${radius.toFixed(0)})\n${path.path.length} commands`);
    canvas.requestRenderAll();
  };
  show(5, 80);
  if (stage.bar) {
    const v = { sides: 5, radius: 80 };
    slider(stage.bar, 'sides', 3, 16, 1, v.sides, (n) => show((v.sides = n), v.radius));
    slider(stage.bar, 'radius', 30, 100, 1, v.radius, (r) => show(v.sides, (v.radius = r)));
  } else {
    let i = 0;
    stage.every(800, () => show(3 + (i++ % 10), 80));
  }

  return stage.dispose;
};

export default mount;
