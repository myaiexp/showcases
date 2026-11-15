// onPointMouseOver's isHighlighted and isOutlined arguments
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { eventLog } from '../../shared/log.ts';
import { communities } from '../../shared/data.ts';
import { keepFramed, load, pointsOf } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Community 1 is highlighted, community 2 is outlined, 3 and 4 are neither.' });
  const log = eventLog(stage);
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 10,
        linkDefaultColor: '#5a5f6a',
        highlightedPointIndices: pointsOf(data, 0),
        outlinedPointIndices: pointsOf(data, 1),
        outlinedPointRingColor: '#ffd84d',
        pointGreyoutOpacity: 0.3,
        renderHoveredPointRing: true,
        fitViewDelay: 1500,
        onPointMouseOver: (index, _position, _event, isHighlighted, isOutlined) => {
          log(`onPointMouseOver: point ${index}, isHighlighted ${isHighlighted}, isOutlined ${isOutlined}`, isHighlighted || isOutlined ? 'ok' : 'info');
        },
        onPointMouseOut: () => stage.say('onPointMouseOut'),
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph);
  log('Hover a point');

  if (stage.preview) {
    const pointer = ghost(stage.div, graph);
    let n = 0;
    stage.every(1600, () => {
      const g = n++ % 4;
      pointer.toPoint(g * 30 + 4 + ((n * 7) % 20));
    });
  }
  return () => stage.dispose();
};

export default mount;
