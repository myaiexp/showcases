// Points removed while the layout runs are left out of the forces
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Remove one community. The rest keeps relaxing as if it had never been there.' });
  const data = communities(3, 24, 8);
  let group = 0;
  let removed = false;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        transitionDuration: 900,
        pointDefaultSize: 8,
        linkDefaultColor: '#5a6070',
        simulationDecay: 6000,
        simulationGravity: 0.15,
        simulationRepulsion: 0.6,
        fitViewDelay: 800,
        // A position transition pauses the layout; start it again once the fade is over.
        onTransitionEnd: (interrupted) => {
          if (!interrupted && removed) graph.unpause();
        },
      },
      stage.device(),
    ),
  );
  const positions = data.positions.slice();
  graph.setPointPositions(positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  stage.refit(graph, 2200);
  if (!stage.preview) stage.after(2500, () => graph.fitView(600, 0.15));

  const remove = async (): Promise<void> => {
    await graph.ready;
    removed = true;
    const now = graph.getPointPositions(); // where the layout has got to
    for (let i = 0; i < data.count; i++) {
      const gone = data.group[i] === group % 3;
      positions[i * 2] = gone ? NaN : (now[i * 2] ?? NaN);
      positions[i * 2 + 1] = gone ? NaN : (now[i * 2 + 1] ?? NaN);
    }
    graph.setPointPositions(positions);
    graph.render();
    stage.say(`Community ${(group % 3) + 1} set to NaN: it fades, then the others relax without it`);
    group++;
  };
  const reset = async (): Promise<void> => {
    await graph.ready;
    removed = false;
    for (let i = 0; i < data.count; i++) {
      positions[i * 2] = data.positions[i * 2] ?? 0;
      positions[i * 2 + 1] = data.positions[i * 2 + 1] ?? 0;
    }
    // Everything fades back in at its start position, then the layout runs from there.
    graph.setPointPositions(positions);
    graph.render(1, 0);
    graph.start(1);
    stage.say('All three communities are back and the layout runs again');
  };

  stage.button('Remove a community', () => void remove());
  stage.button('Reset', () => void reset());
  stage.say('Press Remove while the layout runs');
  if (stage.preview) stage.cycle([{ run: remove, hold: 3800 }, { run: reset, hold: 2600 }], 1000);
  return () => stage.dispose();
};

export default mount;
