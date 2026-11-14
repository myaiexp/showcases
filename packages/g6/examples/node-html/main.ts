// HTML nodes: innerHTML as a function of the datum, placed with dx and dy
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const STATUSES = ['error', 'overload', 'running'] as const;
type Status = (typeof STATUSES)[number];
const ICON: Record<Status, string> = { error: '&#10060;', overload: '&#9889;', running: '&#9989;' };
const COLOR: Record<Status, string> = { error: '#f5222d', overload: '#faad14', running: '#52c41a' };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 10,
        data: {
          nodes: [
            { id: 'node-1', style: { x: 0, y: 0 }, data: { location: 'East', status: 'error', ip: '192.168.1.2' } },
            { id: 'node-2', style: { x: 0, y: 90 }, data: { location: 'West', status: 'overload', ip: '192.168.1.3' } },
            { id: 'node-3', style: { x: 0, y: 180 }, data: { location: 'South', status: 'running', ip: '192.168.1.4' } },
          ],
        },
        node: {
          type: 'html',
          style: {
            size: [240, 70],
            // The HTML box's origin is its top-left corner; dx and dy pull it back over the node centre.
            dx: -120,
            dy: -35,
            innerHTML: (d: NodeData) => {
              const { location, status, ip } = d.data as { location: string; status: Status; ip: string };
              const color = COLOR[status];
              return `
<div style="width:100%; height:100%; box-sizing:border-box; background:${color}bb; border:1px solid ${color}; color:#fff; user-select:none; display:flex; padding:10px; border-radius:8px;">
  <div style="display:flex; flex-direction:column; flex:1;">
    <div style="font-weight:bold; font-size:14px;">${location} Node</div>
    <div style="font-size:12px; margin-top:4px;">${ICON[status]} ${status}</div>
  </div>
  <div><span style="border:1px solid white; padding:2px 6px; border-radius:4px; font-size:12px;">${ip}</span></div>
</div>`;
            },
          },
        },
        behaviors: stage.preview ? [] : ['drag-element', 'zoom-canvas'],
      }),
    );
    await graph.render();

    // Cycling a node's status rebuilds its HTML from the new data.
    stage.every(1300, (i) => {
      const id = `node-${(i % 3) + 1}`;
      const cur = graph.getNodeData(id).data as { status: Status };
      const status = STATUSES[(STATUSES.indexOf(cur.status) + 1) % 3]!;
      graph.updateNodeData([{ id, data: { ...cur, status } }]);
      return graph.draw();
    });
  });

export default mount;
