// Tree series: orthogonal orient variants, radial layout, collapse and expand
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';

const leaf = (name: string): { name: string; value: number } => ({ name, value: 1 });
const data = {
  name: 'root',
  children: [
    { name: 'src', children: [leaf('index'), leaf('app'), { name: 'utils', children: [leaf('dom'), leaf('math'), leaf('str')] }] },
    { name: 'tests', children: [leaf('unit'), leaf('e2e')] },
    { name: 'docs', children: [leaf('guide'), leaf('api'), leaf('faq')] },
    { name: 'config', children: [leaf('vite'), leaf('tsconfig')] },
  ],
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });

  const apply = (layout: string, orient: string, initialTreeDepth: number): void => {
    const radial = layout === 'radial';
    chart.setOption({
      tooltip: { trigger: 'item', triggerOn: 'mousemove' },
      series: [
        {
          type: 'tree',
          data: [data],
          layout, // 'orthogonal' | 'radial'
          orient, // only for orthogonal: 'LR' | 'RL' | 'TB' | 'BT'
          symbolSize: 9,
          initialTreeDepth, // levels expanded at start; -1 expands all
          expandAndCollapse: true, // click a node to fold its subtree
          top: '8%', bottom: '8%', left: radial ? '10%' : '12%', right: radial ? '10%' : '16%',
          label: { position: radial ? 'top' : 'left', verticalAlign: 'middle', fontSize: ctx.preview ? 10 : 12 },
          leaves: { label: { position: radial ? 'top' : 'right', verticalAlign: 'middle' } },
          animationDurationUpdate: 700,
        },
      ],
    });
  };
  apply('orthogonal', 'LR', -1);

  if (bar) {
    let layout = 'orthogonal';
    let orient = 'LR';
    let depth = -1;
    select(bar, 'layout', ['orthogonal', 'radial'], (v) => { layout = v; apply(layout, orient, depth); });
    select(bar, 'orient', ['LR', 'RL', 'TB', 'BT'], (v) => { orient = v; apply(layout, orient, depth); });
    button(bar, 'Collapse to depth 1', () => { depth = 1; apply(layout, orient, depth); });
    button(bar, 'Expand all', () => { depth = -1; apply(layout, orient, depth); });
  }

  // Preview: alternate between layouts and fold/unfold the tree.
  let i = 0;
  const steps: [string, string, number][] = [['orthogonal', 'LR', -1], ['radial', 'LR', -1], ['radial', 'LR', 1], ['orthogonal', 'TB', 2]];
  const stop = ctx.preview ? every(2200, () => { const [l, o, d] = steps[++i % steps.length]!; apply(l, o, d); }) : () => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
