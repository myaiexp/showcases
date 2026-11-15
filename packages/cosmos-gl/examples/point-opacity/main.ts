// pointOpacity multiplies the alpha of every point at once
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scatter } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One number changes all points; no color array is rebuilt.' });
  const count = 90;

  const graph = stage.own(
    new Graph(stage.div, { enableSimulation: false, pointDefaultSize: 36, pointOpacity: 1, fitViewPadding: 0.2 }, stage.device()),
  );
  graph.setPointPositions(scatter(count, 120, 5));
  graph.setPointColors(colors(count, (i) => paletteColor(i)));
  graph.render();

  const set = (v: number) => {
    graph.setConfigPartial({ pointOpacity: v });
    stage.say(`pointOpacity: ${v}`);
  };
  stage.slider('pointOpacity', 0, 1, 0.05, 1, set);
  stage.say('pointOpacity: 1');
  stage.cycle([1, 0.6, 0.3, 0.1, 0.6].map((v) => ({ run: () => set(v) })), 1600);
  return () => stage.dispose();
};

export default mount;
