// simulationCollisionRadius: one fixed radius for all points, 0 = size-derived
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { crowd, reportOverlaps } from '../../shared/crowd.ts';
import { keepFramed } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Set a radius above 0 and every point keeps that much room, big or small.' });
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
        simulationCollision: 1,
        simulationCollisionRadius: 0,
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
    graph.setConfigPartial({ simulationCollisionRadius: v });
    graph.setPointPositions(data.positions);
    graph.render(1, 0);
    note = v === 0 ? 'simulationCollisionRadius 0: each radius is half the point size' : `simulationCollisionRadius ${v}: every point keeps a radius of ${v}`;
  };
  reportOverlaps(stage, graph, sizes, () => note);
  stage.slider('simulationCollisionRadius', 0, 40, 1, 0, apply);
  apply(0);
  if (stage.preview) stage.cycle([0, 4, 16].map((v) => ({ run: () => apply(v) })), 3600);
  return () => stage.dispose();
};

export default mount;
