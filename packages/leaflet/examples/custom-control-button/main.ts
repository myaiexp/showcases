// A custom control with a button: DomEvent.disableClickPropagation keeps its clicks off the map
import { Control, DomEvent, DomUtil, LeafletMap, type ControlPosition, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

/** A "back to the start" button that greys out while the map is already there. */
class HomeControl extends Control<{ position: ControlPosition; center: LatLngExpression; zoom: number }> {
  static override defaultOptions = { position: 'topleft' as ControlPosition, center: [0, 0] as LatLngExpression, zoom: 2 };
  declare _button: HTMLButtonElement;

  override onAdd(map: LeafletMap): HTMLElement {
    const bar = DomUtil.create('div', 'leaflet-bar');
    this._button = DomUtil.create('button', '', bar) as HTMLButtonElement;
    this._button.type = 'button';
    this._button.textContent = 'Home';
    this._button.style.cssText = 'padding:0 10px;height:30px;border:0;background:#1f2937;color:#e5e7eb;cursor:pointer;font:13px system-ui';
    // Without this, a click on the button would also reach the map as a map click.
    DomEvent.disableClickPropagation(bar);
    this._button.addEventListener('click', () => map.setView(this.options.center, this.options.zoom));
    this._refresh();
    return bar;
  }
  override getEvents(): { moveend: () => void } {
    return { moveend: () => this._refresh() };
  }
  _refresh(): void {
    const map = this._map;
    this._button.disabled = map.getCenter().equals(this.options.center, 0.01) && map.getZoom() === this.options.zoom;
    this._button.style.opacity = this._button.disabled ? '0.45' : '1';
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pan or zoom away, then press Home. A click on the button is not also a map click: the caption counts both.' });
  const home: [number, number] = [47, 8];
  const map = stage.own(new LeafletMap(stage.box, { center: home, zoom: 5 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const control = new HomeControl({ center: home, zoom: 5 }).addTo(map);
  stage.onDispose(() => control.remove());

  let clicks = 0;
  let presses = 0;
  const say = (): void => stage.say(`map clicks ${clicks}, Home presses ${presses}; Home is ${control.getContainer()?.querySelector('button')?.disabled ? 'disabled (already home)' : 'enabled'}`);
  map.on('click', () => { clicks++; say(); });
  control.getContainer()?.addEventListener('click', () => { presses++; say(); });
  say();
  map.on('moveend', say);

  if (stage.preview) {
    const button = control.getContainer()?.querySelector('button');
    stage.cycle([
      { run: () => map.panTo([40, 20]) },
      { run: () => button?.click() },
    ], 1900);
  }
  return () => stage.dispose();
};

export default mount;
