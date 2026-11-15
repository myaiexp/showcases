// EPSG3395 against EPSG3857: elliptical Mercator puts high latitudes at slightly different heights
import { EPSG3395, EPSG3857, LatLng, LeafletMap, Marker, type CRS } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalWMSTileLayer } from '../../shared/local-tiles.ts';

type Name = 'EPSG3857' | 'EPSG3395';
const CRSS: Record<Name, typeof CRS> = { EPSG3857, EPSG3395 };
const LATS = [0, 30, 60, 80];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same four latitudes, in both CRSs. EPSG3857 treats the Earth as a sphere, EPSG3395 as an ellipsoid: the x axis agrees, y differs more the further from the equator. The WMS server draws each in the map\'s own crs.' });
  const pre = stage.side('crs.project([lat, 10]).y, metres');
  let map: LeafletMap | undefined;
  stage.own({ remove: () => map?.remove() });

  const use = (name: Name): void => {
    map?.remove();
    const crs = CRSS[name];
    map = new LeafletMap(stage.box, { crs, center: [45, 10], zoom: 2, zoomControl: !stage.preview });
    new LocalWMSTileLayer('https://wms.example/ows', { layers: 'land,coast,graticule', styles: 'dark', format: 'image/png', attribution: LAND_ATTRIBUTION }).addTo(map);
    for (const lat of LATS) new Marker([lat, 10]).addTo(map).bindTooltip(`${lat}°`, { permanent: true, direction: 'right' });
    const rows = LATS.map((lat) => {
      const a = EPSG3857.project(new LatLng(lat, 10)).y;
      const b = EPSG3395.project(new LatLng(lat, 10)).y;
      return { lat, a, b };
    });
    if (pre) pre.textContent = rows.map((r) => `lat ${r.lat}\n  3857 ${r.a.toFixed(0)}\n  3395 ${r.b.toFixed(0)}\n  diff ${(r.a - r.b).toFixed(0)} m`).join('\n');
    const r60 = rows[2] as (typeof rows)[number];
    stage.say(`${crs.code}: at 60° N the y is ${(name === 'EPSG3857' ? r60.a : r60.b).toFixed(0)} m; the other CRS says ${(name === 'EPSG3857' ? r60.b : r60.a).toFixed(0)} m`);
  };
  let current: Name = 'EPSG3857';
  use(current);
  stage.select('map crs', [{ value: 'EPSG3857', label: 'EPSG3857' }, { value: 'EPSG3395', label: 'EPSG3395' }], current, (v) => use((current = v)));

  if (stage.preview) stage.cycle([{ run: () => use('EPSG3857') }, { run: () => use('EPSG3395') }], 2600);
  return () => stage.dispose();
};

export default mount;
