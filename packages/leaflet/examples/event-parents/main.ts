// Evented parents: events fired with propagate reach the parent, tagged with propagatedFrom
import { CircleMarker, Evented, LeafletMap, type LatLngExpression, type LeafletEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

interface Reading extends LeafletEvent {
  value: number;
  propagatedFrom?: Evented;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each sensor fires readings. Cut a sensor off from the station with the checkboxes: its own circle still reacts, the station stops hearing it.' });
  const log = stage.log('Station');
  const map = stage.own(new LeafletMap(stage.box, { center: [45, 10], zoom: 4, zoomControl: false, dragging: false, scrollWheelZoom: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  class Sensor extends Evented {
    name: string;
    at: LatLngExpression;
    constructor(name: string, at: LatLngExpression) {
      super();
      this.name = name;
      this.at = at;
    }
    read(): void {
      // The third argument asks for the event to be passed up to the event parents.
      this.fire('reading', { value: Math.round(Math.random() * 100) }, true);
    }
  }
  const station = new Evented();
  const sensors = [new Sensor('north', [54, 8]), new Sensor('centre', [46, 12]), new Sensor('south', [38, 6])];
  const circles = new Map<Sensor, CircleMarker>();
  let heard = 0;

  for (const s of sensors) {
    const circle = new CircleMarker(s.at, { radius: 12, color: '#9ca3af', fillOpacity: 0.4 }).addTo(map).bindTooltip(s.name, { permanent: true, direction: 'right' });
    circles.set(s, circle);
    s.addEventParent(station);
    // The sensor's own listener always runs, parent or not.
    s.on('reading', (() => {
      circle.setStyle({ color: '#f58a3d', fillColor: '#f58a3d' });
      stage.after(450, () => circle.setStyle({ color: '#9ca3af', fillColor: '#3388ff' }));
    }) as never);
  }
  station.on('reading', ((e: Reading) => {
    heard++;
    log(`station heard ${(e.propagatedFrom as Sensor | undefined)?.name ?? '?'}: ${e.value}`);
    stage.say(`station heard ${heard} readings; last from ${(e.propagatedFrom as Sensor | undefined)?.name} (propagatedFrom)`);
  }) as never);

  if (stage.bar) {
    for (const s of sensors) {
      stage.toggle(`${s.name} reports to the station`, true, (on) => {
        if (on) s.addEventParent(station);
        else s.removeEventParent(station);
        log(`${s.name}: ${on ? 'addEventParent' : 'removeEventParent'}`);
      });
    }
  }
  let i = 0;
  const fire = (): void => (sensors[i++ % sensors.length] as Sensor).read();
  stage.button('Take a reading', fire);
  stage.every(stage.preview ? 1300 : 1800, fire);
  if (stage.preview) {
    stage.after(5200, () => (sensors[1] as Sensor).removeEventParent(station));
    stage.every(8000, () => {
      (sensors[1] as Sensor).addEventParent(station);
      stage.after(4800, () => (sensors[1] as Sensor).removeEventParent(station));
    });
  }
  return () => stage.dispose();
};

export default mount;
