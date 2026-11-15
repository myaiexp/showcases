// sankeyDiagram align: left, right, center and justify place nodes in different columns
import { defineChart, link, mountChart, rect, text } from '@tanstack/charts';
import { d3Curve } from '@tanstack/charts/d3/shape';
import { sankeyDiagram, type SankeyAlignment } from '@tanstack/charts/network/sankey';
import { curveBumpX } from 'd3-shape';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { flowNodes, flows } from '../../shared/marks2-flow.ts';
import { createStage } from '../../shared/stage.ts';

const aligns: readonly SankeyAlignment[] = ['justify', 'left', 'right', 'center'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (align: SankeyAlignment) =>
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
          align,
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

  const options = (align: SankeyAlignment) => ({ definition: build(align), height: stage.height, ariaLabel: 'Sankey node alignment' });
  const host = stage.own(mountChart(stage.box, options('justify')));
  const show = (align: SankeyAlignment): void => {
    host.update(options(align));
    stage.say(`align: '${align}'. Nodes with no outgoing links sit in the last column only with justify.`);
  };
  if (stage.bar) select(stage.bar, 'align', aligns.map((a) => [a, a] as const), show);
  else stage.cycle(aligns, 1800, show);
  return () => stage.dispose();
};

export default mount;
