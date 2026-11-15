// Click a point to highlight it, its neighbours and the links among them
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { stars } from '../../shared/data.ts';
import { keepFramed } from '../../shared/load.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a point. Click the background to clear.' });
  const data = stars(5, 9, 2);

  const graph: Graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 11,
        linkDefaultColor: '#8a93a3',
        linkDefaultWidth: 2,
        linkGreyoutOpacity: 0.12,
        pointGreyoutOpacity: 0.2,
        hoveredPointCursor: 'pointer',
        fitViewDelay: 1500,
        onPointClick: (index) => {
          const neighbours = graph.getNeighboringPointIndices(index);
          const points = [index, ...neighbours];
          const links = graph.getConnectedLinkIndices(points);
          graph.setConfigPartial({ highlightedPointIndices: points, highlightedLinkIndices: links, focusedPointIndex: index });
          stage.say(`Point ${index}: ${neighbours.length} neighbours, ${links.length} links among them`, 'ok');
        },
        onBackgroundClick: () => {
          graph.setConfigPartial({ highlightedPointIndices: undefined, highlightedLinkIndices: undefined, focusedPointIndex: undefined });
          stage.say('Background clicked: highlighting cleared');
        },
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  keepFramed(stage, graph);
  stage.say('Click a point to highlight its neighbourhood');

  if (stage.preview) {
    const pointer = ghost(stage.div, graph);
    const hubs = [0, 20, 10];
    let n = 0;
    stage.every(2400, () => {
      pointer.leave();
      const step = n++ % 4;
      if (step === 3) {
        pointer.moveTo(8, 8);
        stage.after(500, () => pointer.click());
      } else {
        pointer.toPoint(hubs[step] ?? 0);
        stage.after(700, () => pointer.click());
      }
    });
  }
  return () => stage.dispose();
};

export default mount;
