// A NaN position removes a point: it fades out and every other point stays put
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mesh, rng } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Remove points: their slots stay, so every other point keeps its index and place.' });
  const data = mesh(10, 7, 36);
  const positions = data.positions.slice();
  const pick = rng(11);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        transitionDuration: 900,
        pointDefaultSize: 9,
        linkDefaultColor: '#5a6070',
        fitViewDelay: 300,
        fitViewPadding: 0.15,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(positions);
  graph.setPointColors(colors(data.count, (i) => hsl((i / data.count) * 300, 0.8, 0.6)));
  graph.setLinks(data.links);
  graph.render();

  const alive = (): number => positions.reduce((n, v, i) => n + (i % 2 === 0 && !Number.isNaN(v) ? 1 : 0), 0);
  const remove = async (howMany: number): Promise<void> => {
    await graph.ready;
    let left = howMany;
    for (let tries = 0; left > 0 && tries < 500; tries++) {
      const i = Math.floor(pick() * data.count);
      if (Number.isNaN(positions[i * 2])) continue;
      positions[i * 2] = NaN; // NaN in either coordinate marks the slot absent
      positions[i * 2 + 1] = NaN;
      left--;
    }
    graph.setPointPositions(positions);
    graph.render();
    stage.say(`NaN positions: ${alive()} of ${data.count} points left, the rest have not moved`);
  };
  const restore = async (): Promise<void> => {
    await graph.ready;
    positions.set(data.positions);
    graph.setPointPositions(positions);
    graph.render();
    stage.say('Real positions again: all points fade back in');
  };

  stage.button('Remove 8 points', () => void remove(8));
  stage.button('Restore all', () => void restore());
  stage.say('Press Remove to set positions to NaN');
  if (stage.preview) {
    stage.cycle([{ run: () => remove(10) }, { run: () => remove(14) }, { run: () => remove(14) }, { run: restore }], 1800);
  }
  return () => stage.dispose();
};

export default mount;
