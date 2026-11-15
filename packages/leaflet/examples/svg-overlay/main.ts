// An SVGOverlay: an <svg> element with a viewBox stretched over map bounds
import { LatLngBounds, LeafletMap, SVGOverlay } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The shapes scale with the map because the SVG has a viewBox. Zoom in and out.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [23, -115], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  // The tutorial's SVG element: a black square with a red and a blue square on it.
  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgElement.setAttribute('viewBox', '0 0 200 200');
  svgElement.innerHTML =
    '<rect width="200" height="200"/><rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';

  const latLngBounds = new LatLngBounds([
    [32, -130],
    [13, -100],
  ]);
  map.fitBounds(latLngBounds);
  new SVGOverlay(svgElement, latLngBounds, { opacity: 0.7 }).addTo(map);

  if (stage.preview) {
    stage.cycle(
      [
        { say: 'fitBounds: the SVG fills the view', run: () => map.fitBounds(latLngBounds) },
        { say: 'zoomed out: it shrinks with the map', run: () => map.setZoom(map.getZoom() - 2) },
      ],
      2400,
    );
  }
  return () => stage.dispose();
};

export default mount;
