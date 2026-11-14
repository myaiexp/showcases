// A scatter that encodes x, y, size and shape/color, with a hover state
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { bubbles, seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(2);
const next = () => bubbles(rand, 24);

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'scatter',
      data: [{ id: 'data', values: next() }],
      xField: 'x',
      yField: 'y',
      seriesField: 'kind',
      shapeField: 'kind',
      shape: { type: 'ordinal', range: ['star', 'triangleLeft', 'diamond'] },
      sizeField: 'size',
      size: { type: 'linear', range: [5, 28] },
      point: { style: { fillOpacity: 0.65 }, state: { hover: { scaleX: 1.3, scaleY: 1.3 } } },
      legends: { visible: !ctx.preview, orient: 'top' },
      axes: [
        { orient: 'bottom', type: 'linear', min: 0, max: 100 },
        { orient: 'left', type: 'linear', min: 0, max: 100 },
      ],
    } as ISpec,
  });

export default mount;
