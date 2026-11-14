// Polar crosshair: categoryField (angle spokes) and valueField (radius rings) on a radar chart
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const SKILLS = ['Speed', 'Power', 'Range', 'Defense', 'Magic', 'Luck', 'Stamina'];

const makeRows = (seed: number): { name: string; type: string; value: number }[] => {
  const r = rng(seed);
  return ['Knight', 'Mage'].flatMap((type) => SKILLS.map((name) => ({ name, type, value: Math.round(30 + r() * 70) })));
};
const rows = makeRows(23);

const build = (category: boolean, value: boolean): ISpec => ({
  type: 'radar',
  data: [{ id: 'radar', values: rows }],
  categoryField: 'name',
  valueField: 'value',
  seriesField: 'type',
  area: { visible: true, style: { fillOpacity: 0.15 } },
  legends: { visible: true, orient: 'bottom' },
  axes: [
    { orient: 'angle', grid: { style: { lineDash: [2, 2] } } },
    { orient: 'radius', grid: { smooth: true, style: { lineDash: [2, 2] } }, label: { visible: true, inside: true } },
  ],
  crosshair: {
    categoryField: { visible: category, line: { style: { stroke: '#fde047', lineWidth: 1, lineDash: [4, 4] } }, label: { visible: true } },
    // valueField.line only supports type 'line' (crosshair.md)
    valueField: { visible: value, line: { smooth: true, style: { stroke: '#38bdf8', lineWidth: 1, lineDash: [4, 4] } } },
  },
});

const mount: Mount = (el, ctx) => {
  let category = true;
  let value = true;
  const { vchart, release } = createChart(el, ctx, build(category, value));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(category, value));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    // A polar crosshair follows the pointer only (setDimensionIndex does not reach angle axes),
    // so the card morphs the radar instead.
    let seed = 23;
    stop = every(1800, () => {
      seed += 1;
      if (!released) void vchart.updateData('radar', makeRows(seed));
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'categoryField', ['visible', 'hidden'], (v) => ((category = v === 'visible'), apply()));
    select(bar, 'valueField', ['visible', 'hidden'], (v) => ((value = v === 'visible'), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
