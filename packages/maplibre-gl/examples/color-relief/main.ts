// A color-relief layer paints elevation through an interpolate ramp
import { Map } from 'maplibre-gl';
import type { ExpressionSpecification } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { DEM_CENTER, syntheticDem } from '../../shared/dem.ts';

const ramp = (stops: Array<[number, string]>): ExpressionSpecification => [
  'interpolate',
  ['linear'],
  ['elevation'],
  ...stops.flat(),
] as ExpressionSpecification;

const RAMPS: Record<string, ExpressionSpecification> = {
  Terrain: ramp([[200, '#3f7d4e'], [600, '#9bb35c'], [1200, '#d9c07a'], [1800, '#a8805a'], [2400, '#e8e4dc'], [3000, '#ffffff']]),
  Heat: ramp([[200, '#0d0887'], [900, '#7e03a8'], [1500, '#cc4778'], [2100, '#f89540'], [3000, '#f0f921']]),
  Bands: [
    'step',
    ['elevation'],
    '#2b6a4f',
    500, '#5e9a54',
    1000, '#b5b866',
    1500, '#c99a5b',
    2000, '#8c6b5a',
    2500, '#f2f2f2',
  ] as ExpressionSpecification,
};

const mount: Mount = (el, { preview }) => {
  const dem = syntheticDem();
  const map = new Map({
    container: mapContainer(el, preview),
    style: {
      version: 8,
      sources: { dem: dem.source },
      layers: [
        { id: 'relief', type: 'color-relief', source: 'dem', paint: { 'color-relief-color': RAMPS.Terrain! } },
        {
          id: 'hills',
          type: 'hillshade',
          source: 'dem',
          paint: { 'hillshade-exaggeration': 0.45, 'hillshade-shadow-color': '#10151f' },
        },
      ],
    },
    center: DEM_CENTER,
    zoom: preview ? 8.5 : 9,
    interactive: !preview,
  });

  let timer = 0;
  if (preview) {
    // Cycle the ramps so the card changes colour on its own.
    const names = Object.keys(RAMPS);
    let i = 0;
    map.once('load', () => {
      timer = window.setInterval(() => {
        i = (i + 1) % names.length;
        map.setPaintProperty('relief', 'color-relief-color', RAMPS[names[i] ?? 'Terrain']);
      }, 2500);
    });
  } else {
    const bar = controlBar(el);
    const info = readout(el, 'ramp: Terrain, hillshade on');
    let ramps = 'Terrain';
    let shade = true;
    const show = (): void => {
      info.textContent = `ramp: ${ramps}, hillshade ${shade ? 'on' : 'off'}`;
    };
    for (const name of Object.keys(RAMPS)) {
      button(bar, name, () => {
        ramps = name;
        map.setPaintProperty('relief', 'color-relief-color', RAMPS[name]);
        show();
      });
    }
    button(bar, 'Toggle hillshade', () => {
      shade = !shade;
      map.setLayoutProperty('hills', 'visibility', shade ? 'visible' : 'none');
      show();
    });
    let opaque = true;
    const opacityBtn = button(bar, 'Relief opacity 100%', () => {
      opaque = !opaque;
      map.setPaintProperty('relief', 'color-relief-opacity', opaque ? 1 : 0.5);
      opacityBtn.textContent = `Relief opacity ${opaque ? 100 : 50}%`;
    });
  }

  return () => {
    clearInterval(timer);
    map.remove();
    dem.release();
  };
};

export default mount;
