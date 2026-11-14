// Canvas and SVG elements: one rubber duck in a canvas and an svg, side by side
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage, type Stage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';

const TAU = Zdog.TAU;

// the same model for both elements
function duck(addTo: Zdog.Anchor): void {
  new Zdog.Shape({ addTo, translate: { y: 22 }, stroke: 100, color: '#EA0' }); // body
  new Zdog.Cone({ addTo, diameter: 44, length: 36, translate: { y: 8, z: -62 }, rotate: { y: TAU / 2, x: -0.5 }, stroke: false, color: '#EA0', backface: '#E62' }); // tail
  new Zdog.Shape({ addTo, translate: { y: -48, z: 12 }, stroke: 64, color: '#EA0' }); // head
  new Zdog.Cone({ addTo, diameter: 26, length: 30, translate: { y: -42, z: 42 }, stroke: false, color: '#E62', backface: '#C25' }); // beak
  for (const side of [-1, 1]) {
    new Zdog.Shape({ addTo, translate: { x: side * 16, y: -58, z: 38 }, stroke: 8, color: '#222' }); // eyes
    new Zdog.Ellipse({ addTo, width: 54, height: 34, translate: { x: side * 48, y: 20, z: -4 }, rotate: { y: TAU / 4 }, stroke: 6, fill: true, color: '#FDB' }); // wings
  }
}

const mount: Mount = (el, ctx) => {
  // two columns: the canvas on the left, the svg on the right
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;width:100%;justify-content:center';
  el.append(row);
  const column = (): HTMLDivElement => {
    const c = document.createElement('div');
    c.style.cssText = 'flex:1;min-width:0;display:flex;flex-direction:column;align-items:center';
    row.append(c);
    return c;
  };
  const left = createStage(column(), ctx, { aspect: 1, fit: 230 });
  const right = createStage(column(), ctx, { kind: 'svg', aspect: 1, fit: 230 });
  const stages: [Stage<HTMLCanvasElement>, Stage<SVGSVGElement>] = [left, right];

  // the only difference is the element handed to Illustration
  const illos = stages.map(
    (stage) => new Zdog.Illustration({ element: stage.element, zoom: stage.zoom, rotate: { x: -0.25 } }),
  );
  illos.forEach(duck);

  const notes = stages.map((s) => (s.bar ? readout(s.bar) : null));
  left.loop((_, t) => {
    illos.forEach((illo) => {
      illo.rotate.y = t * 0.8;
      illo.updateRenderGraph();
    });
    const [a, b] = notes;
    if (a) a.textContent = `<canvas>: pixels, ${left.element.width} px wide`;
    if (b) b.textContent = `<svg>: ${right.element.querySelectorAll('path').length} path elements`;
  });

  return () => {
    stages.forEach((s) => s.dispose());
    row.remove();
  };
};

export default mount;
