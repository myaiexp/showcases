// Annotations matched to named template items by templateitemname
import Plotly from 'plotly.js';
import type { Template, TemplateFigure } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { overDark } from '../../shared/chrome-util.ts';
import { createStage } from '../../shared/stage.ts';

const NAMES = ['fourth', 'first', 'other'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = [0, 1, 2, 3, 4, 5];
  const y = [2, 4, 3, 0, 5, 6];

  const baseData = [{ mode: 'lines', error_y: { visible: true, width: 0 }, line: { color: 'teal' } }];
  const baseLayout = {
    title: { text: stage.preview ? '' : 'Template Title' },
    annotations: [{ text: 'First point', name: 'first', yref: 'y', xref: 'x', ay: 40, ax: 30, font: { size: 16 } }],
    showlegend: false,
  };
  const made = Plotly.makeTemplate({ data: baseData, layout: baseLayout } as unknown as TemplateFigure);
  const template = overDark(stage.template, made as Partial<Template>);

  const layout = (name: string): Partial<Plotly.Layout> => ({
    template,
    annotations: [
      // plotly looks for the template annotation whose `name` equals templateitemname
      { templateitemname: 'first', x: x[0], y: y[0] },
      // no template item called "fourth": this one is switched off
      { templateitemname: name, text: 'Fourth point', x: x[3], y: y[3], showarrow: true, yref: 'y', xref: 'x' },
    ],
  });

  await Plotly.newPlot(stage.div, [{ x, y }], layout('fourth'), stage.config);
  const redraw = (name: string): Promise<unknown> => Plotly.react(stage.div, [{ x, y }], layout(name), stage.config);
  if (stage.bar) select(stage.bar, "second annotation's templateitemname", NAMES, 'fourth', (v) => void redraw(v));
  // 'first' pulls the named item in a second time, at the fourth point.
  if (stage.preview) stage.every(1500, (i) => void redraw(NAMES[i % 2 ? 1 : 0]));
  return () => stage.dispose();
};

export default mount;
