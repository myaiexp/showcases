// Cylinder bar chart: Cylinder bars grow to new values, with two-colour caps
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const BAR_COLORS = ['#E62', '#EA0', '#C25', '#a35ac9', '#5ad'];
const LIGHT = ['#FDB', '#ED0', '#f58', '#c9a', '#9df'];
const SETS = [
  [60, 100, 80, 130, 105],
  [120, 70, 40, 90, 60],
  [30, 55, 95, 110, 140],
  [100, 100, 100, 100, 100],
];
const FLOOR = 70;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to turn the chart.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 0.95,
    rotate: { x: -0.5, y: -0.5 },
    dragRotate: true,
  });
  new Zdog.Rect({
    addTo: illo, width: 250, height: 90, stroke: 4, fill: true, color: '#2c2c4a',
    translate: { y: FLOOR }, rotate: { x: TAU / 4 },
  });

  const now = [60, 60, 60, 60, 60];
  const shown = [-1, -1, -1, -1, -1];
  let target = SETS[0]!;
  const bars: (Zdog.Cylinder | null)[] = [null, null, null, null, null];

  const place = (i: number): void => {
    const length = Math.max(2, now[i]!);
    bars[i]?.remove();
    // a Cylinder runs front to back, so turn it upright; frontFace is its top cap
    bars[i] = new Zdog.Cylinder({
      addTo: illo, diameter: 38, length, stroke: false, color: BAR_COLORS[i]!, frontFace: LIGHT[i]!,
      backface: BAR_COLORS[i]!, translate: { x: (i - 2) * 48, y: FLOOR - length / 2 }, rotate: { x: TAU / 4 },
    });
    shown[i] = now[i]!;
  };
  now.forEach((_, i) => place(i));

  let set = 0;
  const next = (): void => { set = (set + 1) % SETS.length; target = SETS[set]!; };
  if (stage.bar) button(stage.bar, 'new data', next);
  else stage.every(2200, next);

  stage.loop((dt) => {
    for (let i = 0; i < now.length; i++) {
      now[i] = Zdog.lerp(now[i]!, target[i]!, 1 - Math.exp(-dt * 5));
      // only rebuild a bar that has visibly moved
      if (Math.abs(now[i]! - shown[i]!) > 0.3) place(i);
    }
    illo.rotate.y += 0.006;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
