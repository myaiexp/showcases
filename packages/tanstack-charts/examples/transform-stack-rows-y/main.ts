// stackRowsY: stack endpoints as data, drawn with rect, under different offsets
import { defineChart, rect, stackRowsY } from '@tanstack/charts';
import type { StackOptions } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { quarters } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const show = readoutPanel(stage);

  const build = (options: StackOptions) => {
    const rows = stackRowsY(quarters, { x: 'quarter', y: 'revenue', z: 'product', ...options });
    show(tableText(rows, ['quarter', 'product', 'revenue', 'y1', 'y2'], 6));
    return defineChart({
      marks: [rect(rows, { x: 'x', y1: 'y1', y2: 'y2', color: 'z', inset: 1 })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });
  };
  const states: readonly (readonly [StackOptions, string])[] = [
    [{}, 'defaults'],
    [{ offset: 'normalize' }, "offset: 'normalize'"],
    [{ offset: 'center' }, "offset: 'center'"],
    [{ offset: 'wiggle' }, "offset: 'wiggle'"],
    [{ order: 'descending' }, "order: 'descending'"],
    [{ reverse: true }, 'reverse: true'],
  ];
  lab(stage, { label: 'options', ariaLabel: 'Stacked revenue from stackRowsY', states, build, ms: 1800, after: (_, name) => stage.say(`stackRowsY: ${name}`) });
  return () => stage.dispose();
};

export default mount;
