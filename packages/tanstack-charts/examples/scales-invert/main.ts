// Pixel to value: the resolved scene scale has an invert function for custom gestures
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { regionalSeries } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = regionalSeries(2, 30).filter((r) => r.region === 'North');
const fmt = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move over the chart: the pointer position is turned back into a date and a value.' });

  const definition = defineChart({
    focus: false,
    marks: [lineY(rows, { x: 'date', y: 'value', stroke: '#60a5fa' })],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
  });
  const host = stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Weekly values' }));

  const update = (event: PointerEvent): void => {
    const scene = host.getScene();
    const svg = stage.box.querySelector('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    const invertX = scene.scales.x?.invert;
    const invertY = scene.scales.y?.invert;
    if (!invertX || !invertY) return;
    stage.say(`pixel (${Math.round(px)}, ${Math.round(py)}) is ${fmt.format(invertX(px) as Date)}, value ${(invertY(py) as number).toFixed(1)}`);
  };
  stage.box.addEventListener('pointermove', update);
  stage.onDispose(() => stage.box.removeEventListener('pointermove', update));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
