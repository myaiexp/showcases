// Compact scaleUtc: calendar tick units follow the span of the domain
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const start = Date.parse('2026-01-01T00:00:00Z');
const spans: readonly (readonly [number, string])[] = [
  [2 * 3_600_000, '2 hours'],
  [3 * 86_400_000, '3 days'],
  [60 * 86_400_000, '60 days'],
  [400 * 86_400_000, '13 months'],
  [5 * 365 * 86_400_000, '5 years'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same data shape is stretched over longer spans.' });
  const build = (ms: number) => {
    const rows = Array.from({ length: 40 }, (_, i) => ({ id: `p${i}`, t: new Date(start + (ms * i) / 39), v: 50 + 30 * Math.sin(i / 5) }));
    return defineChart({
      marks: [lineY(rows, { x: 't', y: 'v', stroke: '#38bdf8', strokeWidth: 2 })],
      scales: { x: { scale: scaleUtc, nice: true, grid: true }, y: { scale: scaleLinear, nice: true, grid: true } },
    });
  };
  const options = (ms: number) => ({
    definition: build(ms),
    height: stage.height,
    ariaLabel: 'A curve on a UTC axis',
    onRender: ({ scene }: { scene: { scales: Readonly<Record<string, { ticks: readonly { label: string }[] }>> } }) => {
      const labels = scene.scales.x?.ticks.map((t) => t.label) ?? [];
      stage.say(`${labels.length} x ticks: ${labels.slice(0, 5).join(', ')}${labels.length > 5 ? ', ...' : ''}`);
    },
  });
  const host = stage.own(mountChart(stage.box, options(spans[1]![0])));
  if (stage.bar) slider(stage.bar, 'span', 0, spans.length - 1, 1, 1, (i) => host.update(options(spans[i]![0])), (i) => spans[i]![1]);
  else stage.cycle(spans, 1800, ([ms]) => host.update(options(ms)));
  return () => stage.dispose();
};

export default mount;
