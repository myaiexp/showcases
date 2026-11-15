// LineUtil.clipSegment (Cohen-Sutherland) cuts a polyline to a rectangle, one segment at a time
import { Bounds, LineUtil, Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { animate, BLUE, createPlane, DIM, GREEN, ORANGE } from '../../shared/plane.ts';

const VIEW = [0, 0, 400, 240] as const;
const CLIP = new Bounds([110, 60], [290, 180]);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The grey line is the whole polyline. Each of its segments goes through clipSegment(a, b, bounds, useLastCode): green is what it returns, and a segment fully outside returns false.' });
  const plane = createPlane(stage, VIEW);
  plane.base.rect(CLIP.min, CLIP.max, { stroke: BLUE, width: 2, fill: BLUE, opacity: 0.1 });

  const draw = (phase: number): void => {
    plane.clear();
    const d = plane.live;
    const line = Array.from({ length: 9 }, (_, i) => new Point(20 + i * 45, 120 + 130 * Math.sin(i * 1.1 + phase) * (i % 2 ? 1 : 0.6)));
    d.poly(line, { stroke: DIM, width: 1.5, dash: '3 3' });
    let kept = 0;
    let dropped = 0;
    for (let i = 1; i < line.length; i++) {
      // useLastCode reuses the previous segment's end code: valid because each segment starts where the last ended.
      const clipped = LineUtil.clipSegment(line[i - 1] as Point, line[i] as Point, CLIP, i > 1, true);
      if (!clipped) {
        dropped++;
        continue;
      }
      kept++;
      d.line(clipped[0], clipped[1], { stroke: GREEN, width: 3 });
      if (!clipped[0].equals(line[i - 1] as Point)) d.dot(clipped[0], { fill: ORANGE, r: 3 });
      if (!clipped[1].equals(line[i] as Point)) d.dot(clipped[1], { fill: ORANGE, r: 3 });
    }
    stage.say(`${kept} segments kept (cut ends in orange), ${dropped} fully outside returned false`);
  };
  draw(0);
  stage.slider('shape', 0, 6.3, 0.1, 0, draw);
  if (stage.preview) animate(stage, (t) => draw(t * 0.5));
  return () => stage.dispose();
};

export default mount;
