// Pie texture fills: pie.style.texture, textureColor, textureSize and texturePadding per sector
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { ELEMENTS } from '../../shared/polar-data.ts';

const TEXTURES = ['circle', 'horizontal-line', 'vertical-line', 'rect', 'grid', 'bias-rl', 'diamond', 'bias-lr'];
const DATA = ELEMENTS.map((d, i) => ({ ...d, texture: TEXTURES[i] as string }));

interface State {
  size: number;
  padding: number;
}

const STEPS: State[] = [
  { size: 6, padding: 1 },
  { size: 10, padding: 2 },
  { size: 14, padding: 6 },
  { size: 4, padding: 0 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[1] as State,
    build: ({ size, padding }, preview) => ({
      type: 'pie',
      data: [{ id: 'elements', values: DATA }],
      categoryField: 'type',
      valueField: 'value',
      innerRadius: 0.4,
      outerRadius: 0.85,
      padAngle: 0.6,
      pie: {
        style: {
          cornerRadius: 5,
          texture: (datum) => String(datum['texture']),
          textureColor: 'rgba(255,255,255,0.7)',
          textureSize: size,
          texturePadding: padding,
        },
      },
      legends: {
        visible: !preview,
        orient: 'left',
        item: { shape: { style: { symbolType: 'circle', texture: (datum: Record<string, unknown>) => String(datum['texture']) } } },
      },
      label: { visible: false },
    }),
    controls: (bar, live) => {
      slider(bar, 'textureSize', [2, 20, 1], live.state.size, (size) => live.set({ size }));
      slider(bar, 'texturePadding', [0, 10, 1], live.state.padding, (padding) => live.set({ padding }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1500,
  });

export default mount;
