// onPointRightClick: right-click removes a column, left-click makes it taller
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { cities, city, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Bar extends City {
  height: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left-click a column to grow it, right-click to remove it.' });
  const day = await texture('day');
  const log = stage.bar && readout(stage.box, 'Click or right-click a column');

  const fresh = (): Bar[] => cities.map((c) => ({ ...c, height: 0.08 }));
  let bars = fresh();
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(day)
    .pointsData(bars)
    .pointRadius(0.8)
    .pointAltitude('height')
    .pointColor(() => '#ffb703')
    .onPointClick((p) => {
      (p as Bar).height += 0.08;
      globe.pointsData([...bars]);
      if (log) log.textContent = `onPointClick: ${(p as Bar).name} grows`;
    })
    .onPointRightClick((p, _event, { lat, lng }) => {
      bars = bars.filter((b) => b !== p);
      globe.pointsData(bars);
      if (log) log.textContent = `onPointRightClick: ${(p as Bar).name} removed (at ${lat.toFixed(1)}, ${lng.toFixed(1)})`;
    });
  globe.pointOfView({ lat: 45, lng: 10, altitude: 2.2 });

  if (stage.bar) button(stage.bar, 'Reset', () => globe.pointsData((bars = fresh())));
  else {
    // The fake pointer right-clicks a European city at a time, then resets the set.
    const ghost = stage.ghost(globe);
    const victims = ['London', 'Paris', 'Berlin', 'Madrid', 'Istanbul', 'Moscow'];
    let i = 0;
    stage.every(1300, () => {
      if (i === victims.length) {
        i = 0;
        globe.pointsData((bars = fresh()));
        return;
      }
      const c = city(victims[i++]!);
      ghost.at(c.lat, c.lng, 0.08);
      stage.after(250, () => ghost.click(2));
    });
  }

  return stage.dispose;
};

export default mount;
