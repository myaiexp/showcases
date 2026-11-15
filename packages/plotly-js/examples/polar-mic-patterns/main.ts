// Five microphone pick-up patterns as scatterpolar lines, from the docs' polar dataset
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { Fx } from '../../shared/fx.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('polar_dataset.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });
  const theta = unpackNum(rows, 'y');
  const patterns: [string, string, string][] = [
    ['x1', 'Figure8', 'peru'],
    ['x2', 'Cardioid', '#a78bfa'],
    ['x3', 'Hypercardioid', 'deepskyblue'],
    ['x4', 'Subcardioid', 'orangered'],
    ['x5', 'Supercardioid', '#34d399'],
  ];

  // The docs' last line sets `orientation: -90` on the layout, which is not an attribute; the angular
  // axis's rotation is the real control, and is what the select below turns.
  await Plotly.newPlot(
    stage.div,
    patterns.map(([col, name, color]) => ({ type: 'scatterpolar' as const, mode: 'lines' as const, r: unpackNum(rows, col), theta, name, line: { color } })),
    { template: stage.template, title: { text: stage.preview ? '' : 'Mic patterns' }, showlegend: !stage.preview },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'angularaxis.rotation', ['90', '0', '180', '270'] as const, '90', (v) => void Plotly.relayout(stage.div, { 'polar.angularaxis.rotation': Number(v) }).catch(() => {}));
  } else {
    stage.every(1000, (i) => {
      void restyle(stage.div, { visible: patterns.map((_, k) => (k === i % 5 || k === 0 ? true : 'legendonly')) }, [0, 1, 2, 3, 4]);
      Fx.hover(stage.div, { curveNumber: 0, pointNumber: (i * 7) % 60 });
    });
  }

  return () => stage.dispose();
};

export default mount;
