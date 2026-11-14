// FAQ: clicking a funnel legend item re-flows the funnel with a built-in transition
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';

const STEPS = ['Step1', 'Step2', 'Step3', 'Step4', 'Step5'];

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'funnel',
    categoryField: 'name',
    valueField: 'value',
    data: [{ id: 'funnel', values: STEPS.map((name, i) => ({ name, value: 100 - i * 20 })) }],
    label: { visible: true },
    legends: { id: 'steps', visible: true, orient: 'bottom' },
  });
  // No pointer in the card, so the legend selection is changed through the API; a real click does the same.
  let alive = true;
  let i = 0;
  const stop = every(1500, () => {
    if (!alive) return;
    i++;
    const hidden = i % 6 === 0 ? undefined : STEPS[(i % 4) + 1];
    vchart.setLegendSelectedDataById('steps', STEPS.filter((s) => s !== hidden));
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
