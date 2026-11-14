// Ease in, ease out: four cards flip with easeInOut at powers 1 to 4
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, slider } from '../../shared/controls.ts';

const POWERS = [1, 2, 3, 4];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { fit: 280, aspect: 0.5 });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom,
    rotate: { x: -0.25 },
  });

  // one card per power, side by side
  const cards = POWERS.map((power, i) => {
    const pivot = new Zdog.Anchor({ addTo: illo, translate: { x: (i - 1.5) * 64 } });
    new Zdog.RoundedRect({
      addTo: pivot,
      width: 44,
      height: 64,
      cornerRadius: 6,
      stroke: 4,
      fill: true,
      color: '#EA0',
      backface: '#C25', // the back of the card
    });
    // a pip on the front, so the turn reads at a glance
    new Zdog.Shape({ addTo: pivot, translate: { z: 3 }, stroke: 12 + power * 2, color: '#fff' });
    return { pivot, power };
  });

  let cycleFrames = 150;
  if (stage.bar) {
    readout(stage.bar, 'left to right: power 1 (no easing), 2, 3, 4');
    slider(stage.bar, 'frames per turn', 60, 300, 10, cycleFrames, (v) => (cycleFrames = v));
  }

  let ticker = 0;
  stage.loop(() => {
    const progress = ticker / cycleFrames;
    for (const { pivot, power } of cards) {
      // apply easing to rotation: same clock, different power
      const tween = Zdog.easeInOut(progress % 1, power);
      pivot.rotate.y = tween * Zdog.TAU;
    }
    ticker++;
    illo.updateRenderGraph();
  });

  return stage.dispose;
};

export default mount;
