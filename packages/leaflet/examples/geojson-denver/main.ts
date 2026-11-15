// The GeoJSON tutorial's Denver data: icon marker, circle markers, styled lines and polygon, popups
import { CircleMarker, GeoJSON, Icon, LeafletMap, Marker, type Layer } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { denverSample, images } from '../../shared/data.ts';
import { ghost } from '../../shared/ghost.ts';

type Props = { popupContent?: string; underConstruction?: boolean; style?: object };

const mount: Mount = async (el, ctx) => {
  const [{ freeBus, lightRailStop, bicycleRental, campus, coorsField }, baseball] = await Promise.all([denverSample(), images.baseballMarker()]);
  const stage = createStage(el, ctx, { hint: 'Click a feature for its popup. Each GeoJSON layer uses a different option: style (function and properties), pointToLayer, onEachFeature.', height: 460 });
  const map = stage.own(new LeafletMap(stage.box, { center: [39.749, -104.9945], zoom: stage.preview ? 14 : 14, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  function onEachFeature(feature: Feature, layer: Layer): void {
    const text = (feature.properties as Props | null)?.popupContent;
    if (text) layer.bindPopup(text);
  }
  const baseballIcon = new Icon({ iconUrl: baseball, iconSize: [32, 37], iconAnchor: [16, 37], popupAnchor: [0, -28] });
  const geojsonMarkerOptions = { radius: 8, fillColor: '#ff7800', color: '#000', weight: 1, opacity: 1, fillOpacity: 0.8 };

  // Polygon: the feature carries its own style.
  new GeoJSON(campus, { style: (feature) => (feature.properties as Props).style ?? {}, onEachFeature }).addTo(map);
  // Lines: dashed red while under construction.
  new GeoJSON(freeBus, {
    style: (feature) => ((feature.properties as Props).underConstruction ? { color: '#f87171', weight: 5, opacity: 0.75, dashArray: '6 8' } : { color: '#4ade80', weight: 5, opacity: 0.75 }),
    onEachFeature,
  }).addTo(map);
  // Points: a custom icon, and circle markers.
  const coors = new GeoJSON(coorsField, { pointToLayer: (_f, latlng) => new Marker(latlng, { icon: baseballIcon }), onEachFeature }).addTo(map);
  const stops = new GeoJSON(lightRailStop, { onEachFeature }).addTo(map);
  new GeoJSON(bicycleRental, { pointToLayer: (_f, latlng) => new CircleMarker(latlng, geojsonMarkerOptions), onEachFeature }).addTo(map);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const marker = coors.getLayers()[0] as Marker;
    const stop = stops.getLayers()[1] as Marker;
    stage.cycle(
      [
        { say: 'pointToLayer with a baseball Icon', run: () => g.click(marker.getLatLng(), marker.getElement()), hold: 2200 },
        { say: 'Default Marker for a rail stop', run: () => (map.closePopup(), g.click(stop.getLatLng(), stop.getElement())), hold: 2200 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
