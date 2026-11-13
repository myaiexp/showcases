// Layer-scoped events with map.on(type, layerId, listener), plus once and off
import { Map } from 'maplibre-gl';
import type { MapLayerMouseEvent } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { cityPoints, palette, worldStyle } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [20, 30],
    zoom: preview ? 0.6 : 1.3,
    interactive: !preview,
  });
  const info = preview ? null : readout(el, 'Hover or click a city.');
  let hovered: number | null = null;
  let clicks = 0;
  let frame = 0;
  let timer = 0;

  const setHover = (id: number | null): void => {
    if (hovered !== null) map.setFeatureState({ source: 'cities', id: hovered }, { hover: false });
    hovered = id;
    if (id !== null) map.setFeatureState({ source: 'cities', id }, { hover: true });
  };

  const onEnter = (e: MapLayerMouseEvent): void => {
    map.getCanvas().style.cursor = 'pointer';
    const f = e.features?.[0];
    if (f && typeof f.id === 'number') setHover(f.id);
    if (info) info.textContent = `mouseenter: ${f?.properties.name}`;
  };
  const onLeave = (): void => {
    map.getCanvas().style.cursor = '';
    setHover(null);
    if (info) info.textContent = 'mouseleave';
  };
  const onClick = (e: MapLayerMouseEvent): void => {
    clicks++;
    const f = e.features?.[0];
    if (info) info.textContent = `click #${clicks}: ${f?.properties.name} at ${e.lngLat.lng.toFixed(2)}, ${e.lngLat.lat.toFixed(2)}`;
  };

  map.on('load', () => {
    map.addSource('cities', { type: 'geojson', data: cityPoints() });
    map.addLayer({
      id: 'cities',
      type: 'circle',
      source: 'cities',
      paint: {
        'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], 12, 7],
        'circle-color': ['case', ['boolean', ['feature-state', 'hover'], false], palette.accent, palette.blue],
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 1.5,
      },
    });

    if (preview) {
      // No pointer in a gallery card, so step the highlight through the cities by hand.
      let i = 0;
      timer = window.setInterval(() => setHover((i++ % 12) + 1), 600);
      const t0 = performance.now();
      const drift = (now: number): void => {
        map.setCenter([20 + Math.sin((now - t0) / 4000) * 25, 30]);
        frame = requestAnimationFrame(drift);
      };
      frame = requestAnimationFrame(drift);
      return;
    }

    // The layer id is the middle argument: the listener only fires for features of that layer.
    map.on('mouseenter', 'cities', onEnter);
    map.on('mouseleave', 'cities', onLeave);
    map.on('click', 'cities', onClick);
  });

  if (!preview) {
    const bar = controlBar(el);
    button(bar, 'Next click only (once)', () => {
      map.once('click', 'cities', (e) => {
        if (info) info.textContent = `once: ${e.features?.[0]?.properties.name} (this listener removed itself)`;
      });
    });
    const toggle = button(bar, 'Stop click listener (off)', () => {
      if (toggle.dataset.off === '1') {
        map.on('click', 'cities', onClick);
        toggle.dataset.off = '0';
        toggle.textContent = 'Stop click listener (off)';
      } else {
        // off needs the same layer id and the same function that on received.
        map.off('click', 'cities', onClick);
        toggle.dataset.off = '1';
        toggle.textContent = 'Restore click listener (on)';
      }
    });
  }

  return () => {
    cancelAnimationFrame(frame);
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
