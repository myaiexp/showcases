// getTransforms and setTransforms: replace the list, or extend it with a (prev) => next function
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const nodes = ['a', 'b', 'c', 'd', 'e'].map((id, i) => ({ id, style: { x: 40 + i * 55, y: 100 + (i % 2) * 25 } }));
const edges = [
  { id: 'ab-1', source: 'a', target: 'b' },
  { id: 'ab-2', source: 'a', target: 'b' },
  { id: 'bc', source: 'b', target: 'c' },
  { id: 'cd-1', source: 'c', target: 'd' },
  { id: 'cd-2', source: 'c', target: 'd' },
  { id: 'ce', source: 'c', target: 'e' },
  { id: 'ae', source: 'a', target: 'e' },
];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: { nodes, edges },
        node: { style: { size: 22, fill: '#5B8FF9', labelText: (d) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { stroke: '#F6BD16', lineWidth: 2 } },
      }),
    );
    await graph.render();

    const out = stage.bar ? readout(el) : null;
    const show = (): void => {
      if (out) out.textContent = `graph.getTransforms() => ${JSON.stringify(graph.getTransforms().map((t) => (typeof t === 'function' ? 'fn' : typeof t === 'string' ? t : t.type)))}`;
    };
    // Replaces every existing transform.
    const replace = async (): Promise<void> => {
      graph.setTransforms(['process-parallel-edges']);
      await graph.render();
      show();
    };
    // Functional form: keeps what is there and adds one more.
    const extend = async (): Promise<void> => {
      graph.setTransforms((prev) => [...prev, { type: 'map-node-size', key: 'size', minSize: 16, maxSize: 44, centrality: { type: 'degree' } }]);
      await graph.render();
      show();
    };
    const clear = async (): Promise<void> => {
      graph.setTransforms([]);
      await graph.render();
      show();
    };
    show();

    if (stage.bar) {
      button(stage.bar, "setTransforms(['process-parallel-edges'])", () => void replace());
      button(stage.bar, 'setTransforms(prev => [...prev, map-node-size])', () => void extend());
      button(stage.bar, 'setTransforms([])', () => void clear());
    } else {
      const steps = [replace, extend, clear];
      stage.every(1500, (i) => steps[i % 3]!());
    }
  });

export default mount;
