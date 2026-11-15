// Layout bounds: full spaces groups by their axes too, flush only by their width and height
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    padding: 5,

    signals: [{ name: 'bounds', value: 'full', bind: { input: 'select', options: ['full', 'flush'], name: 'layout.bounds' } }],

    // full (the default) measures each group including axes, titles and legends.
    // flush measures only the group's width and height, so axes may overlap a neighbour.
    layout: { columns: 2, padding: 6, bounds: { signal: 'bounds' }, align: 'each' },

    data: [{ name: 'panels', values: [{ k: 'north', d: 40 }, { k: 'south', d: 75 }, { k: 'east', d: 20 }, { k: 'west', d: 90 }] }],

    marks: [
      {
        type: 'group',
        from: { data: 'panels' },
        encode: { update: { width: { value: 140 }, height: { value: 70 }, stroke: { value: '#667' } } },
        // A group sized through encode has no `width` signal for its scales (range: 'width' would
        // be 0), so the ranges are written as numbers.
        scales: [
          { name: 'x', type: 'linear', domain: [0, 100], range: [0, 140] },
          { name: 'y', type: 'band', domain: ['v'], range: [0, 70], padding: 0.3 },
        ],
        axes: [
          { orient: 'bottom', scale: 'x', tickCount: 5, title: 'value' },
          { orient: 'left', scale: 'y', labels: false, ticks: false },
        ],
        marks: [
          {
            type: 'rect',
            encode: {
              update: {
                x: { scale: 'x', value: 0 },
                x2: { scale: 'x', field: { parent: 'd' } },
                y: { scale: 'y', value: 'v' },
                height: { scale: 'y', band: 1 },
                fill: { value: 'steelblue' },
              },
            },
          },
          {
            type: 'text',
            encode: { update: { x: { value: 4 }, y: { value: 4 }, baseline: { value: 'top' }, fontSize: { value: 11 }, text: { field: { parent: 'k' } } } },
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'bounds', ['flush', 'full'], 1600);
  return () => stage.dispose();
};

export default mount;
