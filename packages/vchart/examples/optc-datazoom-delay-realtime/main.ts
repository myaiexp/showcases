// dataZoom realTime and delayType/delayTime: how many change events a drag causes
import type { Mount } from '@/types.ts';
import { createChart, controlBar, every, readout, select } from '../../shared/chart.ts';
import { walk, windowComponent } from '../../shared/components-data.ts';

const build = (realTime: boolean, delay: string) => ({
  type: 'area' as const,
  data: [{ id: 'd', values: walk(80, 9) }],
  xField: 'x',
  yField: 'y',
  axes: [{ orient: 'bottom' as const, label: { autoHide: true } }, { orient: 'left' as const }],
  dataZoom: [{ orient: 'bottom' as const, start: 0, end: 0.3, realTime, ...(delay === 'none' ? {} : { delayType: delay as 'throttle', delayTime: 200 }) }],
});

const mount: Mount = (el, ctx) => {
  let realTime = true;
  let delay = 'none';
  let count = 0;
  const log = ctx.preview ? null : readout(el);
  const chart = createChart(el, ctx, build(realTime, delay));
  const { vchart, release } = chart;
  let alive = true;
  const report = (): void => {
    if (log) log.textContent = `dataZoomChange events so far: ${count}  (realTime ${realTime}, delayType ${delay})`;
  };
  vchart.on('dataZoomChange', () => {
    count += 1;
    report();
  });
  let t = 0;
  // Scripted sweep: setStartAndEnd fires one change per call, 25 ms apart.
  const stop = every(25, () => {
    t += 1;
    const start = ((1 - Math.cos(t / 20)) / 2) * 0.7;
    windowComponent(vchart, 'dataZoom')?.setStartAndEnd(start, start + 0.3);
  });
  report();
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    const rebuild = (): void => {
      count = 0;
      if (alive) void vchart.updateSpec(build(realTime, delay));
    };
    select(bar, 'realTime', ['true', 'false'], (v) => ((realTime = v === 'true'), rebuild()));
    select(bar, 'delayType', ['none', 'throttle', 'debounce'], (v) => ((delay = v), rebuild()));
  }
  return () => {
    stop();
    alive = false;
    release();
  };
};

export default mount;
