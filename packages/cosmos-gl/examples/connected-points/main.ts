// getConnectedPointIndices lists the points at the ends of chosen links
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click links to pick them. The points at their ends light up.' });
  const data = web(8, 3, 42);
  const linkCount = data.links.length / 2;
  const picked = new Set<number>();
  const panel = stage.side();

  const show = (): void => {
    const links = [...picked];
    const ends = links.length ? graph.getConnectedPointIndices(links) : [];
    graph.setConfigPartial({
      highlightedLinkIndices: links.length ? links : undefined,
      highlightedPointIndices: ends.length ? ends : undefined,
    });
    if (panel) panel.textContent = `links: [${links.join(', ')}]\n\ngetConnectedPointIndices(links):\n[${ends.join(', ')}]`;
    stage.say(links.length ? `${links.length} link${links.length > 1 ? 's' : ''} → ${ends.length} points at their ends` : 'No links picked', 'ok');
  };

  const graph: Graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        pointDefaultSize: 9,
        linkDefaultColor: '#8a93a3',
        linkDefaultWidth: 2,
        linkGreyoutOpacity: 0.25,
        pointGreyoutOpacity: 0.3,
        hoveredLinkCursor: 'pointer',
        fitViewDelay: 300,
        fitViewPadding: 0.12,
        onLinkClick: (link) => {
          if (!picked.delete(link)) picked.add(link);
          show();
        },
        onBackgroundClick: () => {
          picked.clear();
          show();
        },
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setLinks(data.links);
  graph.render();
  stage.say('Click a link');

  if (stage.preview) {
    // Three link sets, one after another.
    const sets = [[0, 1, 2], [5, 9, 20], [30, 31, 32, 33], []];
    stage.cycle(
      sets.map((s) => ({
        run: async () => {
          await graph.ready;
          picked.clear();
          for (const l of s) picked.add(l % linkCount);
          show();
        },
      })),
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
