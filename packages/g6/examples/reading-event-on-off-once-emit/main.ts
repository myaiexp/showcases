// The four event methods on one custom event name
import { Graph } from '@antv/g6';
import type { IEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lineLog, ringData } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ringData(6),
        node: { style: { size: 16 } },
        edge: { style: { stroke: '#4a5a78' } },
        layout: { type: 'circular' },
        autoFit: 'view',
      }),
    );
    await graph.render();
    const { log } = lineLog(stage, el, 12);
    let n = 0;
    const handler = (e: IEvent) => log(`on handler got ${JSON.stringify(e)}`);
    const onceHandler = (e: IEvent) => log(`once handler got ${JSON.stringify(e)}`);
    const emit = () => {
      log(`emit('showcase:ping', { n: ${++n} })`);
      graph.emit('showcase:ping', { n });
    };

    if (stage.bar) {
      button(stage.bar, "on('showcase:ping')", () => {
        graph.on('showcase:ping', handler);
        log('on: handler added (adding it twice calls it twice)');
      });
      button(stage.bar, "once('showcase:ping')", () => {
        graph.once('showcase:ping', onceHandler);
        log('once: one-shot handler added');
      });
      button(stage.bar, 'emit', emit);
      button(stage.bar, 'off(name, handler)', () => {
        graph.off('showcase:ping', handler);
        log('off: handler removed');
      });
      button(stage.bar, 'off()', () => {
        graph.off();
        log('off(): every listener removed, including the graph\'s own');
      });
    } else {
      graph.on('showcase:ping', handler);
      graph.once('showcase:ping', onceHandler);
      stage.every(1000, (i) => {
        const k = i % 8;
        if (k === 6) {
          graph.off('showcase:ping', handler);
          log('off: handler removed');
        } else if (k === 0) {
          graph.on('showcase:ping', handler);
          graph.once('showcase:ping', onceHandler);
          log('on + once added again');
        } else emit();
      });
    }
  });

export default mount;
