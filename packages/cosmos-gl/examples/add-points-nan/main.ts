// A slot that goes from NaN to a real position fades in where it belongs
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mesh, rng } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';
import { bounds } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The array has a slot for every point. Empty slots hold NaN; filling one makes a point appear.' });
  const data = mesh(10, 7, 36);
  const positions = data.positions.slice();
  const order = Array.from({ length: data.count }, (_, i) => i);
  const r = rng(5);
  order.sort(() => r() - 0.5);
  // Start with only the first 20 slots filled; the others are NaN.
  for (const i of order.slice(20)) {
    positions[i * 2] = NaN;
    positions[i * 2 + 1] = NaN;
  }
  let filled = 20;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        transitionDuration: 900,
        pointDefaultSize: 9,
        linkDefaultColor: '#5a6070',
        fitViewOnInit: false,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(positions);
  graph.setPointColors(colors(data.count, (i) => hsl((i / data.count) * 300, 0.8, 0.6)));
  graph.setLinks(data.links);
  graph.render();
  // Frame the whole mesh, not just the points that exist at the start.
  void graph.ready.then(() => graph.fitViewByPointPositions(bounds(data.positions), 0, 0.15));

  const add = async (howMany: number): Promise<void> => {
    await graph.ready;
    for (const i of order.slice(filled, filled + howMany)) {
      positions[i * 2] = data.positions[i * 2] ?? NaN;
      positions[i * 2 + 1] = data.positions[i * 2 + 1] ?? NaN;
    }
    filled = Math.min(data.count, filled + howMany);
    graph.setPointPositions(positions);
    graph.render();
    stage.say(`NaN → real position: ${filled} of ${data.count} points are in`);
  };
  const clear = async (): Promise<void> => {
    await graph.ready;
    for (const i of order.slice(20)) {
      positions[i * 2] = NaN;
      positions[i * 2 + 1] = NaN;
    }
    filled = 20;
    graph.setPointPositions(positions);
    graph.render();
    stage.say('Back to 20 points: the others are NaN again');
  };

  stage.button('Add 10 points', () => void add(10));
  stage.button('Reset', () => void clear());
  stage.say('Press Add to fill empty slots');
  if (stage.preview) stage.cycle([{ run: () => add(14) }, { run: () => add(14) }, { run: () => add(22) }, { run: clear }], 1800);
  return () => stage.dispose();
};

export default mount;
