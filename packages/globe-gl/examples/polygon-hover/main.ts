// Polygons: onPolygonHover raises the hovered country, polygonLabel names it
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { country, countries, type Country } from '../../shared/world.ts';

const tour = ['Brazil', 'Egypt', 'India', 'Australia', 'Kazakhstan', 'Algeria', 'Argentina'].map(country);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a country: it rises and turns red, and a tooltip reads its name and area.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Hover a country');

  let hovered: Country | null = null;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .polygonsData(countries)
    .polygonAltitude((d) => ((d as Country) === hovered ? 0.12 : 0.01))
    .polygonCapColor((d) => ((d as Country) === hovered ? '#ff5d73' : '#2f6f9f'))
    .polygonSideColor(() => 'rgba(120, 180, 220, 0.4)')
    .polygonStrokeColor(() => '#0b1622')
    .polygonsTransitionDuration(300)
    // HTML string tooltip, read from the datum.
    .polygonLabel((d) => {
      const { name, area } = (d as Country).properties;
      return `<b>${name}</b><br>${Math.round(area).toLocaleString('en')} thousand km²`;
    })
    .onPolygonHover((polygon) => {
      hovered = polygon as Country | null;
      globe.polygonAltitude(globe.polygonAltitude()).polygonCapColor(globe.polygonCapColor());
      if (log) log.textContent = hovered ? `Hovering ${hovered.properties.name}` : 'Hover a country';
    });
  globe.pointOfView({ lat: 15, lng: 20, altitude: 2.2 });

  // Cards have no pointer: a fake one visits a country every two seconds.
  if (stage.preview) {
    const ghost = stage.ghost(globe);
    let i = 0;
    stage.every(2200, () => {
      const [lat, lng] = tour[i++ % tour.length]!.properties.center;
      globe.pointOfView({ lat: lat - 8, lng, altitude: 2.3 }, 600);
      stage.after(800, () => ghost.at(lat, lng, 0.01));
      stage.after(2000, () => ghost.leave());
    });
  }
  return stage.dispose;
};

export default mount;
