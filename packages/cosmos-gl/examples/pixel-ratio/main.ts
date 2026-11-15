// pixelRatio sets the canvas resolution: low is blocky, high is sharp
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the ratio down and the edges turn blocky.' });
  const data = web(8, 3, 36);

  const graph = stage.own(
    new Graph(
      stage.div,
      { pixelRatio: 2, enableSimulation: false, pointDefaultSize: 16, pointDefaultColor: '#8fc1ff', linkDefaultColor: '#aab', linkDefaultWidth: 2, fitViewPadding: 0.2 },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setLinks(data.links);
  graph.render();

  const set = (r: number) => {
    graph.setConfigPartial({ pixelRatio: r });
    stage.say(`pixelRatio: ${r} (window.devicePixelRatio is ${window.devicePixelRatio})`);
  };
  stage.slider('pixelRatio', 0.25, 3, 0.25, 2, set);
  stage.say('pixelRatio: 2');
  stage.cycle([0.3, 1, 2].map((r) => ({ run: () => set(r) })), 2200);
  return () => stage.dispose();
};

export default mount;
