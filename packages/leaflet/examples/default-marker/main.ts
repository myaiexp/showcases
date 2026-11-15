// The default marker: a DefaultIcon pin, drawn as an inline SVG, with a popup
import { LeafletMap, Marker, type DefaultIcon } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the marker. The panel reads the options of the icon the marker uses when you pass none.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.09], zoom: 11, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // No options at all: the marker gets Marker.defaultOptions.icon, a shared DefaultIcon.
  const marker = new Marker([51.5, -0.09]).addTo(map).bindPopup('A marker with no options.');

  // What that default icon looks like to the page.
  const panel = stage.side('The default icon');
  if (panel) {
    const { iconSize, iconAnchor, popupAnchor, tooltipAnchor } = marker.getIcon().options;
    const color = (marker.getIcon() as DefaultIcon).options.color;
    const icon = marker.getElement();
    panel.textContent = [
      `iconSize      ${JSON.stringify(iconSize)}`,
      `iconAnchor    ${JSON.stringify(iconAnchor)}`,
      `popupAnchor   ${JSON.stringify(popupAnchor)}`,
      `tooltipAnchor ${JSON.stringify(tooltipAnchor)}`,
      `color         ${String(color)}`,
      '',
      `element   <${icon?.tagName.toLowerCase()}>`,
      `src       ${(icon as HTMLImageElement | null)?.src.slice(0, 26)}…`,
      `alt       "${(icon as HTMLImageElement | null)?.alt}"`,
      `tabindex  ${icon?.tabIndex}, role "${icon?.getAttribute('role')}"`,
    ].join('\n');
  }

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { say: 'new Marker([51.5, -0.09]).addTo(map)', run: () => marker.closePopup() },
        { say: 'a click opens its popup', run: () => g.click(marker.getLatLng(), marker.getElement()) },
      ],
      2400,
    );
  }
  return () => stage.dispose();
};

export default mount;
