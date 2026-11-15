// onClick fires for every canvas click, with the point under it or undefined
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { eventLog } from '../../shared/log.ts';
import { communities } from '../../shared/data.ts';
import { keepFramed } from '../../shared/load.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click anywhere on the canvas: points and empty space both report here.' });
  const log = eventLog(stage);
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 10,
        linkDefaultColor: '#5a5f6a',
        fitViewDelay: 1500,
        onClick: (index, position, event) => {
          const keys = [event.shiftKey && 'shift', event.altKey && 'alt', event.ctrlKey && 'ctrl'].filter(Boolean).join('+');
          if (index === undefined || position === undefined) log(`onClick(undefined, undefined): empty space${keys ? ` with ${keys}` : ''}`, 'warn');
          else log(`onClick(${index}, [${position[0].toFixed(0)}, ${position[1].toFixed(0)}]): a point${keys ? ` with ${keys}` : ''}`, 'ok');
          graph.setConfigPartial({ focusedPointIndex: index });
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
  log('Waiting for a click');

  if (stage.preview) {
    const pointer = ghost(stage.div, graph);
    let n = 0;
    stage.every(1800, () => {
      const step = n++ % 4;
      if (step % 2 === 1) pointer.moveTo(10 + step * 8, 14);
      else pointer.toPoint([20, 85][step / 2] ?? 0);
      stage.after(600, () => pointer.click());
    });
  }
  return () => stage.dispose();
};

export default mount;
