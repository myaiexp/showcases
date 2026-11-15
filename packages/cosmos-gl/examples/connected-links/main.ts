// getConnectedLinkIndices lists the links with both ends inside a set of points
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click points to pick them. Links with both ends picked light up.' });
  const data = web(8, 3, 42);
  const picked = new Set<number>();
  const panel = stage.side();

  const show = (): void => {
    const points = [...picked];
    const links = points.length ? graph.getConnectedLinkIndices(points) : [];
    graph.setConfigPartial({
      highlightedPointIndices: points.length ? points : undefined,
      highlightedLinkIndices: links.length ? links : undefined,
    });
    if (panel) panel.textContent = `points: [${points.join(', ')}]\n\ngetConnectedLinkIndices(points):\n[${links.join(', ')}]`;
    stage.say(points.length ? `${points.length} points picked → ${links.length} links between them` : 'No points picked', 'ok');
  };

  const graph: Graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        pointDefaultSize: 10,
        linkDefaultColor: '#8a93a3',
        linkDefaultWidth: 2,
        linkGreyoutOpacity: 0.2,
        pointGreyoutOpacity: 0.3,
        hoveredPointCursor: 'pointer',
        fitViewDelay: 300,
        fitViewPadding: 0.12,
        onPointClick: (i) => {
          if (!picked.delete(i)) picked.add(i);
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
  stage.say('Click points');

  if (stage.preview) {
    const sets = [[1, 2, 3], [0, 1, 2, 9, 10], [5, 6, 13, 14, 21, 22, 4], []];
    stage.cycle(
      sets.map((s) => ({
        run: async () => {
          await graph.ready;
          picked.clear();
          for (const p of s) picked.add(p);
          show();
        },
      })),
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
