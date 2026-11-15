// In SimpleCRS a LatLng is [y, x]: the same numbers swapped land somewhere else, and an xy helper reads better
import { CircleMarker, ImageOverlay, LatLng, LeafletMap, Marker, SimpleCRS } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { images } from '../../shared/data.ts';
import { STARS, UQM_BOUNDS } from '../../shared/uqm.ts';

// The tutorial's helper: write (x, y), get the LatLng that SimpleCRS wants, which is (y, x).
const yx = LatLng;
const xy = (x: number | [number, number], y?: number): LatLng => (Array.isArray(x) ? new yx(x[1], x[0]) : new yx(y as number, x));

const mount: Mount = async (el, ctx) => {
  const url = await images.uqmMap();
  const stage = createStage(el, ctx, { hint: 'Blue markers use xy(x, y) with the game\'s own coordinates. The orange rings pass the same two numbers to LatLng in the wrong order, so each lands at the mirrored place.', height: 420 });
  const map = stage.own(new LeafletMap(stage.box, { crs: SimpleCRS, minZoom: -5, maxZoom: 2, zoomSnap: 0.25, zoomControl: !stage.preview }));
  new ImageOverlay(url, UQM_BOUNDS).addTo(map);
  map.setView([70, 120], stage.preview ? 0 : 1);

  const markers = STARS.map((s) => new Marker(xy(s.x, s.y), { title: s.name }).addTo(map).bindPopup(`${s.name}: xy(${s.x}, ${s.y}) is LatLng(${s.y}, ${s.x})`));
  let swapped = STARS.map((s) => new CircleMarker([s.x, s.y], { radius: 8, color: '#fb923c', fill: false, weight: 3 }));
  const showSwapped = (on: boolean): void => swapped.forEach((c) => (on ? c.addTo(map) : c.remove()));
  showSwapped(true);
  stage.toggle('Show the swapped coordinates', true, showSwapped);
  stage.say('Orange rings: LatLng(x, y), the wrong order');

  if (stage.preview) {
    let i = 0;
    stage.every(2300, () => {
      const m = markers[i++ % markers.length] as Marker;
      m.openPopup();
      map.panTo(m.getLatLng());
      const s = STARS[(i - 1) % STARS.length] as (typeof STARS)[number];
      stage.say(`${s.name}: xy(${s.x}, ${s.y}) = LatLng(${s.y}, ${s.x})`);
    });
  }
  stage.onDispose(() => { swapped = []; });
  return () => stage.dispose();
};

export default mount;
