// Hover previews a detail trace, click pins it: two handlers sharing one piece of state
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv } from '../../shared/events-kit.ts';
import { rng } from '../../shared/stat-data.ts';
import { restyle } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const PRODUCTS = ['Tea', 'Coffee', 'Cocoa', 'Juice', 'Soda', 'Water'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const BASE = '#60a5fa';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(91);
  const series = PRODUCTS.map((_, p) => MONTHS.map((_, m) => Math.round(40 + 25 * Math.sin((m + p * 2) / 2) + rand() * 20)));
  const totals = series.map((s) => s.reduce((a, b) => a + b, 0));
  let pinned: number | null = null;

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'bar', x: PRODUCTS, y: totals, marker: { color: PRODUCTS.map(() => BASE) }, hovertemplate: '%{x}: %{y}<extra></extra>' },
      { type: 'scatter', mode: 'lines+markers', x: MONTHS, y: series[0], xaxis: 'x2', yaxis: 'y2', line: { color: '#f59e0b' }, hoverinfo: 'skip' },
    ],
    {
      template: stage.template,
      showlegend: false,
      hovermode: 'closest',
      xaxis: { domain: [0, 0.42] },
      yaxis: { title: { text: 'total' } },
      xaxis2: { domain: [0.55, 1], anchor: 'y2' },
      yaxis2: { anchor: 'x2', range: [0, 110], title: { text: 'per month' } },
      title: stage.preview ? undefined : { text: 'Hover a bar for monthly sales, click to pin' },
    },
    stage.config,
  );

  const show = (p: number, marks: number | null): void => {
    void restyle(stage.div, { y: [series[p]] }, [1]);
    void restyle(stage.div, { 'marker.color': [PRODUCTS.map((_, i) => (i === marks ? '#f59e0b' : BASE))] }, [0]);
  };
  const hover = (p: number): void => show(p, pinned);
  const click = (p: number): void => {
    pinned = p;
    show(p, p);
  };
  stage.div.on('plotly_hover', (e) => hover(asEv(e).points[0]?.pointNumber ?? 0));
  stage.div.on('plotly_unhover', () => show(pinned ?? 0, pinned));
  stage.div.on('plotly_click', (e) => click(asEv(e).points[0]?.pointNumber ?? 0));

  if (stage.preview) {
    stage.every(900, (i) => {
      Fx.hover(stage.div, { curveNumber: 0, pointNumber: i % 6 });
      if (i % 4 === 0) click(i % 6);
    });
  }

  return () => stage.dispose();
};

export default mount;
