// DivIcon with an HTML string: label, number badge and SVG ring
import { DivIcon, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'No image files: each icon is a <div> whose contents are the html string. className hooks CSS onto it.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 8], zoom: stage.preview ? 4 : 6, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // The default DivIcon: a 12x12 white box with the leaflet-div-icon class.
  new Marker([48.8, 2.3], { icon: new DivIcon() }).addTo(map);

  // A text label. html is any markup; iconSize sets the box; with no iconAnchor it is centred on the position.
  new Marker([52.5, 13.4], {
    icon: new DivIcon({ html: 'Berlin', className: 'tag', iconSize: [64, 22] }),
    alt: 'Berlin',
  }).addTo(map);

  // A badge with a number, as a cluster marker would show.
  const badge = new Marker([50.1, 8.7], {
    icon: new DivIcon({ html: '<b>12</b>', className: 'badge', iconSize: [34, 34] }),
    alt: '12 places',
  }).addTo(map);

  // Inline SVG in the html: a ring that scales with iconSize.
  new Marker([46.8, 9.2], {
    icon: new DivIcon({
      html: '<svg viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="16" fill="none" stroke="#f58a3d" stroke-width="5"/><circle cx="20" cy="20" r="5" fill="#f58a3d"/></svg>',
      className: 'ring',
      iconSize: [40, 40],
    }),
    alt: 'Milan',
  }).addTo(map);

  if (stage.preview) {
    let n = 12;
    stage.every(900, () => {
      n = n >= 99 ? 3 : n + 7;
      // A new DivIcon with new html: setIcon swaps it in place.
      badge.setIcon(new DivIcon({ html: `<b>${n}</b>`, className: 'badge', iconSize: [34, 34] }));
      stage.say(`new DivIcon({ html: '<b>${n}</b>' })`);
    });
  }
  return () => stage.dispose();
};

export default mount;
