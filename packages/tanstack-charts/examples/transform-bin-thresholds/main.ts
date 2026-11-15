// binX thresholds as a count, an explicit boundary array, and a D3 threshold function
import { binX, defineChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { thresholdScott, thresholdSturges } from 'd3';
import type { Mount } from '@/types.ts';
import { makeLatencies } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const latencies = makeLatencies();
type Thresholds = number | readonly number[] | typeof thresholdScott;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar for its bounds and count.' });

  const build = (thresholds: Thresholds) => {
    const bins = binX(latencies, { value: 'latency', thresholds });
    return defineChart({
      marks: [rect(bins, { x1: 'x1', x2: 'x2', y1: () => 0, y2: 'value', fill: '#60a5fa', inset: 0.5 })],
      scales: {
        x: { scale: scaleLinear, nice: true, axis: { label: 'Latency (ms)' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Requests' } },
      },
      tooltip,
    });
  };
  const states: readonly (readonly [Thresholds, string])[] = [
    [8, 'thresholds: 8'],
    [[0, 50, 100, 150, 200, 300, 500], 'thresholds: [0, 50, 100, 150, 200, 300, 500]'],
    [thresholdScott, 'thresholds: thresholdScott'],
    [thresholdSturges, 'thresholds: thresholdSturges'],
  ];
  lab(stage, { label: 'thresholds', ariaLabel: 'Latency histogram', states, build, after: (_, name) => stage.say(name) });
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
