// markersInheritOptions: default Markers for GeoJSON Points take the layer's own options
import { GeoJSON, LeafletMap, type GeoJSONOptions, type MarkerOptions } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { denverSample } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The layer is given opacity: 0.4 and title. They only reach the Markers when markersInheritOptions is true; try dragging a Marker.', height: 440 });
  const { bicycleRental } = await denverSample();
  const map = stage.own(new LeafletMap(stage.box, { center: [39.748, -104.994], zoom: stage.preview ? 13 : 14, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let layer: GeoJSON | null = null;
  const draw = (inherit: boolean): void => {
    layer?.remove();
    layer = new GeoJSON<GeoJSONOptions & MarkerOptions>(bicycleRental, {
      opacity: 0.4,
      title: 'B-Cycle Station',
      draggable: true,
      markersInheritOptions: inherit,
    }).addTo(map);
    const first = layer.getLayers()[0] as unknown as { options: MarkerOptions };
    stage.say(`markersInheritOptions: ${inherit}: first marker has opacity ${first.options.opacity}, draggable ${first.options.draggable}`);
  };
  stage.toggle('markersInheritOptions', true, draw);
  draw(true);
  if (stage.preview) {
    let on = true;
    stage.every(2200, () => draw((on = !on)));
  }
  return () => stage.dispose();
};

export default mount;
