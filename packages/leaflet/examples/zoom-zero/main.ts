// Zoom locked to 0: the whole world is a single 256 px tile
import { CircleMarker, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'minZoom and maxZoom are both 0, so the map cannot zoom. The grid style draws the tile edge and its z/x/y.', height: 360 });

  const map = stage.own(new LeafletMap(stage.box, { minZoom: 0, maxZoom: 0 }));
  new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  map.setView([0, 0], 0);
  stage.say('Zoom 0: the world is one tile, 256 px wide and high.');

  // A dot circling the equator, so the card moves.
  const dot = new CircleMarker([0, 0], { radius: 5, color: '#f90' }).addTo(map);
  let t = 0;
  stage.every(60, () => {
    t += 0.04;
    dot.setLatLng([50 * Math.sin(t * 0.7), ((t * 40) % 360) - 180]);
  });
  return () => stage.dispose();
};

export default mount;
