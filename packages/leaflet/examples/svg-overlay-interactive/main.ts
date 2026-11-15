// An interactive SVGOverlay: map click events plus direct DOM access to the <svg>
import { LatLngBounds, LeafletMap, SVGOverlay } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a coloured square: the overlay fires click, and getElement() gives the <svg> to edit.' });
  const log = stage.log('SVG overlay', 8);
  const map = stage.own(new LeafletMap(stage.box, { center: [23, -115], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgElement.setAttribute('viewBox', '0 0 200 200');
  svgElement.innerHTML =
    '<rect width="200" height="200" fill="#111"/><rect id="top" x="75" y="23" width="50" height="50" fill="red"/><rect id="bottom" x="75" y="123" width="50" height="50" fill="#0013ff"/>';
  const latLngBounds = new LatLngBounds([
    [32, -130],
    [13, -100],
  ]);
  const overlay = new SVGOverlay(svgElement, latLngBounds, { opacity: 0.7, interactive: true }).addTo(map);
  map.fitBounds(latLngBounds);

  const colours = ['#f59e0b', '#34d399', '#f472b6', '#7cb7ff'];
  let n = 0;
  overlay.on('click', (e) => {
    // The clicked <rect> is the event's DOM target; its parent <svg> is overlay.getElement().
    const target = (e.originalEvent as Event | undefined)?.target;
    if (target instanceof SVGRectElement && overlay.getElement()?.contains(target)) {
      target.setAttribute('fill', colours[n++ % colours.length] ?? '#fff');
      log(`click on <rect id="${target.id || 'background'}">`);
    }
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const rect = (id: string): Element | null => svgElement.querySelector(`#${id}`);
    stage.cycle(
      [
        { run: () => g.click([27, -115], rect('top')) },
        { run: () => g.click([18.5, -115], rect('bottom')) },
      ],
      1500,
    );
  }
  return () => stage.dispose();
};

export default mount;
