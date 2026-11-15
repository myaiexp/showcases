// Polygons: polygonCapMaterial gives each country its own three.js material
import Globe from 'globe.gl';
import { Color, MeshPhongMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One MeshPhongMaterial per country: shiny, with its own emissive glow. Long names are glossier.' });
  const dark = await texture('dark');

  // One material per polygon, made once and disposed on cleanup.
  const materials = new Map<Country, MeshPhongMaterial>();
  for (const c of countries) {
    const hue = (c.properties.index * 37) % 360;
    const color = new Color().setHSL(hue / 360, 0.65, 0.5);
    materials.set(
      c,
      new MeshPhongMaterial({
        color,
        emissive: color.clone().multiplyScalar(0.25),
        shininess: c.properties.name.length > 9 ? 120 : 15,
        specular: new Color('#ffffff'),
      }),
    );
  }
  stage.onDispose(() => materials.forEach((m) => m.dispose()));

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .polygonsData(countries)
    .polygonAltitude(0.03)
    .polygonCapMaterial((d) => materials.get(d as Country)!)
    // polygonCapColor is ignored while a cap material is set.
    .polygonCapColor(() => '#ff0000')
    .polygonSideColor(() => '#202a36');

  globe.pointOfView({ lat: 15, lng: 20, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.9;

  if (stage.bar) {
    checkbox(stage.bar, 'Use cap materials', true, (on) => {
      // A falsy material falls back to polygonCapColor (red here).
      globe.polygonCapMaterial((d) => (on ? materials.get(d as Country) : undefined) as MeshPhongMaterial);
    });
  }
  return stage.dispose;
};

export default mount;
