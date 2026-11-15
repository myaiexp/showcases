// The translate option: every built-in label in another language
import { FullscreenControl, LayersControl, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const uk: Record<string, string> = {
  Map: 'Мапа',
  Marker: 'Маркер',
  'Zoom in': 'Наблизити',
  'Zoom out': 'Віддалити',
  Layers: 'Шари',
  'Enter fullscreen': 'На весь екран',
  'Exit fullscreen': 'Вийти з повноекранного режиму',
  'Close popup': 'Закрити',
};

type Language = 'en' | 'uk';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the buttons to see their titles. The list reads the same labels from the page, as a screen reader would get them.' });
  const pre = stage.side('Labels in the DOM');
  let map: LeafletMap | undefined;
  stage.own({ remove: () => map?.remove() });

  const build = (language: Language): void => {
    map?.remove();
    // Text is translated while it renders, so translate is set before anything is added.
    const made = new LeafletMap(stage.box, {
      center: [49, 31],
      zoom: 5,
      zoomControl: true,
      ...(language === 'uk' ? { translate: (text: string) => uk[text] } : {}),
    });
    map = made;
    const dark = new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(made);
    new LayersControl({ Dark: dark }, {}, { collapsed: true }).addTo(made);
    new FullscreenControl({ position: 'topright' }).addTo(made);
    // alt is left at its default, 'Marker', which the map translates.
    const marker = new Marker([50.45, 30.52]).addTo(made).bindPopup('Kyiv', { autoPan: false });
    marker.openPopup();

    const container = made.getContainer();
    const labels: string[] = [`map container: ${container.getAttribute('aria-label')}`, `marker alt: ${(marker.getElement() as HTMLImageElement | undefined)?.alt}`];
    for (const a of container.querySelectorAll('.leaflet-control:not(.leaflet-control-attribution) a, .leaflet-control:not(.leaflet-control-attribution) button')) {
      labels.push(`control: ${a.getAttribute('aria-label') ?? a.getAttribute('title') ?? '(none)'}`);
    }
    labels.push(`popup close: ${container.querySelector('.leaflet-popup-close-button')?.getAttribute('aria-label')}`);
    if (pre) pre.textContent = `language ${language}\n${labels.join('\n')}`;
    stage.say(`${language}: ${labels.map((l) => l.split(': ')[1]).join(' · ')}`);
  };

  build('en');
  stage.select<Language>('language', [{ value: 'en', label: 'English (default)' }, { value: 'uk', label: 'Ukrainian' }], 'en', build);

  if (stage.preview) {
    const order: Language[] = ['uk', 'en'];
    let i = 0;
    stage.cycle([{ run: () => build(order[i++ % order.length] as Language) }], 2800);
  }
  return () => stage.dispose();
};

export default mount;
