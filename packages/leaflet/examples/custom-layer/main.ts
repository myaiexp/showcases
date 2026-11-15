// A custom Layer: create its element in onAdd, place it by layer point, update on zoom, clean up in onRemove
import { DomUtil, Layer, LeafletMap, Util, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add and remove the layer, zoom, and watch the log: the element is built in onAdd and placed again after each zoom, not on pans.' });
  const log = stage.log('Lifecycle');
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 8], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // Defined in mount so the lifecycle log can be reached without globals.
  class CalloutLayer extends Layer {
    _container?: HTMLElement;
    _point: LatLngExpression;
    _text: string;
    constructor(point: LatLngExpression, text: string, options?: { pane?: string }) {
      super();
      this._point = point;
      this._text = text;
      // Layer does not apply options passed to super(): do it here.
      Util.setOptions(this, options);
    }
    override onAdd(map: LeafletMap): this {
      this._container = DomUtil.create('div', 'callout', this.getPane());
      this._container.textContent = this._text;
      this._update();
      map.on('zoomend', this._update, this);
      map.on('viewreset', this._update, this);
      log(`onAdd: element created in "${this.options.pane}"`);
      return this;
    }
    override onRemove(map: LeafletMap): this {
      this._container?.remove();
      map.off('zoomend', this._update, this);
      map.off('viewreset', this._update, this);
      log('onRemove: element and listeners gone');
      return this;
    }
    _update(): void {
      if (!this._container) return;
      DomUtil.setPosition(this._container, this._map.latLngToLayerPoint(this._point));
      log(`_update at zoom ${this._map.getZoom()}`);
    }
  }

  const callout = new CalloutLayer([48.85, 2.35], 'Paris');
  callout.addTo(map);
  stage.toggle('on the map', true, (on) => (on ? callout.addTo(map) : callout.remove()));
  stage.button('Zoom in', () => map.zoomIn());
  stage.button('Zoom out', () => map.zoomOut());
  stage.say('CalloutLayer is added with addTo(map), like any layer');

  if (stage.preview) {
    stage.cycle(
      [
        { say: 'zoomend: _update places the element again', run: () => map.setZoom(5) },
        { say: 'removed: onRemove took the element away', run: () => callout.remove() },
        { say: 'added again: onAdd creates a new element', run: () => callout.addTo(map) },
        { say: 'back out: _update again', run: () => map.setZoom(4) },
      ],
      2000,
    );
  }
  return () => stage.dispose();
};

export default mount;
