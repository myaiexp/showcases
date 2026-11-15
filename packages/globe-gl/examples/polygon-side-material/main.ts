// Polygons: polygonSideMaterial makes the cone walls glassy, one shared material
import Globe from 'globe.gl';
import { Color, DoubleSide, MeshPhongMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The walls are one translucent material; opacity is a slider on that material.' });
  const dark = await texture('dark');

  // A material object (not a function) is applied to every polygon's sides.
  const glass = new MeshPhongMaterial({
    color: new Color('#6ee7ff'),
    emissive: new Color('#0a3550'),
    shininess: 90,
    transparent: true,
    opacity: 0.45,
    side: DoubleSide,
    depthWrite: false,
  });
  stage.onDispose(() => glass.dispose());

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .polygonsData(countries)
    .polygonAltitude((d) => 0.02 + Math.sqrt((d as Country).properties.area) * 0.0012)
    .polygonCapColor(() => '#d7f3ff')
    .polygonSideMaterial(glass);

  globe.pointOfView({ lat: 10, lng: 15, altitude: 2.1 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.9;

  if (stage.bar) {
    slider(stage.bar, 'Wall opacity', 0.05, 1, 0.05, glass.opacity, (v) => {
      glass.opacity = v;
    }, (v) => v.toFixed(2));
  }
  return stage.dispose;
};

export default mount;
