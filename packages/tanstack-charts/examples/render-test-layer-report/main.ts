// A layer-by-layer debug report; the first layer outside its expectation is flagged
import { createChartScene, defineChart, lineY, renderChartSvg } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { days, rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

type Defect = 'none' | 'dates' | 'unit';
const defects: readonly (readonly [Defect, string])[] = [['none', 'no defect'], ['dates', 'every date parsed as the same day'], ['unit', 'values multiplied by 1000']];
const dates = days('2025-03-01', 30);
const values = walk(rng(5), 30, 50, 3);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a defect: the first flagged layer is where to look, and the renderer is not the cause.' });
  stage.box.style.maxWidth = '640px'; // a static svg scales to its box, so cap its height
  if (stage.preview) stage.height -= 70;
  const readout = stage.preview ? null : stage.readout();

  const run = (defect: Defect): void => {
    const rows = dates.map((d, i) => ({ date: defect === 'dates' ? dates[0]! : d, value: defect === 'unit' ? values[i]! * 1000 : values[i]! }));
    const scene = createChartScene(
      defineChart({ marks: [lineY(rows, { x: 'date', y: 'value', stroke: '#60a5fa', strokeWidth: 2 })], scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true } } }),
      { width: 480, height: stage.preview ? stage.height : 200 },
    );
    stage.box.innerHTML = renderChartSvg(scene, { ariaLabel: 'Signal', idPrefix: stage.id('lr') });
    const xs = scene.scales.x!.domain as Date[];
    const ys = scene.scales.y!.domain as number[];
    const spanDays = (xs[xs.length - 1]!.getTime() - xs[0]!.getTime()) / 86_400_000;
    const layers: readonly (readonly [string, string, boolean])[] = [
      ['1 rows', `${rows.length} rows, first value ${rows[0]!.value.toFixed(1)}`, rows.length === 30],
      ['2 channels', `x span ${(rows[rows.length - 1]!.date.getTime() - rows[0]!.date.getTime()) / 86_400_000} days, y max ${Math.max(...rows.map((r) => r.value)).toFixed(0)}`, new Set(rows.map((r) => r.date.getTime())).size === 30],
      ['3 scale domains', `x ${spanDays.toFixed(0)} days, y ${ys[0]} to ${ys[ys.length - 1]}`, spanDays > 20 && ys[ys.length - 1]! < 200],
      ['4 plot bounds', `${scene.chart.width.toFixed(0)} x ${scene.chart.height.toFixed(0)}, left margin ${scene.margin.left.toFixed(0)}`, scene.chart.width > 100],
      ['5 nodes and points', `${scene.nodes.length} nodes, ${scene.points.length} points`, scene.points.length === 30],
    ];
    const first = layers.findIndex((l) => !l[2]);
    const lines = layers.map(([name, info, ok], i) => `${ok ? ' ok ' : 'BAD '} ${name.padEnd(18)} ${info}${i === first ? '   <- first anomaly' : ''}`);
    if (readout) readout.textContent = lines.join('\n');
    else stage.say(first < 0 ? 'every layer matches expectations' : `first anomaly: ${layers[first]![0]}: ${layers[first]![1]}`);
  };
  run('none');
  if (stage.bar) select(stage.bar, 'defect', defects, run);
  else stage.cycle(defects.map((d) => d[0]), 2400, run);
  return () => stage.dispose();
};

export default mount;
