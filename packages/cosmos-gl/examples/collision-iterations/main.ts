// simulationCollisionIterations on a dense hub: passes per tick vs overlap
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { hub, reportOverlaps } from '../../shared/crowd.ts';
import { keepFramed } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the passes: the hub is rebuilt as a pile and relaxed again.' });
  const { data, sizes, colors } = hub(stage.preview ? 140 : 260, 5, 10);
  let note = '';

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        linkDefaultColor: '#3a3f4b',
        simulationGravity: 0.8,
        simulationLinkSpring: 2,
        simulationRepulsion: 0.1,
        simulationDecay: 4000,
        simulationCollision: 1,
        simulationCollisionIterations: 1,
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
    graph.setConfigPartial({ simulationCollisionIterations: v });
    graph.setPointPositions(data.positions);
    graph.render(1, 0);
    note = `simulationCollisionIterations ${v}: ${v} collision pass${v === 1 ? '' : 'es'} per tick`;
  };
  reportOverlaps(stage, graph, sizes, () => note, 500);
  stage.slider('simulationCollisionIterations', 1, 8, 1, 1, apply);
  apply(1);
  if (stage.preview) stage.cycle([1, 4].map((v) => ({ run: () => apply(v) })), 3600);
  return () => stage.dispose();
};

export default mount;
