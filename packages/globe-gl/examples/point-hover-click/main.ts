// Points: onPointHover lights the column under the pointer, onPointClick flies in
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a column to light it, click it to fly there.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Hover or click a city');

  let hovered: City | null = null;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .pointsData(cities)
    .pointAltitude((d) => ((d as City) === hovered ? 0.35 : 0.08))
    .pointRadius(0.6)
    .pointColor((d) => ((d as City) === hovered ? '#ff5d73' : '#ffd166'))
    .pointsTransitionDuration(300)
    .onPointHover((point) => {
      hovered = point as City | null;
      // Accessors are read again only when set, so set them again to repaint.
      globe.pointAltitude(globe.pointAltitude()).pointColor(globe.pointColor());
      if (log) log.textContent = hovered ? `Hovering ${hovered.name}` : 'Hover or click a city';
    })
    .onPointClick((point, _event, { lat, lng, altitude }) => {
      const c = point as City;
      globe.pointOfView({ lat: c.lat, lng: c.lng, altitude: 1.6 }, 1000);
      if (log) log.textContent = `Clicked ${c.name} at ${lat.toFixed(1)}, ${lng.toFixed(1)}, altitude ${altitude.toFixed(2)}`;
    });
  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.3 });

  // Cards have no pointer: a fake one visits a city every two seconds and clicks it.
  if (stage.preview) {
    const ghost = stage.ghost(globe);
    const tour = ['London', 'Cairo', 'Lagos', 'Istanbul', 'Moscow', 'Paris', 'Nairobi'].map(
      (n) => cities.find((c) => c.name === n)!,
    );
    let i = 0;
    stage.every(2000, () => {
      const c = tour[i++ % tour.length]!;
      globe.pointOfView({ lat: c.lat - 10, lng: c.lng, altitude: 2.3 }, 600);
      stage.after(700, () => ghost.at(c.lat, c.lng, 0.08));
      stage.after(1300, () => ghost.click());
    });
  }

  return stage.dispose;
};

export default mount;
