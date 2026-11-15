// enableRenderLoop false: the page calls step() and renderOneFrame() itself
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tree } from '../../shared/data.ts';
import { keepFramed, load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hold the host loop back: with no frames from the page, the graph does not move or redraw.' });
  const data = tree(130, 25);
  let frames = 0;
  let running = true;
  let loop = 0;

  const graph = stage.own(
    new Graph(stage.div, { pointDefaultSize: 7, linkDefaultColor: '#5a5f6a', enableRenderLoop: false, simulationDecay: 3000, fitViewDelay: 1200 }, stage.device()),
  );
  load(graph, data);
  keepFramed(stage, graph, 2500);

  const tick = (): void => {
    loop = requestAnimationFrame(tick);
    if (!running || !graph.isReady) return;
    graph.step(); // one simulation tick
    graph.renderOneFrame(); // one draw
    frames++;
  };
  loop = requestAnimationFrame(tick);
  stage.onDispose(() => cancelAnimationFrame(loop));
  stage.every(300, () =>
    stage.say(running ? `enableRenderLoop false, host loop running: step() and renderOneFrame() called ${frames} times` : `host loop held back at ${frames} calls: the graph is frozen`, running ? 'ok' : 'warn'),
  );

  const toggle = (): void => {
    running = !running;
  };
  stage.toggle('host loop runs', true, (on) => (running = on));
  stage.button('Restart layout', () => {
    graph.setPointPositions(data.positions);
    graph.render(1, 0);
  });

  if (stage.preview) stage.every(3500, toggle);
  return () => stage.dispose();
};

export default mount;
