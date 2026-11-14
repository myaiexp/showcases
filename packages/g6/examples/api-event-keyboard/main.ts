// ContainerEvent.KEY_DOWN and KEY_UP are forwarded from the graph container, which has to be focused
import { ContainerEvent, Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { sleep } from '../../shared/behavior-sim.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 10, 3);
    // Key events only reach an element that can take focus.
    stage.container.tabIndex = 0;
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', data: lattice(4, 2, 64), node: { style: { size: 30 } }, autoFit: 'center' }),
    );
    graph.on(ContainerEvent.KEY_DOWN, (e: KeyboardEvent) => log(`${ContainerEvent.KEY_DOWN}  key "${e.key}" code ${e.code || '-'}${e.shiftKey ? ' +shift' : ''}`));
    graph.on(ContainerEvent.KEY_UP, (e: KeyboardEvent) => log(`${ContainerEvent.KEY_UP}  key "${e.key}"`));
    await graph.render();
    log('click the graph to focus it, then press keys');

    if (!stage.bar) {
      const keys = ['a', 'Shift', 'Enter', 'ArrowLeft'];
      stage.every(1000, async (i) => {
        const key = keys[(i - 1) % keys.length]!;
        stage.container.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
        await sleep(150);
        stage.container.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true }));
      });
    }
  });

export default mount;
