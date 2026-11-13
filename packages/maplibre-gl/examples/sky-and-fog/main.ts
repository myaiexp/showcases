// map.setSky with colour and blend controls on pitched terrain
import { Map } from 'maplibre-gl';
import type { SkySpecification } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { enableOnLoad, mapContainer, readout } from '../../shared/setup.ts';
import { palette } from '../../shared/basemap.ts';
import { DEM_CENTER, syntheticDem } from '../../shared/dem.ts';

const DAY: SkySpecification = {
  'sky-color': '#5d9be0',
  'horizon-color': '#dfeaf5',
  'fog-color': '#c9d6c0',
  'sky-horizon-blend': 0.6,
  'horizon-fog-blend': 0.6,
  'fog-ground-blend': 0.4,
};
const DUSK: SkySpecification = {
  'sky-color': '#2a2f5a',
  'horizon-color': '#f2a65a',
  'fog-color': '#6b4a5e',
  'sky-horizon-blend': 0.9,
  'horizon-fog-blend': 0.5,
  'fog-ground-blend': 0.7,
};

const mount: Mount = (el, { preview }) => {
  const dem = syntheticDem();
  const map = new Map({
    container: mapContainer(el, preview),
    style: {
      version: 8,
      sources: { dem: dem.source },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': palette.land } },
        { id: 'hills', type: 'hillshade', source: 'dem', paint: { 'hillshade-shadow-color': '#2a3140' } },
      ],
      terrain: { source: 'dem', exaggeration: 1.5 },
      sky: DAY,
    },
    center: DEM_CENTER,
    zoom: preview ? 8.4 : 9,
    pitch: 78,
    bearing: 20,
    maxPitch: 85,
    interactive: !preview,
  });

  let timer = 0;
  const off: Array<() => void> = [];

  if (preview) {
    // Alternate between a day and a dusk sky; the sky properties are transitionable.
    let dusk = false;
    map.once('load', () => {
      timer = window.setInterval(() => {
        dusk = !dusk;
        map.setSky(dusk ? DUSK : DAY);
      }, 3000);
    });
  } else {
    const current: SkySpecification = { ...DAY };
    const info = readout(el, '');
    const panel = document.createElement('div');
    panel.style.display = 'grid';
    panel.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    panel.style.gap = '8px 16px';
    panel.style.marginTop = '12px';
    el.insertBefore(panel, info);

    const show = (): void => {
      info.textContent = JSON.stringify(current);
    };
    const field = (key: keyof SkySpecification, type: 'color' | 'range'): void => {
      const label = document.createElement('label');
      label.textContent = `${key} `;
      const input = document.createElement('input');
      input.type = type;
      if (type === 'range') {
        input.min = '0';
        input.max = '1';
        input.step = '0.05';
      }
      input.value = String(current[key]);
      const onInput = (): void => {
        (current as Record<string, string | number>)[key] = type === 'range' ? Number(input.value) : input.value;
        map.setSky({ ...current });
        show();
      };
      input.addEventListener('input', onInput);
      off.push(() => input.removeEventListener('input', onInput));
      label.append(input);
      panel.append(label);
    };
    field('sky-color', 'color');
    field('horizon-color', 'color');
    field('fog-color', 'color');
    field('sky-horizon-blend', 'range');
    field('horizon-fog-blend', 'range');
    field('fog-ground-blend', 'range');
    enableOnLoad(map, panel);
    show();
  }

  return () => {
    clearInterval(timer);
    off.forEach((f) => f());
    map.remove();
    dem.release();
  };
};

export default mount;
