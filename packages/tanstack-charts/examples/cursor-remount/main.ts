// destroy a host and mount another on the same controller: a pinned focus cursor is restored
import { crosshair, defineChart, lineY, mountChart } from '@tanstack/charts';
import { createChartCursor, cursorHost } from '@tanstack/charts/cursor';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { weeks } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a point to pin it, then press Remount: the pin comes back.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const controller = createChartCursor<string, number>({ anchor: 'value', value: { x: 'Jun 1' }, source: 'programmatic', pinned: true });
  const definition = defineChart({
    marks: [lineY(weeks, { x: 'week', y: 'value', key: 'id', points: true }), crosshair({ x: { label: true }, y: false })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, grid: true } },
    focus: 'nearest-x',
    tooltip,
    cursor: { use: cursorHost, controller, mode: 'focus', match: 'x', pin: true },
  });
  const options = { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Weekly active users with a pinned cursor' };

  let host = mountChart(stage.box, options);
  stage.onDispose(() => host.destroy());
  let remounts = 0;
  const remount = (): void => {
    host.destroy();
    host = mountChart(stage.box, options);
    stage.say(`remounted ${++remounts} time${remounts === 1 ? '' : 's'}; pinned: ${controller.getState()?.pinned ?? false}`);
  };

  if (stage.bar) button(stage.bar, 'Remount', remount);
  else stage.every(2500, remount);
  return () => stage.dispose();
};

export default mount;
