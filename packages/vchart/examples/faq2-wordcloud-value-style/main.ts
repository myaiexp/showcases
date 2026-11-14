// FAQ: word cloud font size from fontSizeRange, colour and opacity from callbacks on the value
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const WORDS = ['chart', 'bar', 'line', 'pie', 'axis', 'legend', 'tooltip', 'label', 'theme', 'data', 'spec', 'series', 'scale', 'event', 'mark', 'state', 'layout', 'region', 'radar', 'gauge', 'funnel', 'sankey', 'map', 'scatter'];

const mount: Mount = (el, ctx) => {
  const rand = seeded(21);
  const rows = WORDS.map((name) => ({ name, value: Math.round(5 + rand() * 95) }));
  const make = (min: number, max: number): ISpec =>
    ({
      type: 'wordCloud',
      data: [{ id: 'words', values: rows }],
      nameField: 'name',
      valueField: 'value',
      fontSizeRange: [min, max],
      word: {
        style: {
          // Value above 70 gold, above 40 blue, otherwise grey; bigger values are more opaque.
          fill: (d: { value: number }) => (d.value > 70 ? '#ffd666' : d.value > 40 ? '#69b1ff' : '#a6adb4'),
          fillOpacity: (d: { value: number }) => 0.35 + d.value / 160,
        },
      },
    }) as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, make(8, 60));
  let alive = true;
  let stop = (): void => {};
  const apply = (min: number, max: number): void => {
    if (alive) void vchart.updateSpec(make(min, max));
  };
  if (ctx.preview) {
    let i = 0;
    stop = every(1500, () => {
      i++;
      apply(i % 2 ? 4 : 10, i % 2 ? 24 : 44);
    });
  } else {
    let min = 8;
    let max = 60;
    const bar = controlBar(el);
    el.prepend(bar);
    slider(bar, 'min size', [4, 20, 1], min, (v) => apply((min = v), max));
    slider(bar, 'max size', [20, 90, 1], max, (v) => apply(min, (max = v)));
  }
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
