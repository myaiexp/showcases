// Bezier heart: two mirrored halves drawn with bezier commands, beating by scale
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

// left half, from the bottom tip up round the lobe to the dip at the top centre.
// `s` flips x to get the right half.
function half(s: 1 | -1): Zdog.PathCommand[] {
  return [
    { x: 0, y: 64 }, // start at the bottom tip
    { bezier: [{ x: -26 * s, y: 40 }, { x: -76 * s, y: 14 }, { x: -76 * s, y: -18 }] },
    { bezier: [{ x: -76 * s, y: -56 }, { x: -22 * s, y: -66 }, { x: 0, y: -32 }] },
  ];
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to turn the heart.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.2,
    rotate: { y: -0.5 },
    dragRotate: true,
  });
  const heart = new Zdog.Anchor({ addTo: illo, translate: { y: -4 } });

  // two layers: a bright front and a darker back, each in two halves
  for (const [z, color] of [[10, '#E24060'], [-10, '#9d1d3f']] as const) {
    for (const s of [1, -1] as const) {
      new Zdog.Shape({ addTo: heart, path: half(s), fill: true, stroke: 8, color, translate: { z } });
    }
  }
  // a glint
  new Zdog.Shape({
    addTo: heart,
    path: [{ x: -50, y: -30, z: 20 }, { bezier: [{ x: -52, y: -42, z: 20 }, { x: -44, y: -48, z: 20 }, { x: -34, y: -48, z: 20 }] }],
    closed: false,
    stroke: 4,
    color: '#FDB',
  });

  let amount = 0.12;
  let rate = 1.4; // beats per second
  if (stage.bar) {
    slider(stage.bar, 'beat size', 0, 0.3, 0.01, amount, (v) => { amount = v; }, (v) => `${Math.round(v * 100)}%`);
    slider(stage.bar, 'heart rate', 0.5, 3, 0.1, rate, (v) => { rate = v; }, (v) => `${Math.round(v * 60)} bpm`);
  }

  stage.loop((_dt, t) => {
    // a quick thump, then rest: raise a sine wave to a power
    const beat = Math.pow(Math.max(0, Math.sin(t * rate * Zdog.TAU)), 3);
    heart.scale.set({ x: 1 + beat * amount, y: 1 + beat * amount, z: 1 + beat * amount });
    illo.rotate.y = -0.5 + Math.sin(t * 0.6) * 0.5;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
