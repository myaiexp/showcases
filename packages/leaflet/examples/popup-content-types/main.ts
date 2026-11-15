// Popup content as an HTML string, an element built with textContent, and a document fragment
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Three markers, three kinds of content. A string is parsed as HTML; an element or fragment is inserted as it is.',
  });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const html = new Marker([60.3, 24.3]).addTo(map);
  const element = new Marker([60.15, 24.95]).addTo(map);
  const fragment = new Marker([60.3, 25.5]).addTo(map);

  // A string is rendered as HTML, so markup works. Only ever pass strings you wrote yourself.
  html.bindPopup('A <b>string</b> is HTML:<br><i>tags</i> become markup.');

  // To show text that might contain markup, build an element and set textContent: it stays plain text.
  const text = document.createElement('div');
  text.textContent = 'An element with <b>textContent</b>: the tags show as typed.';
  element.bindPopup(text);

  // A DocumentFragment is inserted too (here a title and a list).
  const frag = document.createDocumentFragment();
  const title = document.createElement('strong');
  title.textContent = 'A fragment';
  const list = document.createElement('ul');
  list.style.cssText = 'margin:4px 0 0;padding-left:16px';
  for (const word of ['two', 'list', 'items']) {
    const li = document.createElement('li');
    li.textContent = word;
    list.append(li);
  }
  frag.append(title, list);
  fragment.bindPopup(frag);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const markers = [html, element, fragment];
    const says = ['String: parsed as HTML', 'Element: textContent stays text', 'Fragment: nodes inserted'];
    stage.cycle(
      markers.map((m, i) => ({ say: says[i], run: () => g.click(m.getLatLng(), m.getElement()) })),
      2400,
    );
  }
  return () => stage.dispose();
};

export default mount;
