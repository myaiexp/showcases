// The Quick Start graph: three points, three links and the docs' config
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a point or the background. Drag a point.' });

  const config = {
    simulationFriction: 0.1, // keeps the graph inert
    simulationGravity: 0, // disables gravity
    simulationRepulsion: 0.5, // increases repulsion between points
    curvedLinks: true, // curved links
    fitViewDelay: 1000, // wait 1 second before fitting the view
    fitViewPadding: 0.3, // centers the graph with a padding of ~30% of screen
    rescalePositions: true, // rescale positions
    enableDrag: true, // enable dragging points
    pointDefaultSize: 12,
    onPointClick: (pointIndex: number) => stage.say(`Clicked point index: ${pointIndex}`, 'ok'),
    onBackgroundClick: () => stage.say('Clicked background'),
  };

  const graph = stage.own(new Graph(stage.div, config, stage.device()));

  // Points: [x1, y1, x2, y2, x3, y3]
  const pointPositions = new Float32Array([
    0.0, 0.0, // Point 1 at (0,0)
    1.0, 0.0, // Point 2 at (1,0)
    0.5, 1.0, // Point 3 at (0.5,1)
  ]);
  graph.setPointPositions(pointPositions);

  // Links: [sourceIndex1, targetIndex1, sourceIndex2, targetIndex2]
  const links = new Float32Array([
    0, 1, // Link from point 0 to point 1
    1, 2, // Link from point 1 to point 2
    2, 0, // Link from point 2 to point 0
  ]);
  graph.setLinks(links);

  graph.render();
  stage.say('new Graph(div, config) → setPointPositions → setLinks → render()');

  // The init fit frames the rescaled start; the links then pull the triangle small, so fit again.
  stage.after(2500, () => graph.fitView(600, 0.3));
  stage.button('fitView()', () => graph.fitView(600, 0.3));
  // A card has no pointer: reheat the layout now and then so it keeps moving.
  if (stage.preview) {
    stage.every(6000, () => {
      graph.start(1);
      stage.after(2500, () => graph.fitView(600, 0.3));
    });
  }
  return () => stage.dispose();
};

export default mount;
