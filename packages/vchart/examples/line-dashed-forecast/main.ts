// A style function: lineDash is dashed for the forecast series and solid for the actual one
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(13);
const DAYS = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10'];
const next = () => {
  let v = 100;
  const prices = DAYS.map((day) => ({ day, price: Math.round((v += (rand() - 0.45) * 10) * 10) / 10 }));
  const actual = prices.slice(0, 6).map((d) => ({ ...d, type: 'actual' }));
  // The forecast starts on the last actual point so the lines connect.
  const forecast = prices.slice(5).map((d) => ({ ...d, type: 'forecast' }));
  return [...actual, ...forecast];
};

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'line',
      data: [{ id: 'data', values: next() }],
      xField: 'day',
      yField: 'price',
      seriesField: 'type',
      line: { style: { lineDash: (d: Record<string, unknown>) => (d.type === 'forecast' ? [6, 6] : [0]), lineWidth: 3 } },
      legends: { visible: !ctx.preview, orient: 'top' },
    } as ISpec,
  });

export default mount;
