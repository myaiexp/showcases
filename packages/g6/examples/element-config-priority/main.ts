// A fill in data, in new Graph({ node }) and through setNode: the instance method wins, data loses
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            // Fill in the data: red.
            { id: 'data', style: { x: 60, y: 60, fill: '#ff6b6b' } },
            // Nothing in the data: takes the graph option, then setNode.
            { id: 'option', style: { x: 200, y: 60 } },
          ],
        },
        // Fill in the graph options: blue, for every node without a fill of its own.
        node: { style: { size: 40, fill: '#4dabf7', labelText: (d) => d.id } },
        autoFit: 'view',
        padding: [40, 160, 40, 160],
      }),
    );
    await graph.render();

    // setNode replaces the node options at runtime, like the options page's setOptions({ node }).
    const set = async (fill: string): Promise<void> => {
      graph.setNode({ style: { size: 40, fill, labelText: (d) => d.id } });
      await graph.draw();
    };
    if (stage.bar) {
      readout(el).textContent = 'Node "data" has fill red in its data, yet both nodes are blue: the fill in new Graph({ node }) wins over the data.\nsetNode then wins over both (the order the Element Overview gives: instance method, graph options, data).';
      button(stage.bar, "setNode fill: 'green'", () => void set('#51cf66'));
      button(stage.bar, "setNode fill: '#4dabf7'", () => void set('#4dabf7'));
    } else {
      stage.every(1500, (i) => set(i % 2 ? '#4dabf7' : '#51cf66'));
    }
  });

export default mount;
