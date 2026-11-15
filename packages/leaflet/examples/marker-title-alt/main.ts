// Marker title and alt: the labels that give each marker an accessible name
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Hover a marker for the browser tooltip from title. The panel lists the attributes Leaflet put on each icon image.',
  });
  const map = stage.own(new LeafletMap(stage.box, { center: [48.6, 29], zoom: stage.preview ? 4 : 6, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // alt becomes the alt attribute of the icon <img>; title becomes the title attribute.
  const markers = [
    new Marker([50.4501, 30.5234], { alt: 'Kyiv' }).bindPopup('Kyiv, Ukraine is the birthplace of Leaflet!'),
    new Marker([49.84, 24.03], { alt: 'Lviv', title: 'Lviv, western Ukraine' }),
    new Marker([46.48, 30.73], { title: 'Odesa' }), // alt keeps its default, "Marker"
    new Marker([48.46, 35.04], { alt: '' }), // no name at all: hidden from screen readers as an image, but still focusable
  ];
  for (const m of markers) m.addTo(map);

  const attrs = (m: Marker): string => {
    const img = m.getElement() as HTMLImageElement;
    return `alt="${img.alt}"  title="${img.title}"`;
  };
  const panel = stage.side('Icon attributes');
  if (panel) panel.textContent = markers.map((m, i) => `${i + 1}. ${attrs(m)}`).join('\n');

  if (stage.preview) {
    let i = 0;
    stage.every(1800, () => {
      const m = markers[i++ % markers.length]!;
      m.bindPopup(attrs(m)).openPopup();
      stage.say(`<img ${attrs(m)}>`);
    });
  }
  return () => stage.dispose();
};

export default mount;
