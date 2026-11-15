// pointerover and pointerout on every state through onEachFeature, with resetStyle
import { GeoJSON, LeafletMap, type Layer, type LeafletPointerEvent, type Polygon } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { statesData } from '../../shared/data.ts';
import { ghost } from '../../shared/ghost.ts';
import { stateLayer, US_CENTER } from '../../shared/states.ts';

function getColor(d: number): string {
  return d > 1000 ? '#800026' : d > 500 ? '#BD0026' : d > 200 ? '#E31A1C' : d > 100 ? '#FC4E2A' : d > 50 ? '#FD8D3C' : d > 20 ? '#FEB24C' : d > 10 ? '#FED976' : '#FFEDA0';
}
function style(feature: Feature) {
  return { fillColor: getColor(feature.properties?.['density']), weight: 2, opacity: 1, color: 'white', dashArray: '3', fillOpacity: 0.7 };
}

const mount: Mount = async (el, ctx) => {
  const data = await statesData();
  const stage = createStage(el, ctx, { hint: 'Move the pointer over a state: pointerover sets a thick grey border and brings it to the front; pointerout calls geojson.resetStyle.' });
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }).setView(US_CENTER, stage.preview ? 3 : 4));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 19, attribution: LAND_ATTRIBUTION }).addTo(map);

  let geojson: GeoJSON;

  function highlightFeature(e: LeafletPointerEvent): void {
    const layer = e.target as Polygon;
    layer.setStyle({ weight: 5, color: '#666', dashArray: '', fillOpacity: 0.7 });
    layer.bringToFront();
  }
  function resetHighlight(e: LeafletPointerEvent): void {
    geojson.resetStyle(e.target as Layer);
  }
  function onEachFeature(_feature: Feature, layer: Layer): void {
    (layer as Polygon).on({ pointerover: highlightFeature, pointerout: resetHighlight });
  }

  geojson = new GeoJSON(data, { style, onEachFeature }).addTo(map);
  stage.say('pointerover: setStyle + bringToFront; pointerout: resetStyle');

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const names = ['Texas', 'Montana', 'Georgia', 'California'];
    let prev: Polygon | null = null;
    let i = 0;
    stage.every(1300, () => {
      if (prev) g.out(prev.getElement());
      const layer = stateLayer(geojson, names[i++ % names.length]!);
      g.over(layer.getBounds().getCenter(), layer.getElement());
      stage.say(`pointerover ${(layer as unknown as { feature: Feature }).feature.properties?.['name']}`);
      prev = layer;
    });
  }
  return () => stage.dispose();
};

export default mount;
