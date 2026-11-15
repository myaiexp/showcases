// pointerEventsFilter: let the pointer pass through one layer to reach another
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { cities, city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { countries } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The countries sit on top. With the filter on, hovering goes through them to the cities.' });
  const log = readout(stage.preview ? stage.container : stage.box);
  if (stage.preview) log.style.cssText += ';position:absolute;left:6px;top:4px;z-index:2';

  // The filter gets the hovered Three.js object (tagged with its layer) and its data.
  const skipCountries = (obj: object): boolean => (obj as { __globeObjType?: string }).__globeObjType !== 'polygon';

  const globe = stage.own(new Globe(stage.container))
    .polygonsData(countries)
    .polygonAltitude(0.06)
    .polygonCapColor(() => 'rgba(80, 140, 220, 0.35)')
    .polygonSideColor(() => 'rgba(80, 140, 220, 0.15)')
    .polygonLabel((d) => `Country: ${(d as (typeof countries)[number]).properties.name}`)
    .pointsData(cities)
    .pointAltitude(0.03)
    .pointRadius(0.8)
    .pointColor(() => '#ffd166')
    .pointLabel((d) => `City: ${(d as { name: string }).name}`)
    .onPolygonHover((p) => p && (log.textContent = `hover → polygon`))
    .onPointHover((p) => p && (log.textContent = `hover → point`))
    .pointerEventsFilter(skipCountries);
  globe.pointOfView({ lat: 45, lng: 10, altitude: 1.6 });

  const set = (on: boolean): void => {
    globe.pointerEventsFilter(on ? skipCountries : () => true);
    log.textContent = on ? 'filter: skip polygons' : 'filter: () => true';
  };
  set(true);

  if (stage.bar) checkbox(stage.bar, 'Skip the polygons layer', true, set);
  else {
    const ghost = stage.ghost(globe);
    const paris = city('Paris');
    let on = true;
    stage.every(700, () => ghost.at(paris.lat, paris.lng, 0.03));
    stage.every(2200, () => set((on = !on)));
  }

  return stage.dispose;
};

export default mount;
