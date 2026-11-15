// Transformation(a, b, c, d): x' = a*x + b, y' = c*y + d, with an optional scale and the inverse
import { Point, Transformation } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { animate, BLUE, createPlane, GREEN, gridLines, ORANGE, YELLOW } from '../../shared/plane.ts';

const VIEW = [-100, -100, 220, 220] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The blue grid is the input, fifty units square, a line every ten. The orange grid is what transform() makes of it. With Leaflet\'s own EPSG3857 numbers b is 0.5 and c is negative: y flips, which is why pixel y grows downward.' });
  const plane = createPlane(stage, VIEW);
  gridLines(plane.base, VIEW, 20);

  const k = { a: 1.5, b: 20, c: -1, d: 40, scale: 1 };
  let probe = new Point(30, 20);
  const draw = (): void => {
    plane.clear();
    const d = plane.live;
    const t = new Transformation(k.a, k.b, k.c, k.d);
    for (let i = 0; i <= 50; i += 10) {
      d.line(new Point(i, 0), new Point(i, 50), { stroke: BLUE, width: 1.2, opacity: 0.7 });
      d.line(new Point(0, i), new Point(50, i), { stroke: BLUE, width: 1.2, opacity: 0.7 });
      d.line(t.transform(new Point(i, 0), k.scale), t.transform(new Point(i, 50), k.scale), { stroke: ORANGE, width: 1.2 });
      d.line(t.transform(new Point(0, i), k.scale), t.transform(new Point(50, i), k.scale), { stroke: ORANGE, width: 1.2 });
    }
    const out = t.transform(probe, k.scale);
    const back = t.untransform(out, k.scale);
    d.dot(probe, { fill: YELLOW, r: 2.5 });
    d.dot(out, { fill: GREEN, r: 3 });
    d.arrow(probe, out, { stroke: GREEN, width: 1 });
    stage.say(`new Transformation(${k.a}, ${k.b}, ${k.c}, ${k.d}).transform(${probe.toString()}${k.scale === 1 ? '' : `, ${k.scale}`}) = ${out.toString()}; untransform gives ${back.toString()}`);
  };
  stage.slider('a', -1.5, 1.5, 0.25, k.a, (v) => { k.a = v; draw(); });
  stage.slider('b', -40, 40, 5, k.b, (v) => { k.b = v; draw(); });
  stage.slider('c', -1.5, 1.5, 0.25, k.c, (v) => { k.c = v; draw(); });
  stage.slider('d', -40, 40, 5, k.d, (v) => { k.d = v; draw(); });
  stage.slider('scale', 0.5, 1.5, 0.25, k.scale, (v) => { k.scale = v; draw(); });
  draw();

  if (stage.preview) {
    animate(stage, (s) => {
      k.a = 1 + 0.6 * Math.sin(s * 0.7);
      k.c = -1 - 0.5 * Math.sin(s * 0.5);
      k.b = Math.round(30 * Math.sin(s));
      probe = new Point(25 + 20 * Math.sin(s * 1.3), 25 + 20 * Math.cos(s * 1.3));
      draw();
    });
  }
  return () => stage.dispose();
};

export default mount;
