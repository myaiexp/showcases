// treeLayout from dotted paths: nodes and links, with the root on any of four sides
import { defineChart, dot, link, text } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { treeLayout } from '@tanstack/charts/hierarchy/tree';
import type { TreeOrientation } from '@tanstack/charts/hierarchy/tree';
import type { Mount } from '@/types.ts';
import { lab } from '../../shared/xform-lab.ts';
import { modules } from '../../shared/xform-graph.ts';
import { createStage } from '../../shared/stage.ts';

// Node positions are semantic units: the scale domain is their extent plus half a unit.
const span = (values: number[]): [number, number] => [Math.min(...values) - 0.5, Math.max(...values) + 0.5];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (orientation: TreeOrientation) => {
    const tree = treeLayout(modules, { path: 'name', delimiter: '.', orientation, nodeSize: [1, 1] });
    return defineChart({
      marks: [
        link(tree.links, { x1: 'x1', y1: 'y1', x2: 'x2', y2: 'y2', stroke: '#64748b', strokeWidth: 1.5 }),
        dot(tree.nodes, { x: 'x', y: 'y', color: (n) => (n.internal ? 'branch' : 'leaf'), r: 5 }),
        text(tree.nodes, { x: 'x', y: 'y', text: 'name', dy: -10, fill: 'currentColor' }),
      ],
      scales: {
        x: { scale: scaleLinear().domain(span(tree.nodes.map((n) => n.x))), axis: false, grid: false },
        y: { scale: scaleLinear().domain(span(tree.nodes.map((n) => n.y))), axis: false, grid: false },
      },
      margin: { top: 24, right: 40, bottom: 24, left: 40 },
    });
  };
  const states = (['left', 'right', 'top', 'bottom'] as const).map((o) => [o, `orientation: '${o}'`] as const);
  lab(stage, { label: 'orientation', ariaLabel: 'A module tree', states, build, ms: 2000, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
