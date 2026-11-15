// tabIndex and keyboard: the attribute on the chart surface, read after each update
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { weeks } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

type Choice = 'default' | 'tabIndex 3' | 'tabIndex -1' | 'keyboard false';
const choices: readonly Choice[] = ['default', 'tabIndex 3', 'tabIndex -1', 'keyboard false'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press Tab to reach the chart, then the arrow keys. Change the choice and try again.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const build = (choice: Choice) =>
    defineChart({
      marks: [lineY(weeks, { x: 'week', y: 'value', key: 'id', points: true })],
      scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, grid: true } },
      ...(choice === 'tabIndex 3' ? { tabIndex: 3 } : {}),
      ...(choice === 'tabIndex -1' ? { tabIndex: -1 } : {}),
      ...(choice === 'keyboard false' ? { keyboard: false } : {}),
      tooltip,
    });
  const options = (choice: Choice) => ({ definition: build(choice), height: stage.height, initialWidth: 640, ariaLabel: 'Weekly users' });
  const host = stage.own(mountChart(stage.box, options('default')));
  const apply = (choice: Choice): void => {
    host.update(options(choice));
    stage.after(100, () => stage.say(`${choice}: chart tabindex = ${stage.box.querySelector('svg')?.getAttribute('tabindex') ?? 'none'}`));
  };

  if (stage.bar) select(stage.bar, 'setting', choices.map((c) => [c, c] as const), apply);
  else {
    stage.cycle(choices, 2200, apply);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
