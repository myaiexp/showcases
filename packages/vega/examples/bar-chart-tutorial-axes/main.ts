// The tutorial's axes step: the y axis moved right, five ticks, offset 6px
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 200,
    padding: 5,

    data: [
      {
        name: 'table',
        values: [
          { category: 'A', amount: 28 },
          { category: 'B', amount: 55 },
          { category: 'C', amount: 43 },
          { category: 'D', amount: 91 },
          { category: 'E', amount: 81 },
          { category: 'F', amount: 53 },
          { category: 'G', amount: 19 },
          { category: 'H', amount: 87 },
        ],
      },
    ],

    // The tooltip signal holds the hovered datum, or {} when the pointer leaves a bar.
    signals: [
      {
        name: 'tooltip',
        value: {},
        on: [
          { events: 'rect:mouseover', update: 'datum' },
          { events: 'rect:mouseout', update: '{}' },
        ],
      },
    ],

    scales: [
      {
        name: 'xscale',
        type: 'band',
        domain: { data: 'table', field: 'category' },
        range: 'width',
        padding: 0.05,
        round: true,
      },
      { name: 'yscale', domain: { data: 'table', field: 'amount' }, nice: true, range: 'height' },
    ],

    axes: [
      { orient: 'bottom', scale: 'xscale' },
      // About five ticks instead of ten, on the right, pushed 6px away from the bars.
      { orient: 'right', scale: 'yscale', tickCount: 5, offset: 6 },
    ],

    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          enter: {
            x: { scale: 'xscale', field: 'category' },
            width: { scale: 'xscale', band: 1 },
            y: { scale: 'yscale', field: 'amount' },
            y2: { scale: 'yscale', value: 0 },
          },
          update: { fill: { value: 'steelblue' } },
          hover: { fill: { value: 'red' } },
        },
      },
      {
        type: 'text',
        encode: {
          enter: { align: { value: 'center' }, baseline: { value: 'bottom' }, fill: { value: '#ddd' } },
          update: {
            x: { scale: 'xscale', signal: 'tooltip.category', band: 0.5 },
            y: { scale: 'yscale', signal: 'tooltip.amount', offset: -2 },
            text: { signal: 'tooltip.amount' },
            fillOpacity: [{ test: 'isNaN(tooltip.amount)', value: 0 }, { value: 1 }],
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  // Cards: a pretend pointer walks across the bars, so the hover set and the tooltip text show.
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const x = view.scale('xscale');
    const cats = 'ABCDEFGH';
    stage.every(700, (i) => {
      const c = cats[i % cats.length];
      ghost.move(x(c) + x.bandwidth() / 2, 195);
    });
  }
  return () => stage.dispose();
};

export default mount;
