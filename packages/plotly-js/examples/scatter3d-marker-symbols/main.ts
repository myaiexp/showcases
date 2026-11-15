// The eight scatter3d marker symbols, one trace each, with size and opacity controls
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

// scatter3d.marker.symbol takes exactly these values (plotschema.json).
const SYMBOLS = ['circle', 'circle-open', 'square', 'square-open', 'diamond', 'diamond-open', 'cross', 'x'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const data = SYMBOLS.map((symbol, i) => ({
    type: 'scatter3d' as const,
    mode: 'markers' as const,
    name: symbol,
    x: [i % 4, i % 4 + 0.35],
    y: [Math.floor(i / 4) * 1.5, Math.floor(i / 4) * 1.5 + 0.35],
    z: [0.2, 1.2],
    marker: { symbol, size: stage.preview ? 7 : 10, line: { width: 2 } },
  }));

  await Plotly.newPlot(
    stage.div,
    data,
    {
      template: stage.template,
      margin: margin3d(stage),
      showlegend: !stage.preview,
      scene: { aspectmode: 'data', camera: { eye: { x: 1.6, y: -1.8, z: 0.9 } } },
    },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'marker.size', [4, 24, 1], 10, (v) => void restyle(stage.div, { 'marker.size': v }));
    slider(stage.bar, 'opacity', [0.2, 1, 0.1], 1, (v) => void restyle(stage.div, { opacity: v }));
  }
  orbit(stage, { radius: 2.6, height: 1 });
  return () => stage.dispose();
};

export default mount;
