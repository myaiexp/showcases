// step() advances a paused layout one tick at a time
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tree } from '../../shared/data.ts';
import { keepFramed } from '../../shared/load.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The layout is paused. Each step() moves it forward by one tick.' });
  const data = tree(130, 6);
  let steps = 0;

  const graph = stage.own(
    new Graph(stage.div, { pointDefaultSize: 7, linkDefaultColor: '#5a5f6a', simulationDecay: 2500, fitViewDelay: 1200 }, stage.device()),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  keepFramed(stage, graph, 2500);

  const say = (): void => stage.say(`Paused: isSimulationRunning ${graph.isSimulationRunning}. step() called ${steps} time${steps === 1 ? '' : 's'}.`);
  const advance = (n: number): void => {
    for (let i = 0; i < n; i++) graph.step();
    steps += n;
    say();
  };
  const restart = (): void => {
    steps = 0;
    graph.setPointPositions(data.positions);
    graph.render(1, 0);
    graph.pause();
    say();
  };
  stage.button('step()', () => advance(1));
  stage.button('step() × 10', () => advance(10));
  stage.button('Restart paused', restart);
  stage.after(300, restart);

  if (stage.preview) {
    stage.every(120, () => {
      if (!graph.isReady) return;
      if (steps >= 160) restart();
      else advance(4);
    });
  }
  return () => stage.dispose();
};

export default mount;
