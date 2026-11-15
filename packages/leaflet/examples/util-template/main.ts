// Util.template: placeholders, function values, and the error for a missing key
import { LeafletMap, Marker, Util } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

interface City {
  name: string;
  at: [number, number];
  people: number;
  area: number;
}
const CITIES: City[] = [
  { name: 'Madrid', at: [40.42, -3.7], people: 3.3, area: 604 },
  { name: 'Paris', at: [48.86, 2.35], people: 2.1, area: 105 },
  { name: 'Berlin', at: [52.52, 13.4], people: 3.7, area: 892 },
  { name: 'Rome', at: [41.9, 12.5], people: 2.8, area: 1285 },
];

const TEMPLATES = [
  { say: 'Plain placeholders', text: '<b>{name}</b><br>{people} million people' },
  { say: 'A function value gets the whole data object', text: '<b>{name}</b><br>{density} per km²' },
  { say: '{mayor} has no value: template throws', text: '<b>{name}</b><br>Mayor: {mayor}' },
];

function render(template: string, city: City): string {
  // Values are strings, numbers or functions; a function receives `data`.
  const data = {
    name: city.name,
    people: city.people,
    density: (d: { people: number }) => `${Math.round((d.people * 1e6) / city.area).toLocaleString('en')}`,
  };
  try {
    return Util.template(template, data);
  } catch (err) {
    return `<span style="color:#f87171">${err instanceof Error ? err.message : String(err)}</span>`;
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the template below the map. Try {density} (a function value) and {mayor} (no value, so template throws).' });
  const map = stage.own(new LeafletMap(stage.box, { center: [46, 6], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/light/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const markers = CITIES.map((c) => new Marker(c.at).addTo(map).bindPopup('', { autoPan: stage.preview, closeButton: false, autoClose: stage.preview, closeOnClick: false }));
  const show = (template: string): void => {
    markers.forEach((m, i) => m.setPopupContent(render(template, CITIES[i] as City)));
  };
  // A card shows one popup at a time; the full view opens them all.
  let k = 0;
  const open = (): void => {
    if (stage.preview) markers[k++ % markers.length]?.openPopup();
    else markers.forEach((m) => m.openPopup());
  };

  if (stage.preview) {
    let i = 0;
    stage.cycle(
      [
        {
          run: () => {
            const t = TEMPLATES[Math.floor(i++ / 3) % TEMPLATES.length] as (typeof TEMPLATES)[number];
            stage.say(`${t.say}: ${t.text.replace(/<[^>]+>/g, ' ')}`);
            show(t.text);
            open();
          },
          hold: 2200,
        },
      ],
      2200,
    );
  } else {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = TEMPLATES[0]?.text ?? '';
    input.style.cssText = 'width:100%;font:13px monospace;padding:4px';
    input.setAttribute('aria-label', 'popup template');
    stage.root.after(input);
    stage.onDispose(() => input.remove());
    input.addEventListener('input', () => {
      show(input.value);
      open();
    }, { signal: stage.signal });
    stage.select('Template', TEMPLATES.map((t, i) => ({ value: String(i), label: t.say })), '0', (v) => {
      input.value = TEMPLATES[Number(v)]?.text ?? '';
      show(input.value);
      open();
    });
    show(input.value);
    open();
    stage.say('Util.template(str, data) replaces {key} with data[key], or data[key](data) for a function.');
  }
  return () => stage.dispose();
};

export default mount;
