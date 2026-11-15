// Objects: objectFacesSurface stands objects on the surface or in world axes
import Globe from 'globe.gl';
import { ConeGeometry, Mesh, MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['objectFacesSurface true', 'objectFacesSurface false'],
    hint: 'The same spikes on both globes. On the right they all keep pointing the same way in space instead of away from the globe.',
  });
  const dark = await texture('dark');

  const geometry = new ConeGeometry(2.6, 14, 12).rotateX(Math.PI / 2);
  const material = new MeshLambertMaterial({ color: '#ef476f' });
  stage.onDispose(() => {
    geometry.dispose();
    material.dispose();
  });

  const make = (pane: (typeof stage.panes)[number], faces: boolean) => {
    const globe = stage.own(new Globe(pane.container), pane)
      .globeImageUrl(dark)
      // Copies, because each globe tags the data objects it draws.
      .objectsData(cities.slice(0, stage.preview ? 24 : 40).map((c) => ({ ...c })))
      .objectLabel((d) => (d as City).name)
      .objectAltitude(0.03)
      .objectThreeObject(() => new Mesh(geometry, material))
      .objectFacesSurface(faces);
    globe.pointOfView({ lat: 20, lng: 20, altitude: 2.6 });
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.9;
    return globe;
  };
  make(stage.panes[0]!, true);
  make(stage.panes[1]!, false);

  return stage.dispose;
};

export default mount;
