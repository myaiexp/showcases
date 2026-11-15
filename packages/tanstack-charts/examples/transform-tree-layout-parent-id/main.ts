// treeLayout with explicit parent references, with and without a sort
import { defineChart, dot, link, text } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { treeLayout } from '@tanstack/charts/hierarchy/tree';
import type { Mount } from '@/types.ts';
import { lab } from '../../shared/xform-lab.ts';
import { org } from '../../shared/xform-graph.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

// Node positions are semantic units: the scale domain is their extent plus half a unit.
const span = (values: number[]): [number, number] => [Math.min(...values) - 0.5, Math.max(...values) + 0.5];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const show = readoutPanel(stage);

  const build = (sorted: boolean) => {
    const tree = treeLayout(org, {
      id: 'id',
      parentId: 'parentId',
      orientation: 'top',
      sort: sorted ? (a, b) => String(a.data?.label).localeCompare(String(b.data?.label)) : undefined,
    });
    show(tableText(tree.nodes, ['id', 'parentId', 'depth', 'height', 'internal', 'x', 'y'], 8));
    return defineChart({
      marks: [
        link(tree.links, { x1: 'x1', y1: 'y1', x2: 'x2', y2: 'y2', stroke: '#64748b', strokeWidth: 1.5 }),
        dot(tree.nodes, { x: 'x', y: 'y', fill: '#60a5fa', r: 6 }),
        text(tree.nodes, { x: 'x', y: 'y', text: (n) => String(n.data?.label), dy: -12, fill: 'currentColor' }),
      ],
      scales: {
        x: { scale: scaleLinear().domain(span(tree.nodes.map((n) => n.x))), axis: false, grid: false },
        y: { scale: scaleLinear().domain(span(tree.nodes.map((n) => n.y))), axis: false, grid: false },
      },
      margin: { top: 28, right: 30, bottom: 16, left: 30 },
    });
  };
  const states = [[false, 'input order'], [true, 'sort: by label']] as const;
  lab(stage, { label: 'children', ariaLabel: 'An org chart tree', states, build, ms: 2200, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
