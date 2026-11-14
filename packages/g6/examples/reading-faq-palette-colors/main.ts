// FAQ: palette.color takes an array of colors (or a built-in palette name), not one color
import { Graph } from '@antv/g6';
import type { NodeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Variant = 'array of colors' | 'single string' | 'built-in blues';

// setNode replaces the whole node option, so each variant is a full object.
const nodeOptions = (v: Variant): NodeOptions => ({
  style: { size: 30, labelText: (d) => String(d.data?.['color']), labelPlacement: 'bottom' },
  palette: {
    field: 'color',
    color: v === 'array of colors' ? ['red', 'green', 'blue'] : v === 'single string' ? 'red' : 'blues',
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: ['a', 'b', 'c'].map((c, i) => ({ id: c, data: { color: c }, style: { x: 55 + i * 80, y: 90 } })),
          edges: [],
        },
        node: nodeOptions('array of colors'),
      }),
    );
    await graph.render();

    const apply = (v: Variant) => {
      graph.setNode(nodeOptions(v));
      return graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'palette.color', ['array of colors', 'single string', 'built-in blues'] as const, 'array of colors', (v) => void apply(v));
    } else {
      const variants: Variant[] = ['array of colors', 'single string', 'built-in blues'];
      stage.every(1400, (i) => apply(variants[i % variants.length]!));
    }
  });

export default mount;
