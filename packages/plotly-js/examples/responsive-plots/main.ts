// config.responsive: the figure refits its box when the box changes size
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  await Plotly.newPlot(
    stage.div,
    [{ type: 'bar', x: [1, 2, 3, 4], y: [5, 10, 2, 8], marker: { color: '#C8A2C8', line: { width: 2.5 } } }],
    { template: stage.template, title: { text: stage.preview ? '' : "Responsive to its container's size!" }, font: { size: stage.preview ? 11 : 18 } },
    // responsive: true makes plotly.js refit on window resizes (the docs' use);
    // the stage also watches the div itself, so the slider below works too.
    { ...stage.config, responsive: true },
  );

  const setWidth = (pct: number): void => {
    stage.div.style.width = `${pct}%`;
    // A card has no ResizeObserver from the stage, so it asks for the refit itself.
    if (stage.preview) Promise.resolve(Plotly.Plots.resize(stage.div) as unknown).catch(() => {});
  };
  if (stage.bar) slider(stage.bar, 'container width (%)', [30, 100, 5], 100, setWidth);
  if (stage.preview) stage.every(100, (i) => setWidth(65 + 35 * Math.sin(i / 8)));
  return () => stage.dispose();
};

export default mount;
