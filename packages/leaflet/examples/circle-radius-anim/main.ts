// Circle.setRadius in meters, with getBounds() following the circle
import { Circle, LeafletMap, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider. getBounds() is the box around the circle.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: stage.preview ? 3 : 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const circle = new Circle([50, 10], { radius: 200_000, color: '#34d399' }).addTo(map);
  const frame = new Rectangle(circle.getBounds(), { color: '#ffffff', weight: 1, dashArray: '4 4', fill: false, interactive: false }).addTo(map);

  const set = (km: number): void => {
    circle.setRadius(km * 1000);
    frame.setBounds(circle.getBounds());
    stage.say(`setRadius(${Math.round(km * 1000).toLocaleString('en')}) meters`);
  };
  stage.slider('Radius km', 50, 700, 10, 200, set);
  set(200);

  let t = 0;
  if (stage.preview) {
    stage.every(60, () => {
      t += 0.05;
      const km = 375 + 325 * Math.sin(t);
      set(km);
    });
  }
  return () => stage.dispose();
};

export default mount;
