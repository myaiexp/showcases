// The lasso's selected points are tallied by trace and drawn as bars beside the cloud
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv, normals } from '../../shared/events-kit.ts';
import { restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const GROUPS = ['north', 'south', 'east'];
const CENTRES = [[0, 2], [-2, -1], [2, -1]] as const;
const COLORS = ['#60a5fa', '#34d399', '#f472b6'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const n = 120;
  const pts = GROUPS.map((_, g) => ({ x: normals(150 + g, n, CENTRES[g]![0], 0.8), y: normals(160 + g, n, CENTRES[g]![1], 0.8) }));

  await Plotly.newPlot(
    stage.div,
    [
      ...GROUPS.map((name, g) => ({ type: 'scatter' as const, mode: 'markers' as const, name, x: pts[g]!.x, y: pts[g]!.y, marker: { color: COLORS[g], size: stage.preview ? 5 : 7 }, unselected: { marker: { opacity: 0.2 } } })),
      { type: 'bar' as const, x: GROUPS, y: [0, 0, 0], xaxis: 'x2', yaxis: 'y2', marker: { color: COLORS }, showlegend: false },
    ],
    {
      template: stage.template,
      dragmode: 'lasso',
      showlegend: false,
      xaxis: { domain: [0, 0.64] },
      xaxis2: { domain: [0.74, 1], anchor: 'y2' },
      yaxis2: { anchor: 'x2', range: [0, n], title: { text: stage.preview ? undefined : 'selected' } },
    } as Partial<Layout>,
    stage.config,
  );

  const tally = (counts: number[]): void => void restyle(stage.div, { y: [counts] }, [3]);
  stage.div.on('plotly_selected', (e) => {
    const counts = [0, 0, 0];
    for (const p of asEv(e)?.points ?? []) if (p.curveNumber < 3) counts[p.curveNumber]! += 1;
    tally(counts);
  });
  stage.div.on('plotly_deselect', () => tally([0, 0, 0]));

  if (stage.preview) {
    stage.every(1000, (i) => {
      const cx = 3 * Math.sin(i * 0.9);
      const cy = 2 * Math.cos(i * 0.7);
      const sel = pts.map((g) => g.x.map((_, k) => k).filter((k) => (g.x[k]! - cx) ** 2 + (g.y[k]! - cy) ** 2 < 2.5));
      void restyle(stage.div, { selectedpoints: sel }, [0, 1, 2]);
      tally(sel.map((s) => s.length));
    });
  }

  return () => stage.dispose();
};

export default mount;
