// pointToLayer: draw GeoJSON Points as circle markers instead of the default Marker
import { CircleMarker, GeoJSON, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { denverSample } from '../../shared/data.ts';

const geojsonMarkerOptions = { radius: 8, fillColor: '#ff7800', color: '#000', weight: 1, opacity: 1, fillOpacity: 0.8 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same bicycle-rental points, drawn with the default Marker or with pointToLayer returning a CircleMarker.' });
  const { bicycleRental } = await denverSample();
  const map = stage.own(new LeafletMap(stage.box, { center: [39.75, -104.99], zoom: stage.preview ? 13 : 14, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const plain = new GeoJSON(bicycleRental);
  const circles = new GeoJSON(bicycleRental, {
    pointToLayer(feature, latlng) {
      return new CircleMarker(latlng, geojsonMarkerOptions);
    },
  });
  let current: GeoJSON | null = null;
  const use = (which: 'marker' | 'circle'): void => {
    current?.remove();
    current = (which === 'marker' ? plain : circles).addTo(map);
    stage.say(which === 'marker' ? 'Default: each Point becomes a Marker' : 'pointToLayer(feature, latlng) returns a CircleMarker for each Point');
  };
  stage.select<'marker' | 'circle'>('Points as', [{ value: 'marker', label: 'default Marker' }, { value: 'circle', label: 'pointToLayer: CircleMarker' }], 'circle', use);
  use('circle');
  if (stage.preview) {
    let flip = false;
    stage.every(2200, () => use((flip = !flip) ? 'marker' : 'circle'));
  }
  return () => stage.dispose();
};

export default mount;
