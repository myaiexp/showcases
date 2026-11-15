// DivIcon with an HTMLElement: a live button inside the icon
import { DivIcon, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each icon is a real <button> with its own click listener. Click, or Tab to one and press Enter.' });
  const log = stage.log('Events');
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.09], zoom: 13, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // html accepts an element as well as a string. Leaflet moves this very element into the icon,
  // so listeners attached to it before (or after) keep working.
  const counter = (name: string, latlng: [number, number]): { marker: Marker; button: HTMLButtonElement } => {
    const button = document.createElement('button');
    button.className = 'counter';
    let n = 0;
    button.textContent = `${name}: 0`;
    button.addEventListener('click', () => {
      button.textContent = `${name}: ${++n}`;
      log(`${name} button clicked ${n}x`);
    });
    const marker = new Marker(latlng, {
      icon: new DivIcon({ html: button, className: 'counter-icon', iconSize: [80, 28] }),
      keyboard: false, // the button is already focusable; the icon div itself needn't be a second tab stop
    }).addTo(map);
    return { marker, button };
  };
  const a = counter('Clicks', [51.5, -0.1025]);
  const b = counter('Taps', [51.5, -0.0775]);

  // Clicks inside the icon also reach the marker as ordinary click events.
  a.marker.on('click', () => log('...and the marker fired click'));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    let i = 0;
    stage.every(1100, () => {
      const c = i++ % 3 === 2 ? b : a;
      g.click(c.marker.getLatLng(), c.button);
    });
    stage.say('html: an HTMLElement with its own listener');
  }
  return () => stage.dispose();
};

export default mount;
