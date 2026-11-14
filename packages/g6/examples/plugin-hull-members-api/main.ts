// hull instance methods for editing its members
import { Graph } from '@antv/g6';
import type { Hull } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hullData } from '../../shared/plugin-data.ts';

const IDS = ['node-0', 'node-1', 'node-2', 'node-3', 'node-4', 'node-5', 'node-6'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hullData(),
        node: { style: { fill: '#ffd666' } },
        edge: { style: { stroke: '#8b9baf' } },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
        autoFit: 'view',
        padding: 24,
        plugins: [{ type: 'hull', key: 'hull', members: ['node-1', 'node-2'], labelText: 'Hull-a', fill: '#7e3feb', stroke: '#7e3feb', fillOpacity: 0.2 }],
      }),
    );
    await graph.render();

    const hull = graph.getPluginInstance<Hull>('hull');
    if (stage.bar) {
      const out = readout(el);
      const show = (): void => {
        out.textContent = `getMember() -> ${JSON.stringify(hull.getMember())}`;
      };
      show();
      let pick = 'node-3';
      select(stage.bar, 'node', IDS, pick, (v) => (pick = v));
      button(stage.bar, 'addMember', () => (hull.addMember(pick), show()));
      button(stage.bar, 'removeMember', () => (hull.removeMember(pick), show()));
      button(stage.bar, 'updateMember', () => (hull.updateMember((prev) => prev.slice(0, 1).concat(pick)), show()));
    } else {
      const adds = ['node-3', 'node-4', 'node-5', 'node-6'];
      stage.every(1000, (i) => {
        const id = adds[(i - 1) % adds.length]!;
        if (i % 8 < 4) hull.addMember(id);
        else hull.removeMember(id);
      });
    }
  });

export default mount;
