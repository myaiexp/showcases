// Hexed Polygons: onHexPolygonHover lights a country, onHexPolygonClick flies in
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { country, countries, type Country } from '../../shared/world.ts';

// A band across Africa and Europe keeps every re-tiling quick.
const region = countries.filter((c) => c.properties.center[1] > -20 && c.properties.center[1] < 50 && c.properties.center[0] > -36 && c.properties.center[0] < 60);
const tour = ['Egypt', 'Algeria', 'Ethiopia', 'Turkey', 'Nigeria'].map(country);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a country to light and raise its hexagons; click to fly there.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Hover or click a country');

  let hovered: Country | null = null;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexPolygonsData(region)
    .hexPolygonResolution(2)
    .hexPolygonMargin(0.2)
    .hexPolygonAltitude((d) => ((d as Country) === hovered ? 0.05 : 0.004))
    .hexPolygonColor((d) => ((d as Country) === hovered ? '#ff5d73' : '#4aa3d8'))
    .hexPolygonsTransitionDuration(250)
    .hexPolygonLabel((d) => (d as Country).properties.name)
    .onHexPolygonHover((polygon) => {
      hovered = polygon as Country | null;
      globe.hexPolygonAltitude(globe.hexPolygonAltitude()).hexPolygonColor(globe.hexPolygonColor());
      if (log) log.textContent = hovered ? `Hovering ${hovered.properties.name}` : 'Hover or click a country';
    })
    .onHexPolygonClick((polygon, _event, { lat, lng }) => {
      const c = polygon as Country;
      globe.pointOfView({ lat: c.properties.center[0], lng: c.properties.center[1], altitude: 1.4 }, 1000);
      if (log) log.textContent = `Clicked ${c.properties.name} at ${lat.toFixed(1)}, ${lng.toFixed(1)}`;
    });
  globe.pointOfView({ lat: 10, lng: 20, altitude: 2.2 });

  if (stage.preview) {
    const ghost = stage.ghost(globe);
    let i = 0;
    stage.every(2800, () => {
      const [lat, lng] = tour[i++ % tour.length]!.properties.center;
      globe.pointOfView({ lat: lat - 8, lng, altitude: 2.3 }, 600);
      stage.after(900, () => ghost.at(lat, lng, 0.004));
      stage.after(2100, () => ghost.leave());
    });
  }
  return stage.dispose;
};

export default mount;
