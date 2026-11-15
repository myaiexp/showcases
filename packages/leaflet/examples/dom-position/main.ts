// DomUtil.create, setPosition and getPosition: badges pinned to cities in the overlay pane
import { DomUtil, LeafletMap, Point, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const PLACES: { name: string; at: LatLngExpression }[] = [
  { name: 'Lisbon', at: [38.72, -9.14] },
  { name: 'Paris', at: [48.86, 2.35] },
  { name: 'Rome', at: [41.9, 12.5] },
  { name: 'Athens', at: [37.98, 23.73] },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pan: the pane moves, the badges keep their positions. Zoom: positions are recomputed on zoomend because the pixel origin changed.' });
  const pre = stage.side('getPosition(badge)');
  const map = stage.own(new LeafletMap(stage.box, { center: [43, 8], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const pane = map.getPane('overlayPane') as HTMLElement;
  const badges = PLACES.map((p) => {
    const badge = DomUtil.create('div', 'dom-badge', pane);
    badge.textContent = p.name;
    return { ...p, badge };
  });

  let scaled = false;
  const place = (): void => {
    for (const b of badges) {
      const point = map.latLngToLayerPoint(b.at);
      // setPosition stores the point (read it back with getPosition); setTransform does not.
      if (scaled) DomUtil.setTransform(b.badge, point, 1.25);
      else DomUtil.setPosition(b.badge, point);
    }
    const first = badges[0];
    if (!first) return;
    const pos = DomUtil.getPosition(first.badge);
    const lines = `Lisbon: ${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}${scaled ? '  (setTransform: not stored, reads 0, 0)' : ''}\nlatLngToLayerPoint: ${map.latLngToLayerPoint(first.at).toString()}\npixel origin: ${map.getPixelOrigin().toString()}\nmap pane offset: ${DomUtil.getPosition(map.getPane('mapPane') as HTMLElement).toString()}`;
    if (pre) pre.textContent = lines;
    else stage.say(`getPosition(Lisbon) = ${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}; pixel origin ${map.getPixelOrigin().toString()}`);
  };
  for (const name of ['zoomend', 'viewreset', 'moveend'] as const) map.on(name, place);
  place();
  stage.toggle('setTransform with scale', false, (on) => {
    scaled = on;
    place();
  });

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => map.panBy(new Point(120, 30)) },
        { run: () => map.setZoom(5) },
        { run: () => map.panBy(new Point(-100, -20)) },
        { run: () => map.setZoom(4) },
      ],
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
