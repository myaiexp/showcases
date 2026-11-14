// Child shapes orrery: sun, planet and moon, each carried by the one it is added to
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to look around. Tilt the sun and everything it carries tilts too.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.05,
    rotate: { x: -0.7 },
    dragRotate: true,
  });

  // the sun is the parent of everything else
  const sun = new Zdog.Shape({ addTo: illo, stroke: 38, color: '#EA0' });
  const orbit = (addTo: Zdog.Anchor, diameter: number): void => {
    new Zdog.Ellipse({ addTo, diameter, rotate: { x: TAU / 4 }, stroke: 1, color: '#556' });
  };

  // planet: an invisible pivot added to the sun, the planet added to the pivot
  orbit(sun, 170);
  const earthPivot = new Zdog.Anchor({ addTo: sun });
  const earth = new Zdog.Shape({
    addTo: earthPivot,
    translate: { x: 85 },
    stroke: 16,
    color: '#6cf',
  });
  // moon: a pivot added to the earth, the moon added to that pivot
  orbit(earth, 52);
  const moonPivot = new Zdog.Anchor({ addTo: earth });
  new Zdog.Shape({ addTo: moonPivot, translate: { x: 26 }, stroke: 7, color: '#fff' });

  // second planet, closer in, so there is more than one thing being carried
  orbit(sun, 90);
  const marsPivot = new Zdog.Anchor({ addTo: sun, rotate: { y: 2 } });
  new Zdog.Shape({ addTo: marsPivot, translate: { x: 45 }, stroke: 10, color: '#C25' });

  let earthSpeed = 0.6;
  let moonSpeed = 2.4;
  let spin = true;
  if (stage.bar) {
    slider(stage.bar, 'earth orbit', 0, 2, 0.1, earthSpeed, (v) => { earthSpeed = v; });
    slider(stage.bar, 'moon orbit', 0, 5, 0.1, moonSpeed, (v) => { moonSpeed = v; });
    slider(stage.bar, 'tilt sun', -0.8, 0.8, 0.01, 0, (v) => { sun.rotate.z = v; });
    checkbox(stage.bar, 'running', spin, (v) => { spin = v; });
  }

  stage.loop((dt, t) => {
    if (spin) {
      earthPivot.rotate.y -= dt * earthSpeed;
      moonPivot.rotate.y -= dt * moonSpeed;
      marsPivot.rotate.y -= dt * earthSpeed * 1.8;
    }
    if (stage.preview) sun.rotate.z = 0.35 * Math.sin(t * 0.8); // cards rock the sun to show the carry
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
