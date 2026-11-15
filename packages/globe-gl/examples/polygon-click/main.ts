// Polygons: onPolygonClick flies to a country, onPolygonRightClick zooms out
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { country, countries, type Country } from '../../shared/world.ts';

const tour = ['Brazil', 'Egypt', 'India', 'Australia', 'Algeria'].map(country);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a country to fly to it; right-click anywhere on land to zoom out.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Click a country');

  let selected: Country | null = null;
  const repaint = (): void => {
    globe.polygonAltitude(globe.polygonAltitude()).polygonCapColor(globe.polygonCapColor());
  };
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .polygonsData(countries)
    .polygonAltitude((d) => ((d as Country) === selected ? 0.06 : 0.01))
    .polygonCapColor((d) => ((d as Country) === selected ? '#ffd166' : '#2f6f9f'))
    .polygonSideColor(() => 'rgba(255, 209, 102, 0.5)')
    .polygonStrokeColor(() => '#0b1622')
    .polygonsTransitionDuration(400)
    .polygonLabel((d) => (d as Country).properties.name)
    .onPolygonClick((polygon, _event, { lat, lng }) => {
      selected = polygon as Country;
      const [clat, clng] = selected.properties.center;
      globe.pointOfView({ lat: clat, lng: clng, altitude: 1.3 }, 1200);
      repaint();
      if (log) log.textContent = `${selected.properties.name} (clicked at ${lat.toFixed(1)}, ${lng.toFixed(1)})`;
    })
    .onPolygonRightClick(() => {
      selected = null;
      globe.pointOfView({ altitude: 2.4 }, 1000);
      repaint();
      if (log) log.textContent = 'Zoomed out';
    });
  globe.pointOfView({ lat: 10, lng: 20, altitude: 2.4 });

  if (stage.preview) {
    const ghost = stage.ghost(globe);
    let i = 0;
    stage.every(3600, () => {
      const [lat, lng] = tour[i++ % tour.length]!.properties.center;
      globe.pointOfView({ lat: lat - 5, lng, altitude: 2.4 }, 600);
      stage.after(800, () => ghost.at(lat, lng, 0.01));
      stage.after(1400, () => ghost.click());
      stage.after(3000, () => ghost.click(2));
    });
  }
  return stage.dispose;
};

export default mount;
