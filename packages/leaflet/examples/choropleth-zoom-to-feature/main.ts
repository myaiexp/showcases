// A click listener on each state that calls fitBounds with the state's own bounds
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
  const stage = createStage(el, ctx, { hint: 'Click a state to zoom to it. Use the zoom control or the button to go back out.' });
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }).setView(US_CENTER, stage.preview ? 3 : 4));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 19, attribution: LAND_ATTRIBUTION }).addTo(map);

  function zoomToFeature(e: LeafletPointerEvent): void {
    map.fitBounds((e.target as Polygon).getBounds());
  }
  function onEachFeature(_feature: Feature, layer: Layer): void {
    (layer as Polygon).on({ click: zoomToFeature });
  }
  const geojson = new GeoJSON(data, { style, onEachFeature }).addTo(map);
  stage.button('Back to the whole US', () => map.setView(US_CENTER, 4));
  stage.say('click: map.fitBounds(e.target.getBounds())');

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const steps = ['Colorado', 'Florida', 'Washington'].flatMap((name) => [
      {
        say: `Click ${name}`,
        run: () => {
          const layer = stateLayer(geojson, name);
          g.click(layer.getBounds().getCenter(), layer.getElement());
        },
        hold: 2600,
      },
      { say: 'setView back to the whole US', run: () => (g.hide(), map.setView(US_CENTER, 3)), hold: 1400 },
    ]);
    stage.cycle(steps, 500);
  }
  return () => stage.dispose();
};

export default mount;
