// handleX style options: default, dashed rule with a warm knob, and no rule with a large hit area
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { handleX, type HandleXChange } from '@tanstack/charts/interaction/handle';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { weekPoints } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

type Preset = 'default' | 'dashed' | 'no rule';
const presets: readonly Preset[] = ['default', 'dashed', 'no rule'];
const values = weekPoints.map((p) => p.n);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a preset and drag the knob.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let week = 4;

  const styleFor = (preset: Preset) => {
    if (preset === 'dashed') return { trackStyle: { stroke: '#fb923c', strokeWidth: 3 }, ruleStyle: { stroke: '#fb923c', strokeDasharray: '5 4', strokeWidth: 1.5 }, handleStyle: { fill: '#fb923c', stroke: '#0b0b0f', strokeWidth: 2 } };
    if (preset === 'no rule') return { ruleStyle: false as const, hitSize: 60 };
    return {};
  };
  const options = (preset: Preset) => ({
    definition: defineChart({
      marks: [lineY(weekPoints, { x: 'n', y: 'value', key: 'id', points: true })],
      scales: { x: { scale: scaleLinear().domain([1, 8]) }, y: { scale: scaleLinear, nice: true, grid: true } },
      controls: [
        handleX({
          value: controlledSignal<number, HandleXChange<number>>(week, (next) => {
            week = next;
            host.update(options(current));
          }),
          values,
          cross: { edge: 'top', offset: 14 },
          ...styleFor(preset),
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Weekly users with a styled handle',
  });
  let current: Preset = 'default';
  const host = stage.own(mountChart(stage.box, options(current)));

  const apply = (p: Preset): void => {
    current = p;
    host.update(options(p));
  };
  if (stage.bar) select(stage.bar, 'preset', presets.map((p) => [p, p] as const), apply);
  else
    stage.cycle(presets, 2200, (p) => {
      apply(p);
      stage.say(`preset: ${p}`);
    });
  return () => stage.dispose();
};

export default mount;
