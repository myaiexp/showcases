// tooltip.portal: the tooltip leaves an overflow-hidden chart box through the top layer
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import { portal } from '@tanstack/charts/tooltip/portal';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the short chart: with the portal the tooltip is not cut off by the box.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const height = stage.preview ? 90 : 120;
  stage.box.style.overflow = 'hidden';

  const build = (usePortal: boolean) =>
    defineChart({
      marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id' })],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, grid: true },
      },
      focus: 'group-x',
      tooltip: {
        use: tooltip,
        ...(usePortal ? { portal } : {}),
        anchor: 'group-center',
        placement: ['right', 'left', 'bottom', 'top'],
      },
    });
  const options = (usePortal: boolean) => ({ definition: build(usePortal), height, initialWidth: 640, ariaLabel: 'Requests by channel' });
  const host = stage.own(mountChart(stage.box, options(false)));

  if (stage.bar) checkbox(stage.bar, 'portal', false, (v) => host.update(options(v)));
  else {
    stage.cycle([false, true], 3000, (v) => {
      host.update(options(v));
      stage.say(v ? 'with portal' : 'without portal');
    });
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
