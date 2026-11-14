// clear() empties the canvas, render() restores the data
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { hud, ringData } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = ringData(stage.preview ? 8 : 14);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: { style: { size: 16 } },
        edge: { style: { stroke: '#4a5a78' } },
        layout: { type: 'circular' },
        autoFit: 'view',
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    const count = () => `nodes ${graph.getNodeData().length}, edges ${graph.getEdgeData().length}`;
    show(count());
    const clear = async () => {
      await graph.clear();
      show(`clear(): ${count()}`);
    };
    const restore = async () => {
      graph.setData(structuredClone(data));
      await graph.render();
      show(`setData + render(): ${count()}`);
    };

    if (stage.bar) {
      button(stage.bar, 'clear()', () => void clear());
      button(stage.bar, 'setData + render()', () => void restore());
    } else {
      stage.every(1600, (i) => (i % 2 ? clear() : restore()));
    }
  });

export default mount;
