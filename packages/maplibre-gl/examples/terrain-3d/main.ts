// 3D terrain from a raster-dem source with hillshading, orbiting in previews
import { Map, NavigationControl, TerrainControl } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer } from '../../shared/setup.ts';
import { palette } from '../../shared/basemap.ts';
import { DEM_CENTER, syntheticDem } from '../../shared/dem.ts';

const mount: Mount = (el, { preview }) => {
  const dem = syntheticDem();

  const map = new Map({
    container: mapContainer(el, preview),
    style: {
      version: 8,
      sources: {
        // One raster-dem source can feed both the 3D mesh and a hillshade layer.
        terrainSource: dem.source,
        hillshadeSource: dem.source,
      },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': palette.land } },
        {
          id: 'hills',
          type: 'hillshade',
          source: 'hillshadeSource',
          paint: { 'hillshade-shadow-color': '#05080d', 'hillshade-highlight-color': '#8aa4c2' },
        },
      ],
      terrain: { source: 'terrainSource', exaggeration: 1.4 },
      sky: { 'sky-color': '#1b2b44', 'horizon-color': '#3a4f6e', 'fog-color': palette.land },
    },
    center: DEM_CENTER,
    zoom: preview ? 8.6 : 9,
    pitch: 70,
    bearing: -20,
    maxPitch: 85,
    interactive: !preview,
  });

  if (!preview) {
    map.addControl(new NavigationControl({ visualizePitch: true, showZoom: true, showCompass: true }));
    map.addControl(new TerrainControl({ source: 'terrainSource', exaggeration: 1.4 }));
  }

  let frame = 0;
  if (preview) {
    const orbit = (): void => {
      map.setBearing(map.getBearing() + 0.15);
      frame = requestAnimationFrame(orbit);
    };
    map.once('load', orbit);
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
    dem.release();
  };
};

export default mount;
