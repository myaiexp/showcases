// setSize: a sun badge resized from code between thumbnail and large
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, readout } from '../../shared/controls.ts';

const TAU = Zdog.TAU;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // a fixed-height holder so the page does not jump while the canvas changes size
  const holder = document.createElement('div');
  holder.style.cssText = `display:flex;align-items:center;justify-content:center;width:100%;height:${stage.height}px`;
  stage.element.replaceWith(holder);
  holder.append(stage.element);

  const illo = new Zdog.Illustration({ element: stage.element, zoom: stage.zoom, rotate: { x: -0.2 } });

  // a smiling sun badge
  new Zdog.Ellipse({ addTo: illo, diameter: 150, stroke: 24, fill: true, color: '#EA0' });
  new Zdog.Ellipse({ addTo: illo, diameter: 150, stroke: 6, color: '#ED0', translate: { z: 14 } });
  for (const side of [-1, 1]) new Zdog.Shape({ addTo: illo, translate: { x: side * 26, y: -18, z: 16 }, stroke: 14, color: '#5b2a10' });
  new Zdog.Ellipse({ addTo: illo, diameter: 70, quarters: 2, translate: { y: 8, z: 16 }, rotate: { z: TAU / 4 }, stroke: 8, color: '#5b2a10' });
  for (let i = 0; i < 12; i++) {
    const ray = new Zdog.Anchor({ addTo: illo, rotate: { z: (i * TAU) / 12 } });
    new Zdog.Shape({ addTo: ray, path: [{ y: -100 }, { y: -118 }], stroke: 10, color: '#E62' });
  }

  const info = stage.bar ? readout(stage.bar) : null;
  const apply = (px: number): void => {
    const w = Math.round(px);
    const h = Math.round(px * 0.8);
    illo.setSize(w, h); // canvas pixels: setSize multiplies them by devicePixelRatio itself
    illo.zoom = Math.min(w, h) / 240; // setSize does not touch zoom, so keep the scene fitting
    if (info) info.textContent = `illo.setSize(${w}, ${h})`;
  };
  const biggest = Math.min(stage.width, stage.height / 0.8);
  const sizes = stage.preview ? [60, 110, 170, 230] : [64, 128, 256, biggest];
  if (stage.bar) {
    const names = ['thumbnail', 'small', 'medium', 'large'];
    sizes.forEach((px, i) => button(stage.bar!, names[i]!, () => apply(px)));
  } else {
    let i = 0;
    stage.every(1300, () => apply(sizes[(i = (i + 1) % sizes.length)]!));
  }
  apply(sizes[stage.preview ? 3 : 2]!);

  stage.loop((_, t) => {
    illo.rotate.y = Math.sin(t * 1.2) * 0.6;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
