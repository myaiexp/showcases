// City block shading: Box face colours fake a light on every building
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
type Light = 'left' | 'right' | 'flat';
const LIGHTS: readonly Light[] = ['left', 'right', 'flat'];
// light, mid, dark for each building colour
const TONES = [
  ['#fdb', '#EA0', '#a87400'],
  ['#fbb', '#E62', '#9a3b10'],
  ['#e8c4ff', '#a35ac9', '#5e2f78'],
  ['#c4eaff', '#5ad', '#2f6288'],
];
const HEIGHTS = [
  [60, 100, 40],
  [130, 50, 80],
  [30, 90, 70],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Faces are coloured by hand: turn it and the "light" turns too.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 0.95,
    rotate: { x: -TAU / 12, y: TAU / 8 },
  });

  let light: Light = 'left';
  let city: Zdog.Anchor | null = null;
  const build = (): void => {
    city?.remove();
    city = new Zdog.Anchor({ addTo: illo, translate: { y: 40 } });
    new Zdog.Rect({
      addTo: city, width: 240, height: 240, stroke: 3, fill: true, color: '#2a2a44',
      rotate: { x: TAU / 4 }, translate: { y: 4 },
    });
    HEIGHTS.forEach((row, r) => row.forEach((h, c) => {
      const [hi, mid, lo] = TONES[(r + c * 2) % TONES.length]!;
      new Zdog.Box({
        addTo: city!, width: 56, depth: 56, height: h, stroke: false, color: mid,
        // the lit side gets the light tone, the other side the dark one
        leftFace: light === 'left' ? hi : light === 'right' ? lo : mid,
        rightFace: light === 'right' ? hi : light === 'left' ? lo : mid,
        topFace: light === 'flat' ? mid : hi,
        frontFace: mid, rearFace: mid, bottomFace: false,
        translate: { x: (c - 1) * 76, y: -h / 2, z: (r - 1) * 76 },
      });
    }));
  };
  build();

  if (stage.bar) {
    select(stage.bar, 'light from', LIGHTS, (v) => { light = v; build(); }, light);
    slider(stage.bar, 'turn', -0.5, 0.5, 0.01, 0, (v) => { illo.rotate.y = TAU / 8 + v; }, (v) => v.toFixed(2));
  } else {
    let i = 0;
    stage.every(1600, () => { light = LIGHTS[++i % LIGHTS.length]!; build(); });
  }

  stage.loop((_dt, t) => {
    if (stage.preview) illo.rotate.y = TAU / 8 + Math.sin(t * 0.8) * 0.12;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
