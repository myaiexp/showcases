// The docs' table of contents drawn as a tree mark from slash-separated paths
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { sidebar, type Item } from './sidebar.ts';

// What is Plot? turns the sidebar into one path per node: "/Plot/Marks/Area" and so on.
function toPaths(items: Item[]): { path: string; link?: string }[] {
  const paths: { path: string; link?: string }[] = [];
  (function visit(node: Item, path: string) {
    paths.push({ path, link: node.link && `.${node.link}` });
    for (const item of node.items ?? []) visit(item, (path === '/' ? path : path + '/') + item.text);
  })({ text: 'Plot', items }, '/Plot');
  return paths;
}

// The docs size the plot from the tree's breadth (issue #1703): d3.tree with unit node size.
function treeWidth(paths: { path: string }[]): number {
  const root = d3.tree<{ path: string }>().nodeSize([1, 1])(d3.stratify<{ path: string }>().path((d) => d.path)(paths));
  const [x1 = 0, x2 = 0] = d3.extent(root, (d) => d.x);
  return x2 - x1;
}

const GROUPS = ['All', ...sidebar.filter((d) => d.items).map((d) => d.text)];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    // A card cycles one sidebar group at a time; the whole tree is too tall for 200px.
    initial: { group: ctx.preview ? 'Features' : 'All' },
    render: ({ group }, { width, preview }) => {
      const paths = toPaths(group === 'All' ? sidebar : sidebar.filter((d) => d.text === group));
      return Plot.plot({
        width,
        axis: null,
        height: preview ? 200 : treeWidth(paths) * 12,
        marginTop: 4,
        marginRight: 120,
        marginBottom: 4,
        marginLeft: 24,
        marks: [
          Plot.tree(paths, {
            path: 'path',
            textStroke: 'var(--bg)',
            channels: { href: { value: 'link', filter: null } },
            treeSort: null,
          }),
        ],
      });
    },
    step: ({ group }) => ({ group: GROUPS[(GROUPS.indexOf(group) % (GROUPS.length - 1)) + 1] ?? 'Features' }),
    previewMs: 3000,
    controls: (bar, live) => {
      select(bar, 'group', GROUPS, live.state.group, (group) => live.set({ group }));
    },
  });

export default mount;
