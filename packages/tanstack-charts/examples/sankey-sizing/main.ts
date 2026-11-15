// sankeyDiagram nodeWidth, nodePadding and inset: pixel numbers or functions of the final chart bounds
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
  const v = { width: 4, padding: 8, inset: 8 };

  const build = () =>
    defineChart({
      marks: [
        sankeyDiagram({
          nodes: flowNodes,
          links: flows,
          nodeKey: 'id',
          source: 'from',
          target: 'to',
          value: 'amount',
          // Percent of the final width, never narrower than 8px.
          nodeWidth: ({ width }) => Math.max(8, (width * v.width) / 100),
          nodePadding: v.padding,
          inset: { top: v.inset, right: 70, bottom: v.inset, left: v.inset },
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

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Sankey spacing options' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`nodeWidth ${v.width}% of width, nodePadding ${v.padding}px, inset ${v.inset}px`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'nodeWidth', 1, 12, 0.5, v.width, (x) => { v.width = x; refresh(); }, (x) => `${x}%`);
    slider(stage.bar, 'nodePadding', 0, 40, 1, v.padding, (x) => { v.padding = x; refresh(); }, (x) => `${x}px`);
    slider(stage.bar, 'inset', 0, 40, 2, v.inset, (x) => { v.inset = x; refresh(); }, (x) => `${x}px`);
  } else {
    stage.cycle([[4, 8, 8], [8, 24, 16], [2, 2, 4], [6, 14, 8]] as const, 1700, ([w, p, i]) => { Object.assign(v, { width: w, padding: p, inset: i }); refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
