// Element lifecycle events: create, update and destroy fire for each element that draw() adds, changes or removes
import { Graph, GraphEvent, type IElementLifeCycleEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { button } from '../../shared/controls.ts';
import { ring } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 12, 3);
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', data: ring(4, 'n', 44), node: { style: { size: 26, labelText: (d) => d.id, labelPlacement: 'center' } }, autoFit: 'center' }),
    );
    await graph.render();
    // Added after the first render, so only the changes below are logged.
    const names = [GraphEvent.BEFORE_ELEMENT_CREATE, GraphEvent.AFTER_ELEMENT_CREATE, GraphEvent.BEFORE_ELEMENT_UPDATE, GraphEvent.AFTER_ELEMENT_UPDATE, GraphEvent.BEFORE_ELEMENT_DESTROY, GraphEvent.AFTER_ELEMENT_DESTROY];
    for (const name of names) graph.on(name, (e: IElementLifeCycleEvent) => log(`${name}  ${e.elementType} ${e.data.id ?? `${e.data['source']}-${e.data['target']}`}`));

    let extra = 0;
    const add = async (): Promise<void> => {
      graph.addNodeData([{ id: `x${++extra}`, style: { x: 0, y: 0 } }]);
      await graph.draw();
    };
    const update = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'n0', style: { fill: extra % 2 ? '#F6BD16' : '#E86452' } }]);
      await graph.draw();
    };
    const remove = async (): Promise<void> => {
      if (extra === 0) return;
      graph.removeNodeData([`x${extra--}`]);
      await graph.draw();
    };
    if (stage.bar) {
      button(stage.bar, 'addNodeData + draw', () => void add());
      button(stage.bar, 'updateNodeData + draw', () => void update());
      button(stage.bar, 'removeNodeData + draw', () => void remove());
    } else {
      const list = [add, update, remove];
      stage.every(1500, (i) => list[(i - 1) % 3]!());
    }
  });

export default mount;
