// simulationCollisionCooling: collision at full strength or fading with alpha
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { crowd, reportOverlaps } from '../../shared/crowd.ts';
import { keepFramed } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the cooling: the heap is rebuilt and the layout cools in a few seconds.' });
  const { data, sizes, colors } = crowd(110, 8);
  let note = '';

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        linkDefaultColor: '#3a3f4b',
        simulationGravity: 0.6,
        simulationRepulsion: 0.2,
        simulationDecay: 600, // cools in a few seconds
        simulationCollision: 1,
        simulationCollisionCooling: 0,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointSizes(sizes);
  graph.setPointColors(colors);
  graph.setLinks(data.links);
  graph.render();
  keepFramed(stage, graph, 2500);

  const apply = (v: number): void => {
    graph.setConfigPartial({ simulationCollisionCooling: v });
    graph.setPointPositions(data.positions);
    graph.render(1, 0);
    note = `simulationCollisionCooling ${v}: ${v === 0 ? 'collision keeps full strength as the layout cools' : v === 1 ? 'collision fades with alpha like the other forces' : 'collision fades partway'}`;
  };
  reportOverlaps(stage, graph, sizes, () => note, 500);
  stage.slider('simulationCollisionCooling', 0, 1, 0.05, 0, apply);
  stage.button('Restart', () => apply(Number(graph.config.simulationCollisionCooling ?? 0)));
  apply(0);
  if (stage.preview) stage.cycle([0, 1].map((v) => ({ run: () => apply(v) })), 3600);
  return () => stage.dispose();
};

export default mount;
