// Mixed rendering: the surface's layers, back to front, follow the order of the marks
import { areaY, defineChart, dot, lineY, mountChart, text } from '@tanstack/charts';
import { canvasChartRenderer } from '@tanstack/charts/canvas';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each renderer change starts a new layer. The readout lists them back to front.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  stage.box.style.height = `${stage.height}px`;

  const definition = defineChart({
    marks: [
      areaY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa', fillOpacity: 0.3, renderer: canvasChartRenderer }),
      lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2 }),
      dot(revenue, { x: 'month', y: 'revenue', r: 6, fill: '#facc15', renderer: canvasChartRenderer }),
      text(revenue, { x: 'month', y: 'revenue', text: 'revenue', dy: -14, fontSize: 11 }),
    ],
    scales: { x: { scale: () => scalePoint<string>().padding(0.4) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      ariaLabel: 'Revenue with alternating renderers',
      onRender: ({ surface }) => {
        const layers = surface.layers ?? [];
        const names = layers.map((l) => `${l.renderer.id} <${l.element.tagName.toLowerCase()}>`);
        if (readout) readout.textContent = `layers (back to front): ${layers.length}\n${names.join('\n')}`;
        else stage.say(`${layers.length} layers: ${names.map((n) => n.split(' ')[0]).join(' / ')}`);
      },
    }),
  );
  return () => stage.dispose();
};

export default mount;
