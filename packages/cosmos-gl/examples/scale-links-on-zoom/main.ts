// scaleLinksOnZoom makes link widths and dash patterns grow with the zoom
import { Graph, LinkStyle } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { webLinks } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The links are dashed so you can see the pattern lock to the link when scaling is on. You can also scroll to zoom.' });
  const w = webLinks(8, 3);
  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        pointDefaultSize: 8,
        fitViewPadding: 0.1,
        linkDefaultColor: '#dde3f0',
        linkDefaultWidth: 2,
        linkDefaultStyle: LinkStyle.Dashed,
        scaleLinksOnZoom: false,
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
  let scale = false;
  const setScale = (on: boolean) => {
    scale = on;
    graph.setConfigPartial({ scaleLinksOnZoom: on });
    stage.say(`scaleLinksOnZoom: ${on}`);
  };
  const zoomTo = (m: number) => {
    graph.setZoomLevel(home * m, 900);
    stage.say(`scaleLinksOnZoom: ${scale} · zoom ×${m}`);
  };
  stage.toggle('scaleLinksOnZoom', false, setScale);
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
