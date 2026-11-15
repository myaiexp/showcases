// AttributionControl: setPrefix, addAttribution and removeAttribution, with a count per text
import { AttributionControl, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The control joins the texts with commas, and counts duplicates: a text added twice stays until it is removed twice.' });
  // attributionControl: false, so the control below is the only one and is configured by hand.
  const map = stage.own(new LeafletMap(stage.box, { center: [46, 8], zoom: 4, attributionControl: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png').addTo(map);
  const attribution = new AttributionControl({ position: 'bottomright', prefix: 'Leaflet 2 gallery' }).addTo(map);
  stage.onDispose(() => attribution.remove());

  const read = (note: string): void => stage.say(`${note}: "${attribution.getContainer()?.textContent ?? ''}"`);
  read('start');
  const ACTIONS: [string, () => unknown][] = [
    ['addAttribution("&copy; Example data")', () => attribution.addAttribution('&copy; Example data')],
    ['addAttribution("Icons: <a href=\'#\'>Sample</a>")', () => attribution.addAttribution('Icons: <a href="#">Sample</a>')],
    ['addAttribution("&copy; Example data") again', () => attribution.addAttribution('&copy; Example data')],
    ['removeAttribution("&copy; Example data") once', () => attribution.removeAttribution('&copy; Example data')],
    ['removeAttribution("&copy; Example data") twice', () => attribution.removeAttribution('&copy; Example data')],
    ['setPrefix("A custom prefix")', () => attribution.setPrefix('A custom prefix')],
    ['setPrefix(false)', () => attribution.setPrefix(false)],
    ['removeAttribution("Icons: …")', () => attribution.removeAttribution('Icons: <a href="#">Sample</a>')],
    ['setPrefix("Leaflet 2 gallery")', () => attribution.setPrefix('Leaflet 2 gallery')],
  ];
  for (const [label, run] of ACTIONS) stage.button(label.length > 28 ? `${label.slice(0, 26)}…` : label, () => { run(); read(label); });

  if (stage.preview) stage.cycle(ACTIONS.map(([label, run]) => ({ run: () => { run(); read(label.replace(/&copy; /g, '')); } })), 1800);
  return () => stage.dispose();
};

export default mount;
