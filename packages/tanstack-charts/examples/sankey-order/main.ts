// sankeyDiagram nodeSort and linkSort: null keeps input order, comparators order by value
import { defineChart, link, mountChart, rect, text } from '@tanstack/charts';
import { d3Curve } from '@tanstack/charts/d3/shape';
import { sankeyDiagram } from '@tanstack/charts/network/sankey';
import { curveBumpX } from 'd3-shape';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { flowNodes, flows } from '../../shared/marks2-flow.ts';
import { createStage } from '../../shared/stage.ts';

type Order = 'default' | 'input' | 'largest' | 'smallest';
type Valued = { readonly value: number };
const largest = { nodeSort: (a: Valued, b: Valued) => b.value - a.value, linkSort: (a: Valued, b: Valued) => b.value - a.value };
const smallest = { nodeSort: (a: Valued, b: Valued) => a.value - b.value, linkSort: (a: Valued, b: Valued) => a.value - b.value };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (order: Order) =>
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
          // undefined leaves D3's order; null keeps the order of the input rows.
          ...(order === 'input' ? { nodeSort: null, linkSort: null } : {}),
          ...(order === 'largest' ? largest : {}),
          ...(order === 'smallest' ? smallest : {}),
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

  const options = (order: Order) => ({ definition: build(order), height: stage.height, ariaLabel: 'Sankey ordering' });
  const host = stage.own(mountChart(stage.box, options('default')));
  const modes: readonly (readonly [Order, string])[] = [['default', 'layout default'], ['input', 'input order (null)'], ['largest', 'largest first'], ['smallest', 'smallest first']];
  const show = (order: Order): void => host.update(options(order));
  if (stage.bar) select(stage.bar, 'node and link order', modes, show);
  else stage.cycle(modes.map((m) => m[0]), 1800, show);
  return () => stage.dispose();
};

export default mount;
