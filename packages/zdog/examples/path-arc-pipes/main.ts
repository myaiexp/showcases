// Arc pipes: a pipe route through 3D whose corners are rounded with arc commands
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

type V = { x: number; y: number; z: number };
// the corners of the route, as a sharp-cornered pipe would pass through
const ROUTE: V[] = [
  { x: -105, y: 70, z: -60 },
  { x: -35, y: 70, z: -60 },
  { x: -35, y: -20, z: -60 },
  { x: -35, y: -20, z: 40 },
  { x: 60, y: -20, z: 40 },
  { x: 60, y: 60, z: 40 },
  { x: 110, y: 60, z: 40 },
];

const toward = (a: V, b: V, d: number): V => {
  const len = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
  const k = d / len;
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, z: a.z + (b.z - a.z) * k };
};

// Walk the route; at each corner stop short, then arc around it to a point just past it.
function pipePath(r: number): Zdog.PathCommand[] {
  const path: Zdog.PathCommand[] = [ROUTE[0]!];
  for (let i = 1; i < ROUTE.length - 1; i++) {
    const prev = ROUTE[i - 1]!;
    const corner = ROUTE[i]!;
    const next = ROUTE[i + 1]!;
    if (r < 1) {
      path.push(corner);
    } else {
      path.push(toward(corner, prev, r));
      path.push({ arc: [corner, toward(corner, next, r)] });
    }
  }
  path.push(ROUTE[ROUTE.length - 1]!);
  return path;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to follow the pipe through its bends.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.05,
    rotate: { x: -0.35, y: -0.6 },
    dragRotate: true,
  });
  let radius = 28;
  let pipe: Zdog.Shape | null = null;
  let inner: Zdog.Shape | null = null;
  const build = (): void => {
    pipe?.remove();
    inner?.remove();
    const path = pipePath(radius);
    pipe = new Zdog.Shape({ addTo: illo, path, closed: false, stroke: 18, color: '#EA0' });
    inner = new Zdog.Shape({ addTo: illo, path, closed: false, stroke: 6, color: '#FDB', translate: { y: -4 } });
  };
  build();
  // flanges at the two open ends
  for (const end of [ROUTE[0]!, ROUTE[ROUTE.length - 1]!]) {
    new Zdog.Ellipse({ addTo: illo, diameter: 30, stroke: 5, color: '#C25', translate: end, rotate: { y: Zdog.TAU / 4 } });
  }

  if (stage.bar) slider(stage.bar, 'bend radius', 0, 34, 1, radius, (v) => { radius = v; build(); });

  stage.loop((_dt, t) => {
    if (stage.preview) {
      radius = 17 + Math.sin(t * 1.6) * 17;
      build();
    }
    illo.rotate.y += 0.007;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
