// Squash and stretch: a jelly cube bouncing, scaled on its anchor
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to look around. The edge lines keep their width while the cube squashes.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    rotate: { x: -0.3, y: -0.6 },
    dragRotate: !stage.preview,
  });

  new Zdog.Ellipse({ addTo: illo, diameter: 150, translate: { y: 62 }, rotate: { x: Math.PI / 2 }, stroke: 2, color: '#555' });
  // shadow: shrinks as the cube rises
  const shadow = new Zdog.Ellipse({
    addTo: illo, diameter: 90, translate: { y: 62 }, rotate: { x: Math.PI / 2 }, stroke: false, fill: true, color: '#222',
  });

  // the Anchor sits at the cube's feet, so scale squashes it toward the floor
  const feet = new Zdog.Anchor({ addTo: illo, translate: { y: 62 } });
  const size = 70;
  const jelly = new Zdog.Box({
    addTo: feet, width: size, height: size, depth: size, translate: { y: -size / 2 },
    stroke: 8, color: '#E62', leftFace: '#C25', rightFace: '#EA0', topFace: '#ED0', bottomFace: '#a35ac9', rearFace: '#C25',
  });
  const eye = new Zdog.Shape({ addTo: jelly, translate: { x: -15, y: -6, z: size / 2 + 6 }, stroke: 9, color: '#fff' });
  eye.copy({ translate: { x: 15, y: -6, z: size / 2 + 6 } });
  new Zdog.Shape({ addTo: jelly, translate: { x: -15, y: -6, z: size / 2 + 9 }, stroke: 4, color: '#333' }).copy({ translate: { x: 15, y: -6, z: size / 2 + 9 } });

  let squash = 0.4;
  let height = 110;
  const info = stage.bar ? readout(stage.bar) : null;
  if (stage.bar) {
    slider(stage.bar, 'squash', 0, 0.7, 0.05, squash, (v) => { squash = v; });
    slider(stage.bar, 'bounce height', 40, 130, 1, height, (v) => { height = v; });
  }

  const period = 1.3;
  stage.loop((_dt, t) => {
    const p = (t % period) / period;
    let y = 0;
    let sy = 1;
    if (p < 0.72) {
      const q = p / 0.72;
      y = height * 4 * q * (1 - q);
      sy = 1 + squash * 0.5 * Math.abs(1 - 2 * q); // stretched when fast
    } else {
      sy = 1 - squash * Math.sin(((p - 0.72) / 0.28) * Math.PI); // squashed on landing
    }
    feet.translate.y = 62 - y;
    // keep the volume: when it gets shorter it gets wider
    feet.scale.y = sy;
    feet.scale.x = feet.scale.z = 1 / Math.sqrt(sy);
    const s = 1 - (y / (height + 80)) * 0.6;
    shadow.diameter = 90 * s;
    shadow.updatePath();
    if (info) info.textContent = `scale: { x: ${feet.scale.x.toFixed(2)}, y: ${feet.scale.y.toFixed(2)}, z: ${feet.scale.z.toFixed(2)} }`;
    if (stage.preview) illo.rotate.y = -0.6 + 0.4 * Math.sin(t * 0.7);
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
