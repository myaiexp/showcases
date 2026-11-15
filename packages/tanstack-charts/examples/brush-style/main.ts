// brushX selectionStyle, handleStyle and handleSize presets
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { brushX, type BrushRange, type BrushXChange } from '@tanstack/charts/interaction/brush';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { weekPoints } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

type Preset = 'default' | 'warm' | 'minimal';
const presets: readonly Preset[] = ['default', 'warm', 'minimal'];
const weeks = weekPoints.map((p) => p.n);
const range: BrushRange<number> = { start: 2, end: 6 };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a preset and drag the band or its edges.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const styleFor = (preset: Preset) => {
    if (preset === 'warm') return { selectionStyle: { fill: '#fb923c', fillOpacity: 0.22, stroke: '#fb923c', strokeWidth: 2 }, handleStyle: { fill: '#fb923c', fillOpacity: 1 }, handleSize: stage.preview ? 14 : 32 };
    if (preset === 'minimal') return { selectionStyle: { fill: 'none', stroke: 'currentColor', strokeWidth: 1, strokeOpacity: 0.7 }, handleStyle: { fill: 'currentColor', fillOpacity: 0.5 }, handleSize: 12 };
    return {};
  };
  const options = (preset: Preset) => ({
    definition: defineChart({
      marks: [lineY(weekPoints, { x: 'n', y: 'value', key: 'id', points: true })],
      scales: { x: { scale: scaleLinear().domain([1, 8]) }, y: { scale: scaleLinear, nice: true, grid: true } },
      controls: [
        brushX({
          range: controlledSignal<BrushRange<number>, BrushXChange<number>>(range, () => {}),
          values: weeks,
          ...styleFor(preset),
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Weekly users with a styled brush',
  });
  const host = stage.own(mountChart(stage.box, options('default')));

  if (stage.bar) select(stage.bar, 'preset', presets.map((p) => [p, p] as const), (p) => host.update(options(p)));
  else
    stage.cycle(presets, 2200, (p) => {
      host.update(options(p));
      stage.say(`preset: ${p}`);
    });
  return () => stage.dispose();
};

export default mount;
