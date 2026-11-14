// process-parallel-edges edges option: only the listed edge ids are bundled
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { parallelGraph } from '../../shared/transform-data.ts';

const SETS = { 'all edges': [], 'a-b only': ['ab-1', 'ab-2', 'ab-3'], 'b-c only': ['bc-1', 'bc-2'] } as const;
type SetName = keyof typeof SETS;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: parallelGraph(),
        node: { style: { size: 22, fill: '#5B8FF9', labelText: (d) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { stroke: '#F6BD16', lineWidth: 2 } },
        transforms: [{ key: 'parallel', type: 'process-parallel-edges', mode: 'bundle', distance: 24, edges: [] }],
      }),
    );
    await graph.render();

    // An empty list means every edge; edges outside the list stay straight and overlap.
    const setSet = async (name: SetName): Promise<void> => {
      graph.updateTransform({ key: 'parallel', edges: [...SETS[name]] });
      await graph.render();
    };
    const names = Object.keys(SETS) as SetName[];
    if (stage.bar) select(stage.bar, 'edges', names, 'all edges', (v) => void setSet(v));
    else stage.every(1600, (i) => setSet(names[i % names.length]!));
  });

export default mount;
