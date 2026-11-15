// Memoizing at the owner: the pipeline reruns only when its inputs change, not on every update
import { defineChart, groupBy, lineY, mountChart, rollingWindow } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

type Tick = ReturnType<typeof makeSeries>[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Recolor does a chart update without a transform run; new data and window size run it again.' });

  let source: readonly Tick[] = makeSeries(40, 21);
  let size = 7;
  let color = '#60a5fa';
  let runs = 0;
  let updates = 0;
  // A tiny memo: the result is reused while the same source array and size come back.
  let memo: { source: readonly Tick[]; size: number; rows: ReturnType<typeof derive> } | undefined;
  const derive = (rows: readonly Tick[], n: number) => {
    runs++;
    const alphaOnly = groupBy(
      rows.filter((r) => r.series === 'alpha'),
      { by: 'day', outputs: { value: { value: 'value', reduce: 'mean' } } },
    );
    return rollingWindow(alphaOnly, { orderBy: 'day', size: n, anchor: 'end', outputs: { smooth: { value: 'value', reduce: 'mean' } } });
  };
  const smoothed = () => {
    if (!memo || memo.source !== source || memo.size !== size) memo = { source, size, rows: derive(source, size) };
    return memo.rows;
  };

  const options = () => {
    updates++;
    const definition = defineChart({
      marks: [lineY(smoothed(), { x: 'day', y: 'smooth', stroke: color, strokeWidth: 2.5 })],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true } },
    });
    return { definition, height: stage.height, ariaLabel: 'Smoothed series' };
  };
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`chart updates: ${updates}   transform runs: ${runs}`);
  };
  stage.say(`chart updates: ${updates}   transform runs: ${runs}`);

  const colors = ['#60a5fa', '#fb923c', '#4ade80'];
  const steps: (() => void)[] = [
    () => (color = colors[updates % 3]!),
    () => (size = size === 7 ? 15 : 7),
    () => (source = makeSeries(40, 30 + updates)),
  ];
  if (stage.bar) {
    button(stage.bar, 'Recolor', () => { steps[0]!(); refresh(); });
    slider(stage.bar, 'window', 3, 21, 2, size, (n) => { size = n; refresh(); });
    button(stage.bar, 'New data', () => { steps[2]!(); refresh(); });
  } else {
    let k = 0;
    stage.every(1400, () => { steps[k++ % 3]!(); refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
