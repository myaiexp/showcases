// pointDefaultStrokeWidth draws a band in a shade of the point's color
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scatter } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The band is inset and derived from each fill, so overlapping points stay apart.' });
  const count = 70;

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 40, pointDefaultStrokeWidth: 0, pointDefaultStrokeColor: 'auto', pointStrokeContrast: 0.1, fitViewPadding: 0.2 },
      stage.device(),
    ),
  );
  graph.setPointPositions(scatter(count, 110, 12));
  graph.setPointColors(colors(count, (i) => paletteColor(i * 3)));
  graph.render();

  const set = (w: number) => {
    graph.setConfigPartial({ pointDefaultStrokeWidth: w });
    stage.say(w === 0 ? 'pointDefaultStrokeWidth: 0 (no stroke, no cost)' : `pointDefaultStrokeWidth: ${w} px`);
  };
  stage.slider('pointDefaultStrokeWidth', 0, 8, 0.5, 0, set);
  stage.say('pointDefaultStrokeWidth: 0');
  stage.cycle([0, 1, 2.5, 5].map((w) => ({ run: () => set(w) })), 2000);
  return () => stage.dispose();
};

export default mount;
