// layout.template: the same data drawn through three hand-written templates
import Plotly from 'plotly.js';
import type { Template } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pick } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const NAMES = ['house', 'ember', 'mint'] as const;
type Name = (typeof NAMES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const templates: Record<Name, Template> = {
    house: stage.template,
    ember: {
      data: { scatter: [{ mode: 'lines+markers', line: { width: 3 }, marker: { size: 9, symbol: 'diamond' } }] },
      layout: {
        ...stage.template.layout,
        colorway: ['#f97316', '#facc15', '#ef4444', '#fb7185'],
        font: { family: 'Georgia, serif', size: stage.preview ? 10 : 13, color: '#fde68a' },
        xaxis: { gridcolor: 'rgba(249,115,22,0.25)', zeroline: false },
        yaxis: { gridcolor: 'rgba(249,115,22,0.25)', zeroline: false },
      },
    } as Template,
    mint: {
      data: { scatter: [{ mode: 'lines', line: { width: 1.5, shape: 'spline' }, fill: 'tozeroy' }] },
      layout: {
        ...stage.template.layout,
        colorway: ['#34d399', '#22d3ee', '#a3e635', '#60a5fa'],
        font: { family: 'monospace', size: stage.preview ? 10 : 12, color: '#a7f3d0' },
        xaxis: { showgrid: false, zeroline: false, linecolor: '#34d399' },
        yaxis: { gridcolor: 'rgba(52,211,153,0.18)', zeroline: false },
      },
    } as Template,
  };
  const x = [1, 2, 3, 4, 5, 6, 7];
  const data = [
    { x, y: [2, 4, 3, 6, 5, 8, 7], name: 'alpha' },
    { x, y: [1, 2, 4, 3, 5, 4, 6], name: 'beta' },
  ];
  const draw = (name: Name): Promise<unknown> =>
    Plotly.react(stage.div, data, { template: templates[name], title: { text: stage.preview ? '' : `template: ${name}` }, showlegend: !stage.preview }, stage.config);

  await draw('ember');
  if (stage.bar) select(stage.bar, 'layout.template', NAMES, 'ember', (v) => void draw(v));
  if (stage.preview) stage.every(1500, (i) => void draw(pick(NAMES, i + 1)));
  return () => stage.dispose();
};

export default mount;
