// simulationCollisionPadding: a gap between points instead of just touching
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { crowd, reportOverlaps } from '../../shared/crowd.ts';
import { keepFramed } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the padding: the heap is rebuilt and settles with the new gaps.' });
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
        simulationCollisionPadding: 0,
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
    graph.setConfigPartial({ simulationCollisionPadding: v });
    graph.setPointPositions(data.positions);
    graph.render(1, 0);
    note = `simulationCollisionPadding ${v}: ${v === 0 ? 'points settle just touching' : `a gap of ${2 * v} between edges`}`;
  };
  reportOverlaps(stage, graph, sizes, () => note);
  stage.slider('simulationCollisionPadding', 0, 50, 1, 0, apply);
  apply(0);
  if (stage.preview) stage.cycle([0, 4, 12].map((v) => ({ run: () => apply(v) })), 3600);
  return () => stage.dispose();
};

export default mount;
