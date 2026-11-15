// Scale functions: invert turns a pointer position into data values and scale turns them back
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const rand = rng(61);
const points = Array.from({ length: 40 }, () => ({ a: Math.round(rand() * 100), b: Math.round(10 ** (rand() * 3)) }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 200,
    padding: 8,
    signals: [
      // The pointer, as a position in the plot and as the data values under it.
      { name: 'px', value: 220, on: [{ events: 'mousemove', update: 'clamp(x(), 0, width)' }] },
      { name: 'py', value: 100, on: [{ events: 'mousemove', update: 'clamp(y(), 0, height)' }] },
      { name: 'ax', update: 'invert("xs", px)' },
      { name: 'by', update: 'invert("ys", py)' },
    ],
    data: [{ name: 'pts', values: points }],
    scales: [
      { name: 'xs', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'ys', type: 'log', domain: [1, 1000], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'xs' },
      { orient: 'left', scale: 'ys', format: '~s', grid: true, gridOpacity: 0.12 },
    ],
    marks: [
      {
        type: 'symbol',
        from: { data: 'pts' },
        encode: { update: { x: { scale: 'xs', field: 'a' }, y: { scale: 'ys', field: 'b' }, size: { value: 50 }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.8 } } },
      },
      { type: 'rule', encode: { update: { x: { signal: 'px' }, y: { value: 0 }, y2: { signal: 'height' }, stroke: { value: '#8c93a1' } } } },
      { type: 'rule', encode: { update: { y: { signal: 'py' }, x: { value: 0 }, x2: { signal: 'width' }, stroke: { value: '#8c93a1' } } } },
      {
        // scale() sends the inverted values back, landing on the pointer: a round trip.
        type: 'symbol',
        encode: { update: { x: { signal: 'scale("xs", ax)' }, y: { signal: 'scale("ys", by)' }, size: { value: 160 }, fill: { value: 'transparent' }, stroke: { value: 'orange' }, strokeWidth: { value: 2 } } },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { signal: 'px < width / 2 ? px + 10 : px - 10' },
            y: { signal: 'py < 40 ? py + 20 : py - 10' },
            align: { signal: 'px < width / 2 ? "left" : "right"' },
            fill: { value: 'orange' },
            fontSize: { value: 11 },
            text: { signal: "'invert: ' + format(ax, '.1f') + ', ' + format(by, '.1f') + '   scale: ' + round(scale('xs', ax)) + ', ' + round(scale('ys', by)) + ' px'" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    stage.every(600, (i) => ghost.move(220 + 190 * Math.sin(i * 0.7), 100 + 80 * Math.cos(i * 1.1)));
  }
  return () => stage.dispose();
};

export default mount;
