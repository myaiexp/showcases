// The style option as a function of each feature's properties
import { GeoJSON, LeafletMap } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

type Party = 'Republican' | 'Democrat';
const states: Feature[] = [
  {
    type: 'Feature',
    properties: { party: 'Republican' },
    geometry: { type: 'Polygon', coordinates: [[[-104.05, 48.99], [-97.22, 48.98], [-96.58, 45.94], [-104.03, 45.94], [-104.05, 48.99]]] },
  },
  {
    type: 'Feature',
    properties: { party: 'Democrat' },
    geometry: { type: 'Polygon', coordinates: [[[-109.05, 41.0], [-102.06, 40.99], [-102.03, 36.99], [-109.04, 36.99], [-109.05, 41.0]]] },
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The style function reads feature.properties.party for each polygon. Swap the parties to call it again with setStyle.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [43, -101], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const layer = new GeoJSON(states, {
    style(feature) {
      switch ((feature.properties as { party: Party }).party) {
        case 'Republican':
          return { color: '#ff0000' };
        case 'Democrat':
          return { color: '#0000ff' };
      }
      return {};
    },
  }).addTo(map);

  const swap = (): void => {
    for (const l of layer.getLayers()) {
      const props = (l as unknown as { feature: Feature }).feature.properties as { party: Party };
      props.party = props.party === 'Republican' ? 'Democrat' : 'Republican';
    }
    layer.resetStyle();
    stage.say('Parties swapped in the data, then resetStyle() runs the style function again');
  };
  stage.button('Swap parties', swap);
  stage.say('Republican polygons are red, Democrat polygons are blue');
  if (stage.preview) stage.every(2200, swap);
  return () => stage.dispose();
};

export default mount;
