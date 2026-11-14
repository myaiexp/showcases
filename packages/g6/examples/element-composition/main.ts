// An element is made of shapes: a node of key shape, label, icon and badges; an edge of path, arrows and label
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'n1', combo: 'c', style: { x: 90, y: 100 } },
            { id: 'n2', combo: 'c', style: { x: 200, y: 140 } },
            { id: 'n3', style: { x: 360, y: 100 } },
          ],
          edges: [{ id: 'n2-n3', source: 'n2', target: 'n3' }],
          combos: [{ id: 'c' }],
        },
        node: {
          style: {
            size: 46,
            // Key shape: the circle itself. Label, icon and badge are extra shapes on top of it.
            labelText: (d) => `label of ${d.id}`,
            icon: true,
            iconText: '*',
            iconFontSize: 24,
            badge: true,
            badges: [{ text: '3', placement: 'right-top', fill: '#ff6b6b' }],
          },
        },
        edge: {
          style: {
            // Key shape: the path. Arrows and label are extra shapes along it.
            startArrow: true,
            endArrow: true,
            lineWidth: 2,
            labelText: 'edge label',
            labelBackground: true,
          },
        },
        combo: {
          style: {
            // Key shape: the container. Label and the collapse marker come with it.
            labelText: 'combo label',
            collapsedMarker: true,
            fillOpacity: 0.12,
          },
        },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    // Each switch hides one shape of the node; the key shape stays.
    const shapes = ['label', 'icon', 'badge'] as const;
    const apply = async (flags: Record<(typeof shapes)[number], boolean>): Promise<void> => {
      graph.setOptions({ node: { style: { label: flags.label, icon: flags.icon, badge: flags.badge } } });
      await graph.draw();
    };
    const flags = { label: true, icon: true, badge: true };
    if (stage.bar) for (const s of shapes) toggle(stage.bar, `node ${s}`, true, (v) => ((flags[s] = v), void apply(flags)));
    else {
      stage.every(1300, (i) => {
        const k = shapes[i % 3]!;
        flags[k] = !flags[k];
        return apply(flags);
      });
    }
  });

export default mount;
