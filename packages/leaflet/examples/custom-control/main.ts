// A Control subclass: onAdd builds the element, getEvents keeps it current, onRemove cleans up
import { Control, DomUtil, LeafletMap, type ControlPosition, type LatLng } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

/** Shows the map centre and zoom. defaultOptions are merged with Control's own (position). */
class CenterReadout extends Control<{ position: ControlPosition; digits: number }> {
  static override defaultOptions = { position: 'topright' as ControlPosition, digits: 2 };
  declare _div: HTMLElement;

  override onAdd(map: LeafletMap): HTMLElement {
    this._div = DomUtil.create('div', 'center-readout');
    this._div.style.cssText = 'padding:4px 8px;background:#1f2937;color:#e5e7eb;font:12px/1.4 ui-monospace,monospace;border-radius:4px;white-space:pre';
    this._show(map.getCenter(), map.getZoom());
    return this._div;
  }
  // The map calls the listeners in this object on add and removes them on remove.
  override getEvents(): { move: () => void } {
    return { move: () => this._show(this._map.getCenter(), this._map.getZoom()) };
  }
  override onRemove(): void {
    this._div.textContent = '';
  }
  _show(center: LatLng, zoom: number): void {
    this._div.textContent = `lat ${center.lat.toFixed(this.options.digits)}\nlng ${center.lng.toFixed(this.options.digits)}\nzoom ${zoom}`;
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag or zoom: the readout follows the move event. It is a class extending Control, with its defaults in static defaultOptions.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [41, 12], zoom: 5 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const readout = new CenterReadout({ digits: 3 }).addTo(map);
  stage.onDispose(() => readout.remove());
  stage.say('new CenterReadout({digits: 3}).addTo(map)');

  stage.button('Remove', () => readout.remove());
  stage.button('Add', () => readout.addTo(map));
  stage.button('setPosition("bottomleft")', () => readout.setPosition('bottomleft'));

  if (stage.preview) {
    const to: [number, number][] = [[48, 2], [52, 13], [41, -4], [41, 12]];
    let i = 0;
    stage.every(2200, () => map.flyTo(to[i++ % to.length] as [number, number], 4 + (i % 2), { duration: 1.4 }));
  }
  return () => stage.dispose();
};

export default mount;
