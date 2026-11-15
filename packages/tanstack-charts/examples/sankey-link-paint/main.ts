// sankey child marks: the same layout with links colored by source, by target, or one neutral color
import { defineChart, link, mountChart, rect, text } from '@tanstack/charts';
import { d3Curve } from '@tanstack/charts/d3/shape';
import { sankeyDiagram } from '@tanstack/charts/network/sankey';
import { curveBumpX, curveLinear } from 'd3-shape';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { flowNodes, flows } from '../../shared/marks2-flow.ts';
import { createStage } from '../../shared/stage.ts';

type Paint = 'source' | 'target' | 'none' | 'straight';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (paint: Paint) =>
    defineChart({
      marks: [
        sankeyDiagram({
          nodes: flowNodes,
          links: flows,
          nodeKey: 'id',
          source: 'from',
          target: 'to',
          value: 'amount',
          inset: { top: 8, right: 70, bottom: 8, left: 8 },
          // Link paint and curve live in the callback, beside the marks they style.
          marks: ({ nodes, links }) =>
            [
              link(links, {
                x1: 'x1',
                y1: 'y1',
                x2: 'x2',
                y2: 'y2',
                key: 'key',
                ...(paint === 'source' || paint === 'straight' ? { color: (f: (typeof links)[number]) => f.sourceKey } : {}),
                ...(paint === 'target' ? { color: (f: (typeof links)[number]) => f.targetKey } : {}),
                ...(paint === 'none' ? { stroke: '#94a3b8' } : {}),
                strokeOpacity: 0.45,
                strokeWidth: (f) => Math.max(1, f.width),
                lineCap: 'butt',
                curve: d3Curve(paint === 'straight' ? curveLinear : curveBumpX),
              }),
              rect(nodes, { x1: 'x0', x2: 'x1', y1: 'y0', y2: 'y1', key: 'key', color: 'key', inset: 0 }),
              text(nodes, { x: 'x1', y: 'y', key: 'key', text: (n) => n.data.label, anchor: 'start', dx: 6 }),
            ] as const,
        }),
      ],
      scales: { x: null, y: null },
      guides: false,
    });

  const options = (paint: Paint) => ({ definition: build(paint), height: stage.height, ariaLabel: 'Sankey link paint' });
  const host = stage.own(mountChart(stage.box, options('source')));
  const modes: readonly (readonly [Paint, string])[] = [['source', 'color by source'], ['target', 'color by target'], ['none', 'one color'], ['straight', 'straight links']];
  const show = (paint: Paint): void => host.update(options(paint));
  if (stage.bar) select(stage.bar, 'links', modes, show);
  else stage.cycle(modes.map((m) => m[0]), 1800, show);
  return () => stage.dispose();
};

export default mount;
