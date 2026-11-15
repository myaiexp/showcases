// pointOcclusionCulling skips hidden fragments of overlapping points
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scatter } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Compare the FPS monitor with culling on and off. The picture is identical.' });
  const count = stage.preview ? 700 : 20000;

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, showFPSMonitor: true, pointOcclusionCulling: true, pointOpacity: 1, pointDefaultSize: 42, fitViewPadding: 0.1 },
      stage.device(),
    ),
  );
  graph.setPointPositions(scatter(count, 500, 2));
  graph.setPointColors(colors(count, (i) => paletteColor(i)));
  graph.render();

  let culling = true;
  let opacity = 1;
  const apply = () => {
    graph.setConfigPartial({ pointOcclusionCulling: culling, pointOpacity: opacity });
    const safe = culling && opacity === 1;
    stage.say(
      `pointOcclusionCulling: ${culling}, pointOpacity: ${opacity} → ${safe ? 'hidden fragments are skipped' : culling ? 'translucent points: culling cannot apply' : 'every fragment is shaded and blended'}`,
    );
  };
  stage.toggle('pointOcclusionCulling', true, (v) => ((culling = v), apply()));
  stage.toggle('Translucent (pointOpacity 0.9)', false, (v) => ((opacity = v ? 0.9 : 1), apply()));
  apply();
  stage.cycle(
    [
      { run: () => ((culling = true), apply()) },
      { run: () => ((culling = false), apply()) },
    ],
    3000,
  );
  return () => stage.dispose();
};

export default mount;
