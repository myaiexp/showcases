// Three bullet charts stacked in one figure through indicator domains
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300 });

  // Each indicator owns a horizontal band of the figure (its domain.y); ink is light for the dark page.
  const bullet = (title: string, value: number, reference: number, max: number, mark: number, steps: number[], y: [number, number]) => ({
    type: 'indicator' as const,
    mode: 'number+gauge+delta' as const,
    value,
    delta: { reference },
    domain: { x: [0.25, 1] as [number, number], y },
    title: { text: title },
    gauge: {
      shape: 'bullet' as const,
      axis: { range: [null, max] as never },
      threshold: { line: { color: '#e6e8ee', width: 2 }, thickness: 0.75, value: mark },
      steps: [
        { range: [0, steps[0] ?? 0] as [number, number], color: 'gray' },
        { range: [steps[0] ?? 0, steps[1] ?? 0] as [number, number], color: '#3a4150' },
      ],
      bar: { color: '#60a5fa' },
    },
  });

  await Plotly.newPlot(
    stage.div,
    [
      bullet('Revenue', 180, 200, 300, 170, [150, 250], [0.08, 0.25]),
      bullet('Profit', 35, 200, 100, 50, [25, 75], [0.4, 0.6]),
      bullet('Satisfaction', 220, 200, 300, 210, [150, 250], [0.7, 0.9]),
    ],
    { template: stage.template, margin: { t: 10, r: 25, l: 25, b: 10 } },
    stage.config,
  );

  const set = (v: number): void => void Plotly.restyle(stage.div, { value: [v, v / 3, v * 1.1] });
  if (stage.bar) slider(stage.bar, 'Revenue value', [0, 300, 5], 180, set);
  else stage.every(150, (i) => set(Math.round(160 + 120 * Math.sin(i / 8))));

  return () => stage.dispose();
};

export default mount;
