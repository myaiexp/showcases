// onPointClick and onBackgroundClick: a click on a point or on empty space
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { eventLog } from '../../shared/log.ts';
import { communities } from '../../shared/data.ts';
import { keepFramed, load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a point, then click empty space.' });
  const log = eventLog(stage);
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 10,
        linkDefaultColor: '#5a5f6a',
        hoveredPointCursor: 'pointer',
        renderHoveredPointRing: true,
        fitViewDelay: 1500,
        onPointClick: (index, position) => {
          graph.setConfigPartial({ focusedPointIndex: index });
          log(`onPointClick: point ${index} at (${position[0].toFixed(0)}, ${position[1].toFixed(0)})`, 'ok');
        },
        onBackgroundClick: (event) => {
          graph.setConfigPartial({ focusedPointIndex: undefined });
          log(`onBackgroundClick at (${event.offsetX.toFixed(0)}, ${event.offsetY.toFixed(0)}) px`, 'warn');
        },
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph);
  log('Waiting for a click');

  if (stage.preview) {
    const pointer = ghost(stage.div, graph);
    let n = 0;
    stage.every(1800, () => {
      const step = n++ % 4;
      if (step === 3) pointer.moveTo(10, 14);
      else pointer.toPoint([12, 55, 100][step] ?? 0);
      stage.after(600, () => pointer.click());
    });
  }
  return () => stage.dispose();
};

export default mount;
