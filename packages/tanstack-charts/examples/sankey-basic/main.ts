// sankeyDiagram: a weighted graph laid out in plot pixels, drawn by ordinary link, rect and text marks
import { defineChart, link, mountChart, rect, text } from '@tanstack/charts';
import { d3Curve } from '@tanstack/charts/d3/shape';
import { sankeyDiagram } from '@tanstack/charts/network/sankey';
import { tooltip } from '@tanstack/charts/tooltip';
import { curveBumpX } from 'd3-shape';
import type { Mount } from '@/types.ts';
import { flowNodes, flows } from '../../shared/marks2-flow.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a flow or a node. Link thickness is the amount.' });

  const definition = defineChart({
    marks: [
      sankeyDiagram({
        nodes: flowNodes,
        links: flows,
        nodeKey: 'id',
        source: 'from',
        target: 'to',
        value: 'amount',
        inset: { top: 8, right: 70, bottom: 8, left: 8 },
        // The callback receives final-pixel rows, so the child marks need no scales.
        marks: ({ nodes, links }) =>
          [
            link(links, {
              x1: 'x1',
              y1: 'y1',
              x2: 'x2',
              y2: 'y2',
              key: 'key',
              color: (flow) => flow.sourceKey,
              strokeOpacity: 0.4,
              strokeWidth: (flow) => Math.max(1, flow.width),
              lineCap: 'butt',
              curve: d3Curve(curveBumpX),
            }),
            rect(nodes, { x1: 'x0', x2: 'x1', y1: 'y0', y2: 'y1', key: 'key', color: 'key', inset: 0 }),
            text(nodes, { x: 'x1', y: 'y', key: 'key', text: (node) => node.data.label, anchor: 'start', dx: 6 }),
          ] as const,
      }),
    ],
    scales: { x: null, y: null },
    guides: false,
    tooltip: {
      use: tooltip,
      // Nodes and links are both interactive: tell them apart by kind.
      format: (point) =>
        point.datum.kind === 'node'
          ? `${point.datum.data.label}: ${point.datum.value}`
          : `${point.datum.sourceNode.data.label} to ${point.datum.targetNode.data.label}: ${point.datum.value}`,
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Sankey diagram of energy flows' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
