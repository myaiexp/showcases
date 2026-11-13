// Checkboxes that enable and disable each interaction handler
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, controlBar, readout } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';

const names = [
  'scrollZoom',
  'boxZoom',
  'dragRotate',
  'dragPan',
  'keyboard',
  'doubleClickZoom',
  'touchZoomRotate',
] as const;

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [15, 30],
    zoom: preview ? 0.8 : 1.5,
    interactive: !preview,
  });

  let frame = 0;
  let timer = 0;
  let label: HTMLDivElement | undefined;
  const cleanups: (() => void)[] = [];

  if (preview) {
    // Cycle through the handlers, flipping one at a time and naming it on the map.
    label = document.createElement('div');
    Object.assign(label.style, {
      position: 'absolute',
      left: '8px',
      top: '8px',
      padding: '4px 8px',
      background: 'rgba(15, 23, 42, 0.85)',
      color: '#fff',
      font: '12px monospace',
      zIndex: '2',
    });
    map.getContainer().append(label);
    let i = 0;
    const shown = label;
    timer = window.setInterval(() => {
      const name = names[i++ % names.length] ?? 'scrollZoom';
      const handler = map[name];
      if (handler.isEnabled()) handler.disable();
      else handler.enable();
      shown.textContent = `${name}.isEnabled() = ${String(handler.isEnabled())}`;
    }, 1200);
    const drift = (): void => {
      map.setCenter([map.getCenter().lng + 0.15, 30]);
      frame = requestAnimationFrame(drift);
    };
    map.once('load', drift);
  } else {
    const bar = controlBar(el);
    const out = readout(el);
    const report = (): void => {
      out.textContent = names.map((n) => `${n}: ${String(map[n].isEnabled())}`).join('  ');
    };
    for (const name of names) {
      const row = document.createElement('label');
      row.style.display = 'flex';
      row.style.gap = '4px';
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = map[name].isEnabled();
      const onChange = (): void => {
        // Every handler has enable() and disable() (and isEnabled()).
        if (box.checked) map[name].enable();
        else map[name].disable();
        report();
      };
      box.addEventListener('change', onChange);
      cleanups.push(() => box.removeEventListener('change', onChange));
      row.append(box, name);
      bar.append(row);
    }
    report();
  }

  return () => {
    cancelAnimationFrame(frame);
    clearInterval(timer);
    for (const fn of cleanups) fn();
    label?.remove();
    map.remove();
  };
};

export default mount;
