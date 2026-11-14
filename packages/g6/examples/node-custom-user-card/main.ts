// User card node: avatar, status dot, name and role from several shapes
import { ExtensionCategory, Graph, Rect, register, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { avatar } from '../../shared/images.ts';

type Attrs = NonNullable<Parameters<Rect['render']>[0]> & { avatarUrl?: string; username?: string; userRole?: string; status?: string };
type Container = NonNullable<Parameters<Rect['render']>[1]>;
const STATUS_COLOR: Record<string, string> = { online: '#52c41a', busy: '#faad14', offline: '#8c8c8c' };

class UserCardNode extends Rect {
  override render(attributes: Attrs = this.parsedAttributes as Attrs, container: Container = this): void {
    super.render(attributes, container);
    const [width = 0, height = 0] = this.getSize(attributes);
    const left = -width / 2;
    const top = -height / 2;
    if (attributes.avatarUrl) {
      // A rounded image: radius half the side makes it a circle.
      this.upsert('avatar', 'image', { x: left + 8, y: top + 10, width: 30, height: 30, src: attributes.avatarUrl, radius: 15 }, container);
    }
    this.upsert('status', 'circle', { cx: width / 2 - 12, cy: top + 12, r: 4, fill: STATUS_COLOR[attributes.status ?? 'offline'], stroke: '#fff', lineWidth: 2 }, container);
    this.upsert('username', 'text', { x: left + 46, y: top + 18, text: attributes.username || '', fontSize: 14, fill: '#262626', fontWeight: 'bold', textAlign: 'left', textBaseline: 'middle' }, container);
    this.upsert('role', 'text', { x: left + 46, y: top + 35, text: attributes.userRole || '', fontSize: 11, fill: '#8c8c8c', textAlign: 'left', textBaseline: 'middle' }, container);
  }
}

register(ExtensionCategory.NODE, 'showcase-node-user-card', UserCardNode);

const STATUSES = ['online', 'busy', 'offline'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: {
          nodes: [
            { id: 'u1', style: { x: 90, y: 40 }, data: { name: 'Zhang Xiaoming', role: 'Frontend Engineer', status: 'online', avatar: avatar(0) } },
            { id: 'u2', style: { x: 90, y: 110 }, data: { name: 'Li Hua', role: 'Designer', status: 'busy', avatar: avatar(2) } },
          ],
        },
        node: {
          type: 'showcase-node-user-card',
          style: {
            size: [170, 50],
            fill: '#ffffff',
            stroke: '#d9d9d9',
            lineWidth: 1,
            radius: 6,
            labelText: '', // the card draws its own text
            avatarUrl: (d: NodeData) => String(d.data?.avatar),
            username: (d: NodeData) => String(d.data?.name),
            userRole: (d: NodeData) => String(d.data?.role),
            status: (d: NodeData) => String(d.data?.status),
          },
        },
      }),
    );
    await graph.render();

    const setStatus = async (id: string, status: string): Promise<void> => {
      graph.updateNodeData([{ id, data: { ...graph.getNodeData(id).data, status } }]);
      await graph.draw();
    };

    if (stage.bar) {
      select(stage.bar, 'Zhang status', STATUSES, 'online', (v) => void setStatus('u1', v));
      select(stage.bar, 'Li status', STATUSES, 'busy', (v) => void setStatus('u2', v));
    } else {
      stage.every(1000, (i) => setStatus(i % 2 ? 'u2' : 'u1', STATUSES[i % 3]!));
    }
  });

export default mount;
