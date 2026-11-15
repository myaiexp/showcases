// Util.throttle: a pointermove handler that runs at most once per interval
import { LeafletMap, Util } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the map. The throttled counter grows far slower; its last call always carries the final position.' });
  const pre = stage.side('Calls');
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 10], zoom: 3, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let raw = 0;
  let slow = 0;
  let lastSlow = '';
  let wait = 250;
  const show = (): void => {
    const text = `every event: ${raw}   throttled (${wait} ms): ${slow}`;
    if (pre) pre.textContent = `${text}\nlast throttled call at\n  ${lastSlow}`;
    else stage.say(text);
  };
  const onSlow = (lat: number, lng: number): void => {
    slow++;
    lastSlow = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
    show();
  };
  // throttle() takes the interval when it is built, so a new interval needs a new wrapper.
  let throttled = Util.throttle(onSlow, wait);
  map.on('pointermove', (e) => {
    raw++;
    throttled(e.latlng.lat, e.latlng.lng);
    show();
  });
  stage.slider('interval ms', 50, 1000, 50, wait, (v) => {
    wait = v;
    throttled = Util.throttle(onSlow, wait);
    raw = slow = 0;
    show();
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    let t = 0;
    stage.every(30, () => {
      t += 0.1;
      g.move([30 + 18 * Math.sin(t), 10 + 40 * Math.cos(t * 0.7)]);
    });
  }
  show();
  return () => stage.dispose();
};

export default mount;
