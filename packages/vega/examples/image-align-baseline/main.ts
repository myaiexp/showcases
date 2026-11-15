// align and baseline pick which point of the image sits on its x and y
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const logo = (fill: string, ink: string): string => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" viewBox="0 0 100 60"><rect width="100" height="60" rx="8" fill="${fill}"/><circle cx="30" cy="30" r="16" fill="${ink}"/><path d="M52 44L66 14L80 44Z" fill="${ink}"/></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  };

  const spec: Spec = {
    width: 360, height: 270, padding: 5,
    signals: [{ name: 'size', value: 70, bind: { input: 'range', min: 20, max: 100, step: 1 } }],
    data: [{
      name: 'cells',
      values: ['left', 'center', 'right'].flatMap((align, c) => ['top', 'middle', 'bottom'].map((baseline, r) => ({ align, baseline, x: 60 + c * 120, y: 45 + r * 90 }))),
    }],
    marks: [
      {
        type: 'image',
        from: { data: 'cells' },
        encode: {
          enter: { url: { value: logo('#4b6cb7', '#fff') } },
          update: {
            x: { field: 'x' }, y: { field: 'y' }, width: { signal: 'size' },
            align: { field: 'align' }, baseline: { field: 'baseline' }, opacity: { value: 0.85 },
          },
        },
      },
      { type: 'symbol', interactive: false, from: { data: 'cells' }, encode: { update: { x: { field: 'x' }, y: { field: 'y' }, shape: { value: 'cross' }, size: { value: 90 }, stroke: { value: 'tomato' }, strokeWidth: { value: 2 } } } },
      { type: 'text', interactive: false, from: { data: 'cells' }, encode: { update: { x: { field: 'x' }, y: { signal: 'datum.y + 52' }, align: { value: 'center' }, text: { signal: 'datum.align + " / " + datum.baseline' }, fontSize: { value: 10 }, fill: { value: '#aaa' } } } },
    ],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'size', [70, 40, 90, 55], 1300);
  return () => stage.dispose();
};

export default mount;
