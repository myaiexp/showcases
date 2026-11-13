// A canvas image placed by four corners; move the corners and swap the image
import { Map } from 'maplibre-gl';
import type { Coordinates, ImageSource } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';
import { PATTERNS, paintImage } from './paint.ts';

// Corners run clockwise from the top left: TL, TR, BR, BL.
const HOME: Coordinates = [
  [-10, 58],
  [30, 58],
  [30, 36],
  [-10, 36],
];
const CORNERS = ['top left', 'top right', 'bottom right', 'bottom left'];

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 47],
    zoom: preview ? 1.6 : 2.6,
    interactive: !preview,
  });
  const corners = HOME.map((c) => [...c]) as Coordinates;
  let pattern = 0;
  let source: ImageSource | undefined;
  let frame = 0;
  const info = preview ? null : readout(el, 'Pick a corner, then nudge it.');

  map.on('load', () => {
    // No url: the image is supplied with updateImage, so nothing is requested.
    map.addSource('picture', { type: 'image', coordinates: corners });
    map.addLayer({
      id: 'picture',
      type: 'raster',
      source: 'picture',
      paint: { 'raster-fade-duration': 0 }, // avoids a flash when the image is swapped
    });
    source = map.getSource<ImageSource>('picture') as ImageSource;
    source.updateImage({ image: paintImage(PATTERNS[pattern] ?? 'sunset') });

    if (preview) {
      const t0 = performance.now();
      const wobble = (now: number): void => {
        const t = (now - t0) / 900;
        source?.setCoordinates(
          HOME.map(([x = 0, y = 0], i) => [
            x + Math.sin(t + i * 1.7) * 5,
            y + Math.cos(t * 0.8 + i * 2.3) * 3,
          ]) as Coordinates,
        );
        frame = requestAnimationFrame(wobble);
      };
      frame = requestAnimationFrame(wobble);
    }
  });

  if (!preview) {
    const bar = controlBar(el);
    const select = document.createElement('select');
    CORNERS.forEach((name, i) => select.add(new Option(name, String(i))));
    bar.append(select);
    const nudge = (dx: number, dy: number): void => {
      const c = corners[Number(select.value)] as [number, number];
      c[0] += dx;
      c[1] += dy;
      source?.setCoordinates(corners);
      if (info) info.textContent = `${CORNERS[Number(select.value)]}: ${c[0].toFixed(1)}, ${c[1].toFixed(1)}`;
    };
    button(bar, 'Left', () => nudge(-2, 0));
    button(bar, 'Right', () => nudge(2, 0));
    button(bar, 'Up', () => nudge(0, 2));
    button(bar, 'Down', () => nudge(0, -2));
    button(bar, 'Swap image', () => {
      pattern = (pattern + 1) % PATTERNS.length;
      source?.updateImage({ image: paintImage(PATTERNS[pattern] ?? 'sunset') });
    });
    button(bar, 'Reset corners', () => {
      HOME.forEach(([x = 0, y = 0], i) => {
        corners[i] = [x, y];
      });
      source?.setCoordinates(corners);
    });
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
