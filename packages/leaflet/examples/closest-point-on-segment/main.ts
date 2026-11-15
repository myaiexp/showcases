// LineUtil.closestPointOnSegment and pointToSegmentDistance: a point clamps to the segment's ends
import { LineUtil, Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { animate, BLUE, createPlane, GREEN, ORANGE, orbit, YELLOW } from '../../shared/plane.ts';

const VIEW = [0, 0, 400, 240] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the plane to put the point there. The nearest point on the segment is the foot of a perpendicular, or the end of the segment when the point is past it.' });
  const plane = createPlane(stage, VIEW);
  const p1 = new Point(80, 160);
  const p2 = new Point(300, 80);
  plane.base.line(p1, p2, { stroke: BLUE, width: 3 });
  plane.base.dot(p1, { fill: BLUE, r: 4 });
  plane.base.dot(p2, { fill: BLUE, r: 4 });

  const draw = (p: Point): void => {
    plane.clear();
    const d = plane.live;
    const closest = LineUtil.closestPointOnSegment(p, p1, p2);
    const dist = LineUtil.pointToSegmentDistance(p, p1, p2);
    d.dot(p, { fill: YELLOW, r: 4 });
    d.line(p, closest, { stroke: ORANGE, width: 2, dash: '4 3' });
    d.dot(closest, { fill: GREEN, r: 5 });
    d.poly(Array.from({ length: 49 }, (_, i) => new Point(p.x + dist * Math.cos((i / 48) * 6.2832), p.y + dist * Math.sin((i / 48) * 6.2832))), { stroke: ORANGE, width: 1, opacity: 0.5 });
    stage.say(`closest ${closest.round().toString()}, distance ${dist.toFixed(1)} px`);
  };
  draw(new Point(200, 60));
  plane.svg.addEventListener('click', (e) => {
    const ctm = plane.svg.getScreenCTM();
    if (!ctm) return;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    draw(new Point(pt.x, pt.y));
  }, { signal: stage.signal });

  if (stage.preview) animate(stage, (t) => { const o = orbit(190, 120, 190, 100, t * 0.5); draw(new Point(o.x, o.y)); });
  return () => stage.dispose();
};

export default mount;
