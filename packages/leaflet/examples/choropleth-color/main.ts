// Colour each state with a style function that reads properties.density
import { GeoJSON, LeafletMap } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { statesData } from '../../shared/data.ts';
import { US_CENTER } from '../../shared/states.ts';

function getColor(d: number): string {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature: Feature) {
  return {
    fillColor: getColor(feature.properties?.['density']),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  };
}

const mount: Mount = async (el, ctx) => {
  const data = await statesData();
  const stage = createStage(el, ctx, { hint: 'getColor maps a density to one of eight ColorBrewer colours; the style option applies it to every state.' });
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }).setView(US_CENTER, stage.preview ? 3 : 4));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 19, attribution: LAND_ATTRIBUTION }).addTo(map);

  const geojson = new GeoJSON(data, { style }).addTo(map);
  stage.say('style(feature) returns fillColor getColor(feature.properties.density), a white dashed stroke');

  // Re-run the same function with different density cut-offs to show the layer is restyled by setStyle.
  stage.toggle('Fade (setStyle)', false, (on) => geojson.setStyle((f) => ({ ...style(f), fillOpacity: on ? 0.25 : 0.7 })));
  if (stage.preview) {
    let faded = false;
    stage.every(2400, () => geojson.setStyle((f) => ({ ...style(f), fillOpacity: (faded = !faded) ? 0.25 : 0.85 })));
  }
  return () => stage.dispose();
};

export default mount;
