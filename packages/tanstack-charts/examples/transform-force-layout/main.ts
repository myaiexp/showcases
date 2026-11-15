// forceLayout: a stopped simulation returned as plain rows for link and dot marks
import { defineChart, dot, link, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { forceLayout } from '@tanstack/charts/network/force';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { people, ties } from '../../shared/xform-graph.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Stronger repulsion pushes the groups apart.' });

  const options = (strength: number) => {
    const graph = forceLayout(people, ties, {
      nodeKey: 'id',
      source: 'from',
      target: 'to',
      iterations: 300,
      domainPadding: 0.2,
      forces: [
        { type: 'link', distance: 30 },
        { type: 'manyBody', strength },
        { type: 'center', x: 0, y: 0 },
        { type: 'collide', radius: 6 },
      ],
    });
    return {
      definition: defineChart({
        marks: [
          link(graph.links, { x1: 'x1', y1: 'y1', x2: 'x2', y2: 'y2', stroke: '#64748b', strokeOpacity: 0.7 }),
          dot(graph.nodes, { x: 'x', y: 'y', color: 'group', r: 6 }),
        ],
        scales: {
          x: { scale: scaleLinear().domain([...graph.xDomain]), axis: false, grid: false },
          y: { scale: scaleLinear().domain([...graph.yDomain]), axis: false, grid: false },
        },
        margin: 8,
      }),
      height: stage.height,
      ariaLabel: 'A settled force layout',
    };
  };
  const host = stage.own(mountChart(stage.box, options(-60)));
  const show = (s: number): void => {
    host.update(options(s));
    stage.say(`manyBody strength ${s}`);
  };
  show(-60);
  if (stage.bar) slider(stage.bar, 'manyBody strength', -200, -10, 5, -60, show);
  else stage.cycle([-20, -60, -140], 1800, show);
  return () => stage.dispose();
};

export default mount;
