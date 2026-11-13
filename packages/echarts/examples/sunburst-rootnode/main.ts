// Sunburst with levels styling; clicking a sector makes it the root (nodeClick rootToNode)
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const leaf = (name: string, value: number): { name: string; value: number } => ({ name, value });
const data = [
  { name: 'Fruit', children: [
    { name: 'Citrus', children: [leaf('Orange', 6), leaf('Lemon', 4), leaf('Lime', 3)] },
    { name: 'Berries', children: [leaf('Strawberry', 5), leaf('Blueberry', 4)] },
    leaf('Apple', 7),
  ] },
  { name: 'Veg', children: [
    { name: 'Roots', children: [leaf('Carrot', 6), leaf('Beet', 3)] },
    { name: 'Leaves', children: [leaf('Kale', 4), leaf('Spinach', 5)] },
  ] },
  { name: 'Grain', children: [leaf('Rice', 8), leaf('Oats', 5), leaf('Rye', 3)] },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });

  const apply = (nodeClick: string | false, sort: string): void => {
    chart.setOption({
      series: [
        {
          type: 'sunburst',
          data,
          radius: [ctx.preview ? 16 : 30, '95%'],
          sort: sort === 'none' ? undefined : sort, // 'desc' | 'asc' | undefined keeps data order
          nodeClick, // 'rootToNode' re-roots on click, with a centre circle to go back
          emphasis: { focus: 'ancestor' },
          // levels[0] is the 'virtual root' level, then one entry per ring.
          levels: [
            {},
            { r0: '15%', r: '40%', itemStyle: { borderWidth: 2 }, label: { rotate: 'tangential' } },
            { r0: '40%', r: '68%', label: { align: 'right' } },
            { r0: '70%', r: '73%', label: { position: 'outside', padding: 3, silent: false }, itemStyle: { borderWidth: 3 } },
          ],
          label: { fontSize: ctx.preview ? 9 : 12 },
        },
      ],
    });
  };
  const clickMode = ctx.preview ? false : 'rootToNode';
  apply(clickMode, 'desc');

  if (bar) {
    select(bar, 'nodeClick', ['rootToNode', 'none'], (v) => apply(v === 'none' ? false : 'rootToNode', 'desc'));
    select(bar, 'sort', ['desc', 'asc', 'none'], (v) => apply('rootToNode', v));
  }

  // Preview: alternate the sort order so the sectors rearrange.
  let flip = false;
  const stop = ctx.preview ? every(2200, () => apply(false, (flip = !flip) ? 'asc' : 'desc')) : () => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
