// A Polyline between two stars on a SimpleCRS map, and its length in map units from map.distance
import { CircleMarker, ImageOverlay, LatLng, LeafletMap, Marker, Polyline, SimpleCRS } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { images } from '../../shared/data.ts';
import { STARS, UQM_BOUNDS } from '../../shared/uqm.ts';

const mount: Mount = async (el, ctx) => {
  const url = await images.uqmMap();
  const stage = createStage(el, ctx, { hint: 'Sol to Deneb as a Polyline. In SimpleCRS, map.distance() is the plain Euclidean distance in map units, not metres.', height: 420 });
  const map = stage.own(new LeafletMap(stage.box, { crs: SimpleCRS, minZoom: -5, maxZoom: 2, zoomSnap: 0.25, zoomControl: !stage.preview }));
  new ImageOverlay(url, UQM_BOUNDS).addTo(map);
  map.setView([80, 100], stage.preview ? 0 : 1);

  const at = (name: string): LatLng => {
    const s = STARS.find((st) => st.name === name) as (typeof STARS)[number];
    return new LatLng(s.y, s.x);
  };
  const sol = at('Sol');
  const deneb = at('Deneb');
  for (const s of STARS) new Marker(at(s.name), { title: s.name }).addTo(map).bindPopup(s.name);
  new Polyline([sol, deneb], { color: '#34d399', weight: 3, dashArray: '8 6' }).addTo(map);
  const ship = new CircleMarker(sol, { radius: 6, color: '#facc15', fillOpacity: 1 }).addTo(map);

  const total = map.distance(sol, deneb);
  stage.say(`Sol to Deneb: map.distance = ${total.toFixed(1)} units`);
  let t = 0;
  stage.every(60, () => {
    t = (t + 0.01) % 1;
    const p = new LatLng(sol.lat + (deneb.lat - sol.lat) * t, sol.lng + (deneb.lng - sol.lng) * t);
    ship.setLatLng(p);
    if (stage.preview || t === 0) return;
    stage.say(`Sol to Deneb: ${total.toFixed(1)} units; the ship has ${map.distance(p, deneb).toFixed(1)} left`);
  });
  return () => stage.dispose();
};

export default mount;
