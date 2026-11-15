// Statistical functions: densityNormal, cumulativeNormal and quantileNormal drawn as curves
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 220,
    padding: 8,
    signals: [
      { name: 'mean', value: 0, bind: { input: 'range', min: -3, max: 3, step: 0.25 } },
      { name: 'sd', value: 1, bind: { input: 'range', min: 0.4, max: 2.5, step: 0.1 } },
      { name: 'prob', value: 0.84, bind: { input: 'range', min: 0.02, max: 0.98, step: 0.02 } },
      // The inverse of the cumulative curve: where the chosen probability sits on the x axis.
      { name: 'qx', update: 'quantileNormal(prob, mean, sd)' },
    ],
    data: [
      {
        name: 'curve',
        transform: [
          { type: 'sequence', start: -7, stop: 7.05, step: 0.05, as: 'x' },
          { type: 'formula', as: 'pdf', expr: 'densityNormal(datum.x, mean, sd)' },
          { type: 'formula', as: 'cdf', expr: 'cumulativeNormal(datum.x, mean, sd)' },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [-7, 7], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 1], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.15, tickCount: 5 },
    ],
    marks: [
      {
        type: 'area',
        from: { data: 'curve' },
        encode: {
          update: {
            x: { scale: 'x', field: 'x' },
            y: { scale: 'y', field: 'pdf' },
            y2: { scale: 'y', value: 0 },
            fill: { value: 'steelblue' },
            fillOpacity: { value: 0.35 },
          },
        },
      },
      {
        type: 'line',
        from: { data: 'curve' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'cdf' }, stroke: { value: 'orange' }, strokeWidth: { value: 2 } } },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { scale: 'x', signal: 'qx' },
            y: { scale: 'y', signal: 'prob' },
            y2: { signal: 'height' },
            stroke: { value: '#ddd' },
            strokeDash: { value: [4, 3] },
          },
        },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { value: 0 },
            x2: { scale: 'x', signal: 'qx' },
            y: { scale: 'y', signal: 'prob' },
            stroke: { value: '#ddd' },
            strokeDash: { value: [4, 3] },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { scale: 'x', signal: 'qx', offset: 6 },
            y: { scale: 'y', signal: 'prob', offset: 14 },
            text: { signal: "'quantileNormal(' + format(prob, '.2f') + ') = ' + format(qx, '.2f')" },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
          },
        },
      },
      { type: 'text', encode: { enter: { x: { value: 6 }, y: { value: 6 }, text: { value: 'cumulativeNormal' }, fill: { value: 'orange' }, fontSize: { value: 11 } } } },
      { type: 'text', encode: { enter: { x: { value: 6 }, y: { value: 20 }, text: { value: 'densityNormal' }, fill: { value: '#8fb8de' }, fontSize: { value: 11 } } } },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { mean: 0, sd: 1, prob: 0.84 },
      { mean: 1.5, sd: 0.6, prob: 0.5 },
      { mean: -1, sd: 2, prob: 0.16 },
      { mean: 0.5, sd: 1.2, prob: 0.95 },
    ],
    1400,
  );
  return () => stage.dispose();
};

export default mount;
