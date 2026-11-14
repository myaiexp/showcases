// HTML node cards with buttons: innerHTML as an HTMLElement with listeners
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Status = 'online' | 'warning' | 'offline';
type Server = { name: string; cpu: number; status: Status };
const COLOR: Record<Status, string> = { online: '#52c41a', warning: '#faad14', offline: '#f5222d' };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    if (log) log.textContent = 'Press Restart or Monitor on a card.';

    const build = (d: NodeData): HTMLElement => {
      const s = d.data as unknown as Server;
      const root = document.createElement('div');
      root.style.cssText = `width:100%;height:100%;box-sizing:border-box;background:#fff;border:1px solid #d9d9d9;border-left:5px solid ${COLOR[s.status]};border-radius:8px;padding:10px;font:12px sans-serif;color:#262626;`;
      const head = document.createElement('div');
      head.innerHTML = `<b style="font-size:14px">${s.name}</b> <span style="color:${COLOR[s.status]}">${s.status}</span><br>cpu ${s.cpu}%`;
      const row = document.createElement('div');
      row.style.marginTop = '6px';
      // Listeners go on the elements themselves, so no window globals are needed.
      for (const [label, act] of [['Restart', 'restart'], ['Monitor', 'monitor']] as const) {
        const b = document.createElement('button');
        b.textContent = label;
        b.style.cssText = 'margin-right:6px;padding:2px 8px;border:1px solid #1890ff;color:#1890ff;background:#fff;border-radius:4px;cursor:pointer;';
        b.addEventListener('click', () => {
          if (log) log.textContent = `${act} ${s.name}`;
          if (act === 'restart') {
            graph.updateNodeData([{ id: d.id, data: { ...s, status: 'online', cpu: 5 } }]);
            void graph.draw();
          }
        });
        row.append(b);
      }
      root.append(head, row);
      return root;
    };

    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 10,
        data: {
          nodes: [
            { id: 's1', style: { x: 0, y: 0 }, data: { name: 'Web Server', cpu: 45, status: 'online' } },
            { id: 's2', style: { x: stage.preview ? 0 : 230, y: stage.preview ? 85 : 0 }, data: { name: 'Database', cpu: 89, status: 'warning' } },
            { id: 's3', style: { x: stage.preview ? 0 : 460, y: stage.preview ? 170 : 0 }, data: { name: 'Cache Server', cpu: 0, status: 'offline' } },
          ],
        },
        node: { type: 'html', style: { size: [190, 74], dx: -95, dy: -37, innerHTML: build } },
      }),
    );
    await graph.render();

    // A card has no pointer: the server states cycle on their own instead.
    const order: Status[] = ['online', 'warning', 'offline'];
    if (stage.preview) stage.every(1300, (i) => {
      const id = `s${(i % 3) + 1}`;
      const cur = graph.getNodeData(id).data as unknown as Server;
      graph.updateNodeData([{ id, data: { ...cur, status: order[(order.indexOf(cur.status) + 1) % 3]!, cpu: (cur.cpu + 37) % 100 } }]);
      return graph.draw();
    });
  });

export default mount;
