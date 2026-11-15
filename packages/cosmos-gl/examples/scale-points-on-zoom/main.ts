// scalePointsOnZoom makes points grow and shrink with the zoom
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'You can also scroll to zoom.' });
  const data = web(10, 4, 34);

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, scalePointsOnZoom: false, pointDefaultSize: 8, linkDefaultColor: '#556', fitViewDelay: 100, fitViewDuration: 0, fitViewPadding: 0.2 },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();

  let home = 1; // the zoom level right after the fit
  let scale = false;
  const zoomTo = (m: number) => {
    graph.setZoomLevel(home * m, 900);
    stage.say(`scalePointsOnZoom: ${scale} · zoom ×${m}`);
  };
  const setScale = (on: boolean) => {
    scale = on;
    graph.setConfigPartial({ scalePointsOnZoom: on });
    stage.say(`scalePointsOnZoom: ${on}`);
  };
  stage.toggle('scalePointsOnZoom', false, setScale);
  stage.slider('Zoom', 0.5, 4, 0.1, 1, (m) => graph.setZoomLevel(home * m, 0));
  stage.cycle(
    [
      { run: async () => { await stage.wait(600); home = graph.getZoomLevel(); setScale(false); }, hold: 500 },
      { run: () => zoomTo(2.5), hold: 1800 },
      { run: () => zoomTo(1), hold: 1500 },
      { run: () => setScale(true), hold: 500 },
      { run: () => zoomTo(2.5), hold: 1800 },
      { run: () => zoomTo(1), hold: 1500 },
    ],
    1000,
  );
  return () => stage.dispose();
};

export default mount;
