// A TileLayer URL template with {s}, {z}, {x}, {y} and {r}, and the URL Leaflet builds for each tile
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { onRequest, shortUrl } from '../../shared/tile-urls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pan and zoom: every tile Leaflet requests adds the URL it built from the template to the log.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48.8, 2.3], zoom: 4 }));

  // {s} is a subdomain, {z}/{x}/{y} the tile, {r} is '@2x' on a high-density screen and '' otherwise.
  const layer = new LocalTileLayer('https://{s}.tiles.example/grid/{z}/{x}/{y}{r}.png', {
    attribution: LAND_ATTRIBUTION,
  });

  const log = stage.log('Requested URLs', 16);
  onRequest(layer, (url) => log(shortUrl(url)));
  layer.addTo(map);

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => map.setView([35, -100], 3) },
        { run: () => map.setView([-20, 130], 5) },
        { run: () => map.setView([48.8, 2.3], 4) },
      ],
      2600,
    );
  }
  return () => stage.dispose();
};

export default mount;
