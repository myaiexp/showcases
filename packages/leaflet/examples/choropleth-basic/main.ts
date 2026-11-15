// The tutorial's first step: US state shapes from GeoJSON, with Leaflet's default path style
import { GeoJSON, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { statesData } from '../../shared/data.ts';
import { US_CENTER } from '../../shared/states.ts';

const mount: Mount = async (el, ctx) => {
  const data = await statesData();
  const stage = createStage(el, ctx, { hint: 'statesData is a FeatureCollection of 52 state polygons; each feature has properties.name and properties.density.' });
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }).setView(US_CENTER, stage.preview ? 3 : 4));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 19, attribution: LAND_ATTRIBUTION }).addTo(map);

  new GeoJSON(data).addTo(map);
  stage.say(`new GeoJSON(statesData).addTo(map): ${data.features.length} features`);

  if (stage.preview) {
    const views: [number, number][] = [[31, -100], [44, -108], [37.8, -80], [37.8, -96]];
    let i = 0;
    stage.every(2200, () => map.panTo(views[++i % views.length]!));
  }
  return () => stage.dispose();
};

export default mount;
