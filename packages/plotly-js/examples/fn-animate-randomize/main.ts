// Plotly.animate with transition and frame durations, as in the docs' randomize()
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const EASINGS = ['cubic-in-out', 'linear', 'elastic-out', 'bounce-out', 'back-in-out', 'exp-in'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  let easing: (typeof EASINGS)[number] = 'cubic-in-out';
  let duration = 500;

  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3], y: [0, 0.5, 1], line: { simplify: false }, marker: { size: 12 } }],
    { template: stage.template, yaxis: { range: [-0.1, 1.1] } },
    stage.config,
  );

  const randomize = (): void => {
    void Plotly.animate(
      stage.div,
      { data: [{ y: [Math.random(), Math.random(), Math.random()] }], traces: [0], layout: {} },
      { transition: { duration, easing }, frame: { duration } },
    );
  };

  if (stage.bar) {
    button(stage.bar, 'Randomize', randomize);
    select(stage.bar, 'easing', EASINGS, easing, (v) => (easing = v));
    slider(stage.bar, 'duration ms', [100, 2000, 100], duration, (v) => (duration = v));
  }
  stage.every(1200, (i) => {
    if (stage.preview) easing = EASINGS[Math.floor(i / 2) % EASINGS.length]!;
    if (stage.preview) randomize();
  });

  return () => stage.dispose();
};

export default mount;
