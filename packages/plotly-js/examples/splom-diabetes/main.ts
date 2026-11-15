// An eight-column splom of the diabetes data: 768 patients, 64 panels
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { splomAxes } from '../../shared/splom.ts';
import { toggle } from '../../shared/controls.ts';

const COLUMNS: [string, string][] = [
  ['Pregnancies', 'Pregnancies'],
  ['Glucose', 'Glucose'],
  ['BloodPressure', 'BloodPressure'],
  ['SkinThickness', 'SkinThickness'],
  ['Insulin', 'Insulin'],
  ['BMI', 'BMI'],
  ['DiabPedigreeFun', 'DiabetesPedigreeFunction'],
  ['Age', 'Age'],
];

const mount: Mount = async (el, ctx) => {
  const all = await csv('diabetes.csv');
  if (ctx.signal.aborted) return () => {};
  // WebGL keeps the full view light; cards take every fifth patient and the first four columns.
  const rows = ctx.preview ? all.filter((_, i) => i % 5 === 0) : all;
  const cols = ctx.preview ? COLUMNS.slice(0, 4) : COLUMNS;
  const stage = createStage(el, ctx, { height: 760 });
  const outcome = unpackNum(rows, 'Outcome');

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'splom',
        dimensions: cols.map(([label, key]) => ({ label, values: unpackNum(rows, key) })),
        // In the Pima data an Outcome of 1 means the patient was diagnosed with diabetes.
        text: outcome.map((o) => (o === 1 ? 'Diabetic' : 'Non-Diabetic')),
        marker: { color: outcome, colorscale: [[0, '#119dff'], [0.5, '#119dff'], [0.5, '#ef553b'], [1, '#ef553b']], size: stage.preview ? 3 : 5, line: { color: 'white', width: 0.5 } },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Scatterplot Matrix (SPLOM) for Diabetes Dataset' },
      hovermode: 'closest',
      dragmode: 'select',
      ...splomAxes(cols.length, stage.preview ? 7 : 10),
      ...(stage.preview ? { margin: { l: 30, r: 10, t: 6, b: 24 } } : {}),
    },
    stage.config,
  );

  if (stage.bar) toggle(stage.bar, 'showupperhalf', true, (v) => void Plotly.restyle(stage.div, { showupperhalf: v }));
  else stage.every(1300, (i) => void Plotly.restyle(stage.div, { showupperhalf: i % 2 === 0 }));

  return () => stage.dispose();
};

export default mount;
