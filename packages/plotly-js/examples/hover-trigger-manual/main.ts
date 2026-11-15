// Plotly.Fx.hover shows hover labels on chosen points; plotly_beforehover returning false disables the mouse
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { normals } from '../../shared/events-kit.ts';
import { rng } from '../../shared/stat-data.ts';
import { button } from '../../shared/controls.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const N = 16;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const x = Array.from({ length: N }, (_, i) => i);
  const rand = rng(71);

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: normals(72, N), type: 'scatter', name: 'Trial 1', mode: 'markers', marker: { size: 16 } },
      { x, y: normals(73, N), type: 'scatter', name: 'Trial 2', mode: 'markers', marker: { size: 16 } },
    ],
    { template: stage.template, hovermode: 'closest', title: stage.preview ? undefined : { text: 'Click "Go" button to trigger hover' } },
    stage.config,
  );

  // Returning false from plotly_beforehover cancels hovers from the mouse; Fx.hover still works.
  stage.div.on('plotly_beforehover', (() => false) as never);

  const go = (): void => {
    const pick = (): { curveNumber: number; pointNumber: number } => ({
      curveNumber: Math.floor(rand() * 2),
      pointNumber: Math.floor(rand() * 14),
    });
    Fx.hover(stage.div, [pick(), pick()]);
  };
  if (stage.bar) button(stage.bar, 'Go', go);
  if (stage.preview) stage.every(900, go);

  return () => stage.dispose();
};

export default mount;
