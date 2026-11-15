// focus: false and focusDisabled against the default, with the surface's tabindex read back
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { focusDisabled } from '@tanstack/charts/focus/disabled';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { weeks } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

type Mode = 'default' | 'false' | 'focusDisabled';
const modes: readonly Mode[] = ['default', 'false', 'focusDisabled'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the line and press Tab in each mode.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const build = (mode: Mode) =>
    defineChart({
      marks: [lineY(weeks, { x: 'week', y: 'value', key: 'id', points: true })],
      scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, grid: true } },
      ...(mode === 'false' ? { focus: false as const, keyboard: false } : {}),
      ...(mode === 'focusDisabled' ? { focus: focusDisabled, keyboard: false } : {}),
      tooltip,
    });
  const options = (mode: Mode) => ({ definition: build(mode), height: stage.height, initialWidth: 640, ariaLabel: 'Weekly users' });
  const host = stage.own(mountChart(stage.box, options('default')));
  const report = (mode: Mode): void => {
    const tab = stage.box.querySelector('svg')?.getAttribute('tabindex');
    stage.say(`mode: ${mode}; chart tabindex: ${tab ?? 'none'}`);
  };

  const apply = (mode: Mode): void => {
    host.update(options(mode));
    stage.after(100, () => report(mode));
  };
  if (stage.bar) select(stage.bar, 'focus', modes.map((m) => [m, m] as const), apply);
  else {
    stage.cycle(modes, 2600, apply);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
