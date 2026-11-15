// The migration table's one-line replacements, run on a DivIcon's element
import { DivIcon, LeafletMap, Marker, Util } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each press is one row of the migration guide: the removed call, then what to write in 2.0, with its live result.' });
  const log = stage.log('1.x → 2.0');
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 10], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const marker = new Marker([48, 10], {
    icon: new DivIcon({ html: '<b>old</b>', className: 'ru-box', iconSize: [90, 34], iconAnchor: [45, 17] }),
    interactive: false,
    keyboard: false,
  }).addTo(map);
  const box = (): HTMLElement => marker.getElement() as HTMLElement;

  const rows: { was: string; now: string; run: () => string }[] = [
    { was: 'L.extend(a, b)', now: 'Object.assign(a, b)', run: () => JSON.stringify(Object.assign({ a: 1 }, { b: 2 })) },
    { was: 'Util.getParamString(obj)', now: "'?' + new URLSearchParams(obj)", run: () => `?${new URLSearchParams({ service: 'WMS', layers: 'land', width: '256' })}` },
    { was: 'DomUtil.addClass(el, name)', now: 'el.classList.add(name)', run: () => (box().classList.add('hot'), `class="${box().getAttribute('class')}"`) },
    { was: 'DomUtil.setOpacity(el, 0.5)', now: 'el.style.opacity = 0.5', run: () => ((box().style.opacity = '0.5'), `style.opacity = ${box().style.opacity}`) },
    { was: "DomUtil.getStyle(el, 'opacity')", now: "getComputedStyle(el)['opacity']", run: () => `computed opacity = ${getComputedStyle(box())['opacity']}` },
    { was: 'DomUtil.empty(el)', now: 'el.replaceChildren()', run: () => (box().replaceChildren(), `childNodes: ${box().childNodes.length}`) },
    { was: 'L.stamp(obj)', now: 'Util.stamp(obj)', run: () => `Util.stamp(marker) = ${Util.stamp(marker)}` },
  ];
  let n = 0;
  const step = (): void => {
    if (n % rows.length === 0) {
      // Start over with a fresh element.
      marker.remove();
      marker.addTo(map);
    }
    const row = rows[n++ % rows.length];
    if (!row) return;
    const out = row.run();
    log(`${row.was}  →  ${row.now}\n  ${out}`);
    stage.say(`${row.was} → ${row.now}: ${out}`);
  };
  stage.button('Next row', step);

  if (stage.preview) stage.cycle([{ run: step }], 1900);
  else step();
  return () => stage.dispose();
};

export default mount;
