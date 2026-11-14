// getPluginInstance gives access to a plugin's own methods
import { Graph } from '@antv/g6';
import type { BubbleSets } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: 30,
        plugins: [{ type: 'bubble-sets', key: 'set', members: ['node-0', 'node-1'], label: false }],
      }),
    );
    await graph.render();

    const set = (): BubbleSets => graph.getPluginInstance<BubbleSets>('set');
    const order = ['node-2', 'node-3', 'node-4', 'node-5'];
    if (stage.bar) {
      const out = readout(el);
      const show = (): void => {
        out.textContent = `getMember() -> ${JSON.stringify(set().getMember())}`;
      };
      show();
      let next = 0;
      button(stage.bar, 'addMember', () => {
        set().addMember(order[next++ % order.length]!);
        show();
      });
      button(stage.bar, 'removeMember', () => {
        set().removeMember(order[--next < 0 ? (next = order.length - 1) : next]!);
        show();
      });
    } else {
      stage.every(1200, (i) => {
        const id = order[(i - 1) % order.length]!;
        if (i % 8 < 4) set().addMember(id);
        else set().removeMember(id);
      });
    }
  });

export default mount;
