// Tree-structured data: nested name, value and children objects drawn as a sunburst
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

interface Node { name: string; value?: number; children?: Node[] }
const rand = seeded(15);
const leaf = (name: string): Node => ({ name, value: Math.round(1 + rand() * 6) });
const tree = (): Node[] => [
  {
    name: 'Grandpa',
    children: [
      { name: 'Uncle Leo', children: [leaf('Cousin Jack'), { name: 'Cousin Mary', children: [leaf('Jackson')] }, leaf('Cousin Ben')] },
      { name: 'Father', children: [leaf('Me'), leaf('Brother Peter')] },
    ],
  },
  { name: 'Nancy', children: [{ name: 'Uncle Nike', children: [leaf('Cousin Betty'), leaf('Cousin Jenny')] }] },
];

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'sunburst',
    data: [{ id: 'data', values: tree() }],
    categoryField: 'name',
    valueField: 'value',
    outerRadius: 0.9,
    innerRadius: 0,
    drill: true,
    label: { visible: true },
    sunburst: { style: { fillOpacity: (datum: { isLeaf?: boolean }) => (datum.isLeaf ? 0.45 : 0.85) } },
    tooltip: { mark: { title: { value: (val: { datum?: unknown } | undefined) => (val?.datum as { name: string }[] | undefined)?.map((d) => d.name).join(' / ') } } },
  } as never);
  let alive = true;
  const stop = every(ctx.preview ? 2200 : 4000, () => {
    if (alive) void vchart.updateData('data', tree() as never);
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
