// transformPath() applies a matrix to every command of a simplified path
import { Canvas, Path, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 220], hint: 'The faint house is the original Path; the solid one is built from transformPath(path.path, matrix, path.pathOffset). No object transform is involved.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const original = new Path('M 160 40 L 220 90 L 220 170 L 100 170 L 100 90 Z', { fill: 'transparent', stroke: '#9aa3b2', strokeWidth: 2, strokeDashArray: [5, 4], selectable: false, evented: false });
  canvas.add(original);

  let moved: Path | undefined;
  const show = (angle: number, scale: number, skewX: number): void => {
    // The matrix is applied around pathOffset (the path's centre), then moved back to where the original sits.
    const matrix = util.composeMatrix({ angle, scaleX: scale, scaleY: scale, skewX, translateX: original.pathOffset.x, translateY: original.pathOffset.y });
    const commands = util.transformPath(original.path, matrix, original.pathOffset);
    if (moved) canvas.remove(moved);
    moved = new Path(commands, { fill: 'rgba(59,125,216,0.35)', stroke: '#1d4a8c', strokeWidth: 3, strokeLineJoin: 'round', selectable: false, evented: false });
    canvas.add(moved);
    say(`angle ${angle.toFixed(0)} · scale ${scale.toFixed(2)} · skewX ${skewX.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  show(25, 0.8, 0);
  if (stage.bar) {
    const v = { angle: 25, scale: 0.8, skewX: 0 };
    slider(stage.bar, 'angle', -180, 180, 1, v.angle, (a) => show((v.angle = a), v.scale, v.skewX));
    slider(stage.bar, 'scale', 0.3, 1.6, 0.05, v.scale, (s) => show(v.angle, (v.scale = s), v.skewX), (n) => n.toFixed(2));
    slider(stage.bar, 'skewX', -40, 40, 1, v.skewX, (k) => show(v.angle, v.scale, (v.skewX = k)));
  } else {
    stage.loop((_dt, t) => show(40 * Math.sin(t * 1.2), 0.9 + 0.3 * Math.sin(t * 1.7), 20 * Math.sin(t * 0.8)));
  }

  return stage.dispose;
};

export default mount;
