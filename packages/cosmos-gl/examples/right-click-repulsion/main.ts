// enableRightClickRepulsion: the held right button pushes points away
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { rightHold } from '../../shared/right-hold.ts';
import { communities } from '../../shared/data.ts';
import { keepFramed, load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hold the right mouse button over the graph and move: points flee the pointer.' });
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 9,
        linkDefaultColor: '#5a5f6a',
        enableRightClickRepulsion: true,
        simulationRepulsionFromMouse: 2,
        fitViewDelay: 1500,
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph, 3000);

  stage.toggle('enableRightClickRepulsion', true, (on) => graph.setConfigPartial({ enableRightClickRepulsion: on }));
  stage.slider('simulationRepulsionFromMouse', 0, 5, 0.25, 2, (v) => graph.setConfigPartial({ simulationRepulsionFromMouse: v }));
  stage.say('enableRightClickRepulsion: true, simulationRepulsionFromMouse: 2');

  if (stage.preview) {
    // A card has no mouse: pointermove events with the right button down stand in for it.
    const pointer = ghost(stage.div, graph);
    const right = rightHold(stage.div, pointer);
    stage.cycle([
      { say: 'Right button held on a community: it is pushed apart', run: () => (graph.start(0.3), pointer.toPoint(10), right.press()), hold: 700 },
      { run: () => (pointer.toPoint(10), right.press()), hold: 1800 },
      { say: 'Button released: links pull the points back', run: () => right.release(), hold: 2500 },
      { say: 'Held on another community', run: () => (graph.start(0.3), pointer.toPoint(80), right.press()), hold: 2200 },
      { say: 'Released', run: () => right.release(), hold: 2500 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
