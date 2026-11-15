// onZoomStart, onZoom and onZoomEnd, and whether the user caused the zoom
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { eventLog } from '../../shared/log.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll to zoom, drag the background to pan, or use the buttons.' });
  const log = eventLog(stage, 14);
  const data = communities(4, 30, 3);
  let frames = 0;

  const who = (userDriven: boolean): string => (userDriven ? 'by the user' : 'by code');
  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 10,
        linkDefaultColor: '#5a5f6a',
        fitViewDelay: 1500,
        onZoomStart: (e, userDriven) => {
          frames = 0;
          log(`onZoomStart ${who(userDriven)}: k = ${e.transform.k.toFixed(2)}`, 'ok');
        },
        onZoom: (e, userDriven) => {
          frames++;
          if (frames % 6 === 0) log(`onZoom ${who(userDriven)}: k = ${e.transform.k.toFixed(2)}, x = ${e.transform.x.toFixed(0)}, y = ${e.transform.y.toFixed(0)}`);
        },
        onZoomEnd: (e, userDriven) => log(`onZoomEnd ${who(userDriven)}: k = ${e.transform.k.toFixed(2)} after ${frames} zoom events`, 'warn'),
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  // The init fit sees only the start scatter: in the full view, fit again once the layout has spread.
  if (!stage.preview) stage.after(2500, () => graph.fitView(600, 0.12));

  stage.button('zoom(3, 800)', () => graph.zoom(3, 800));
  stage.button('zoomToPointByIndex(60)', () => graph.zoomToPointByIndex(60, 800, 4));
  stage.button('fitView()', () => graph.fitView(800));
  log('Waiting for a zoom');

  if (stage.preview) {
    // Cards cannot scroll: the same events come from API calls (userDriven is false).
    stage.cycle([
      { run: () => graph.zoom(2.5, 900) },
      { run: () => graph.zoomToPointByIndex(75, 900, 4) },
      { run: () => graph.fitView(900) },
    ], 2500);
  }
  return () => stage.dispose();
};

export default mount;
