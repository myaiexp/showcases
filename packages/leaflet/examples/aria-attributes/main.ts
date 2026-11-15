// The attributes behind accessible maps: roles, labels, tab stops, aria-expanded and aria-keyshortcuts
import { DivIcon, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

type Shortcuts = 'off' | 'true' | 'custom';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Open the popup of the first marker and watch aria-expanded appear. Switch ariaKeyShortcuts to see aria-keyshortcuts on the container.' });
  const pre = stage.side('Attributes');
  const map = stage.own(new LeafletMap(stage.box, { center: [52, 30.52], zoom: 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const kyiv = new Marker([50.4501, 30.5234], { alt: 'Kyiv' }).addTo(map).bindPopup('Kyiv, Ukraine is the birthplace of Leaflet!', { autoPan: false, maxWidth: stage.preview ? 170 : 300 });
  // A DivIcon has no alt: its HTML supplies the name. The span is invisible but read aloud.
  const lviv = new Marker([49.84, 24.03], {
    icon: new DivIcon({ html: '<span class="sr-only">Lviv</span>', className: 'dot-icon', iconSize: [18, 18] }),
  }).addTo(map);

  const describe = (title: string, node: Element | null | undefined, names: string[]): string => {
    if (!node) return `${title}\n  (not on the page)`;
    const parts = names.map((n) => `${n}="${node.getAttribute(n) ?? ''}"`.replace(/=""$/, ' (unset)'));
    if (node instanceof HTMLImageElement) parts.unshift(`alt="${node.alt}"`);
    const text = node.textContent?.trim();
    if (text && node.className.includes('marker') && !(node instanceof HTMLImageElement)) parts.push(`text "${text.slice(0, 18)}"`);
    return `${title}\n  ${parts.join('\n  ')}`;
  };
  const show = (): void => {
    const container = map.getContainer();
    const text = [
      describe('map container', container, ['role', 'aria-label', 'tabindex', 'aria-keyshortcuts']),
      describe('Kyiv marker icon', kyiv.getElement(), ['role', 'tabindex', 'aria-expanded', 'aria-controls']),
      describe('Lviv marker icon (DivIcon)', lviv.getElement(), ['role', 'tabindex']),
      describe('zoom in button', container.querySelector('.leaflet-control-zoom-in'), ['aria-label', 'role']),
      describe('popup close button', container.querySelector('.leaflet-popup-close-button'), ['aria-label']),
    ].join('\n');
    if (pre) pre.textContent = text;
    else {
      const k = kyiv.getElement();
      stage.say(`container aria-keyshortcuts="${container.getAttribute('aria-keyshortcuts') ?? '(unset)'}" | Kyiv role=${k?.getAttribute('role')} aria-expanded=${k?.getAttribute('aria-expanded') ?? '(unset)'}`);
    }
  };
  for (const name of ['popupopen', 'popupclose'] as const) map.on(name, show);

  const setShortcuts = (mode: Shortcuts): void => {
    map.options.ariaKeyShortcuts = mode === 'off' ? false : mode === 'true' ? true : 'ArrowLeft ArrowRight ArrowUp ArrowDown Plus Minus';
    // The attribute is written when the keyboard handler is enabled.
    map.keyboard.disable();
    map.keyboard.enable();
    show();
  };
  stage.select<Shortcuts>('ariaKeyShortcuts', [{ value: 'off', label: 'false (default)' }, { value: 'true', label: 'true' }, { value: 'custom', label: 'a custom string' }], 'off', setShortcuts);
  stage.button('Open the Kyiv popup', () => kyiv.openPopup());
  stage.button('Close it', () => kyiv.closePopup());
  show();

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => (setShortcuts('off'), kyiv.closePopup()) },
        { run: () => kyiv.openPopup() },
        { run: () => setShortcuts('true') },
        { run: () => kyiv.closePopup() },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
