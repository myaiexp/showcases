// getNeighboringPointIndices called again and again grows a frontier outward
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mesh } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each step asks for the neighbours of every highlighted point and adds them.' });
  const data = mesh(11, 8, 30);
  let reached = new Set<number>([27]);
  let hops = 0;

  const paint = (): void => {
    const points = [...reached];
    graph.setConfigPartial({
      highlightedPointIndices: points,
      highlightedLinkIndices: graph.getConnectedLinkIndices(points),
    });
  };
  const graph: Graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        pointDefaultSize: 9,
        linkDefaultColor: '#8a93a3',
        linkDefaultWidth: 1.5,
        linkGreyoutOpacity: 0.15,
        pointGreyoutOpacity: 0.25,
        fitViewDelay: 300,
        fitViewPadding: 0.12,
        onPointClick: (i) => void restart(i),
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setLinks(data.links);
  graph.render();

  const restart = async (from: number): Promise<void> => {
    await graph.ready;
    reached = new Set([from]);
    hops = 0;
    paint();
    stage.say(`Start at point ${from}: 1 point`);
  };
  const step = async (): Promise<void> => {
    await graph.ready;
    const next = graph.getNeighboringPointIndices([...reached]);
    for (const n of next) reached.add(n);
    hops++;
    paint();
    stage.say(`${hops} hop${hops > 1 ? 's' : ''}: ${reached.size} of ${data.count} points reached`, 'ok');
  };

  stage.button('Grow one hop', () => void step());
  stage.button('Restart', () => void restart(27));
  stage.say('Press Grow, or click a point to start from it');
  if (stage.preview) {
    const each = Array.from({ length: 7 }, () => ({ run: step, hold: 900 }));
    stage.cycle([{ run: () => restart(27), hold: 900 }, ...each, { run: () => stage.wait(900) }], 900);
  }
  return () => stage.dispose();
};

export default mount;
