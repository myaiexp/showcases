// Marker defaults through a subclass and mergeOptions, not on Marker
import { DefaultIcon, LeafletMap, Marker, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the map to add a PinMarker. The top row are plain Markers, still blue.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, 4], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // MIGRATION.md: 1.x set Marker.prototype.options.icon; 2.0 uses mergeOptions. Doing that on Marker would
  // change every marker on the page, including those in other examples, so extend Marker first.
  class PinMarker extends Marker {}
  PinMarker.mergeOptions({ icon: new DefaultIcon({ color: 'crimson' }), riseOnHover: true, title: 'A PinMarker' });

  [-3, 3, 9].forEach((lng) => new Marker([53, lng]).addTo(map));
  [-3, 3, 9].forEach((lng) => new PinMarker([49.5, lng]).addTo(map));

  const panel = stage.side('Options');
  if (panel) {
    const plain = new Marker([0, 0]);
    const pin = new PinMarker([0, 0]);
    panel.textContent = [
      `Marker.options.riseOnHover:    ${plain.options.riseOnHover}`,
      `PinMarker.options.riseOnHover: ${pin.options.riseOnHover}`,
      `Marker icon color:    ${String((plain.getIcon() as DefaultIcon).options.color)}`,
      `PinMarker icon color: ${String((pin.getIcon() as DefaultIcon).options.color)}`,
      `Marker title:    "${plain.options.title}"`,
      `PinMarker title: "${pin.options.title}"`,
    ].join('\n');
  }

  const added: Marker[] = [];
  map.on('click', (e: LeafletPointerEvent) => added.push(new PinMarker(e.latlng).addTo(map)));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.say('class PinMarker extends Marker {}  PinMarker.mergeOptions({...})');
    let n = 0;
    stage.every(1000, () => {
      if (added.length >= 3) added.shift()?.remove();
      g.click([50.8 + (n % 2) * 1.2, -4 + (n % 5) * 3.5]);
      n++;
    });
  }
  return () => stage.dispose();
};

export default mount;
