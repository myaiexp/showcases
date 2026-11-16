// Free drawing: strokeLineCap, strokeLineJoin and strokeDashArray on a brush
import { Canvas, PencilBrush } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, select, slider } from '../../shared/controls.ts';
import { zigzag } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

type Cap = 'butt' | 'round' | 'square';
type Join = 'round' | 'bevel' | 'miter';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Draw a zigzag with sharp corners and short strokes, then change the cap, join or dash and draw again.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const brush = new PencilBrush(canvas);
  brush.color = '#8e44ad';
  brush.width = 18;
  // A zigzag has sharp corners, so decimating would round them off before the join shows.
  brush.decimate = 0;
  canvas.freeDrawingBrush = brush;
  canvas.isDrawingMode = true;

  const show = (): void =>
    say(`cap ${brush.strokeLineCap} · join ${brush.strokeLineJoin} · dash ${JSON.stringify(brush.strokeDashArray)}`);
  const dashes: Record<string, number[] | null> = { solid: null, dashed: [20, 12], dotted: [1, 20] };
  show();

  if (stage.bar) {
    select(stage.bar, 'strokeLineCap', ['butt', 'round', 'square'] as const, (v: Cap) => ((brush.strokeLineCap = v), show()), 'round');
    select(stage.bar, 'strokeLineJoin', ['round', 'bevel', 'miter'] as const, (v: Join) => ((brush.strokeLineJoin = v), show()), 'round');
    select(stage.bar, 'strokeDashArray', Object.keys(dashes), (v) => ((brush.strokeDashArray = dashes[v] ?? null), show()));
    slider(stage.bar, 'width', 2, 40, 1, 18, (v) => (brush.width = v));
    button(stage.bar, 'Clear', () => canvas.remove(...canvas.getObjects()));
  } else {
    const ghost = stage.ghost(canvas);
    const looks: [Cap, Join, number[] | null][] = [
      ['butt', 'miter', null],
      ['round', 'round', null],
      ['square', 'bevel', null],
      ['round', 'round', [1, 22]],
    ];
    let n = 0;
    stage.repeat(async () => {
      const [cap, join, dash] = looks[n++ % looks.length]!;
      Object.assign(brush, { strokeLineCap: cap, strokeLineJoin: join, strokeDashArray: dash });
      show();
      await ghost.stroke(zigzag(40, 320, 120, 50, 6), 1300);
      await stage.wait(900);
      canvas.remove(...canvas.getObjects());
    }, 300);
  }

  return stage.dispose;
};

export default mount;
