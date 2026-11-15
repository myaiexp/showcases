// pointDefaultSize is the size of every point without one of its own
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { perItem } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The outer ring has its own sizes; the other points follow the default.' });
  const data = web(10, 3, 38);

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 4, linkDefaultColor: '#556', fitViewPadding: 0.2 },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  // NaN = no size of its own, so only the outer ring (group 3) is set explicitly.
  graph.setPointSizes(perItem(data.count, (i) => ((data.group[i] ?? 0) === 3 ? 22 : NaN)));
  graph.render();

  const set = (v: number) => {
    graph.setConfigPartial({ pointDefaultSize: v });
    stage.say(`pointDefaultSize: ${v}`);
  };
  stage.slider('pointDefaultSize', 1, 24, 1, 4, set);
  stage.say('pointDefaultSize: 4 (the default)');
  stage.cycle([4, 12, 20, 8].map((v) => ({ run: () => set(v) })), 2000);
  return () => stage.dispose();
};

export default mount;
