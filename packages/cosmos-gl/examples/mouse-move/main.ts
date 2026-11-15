// onMouseMove reports the pointer on every move, with the point under it if any
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { eventLog } from '../../shared/log.ts';
import { communities } from '../../shared/data.ts';
import { keepFramed } from '../../shared/load.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the canvas.' });
  const log = eventLog(stage, 12);
  const data = communities(4, 30, 3);

  const graph: Graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 10,
        linkDefaultColor: '#5a5f6a',
        renderHoveredPointRing: true,
        fitViewDelay: 1500,
        onMouseMove: (index, position, event) => {
          const rect = stage.div.getBoundingClientRect();
          const [sx, sy] = [event.clientX - rect.left, event.clientY - rect.top];
          const [x, y] = graph.screenToSpacePosition([sx, sy]);
          const over = index === undefined || position === undefined ? 'no point' : `point ${index}`;
          log(`onMouseMove: ${over}, screen (${sx.toFixed(0)}, ${sy.toFixed(0)}), space (${x.toFixed(0)}, ${y.toFixed(0)})`, index === undefined ? 'info' : 'ok');
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
  log('Waiting for the pointer');

  if (stage.preview) {
    const pointer = ghost(stage.div, graph);
    const path = [5, 40, 70, 110, 22];
    let n = 0;
    stage.every(900, () => {
      const step = n++ % 7;
      if (step % 2 === 1) pointer.moveTo(40 + step * 25, 30 + (step % 3) * 40);
      else pointer.toPoint(path[step / 2] ?? 0);
    });
  }
  return () => stage.dispose();
};

export default mount;
