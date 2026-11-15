// marker-only traces per region: marker.color, marker.line, axis showgrid/zeroline/showline
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle } from '../../shared/controls.ts';
import { relayout, restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const size = stage.preview ? 8 : 12;

  const trace1: Data = {
    x: [52698, 43117], y: [53, 31], mode: 'markers', name: 'North America', text: ['United States', 'Canada'],
    marker: { color: 'rgb(164, 194, 244)', size, line: { color: 'white', width: 0.5 } }, type: 'scatter',
  };
  const trace2: Data = {
    x: [39317, 37236, 35650, 30066, 29570, 27159, 23557, 21046, 18007], y: [33, 20, 13, 19, 27, 19, 49, 44, 38],
    mode: 'markers', name: 'Europe',
    text: ['Germany', 'Britain', 'France', 'Spain', 'Italy', 'Czech Rep.', 'Greece', 'Poland'],
    marker: { color: 'rgb(255, 217, 102)', size }, type: 'scatter',
  };
  const trace3: Data = {
    x: [42952, 37037, 33106, 17478, 9813, 5253, 4692, 3899], y: [23, 42, 54, 89, 14, 99, 93, 70],
    mode: 'markers', name: 'Asia/Pacific',
    text: ['Australia', 'Japan', 'South Korea', 'Malaysia', 'China', 'Indonesia', 'Philippines', 'India'],
    marker: { color: 'rgb(234, 153, 153)', size }, type: 'scatter',
  };
  const trace4: Data = {
    x: [19097, 18601, 15595, 13546, 12026, 7434, 5419], y: [43, 47, 56, 80, 86, 93, 80],
    mode: 'markers', name: 'Latin America',
    text: ['Chile', 'Argentina', 'Mexico', 'Venezuela', 'Venezuela', 'El Salvador', 'Bolivia'],
    marker: { color: 'rgb(142, 124, 195)', size }, type: 'scatter',
  };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2, trace3, trace4],
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Quarter 1 Growth' },
      showlegend: !stage.preview,
      xaxis: { title: stage.preview ? undefined : { text: 'GDP per Capita' }, showgrid: false, zeroline: false },
      yaxis: { title: stage.preview ? undefined : { text: 'Percent' }, showline: false },
    },
    stage.config,
  );

  if (stage.bar) {
    toggle(stage.bar, 'x grid + zero line', false, (on) => void relayout(stage.div, { 'xaxis.showgrid': on, 'xaxis.zeroline': on }));
    toggle(stage.bar, 'y axis line', false, (on) => void relayout(stage.div, { 'yaxis.showline': on }));
    toggle(stage.bar, 'white outline on every marker', false, (on) =>
      void restyle(stage.div, { 'marker.line.width': on ? 1.5 : 0, 'marker.line.color': 'white' }, [1, 2, 3]));
  }
  // The card pulses the markers.
  if (stage.preview) stage.every(100, (i) => void restyle(stage.div, { 'marker.size': 8 + 6 * Math.abs(Math.sin(i / 8)) }));

  return () => stage.dispose();
};

export default mount;
