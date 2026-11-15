// zoomReverse: the zoom in the URL is maxZoom minus the map zoom, for servers that number zoom backwards
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { coordsLabel, onRequest, shortUrl } from '../../shared/tile-urls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The grid prints the zoom from the URL. With zoomReverse the server is asked for a different level than the map shows, so the picture is not the world any more.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [20, 0], zoom: 3, minZoom: 0, maxZoom: 6 }));
  const log = stage.log('Tile requests', 8);

  let layer: LocalTileLayer | undefined;
  let reverse = true;
  const use = (): void => {
    layer?.remove();
    // With maxZoom 6 and zoomReverse, map zoom 2 asks for z4, zoom 3 for z3, zoom 4 for z2.
    layer = new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { maxZoom: 6, zoomReverse: reverse, attribution: LAND_ATTRIBUTION });
    onRequest(layer, (u, c) => log(`map zoom ${map.getZoom()} → ${coordsLabel(c)}\n  ${shortUrl(u)}`));
    layer.addTo(map);
    stage.say(`zoomReverse: ${reverse}, maxZoom 6`, reverse ? 'warn' : 'ok');
  };
  use();
  stage.toggle('zoomReverse', true, (on) => ((reverse = on), use()));
  stage.button('Zoom in', () => map.zoomIn());
  stage.button('Zoom out', () => map.zoomOut());

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => ((reverse = true), use(), map.setZoom(3)) },
        { run: () => map.setZoom(2) },
        { run: () => map.setZoom(4) },
        { run: () => ((reverse = false), use(), map.setZoom(3)) },
      ],
      2400,
    );
  }
  return () => stage.dispose();
};

export default mount;
