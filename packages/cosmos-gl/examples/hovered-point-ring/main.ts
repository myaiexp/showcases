// renderHoveredPointRing draws a ring around the point under the pointer
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the points.' });
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 10,
        renderHoveredPointRing: true,
        hoveredPointRingColor: '#ffd84d',
        hoveredPointCursor: 'pointer',
        linkDefaultColor: '#5a5f6a',
        fitViewDelay: 1500,
        onPointMouseOver: (index) => stage.say(`onPointMouseOver: point ${index}`, 'ok'),
        onPointMouseOut: () => stage.say('onPointMouseOut'),
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();

  stage.refit(graph);
  if (stage.preview) {
    // No pointer in a card: a pretend one visits a point, then the empty corner.
    const pointer = ghost(stage.div, graph);
    let n = 0;
    stage.every(1600, () => {
      if (n++ % 3 === 2) pointer.moveTo(12, 12);
      else pointer.toPoint((n * 37) % data.count);
    });
  }
  return () => stage.dispose();
};

export default mount;
