// The world basemap on a globe with a sky atmosphere, spinning in previews
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: {
      ...worldStyle(),
      projection: { type: 'globe' },
      sky: {
        'sky-color': '#0b1a33',
        'horizon-color': '#58a6ff',
        'atmosphere-blend': 1,
      },
    },
    center: [10, 25],
    zoom: preview ? 0.9 : 1.6,
    interactive: !preview,
  });

  let frame = 0;
  let spinning = true;
  let last = 0;
  const spin = (now: number): void => {
    if (spinning && last) {
      const centre = map.getCenter();
      map.setCenter([centre.lng + (now - last) * 0.01, centre.lat]);
    }
    last = now;
    frame = requestAnimationFrame(spin);
  };
  map.once('load', () => {
    frame = requestAnimationFrame(spin);
  });

  if (!preview) {
    const bar = controlBar(el);
    const info = readout(el, 'projection: globe, atmosphere-blend 1');
    let blend = 1;
    let kind = 'globe';
    const show = (): void => {
      info.textContent = `projection: ${kind}, atmosphere-blend ${blend}`;
    };
    const spinBtn = button(bar, 'Pause spin', () => {
      spinning = !spinning;
      spinBtn.textContent = spinning ? 'Pause spin' : 'Resume spin';
    });
    const projBtn = button(bar, 'Switch to mercator', () => {
      kind = kind === 'globe' ? 'mercator' : 'globe';
      map.setProjection({ type: kind });
      projBtn.textContent = kind === 'globe' ? 'Switch to mercator' : 'Switch to globe';
      show();
    });
    button(bar, 'Toggle atmosphere', () => {
      blend = blend === 1 ? 0 : 1;
      map.setSky({ 'atmosphere-blend': blend });
      show();
    });
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
