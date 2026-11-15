// composeChartLayers: a second SVG surface for selected marks, ordered with the default one
import { defineChart, lineY, mountChart, areaY } from '@tanstack/charts';
import type { ChartLayerRenderer } from '@tanstack/charts';
import { composeChartLayers } from '@tanstack/charts/layers';
import { createSvgChartRenderer } from '@tanstack/charts/svg/renderer';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

// One stable token: adjacent marks with the same token share a surface.
const svgLayer: ChartLayerRenderer = {
  ...createSvgChartRenderer(),
  id: 'showcase-svg-layer',
  kind: 'chart-layer-renderer',
  compose: composeChartLayers,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The area sits on its own SVG layer under the line. The readout lists the surfaces.' });
  const readout = stage.preview ? null : stage.readout();
  stage.box.style.height = `${stage.height}px`;

  const definition = defineChart({
    marks: [
      areaY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa', fillOpacity: 0.3, renderer: svgLayer }),
      lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2, points: true }),
    ],
    scales: { x: { scale: () => scalePoint<string>().padding(0.1) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      ariaLabel: 'Revenue with a layered area',
      onRender: ({ surface }) => {
        const layers = surface.layers ?? [];
        const lines = layers.map((l, i) => `layer ${i + 1}: <${l.element.tagName.toLowerCase()}> with ${l.element.querySelectorAll('[data-ts-key]').length} keyed nodes`);
        if (readout) readout.textContent = `root: <${surface.element.tagName.toLowerCase()}>, ${layers.length} layers back to front\n${lines.join('\n')}`;
      },
    }),
  );
  return () => stage.dispose();
};

export default mount;
