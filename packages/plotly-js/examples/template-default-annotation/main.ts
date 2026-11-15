// makeTemplate: the first unnamed annotation becomes annotationdefaults
import Plotly from 'plotly.js';
import type { Template, TemplateFigure } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { overDark } from '../../shared/chrome-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = [0, 1, 2, 3, 4, 5];
  const y = [2, 4, 3, 0, 5, 6];

  const baseData = [{ mode: 'lines', error_y: { visible: true, width: 0 }, line: { color: 'teal' } }];
  const baseLayout = {
    // makeTemplate takes the first annotation without a `name` as annotationdefaults
    annotations: [{ text: 'DEFAULT ANNOTATION', x: 0.1, y: 1.1, yref: 'paper', xref: 'paper', showarrow: false, font: { color: 'teal', size: 14 } }],
    showlegend: false,
  };
  const made = Plotly.makeTemplate({ data: baseData, layout: baseLayout } as unknown as TemplateFigure);
  const template = overDark(stage.template, made as Partial<Template>);

  await Plotly.newPlot(
    stage.div,
    [{ x, y }],
    {
      template,
      annotations: [
        {}, // an empty annotation copies annotationdefaults
        { text: 'Third point', x: x[2], y: y[2], showarrow: true, yref: 'y', xref: 'x', font: { size: 20 } }, // colour comes from the defaults
      ],
    },
    stage.config,
  );
  const second = (on: boolean): Promise<void> => relayout(stage.div, { 'annotations[1].visible': on });
  if (stage.bar) toggle(stage.bar, 'annotations[1].visible', true, (v) => void second(v));
  if (stage.preview) stage.every(1500, (i) => void second(i % 2 === 0));
  return () => stage.dispose();
};

export default mount;
