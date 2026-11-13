// A splat object and ordinary lit meshes in one scene, occluding each other through the Z buffer
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, controlBar } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.2, 3.4], target: [0, 0.2, 0] });
  const { scene } = stage;

  // Plain three.js: lights, a floor and two solid shapes with standard materials.
  scene.add(new THREE.HemisphereLight(0xdde8ff, 0x202018, 1.2));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(2, 3, 1);
  scene.add(sun);
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(2.2, 48),
    new THREE.MeshStandardMaterial({ color: 0x2a2f38, roughness: 0.9 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.75;
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.75, 0.06, 16, 96),
    new THREE.MeshStandardMaterial({ color: 0xd8dde6, metalness: 0.6, roughness: 0.3 }),
  );
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.35, 0.35),
    new THREE.MeshStandardMaterial({ color: 0xe0563b, roughness: 0.5 }),
  );
  scene.add(floor, ring, cube);

  // The splat object is just another Object3D in the same scene and the same render call.
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 20000 : 40000) });
  knot.position.y = 0.2;
  scene.add(knot);

  if (!ctx.preview) {
    const bar = controlBar(el);
    checkbox(bar, 'meshes', true, (on) => [floor, ring, cube].forEach((m) => (m.visible = on)));
    checkbox(bar, 'splats', true, (on) => (knot.visible = on));
  }

  stage.run((time) => {
    // The ring and cube pass through the knot: each hides the other where it is in front.
    ring.position.y = 0.2;
    ring.rotation.set(time * 0.7, time * 0.4, 0);
    cube.position.set(Math.cos(time) * 0.95, 0.2 + Math.sin(time * 1.3) * 0.25, Math.sin(time) * 0.95);
    cube.rotation.set(time, time * 1.2, 0);
    knot.rotation.y = time * 0.2;
  });
  return () => stage.dispose();
};

export default mount;
