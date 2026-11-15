// KDE bandwidth and steps: three kernel widths on one sample, sampled at a chosen resolution
import type { Data, Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { gaussRows } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const curve = (name: string, bandwidth: number): Data => ({
    name,
    source: 'obs',
    // Bandwidth 0 would pick Scott's rule; here three widths are compared.
    transform: [{ type: 'kde', field: 'v', bandwidth, extent: [0, 100], steps: { signal: 'steps' }, as: ['x', 'd'] }],
  });
  const stroke = ['tomato', '#7c9', 'dodgerblue'];

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,
    signals: [{ name: 'steps', value: 80, bind: { input: 'select', options: [6, 12, 25, 50, 80, 160] } }],
    data: [
      { name: 'obs', values: [...gaussRows(141, 26, 35, 6), ...gaussRows(142, 22, 68, 9)] },
      curve('narrow', 1.5),
      curve('medium', 5),
      curve('wide', 15),
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'narrow', field: 'd' }, zero: true, nice: true, range: 'height' },
      { name: 'color', type: 'ordinal', domain: ['bandwidth 1.5', 'bandwidth 5', 'bandwidth 15'], range: stroke },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', title: 'density' }],
    legends: [{ stroke: 'color', orient: 'top-right', symbolType: 'stroke' }],
    title: { text: { signal: "steps + ' steps per curve'" }, color: '#ddd' },
    marks: ['narrow', 'medium', 'wide'].map((d, i) => ({
      type: 'line' as const,
      from: { data: d },
      encode: {
        update: {
          x: { scale: 'x', field: 'x' },
          y: { scale: 'y', field: 'd' },
          stroke: { value: stroke[i]! },
          strokeWidth: { value: 2 },
          interpolate: { value: 'linear' },
        },
      },
    })),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'steps', [6, 12, 25, 50, 160, 80], 1300);
  return () => stage.dispose();
};

export default mount;
