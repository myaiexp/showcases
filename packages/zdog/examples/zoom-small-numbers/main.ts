// Zoom with small numbers: a tiny cactus modelled in single digits, then zoomed
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every number in the model stays small. Only zoom changes.' });
  const base = stage.zoom * 3; // zoom that fills the box with a 40-unit model
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: base,
    rotate: { x: -0.3 },
  });
  const model = new Zdog.Anchor({ addTo: illo, translate: { y: 8 } });

  // pot: diameter 14, a cylinder stood on end
  new Zdog.Cylinder({
    addTo: model,
    diameter: 14,
    length: 9,
    translate: { y: 8 },
    rotate: { x: TAU / 4 },
    stroke: false,
    color: '#E62',
    frontFace: '#7a4a2b',
    backface: '#C25',
  });
  // trunk and arms are lines; thick stroke makes them plump
  new Zdog.Shape({ addTo: model, path: [{ y: 4 }, { y: -14 }], stroke: 8, color: '#3c6' });
  new Zdog.Shape({ addTo: model, path: [{ x: -5, y: -2 }, { x: -9, y: -2 }, { x: -9, y: -9 }], closed: false, stroke: 4, color: '#3c6' });
  new Zdog.Shape({ addTo: model, path: [{ x: 5, y: -6 }, { x: 9, y: -6 }, { x: 9, y: -11 }], closed: false, stroke: 4, color: '#3c6' });
  // flower on top
  new Zdog.Shape({ addTo: model, translate: { y: -19 }, stroke: 4, color: '#e85a9c' });

  const info = stage.bar ? readout(stage.bar) : null;
  const show = (): void => {
    if (info) info.textContent = `pot diameter 14, stroke 8: drawn ${(14 * illo.zoom).toFixed(0)}px and ${(8 * illo.zoom).toFixed(0)}px wide`;
  };
  show();

  if (stage.bar) {
    slider(stage.bar, 'zoom', 1, 4.5, 0.1, 3, (v) => {
      illo.zoom = stage.zoom * v;
      show();
    }, (v) => (v * stage.zoom).toFixed(1));
  }

  stage.loop((dt, t) => {
    // cards breathe the zoom; the full view keeps the slider's value
    if (stage.preview) illo.zoom = base * (1 + 0.28 * Math.sin(t * 1.4));
    illo.rotate.y += dt * 0.7;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
