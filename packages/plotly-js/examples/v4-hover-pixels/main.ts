// xPixel/yPixel on hover events place a custom tooltip; hoveranywhere gives xvals labels
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// v4 payload fields that the bundled event types do not list yet.
type V4Hover = { xPixel?: number; yPixel?: number; xvals?: unknown[]; points: { x?: unknown; y?: unknown; xPixel?: number; yPixel?: number }[] };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  stage.div.style.position = 'relative';
  const tip = document.createElement('div');
  tip.className = 'tip';
  tip.hidden = true;
  stage.div.append(tip);
  const log = stage.preview ? null : readout(el);

  await Plotly.newPlot(
    stage.div,
    [{ type: 'bar', x: DAYS, y: [12, 19, 7, 15, 22, 9, 5], hoverinfo: 'none', marker: { color: '#a78bfa' } }],
    // hoveranywhere: events fire over empty space too, with xvals in data form (a day name).
    { template: stage.template, hoveranywhere: true, hovermode: 'x' } as Partial<Plotly.Layout>,
    stage.config,
  );

  stage.div.on('plotly_hover', (raw) => {
    const e = raw as unknown as V4Hover;
    const p = e.points[0];
    // The cursor's pixels when a reader hovers; a synthetic hover has only the point's.
    const left = e.xPixel ?? p?.xPixel ?? 0;
    const top = e.yPixel ?? p?.yPixel ?? 0;
    tip.hidden = false;
    tip.style.left = `${left + 12}px`;
    tip.style.top = `${top - 12}px`;
    tip.textContent = p ? `${String(p.x)}: ${String(p.y)}` : `empty space over ${String(e.xvals?.[0])}`;
    if (log) log.textContent = `xPixel ${e.xPixel}, yPixel ${e.yPixel}, xvals ${JSON.stringify(e.xvals)}, points ${e.points.length}`;
  });
  stage.div.on('plotly_unhover', () => (tip.hidden = true));

  if (stage.preview) stage.every(900, (i) => Fx.hover(stage.div, { curveNumber: 0, pointNumber: i % DAYS.length }));

  return () => stage.dispose();
};

export default mount;
