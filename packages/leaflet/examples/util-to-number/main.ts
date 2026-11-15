// Util.toNumber: NaN for blank or non-numeric text where Number() gives 0
import { LeafletMap, Marker, Util } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const SAMPLES: [string, string][] = [
  ['51.5', '-0.12'],
  [' 35.7 ', '139.7'],
  ['', '30'],
  ['abc', '10'],
  ['-33.9', '151.2'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a latitude and a longitude. Try a blank field or "12abc": Number("") is 0, toNumber("") is NaN.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [20, 0], zoom: 2, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const marker = new Marker([51.5, -0.12]).addTo(map);

  const apply = (latText: string, lngText: string): void => {
    const lat = Util.toNumber(latText);
    const lng = Util.toNumber(lngText);
    const ours = `toNumber: ${JSON.stringify(latText)} → ${lat}, ${JSON.stringify(lngText)} → ${lng}`;
    const plain = `Number: ${Number(latText)}, ${Number(lngText)}`;
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      stage.say(`${ours} | ${plain} | rejected, marker stays`, 'bad');
      return;
    }
    marker.setLatLng([lat, lng]);
    map.panTo([lat, lng]);
    stage.say(`${ours} | ${plain} | moved`, 'ok');
  };

  if (stage.bar) {
    const mk = (label: string, value: string): HTMLInputElement => {
      const wrap = document.createElement('label');
      wrap.append(label);
      const input = document.createElement('input');
      input.type = 'text';
      input.value = value;
      input.size = 10;
      wrap.append(input);
      stage.bar?.append(wrap);
      return input;
    };
    const lat = mk('latitude', '51.5');
    const lng = mk('longitude', '-0.12');
    const go = (): void => apply(lat.value, lng.value);
    lat.addEventListener('input', go, { signal: stage.signal });
    lng.addEventListener('input', go, { signal: stage.signal });
    go();
  } else {
    let i = 0;
    stage.cycle([{ run: () => apply(...(SAMPLES[i++ % SAMPLES.length] as [string, string])) }], 2300);
  }
  return () => stage.dispose();
};

export default mount;
