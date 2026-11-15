// splom cells share ranges by row and column now that axis.matches defaults to true
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('iris-data.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 560 });
  const keys = ['sepal length', 'sepal width', 'petal length'];
  const colours: Record<string, string> = { 'Iris-setosa': '#60a5fa', 'Iris-versicolor': '#f59e0b', 'Iris-virginica': '#34d399' };
  let matches = true;

  const draw = (): Promise<unknown> =>
    Plotly.react(
      stage.div,
      [
        {
          type: 'splom',
          dimensions: keys.map((k) => ({ label: k, values: unpackNum(rows, k) })),
          marker: { color: rows.map((r) => colours[r['class'] ?? ''] ?? '#999'), size: stage.preview ? 3 : 5 },
          showupperhalf: false,
          diagonal: { visible: false },
          // Explicit only when switched off: true is the v4 default.
          xaxes: matches ? undefined : keys.map(() => ({ matches: false })),
          yaxes: matches ? undefined : keys.map(() => ({ matches: false })),
        } as Plotly.Data,
      ],
      { template: stage.template, dragmode: 'zoom', margin: stage.preview ? { l: 24, r: 6, t: 6, b: 20 } : undefined },
      stage.config,
    );
  await draw();

  if (stage.bar) {
    select(stage.bar, 'axis.matches', ['true (default)', 'false'], 'true (default)', (v) => {
      matches = v !== 'false';
      void draw();
    });
  }
  // Cards zoom one cell (sepal length on x); the linked cells in that column follow.
  if (stage.preview)
    stage.every(1800, (i) => void Plotly.relayout(stage.div, i % 2 ? { 'xaxis.range': [5, 6.2] } : { 'xaxis.autorange': true }));

  return () => stage.dispose();
};

export default mount;
