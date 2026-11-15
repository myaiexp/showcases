// fitView(duration, padding) frames every point in the view
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll or drag to move the view, then fit it again.' });
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#5a5f6a',
        simulationDecay: 1500,
        fitViewOnInit: false,
      },
      stage.device(),
    ),
  );
  load(graph, data);

  let duration = 600;
  let padding = 0.1;
  stage.slider('duration (ms)', 0, 2000, 50, duration, (v) => (duration = v));
  stage.slider('padding', 0, 0.6, 0.02, padding, (v) => (padding = v));
  stage.button('fitView(duration, padding)', () => (graph.fitView(duration, padding), stage.say(`fitView(${duration}, ${padding})`)));
  stage.button('Move away first', () => graph.zoomToPointByIndex(Math.floor(Math.random() * data.count), 400, 5));
  stage.after(2500, () => graph.fitView(600, padding));

  stage.cycle(
    [
      { run: () => graph.zoomToPointByIndex(100, 600, 5) },
      { say: 'fitView(800): default padding 0.1', run: () => graph.fitView(800) },
      { say: 'fitView(800, 0.4): more empty border', run: () => graph.fitView(800, 0.4), hold: 2000 },
      { say: 'fitView(800, 0): points touch the edge', run: () => graph.fitView(800, 0), hold: 2000 },
    ],
    1800,
  );
  return () => stage.dispose();
};

export default mount;
