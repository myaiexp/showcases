// Frames that only carry y values: the bar chart's other attributes stay put
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/stat-data.ts';
import { createStage } from '../../shared/stage.ts';

const NAMES = ['North', 'South', 'East', 'West', 'Centre', 'Coast'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const rand = rng(201);
  let vals = NAMES.map(() => 40 + rand() * 40);
  const frames = Array.from({ length: 8 }, (_, q) => {
    vals = vals.map((v) => Math.max(5, Math.min(95, v + (rand() - 0.5) * 40)));
    return { name: `Q${q + 1}`, data: [{ y: [...vals], marker: { color: vals.map((v) => `hsl(${200 + v}, 70%, 55%)`) } }] };
  });
  const play = { mode: 'immediate', fromcurrent: true, transition: { duration: 500, easing: 'cubic-in-out' }, frame: { duration: 800, redraw: true } };
  const steps = frames.map((f) => ({ method: 'animate', label: f.name, args: [[f.name], { mode: 'immediate', transition: { duration: 500 }, frame: { duration: 500, redraw: true } }] }));

  await Plotly.newPlot(stage.div, {
    data: [{ type: 'bar', x: NAMES, y: frames[0]!.data[0]!.y, marker: { color: frames[0]!.data[0]!.marker.color } }],
    layout: {
      template: stage.template,
      yaxis: { range: [0, 100] },
      margin: stage.preview ? undefined : { b: 130 },
      updatemenus: stage.preview ? [] : [{ type: 'buttons', showactive: false, direction: 'left', x: 0, y: 0, xanchor: 'left', yanchor: 'top', pad: { t: 87, r: 10 }, buttons: [{ label: 'Play', method: 'animate', args: [null, play] }, { label: 'Pause', method: 'animate', args: [[null], { mode: 'immediate', transition: { duration: 0 }, frame: { duration: 0, redraw: false } }] }] }],
      sliders: stage.preview ? [] : [{ pad: { l: 130, t: 55 }, currentvalue: { prefix: 'Quarter: ' }, steps }],
    } as unknown as Partial<Layout>,
    frames,
    config: stage.config,
  } as never);

  if (stage.preview) stage.every(900, (i) => void Plotly.animate(stage.div, [frames[i % 8]!.name], { mode: 'immediate', transition: { duration: 700, easing: 'cubic-in-out' }, frame: { duration: 700 } }).catch(() => {}));

  return () => stage.dispose();
};

export default mount;
