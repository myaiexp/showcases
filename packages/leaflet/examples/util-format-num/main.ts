// Util.formatNum: rounding coordinates to N decimals, or not at all with false
import { LeafletMap, Util, type LatLng } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the map. At 6 decimals a coordinate is accurate to about 0.1 m; at 0 it is a whole degree.' });
  const pre = stage.side('formatNum(value, precision)');
  const map = stage.own(new LeafletMap(stage.box, { center: [48.2, 16.37], zoom: 11, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let precision: number | false = 6;
  let last: LatLng = map.getCenter();
  const show = (): void => {
    const lat = Util.formatNum(last.lat, precision);
    const lng = Util.formatNum(last.lng, precision);
    const label = precision === false ? 'false' : String(precision);
    const line = `precision ${label}: ${lat}, ${lng}`;
    if (pre) pre.textContent = `raw\n  ${last.lat}\n  ${last.lng}\nprecision ${label}\n  ${lat}\n  ${lng}\nString(lat).length = ${String(lat).length}`;
    else stage.say(line);
  };
  map.on('pointermove', (e) => {
    last = e.latlng;
    show();
  });
  stage.slider('precision', 0, 8, 1, 6, (v) => {
    precision = v;
    show();
  });
  stage.toggle('false (no rounding)', false, (on) => {
    precision = on ? false : 6;
    show();
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const steps: (number | false)[] = [6, 4, 2, 0, false];
    let i = 0;
    stage.every(1500, () => (precision = steps[i++ % steps.length] as number | false));
    let t = 0;
    stage.every(200, () => {
      t += 0.2;
      g.move([48.2 + 0.05 * Math.sin(t), 16.37 + 0.12 * Math.cos(t)]);
    });
  }
  return () => stage.dispose();
};

export default mount;
