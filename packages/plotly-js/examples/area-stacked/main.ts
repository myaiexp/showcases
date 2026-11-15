// scatter stackgroup stacks lines and fills; groupnorm normalizes the stack
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';

const norms = ['', 'fraction', 'percent'] as const;
const label = (n: string): string => n || 'none';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  const traces: Data[] = [
    { x: [1, 2, 3], y: [2, 1, 4], stackgroup: 'one' },
    { x: [1, 2, 3], y: [1, 1, 2], stackgroup: 'one' },
    { x: [1, 2, 3], y: [3, 0, 2], stackgroup: 'one' },
  ];

  await Plotly.newPlot(
    stage.div,
    traces,
    { template: stage.template, title: stage.preview ? undefined : { text: 'Stacked and filled line chart' } },
    stage.config,
  );

  // groupnorm belongs to the first trace of the stack group.
  const apply = (n: (typeof norms)[number]): void => void restyle(stage.div, { groupnorm: n }, [0]);
  if (stage.bar) select(stage.bar, 'groupnorm', norms.map(label), 'none', (v) => apply(v === 'none' ? '' : (v as 'fraction')));
  if (stage.preview) stage.every(1500, (i) => {
    const n = pick(norms, i);
    apply(n);
  });

  return () => stage.dispose();
};

export default mount;
