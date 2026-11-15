// The pixel origin: fixed while panning, reset after zoomend and viewreset
import { DivIcon, DomUtil, LeafletMap, Marker, Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the map: the pane offset changes, the pixel origin does not. Zoom: the origin is recomputed and the bracket jumps back to the corner.' });
  const pre = stage.side('Map state');
  const map = stage.own(new LeafletMap(stage.box, { center: [45, 10], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const city: [number, number] = [41.9, 12.5];
  new Marker(city).addTo(map);
  const dot = new Marker(map.layerPointToLatLng([0, 0]), {
    interactive: false,
    keyboard: false,
    icon: new DivIcon({ html: '<div style="width:34px;height:34px;border-top:5px solid #f58a3d;border-left:5px solid #f58a3d"></div>', className: '', iconSize: [34, 34], iconAnchor: [0, 0] }),
  }).addTo(map);

  const fmt = (p: Point): string => `${Math.round(p.x)}, ${Math.round(p.y)}`;
  const show = (): void => {
    const origin = map.getPixelOrigin();
    const paneOffset = DomUtil.getPosition(map.getPane('mapPane') as HTMLElement);
    const abs = map.project(city);
    const layer = map.latLngToLayerPoint(city);
    const lines = [
      `pixel origin   ${fmt(origin)}`,
      `pixel bounds   ${fmt(map.getPixelBounds().min)} to ${fmt(map.getPixelBounds().max)}`,
      `map pane       ${fmt(paneOffset)}`,
      `project(city)  ${fmt(abs)}   (absolute)`,
      `layer point    ${fmt(layer)}   = absolute - origin`,
    ];
    if (pre) pre.textContent = lines.join('\n');
    else stage.say(`origin ${fmt(origin)} | pane offset ${fmt(paneOffset)} | city layer point ${fmt(layer)}`);
  };
  const moveDot = (): void => {
    dot.setLatLng(map.layerPointToLatLng([0, 0]));
    show();
  };
  // The origin resets on these two, and so does the dot.
  map.on('zoomend', moveDot);
  map.on('viewreset', moveDot);
  map.on('move', show);
  show();

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => map.panBy([-70, -30]) },
        { run: () => map.panBy([30, -40]) },
        { run: () => map.setZoom(5) },
        { run: () => map.panBy([-40, 30]) },
        { run: () => map.setZoom(4) },
      ],
      1900,
    );
  }
  return () => stage.dispose();
};

export default mount;
