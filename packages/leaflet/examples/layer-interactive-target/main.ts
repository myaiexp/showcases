// addInteractiveTarget: events on a custom layer's own element fire on the layer
import { DomUtil, FeatureGroup, Layer, LeafletMap, type LatLngExpression, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the green badge, then empty map. Switch the registration off and click the badge again: the layer hears nothing, the map does.' });
  const log = stage.log('Clicks');
  const map = stage.own(new LeafletMap(stage.box, { center: [45, 12], zoom: 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  class BadgeLayer extends Layer {
    _badge?: HTMLElement;
    register = true;
    _point: LatLngExpression;
    constructor(point: LatLngExpression) {
      super();
      this._point = point;
    }
    override onAdd(map: LeafletMap): this {
      this._badge = DomUtil.create('div', 'badge', this.getPane());
      this._badge.textContent = 'Click me';
      DomUtil.setPosition(this._badge, map.latLngToLayerPoint(this._point));
      // Without this line the map would see the click, but not as a click on this layer.
      if (this.register) this.addInteractiveTarget(this._badge);
      map.on('zoomend', this._place, this);
      return this;
    }
    override onRemove(map: LeafletMap): this {
      if (this._badge && this.register) this.removeInteractiveTarget(this._badge);
      this._badge?.remove();
      map.off('zoomend', this._place, this);
      return this;
    }
    _place(): void {
      if (this._badge) DomUtil.setPosition(this._badge, this._map.latLngToLayerPoint(this._point));
    }
  }

  const group = new FeatureGroup().addTo(map);
  const badge = new BadgeLayer([45, 12]);
  group.addLayer(badge);

  let layerClicks = 0;
  let groupClicks = 0;
  let mapClicks = 0;
  const say = (): void => stage.say(`registered ${badge.register} | layer ${layerClicks} · group ${groupClicks} · map ${mapClicks}`);
  badge.on('click', () => {
    layerClicks++;
    log('click on the layer');
    say();
  });
  group.on('click', (e: LeafletPointerEvent) => {
    groupClicks++;
    log(`click reached the group, propagatedFrom is the badge: ${e.propagatedFrom === badge}`);
    say();
  });
  map.on('click', () => {
    mapClicks++;
    say();
  });
  const setRegistered = (on: boolean): void => {
    badge.register = on;
    group.removeLayer(badge);
    group.addLayer(badge);
    say();
  };
  stage.toggle('addInteractiveTarget', true, setRegistered);
  say();

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    let n = 0;
    stage.cycle(
      [
        {
          run: () => {
            n++;
            if (n % 4 === 1) setRegistered(true);
            if (n % 4 === 3) setRegistered(false);
            g.click([45, 12], badge._badge);
          },
        },
      ],
      1600,
    );
  }
  return () => stage.dispose();
};

export default mount;
