// Shared MapLibre setup: worker URL, library CSS, map container and controls
import { setWorkerUrl } from 'maplibre-gl';
import type { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './maplibre.css';
// The docs' Vite recipe (index.md § Installation): a bundled, self-contained worker URL.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

setWorkerUrl(workerUrl);

/** Map heights: a gallery card is 200px; the full view gets room to explore. */
export const PREVIEW_HEIGHT = 200;
export const FULL_HEIGHT = 460;

/**
 * Appends a full-width div for a Map to render into. MapLibre needs the container to have
 * a real size before the Map is constructed, so the height is set inline here.
 */
export function mapContainer(el: HTMLElement, preview: boolean, height?: number): HTMLDivElement {
  const box = document.createElement('div');
  box.style.width = '100%';
  box.style.height = `${height ?? (preview ? PREVIEW_HEIGHT : FULL_HEIGHT)}px`;
  box.style.position = 'relative';
  box.style.borderRadius = preview ? '0' : '8px';
  box.style.overflow = 'hidden';
  el.append(box);
  return box;
}

/** A row under the map for the full view's controls. */
export function controlBar(el: HTMLElement): HTMLDivElement {
  const bar = document.createElement('div');
  bar.style.display = 'flex';
  bar.style.flexWrap = 'wrap';
  bar.style.gap = '8px';
  bar.style.alignItems = 'center';
  bar.style.justifyContent = 'center';
  bar.style.marginTop = '12px';
  bar.style.width = '100%';
  el.append(bar);
  return bar;
}

/**
 * Disables every input and button in the bars until the map fires `load`: style edits
 * (setPaintProperty, setSky …) throw while the style is still loading.
 */
export function enableOnLoad(map: Map, ...bars: HTMLElement[]): void {
  const controls = bars.flatMap((bar) => [...bar.querySelectorAll<HTMLInputElement>('input, button, select')]);
  for (const c of controls) c.disabled = true;
  map.once('load', () => {
    for (const c of controls) c.disabled = false;
  });
}

/** A button appended to a control bar. */
export function button(bar: HTMLElement, label: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = label;
  b.addEventListener('click', onClick);
  bar.append(b);
  return b;
}

/** A line of plain text under the map, for readouts. */
export function readout(el: HTMLElement, initial = ''): HTMLDivElement {
  const line = document.createElement('div');
  line.style.marginTop = '10px';
  line.style.fontFamily = 'var(--font-mono, monospace)';
  line.style.fontSize = '13px';
  line.style.color = 'var(--fg-2)';
  line.style.textAlign = 'center';
  line.style.minHeight = '1.4em';
  line.style.width = '100%';
  line.textContent = initial;
  el.append(line);
  return line;
}
