// plotly_click adds an annotation for the point; plotly_clickannotation removes it
import Plotly from 'plotly.js';
import type { Annotation } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';
import { gauss, rng } from '../../shared/stat-data.ts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const COLORS = ['rgba(200, 50, 100, .9)', 'rgba(150, 90, 220, .9)', 'rgba(10, 180, 180, .9)'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const normal = gauss(rng(5));
  const around = (mean: number): number[] => MONTHS.map(() => mean + normal());
  const x = around(3);
  const series = [
    { name: '2014', y: around(4) },
    { name: '2015', y: around(4) },
    { name: '2016', y: around(4) },
  ];
  const notes: Partial<Annotation>[] = [];

  await Plotly.newPlot(
    stage.div,
    series.map((s, i) => ({ x, y: s.y, type: 'scatter' as const, mode: 'markers' as const, name: s.name, text: MONTHS, marker: { color: COLORS[i], size: stage.preview ? 10 : 16 } })),
    {
      template: stage.template,
      hovermode: 'closest',
      title: { text: stage.preview ? '' : '<b>Formatting Annotations</b> <br> click on a point to plot an annotation' },
      xaxis: { zeroline: false, title: { text: stage.preview ? '' : 'Value A' } },
      yaxis: { zeroline: false, title: { text: stage.preview ? '' : 'Value B' } },
      showlegend: !stage.preview,
    },
    stage.config,
  );

  // The note for one point; clicking it a second time takes it away.
  const toggleNote = (curve: number, index: number): void => {
    const s = series[curve];
    if (!s) return;
    const text =
      '<i>Series Identification</i><br>' + `<b>Year</b>       ${s.name}<br>` +
      '<i>Point Identification</i><br>' + `<b>Month</b>      ${MONTHS[index]}<br>` +
      '<i>Point Values</i><br>' + `<b>A</b>     ${(x[index] as number).toPrecision(4)}<br><b>B</b>     ${(s.y[index] as number).toPrecision(4)}`;
    const at = notes.findIndex((n) => n.text === text);
    if (at >= 0) notes.splice(at, 1);
    else {
      notes.push({
        x: x[index], y: s.y[index], arrowhead: 6, ax: 0, ay: -80,
        bgcolor: 'rgba(255, 255, 255, 0.92)', arrowcolor: COLORS[curve], font: { size: stage.preview ? 8 : 12, color: '#111827' },
        bordercolor: COLORS[curve], borderwidth: 3, borderpad: 4, text,
      });
    }
    void relayout(stage.div, { annotations: [...notes] });
  };
  stage.div.on('plotly_click', (e) => {
    const p = e.points[0];
    if (p) toggleNote(p.curveNumber, p.pointNumber);
  });
  stage.div.on('plotly_clickannotation', (e: unknown) => {
    notes.splice((e as { index: number }).index, 1);
    void relayout(stage.div, { annotations: [...notes] });
  });
  // Cards have no pointer: they click a point every beat, keeping the last two notes.
  if (stage.preview) {
    stage.every(1300, (i) => {
      if (notes.length >= 2) notes.shift();
      toggleNote(i % 3, (i * 5) % 12);
    });
  }
  return () => stage.dispose();
};

export default mount;
