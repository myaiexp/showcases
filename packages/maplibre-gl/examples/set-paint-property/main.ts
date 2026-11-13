// setPaintProperty driven by sliders and colour pickers
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { controlBar, enableOnLoad, mapContainer } from '../../shared/setup.ts';
import { palette, worldStyle } from '../../shared/basemap.ts';
import { slider } from '../../shared/controls.ts';

function colorInput(bar: HTMLElement, label: string, value: string, onInput: (v: string) => void): void {
  const wrap = document.createElement('label');
  wrap.append(`${label} `);
  const input = document.createElement('input');
  input.type = 'color';
  input.value = value;
  input.addEventListener('input', () => onInput(input.value));
  wrap.append(input);
  bar.append(wrap);
}

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [15, 30],
    zoom: preview ? 0.6 : 1.3,
    interactive: !preview,
  });

  let timer = 0;
  if (preview) {
    let hue = 200;
    map.once('load', () => {
      timer = window.setInterval(() => {
        hue = (hue + 3) % 360;
        map.setPaintProperty('countries-fill', 'fill-color', `hsl(${hue}, 50%, 35%)`);
        map.setPaintProperty('borders', 'line-width', 0.6 + 1.4 * Math.abs(Math.sin(hue / 30)));
      }, 60);
    });
  } else {
    const bar = controlBar(el);
    colorInput(bar, 'fill', palette.land, (v) => map.setPaintProperty('countries-fill', 'fill-color', v));
    slider(bar, 'fill-opacity', 0, 1, 0.05, 1, (v) => map.setPaintProperty('countries-fill', 'fill-opacity', v));
    const bar2 = controlBar(el);
    colorInput(bar2, 'border', palette.border, (v) => map.setPaintProperty('borders', 'line-color', v));
    slider(bar2, 'line-width', 0, 6, 0.1, 0.8, (v) => map.setPaintProperty('borders', 'line-width', v));
    colorInput(bar2, 'ocean', palette.ocean, (v) => map.setPaintProperty('ocean', 'background-color', v));
    enableOnLoad(map, bar, bar2);
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
