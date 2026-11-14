// tooltip getContent: different HTML for nodes and for edges
import { Graph, Tooltip } from '@antv/g6';
import type { ElementDatum, IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { elementEvent } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', style: { x: 100, y: 100 }, data: { name: 'Server A', type: 'Application Server', status: 'Running', cpu: '45%' } },
            { id: 'node2', style: { x: 250, y: 100 }, data: { name: 'Database B', type: 'MySQL Database', status: 'Normal', connections: 23 } },
          ],
          edges: [{ id: 'link', source: 'node1', target: 'node2', data: { bandwidth: '1Gbps', latency: '5ms' } }],
        },
        node: { style: { fill: '#7e3feb', size: 28, labelText: (d) => String(d.data?.name), labelFill: '#fff' } },
        edge: { style: { stroke: '#8b9baf', lineWidth: 2 } },
        autoFit: 'center',
        plugins: [
          {
            type: 'tooltip',
            key: 'tip',
            getContent: async (e: IElementEvent, items: ElementDatum[]) => {
              const d = items[0]?.data ?? {};
              if (e.targetType === 'node') {
                const ok = d.status === 'Running' || d.status === 'Normal';
                return (
                  `<div><h4 style="margin:0 0 8px;color:#333;border-bottom:1px solid #eee;padding-bottom:4px">${d.name}</h4>` +
                  `<div style="color:#666"><b>Type:</b> ${d.type}</div>` +
                  `<div style="color:#666"><b>Status:</b> <span style="color:${ok ? '#52c41a' : '#ff4d4f'}">${d.status}</span></div>` +
                  (d.cpu ? `<div style="color:#666"><b>CPU:</b> ${d.cpu}</div>` : '') +
                  (d.connections ? `<div style="color:#666"><b>Connections:</b> ${d.connections}</div>` : '') +
                  `</div>`
                );
              }
              if (e.targetType === 'edge') {
                return `<div><h4 style="margin:0 0 8px;color:#333">Connection</h4><div style="color:#666"><b>Bandwidth:</b> ${d.bandwidth}</div><div style="color:#666"><b>Latency:</b> ${d.latency}</div></div>`;
              }
              return 'No information available';
            },
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const ids = ['node1', 'link', 'node2'];
      const tip = graph.getPluginInstance<Tooltip>('tip');
      stage.every(1300, (i) => (i % 2 ? tip.show(elementEvent(graph, ids[(i >> 1) % ids.length]!)) : tip.hide()));
    }
  });

export default mount;
