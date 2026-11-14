// Business fields live under data; style callbacks read them, and updateNodeData restyles
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { people } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const ROLE_COLOR: Record<string, string> = { Admin: '#ff6b6b', User: '#4dabf7', Guest: '#adb5bd' };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: people(),
        node: {
          style: {
            size: 32,
            // Callbacks get the datum, so name and role come from d.data, not from G6's own fields.
            labelText: (d) => `${d.data?.name} (${d.data?.role})`,
            fill: (d) => ROLE_COLOR[String(d.data?.role)] ?? '#888',
          },
        },
        edge: { style: { lineWidth: (d) => (d.data?.relationship === 'friend' ? 4 : 1.5) } },
        autoFit: 'view',
        padding: 30,
      }),
    );
    await graph.render();

    const setRole = async (id: string, role: string): Promise<void> => {
      graph.updateNodeData([{ id, data: { role } }]);
      await graph.draw();
    };
    if (stage.bar) {
      button(stage.bar, 'bob becomes Admin', () => void setRole('bob', 'Admin'));
      button(stage.bar, 'bob becomes Guest', () => void setRole('bob', 'Guest'));
      button(stage.bar, 'bob becomes User', () => void setRole('bob', 'User'));
    } else {
      const roles = ['Admin', 'Guest', 'User'];
      stage.every(1300, (i) => setRole(i % 2 ? 'bob' : 'erin', roles[i % 3]!));
    }
  });

export default mount;
