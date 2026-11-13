// setPadding keeps the visual centre clear of a floating sidebar
import { Map, Marker } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, controlBar, button, readout } from '../../shared/setup.ts';
import { worldStyle, cities, palette } from '../../shared/basemap.ts';

const SIDEBAR = 180;

const mount: Mount = (el, { preview }) => {
  const box = mapContainer(el, preview);
  const center = cities.london;
  const map = new Map({
    container: box,
    style: worldStyle(),
    center,
    zoom: preview ? 2 : 3,
    interactive: !preview,
  });
  new Marker({ color: palette.red }).setLngLat(center).addTo(map);

  // A fake sidebar floating over the left of the map.
  const sidebar = document.createElement('div');
  sidebar.textContent = 'Sidebar';
  Object.assign(sidebar.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    width: `${preview ? 90 : SIDEBAR}px`,
    background: 'rgba(15, 23, 42, 0.85)',
    color: '#fff',
    padding: '12px',
    boxSizing: 'border-box',
    zIndex: '2',
    font: '13px sans-serif',
  });
  box.append(sidebar);
  const width = preview ? 90 : SIDEBAR;

  let open = true;
  const apply = (): void => {
    sidebar.style.display = open ? 'block' : 'none';
    // easeTo with a padding option animates map.getPadding(); the centre stays the same coordinate.
    map.easeTo({ center, padding: { left: open ? width : 0, top: 0, right: 0, bottom: 0 }, duration: 600 });
  };

  let timer = 0;
  if (preview) {
    map.once('load', () => {
      apply();
      timer = window.setInterval(() => {
        open = !open;
        apply();
      }, 2000);
    });
  } else {
    const out = readout(el, '');
    const report = (): void => {
      const p = map.getPadding();
      out.textContent = `getPadding(): left ${Math.round(p.left ?? 0)}, right ${Math.round(p.right ?? 0)} | London stays in the visible area`;
    };
    map.on('move', report);
    map.once('load', () => {
      apply();
      report();
    });
    const bar = controlBar(el);
    button(bar, 'Toggle sidebar', () => {
      open = !open;
      apply();
    });
    button(bar, 'Pad all edges 60px', () => {
      map.setPadding({ top: 60, bottom: 60, left: 60, right: 60 });
    });
  }

  return () => {
    clearInterval(timer);
    map.remove();
    sidebar.remove();
  };
};

export default mount;
