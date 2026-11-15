// prependTraces adds points to the front of each trace's arrays
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// The docs' maxPoints argument works at runtime but is missing from prependTraces' types.
const prependTraces = Plotly.prependTraces as (...args: [HTMLElement, object, number[], number]) => Promise<unknown>;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const start = () => [
    { x: [0], y: [0], mode: 'lines+markers' as const, name: 'A' },
    { x: [0], y: [1], mode: 'lines+markers' as const, name: 'B' },
  ];
  await Plotly.newPlot(stage.div, start(), { template: stage.template, showlegend: !stage.preview }, stage.config);

  let t = 0;
  const prepend = (): void => {
    t -= 1;
    const first = (k: number): number => ((stage.div.data[k] as { y?: number[] } | undefined)?.y?.[0] ?? k);
    const y0 = first(0);
    const y1 = first(1);
    // prepend multiple traces, up to a maximum of 20 points per trace: the oldest end drops off
    void prependTraces(stage.div, { x: [[t], [t]], y: [[y0 + Math.random() - 0.5], [y1 + Math.random() - 0.5]] }, [0, 1], 20);
  };
  const reset = (): void => {
    t = 0;
    void Plotly.react(stage.div, start(), { template: stage.template, showlegend: !stage.preview }, stage.config);
  };

  if (stage.bar) {
    button(stage.bar, 'prepend one point to each', prepend);
    button(stage.bar, 'reset', reset);
  }
  if (stage.preview) stage.every(250, (i) => (i % 60 === 0 ? reset() : prepend()));

  return () => stage.dispose();
};

export default mount;
