// layout.font: one family, size and colour for every piece of text in the figure
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const FAMILIES = ['Courier New, monospace', 'Georgia, serif', 'Arial, sans-serif', 'Impact, fantasy', 'Comic Sans MS, cursive'] as const;
const COLORS = ['#7f7f7f', '#f59e0b', '#34d399', '#f472b6', '#e6e8ee'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const font = { family: FAMILIES[0] as string, size: stage.preview ? 12 : 18, color: COLORS[0] as string };
  const ramp = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  await Plotly.newPlot(
    stage.div,
    [{ x: ramp, y: ramp, type: 'scatter', line: { color: '#60a5fa' } }],
    { template: stage.template, title: { text: 'Global Font' }, font: { ...font } },
    stage.config,
  );

  const apply = (): void => void Plotly.relayout(stage.div, { font: { ...font } });
  if (stage.bar) {
    select(stage.bar, 'font.family', FAMILIES, FAMILIES[0], (v) => ((font.family = v), apply()));
    slider(stage.bar, 'font.size', [8, 30, 1], font.size, (v) => ((font.size = v), apply()));
    select(stage.bar, 'font.color', COLORS, COLORS[0], (v) => ((font.color = v), apply()));
  } else {
    stage.every(1200, (i) => {
      font.family = FAMILIES[i % FAMILIES.length]!;
      font.color = COLORS[(i + 1) % COLORS.length]!;
      apply();
    });
  }
  return () => stage.dispose();
};

export default mount;
