// linkVisibilityDistanceRange fades long links on screen
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { webLinks } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Short links near the hub stay solid, the long ones near the rim fade. Zoom to change lengths.' });
  const w = webLinks(8, 4);
  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        pointDefaultSize: 8,
        fitViewPadding: 0.1,
        linkDefaultColor: '#dde3f0',
        linkDefaultWidth: 2.5,
        linkVisibilityDistanceRange: [50, 150],
        linkVisibilityMinTransparency: 0.25,
        fitViewDelay: 100,
        fitViewDuration: 0,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(w.data.positions);
  graph.setPointColors(colors(w.data.count, (i) => paletteColor(w.data.group[i] ?? 0)));
  graph.setLinks(w.data.links);
  graph.render();

  let home = 1;
  let range: [number, number] = [50, 150];
  let floor = 0.25;
  const apply = () => {
    graph.setConfigPartial({ linkVisibilityDistanceRange: range, linkVisibilityMinTransparency: floor });
    stage.say(`linkVisibilityDistanceRange: [${range[0]}, ${range[1]}] px · linkVisibilityMinTransparency: ${floor}`);
  };
  stage.slider('Range start (px)', 0, 150, 5, 50, (v) => ((range = [v, Math.max(v + 5, range[1])]), apply()));
  stage.slider('Range end (px)', 10, 300, 5, 150, (v) => ((range = [Math.min(range[0], v - 5), v]), apply()));
  stage.slider('linkVisibilityMinTransparency', 0, 1, 0.05, 0.25, (v) => ((floor = v), apply()));
  stage.slider('Zoom', 0.5, 3, 0.1, 1, (m) => graph.setZoomLevel(home * m, 0));
  stage.cycle(
    [
      { run: async () => { await stage.wait(500); home = graph.getZoomLevel(); range = [50, 150]; floor = 0.25; apply(); } },
      { run: () => ((range = [10, 40]), (floor = 0), apply()) },
      { run: () => ((range = [10, 40]), (floor = 0.6), apply()) },
      { run: () => { range = [200, 400]; floor = 0.25; apply(); } },
    ],
    2400,
  );
  return () => stage.dispose();
};

export default mount;
