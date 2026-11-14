// Edge badge: badgeText next to the label, before or after it with badgePlacement
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

const edgeOf = (badge: boolean, placement: 'prefix' | 'suffix'): EdgeOptions => ({
  style: {
    stroke: '#5CACEE',
    lineWidth: 2,
    endArrow: true,
    labelText: (d) => String(d.id),
    labelBackground: true,
    badge,
    badgeText: 'NEW',
    badgePlacement: placement,
    badgeFontSize: 8,
    badgeFill: '#fff',
    badgeBackgroundFill: '#F4664A',
    badgeBackgroundRadius: 4,
    badgeBackgroundWidth: 24,
    badgeBackgroundHeight: 12,
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let badge = true;
    let placement: 'prefix' | 'suffix' = 'suffix';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: rows(2, { gap: 60, top: 40 }),
        edge: edgeOf(badge, placement),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(badge, placement));
      await graph.draw();
    };
    if (stage.bar) {
      toggle(stage.bar, 'badge', badge, (v) => ((badge = v), void apply()));
      select(stage.bar, 'badgePlacement', ['prefix', 'suffix'] as const, placement, (v) => ((placement = v), void apply()));
    } else {
      stage.every(1400, (i) => ((placement = i % 2 ? 'prefix' : 'suffix'), apply()));
    }
  });

export default mount;
