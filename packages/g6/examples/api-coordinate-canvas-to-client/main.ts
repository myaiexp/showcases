// A callout placed from getClientByCanvas, shown for the clicked node
import { Graph, GraphEvent, NodeEvent } from '@antv/g6';
import type { IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { fmt, gridData } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 3, 50] : [6, 4, 80];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 50, 45),
        node: { style: { size: 18, fill: '#3d4f78' } },
        edge: { style: { stroke: '#2f3d5c' } },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    const tip = document.createElement('div');
    tip.style.cssText =
      'position:absolute;padding:2px 6px;border-radius:4px;background:#ff7a45;color:#000;font:11px/1.4 ui-monospace,monospace;white-space:pre;pointer-events:none;z-index:3;transform:translate(-50%,-125%)';
    stage.container.append(tip);

    let target = 'n-1-1';
    const place = () => {
      const canvasPos = graph.getElementPosition(target);
      const client = graph.getClientByCanvas(canvasPos);
      // The callout lives inside the stage, so it needs the stage's own client offset removed.
      const r = stage.container.getBoundingClientRect();
      tip.style.left = `${client[0] - r.left}px`;
      tip.style.top = `${client[1] - r.top}px`;
      tip.textContent = `${target}\ncanvas ${fmt(canvasPos.slice(0, 2), 0)}\nclient ${fmt(client.slice(0, 2), 0)}`;
    };
    graph.on(GraphEvent.AFTER_TRANSFORM, place);
    place();

    if (stage.preview) {
      const ids = ['n-1-1', 'n-2-0', 'n-3-2', 'n-0-1'];
      stage.every(1000, (i) => {
        target = ids[i % ids.length]!;
        return graph.translateBy([i % 2 ? 10 : -10, 0], { duration: 400 });
      });
    } else {
      graph.on(NodeEvent.CLICK, (e: IElementEvent) => {
        target = String(e.target.id);
        place();
      });
    }
  });

export default mount;
