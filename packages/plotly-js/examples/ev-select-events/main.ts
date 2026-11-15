// Box-select events: live count while dragging, a summary on release, a reset on deselect
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv, normals, output, sig } from '../../shared/events-kit.ts';
import type { EvPoint } from '../../shared/events-kit.ts';
import { restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const N = 300;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const out = output(stage, el);
  const x = normals(11, N);
  const y = normals(12, N);

  await Plotly.newPlot(
    stage.div,
    [{ x, y, type: 'scatter', mode: 'markers', marker: { size: 8, color: '#60a5fa' }, selected: { marker: { color: '#f59e0b', size: 10 } }, unselected: { marker: { opacity: 0.25 } } }],
    { template: stage.template, dragmode: 'select', hovermode: false, title: stage.preview ? undefined : { text: 'Drag a box: plotly_selecting while dragging, plotly_selected on release' } },
    stage.config,
  );

  const summary = (label: string, pts: Pick<EvPoint, 'x' | 'y'>[]): void => {
    if (!pts.length) return out.set(`${label}: nothing selected`);
    const mean = (k: 'x' | 'y'): number => pts.reduce((s, p) => s + Number(p[k]), 0) / pts.length;
    out.set(`${label}: ${pts.length} points, mean x ${sig(mean('x'))}, mean y ${sig(mean('y'))}`);
  };
  // The payloads carry the selected points, or nothing at all after a click on empty space.
  stage.div.on('plotly_selecting', (e) => out.set(`plotly_selecting: ${asEv(e).points.length} points under the box so far`));
  stage.div.on('plotly_selected', (e) => summary('plotly_selected', asEv(e)?.points ?? []));
  stage.div.on('plotly_deselect', () => out.set('plotly_deselect: selection cleared'));

  if (stage.preview) {
    // No pointer: slide a box over the cloud and hand the handler the points inside it,
    // the same list a drag would produce.
    stage.every(900, (i) => {
      const cx = Math.sin(i * 0.7) * 1.2;
      const cy = Math.cos(i * 0.5) * 1.0;
      const hit = x.map((_, k) => k).filter((k) => Math.abs(x[k]! - cx) < 0.9 && Math.abs(y[k]! - cy) < 0.7);
      void restyle(stage.div, { selectedpoints: [hit] }, [0]);
      void Plotly.relayout(stage.div, { shapes: [{ type: 'rect', x0: cx - 0.9, x1: cx + 0.9, y0: cy - 0.7, y1: cy + 0.7, line: { color: '#f59e0b', dash: 'dot' } }] }).catch(() => {});
      summary('plotly_selected', hit.map((k) => ({ x: x[k]!, y: y[k]! })));
    });
  }

  return () => stage.dispose();
};

export default mount;
