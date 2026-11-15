// binX domain: bins cover the data extent unless a fixed [min, max] is given
import { binX, defineChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { makeLatencies } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const latencies = makeLatencies();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (domain: readonly [number, number] | undefined) => {
    const bins = binX(latencies, { value: 'latency', thresholds: 12, domain });
    return defineChart({
      marks: [rect(bins, { x1: 'x1', x2: 'x2', y1: () => 0, y2: 'value', fill: '#4ade80', inset: 0.5 })],
      scales: {
        x: { scale: scaleLinear, nice: true, axis: { label: 'Latency (ms)' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Requests' } },
      },
    });
  };
  const states: readonly (readonly [readonly [number, number] | undefined, string])[] = [
    [undefined, 'no domain: the data extent'],
    [[0, 600], 'domain: [0, 600]'],
    [[50, 250], 'domain: [50, 250] (values outside are left out)'],
  ];
  lab(stage, { label: 'domain', ariaLabel: 'Latency histogram', states, build, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
