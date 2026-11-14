// Ladybug dome: a Hemisphere with a backface colour is a shell with a cream belly underneath
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const R = 62;
// spots on the dome: x and z across the shell, height worked out from the sphere
const SPOTS: [number, number, number][] = [
  [-30, -22, 15], [30, -22, 15], [-34, 14, 13], [34, 14, 13], [-14, 40, 11], [14, 40, 11], [0, -44, 9],
];
const domeY = (x: number, z: number): number => -Math.sqrt(Math.max(0, R * R - x * x - z * z));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to turn her over.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.25,
    rotate: { x: -0.5, y: -0.7 },
    dragRotate: true,
  });
  const bug = new Zdog.Anchor({ addTo: illo, translate: { y: 8 } });

  // the dome faces front by default; a quarter turn about x lifts it to face up
  new Zdog.Hemisphere({
    addTo: bug, diameter: R * 2, stroke: false, color: '#D8213A', backface: '#FDB', rotate: { x: TAU / 4 },
  });
  // split between the wing cases, following the curve of the dome
  const seam: { x: number; y: number; z: number }[] = [];
  for (let z = -R + 2; z <= R - 2; z += 4) seam.push({ x: 0, y: domeY(0, z) - 1, z });
  new Zdog.Shape({ addTo: bug, path: seam, closed: false, stroke: 3, color: '#222' });
  for (const [x, z, size] of SPOTS) {
    new Zdog.Shape({ addTo: bug, stroke: size, color: '#222', translate: { x, y: domeY(x, z) - 1, z } });
  }
  // head, eyes, antennae at the front
  new Zdog.Shape({ addTo: bug, stroke: 38, color: '#222', translate: { y: -6, z: R + 8 } });
  for (const s of [-1, 1]) {
    new Zdog.Shape({ addTo: bug, stroke: 9, color: '#fff', translate: { x: 11 * s, y: -16, z: R + 24 } });
    new Zdog.Shape({
      addTo: bug, path: [{ x: 8 * s, y: -20, z: R + 18 }, { x: 22 * s, y: -44, z: R + 30 }],
      stroke: 3, color: '#222',
    });
  }
  // six legs under the shell
  for (const s of [-1, 1]) {
    for (const z of [-34, 0, 34]) {
      new Zdog.Shape({
        addTo: bug, path: [{ x: 40 * s, y: 4, z }, { x: 62 * s, y: 18, z: z + 8 }], stroke: 5, color: '#222',
      });
    }
  }

  let flip = 0;
  if (stage.bar) slider(stage.bar, 'roll over', 0, 1, 0.01, flip, (v) => { flip = v; }, (v) => `${Math.round(v * 180)}°`);

  stage.loop((_dt, t) => {
    if (stage.preview) flip = Zdog.easeInOut(Math.min(1, Math.max(0, Math.sin(t * 0.9) * 1.5 + 0.5)), 2);
    bug.rotate.z = flip * (TAU / 2);
    if (stage.preview) illo.rotate.y = -0.7 + Math.sin(t * 0.5) * 0.4;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
