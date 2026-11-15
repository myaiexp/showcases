// Linked views: a scatter and a bar chart share one selected product key
import { barY, defineChart, dot, mountChart } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { keyedSelection, whenSelected } from '@tanstack/charts/selection';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { products, type Product } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a dot or a bar: both charts mark the same product.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let selectedId: string | null = null;

  const signalFor = () => controlledSignal(selectedId, (next) => choose(next));
  const scatterOptions = () => {
    const selection = keyedSelection<Product, string, number, number>({ selected: signalFor(), key: (d) => d.id });
    return {
      definition: defineChart({
        marks: [
          dot(products, { x: 'units', y: 'revenue', key: 'id', r: 6 }),
          whenSelected(dot(products, { id: 'sel', x: 'units', y: 'revenue', key: 'id', r: 11, fillOpacity: 0, stroke: '#fbbf24', strokeWidth: 3 }), selection),
        ],
        scales: { x: { scale: scaleLinear, nice: true, axis: { label: 'Units' } }, y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue ($k)' } } },
        selection,
        tooltip,
      }),
      height: stage.height,
      initialWidth: 420,
      ariaLabel: 'Units against revenue',
    };
  };
  const barOptions = () => {
    const selection = keyedSelection<Product, string, string, number>({ selected: signalFor(), key: (d) => d.id });
    return {
      definition: defineChart({
        marks: [
          barY(products, { x: 'product', y: 'revenue', key: 'id', fill: '#64748b' }),
          whenSelected(barY(products, { id: 'sel', x: 'product', y: 'revenue', key: 'id', fill: '#fbbf24' }), selection),
        ],
        scales: { x: { scale: () => scaleBand<string>().padding(0.25) }, y: { scale: scaleLinear, nice: true, grid: true } },
        selection,
        tooltip,
      }),
      height: stage.height,
      initialWidth: 420,
      ariaLabel: 'Revenue by product',
    };
  };
  const dots = stage.own(mountChart(stage.box, scatterOptions()));
  const bars = stage.own(mountChart(stage.addBox(), barOptions()));
  function choose(id: string | null): void {
    selectedId = id;
    dots.update(scatterOptions());
    bars.update(barOptions());
    stage.say(id ? `selected: ${id}` : 'nothing selected');
  }
  stage.say('nothing selected');
  if (stage.preview) stage.cycle(products, 1300, (p) => choose(p.id));
  return () => stage.dispose();
};

export default mount;
