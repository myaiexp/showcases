// One pixel gaps: hairlines between a box's faces, hidden by a stroke of 1 / zoom
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Look along the box edges for thin dark lines.' });
  const factor = stage.preview ? 1.5 : 1.3;
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * factor,
    rotate: { x: -TAU / 8, y: TAU / 8 },
  });

  const box = new Zdog.Box({
    addTo: illo,
    width: 120,
    height: 100,
    depth: 80,
    stroke: false,
    color: '#EA0',
    rearFace: '#a35ac9',
    leftFace: '#a35ac9',
    bottomFace: '#a35ac9',
  });
  // second box on top, so there are more edges to look at
  const small = new Zdog.Box({
    addTo: illo,
    width: 50,
    height: 40,
    depth: 50,
    translate: { x: 25, y: -70, z: 5 },
    stroke: false,
    color: '#E62',
    rearFace: '#C25',
    leftFace: '#C25',
    bottomFace: '#C25',
  });

  let patch = false;
  const apply = (): void => {
    // with zoom set, a one-pixel stroke is 1 / zoom units
    const s = patch ? 1 / illo.zoom : false;
    box.stroke = s;
    small.stroke = s;
  };
  apply();

  if (stage.bar) {
    checkbox(stage.bar, 'stroke: 1 / zoom', patch, (v) => { patch = v; apply(); });
    slider(stage.bar, 'zoom', 1, 4, 0.1, factor, (v) => { illo.zoom = stage.zoom * v; apply(); }, (v) => (v * stage.zoom).toFixed(1));
  } else {
    stage.every(1800, () => { patch = !patch; apply(); });
  }

  stage.loop((dt) => {
    illo.rotate.y += dt * 0.35;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
