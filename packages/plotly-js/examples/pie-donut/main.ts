// two pie traces in layout.grid columns, hole sizes and centre annotations
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const labels = ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World'];

  const data: Data[] = [
    { values: [16, 15, 12, 6, 5, 4, 42], labels, domain: { column: 0 }, name: 'GHG Emissions', hoverinfo: 'label+percent+name', hole: 0.4, type: 'pie' },
    { values: [27, 11, 25, 8, 1, 3, 25], labels, text: Array<string>(7).fill('CO2'), textposition: 'inside', domain: { column: 1 }, name: 'CO2 Emissions', hoverinfo: 'label+percent+name', hole: 0.4, type: 'pie' },
  ];

  await Plotly.newPlot(
    stage.div,
    data,
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Global Emissions 1990-2011' },
      annotations: [
        { font: { size: stage.preview ? 11 : 20 }, showarrow: false, text: 'GHG', x: 0.225, y: 0.5 },
        { font: { size: stage.preview ? 11 : 20 }, showarrow: false, text: 'CO2', x: 0.775, y: 0.5 },
      ],
      showlegend: false,
      grid: { rows: 1, columns: 2 },
    },
    stage.config,
  );

  if (stage.bar) slider(stage.bar, 'hole', [0, 0.9, 0.05], 0.4, (h) => void restyle(stage.div, { hole: h }));
  if (stage.preview) stage.every(120, (i) => void restyle(stage.div, { hole: 0.45 + 0.4 * Math.sin(i / 8) }));

  return () => stage.dispose();
};

export default mount;
