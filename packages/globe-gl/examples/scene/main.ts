// scene(): add your own Three.js objects beside the globe, here an orbiting moon
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { Mesh, MeshLambertMaterial, SphereGeometry, TorusGeometry, MeshBasicMaterial } from 'three';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The moon and its orbit ring are plain Three.js meshes added to globe.scene().' });
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container)).globeImageUrl(day);
  globe.pointOfView({ lat: 25, lng: 0, altitude: 4.5 });

  const R = globe.getGlobeRadius();
  const orbit = R * 3;
  const moon = new Mesh(new SphereGeometry(R * 0.27, 32, 16), new MeshLambertMaterial({ color: '#c9c9c9' }));
  const ring = new Mesh(new TorusGeometry(orbit, R * 0.005, 6, 180), new MeshBasicMaterial({ color: '#506080' }));
  ring.rotation.x = Math.PI / 2;
  globe.scene().add(moon, ring);
  stage.onDispose(() => {
    globe.scene().remove(moon, ring);
    for (const m of [moon, ring]) {
      m.geometry.dispose();
      m.material.dispose();
    }
  });

  stage.loop((_dt, t) => {
    moon.position.set(Math.cos(t * 0.5) * orbit, 0, Math.sin(t * 0.5) * orbit);
  });

  return stage.dispose;
};

export default mount;
