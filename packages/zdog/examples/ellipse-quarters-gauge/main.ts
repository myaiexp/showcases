// Quarter gauge: an Ellipse with quarters 1 to 4 as a charge ring, with width and height squash
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

type Q = 1 | 2 | 3 | 4;
const QUARTER_COLORS = ['#C25', '#E62', '#EA0', '#7c6'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to tilt the dial.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.2,
    rotate: { x: -0.35, y: -0.4 },
    dragRotate: true,
  });
  const dial = new Zdog.Anchor({ addTo: illo });
  let squash = 1;
  const W = 150;

  // faint track: the whole ring, quarters 4 is the default
  const track = new Zdog.Ellipse({ addTo: dial, width: W, height: W, stroke: 18, color: '#2c2c4a' });
  // the gauge itself
  const gauge = new Zdog.Ellipse({
    addTo: dial, width: W, height: W, quarters: 1, stroke: 18, color: QUARTER_COLORS[0]!, translate: { z: 3 },
  });
  // a tick dot at the end of each quarter
  for (let i = 0; i < 4; i++) {
    const a = ((i + 1) * Zdog.TAU) / 4;
    new Zdog.Shape({
      addTo: dial, stroke: 8, color: '#fff',
      translate: { x: Math.sin(a) * (W / 2), y: -Math.cos(a) * (W / 2), z: 6 },
    });
  }
  // centre cap
  new Zdog.Ellipse({ addTo: dial, diameter: 44, stroke: 3, fill: true, color: '#3a3a66', translate: { z: -2 } });

  const set = (q: Q): void => {
    gauge.quarters = q;
    gauge.color = QUARTER_COLORS[q - 1]!;
    gauge.updatePath();
  };
  const setSquash = (k: number): void => {
    squash = k;
    for (const e of [track, gauge]) {
      e.height = W * k;
      e.updatePath();
    }
  };
  set(1);

  if (stage.bar) {
    slider(stage.bar, 'quarters', 1, 4, 1, 1, (v) => set(v as Q), (v) => `${v} (${v * 25}%)`);
    slider(stage.bar, 'height / width', 0.3, 1.5, 0.05, squash, setSquash, (v) => v.toFixed(2));
  } else {
    let q = 1;
    stage.every(900, () => {
      q = (q % 4) + 1;
      set(q as Q);
    });
  }

  stage.loop((_dt, t) => {
    if (stage.preview) dial.rotate.y = Math.sin(t * 0.8) * 0.5;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
