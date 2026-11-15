// Flow around a wing on a body-fitted carpet: pressure colours, streamlines and pressure contours
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { airfoil } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 560 });
  const flow = airfoil(6);
  const small = stage.preview;

  // The docs fetch a Karman-Trefftz flow from a third-party JSON file. This is the same layout from a
  // generated Joukowski wing: a carpet whose a runs round the wing and b outward, and z grids on it.
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'carpet',
        carpet: 'wing',
        a: flow.a,
        b: flow.b,
        x: flow.x,
        y: flow.y,
        aaxis: { startlinewidth: 2, startline: true, showticklabels: 'none', endline: true, showgrid: false, endlinewidth: 2, smoothing: 0 },
        baxis: { startline: false, endline: false, showticklabels: 'none', smoothing: 0, showgrid: false },
      },
      {
        type: 'contourcarpet',
        carpet: 'wing',
        name: 'Pressure',
        z: flow.cp,
        autocolorscale: false,
        colorscale: 'Viridis',
        zauto: false,
        zmin: -4,
        zmax: 1,
        autocontour: false,
        contours: { start: -4, end: 1, size: 0.1, showlines: false },
        line: { smoothing: 0 },
        colorbar: { title: { text: 'Pressure coefficient, c<sub>p</sub>', side: 'right' }, len: 0.75, y: 0, yanchor: 'bottom' },
        showscale: !small,
      },
      {
        type: 'contourcarpet',
        carpet: 'wing',
        name: 'Streamlines',
        z: flow.psi,
        opacity: 0.35,
        autocontour: true,
        ncontours: 40,
        contours: { coloring: 'none' },
        line: { color: 'white', width: 1 },
        showlegend: !small,
      },
      {
        type: 'scatter',
        name: 'Wing',
        mode: 'lines',
        x: flow.outline.x,
        y: flow.outline.y,
        fill: 'toself',
        fillcolor: 'rgba(255,80,80,0.35)',
        line: { color: 'rgba(255,80,80,0.8)', width: 1 },
        hoverinfo: 'skip',
        showlegend: !small,
      },
    ],
    {
      template: stage.template,
      title: { text: small ? '' : 'Flow over an airfoil' },
      hovermode: 'closest',
      xaxis: { zeroline: false, showgrid: false, scaleanchor: 'y', range: [-3.6, 3.6] },
      yaxis: { zeroline: false, showgrid: false, range: [-1.8, 1.8] },
      showlegend: !small,
    },
    stage.config,
  );

  // The colour range is just a trace attribute: narrowing zmin reveals the suction peak above the wing.
  const range = (lo: number): void => void restyle(stage.div, { zmin: lo }, [1]);
  if (stage.bar) slider(stage.bar, 'zmin of the pressure colours', [-8, -1, 0.5], -4, range);
  else stage.every(120, (i) => range(-4.5 + 3 * Math.sin(i / 9)));

  return () => stage.dispose();
};

export default mount;
