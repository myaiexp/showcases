// CRS.distance: Euclidean units in SimpleCRS, great-circle metres in an EarthCRS, for the same two points
import { EPSG3857, EPSG4326, LatLng, LeafletMap, Marker, Polyline, Rectangle, SimpleCRS, type CRS } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalWMSTileLayer } from '../../shared/local-tiles.ts';

type Name = 'SimpleCRS' | 'EPSG3857' | 'EPSG4326';
const CRSS: Record<Name, typeof CRS> = { SimpleCRS, EPSG3857, EPSG4326 };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the two markers. The same coordinates give a distance in map units in SimpleCRS and in metres in an Earth CRS. map.distance() calls the map\'s own crs.distance().' });
  let map: LeafletMap | undefined;
  stage.own({ remove: () => map?.remove() });
  let a = new LatLng(20, 10);
  let b = new LatLng(50, 70);

  const use = (name: Name): void => {
    map?.remove();
    const m = (map = new LeafletMap(stage.box, { crs: CRSS[name], center: [35, 40], zoom: name === 'SimpleCRS' ? 3 : 2, minZoom: name === 'SimpleCRS' ? 0 : 1, zoomControl: !stage.preview }));
    if (name === 'SimpleCRS') new Rectangle([[0, 0], [100, 100]], { color: '#60a5fa', weight: 1, fillOpacity: 0.08, interactive: false }).addTo(m);
    else new LocalWMSTileLayer('https://wms.example/ows', { layers: 'land,coast,graticule', styles: 'dark', format: 'image/png', attribution: LAND_ATTRIBUTION }).addTo(m);
    const line = new Polyline([a, b], { color: '#facc15', weight: 3, dashArray: '6 5' }).addTo(m);
    const ma = new Marker(a, { draggable: !stage.preview }).addTo(m);
    const mb = new Marker(b, { draggable: !stage.preview }).addTo(m);
    const read = (): void => {
      a = ma.getLatLng();
      b = mb.getLatLng();
      line.setLatLngs([a, b]);
      const d = m.distance(a, b);
      const text = name === 'SimpleCRS' ? `${d.toFixed(1)} map units` : `${(d / 1000).toFixed(0)} km`;
      stage.say(`${name}: map.distance(a, b) = ${text}; SimpleCRS.distance = ${SimpleCRS.distance(a, b).toFixed(1)}, EPSG3857.distance = ${(EPSG3857.distance(a, b) / 1000).toFixed(0)} km`);
    };
    ma.on('drag', read);
    mb.on('drag', read);
    read();
  };
  let current: Name = 'EPSG3857';
  use(current);
  stage.select('map crs', (Object.keys(CRSS) as Name[]).map((v) => ({ value: v, label: v })), current, (v) => use((current = v)));

  if (stage.preview) {
    const order: Name[] = ['SimpleCRS', 'EPSG3857', 'EPSG4326'];
    let i = 0;
    stage.cycle([{ run: () => use(order[i++ % order.length] as Name) }], 2600);
  }
  return () => stage.dispose();
};

export default mount;
