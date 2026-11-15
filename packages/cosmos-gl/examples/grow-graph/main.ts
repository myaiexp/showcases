// A graph grows over time: each new point starts next to the point it links to
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER, rng } from '../../shared/data.ts';
import { hsl } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every new point links to a random older one and is placed beside it, so the layout barely jumps.' });
  const start = 4;
  const max = 150;
  const pick = rng(17);
  let positions = new Float32Array(0);
  let links = new Float32Array(0);
  let hues = new Float32Array(0);
  let count = 0;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        transitionDuration: 0, // growing is not a move: no animation, and the layout is not auto-paused
        pointDefaultSize: 8,
        linkDefaultColor: '#6a7080',
        simulationDecay: 8000,
        simulationLinkDistance: 10,
        simulationRepulsion: 0.5,
        fitViewDelay: 600,
        fitViewPadding: 0.15,
      },
      stage.device(),
    ),
  );

  const push = (): void => {
    graph.setPointPositions(positions);
    graph.setPointColors(hues);
    graph.setLinks(links);
    graph.render();
  };
  let auto = true;
  const reset = (restart = true): void => {
    count = start;
    positions = new Float32Array(start * 2);
    for (let i = 0; i < start; i++) {
      positions[i * 2] = CENTER + Math.cos(i * 1.6) * 30;
      positions[i * 2 + 1] = CENTER + Math.sin(i * 1.6) * 30;
    }
    links = new Float32Array([0, 1, 1, 2, 2, 3]);
    hues = new Float32Array(start * 4);
    for (let i = 0; i < start; i++) hues.set(hsl(200, 0.8, 0.6), i * 4);
    push();
    if (restart) graph.start(1);
  };
  const grow = async (howMany: number): Promise<void> => {
    await graph.ready;
    if (count + howMany > max) {
      reset();
      return;
    }
    const now = graph.getPointPositions(); // where the layout has got to
    const nextPositions = new Float32Array((count + howMany) * 2);
    nextPositions.set(now.slice(0, count * 2));
    const nextLinks = Array.from(links);
    const nextHues = new Float32Array((count + howMany) * 4);
    nextHues.set(hues);
    for (let n = 0; n < howMany; n++) {
      const parent = Math.floor(pick() * (count + n));
      const i = count + n;
      // Next to the parent, with a little jitter so new points do not sit on top of it.
      nextPositions[i * 2] = (nextPositions[parent * 2] ?? CENTER) + (pick() - 0.5) * 20;
      nextPositions[i * 2 + 1] = (nextPositions[parent * 2 + 1] ?? CENTER) + (pick() - 0.5) * 20;
      nextLinks.push(parent, i);
      nextHues.set(hsl(200 + (i / max) * 160, 0.8, 0.6), i * 4);
    }
    count += howMany;
    positions = nextPositions;
    links = new Float32Array(nextLinks);
    hues = nextHues;
    push();
    graph.start(0.7);
    stage.say(`${count} points, ${links.length / 2} links: new points start beside their parent`);
  };

  reset(false);
  stage.refit(graph, 2000);
  stage.button('Add 10 points', () => void grow(10));
  stage.button('Restart', () => reset());
  if (!stage.preview) {
    stage.toggle('keep growing', true, (on) => {
      auto = on;
    });
  }
  stage.say('The graph starts with four points');
  stage.every(stage.preview ? 700 : 900, () => {
    if (auto) void grow(stage.preview ? 3 : 2);
  });
  return () => stage.dispose();
};

export default mount;
