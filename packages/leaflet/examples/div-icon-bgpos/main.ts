// DivIcon bgPos: one sprite sheet, each marker shows a different cell of it
import { DivIcon, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { sprite, CELL, COLS, ROWS, SHAPES } from './sprite.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a marker. Every icon uses the same background image; bgPos [x, y] picks the cell.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.09], zoom: 12, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // The sheet is painted on a canvas and handed to the CSS class through a custom property.
  stage.box.style.setProperty('--sprite', `url(${sprite()})`);

  // A 4 x 2 sheet of 32 px cells. The class draws the image; bgPos moves it left and up by that many px.
  const markers: Marker[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const bgPos: [number, number] = [col * CELL, row * CELL];
      const m = new Marker([51.508 - row * 0.016, -0.12 + col * 0.02], {
        icon: new DivIcon({ className: 'sprite-icon', iconSize: [CELL, CELL], bgPos }),
        alt: `${SHAPES[col]} ${row ? 'teal' : 'orange'}`,
        title: `bgPos: [${bgPos.join(', ')}]`,
      }).addTo(map);
      if (!stage.preview) m.bindPopup(`bgPos: [${bgPos.join(', ')}]`);
      markers.push(m);
    }
  }

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    let i = 0;
    stage.cycle(
      [
        {
          run: () => {
            const m = markers[[0, 5, 2, 7, 1, 4, 3, 6][i++ % 8]!]!;
            g.over(m.getLatLng(), m.getElement());
            stage.say(m.options.title ?? '');
          },
        },
      ],
      1500,
    );
  }
  return () => stage.dispose();
};

export default mount;
