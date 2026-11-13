// map.setTerrain at runtime with an exaggeration slider and an elevation readout
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { palette } from '../../shared/basemap.ts';
import { slider } from '../../shared/controls.ts';
import { DEM_CENTER, syntheticDem } from '../../shared/dem.ts';

const mount: Mount = (el, { preview }) => {
  const dem = syntheticDem();
  const map = new Map({
    container: mapContainer(el, preview),
    style: {
      version: 8,
      sources: { dem: dem.source },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': palette.land } },
        { id: 'hills', type: 'hillshade', source: 'dem', paint: { 'hillshade-shadow-color': '#0a0f18' } },
      ],
      sky: { 'sky-color': '#1b2b44', 'horizon-color': '#3a4f6e', 'fog-color': palette.land },
    },
    center: DEM_CENTER,
    zoom: preview ? 8.4 : 9,
    pitch: 70,
    bearing: 25,
    maxPitch: 85,
    interactive: !preview,
  });

  let timer = 0;

  if (preview) {
    // The exaggeration breathes between 0.5 and 3.
    map.once('load', () => {
      // Terrain changes re-render the mesh from DEM tiles built on the main thread, so keep it gentle.
      timer = window.setInterval(() => {
        map.setTerrain({ source: 'dem', exaggeration: 1.75 + 1.25 * Math.sin(performance.now() / 1500) });
      }, 500);
    });
  } else {
    const bar = controlBar(el);
    let exaggeration = 1.5;
    let loaded = false;
    const info = readout(el, 'loading terrain');

    const update = (): void => {
      // Null until terrain is enabled; the value includes the exaggeration.
      const metres = map.queryTerrainElevation(map.getCenter());
      info.textContent =
        metres === null
          ? 'terrain is not enabled'
          : `exaggeration ${exaggeration.toFixed(1)}, elevation at centre ${metres.toFixed(0)} m`;
    };
    const apply = (): void => {
      if (!loaded) return;
      map.setTerrain({ source: 'dem', exaggeration });
      update();
    };
    slider(bar, 'exaggeration', 0, 4, 0.1, exaggeration, (v) => {
      exaggeration = v;
      apply();
    });
    map.on('load', () => {
      loaded = true;
      apply();
    });
    map.on('idle', update);
    map.on('moveend', update);
  }

  return () => {
    clearInterval(timer);
    map.remove();
    dem.release();
  };
};

export default mount;
