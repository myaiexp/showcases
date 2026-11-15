// An EPSG4326 map: longitude and latitude are the pixels, so the world is 2:1 and a degree is the same height everywhere
import { EPSG4326, LeafletMap, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { LAND_ATTRIBUTION, LocalWMSTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom 0 is two 256 px tiles side by side, 512 by 256 px for 360 by 180 degrees. Greenland keeps its true shape and Antarctica is as wide as the equator. Move the pointer: x and y are linear in lng and lat.' });
  const map = stage.own(new LeafletMap(stage.box, { crs: EPSG4326, center: [20, 10], zoom: 1, minZoom: 0, zoomControl: !stage.preview }));
  new LocalWMSTileLayer('https://wms.example/ows', { layers: 'land,coast,graticule', styles: 'dark', format: 'image/png', attribution: LAND_ATTRIBUTION }).addTo(map);
  new Rectangle([[-90, -180], [90, 180]], { color: '#fb923c', weight: 2, fill: false, interactive: false }).addTo(map);

  const show = (lat: number, lng: number): void => {
    const z = map.getZoom();
    const p = EPSG4326.latLngToPoint(map.wrapLatLng([lat, lng]), z);
    stage.say(`crs ${EPSG4326.code}, zoom ${z}: [${lat.toFixed(1)}, ${lng.toFixed(1)}] is pixel (${p.x.toFixed(0)}, ${p.y.toFixed(0)}) of a ${EPSG4326.scale(z) * 2} by ${EPSG4326.scale(z)} px world`);
  };
  map.on('pointermove', (e) => show(e.latlng.lat, e.latlng.lng));
  show(20, 10);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const path: [number, number][] = [[60, -100], [0, 0], [-45, 120], [70, 30]];
    let i = 0;
    stage.every(1500, () => g.move(path[i++ % path.length] as [number, number]));
  }
  return () => stage.dispose();
};

export default mount;
