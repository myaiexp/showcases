// forceLayout with a named custom force: a radial ring per group
import { defineChart, dot, link, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { forceLayout } from '@tanstack/charts/network/force';
import type { ForceFactoryDescriptor, ForceLayoutWorkingNode } from '@tanstack/charts/network/force';
import { forceRadial } from 'd3';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { people, ties, type Person, type Tie } from '../../shared/xform-graph.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const radii: Record<string, number> = { red: 30, blue: 80, green: 130 };
  const groupOf = new Map(people.map((p) => [p.id, p.group]));
  // create() gets the private working nodes and a nodeKey accessor; it returns any D3 force.
  const rings: ForceFactoryDescriptor<Person, Tie> = {
    type: 'custom',
    name: 'rings',
    create: ({ nodeKey }) => forceRadial<ForceLayoutWorkingNode<Person>>((node, i) => radii[groupOf.get(String(nodeKey(node, i)))!]!, 0, 0).strength(0.8),
  };

  const options = (radial: boolean) => {
    const graph = forceLayout(people, ties, {
      nodeKey: 'id',
      source: 'from',
      target: 'to',
      iterations: 300,
      domainPadding: 0.1,
      forces: [
        { type: 'link', distance: 30, strength: 0.1 },
        { type: 'manyBody', strength: -30 },
        { type: 'collide', radius: 7 },
        ...(radial ? [rings] : []),
      ],
    });
    return {
      definition: defineChart({
        marks: [
          link(graph.links, { x1: 'x1', y1: 'y1', x2: 'x2', y2: 'y2', stroke: '#64748b', strokeOpacity: 0.5 }),
          dot(graph.nodes, { x: 'x', y: 'y', color: 'group', r: 6 }),
        ],
        scales: {
          x: { scale: scaleLinear().domain([...graph.xDomain]), axis: false, grid: false },
          y: { scale: scaleLinear().domain([...graph.yDomain]), axis: false, grid: false },
        },
        margin: 8,
      }),
      height: stage.height,
      ariaLabel: 'A force layout with and without a radial force',
    };
  };
  const host = stage.own(mountChart(stage.box, options(true)));
  const show = (on: boolean): void => {
    host.update(options(on));
    stage.say(on ? "custom force 'rings': forceRadial by group" : 'built-in forces only');
  };
  show(true);
  if (stage.bar) checkbox(stage.bar, 'radial rings', true, show);
  else stage.cycle([true, false], 2200, show);
  return () => stage.dispose();
};

export default mount;
