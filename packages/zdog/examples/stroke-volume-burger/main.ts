// Stroke volume burger: flat shapes plump up into a burger as their stroke grows
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to look around. Slide stroke down to flatten it.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.35,
    rotate: { x: -0.5 },
    dragRotate: true,
  });
  const burger = new Zdog.Anchor({ addTo: illo, translate: { y: 6 } });
  const flat = { rotate: { x: TAU / 4 } }; // lay a flat shape down like a plate
  const fat: [Zdog.Shape, number][] = []; // each shape with its full stroke
  const add = (s: Zdog.Shape): Zdog.Shape => {
    fat.push([s, Number(s.stroke)]);
    return s;
  };

  // bottom bun, patty, cheese, lettuce: flat circles and squares, made round by stroke
  add(new Zdog.Ellipse({ addTo: burger, diameter: 96, translate: { y: 38 }, ...flat, stroke: 22, fill: true, color: '#EA0' }));
  add(new Zdog.Ellipse({ addTo: burger, diameter: 72, translate: { y: 14 }, ...flat, stroke: 28, fill: true, color: '#7a4a2b' }));
  add(new Zdog.Rect({ addTo: burger, width: 92, height: 92, translate: { y: -4 }, rotate: { x: TAU / 4, z: TAU / 8 }, stroke: 8, fill: true, color: '#ED0' }));
  add(new Zdog.Ellipse({ addTo: burger, diameter: 100, translate: { y: -12 }, ...flat, stroke: 8, color: '#5c4' }));

  // top bun: a hemisphere, with sesame seeds that are just short lines
  new Zdog.Hemisphere({
    addTo: burger,
    diameter: 104,
    translate: { y: -16 },
    rotate: { x: TAU / 4 },
    stroke: false,
    color: '#EA0',
    backface: '#C25',
  });
  for (let i = 0; i < 9; i++) {
    const a = i * 2.4;
    const r = 6 + 40 * Math.sqrt((i + 0.5) / 9) * 0.88;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const y = -16 - Math.sqrt(Math.max(0, 52 * 52 - x * x - z * z)) + 1;
    add(new Zdog.Shape({ addTo: burger, path: [{ y: -2 }, { y: 2 }], translate: { x, y, z }, rotate: { y: a }, stroke: 8, color: '#FDB' }));
  }

  let k = 1;
  const apply = (): void => {
    for (const [s, full] of fat) s.stroke = full * k;
  };
  if (stage.bar) slider(stage.bar, 'stroke', 0, 1, 0.01, k, (v) => { k = v; apply(); }, (v) => `${Math.round(v * 100)}%`);

  stage.loop((dt, t) => {
    if (stage.preview) {
      k = 0.5 + 0.5 * Math.sin(t * 1.3);
      apply();
    }
    illo.rotate.y += dt * 0.5;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
