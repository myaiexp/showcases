// A style option also styles the circles that pointToLayer returns
import { CircleMarker, GeoJSON, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { denverSample } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'pointToLayer makes the circles; the style function then colours each one from its feature, as it does lines and polygons.' });
  const { lightRailStop, bicycleRental, freeBus } = await denverSample();
  const map = stage.own(new LeafletMap(stage.box, { center: [39.75, -104.99], zoom: stage.preview ? 13 : 14, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const options = {
    pointToLayer: (_feature: unknown, latlng: Parameters<typeof CircleMarker['prototype']['setLatLng']>[0]) => new CircleMarker(latlng, { radius: 7 }),
  };
  let hue = 30;
  const style = (feature: { geometry: { type: string } }) => ({
    color: '#000',
    weight: 1,
    fillOpacity: 0.85,
    fillColor: feature.geometry.type === 'Point' ? `hsl(${hue} 90% 55%)` : '#38bdf8',
  });
  const stops = new GeoJSON(lightRailStop, { ...options, style }).addTo(map);
  const bikes = new GeoJSON(bicycleRental, { ...options, style }).addTo(map);
  new GeoJSON(freeBus, { style: { color: '#a3e635', weight: 4 } }).addTo(map);

  const recolor = (h: number): void => {
    hue = h;
    stops.setStyle(style);
    bikes.setStyle(style);
    stage.say(`style returns fillColor hsl(${h} 90% 55%) for every Point's circle`);
  };
  stage.slider('hue', 0, 360, 5, hue, recolor);
  stage.say('style applies to circles made inside pointToLayer');
  if (stage.preview) {
    let h = 30;
    stage.every(250, () => recolor((h = (h + 20) % 360)));
  }
  return () => stage.dispose();
};

export default mount;
