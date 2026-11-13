// step (bands over a number) and match (categories) on the same countries
import { Map } from 'maplibre-gl';
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { palette, worldStyle } from '../../shared/basemap.ts';

const letters = (s: string): string[] => s.split('');

// match: the first letter of the name picks a colour; each label can be an array of letters.
const byLetter: ExpressionSpecification = [
  'match',
  ['slice', ['get', 'name'], 0, 1],
  letters('ABCDE'), palette.blue,
  letters('FGHIJK'), palette.green,
  letters('LMNOP'), palette.accent,
  letters('QRST'), palette.purple,
  palette.red, // fallback: U to Z and anything else
];

// step: the output changes at each stop; below the first stop the base colour is used.
const byLength: ExpressionSpecification = [
  'step',
  ['length', ['get', 'name']],
  '#1d3a5c', // fewer than 6 letters
  6, '#2a7ab0',
  9, '#7fc8a9',
  12, '#f2d16b',
  16, '#e4572e',
];

const legends = {
  match: 'match: first letter A-E blue, F-K green, L-P amber, Q-T purple, otherwise red',
  step: 'step on name length: under 6 dark blue, 6-8 blue, 9-11 green, 12-15 yellow, 16+ orange',
};

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 25],
    zoom: preview ? 0.9 : 1.5,
    interactive: !preview,
  });
  let mode: keyof typeof legends = 'match';
  const apply = (): void => {
    if (!map.getLayer('countries-fill')) return; // applied again on load
    map.setPaintProperty('countries-fill', 'fill-color', mode === 'match' ? byLetter : byLength);
  };
  const flip = (): void => {
    mode = mode === 'match' ? 'step' : 'match';
    apply();
  };

  map.on('load', apply);

  let timer = 0;
  let frame = 0;
  if (preview) {
    const drift = (): void => {
      map.setCenter([map.getCenter().lng + 0.12, 25]);
      frame = requestAnimationFrame(drift);
    };
    map.once('load', () => {
      timer = window.setInterval(flip, 2000);
      drift();
    });
  } else {
    const bar = controlBar(el);
    const out = readout(el, legends[mode]);
    const buttons = {
      match: button(bar, 'match (first letter)', () => set('match')),
      step: button(bar, 'step (name length)', () => set('step')),
    };
    const set = (m: keyof typeof legends): void => {
      mode = m;
      apply();
      out.textContent = legends[m];
      buttons.match.disabled = m === 'match';
      buttons.step.disabled = m === 'step';
    };
    set('match');
  }

  return () => {
    clearInterval(timer);
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
