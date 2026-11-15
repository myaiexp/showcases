// One layer with both a tooltip and a popup: hover for a hint, click for the details
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the marker for the tooltip, click it for the popup. Both are bound to the same marker.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const marker = new Marker([60.17, 24.94], { title: 'Helsinki' }).addTo(map);
  marker.bindTooltip('Helsinki', { direction: 'right' });
  marker.bindPopup('<b>Helsinki</b><br>The popup holds the longer text.', { autoPan: false });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const el = (): Element | null | undefined => marker.getElement();
    stage.cycle(
      [
        { say: 'Hover: the tooltip', run: () => g.over(marker.getLatLng(), el()), hold: 1500 },
        { say: 'Click: the popup opens', run: () => g.click(marker.getLatLng(), el()), hold: 1800 },
        { say: 'Pointer leaves: the tooltip closes', run: () => g.out(el()), hold: 1500 },
        { say: 'The popup stays until closed', run: () => marker.closePopup(), hold: 1000 },
      ],
      800,
    );
  }
  return () => stage.dispose();
};

export default mount;
