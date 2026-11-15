// whenSelected(barY(...)): the selected bar is repainted amber on top of the rest
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { keyedSelection, whenSelected } from '@tanstack/charts/selection';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { visit } from '../../shared/interact-drive.ts';
import { products, type Product } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a bar to select it, click empty space to clear.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let selectedId: string | null = null;

  const build = () => {
    const selection = keyedSelection<Product, string, string, number>({
      selected: controlledSignal(selectedId, (next) => choose(next)),
      key: (datum) => datum.id,
    });
    return defineChart({
      marks: [
        barY(products, { id: 'bars', x: 'product', y: 'revenue', key: 'id', fill: '#64748b' }),
        whenSelected(barY(products, { id: 'selected-bar', x: 'product', y: 'revenue', key: 'id', fill: '#fbbf24' }), selection),
      ],
      scales: { x: { scale: () => scaleBand<string>().padding(0.25) }, y: { scale: scaleLinear, nice: true, grid: true } },
      selection,
      tooltip,
    });
  };
  const options = () => ({ definition: build(), height: stage.height, initialWidth: 640, ariaLabel: 'Revenue by product with a selected bar' });
  const host = stage.own(mountChart(stage.box, options()));
  function choose(id: string | null): void {
    selectedId = id;
    host.update(options());
    stage.say(id ? `selected: ${id}` : 'nothing selected');
  }
  stage.say('nothing selected');
  if (stage.preview) {
    const col = (i: number) => [0.1 + (0.85 * (i + 0.5)) / 6, 0.8] as const;
    visit(stage, [col(1), col(3), [0.5, 0.03], col(4)], 1400, { click: () => true });
  }
  return () => stage.dispose();
};

export default mount;
