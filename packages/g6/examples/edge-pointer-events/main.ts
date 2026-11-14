// Edge hit testing: increasedLineWidthForHitTesting, pointerEvents and cursor
import { Graph, type EdgeOptions, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

type Events = 'auto' | 'none' | 'stroke';
const edgeOf = (hit: number, pe: Events): EdgeOptions => ({
  style: {
    lineWidth: 1,
    stroke: '#8fa4c8',
    cursor: 'pointer',
    increasedLineWidthForHitTesting: hit,
    // Only the lower edge gets the chosen value; the upper one stays 'auto' for comparison.
    pointerEvents: (d) => (d.id === 'e1' ? pe : 'auto'),
    labelText: (d) => (d.id === 'e1' ? `pointerEvents: ${pe}` : 'pointerEvents: auto'),
    labelBackground: true,
    labelOffsetY: -8,
  },
  state: { active: { stroke: '#F5A623', lineWidth: 3 } },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let hit = 12;
    let pe: Events = 'none';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: rows(2, { gap: 60, top: 40 }),
        edge: edgeOf(hit, pe),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(hit, pe));
      await graph.draw();
    };
    if (stage.bar) {
      const log = readout(el);
      log.textContent = 'Hover or click the edges. With pointerEvents none the lower edge ignores the pointer.';
      slider(stage.bar, 'increasedLineWidthForHitTesting', [0, 40, 1], hit, (v) => ((hit = v), void apply()));
      select(stage.bar, 'lower edge pointerEvents', ['auto', 'none', 'stroke'], pe, (v) => ((pe = v), void apply()));
      graph.on('edge:pointerenter', (e: IElementEvent) => void graph.setElementState(e.target.id, ['active']));
      graph.on('edge:pointerleave', (e: IElementEvent) => void graph.setElementState(e.target.id, []));
      graph.on('edge:click', (e: IElementEvent) => (log.textContent = `clicked ${e.target.id}`));
    } else {
      // No pointer in a card: play a hover over each edge in turn.
      stage.every(900, (i) => graph.setElementState({ e0: i % 2 ? [] : ['active'], e1: i % 2 ? ['active'] : [] }));
    }
  });

export default mount;
