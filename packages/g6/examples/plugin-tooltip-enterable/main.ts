// tooltip enterable: the pointer may move onto the tooltip's own button
import { Graph, Tooltip } from '@antv/g6';
import type { ElementDatum, IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { elementEvent } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const out = stage.bar ? readout(el) : null;
    if (out) out.textContent = 'Hover a node, then move onto the tooltip and press its button.';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', style: { x: 100, y: 100 }, data: { name: 'User A', email: 'usera@example.com' } },
            { id: 'node2', style: { x: 250, y: 100 }, data: { name: 'User B', email: 'userb@example.com' } },
          ],
        },
        node: { style: { fill: '#7e3feb', size: 28, labelText: (d) => String(d.data?.name), labelFill: '#fff', labelPlacement: 'bottom' } },
        autoFit: 'center',
        plugins: [
          {
            type: 'tooltip',
            key: 'tip',
            enterable: true,
            getContent: async (_e: IElementEvent, items: ElementDatum[]) => {
              const box = document.createElement('div');
              box.style.color = '#333';
              box.innerHTML = `<div><b>${items[0]?.data?.name}</b></div><div>${items[0]?.data?.email}</div>`;
              const btn = document.createElement('button');
              btn.textContent = 'Send mail';
              btn.style.marginTop = '6px';
              btn.addEventListener('click', () => {
                if (out) out.textContent = `Send mail to ${items[0]?.data?.email}`;
              });
              box.append(btn);
              return box;
            },
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const tip = graph.getPluginInstance<Tooltip>('tip');
      stage.every(1300, (i) => (i % 2 ? tip.show(elementEvent(graph, `node${(i >> 1) % 2 + 1}`)) : tip.hide()));
    }
  });

export default mount;
