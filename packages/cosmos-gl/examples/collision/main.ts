// simulationCollision off, 1 and 2 on a heap of points sized by value
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { crowd, reportOverlaps } from '../../shared/crowd.ts';
import { keepFramed } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the strength: the heap is rebuilt and the layout restarts.' });
  const { data, sizes, colors } = crowd(110, 8);
  let note = '';

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        linkDefaultColor: '#3a3f4b',
        simulationGravity: 0.5,
        simulationRepulsion: 0.2,
        simulationDecay: 4000,
        simulationCollision: 1, // radius = half the point size (simulationCollisionRadius is 0)
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
    graph.setConfigPartial({ simulationCollision: v });
    graph.setPointPositions(data.positions);
    graph.render(1, 0);
    note = `simulationCollision ${v}: ${v === 0 ? 'off, points stack on each other' : 'points push apart by their own radius'}`;
  };
  reportOverlaps(stage, graph, sizes, () => note);
  stage.slider('simulationCollision', 0, 2, 0.1, 1, apply);
  apply(1);
  if (stage.preview) stage.cycle([0, 1, 2].map((v) => ({ run: () => apply(v) })), 3600);
  return () => stage.dispose();
};

export default mount;
