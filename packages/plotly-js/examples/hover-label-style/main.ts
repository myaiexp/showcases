// hovertemplate with hoverlabel align, namelength, bgcolor and font
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'bar',
        name: 'Revenue from the northern region',
        x: months,
        y: [12.4, 15.1, 11.8, 18.9, 21.2, 19.5],
        hovertemplate: '%{x}<br>revenue <b>%{y:.1f}k</b><extra>%{fullData.name}</extra>',
        hoverlabel: { bgcolor: '#1e3a8a', bordercolor: '#60a5fa', font: { color: '#ffffff', size: 14 }, align: 'left', namelength: -1 },
      },
      {
        type: 'bar',
        name: 'Revenue from the southern region',
        x: months,
        y: [9.7, 11.3, 14.2, 13.1, 16.8, 17.4],
        hovertemplate: '%{x}<br>revenue <b>%{y:.1f}k</b><extra>%{fullData.name}</extra>',
        hoverlabel: { bgcolor: '#7c2d12', bordercolor: '#fb923c', font: { color: '#ffffff', size: 14 }, align: 'left', namelength: -1 },
      },
    ],
    { template: stage.template, barmode: 'group', hovermode: 'closest', showlegend: false },
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'hoverlabel.align', ['left', 'right', 'auto'] as const, 'left', (v) => void restyle(stage.div, { 'hoverlabel.align': v }));
    slider(stage.bar, 'hoverlabel.namelength', [-1, 40, 1], -1, (v) => void restyle(stage.div, { 'hoverlabel.namelength': v }));
    slider(stage.bar, 'hoverlabel.font.size', [9, 22, 1], 14, (v) => void restyle(stage.div, { 'hoverlabel.font.size': v }));
  }
  if (stage.preview) {
    stage.every(1000, (i) => {
      void restyle(stage.div, { 'hoverlabel.align': ['left', 'right'][i % 2] });
      Fx.hover(stage.div, { curveNumber: i % 2, pointNumber: i % 6 });
    });
  }
  return () => stage.dispose();
};

export default mount;
