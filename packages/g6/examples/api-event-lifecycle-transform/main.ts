// beforetransform and aftertransform fire for each viewport move, with the translate, scale or rotate in event.data
import { Graph, GraphEvent, type IViewportEvent } from '@antv/g6';
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
    const show = (name: string) => (e: IViewportEvent) => log(`${name}  ${JSON.stringify(e.data)}`);
    graph.on(GraphEvent.BEFORE_TRANSFORM, show('beforetransform'));
    graph.on(GraphEvent.AFTER_TRANSFORM, show('aftertransform'));

    const calls = {
      'translateBy([40, 0])': () => graph.translateBy([40, 0], false),
      'zoomBy(1.4)': () => graph.zoomBy(1.4, false),
      'rotateBy(30)': () => graph.rotateBy(30, false),
      'fitCenter()': () => graph.fitCenter(false),
      'zoomTo(1)': () => graph.zoomTo(1, false),
    };
    if (stage.bar) for (const [label, run] of Object.entries(calls)) button(stage.bar, label, () => void run());
    else {
      const list = Object.values(calls);
      stage.every(1300, (i) => list[(i - 1) % list.length]!());
    }
  });

export default mount;
