// DomEvent.disableClickPropagation and disableScrollPropagation on a custom control
import { Control, DomEvent, DomUtil, LeafletMap, type ControlPosition } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import './style.css';

const TEXT = 'Scrollable text: the quick brown fox jumps over the lazy dog. '.repeat(8);

class Pad extends Control<{ position: ControlPosition; shielded: boolean }> {
  static override defaultOptions = { position: 'topleft' as ControlPosition, shielded: false };

  override onAdd(): HTMLElement {
    const div = DomUtil.create('div', this.options.shielded ? 'pad shielded' : 'pad');
    div.textContent = `${this.options.shielded ? 'Shielded' : 'Unshielded'}. ${TEXT}`;
    if (this.options.shielded) {
      // The same two calls the built-in controls make.
      DomEvent.disableClickPropagation(div);
      DomEvent.disableScrollPropagation(div);
    }
    return div;
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click and scroll over each box. Only the unshielded one reaches the map.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 10], zoom: 3, zoomControl: false, doubleClickZoom: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const open = new Pad({ position: 'topleft' }).addTo(map);
  const shield = new Pad({ position: 'topright', shielded: true }).addTo(map);
  stage.onDispose(() => (open.remove(), shield.remove()));

  let clicks = 0;
  let zooms = 0;
  const say = (): void => stage.say(`map clicks: ${clicks}   map zoom changes: ${zooms}`);
  map.on('click', () => (clicks++, say()));
  map.on('zoomend', () => (zooms++, say()));
  say();

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const wheel = (target: HTMLElement | undefined): void => {
      const r = target?.getBoundingClientRect();
      target?.dispatchEvent(new WheelEvent('wheel', { deltaY: -120, clientX: (r?.left ?? 0) + 20, clientY: (r?.top ?? 0) + 20, bubbles: true, cancelable: true }));
    };
    const a = open.getContainer();
    const b = shield.getContainer();
    stage.cycle(
      [
        { say: 'click the unshielded box', run: () => g.click([30, -40], a) },
        { say: 'click the shielded box', run: () => g.click([30, 60], b) },
        { say: 'scroll over the unshielded box', run: () => wheel(a) },
        { say: 'scroll over the shielded box', run: () => wheel(b) },
      ],
      1700,
    );
    // The caption of each step is replaced by the counters right after the event.
    map.on('click', () => stage.after(1000, say));
  }
  return () => stage.dispose();
};

export default mount;
