// setIcon and getIcon: swap a marker's icon, and when the element is reused
import { DefaultIcon, DivIcon, Icon, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const [leaf, shadow] = await Promise.all([images.leafRed(), images.leafShadow()]);
  const stage = createStage(el, ctx, { hint: 'setIcon() swaps the icon of a marker that is already on the map. An image icon swapped for another image icon keeps its <img> element.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.09], zoom: 13, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const icons = {
    default: new DefaultIcon(),
    crimson: new DefaultIcon({ color: 'crimson' }),
    leaf: new Icon({ iconUrl: leaf, shadowUrl: shadow, iconSize: [38, 95], shadowSize: [50, 64], iconAnchor: [22, 94], shadowAnchor: [4, 62] }),
    div: new DivIcon({ html: '<b style="color:#222">div</b>', className: 'leaflet-div-icon', iconSize: [34, 22] }),
  };
  type Name = keyof typeof icons;

  const marker = new Marker([51.5, -0.09]).addTo(map);
  const panel = stage.side('After the swap');

  const swap = (name: Name): void => {
    const before = marker.getElement();
    marker.setIcon(icons[name]);
    const after = marker.getElement();
    const now = marker.getIcon();
    const kind = now instanceof DivIcon ? 'DivIcon' : now instanceof DefaultIcon ? 'DefaultIcon' : 'Icon';
    stage.say(`setIcon(${name}): ${kind}, ${after === before ? 'same element reused' : 'new element'}`);
    if (panel) {
      panel.textContent = [
        `getIcon() is a ${kind}`,
        `getIcon() === icons.${name}: ${marker.getIcon() === icons[name]}`,
        `element: <${after?.tagName.toLowerCase()}>`,
        `same element as before: ${after === before}`,
      ].join('\n');
    }
  };
  (Object.keys(icons) as Name[]).forEach((name) => stage.button(name, () => swap(name)));

  if (stage.preview) {
    stage.cycle((Object.keys(icons) as Name[]).map((name) => ({ run: () => swap(name) })), 1500);
  } else {
    swap('default');
  }
  return () => stage.dispose();
};

export default mount;
