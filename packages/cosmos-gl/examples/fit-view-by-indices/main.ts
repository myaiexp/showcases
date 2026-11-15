// fitViewByPointIndices frames only the points listed
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { load, pointsOf } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Frame one community, or any list of point indices.' });
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#5a5f6a',
        simulationDecay: 1500,
        pointGreyoutOpacity: 0.35,
        fitViewOnInit: false,
      },
      stage.device(),
    ),
  );
  load(graph, data);

  const frame = (indices: number[], what: string): void => {
    graph.setConfigPartial({ highlightedPointIndices: indices });
    graph.fitViewByPointIndices(indices, 800, 0.15);
    stage.say(`fitViewByPointIndices(${what}, 800, 0.15)`);
  };
  for (const g of [0, 1, 2, 3]) stage.button(`Community ${g + 1}`, () => frame(pointsOf(data, g), `community ${g + 1}: ${pointsOf(data, g).length} points`));
  stage.button('Points 3, 40, 77', () => frame([3, 40, 77], '[3, 40, 77]'));
  stage.button('All points', () => (graph.setConfigPartial({ highlightedPointIndices: undefined }), graph.fitView(800), stage.say('fitView(800)')));
  stage.after(2500, () => graph.fitView(600));

  stage.cycle(
    [
      { run: () => stage.wait(1500) },
      ...[0, 2, 1].map((g) => ({ say: `fitViewByPointIndices: community ${g + 1}`, run: () => frame(pointsOf(data, g), `community ${g + 1}`) })),
      { say: 'fitView(): everything again', run: () => (graph.setConfigPartial({ highlightedPointIndices: undefined }), graph.fitView(800)) },
    ],
    2300,
  );
  return () => stage.dispose();
};

export default mount;
