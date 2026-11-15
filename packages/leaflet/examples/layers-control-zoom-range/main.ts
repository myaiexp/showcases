// The control greys out entries whose layer has a minZoom or maxZoom the map is outside of
import { LayerGroup, LayersControl, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, cityMarkers, DENVER } from '../../shared/group-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom with the buttons or the wheel: entries are disabled while the zoom is outside their layer\'s range.' });
  const cities = new LayerGroup(cityMarkers());
  const light = baseTiles('light', { maxZoom: 18 });
  // Layers with their own zoom limits: the control reads layer.options.minZoom and maxZoom.
  const closeUp = baseTiles('grid', { minZoom: 11, maxZoom: 18, opacity: 0.6 });
  const overview = baseTiles('vintage', { minZoom: 3, maxZoom: 9, opacity: 0.6 });
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 8, layers: [light], zoomControl: !stage.preview }));
  const control = new LayersControl({ Streets: light }, { 'Overview tiles (zoom 3-9)': overview, 'Grid tiles (zoom 11+)': closeUp, Cities: cities }, { collapsed: false }).addTo(map);
  void control;

  const report = (): void => {
    const off = [...map.getContainer().querySelectorAll<HTMLInputElement>('.leaflet-control-layers-overlays input')].filter((i) => i.disabled).length;
    stage.say(`zoom ${map.getZoom()}: ${off} of 3 overlay entries disabled`);
  };
  map.on('zoomend', report);
  report();

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => map.setZoom(8, { animate: false }) },
        { run: () => map.setZoom(12, { animate: false }) },
        { run: () => map.setZoom(10, { animate: false }) },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
