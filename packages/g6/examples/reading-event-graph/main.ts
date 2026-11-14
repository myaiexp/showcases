// Graph events: listen to the lifecycle of render, layout, draw and transform
import { Graph, GraphEvent } from '@antv/g6';
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
        data: ringData(stage.preview ? 6 : 10),
        node: { style: { size: 16 } },
        edge: { style: { stroke: '#4a5a78' } },
        layout: { type: 'circular' },
        autoFit: 'view',
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    const { log, clear } = lineLog(stage, el);
    for (const e of [
      GraphEvent.AFTER_ELEMENT_CREATE,
      GraphEvent.AFTER_LAYOUT,
      GraphEvent.AFTER_DRAW,
      GraphEvent.AFTER_RENDER,
      GraphEvent.AFTER_TRANSFORM,
    ]) {
      graph.on(e, () => log(e));
    }
    await graph.render();

    if (stage.bar) {
      button(stage.bar, 'render()', () => void graph.render());
      button(stage.bar, 'layout()', () => void graph.layout());
      button(stage.bar, 'zoomBy(1.2)', () => void graph.zoomBy(1.2, false));
      button(stage.bar, 'clear log', clear);
    } else {
      stage.every(1500, (i) => (i % 2 ? graph.zoomBy(i % 4 === 1 ? 1.2 : 0.83, false) : graph.layout()));
    }
  });

export default mount;
