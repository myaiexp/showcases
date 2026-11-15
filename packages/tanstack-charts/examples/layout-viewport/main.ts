// A continuous viewport: one long line, a semantic window over it and a pixel translate for dragging
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { days, rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const dates = days('2026-01-01', 180);
const values = walk(rng(91), 180, 100, 3);
const rows = dates.map((date, i) => ({ id: `d${i}`, date, value: values[i]! }));
const DAY = 86_400_000;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The window picks which 30 days the axis shows; translate slides the content by pixels.' });
  let startDay = 0;
  let translate = 0;

  const build = () =>
    defineChart({
      marks: [areaY(rows, { x: 'date', y: 'value', fillOpacity: 0.15 }), lineY(rows, { x: 'date', y: 'value', stroke: '#60a5fa' })],
      scales: {
        x: {
          scale: scaleUtc().domain([dates[0]!, dates[179]!]),
          viewport: { domain: [new Date(dates[0]!.getTime() + startDay * DAY), new Date(dates[0]!.getTime() + (startDay + 30) * DAY)], translate },
        },
        y: { scale: scaleLinear().domain([60, 160]), grid: true },
      },
      clip: true,
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Six months of values, thirty days visible' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());
  if (stage.bar) {
    slider(stage.bar, 'window start', 0, 150, 1, startDay, (v) => { startDay = v; refresh(); }, (v) => `day ${v}`);
    slider(stage.bar, 'translate', -150, 150, 5, translate, (v) => { translate = v; refresh(); }, (v) => `${v}px`);
  } else {
    let t = 0;
    stage.every(120, () => {
      t += 1;
      startDay = Math.round(75 + 70 * Math.sin(t / 25));
      refresh();
    });
  }
  return () => stage.dispose();
};

export default mount;
