// Default Markers at the shared cities: colour, scale, rotation and anchor options
import { Map, Marker } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, controlBar, button, readout } from '../../shared/setup.ts';
import { worldStyle, cities, palette } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [20, 35],
    zoom: preview ? 0.6 : 1.4,
    interactive: !preview,
  });

  // The default marker is a droplet SVG; options restyle it.
  new Marker({ color: palette.red }).setLngLat(cities.london).addTo(map);
  new Marker({ color: palette.purple, scale: 1.6 }).setLngLat(cities.cairo).addTo(map);
  new Marker({ color: '#f59e0b', scale: 0.7 }).setLngLat(cities.mumbai).addTo(map);
  // anchor: which part of the marker sits on the coordinate; 'center' puts the middle of the pin there.
  new Marker({ anchor: 'center', color: '#22c55e' }).setLngLat(cities.capeTown).addTo(map);
  // rotation turns the marker around its anchor, in degrees.
  const spinner = new Marker({ color: '#38bdf8', rotation: 45, rotationAlignment: 'map' })
    .setLngLat(cities.tokyo)
    .addTo(map);
  const walker = new Marker({ color: palette.text }).setLngLat(cities.helsinki).addTo(map);

  let frame = 0;
  let timer = 0;
  if (preview) {
    let t = 0;
    const tick = (): void => {
      t += 1;
      spinner.setRotation((t * 2) % 360);
      walker.setLngLat([cities.helsinki[0] + 10 * Math.sin(t / 60), cities.helsinki[1] + 4 * Math.cos(t / 60)]);
      map.setCenter([20 + 8 * Math.sin(t / 200), 35]);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  } else {
    const info = readout(el, 'Marker at Helsinki: setLngLat; marker at Tokyo: setRotation');
    const bar = controlBar(el);
    const stops: [number, number][] = [cities.helsinki, cities.reykjavik, cities.singapore];
    let stop = 0;
    button(bar, 'Move white marker (setLngLat)', () => {
      stop = (stop + 1) % stops.length;
      walker.setLngLat(stops[stop] ?? cities.helsinki);
      info.textContent = `getLngLat(): ${walker.getLngLat().toString()}`;
    });
    button(bar, 'Rotate blue marker +30 (setRotation)', () => {
      spinner.setRotation(spinner.getRotation() + 30);
      info.textContent = `getRotation(): ${spinner.getRotation()} degrees`;
    });
  }

  return () => {
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    map.remove();
  };
};

export default mount;
