// enableRenderLoop false: the host sets the frame rate and steps per frame
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { keepFramed } from '../../shared/load.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slow the frame rate to watch single frames; raise the steps per frame to run the layout faster than it is drawn.' });
  const data = communities(5, 50, 8);
  let fps = 60;
  let perFrame = 1;
  let steps = 0;
  let frames = 0;

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableRenderLoop: false, pointDefaultSize: 6, linkDefaultColor: '#5a5f6a', simulationDecay: 8000, fitViewDelay: 1000 },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  keepFramed(stage, graph, 3000);

  // The host's clock: requestAnimationFrame ticks, a frame is drawn only when 1/fps has passed.
  let last = 0;
  let raf = 0;
  const tick = (now: number): void => {
    raf = requestAnimationFrame(tick);
    if (!graph.isReady || now - last < 1000 / fps - 4) return;
    last = now;
    for (let i = 0; i < perFrame; i++) {
      graph.step();
      steps++;
    }
    graph.renderOneFrame();
    frames++;
  };
  raf = requestAnimationFrame(tick);
  stage.onDispose(() => cancelAnimationFrame(raf));

  const say = (): void =>
    stage.say(`${fps} frames per second × ${perFrame} step() per frame: ${steps} steps, ${frames} renderOneFrame() calls so far`);
  stage.slider('Frames per second', 1, 60, 1, fps, (v) => ((fps = v), say()));
  stage.slider('Steps per frame', 1, 12, 1, perFrame, (v) => ((perFrame = v), say()));
  stage.every(300, say);
  stage.cycle(
    [
      { run: () => ((fps = 60), (perFrame = 1)) },
      { run: () => ((fps = 3), (perFrame = 1)) },
      { run: () => ((fps = 60), (perFrame = 8)) },
    ],
    3200,
  );
  return () => stage.dispose();
};

export default mount;
