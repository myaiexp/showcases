// marker.line.dash: solid, dotted and dashed marker borders, one style or one per marker
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const STYLES = ['solid', 'dot', 'dash', 'longdash', 'dashdot', 'longdashdot'];
const ONE = [...STYLES, '12px,6px', 'one per marker'] as const;
type One = (typeof ONE)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });
  const draw = (way: One): void => {
    const dash = way === 'one per marker' ? STYLES : way;
    void Plotly.restyle(stage.div, { 'marker.line.dash': [dash], text: [way === 'one per marker' ? STYLES : STYLES.map(() => way)] } as unknown as Plotly.DataUpdate);
  };
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scatter',
        mode: 'markers+text',
        x: [0, 1, 2, 3, 4, 5],
        y: [0, 0, 0, 0, 0, 0],
        text: STYLES,
        textposition: 'bottom center',
        // Markers are white with a blue border, the docs' colours; the dash is the point.
        marker: { size: 38, color: 'white', line: { color: '#60a5fa', width: 3, dash: STYLES as never } },
      },
    ],
    { template: stage.template, xaxis: { range: [-0.7, 5.7] }, yaxis: { range: [-1, 1], showticklabels: false } },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'marker.line.dash', ONE, 'one per marker', draw);
  else stage.every(1400, (i) => draw(ONE[i % ONE.length]!));
  return () => stage.dispose();
};

export default mount;
