// Layered marks with different row types: windows, readings and annotations; focus reports the union
import { defineChart, lineY, mountChart, rect, text } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

interface Window {
  start: number;
  end: number;
  minimum: number;
  maximum: number;
}
interface Annotation {
  hour: number;
  level: number;
  label: string;
}

const windows: Window[] = [{ start: 6, end: 10, minimum: 10, maximum: 40 }, { start: 15, end: 18, minimum: 10, maximum: 40 }];
const readings = walk(rng(2), 24, 24, 2.5).map((temperature, hour) => ({ id: `h${hour}`, hour, temperature }));
const annotations: Annotation[] = [{ hour: 8, level: 38, label: 'maintenance' }, { hour: 16.5, level: 38, label: 'maintenance' }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the line: the readout shows which row type the focused point came from.' });
  const readout = stage.preview ? null : stage.readout();

  const definition = defineChart({
    marks: [
      rect(windows, { x1: 'start', x2: 'end', y1: 'minimum', y2: 'maximum', fill: '#f87171', fillOpacity: 0.15 }),
      lineY(readings, { x: 'hour', y: 'temperature', stroke: '#60a5fa', strokeWidth: 2 }),
      text(annotations, { x: 'hour', y: 'level', text: 'label', fill: '#f87171' }),
    ],
    scales: {
      x: { scale: scaleLinear().domain([0, 23]), axis: { label: 'Hour' } },
      y: { scale: scaleLinear().domain([10, 40]), grid: true, axis: { label: 'Temperature' } },
    },
    tooltip,
  });

  stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      ariaLabel: 'Readings with maintenance windows',
      onFocusChange: (point) => {
        if (readout) readout.textContent = point ? `mark ${point.markId}\n${JSON.stringify(point.datum)}` : 'no focus';
      },
    }),
  );
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
