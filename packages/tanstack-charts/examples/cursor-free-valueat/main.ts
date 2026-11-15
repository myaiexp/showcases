// cursor.x.valueAt: round x to an integer, leave y coordinate-only
import { crosshair, defineChart, lineY, mountChart } from '@tanstack/charts';
import { createChartCursor, cursorHost } from '@tanstack/charts/cursor';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { signal } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const rows = signal(24);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move slowly: the x readout only takes whole numbers; y has no value.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  show('cursor: none');

  const freeCursor = createChartCursor<number, number>();
  stage.onDispose(
    freeCursor.subscribe(() => {
      const v = freeCursor.getState()?.value;
      show(v ? `x = ${v.x ?? 'none'}, y = ${v.y ?? 'none (coordinate only)'}` : 'cursor: none');
    }),
  );

  const definition = defineChart({
    marks: [lineY(rows, { x: 't', y: 'value', key: 'id' }), crosshair({ x: { label: true }, y: false })],
    scales: {
      x: { scale: scaleLinear().domain([0, 23]), axis: { label: 't' } },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    cursor: {
      use: cursorHost,
      controller: freeCursor,
      mode: 'free',
      x: {
        valueAt: ({ scene, position }) => {
          const v = scene.scales.x?.invert?.(position);
          return typeof v === 'number' ? Math.round(v) : undefined;
        },
      },
      y: { valueAt: () => undefined },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'A signal with a snapped free cursor' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
