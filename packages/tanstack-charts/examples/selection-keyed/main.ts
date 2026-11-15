// keyedSelection + whenSelected: one controlled key, an overlay dot for the selected row
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { keyedSelection, whenSelected } from '@tanstack/charts/selection';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { visit, spotsOf } from '../../shared/interact-drive.ts';
import { scatter, type Blob } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(16, 31);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a dot: it gets a ring that stays after the pointer leaves.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let selectedId: string | null = null;

  const build = () => {
    const selection = keyedSelection<Blob, string, number, number>({
      selected: controlledSignal(selectedId, (next) => choose(next)),
      key: (datum) => datum.id,
    });
    return defineChart({
      marks: [
        dot(rows, { id: 'blobs', x: 'x', y: 'y', key: 'id', r: 5, color: 'group' }),
        whenSelected(dot(rows, { id: 'selected', x: 'x', y: 'y', key: 'id', r: 10, fillOpacity: 0, stroke: '#fbbf24', strokeWidth: 3 }), selection),
      ],
      scales: {
        x: { scale: scaleLinear, nice: true },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      selection,
      tooltip,
    });
  };
  const options = () => ({ definition: build(), height: stage.height, initialWidth: 640, ariaLabel: 'Scatter with a selectable point' });
  const host = stage.own(mountChart(stage.box, options()));
  function choose(id: string | null): void {
    selectedId = id;
    host.update(options());
    stage.say(id ? `selected: ${id}` : 'nothing selected');
  }
  stage.say('nothing selected');
  if (stage.preview) stage.after(500, () => visit(stage, spotsOf(host.getScene(), [1, 4, 9]), 1500, { click: () => true, delay: 0 }));
  return () => stage.dispose();
};

export default mount;
