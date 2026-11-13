// A draggable Marker whose drag events feed a coordinate readout
import { Map, Marker } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, readout } from '../../shared/setup.ts';
import { worldStyle, cities, palette } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 40],
    zoom: preview ? 0.8 : 1.6,
    interactive: !preview,
  });

  const marker = new Marker({ draggable: !preview, color: palette.red })
    .setLngLat(cities.london)
    .addTo(map);

  let frame = 0;
  if (preview) {
    // No pointer input in a preview, so move the marker as if it were being dragged.
    let t = 0;
    const tick = (): void => {
      t += 1;
      marker.setLngLat([-10 + 40 * Math.sin(t / 90), 40 + 15 * Math.cos(t / 70)]);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  } else {
    const out = readout(el, 'Drag the marker (or focus it and use the arrow keys).');
    const show = (phase: string): void => {
      const { lng, lat } = marker.getLngLat();
      out.textContent = `${phase}: ${lng.toFixed(3)}, ${lat.toFixed(3)}`;
    };
    marker.on('dragstart', () => show('dragstart'));
    marker.on('drag', () => show('drag'));
    marker.on('dragend', () => show('dragend'));
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
