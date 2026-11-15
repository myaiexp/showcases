// An indicator number and delta drawn above a scatter trace in the same figure
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const users = [325, 324, 405, 400, 424, 404, 417, 432, 419, 394, 410, 426, 413, 419, 404, 408, 401, 377, 368, 361, 356, 359, 375, 397, 394, 418, 437, 450, 430, 442, 424, 443, 420, 418, 423, 423, 426, 440, 437, 436, 447, 460, 478, 472, 450, 456, 436, 418, 429, 412, 429, 442, 464, 447, 434, 457, 474, 480, 499, 497, 480, 502, 512, 492];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'indicator', mode: 'number+delta', value: 492, delta: { reference: 512, valueformat: '.0f' }, domain: { y: [0, 1], x: [0.25, 0.75] }, title: { text: 'Users online' } },
      { y: users, mode: 'lines', line: { color: '#60a5fa' } },
    ],
    { template: stage.template, xaxis: { range: [0, 62] } },
    stage.config,
  );

  // The indicator reads the last visible point: a sliding window moves the number and delta.
  if (stage.preview) {
    stage.every(500, (i) => {
      const n = 40 + (i % (users.length - 40));
      void Plotly.restyle(stage.div, { value: users[n] ?? 0 }, [0]);
      void Plotly.restyle(stage.div, { y: [users.slice(0, n + 1)] }, [1]);
    });
  }

  return () => stage.dispose();
};

export default mount;
