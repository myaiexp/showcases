// One badge with default placement, then the same badge at each placement
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const PLACEMENTS = ['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'left-top'] as const;
type Placement = (typeof PLACEMENTS)[number] | 'default';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    // Without a placement the badge sits at the top, as in the docs' first badge example.
    const badges = (p: Placement) => [p === 'default' ? { text: 'NEW' } : { text: 'NEW', placement: p }];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: {
          nodes: [
            { id: 'a', style: { x: 60, y: 60 } },
            { id: 'b', type: 'rect', style: { x: 180, y: 60 } },
          ],
        },
        node: { style: { size: [60, 44], fill: '#5B8FF9', badge: true, badges: badges('default') } },
      }),
    );
    await graph.render();

    const apply = async (p: Placement, on = true): Promise<void> => {
      graph.setNode({ style: { size: [60, 44], fill: '#5B8FF9', badge: on, badges: badges(p) } });
      await graph.draw();
    };

    if (stage.bar) {
      let p: Placement = 'default';
      let on = true;
      select(stage.bar, 'placement', ['default', ...PLACEMENTS] as const, 'default', (v) => ((p = v), void apply(p, on)));
      toggle(stage.bar, 'badge', true, (v) => ((on = v), void apply(p, on)));
    } else {
      stage.every(900, (i) => apply(PLACEMENTS[i % PLACEMENTS.length]!));
    }
  });

export default mount;
