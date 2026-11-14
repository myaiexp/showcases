// FAQ: restyle treemap leaves on hover and selection through leaf.state
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { asSpec, moduleTree, type TreeNode, pathOf } from '../../shared/hierarchy-data.ts';
import { pick } from '../../shared/components-data.ts';

const leaves = (nodes: TreeNode[]): string[] => nodes.flatMap((n) => (n.children ? leaves(n.children) : [n.name]));
const NAMES = leaves(moduleTree());

const build = (preview: boolean, strong: boolean) =>
  asSpec({
    type: 'treemap',
    data: [{ id: 'data', values: moduleTree() }],
    categoryField: 'name',
    valueField: 'value',
    label: { visible: true, style: { fontSize: preview ? 9 : 11 } },
    tooltip: { mark: { title: { value: pathOf } } },
    leaf: {
      state: {
        // hover and selected are state names; the style given here replaces the base look while the state is on.
        hover: { stroke: '#fde047', lineWidth: strong ? 4 : 2, fillOpacity: 0.9 },
        selected: { stroke: '#f97316', lineWidth: strong ? 5 : 3, fill: '#f97316' },
      },
    },
  });

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(ctx.preview, true));
  let released = false;
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'border weight', ['strong', 'light'], (v) => {
      if (!released) void vchart.updateSpec(build(false, v === 'strong'));
    });
  }
  // A pointer is not needed to see the states: setHovered and setSelected switch them from code.
  let i = 0;
  const stop = every(1100, () => {
    i += 1;
    if (released) return;
    vchart.clearState('hover');
    vchart.setHovered({ name: pick(NAMES, i * 3) });
    if (i % 3 === 0) {
      vchart.clearState('selected');
      vchart.setSelected({ name: pick(NAMES, i * 5) });
    }
  });
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
