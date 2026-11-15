// The reason object of keyedSelection: type (select or clear) and source (pointer or keyboard)
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { keyedSelection, whenSelected } from '@tanstack/charts/selection';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { spotsOf, visit } from '../../shared/interact-drive.ts';
import { scatter, type Blob } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(14, 8);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a dot, click empty space, then Tab to the chart and press Enter.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  const log: string[] = [];
  let selectedId: string | null = null;
  show('no proposals yet');

  const build = () => {
    const selection = keyedSelection<Blob, string, number, number>({
      selected: controlledSignal(selectedId, (next, { reason }) => {
        log.unshift(`${reason.type} (${reason.source}): ${String(reason.value)}`);
        show(log.slice(0, stage.preview ? 1 : 6).join('\n'));
        choose(next);
      }),
      key: (datum) => datum.id,
    });
    return defineChart({
      marks: [
        dot(rows, { x: 'x', y: 'y', key: 'id', r: 5, color: 'group' }),
        whenSelected(dot(rows, { id: 'selected', x: 'x', y: 'y', key: 'id', r: 10, fillOpacity: 0, stroke: '#fbbf24', strokeWidth: 3 }), selection),
      ],
      scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
      selection,
      maxFocusDistance: 20,
    });
  };
  const options = () => ({ definition: build(), height: stage.height, initialWidth: 640, ariaLabel: 'Scatter with selection reasons' });
  const host = stage.own(mountChart(stage.box, options()));
  function choose(id: string | null): void {
    selectedId = id;
    host.update(options());
  }

  if (stage.bar) button(stage.bar, 'Clear selection', () => choose(null));
  else stage.after(500, () => visit(stage, [...spotsOf(host.getScene(), [2, 7]), [0.5, 0.02]], 1500, { click: () => true, delay: 0 }));
  return () => stage.dispose();
};

export default mount;
