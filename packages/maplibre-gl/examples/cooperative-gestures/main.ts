// The cooperativeGestures option: Ctrl/Cmd + scroll zooms, two fingers pan
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, controlBar, readout } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const holder = mapContainer(el, preview);
  let map: Map | undefined;
  let blocked = 0;
  let frame = 0;

  const out = preview ? undefined : readout(el);
  const report = (enabled: boolean): void => {
    if (out) {
      out.textContent = `cooperativeGestures: ${String(enabled)} | gestures blocked so far: ${blocked}`;
    }
  };

  /** Cooperative gestures are a constructor option, so toggling means building a new Map. */
  const build = (cooperative: boolean): void => {
    map?.remove();
    map = new Map({
      container: holder,
      style: worldStyle(),
      center: [15, 30],
      zoom: preview ? 0.8 : 1.5,
      interactive: !preview,
      cooperativeGestures: cooperative,
    });
    // Fired each time the handler swallows a wheel or touch gesture.
    map.on('cooperativegestureprevented', () => {
      blocked += 1;
      report(cooperative);
    });
    report(cooperative);
  };

  if (preview) {
    build(true);
    const note = document.createElement('div');
    note.textContent = 'Use Ctrl + scroll to zoom the map';
    Object.assign(note.style, {
      position: 'absolute',
      inset: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.5)',
      color: '#fff',
      font: '14px sans-serif',
      pointerEvents: 'none',
    });
    holder.append(note);
    let t = 0;
    const tick = (): void => {
      t += 1;
      map?.setCenter([15 + 20 * Math.sin(t / 200), 30]);
      // Pulse the overlay like the handler's own message does.
      note.style.opacity = String(0.5 + 0.5 * Math.sin(t / 25));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  } else {
    build(true);
    const bar = controlBar(el);
    const label = document.createElement('label');
    label.style.display = 'flex';
    label.style.gap = '4px';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = true;
    const onChange = (): void => build(box.checked);
    box.addEventListener('change', onChange);
    label.append(box, 'cooperativeGestures');
    bar.append(label);
    const hint = readout(el, 'Scroll over the map: with the option on it asks for Ctrl/Cmd and the page scrolls instead.');
    hint.style.fontFamily = 'inherit';
    return () => {
      box.removeEventListener('change', onChange);
      map?.remove();
    };
  }

  return () => {
    cancelAnimationFrame(frame);
    map?.remove();
  };
};

export default mount;
