// Scale bug: dome, can and hat survive scale 2 but break under scale { y: 2 }
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const SCALES = ['1 (original)', '2 (uniform, works)', '{ y: 2 } (breaks)'] as const;
type ScaleMode = (typeof SCALES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hemisphere, Cylinder and Cone cannot stretch along one axis.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    rotate: { x: -0.5 },
  });

  // the scaled anchor carries the three composite shapes
  const anchor = new Zdog.Anchor({ addTo: illo });
  const up = { x: TAU / 4 }; // turn each shape so its front points up
  new Zdog.Hemisphere({
    addTo: anchor, diameter: 40, translate: { x: -62, y: 12 }, rotate: up,
    stroke: false, color: '#C25', backface: '#EA0',
  });
  new Zdog.Cylinder({
    addTo: anchor, diameter: 36, length: 40, translate: { y: 0 }, rotate: up,
    stroke: false, color: '#E62', frontFace: '#ED0', backface: '#C25',
  });
  new Zdog.Cone({
    addTo: anchor, diameter: 40, length: 48, translate: { x: 62, y: 12 }, rotate: up,
    stroke: false, color: '#a35ac9', backface: '#EA0',
  });

  const set = (mode: ScaleMode): void => {
    // after construction scale is a plain Vector: set its axes
    const y = mode === '{ y: 2 } (breaks)' ? 2 : mode === '2 (uniform, works)' ? 2 : 1;
    const xz = mode === '2 (uniform, works)' ? 2 : 1;
    anchor.scale.x = xz;
    anchor.scale.y = y;
    anchor.scale.z = xz;
  };
  let mode: ScaleMode = SCALES[0];
  set(mode);
  if (stage.bar) select(stage.bar, 'anchor scale', SCALES, (v) => { mode = v; set(v); }, mode);
  else {
    let i = 0;
    stage.every(1800, () => {
      mode = SCALES[++i % SCALES.length]!;
      set(mode);
    });
  }

  stage.loop((dt) => {
    illo.rotate.y += dt * 0.6;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
