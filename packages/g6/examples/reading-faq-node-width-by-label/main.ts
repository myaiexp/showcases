// FAQ: size callback that measures the label with a 2D context (memoized per text and font)
import { Graph } from '@antv/g6';
import type { NodeData, NodeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const ctx2d = document.createElement('canvas').getContext('2d')!;
const cache = new Map<string, number>();
// The docs' memoized measureTextWidth, with a Map in place of lodash-style memoize.
function measureTextWidth(text: string, fontSize: number): number {
  const key = `${fontSize}|${text}`;
  let w = cache.get(key);
  if (w === undefined) {
    ctx2d.font = `${fontSize}px sans-serif`;
    w = ctx2d.measureText(text).width;
    cache.set(key, w);
  }
  return w;
}

const nodeOptions = (fontSize: number): NodeOptions => ({
  type: 'rect',
  style: {
    size: (d: NodeData): [number, number] => [measureTextWidth(String(d.data?.['name']), fontSize) + 24, 34],
    radius: 6,
    labelText: (d: NodeData) => String(d.data?.['name']),
    labelFontSize: fontSize,
    labelPlacement: 'center',
    labelFill: '#000',
    fill: '#9cc1ff',
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const names = ['G6', 'Graph', 'Interaction', 'A rather long label'];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: names.map((name, i) => ({ id: name, data: { name }, style: { x: 130, y: 30 + i * 46 } })),
          edges: [],
        },
        node: nodeOptions(14),
      }),
    );
    await graph.render();

    const apply = (size: number) => {
      graph.setNode(nodeOptions(size));
      return graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'font size', ['10', '14', '18', '22'] as const, '14', (v) => void apply(Number(v)));
    } else {
      const sizes = [14, 10, 18, 12];
      stage.every(1300, (i) => apply(sizes[i % sizes.length]!));
    }
  });

export default mount;
