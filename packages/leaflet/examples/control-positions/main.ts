// Control.setPosition moves a control between the four corners
import { type Control, LeafletMap, ScaleControl, ZoomControl, AttributionControl, FullscreenControl, type ControlPosition } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const CORNERS: ControlPosition[] = ['topleft', 'topright', 'bottomright', 'bottomleft'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each control has a default corner. getPosition() reads it and setPosition() moves the control, removing it and adding it again.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [20, 0], zoom: 2, zoomControl: false, attributionControl: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png').addTo(map);

  const controls: Record<string, Control> = {
    zoom: new ZoomControl().addTo(map),
    scale: new ScaleControl().addTo(map),
    fullscreen: new FullscreenControl({ position: 'topright' }).addTo(map),
    attribution: new AttributionControl({ prefix: false }).addTo(map),
  };
  map.attributionControl?.addAttribution(LAND_ATTRIBUTION);
  stage.onDispose(() => Object.values(controls).forEach((c) => c.remove()));
  const say = (): void => stage.say(Object.entries(controls).map(([k, c]) => `${k}: ${c.getPosition()}`).join('  '));
  say();

  for (const [name, control] of Object.entries(controls)) {
    stage.select(name, CORNERS.map((v) => ({ value: v, label: v })), control.getPosition(), (v) => {
      control.setPosition(v);
      say();
    });
  }

  if (stage.preview) {
    const order = Object.values(controls);
    let i = 0;
    stage.every(1300, () => {
      const c = order[i % order.length] as Control;
      const next = CORNERS[(CORNERS.indexOf(c.getPosition()) + 1) % CORNERS.length] as ControlPosition;
      c.setPosition(next);
      i++;
      say();
    });
  }
  return () => stage.dispose();
};

export default mount;
