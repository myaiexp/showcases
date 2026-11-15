// A headless Graph (div null) lays out points; a plain 2D canvas draws them
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { plainView } from '../../shared/plain-view.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'This graph owns no canvas: the host calls step(), reads positions back and draws them itself.' });
  const view = plainView(stage);
  const data = communities(4, stage.preview ? 40 : 120, 5);
  const tint = colors(data.count, (i) => paletteColor(data.group[i] ?? 0));
  let steps = 0;
  let ended = false;

  // div is null: no canvas, no input handlers, no render loop. The device is still given.
  const graph = stage.own(
    new Graph(
      null,
      { simulationDecay: 3000, simulationRepulsion: 0.8, onSimulationEnd: () => (ended = true) },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setLinks(data.links);
  graph.render(1); // upload the data and give the layout fresh energy
  const restart = (): void => {
    graph.setPointPositions(data.positions);
    graph.render(1, 0);
    steps = 0;
    ended = false;
  };

  let reading = false;
  const out = new Float32Array(data.count * 2);
  let raf = 0;
  const frame = (): void => {
    raf = requestAnimationFrame(frame);
    if (!graph.isReady) return;
    if (!ended) {
      graph.step(); // the host's own clock advances the layout
      steps++;
    }
    if (reading) return;
    reading = true;
    graph.getPointPositionsAsync(out).then((p) => {
      reading = false;
      if (!stage.disposed && p.length) view.draw(p, { colors: tint, links: data.links, radius: stage.preview ? 2 : 2.5 });
    }, () => (reading = false));
  };
  raf = requestAnimationFrame(frame);
  stage.onDispose(() => cancelAnimationFrame(raf));

  stage.every(250, () =>
    stage.say(
      ended ? `onSimulationEnd fired after ${steps} step() calls: the layout has settled` : `new Graph(null, …): ${steps} step() calls, positions read with getPointPositionsAsync()`,
      ended ? 'ok' : 'info',
    ),
  );
  stage.button('Scramble and re-run', restart);
  if (stage.preview) stage.every(7000, restart);
  return () => stage.dispose();
};

export default mount;
