// A custom Evented class: change and overheat events, once, off and listens
import { CircleMarker, Evented, LeafletMap, type LeafletEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the slider. "overheat" is listened to once; the "change" logger can be removed with off().' });
  const log = stage.log('Thermostat events');
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 0], zoom: 3, zoomControl: false, dragging: false, scrollWheelZoom: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  class Thermostat extends Evented {
    value = 20;
    limit = 70;
    set(value: number): void {
      const old = this.value;
      this.value = value;
      // The second argument is merged into the event object.
      this.fire('change', { old, value });
      if (value > this.limit) this.fire('overheat', { value });
    }
  }

  const thermostat = new Thermostat();
  const gauge = new CircleMarker([30, 0], { radius: 40, weight: 4, fillOpacity: 0.6 }).addTo(map);
  const paint = (value: number): void => {
    const hue = 220 - Math.round((value / 100) * 220);
    gauge.setStyle({ color: `hsl(${hue} 80% 55%)`, fillColor: `hsl(${hue} 80% 45%)` });
    gauge.setRadius(20 + value * 0.5);
    gauge.setTooltipContent(`${value}°`);
  };
  gauge.bindTooltip('20°', { permanent: true, direction: 'center' });

  // `this` inside a listener is the context passed to on(), here the gauge's own object.
  const context = { label: 'gauge' };
  function onChange(this: typeof context, e: LeafletEvent & { old: number; value: number }): void {
    paint(e.value);
    log(`change ${e.old} → ${e.value} (this.label = ${this.label})`);
  }
  const logger = (e: LeafletEvent & { old: number; value: number }): void => log(`logger saw ${e.type}: ${e.value}`);
  const onOverheat = (e: LeafletEvent & { value: number }): void => log(`overheat at ${e.value}: this listener was added with once()`);
  const state = (): string => `listens('change') ${thermostat.listens('change')}, listens('overheat') ${thermostat.listens('overheat')}`;

  const attach = (): void => {
    thermostat.on('change', onChange as never, context);
    thermostat.on('change', logger as never);
    thermostat.once('overheat', onOverheat as never);
    stage.say(state());
  };
  attach();
  paint(20);

  stage.slider('temperature', 0, 100, 1, 20, (v) => {
    thermostat.set(v);
    stage.say(state());
  });
  stage.button("off('change', logger)", () => {
    thermostat.off('change', logger as never);
    log('logger removed');
    stage.say(state());
  });
  stage.button("once('overheat') again", () => {
    thermostat.once('overheat', onOverheat as never);
    stage.say(state());
  });

  if (stage.preview) {
    const values = [20, 45, 85, 90, 60, 30, 95];
    let i = 0;
    stage.cycle([{ run: () => {
      const v = values[i++ % values.length] as number;
      if (i % values.length === 1) thermostat.once('overheat', onOverheat as never);
      thermostat.set(v);
      stage.say(`set(${v}): ${state()}`);
    } }], 1500);
  }
  return () => stage.dispose();
};

export default mount;
