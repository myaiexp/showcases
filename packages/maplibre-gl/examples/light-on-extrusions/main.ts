// The style light (anchor, position, colour, intensity) on extruded blocks
import { Map } from 'maplibre-gl';
import type { LightSpecification } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { slider } from '../../shared/controls.ts';
import { palette } from '../../shared/basemap.ts';
import { BLOCKS_CENTER, blocks } from './blocks.ts';

const mount: Mount = (el, { preview }) => {
  const light = { anchor: 'map' as 'map' | 'viewport', azimuth: 210, polar: 40, radius: 1.5, intensity: 0.7, color: '#ffffff' };
  const spec = (): LightSpecification => ({
    anchor: light.anchor,
    position: [light.radius, light.azimuth, light.polar],
    color: light.color,
    intensity: light.intensity,
  });

  const map = new Map({
    container: mapContainer(el, preview),
    style: {
      version: 8,
      sources: { blocks: { type: 'geojson', data: blocks() } },
      light: spec(),
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': palette.land } },
        {
          id: 'blocks',
          type: 'fill-extrusion',
          source: 'blocks',
          paint: {
            'fill-extrusion-color': '#d8dde6',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 1,
          },
        },
      ],
    },
    center: BLOCKS_CENTER,
    zoom: preview ? 15.2 : 16,
    pitch: 55,
    bearing: -15,
    interactive: !preview,
  });

  let timer = 0;
  const off: Array<() => void> = [];

  if (preview) {
    // Walk the light around the blocks.
    map.once('load', () => {
      timer = window.setInterval(() => {
        light.azimuth = (light.azimuth + 6) % 360;
        map.setLight(spec());
      }, 100);
    });
  } else {
    const bar = controlBar(el);
    const info = readout(el, '');
    const show = (): void => {
      info.textContent = `light: anchor ${light.anchor}, position [${light.radius}, ${light.azimuth}, ${light.polar}], intensity ${light.intensity}`;
    };
    const push = (): void => {
      map.setLight(spec());
      show();
    };
    slider(bar, 'azimuth', 0, 359, 1, light.azimuth, (v) => {
      light.azimuth = v;
      push();
    });
    slider(bar, 'polar', 0, 180, 1, light.polar, (v) => {
      light.polar = v;
      push();
    });
    slider(bar, 'radius', 0.5, 3, 0.05, light.radius, (v) => {
      light.radius = v;
      push();
    });
    slider(bar, 'intensity', 0, 1, 0.05, light.intensity, (v) => {
      light.intensity = v;
      push();
    });
    const colour = document.createElement('input');
    colour.type = 'color';
    colour.value = light.color;
    const onColour = (): void => {
      light.color = colour.value;
      push();
    };
    colour.addEventListener('input', onColour);
    off.push(() => colour.removeEventListener('input', onColour));
    bar.append(colour);
    const anchorBtn = button(bar, 'Anchor: map', () => {
      light.anchor = light.anchor === 'map' ? 'viewport' : 'map';
      anchorBtn.textContent = `Anchor: ${light.anchor}`;
      push();
    });
    button(bar, 'Rotate map 45°', () => map.rotateTo(map.getBearing() + 45, { duration: 600 }));
    show();
  }

  return () => {
    clearInterval(timer);
    off.forEach((f) => f());
    map.remove();
  };
};

export default mount;
