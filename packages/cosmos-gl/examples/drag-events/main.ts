// enableDrag, with onDragStart, onDrag and onDragEnd reporting each drag
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { dragBy } from '../../shared/fake-drag.ts';
import { eventLog } from '../../shared/log.ts';
import { communities } from '../../shared/data.ts';
import { keepFramed } from '../../shared/load.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a point. Dragging empty space pans the view instead.' });
  const log = eventLog(stage, 12);
  const data = communities(4, 30, 3);
  let moves = 0;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableDrag: true,
        pointDefaultSize: 10,
        linkDefaultColor: '#5a5f6a',
        renderHoveredPointRing: true,
        fitViewDelay: 1500,
        onDragStart: (e) => {
          moves = 0;
          log(`onDragStart at (${e.x.toFixed(0)}, ${e.y.toFixed(0)}) px`, 'ok');
        },
        onDrag: (e) => {
          moves++;
          if (moves % 4 === 0) log(`onDrag: ${moves} moves, now at (${e.x.toFixed(0)}, ${e.y.toFixed(0)}) px`);
        },
        onDragEnd: (e) => log(`onDragEnd at (${e.x.toFixed(0)}, ${e.y.toFixed(0)}) px after ${moves} moves`, 'warn'),
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  keepFramed(stage, graph);
  log('Waiting for a drag');

  if (stage.preview) {
    // A card has no mouse: scripted mouse events drag a point across the card now and then.
    const pointer = ghost(stage.div, graph);
    let n = 0;
    stage.every(4500, () => {
      const i = [10, 70, 100][n++ % 3] ?? 0;
      pointer.toPoint(i);
      stage.after(500, () => {
        void dragBy(stage, stage.div, pointer, n % 2 ? 50 : -50, 30);
      });
    });
  }
  return () => stage.dispose();
};

export default mount;
