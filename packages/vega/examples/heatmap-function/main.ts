// heatmap expressions: a colour for every pixel computed from $x and $y
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 250,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'freq', value: 0.05, bind: { input: 'range', min: 0.01, max: 0.2, step: 0.005 } },
    ],
    scales: [
      { name: 'color', type: 'linear', domain: [-1, 1], range: { scheme: 'spectral' } },
    ],
    data: [
      {
        name: 'heat',
        // No raster grid here: the row only gives the bitmap's width and height in pixels.
        values: [{ width: 220, height: 125 }],
        transform: [
          {
            type: 'heatmap',
            // color is evaluated for every pixel, with $x and $y as the pixel position.
            color: { expr: "scale('color', sin(freq * (datum.$x + datum.$y)) * sin(freq * (datum.$x - datum.$y)))" },
            opacity: 1,
          },
        ],
      },
    ],
    marks: [
      {
        type: 'image',
        from: { data: 'heat' },
        encode: {
          update: {
            // The bitmap has the grid's size; the image mark stretches it over the view.
            image: { field: 'image' },
            x: { value: 0 }, y: { value: 0 },
            width: { signal: 'width' }, height: { signal: 'height' },
            aspect: { value: false },
          },
        },
      },
      {
        type: 'text',
        encode: { update: { x: { value: 4 }, y: { value: 14 }, fill: { value: '#f0b060' }, fontSize: { value: 13 }, text: { signal: "'sin(f (x + y)) sin(f (x - y)), f = ' + format(freq, '.3f')" } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'freq', [0.05, 0.08, 0.12, 0.17, 0.1, 0.03], 1200);
  return () => stage.dispose();
};

export default mount;
