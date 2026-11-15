// frame: a background and border around the inner plot bounds, drawn before the data
import { defineChart, frame, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { sensorA } from '../../shared/marks2-series.ts';
import { createStage } from '../../shared/stage.ts';

type Look = 'border' | 'panel' | 'rounded' | 'inset';
const looks = {
  border: { strokeOpacity: 0.6 },
  panel: { fill: 'color-mix(in srgb, currentColor 6%, transparent)', strokeOpacity: 0 },
  rounded: { fill: 'color-mix(in srgb, currentColor 4%, transparent)', strokeOpacity: 0.4, radius: 12 },
  inset: { fill: 'color-mix(in srgb, #60a5fa 10%, transparent)', stroke: '#60a5fa', strokeOpacity: 0.8, strokeWidth: 2, inset: 12, radius: 6 },
} as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (look: Look) =>
    defineChart({
      marks: [frame(looks[look]), lineY(sensorA, { x: 'month', y: 'value', points: true })],
      scales: {
        x: { scale: scaleLinear },
        y: { scale: scaleLinear, nice: true },
      },
    });

  const options = (look: Look) => ({ definition: build(look), height: stage.height, ariaLabel: 'A line chart inside a frame' });
  const host = stage.own(mountChart(stage.box, options('rounded')));
  const modes = (Object.keys(looks) as Look[]).map((l) => [l, l] as const);
  const show = (look: Look): void => {
    host.update(options(look));
    stage.say(`frame(${JSON.stringify(looks[look]).replace(/"/g, '')})`);
  };
  if (stage.bar) select(stage.bar, 'frame', modes, show, 'rounded');
  else stage.cycle(modes.map((m) => m[0]), 1800, show);
  return () => stage.dispose();
};

export default mount;
