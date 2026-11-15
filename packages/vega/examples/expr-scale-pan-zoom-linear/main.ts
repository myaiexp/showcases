// Scale functions: panLinear and zoomLinear on a linear scale
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 200,
    padding: 8,
    signals: [
      // Dragging records where the pointer went down and what the domain was then.
      { name: 'xdown', value: 0, on: [{ events: 'mousedown', update: 'x()' }] },
      { name: 'domdown', value: [0, 100], on: [{ events: 'mousedown', update: 'xdom' }] },
      {
        name: 'xdom',
        value: [0, 100],
        on: [
          {
            // Pan: the drag distance as a fraction of the range, in panLinear. The isFinite test skips events that carry no pointer position.
            events: { source: 'window', type: 'mousemove', consume: true, between: [{ type: 'mousedown' }, { source: 'window', type: 'mouseup' }] },
            update: 'isFinite(x()) ? panLinear(domdown, (xdown - x()) / width) : xdom',
          },
          {
            // Zoom: the wheel scales the domain around the data value under the pointer. The docs call the
            // anchor a fraction of the range, but Vega 6.4 reads it as a domain value, hence invert().
            events: 'wheel!',
            update: 'isFinite(x()) ? zoomLinear(xdom, invert(\"x\", x()), pow(1.002, event.deltaY)) : xdom',
          },
        ],
      },
    ],
    data: [
      {
        name: 'curve',
        transform: [
          { type: 'sequence', start: 0, stop: 100.5, step: 0.5, as: 'x' },
          { type: 'formula', as: 'y', expr: '50 + 38 * sin(datum.x / 7)' },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: { signal: 'xdom' }, range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', grid: true, gridOpacity: 0.12 },
      { orient: 'left', scale: 'y', tickCount: 5 },
    ],
    marks: [
      {
        type: 'group',
        clip: true,
        encode: { enter: { width: { signal: 'width' }, height: { signal: 'height' } } },
        marks: [
          {
            type: 'line',
            from: { data: 'curve' },
            encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, stroke: { value: 'steelblue' }, strokeWidth: { value: 2 } } },
          },
          {
            type: 'symbol',
            from: { data: 'curve' },
            encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, size: { value: 14 }, fill: { value: 'orange' } } },
          },
        ],
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 0 },
            y: { value: -2 },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
            text: { signal: "'domain [' + format(xdom[0], '.4~g') + ', ' + format(xdom[1], '.4~g') + ']  (drag to pan, wheel to zoom)'" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const act: (() => Promise<void> | void)[] = [
      () => ghost.drag([330, 100], [140, 100], 600, 10),
      () => ghost.wheel(220, 100, -500),
      () => ghost.drag([120, 100], [330, 100], 600, 10),
      () => ghost.wheel(220, 100, 600),
    ];
    stage.every(1000, (i) => act[i % act.length]?.());
  }
  return () => stage.dispose();
};

export default mount;
