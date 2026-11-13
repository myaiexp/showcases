// A hillshade layer with light direction, anchor, method and colours to tune
import { Map } from 'maplibre-gl';
import type { HillshadeLayerSpecification } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { palette } from '../../shared/basemap.ts';
import { slider } from '../../shared/controls.ts';
import { DEM_CENTER, syntheticDem } from '../../shared/dem.ts';

type Method = 'standard' | 'basic' | 'combined' | 'igor' | 'multidirectional';
const METHODS: Method[] = ['standard', 'basic', 'combined', 'igor', 'multidirectional'];

const mount: Mount = (el, { preview }) => {
  const dem = syntheticDem();
  const map = new Map({
    container: mapContainer(el, preview),
    style: {
      version: 8,
      sources: { dem: dem.source },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': palette.land } },
        {
          id: 'hills',
          type: 'hillshade',
          source: 'dem',
          paint: {
            'hillshade-illumination-direction': 335,
            'hillshade-illumination-anchor': 'map',
            'hillshade-exaggeration': 0.6,
            'hillshade-shadow-color': '#1a2433',
            'hillshade-highlight-color': '#f4efe0',
            'hillshade-accent-color': '#2b3a52',
          },
        },
      ],
    },
    center: DEM_CENTER,
    zoom: preview ? 8.5 : 9,
    interactive: !preview,
  });

  const paint = (name: keyof NonNullable<HillshadeLayerSpecification['paint']>, value: unknown): void => {
    if (map.getLayer('hills')) map.setPaintProperty('hills', name, value as never);
  };

  let frame = 0;
  let timer = 0;

  if (preview) {
    // Sweep the light direction around the compass.
    const start = performance.now();
    const sweep = (now: number): void => {
      const dir = (((now - start) / 40) % 360) | 0;
      paint('hillshade-illumination-direction', dir);
      frame = requestAnimationFrame(sweep);
    };
    map.once('load', () => {
      frame = requestAnimationFrame(sweep);
    });
  } else {
    const bar = controlBar(el);
    const info = readout(el, 'direction 335, altitude 45, standard');
    let direction = 335;
    let anchor: 'map' | 'viewport' = 'map';
    let method: Method = 'standard';
    let exaggeration = 0.6;
    const show = (): void => {
      info.textContent = `direction ${direction}, anchor ${anchor}, exaggeration ${exaggeration.toFixed(2)}, ${method}`;
    };
    slider(bar, 'direction', 0, 359, 1, direction, (v) => {
      direction = v;
      paint('hillshade-illumination-direction', v);
      show();
    });
    slider(bar, 'exaggeration', 0, 1, 0.05, exaggeration, (v) => {
      exaggeration = v;
      paint('hillshade-exaggeration', v);
      show();
    });
    const anchorBtn = button(bar, 'Anchor: map', () => {
      anchor = anchor === 'map' ? 'viewport' : 'map';
      paint('hillshade-illumination-anchor', anchor);
      anchorBtn.textContent = `Anchor: ${anchor}`;
      show();
    });
    const methodBtn = button(bar, 'Method: standard', () => {
      method = METHODS[(METHODS.indexOf(method) + 1) % METHODS.length] ?? 'standard';
      paint('hillshade-method', method);
      methodBtn.textContent = `Method: ${method}`;
      show();
    });
    const palettes: Array<[string, string, string]> = [
      ['#1a2433', '#f4efe0', '#2b3a52'],
      ['#3b1f2b', '#ffd9a0', '#5a1e1e'],
      ['#0b2a2f', '#c9fff2', '#06383a'],
    ];
    let p = 0;
    button(bar, 'Next colours', () => {
      p = (p + 1) % palettes.length;
      const [shadow, highlight, accent] = palettes[p] ?? palettes[0]!;
      paint('hillshade-shadow-color', shadow);
      paint('hillshade-highlight-color', highlight);
      paint('hillshade-accent-color', accent);
    });
    // Rotating the map shows what the anchor does.
    button(bar, 'Rotate 45°', () => map.rotateTo(map.getBearing() + 45, { duration: 600 }));
  }

  return () => {
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    map.remove();
    dem.release();
  };
};

export default mount;
