// ariaHidden drops decorative marks from the accessibility tree
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { ariaReadout } from '../../shared/a11y-readout.ts';
import { mountPlot } from '../../shared/plot.ts';

type S = { hideLine: boolean; hideRule: boolean };
const STAGES: S[] = [
  { hideLine: false, hideRule: false },
  { hideLine: true, hideRule: false },
  { hideLine: true, hideRule: true },
  { hideLine: false, hideRule: true },
];

const mount: Mount = async (el, ctx) => {
  const aapl = (await csv('aapl.csv')).slice(-50);
  const readout = ariaReadout(el, ctx.preview);
  const stop = mountPlot<S>(el, ctx, {
    initial: STAGES[0] as S,
    render: ({ hideLine, hideRule }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `hidden: ${[hideLine && 'line', hideRule && 'rule'].filter(Boolean).join(', ') || 'none'}` : undefined,
        marks: [
          // The line only connects the dots and the rule only marks a level: both are redundant.
          Plot.ruleY([170], { stroke: 'orange', ariaHidden: hideRule ? 'true' : undefined }),
          Plot.lineY(aapl, { x: 'Date', y: 'Close', strokeOpacity: 0.5, ariaHidden: hideLine ? 'true' : undefined }),
          Plot.dot(aapl, { x: 'Date', y: 'Close', r: 2.5 }),
        ],
      }),
    step: (_s, i) => STAGES[i % STAGES.length] as S,
    previewMs: 1700,
    after: (root) => readout.update(root),
    controls: (bar, live) => {
      toggle(bar, 'ariaHidden on the line', live.state.hideLine, (hideLine) => live.set({ hideLine }));
      toggle(bar, 'ariaHidden on the rule', live.state.hideRule, (hideRule) => live.set({ hideRule }));
    },
  });
  return () => {
    stop();
    readout.remove();
  };
};

export default mount;
