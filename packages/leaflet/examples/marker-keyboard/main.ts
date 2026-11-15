// Marker keyboard use: Tab, Enter or Space to click, arrows to move
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { markerInput } from '../../shared/marker-input.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Tab to a marker. Enter or Space fires its click (and opens the popup); on the draggable one the arrow keys move it 10 px, 30 with Shift.',
  });
  const log = stage.log('Events');
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.09], zoom: 12, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // keyboard: true is the default: tabindex 0, role="button" for an interactive marker.
  const clicker = new Marker([51.505, -0.105], { title: 'Press Enter', alt: 'Clickable marker' }).addTo(map).bindPopup('Opened from the keyboard.');
  const mover = new Marker([51.495, -0.075], { title: 'Arrow keys', alt: 'Draggable marker', draggable: true }).addTo(map);
  // keyboard: false takes a marker out of the tab order, and Enter and Space do nothing.
  const skipped = new Marker([51.512, -0.075], { title: 'Not focusable', alt: 'Skipped marker', keyboard: false }).addTo(map);

  clicker.on('click', () => log('clicker: click'));
  mover.on('dragstart', () => log('mover: dragstart (arrow key down)'));
  mover.on('dragend', () => log(`mover: dragend, now ${mover.getLatLng().toString()}`));
  const tab = (m: Marker): string => `tabindex ${m.getElement()?.tabIndex}`;
  const side = stage.side('Tab order');
  if (side) side.textContent = `Enter marker: ${tab(clicker)}\nArrow marker: ${tab(mover)}\nkeyboard: false: ${tab(skipped)}`;

  if (stage.preview) {
    const g = ghost(map); // also keeps the scripted click from reaching the card link
    stage.onDispose(() => g.remove());
    const input = markerInput(stage, map, g);
    stage.cycle(
      [
        { say: 'Enter on a marker clicks it', run: () => input.key(clicker, 'Enter') },
        { say: 'the popup closes again', run: () => (clicker.closePopup(), input.blur(clicker)), hold: 1000 },
        { say: 'arrow keys move a draggable marker', run: () => input.key(mover, 'ArrowLeft', { hold: 500 }), hold: 500 },
        { run: () => input.key(mover, 'ArrowUp', { shift: true, hold: 500 }), hold: 800 },
        { run: () => (input.blur(mover), mover.setLatLng([51.495, -0.075])), hold: 600 },
      ],
      1400,
    );
  }
  return () => stage.dispose();
};

export default mount;
