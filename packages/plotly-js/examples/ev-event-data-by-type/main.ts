// The fields of a plotly_hover point change with the trace type: x/y, pointNumbers, z, label
import Plotly from 'plotly.js';
import type { Data, Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv, normals, output, sig } from '../../shared/events-kit.ts';
import { select } from '../../shared/controls.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const KINDS = ['scatter', 'histogram', 'heatmap', 'pie', 'scatter3d'] as const;
type Kind = (typeof KINDS)[number];

function figure(kind: Kind): { data: Data[]; layout: Partial<Layout> } {
  const x = normals(3, 60, 5, 2);
  const y = normals(4, 60, 5, 2);
  switch (kind) {
    case 'histogram':
      return { data: [{ type: 'histogram', x, nbinsx: 10 }], layout: {} };
    case 'heatmap':
      return {
        data: [{ type: 'heatmap', x: ['a', 'b', 'c', 'd'], y: ['p', 'q', 'r'], z: [[1, 3, 2, 4], [5, 2, 6, 1], [3, 7, 2, 5]], colorscale: 'Viridis', showscale: false }],
        layout: {},
      };
    case 'pie':
      return { data: [{ type: 'pie', labels: ['red', 'green', 'blue', 'amber'], values: [4, 3, 5, 2], hole: 0.35 }], layout: { showlegend: false } };
    case 'scatter3d':
      return { data: [{ type: 'scatter3d', mode: 'markers', x: x.slice(0, 30), y: y.slice(0, 30), z: normals(6, 30), marker: { size: 4 } }], layout: {} };
    default:
      return { data: [{ type: 'scatter', mode: 'markers', x: x.slice(0, 20), y: y.slice(0, 20), marker: { size: 12 } }], layout: {} };
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const out = output(stage, el);
  let kind: Kind = 'scatter';

  const draw = async (): Promise<void> => {
    const f = figure(kind);
    await Plotly.newPlot(stage.div, f.data, { template: stage.template, hovermode: 'closest', ...f.layout }, stage.config);
    stage.div.on('plotly_hover', (raw) => {
      const e = asEv(raw);
      const p = e.points[0];
      if (!p) return;
      const fields = Object.entries({ curveNumber: p.curveNumber, pointNumber: p.pointNumber, pointNumbers: p.pointNumbers?.length ? `[${p.pointNumbers.length} indices]` : undefined, x: p.x, y: p.y, z: p.z, label: p.label })
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${k}: ${sig(v)}`);
      out.set(`${kind}: ${fields.join(', ')}`);
    });
  };
  await draw();
  if (stage.bar) select(stage.bar, 'trace type', KINDS, kind, (v) => ((kind = v), void draw()));

  if (stage.preview) {
    // Fx.hover on cartesian kinds; the card swaps the kind every few beats.
    const cards: Kind[] = ['scatter', 'histogram', 'heatmap'];
    stage.every(1100, (i) => {
      const next = cards[Math.floor(i / 3) % cards.length]!;
      const hover = (): void => {
        if (kind === 'heatmap') Fx.hover(stage.div, { xval: ['a', 'b', 'c', 'd'][i % 4], yval: ['p', 'q', 'r'][i % 3] });
        else Fx.hover(stage.div, { curveNumber: 0, pointNumber: (i * 3) % (kind === 'histogram' ? 8 : 20) });
      };
      if (next !== kind && i % 3 === 0) {
        kind = next;
        void draw().then(hover);
      } else hover();
    });
  }

  return () => stage.dispose();
};

export default mount;
