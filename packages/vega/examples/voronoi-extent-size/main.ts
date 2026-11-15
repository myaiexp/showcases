// Voronoi cells clipped by size (0,0 to w,h) or by an extent whose edges you choose
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { scatter } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const W = 200;
const H = 200;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // Two panels over the same points; only the clip parameter of the voronoi transform differs.
  const panel = (title: string, x: number, clip: object) => ({
    type: 'group' as const,
    encode: { enter: { x: { value: x }, y: { value: 0 }, width: { value: W }, height: { value: H }, stroke: { value: '#444' } } },
    marks: [
      { type: 'text' as const, encode: { enter: { x: { value: W / 2 }, y: { value: -10 }, text: { value: title }, align: { value: 'center' as const }, fill: { value: '#ddd' } } } },
      {
        name: 'pts',
        type: 'symbol' as const,
        from: { data: 'points' },
        interactive: false,
        encode: { enter: { fill: { value: 'orange' }, size: { value: 30 }, x: { signal: 'datum.u * 200' }, y: { signal: 'datum.v * 200' } } },
      },
      {
        type: 'path' as const,
        from: { data: 'pts' },
        interactive: false,
        encode: { enter: { stroke: { value: '#6aa7e6' }, fill: { value: 'rgba(70,130,180,0.12)' } } },
        transform: [{ type: 'voronoi' as const, x: 'datum.x', y: 'datum.y', ...clip }],
      },
    ],
  });

  const spec: Spec = {
    width: W * 2 + 40,
    height: H,
    padding: { top: 25, left: 5, right: 5, bottom: 5 },
    autosize: 'none',
    signals: [{ name: 'inset', value: 0, bind: { input: 'range', min: 0, max: 70, step: 1 } }],
    data: [{ name: 'points', values: scatter(44, 22) }],
    marks: [
      panel('size: [200, 200]', 0, { size: [W, H] }),
      panel('extent: [[inset, inset], [200 - inset, 200 - inset]]', W + 40, {
        // One signal supplies the whole extent: nested signals inside the array are not resolved.
        extent: { signal: `[[inset, inset], [${W} - inset, ${H} - inset]]` },
      }),
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'inset', [0, 30, 60, 15], 1600);
  return () => stage.dispose();
};

export default mount;
