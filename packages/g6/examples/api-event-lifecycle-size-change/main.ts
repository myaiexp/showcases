// beforesizechange and aftersizechange fire when resize() changes the canvas size
import { Graph, GraphEvent, type IGraphLifeCycleEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { button } from '../../shared/controls.ts';
import { ring } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 12, 3);
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', data: ring(6, 'n', 48), node: { style: { size: 26 } }, autoFit: 'center' }),
    );
    await graph.render();
    for (const name of [GraphEvent.BEFORE_SIZE_CHANGE, GraphEvent.AFTER_SIZE_CHANGE]) {
      graph.on(name, (e: IGraphLifeCycleEvent) => log(`${name}  ${JSON.stringify(e.data ?? {})}`));
    }

    const [w, h] = graph.getSize();
    let small = false;
    const toggle = async (): Promise<void> => {
      small = !small;
      graph.resize(small ? Math.round(w * 0.6) : w, small ? Math.round(h * 0.7) : h);
    };
    if (stage.bar) button(stage.bar, 'resize(smaller / full)', () => void toggle());
    else stage.every(1800, toggle);
  });

export default mount;
