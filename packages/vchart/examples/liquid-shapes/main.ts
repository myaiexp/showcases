// Liquid maskShape: the outline the water is poured into
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { registerLiquidChart } from '@visactor/vchart';
import { mountLive } from '../../shared/live-spec.ts';

const SHAPES = ['circle', 'drop', 'diamond', 'square', 'rect', 'star', 'triangle', 'triangleUp', 'cross', 'wedge', 'arrow', 'thinTriangle', 'wye'];

interface State {
  shape: string;
}

// The default VChart bundle leaves the liquid chart out; registering it is safe to repeat.
registerLiquidChart();

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { shape: 'circle' },
    build: ({ shape }) => ({
      type: 'liquid',
      data: { id: 'level', values: [{ value: 0.6 }] },
      valueField: 'value',
      maskShape: shape,
      outlineMargin: 8,
      outlinePadding: 8,
    }),
    controls: (bar, live) => {
      select(bar, 'maskShape', SHAPES, (shape) => live.set({ shape }));
    },
    step: (_s, i) => ({ shape: SHAPES[i % SHAPES.length] as string }),
    previewMs: 1500,
  });

export default mount;
