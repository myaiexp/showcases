// getGlobeRadius: the globe's size in scene units, for sizing objects of your own
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { Mesh, MeshBasicMaterial, RingGeometry, DoubleSide } from 'three';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Rings at 1.5, 2 and 2.5 globe radii, sized from getGlobeRadius().' });
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container)).globeImageUrl(day);
  globe.pointOfView({ lat: 35, lng: 0, altitude: 5 });
  globe.controls().autoRotate = true;

  const R = globe.getGlobeRadius();
  const rings = [1.5, 2, 2.5].map((k, i) => {
    const ring = new Mesh(
      new RingGeometry(R * k - R * 0.03, R * k, 128),
      new MeshBasicMaterial({ color: ['#ffd166', '#06d6a0', '#118ab2'][i], side: DoubleSide, transparent: true, opacity: 0.8 }),
    );
    ring.rotation.x = Math.PI / 2;
    globe.scene().add(ring);
    return ring;
  });
  stage.onDispose(() => {
    for (const r of rings) {
      globe.scene().remove(r);
      r.geometry.dispose();
      r.material.dispose();
    }
  });

  if (stage.bar) readout(stage.box, `globe.getGlobeRadius() = ${R}`);

  return stage.dispose;
};

export default mount;
