// Atom orbits: three tilted Ellipse rings with electrons running round them
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const COLORS = ['#E62', '#EA0', '#a35ac9'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to turn the atom.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.05,
    rotate: { x: -0.3 },
    dragRotate: true,
  });

  let diameter = 170;
  const rings: Zdog.Ellipse[] = [];
  const electrons: { spin: Zdog.Anchor; dot: Zdog.Shape; speed: number }[] = [];

  COLORS.forEach((color, i) => {
    // the ring anchor tilts the orbit; a third of a half-turn apart makes three orbits
    const tilt = new Zdog.Anchor({ addTo: illo, rotate: { z: (i * TAU) / 6 } });
    // a circle faces front; a quarter turn about y turns it to face sideways
    rings.push(new Zdog.Ellipse({ addTo: tilt, diameter, stroke: 2, color: '#8a8fc2', rotate: { y: TAU / 4 } }));
    // the electron rides an anchor that spins around x, the axis the ring turns on
    const spin = new Zdog.Anchor({ addTo: tilt, rotate: { x: (i * TAU) / 3 } });
    const dot = new Zdog.Shape({ addTo: spin, stroke: 14, color, translate: { y: -diameter / 2 } });
    electrons.push({ spin, dot, speed: 1.2 + i * 0.35 });
  });

  // nucleus: a cluster of dots
  const nucleus: [number, number, number, string][] = [
    [-7, -5, 0, '#C25'], [8, -3, 5, '#fff'], [0, 8, -5, '#C25'], [3, 1, 9, '#fff'], [-5, 5, 6, '#fff'],
  ];
  for (const [x, y, z, color] of nucleus) {
    new Zdog.Shape({ addTo: illo, stroke: 16, color, translate: { x, y, z } });
  }

  const setDiameter = (d: number): void => {
    diameter = d;
    rings.forEach((ring, i) => {
      ring.diameter = d;
      ring.updatePath();
      electrons[i]!.dot.translate.y = -d / 2;
    });
  };
  if (stage.bar) slider(stage.bar, 'orbit size', 80, 200, 1, diameter, setDiameter);

  stage.loop((dt, t) => {
    for (const e of electrons) e.spin.rotate.x += dt * e.speed * 2;
    illo.rotate.y += 0.006;
    if (stage.preview) setDiameter(150 + Math.sin(t * 0.9) * 22);
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
