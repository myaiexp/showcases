// A trailing ! consumes the event (preventDefault), so a wheel zooms without scrolling the page
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,

    signals: [
      // "wheel!" is the wheel stream with consume: true. Scroll over the chart: it zooms and
      // the page stays where it is.
      { name: 'zoom', value: 1, on: [{ events: 'wheel!', update: 'clamp(zoom * pow(1.001, -event.deltaY), 0.3, 4)' }] },
      { name: 'about', value: [210, 105], on: [{ events: 'wheel!', update: '[x(), y()]' }] },
    ],

    data: [{ name: 'grid', transform: [{ type: 'sequence', start: 0, stop: 6, as: 'i' }] }],

    marks: [
      line("'zoom ' + format(zoom, '.2f') + '  (scroll over the chart)'", 4),
      {
        type: 'symbol',
        from: { data: 'grid' },
        encode: {
          update: {
            // Scale each circle's position about the wheel point.
            x: { signal: 'about[0] + (60 + datum.i * 60 - about[0]) * zoom' },
            y: { signal: 'about[1] + (105 - about[1]) * zoom' },
            size: { signal: '1400 * zoom * zoom' },
            fill: { value: 'steelblue' },
            fillOpacity: { value: 0.7 },
            stroke: { value: '#cde' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    stage.every(120, (i) => ghost.wheel(i % 40 < 20 ? 100 : 320, 105, i % 20 < 12 ? -60 : 90));
  }
  return () => stage.dispose();
};

export default mount;
