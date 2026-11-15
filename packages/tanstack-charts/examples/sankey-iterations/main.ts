// sankeyDiagram iterations: relaxation passes that untangle node positions
import { defineChart, link, mountChart, rect, text } from '@tanstack/charts';
import { d3Curve } from '@tanstack/charts/d3/shape';
import { sankeyDiagram } from '@tanstack/charts/network/sankey';
import { curveBumpX } from 'd3-shape';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { flowNodes, flows } from '../../shared/marks2-flow.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let iterations = 6;

  const build = () =>
    defineChart({
      svgAnimation: true,
      marks: [
        sankeyDiagram({
          nodes: flowNodes,
          links: flows,
          nodeKey: 'id',
          source: 'from',
          target: 'to',
          value: 'amount',
          iterations,
          nodePadding: 18,
          inset: { top: 8, right: 70, bottom: 8, left: 8 },
          marks: ({ nodes, links }) =>
            [
              link(links, { x1: 'x1', y1: 'y1', x2: 'x2', y2: 'y2', key: 'key', color: (f) => f.sourceKey, strokeOpacity: 0.4, strokeWidth: (f) => Math.max(1, f.width), lineCap: 'butt', curve: d3Curve(curveBumpX) }),
              rect(nodes, { x1: 'x0', x2: 'x1', y1: 'y0', y2: 'y1', key: 'key', color: 'key', inset: 0 }),
              text(nodes, { x: 'x1', y: 'y', key: 'key', text: (n) => n.data.label, anchor: 'start', dx: 6 }),
            ] as const,
        }),
      ],
      scales: { x: null, y: null },
      guides: false,
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Sankey relaxation passes' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`iterations: ${iterations}. Zero keeps the first placement; more passes shift nodes toward their neighbors.`);
  };
  refresh();
  if (stage.bar) slider(stage.bar, 'iterations', 0, 12, 1, iterations, (x) => { iterations = x; refresh(); });
  else stage.cycle([0, 1, 3, 6, 12], 1500, (n) => { iterations = n; refresh(); });
  return () => stage.dispose();
};

export default mount;
