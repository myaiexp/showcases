// getCoords: turn lat, lng and altitude into x, y, z for your own Three.js objects
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { ConeGeometry, Mesh, MeshLambertMaterial, Vector3 } from 'three';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each cone is a plain mesh in globe.scene(), placed with getCoords and aimed away from the centre.' });
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container)).globeImageUrl(day);
  globe.controls().autoRotate = true;

  const R = globe.getGlobeRadius();
  const geometry = new ConeGeometry(R * 0.012, R * 0.08, 8);
  // Point the cone's tip down (towards the surface) along its local y axis.
  geometry.rotateX(Math.PI);
  geometry.translate(0, R * 0.04, 0);
  const material = new MeshLambertMaterial({ color: '#ef476f' });
  const pins = cities.map((c) => {
    const pin = new Mesh(geometry, material);
    const { x, y, z } = globe.getCoords(c.lat, c.lng, 0);
    pin.position.set(x, y, z);
    // Turn the cone's y axis to the surface normal.
    pin.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), pin.position.clone().normalize());
    globe.scene().add(pin);
    return pin;
  });

  // Bob the pins up and down by re-reading getCoords at a changing altitude.
  stage.loop((_dt, t) => {
    cities.forEach((c, i) => {
      const { x, y, z } = globe.getCoords(c.lat, c.lng, 0.02 + 0.02 * Math.sin(t * 3 + i));
      pins[i]!.position.set(x, y, z);
    });
  });
  stage.onDispose(() => {
    globe.scene().remove(...pins);
    geometry.dispose();
    material.dispose();
  });

  return stage.dispose;
};

export default mount;
