// Objects: strokeLineCap shapes the ends of an open stroke, strokeLineJoin its corners
import { Canvas, Polyline } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const CAPS = ['butt', 'round', 'square'] as const;
const JOINS = ['miter', 'round', 'bevel'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'A thick stroke makes the difference visible: the caps are the two ends, the join is the middle corner.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const line = new Polyline([{ x: 0, y: 90 }, { x: 80, y: 0 }, { x: 160, y: 90 }], {
    left: 150,
    top: 100,
    fill: 'transparent',
    stroke: '#e94b3c',
    strokeWidth: 28,
    objectCaching: false, // a miter tip reaches past the bounding box the cache is cut to
  });
  canvas.add(line);

  const apply = (props: { strokeLineCap?: (typeof CAPS)[number]; strokeLineJoin?: (typeof JOINS)[number] }): void => {
    line.set(props);
    say(`strokeLineCap ${line.strokeLineCap}\nstrokeLineJoin ${line.strokeLineJoin}`);
    canvas.requestRenderAll();
  };
  apply({ strokeLineCap: 'butt', strokeLineJoin: 'miter' });
  if (stage.bar) {
    select(stage.bar, 'strokeLineCap', CAPS, (strokeLineCap) => apply({ strokeLineCap }));
    select(stage.bar, 'strokeLineJoin', JOINS, (strokeLineJoin) => apply({ strokeLineJoin }));
  } else {
    let i = 0;
    stage.every(900, () => apply({ strokeLineCap: CAPS[i % 3], strokeLineJoin: JOINS[Math.floor(i++ / 3) % 3] }));
  }

  return stage.dispose;
};

export default mount;
