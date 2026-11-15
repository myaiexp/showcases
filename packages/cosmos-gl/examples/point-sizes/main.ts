// setPointSizes sizes each point; pointSizeScale multiplies them all
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { perItem } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Sizes are per point; the scale slider multiplies all of them.' });
  const data = web(10, 4, 34);

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointSizeScale: 1, linkDefaultColor: '#556', fitViewPadding: 0.2, transitionDuration: 700 },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);

  const sets: Record<string, (i: number) => number> = {
    'Grow with the ring': (i) => 5 + (data.group[i] ?? 0) * 4,
    'Shrink with the ring': (i) => 22 - (data.group[i] ?? 0) * 4,
    'Alternate small and large': (i) => (i % 2 ? 6 : 18),
  };
  const apply = (name: string) => {
    graph.setPointSizes(perItem(data.count, sets[name] ?? (() => 8)));
    graph.render();
    stage.say(`${name}: setPointSizes(…), pointSizeScale ${scale}`);
  };
  let scale = 1;
  const setScale = (s: number) => {
    scale = s;
    graph.setConfigPartial({ pointSizeScale: s });
    stage.say(`pointSizeScale: ${s}`);
  };
  apply('Grow with the ring');
  stage.select('setPointSizes', Object.keys(sets).map((k) => ({ value: k, label: k })), 'Grow with the ring', apply);
  stage.slider('pointSizeScale', 0.25, 3, 0.05, 1, setScale);
  stage.cycle(
    [
      { run: () => apply('Grow with the ring') },
      { run: () => apply('Shrink with the ring') },
      { run: () => apply('Alternate small and large') },
      { run: () => setScale(1.8) },
      { run: () => setScale(1) },
    ],
    2000,
  );
  return () => stage.dispose();
};

export default mount;
