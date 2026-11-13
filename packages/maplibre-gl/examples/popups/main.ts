// Popups: one set on a Marker with setPopup, one opened where a country is clicked
import { Map, Marker, Popup } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, readout } from '../../shared/setup.ts';
import { worldStyle, cities, palette } from '../../shared/basemap.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [15, 40],
    zoom: preview ? 1 : 1.6,
    interactive: !preview,
  });

  // A popup handed to a marker opens when the marker is clicked.
  const markerPopup = new Popup({ offset: 30, closeButton: false, maxWidth: '180px' }).setText(
    'Helsinki: a popup attached with Marker.setPopup. Click the marker to toggle it.',
  );
  const marker = new Marker({ color: palette.red })
    .setPopup(markerPopup)
    .setLngLat(cities.helsinki)
    .addTo(map);

  let timer = 0;
  if (preview) {
    // Both popups follow one open/closed state, driven from load so they stay in step.
    const second = new Popup({ closeOnClick: false, closeButton: false });
    const setOpen = (open: boolean): void => {
      if (markerPopup.isOpen() !== open) marker.togglePopup();
      if (open) second.setLngLat(cities.london).setText('London').addTo(map);
      else second.remove();
    };
    map.once('load', () => {
      let open = true;
      setOpen(open);
      timer = window.setInterval(() => {
        open = !open;
        setOpen(open);
      }, 1500);
    });
  } else {
    const out = readout(el, 'Click a country to open a popup there. Click the marker for the other one.');
    let countryPopup: Popup | undefined;
    map.on('click', 'countries-fill', (e) => {
      const name = String(e.features?.[0]?.properties['name'] ?? 'Unknown');
      // setDOMContent takes real nodes, so no HTML string is parsed.
      const box = document.createElement('div');
      box.className = 'box';
      const title = document.createElement('strong');
      title.textContent = name;
      const where = document.createElement('div');
      where.textContent = `${e.lngLat.lng.toFixed(2)}, ${e.lngLat.lat.toFixed(2)}`;
      box.append(title, where);
      countryPopup?.remove();
      countryPopup = new Popup({ maxWidth: '200px', closeButton: true, offset: [0, -4] })
        .setLngLat(e.lngLat)
        .setDOMContent(box)
        .addTo(map);
      out.textContent = `Popup.isOpen(): ${countryPopup.isOpen()} at ${countryPopup.getLngLat().toString()}`;
    });
    map.on('mouseenter', 'countries-fill', () => (map.getCanvas().style.cursor = 'pointer'));
    map.on('mouseleave', 'countries-fill', () => (map.getCanvas().style.cursor = ''));
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
