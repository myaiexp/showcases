// The event object of a click: target, targetType, originalTarget, currentTarget, originalEvent and coordinates
import { CommonEvent, Graph, type IPointerEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick } from '../../shared/behavior-sim.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 12, 3);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 2, 64),
        node: { style: { size: 36, labelText: (d) => d.id, labelPlacement: 'center' } },
        autoFit: 'center',
      }),
    );
    const r = (n: number | undefined): number => Math.round(n ?? 0);
    graph.on(CommonEvent.CLICK, (e: IPointerEvent) => {
      const original = e.originalTarget as { nodeName?: string };
      const current = e.currentTarget as { nodeName?: string } | undefined;
      const lines = [
        `targetType      ${e.targetType}`,
        `target.id       ${(e.target as { id?: string }).id ?? '(document)'}`,
        `originalTarget  ${original.nodeName ?? '?'}`,
        `currentTarget   ${current?.nodeName ?? '?'}`,
        `originalEvent   ${(e.originalEvent as Event | undefined)?.type ?? '?'}`,
        `canvas  (${r(e.canvas?.x)}, ${r(e.canvas?.y)})   viewport (${r(e.viewport?.x)}, ${r(e.viewport?.y)})   client (${r(e.client?.x)}, ${r(e.client?.y)})`,
      ];
      // One log entry per field in the card would scroll out of sight; it gets the short form.
      if (stage.bar) lines.forEach((l) => log(l));
      else log(`${e.targetType} ${(e.target as { id?: string }).id ?? ''}  canvas (${r(e.canvas?.x)}, ${r(e.canvas?.y)})`);
    });
    await graph.render();
    log('click a node or the background');

    if (!stage.bar) {
      const spots = [cell(0, 1, 64), [32, 32], cell(1, 2, 64), [96, 32]] as [number, number][];
      stage.every(1200, (i) => simClick(stage, graph, spots[(i - 1) % spots.length]!));
    }
  });

export default mount;
