// onEachFeature: attach a popup to every feature that has popupContent
import { GeoJSON, LeafletMap, type Layer, type Marker, type Polyline } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { denverSample } from '../../shared/data.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a bus line or a station for the popupContent of its feature.' });
  const { freeBus, lightRailStop, coorsField } = await denverSample();
  const map = stage.own(new LeafletMap(stage.box, { center: [39.749, -104.995], zoom: stage.preview ? 14 : 15, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const log = stage.log('onEachFeature calls', 8);
  function onEachFeature(feature: Feature, layer: Layer): void {
    const props = feature.properties as { popupContent?: string } | null;
    // does this feature have a property named popupContent?
    if (props && props.popupContent) {
      layer.bindPopup(props.popupContent);
    }
    log(`${feature.geometry.type}${props?.popupContent ? ': popup bound' : ': no popupContent'}`);
  }

  const layers = [freeBus, lightRailStop, coorsField].map((data) => new GeoJSON(data, { onEachFeature, style: { color: '#a3e635', weight: 5 } }).addTo(map));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const stops = layers[1]!.getLayers() as Marker[];
    const line = layers[0]!.getLayers()[0] as Polyline;
    stage.cycle(
      [
        { say: 'Click a light rail stop', run: () => (map.closePopup(), g.click(stops[0]!.getLatLng(), stops[0]!.getElement())), hold: 2200 },
        { say: 'Click a bus line', run: () => g.click(line.getCenter(), line.getElement()), hold: 2200 },
        { say: 'Click the second stop', run: () => g.click(stops[1]!.getLatLng(), stops[1]!.getElement()), hold: 2200 },
      ],
      400,
    );
  }
  return () => stage.dispose();
};

export default mount;
