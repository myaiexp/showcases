// continuousCursor styling presets: default, a dashed vertical rule only, and a bold boxed cursor
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { continuousCursor, type ContinuousCursorChange, type ContinuousCursorPosition } from '@tanstack/charts/interaction/cursor';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { trail, visit } from '../../shared/interact-drive.ts';
import { signal } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

type Position = ContinuousCursorPosition<number, number>;
type Change = ContinuousCursorChange<number, number>;
type Preset = 'default' | 'dashed' | 'bold';
const presets: readonly Preset[] = ['default', 'dashed', 'bold'];
const rows = signal(40, 9);
const noop = controlledSignal<Position | null, Change>(null, () => {});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a preset, then move over the plot.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const cursorFor = (preset: Preset) => {
    if (preset === 'dashed') return continuousCursor({ position: noop, yRule: false, marker: false, xRule: { stroke: '#f87171', strokeDasharray: '4 4', strokeWidth: 1.5, strokeOpacity: 0.9 }, xLabel: { background: '#334155', color: '#f8fafc', format: (v) => v.toFixed(0), side: 'end' } });
    if (preset === 'bold') {
      return continuousCursor({
        position: noop,
        xRule: { stroke: '#fbbf24', strokeWidth: 2, strokeOpacity: 0.8 },
        yRule: { stroke: '#fbbf24', strokeWidth: 2, strokeOpacity: 0.8, lineCap: 'round' },
        marker: { radius: 7, fill: '#fbbf24', stroke: '#0b0b0f', strokeWidth: 2 },
        xLabel: { format: (v) => `t ${v.toFixed(1)}`, background: '#fbbf24', color: '#0b0b0f', radius: 4, fontWeight: 700, offset: 10 },
        yLabel: { format: (v) => v.toFixed(1), background: '#fbbf24', color: '#0b0b0f', radius: 4, fontWeight: 700 },
      });
    }
    return continuousCursor({ position: noop });
  };
  const options = (preset: Preset) => ({
    definition: defineChart({
      marks: [lineY(rows, { x: 't', y: 'value', key: 'id' })],
      scales: { x: { scale: scaleLinear().domain([0, 39]) }, y: { scale: scaleLinear().domain([20, 80]), grid: true } },
      controls: [cursorFor(preset)],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'A signal with a styled cursor',
  });
  const host = stage.own(mountChart(stage.box, options('default')));

  if (stage.bar) select(stage.bar, 'preset', presets.map((p) => [p, p] as const), (p) => host.update(options(p)));
  else {
    stage.cycle(presets, 2600, (p) => {
      host.update(options(p));
      stage.say(`preset: ${p}`);
    });
    visit(stage, trail((t) => [0.15 + 0.7 * Math.abs(Math.sin(t * 3)), 0.25 + 0.5 * Math.abs(Math.cos(t * 4))], 48), 130, { target: () => stage.box.querySelector('[data-chart-cursor]') });
  }
  return () => stage.dispose();
};

export default mount;
