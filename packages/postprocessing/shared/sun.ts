// God rays examples: a sun behind pillars and a ring, built in code
import * as THREE from 'three';
import type { StageOptions } from './stage.ts';
import type { SampleScene } from './scenes.ts';

/** Stage options for the sun scene: the camera looks along -z at the pillars and the sun beyond them. */
export const SUN_STAGE: StageOptions = { position: [0, 2.2, 9], target: [0, 3, -6], orbit: false, background: 0x0b1228, far: 80 };

export interface SunScene extends SampleScene {
  /** The light source mesh GodRaysEffect wants. */
  sun: THREE.Mesh;
}

/**
 * A bright disc far behind a row of pillars, a leafy ring and a few boxes. `drift` is how far
 * the sun swings sideways (world units) as the scene animates.
 */
export function sunScene(scene: THREE.Scene, { drift = 2.5, y = 3.4 } = {}): SunScene {
  const group = new THREE.Group();
  group.add(new THREE.HemisphereLight(0x8aa0d8, 0x141018, 0.9));
  const key = new THREE.DirectionalLight(0xffd9a8, 1.5);
  key.position.set(0, 4, -12);
  group.add(key);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: 0x1a1c24, roughness: 0.95 }));
  ground.rotation.x = -Math.PI / 2;
  group.add(ground);

  const dark = new THREE.MeshStandardMaterial({ color: 0x262a36, roughness: 0.8 });
  for (let i = 0; i < 7; i++) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 6.5, 0.7), dark);
    pillar.position.set(-6 + i * 2, 3.25, -4);
    group.add(pillar);
  }
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.35, 16, 48), dark);
  ring.position.set(0, 3.4, -2);
  group.add(ring);
  for (const x of [-3.5, 3.2]) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.4), dark);
    box.position.set(x, 0.7, 1);
    group.add(box);
  }

  const sun = new THREE.Mesh(new THREE.SphereGeometry(1.4, 32, 16), new THREE.MeshBasicMaterial({ color: 0xfff1c9 }));
  sun.position.set(0, y, -14);
  group.add(sun);

  scene.add(group);
  return {
    group,
    sun,
    update(t) {
      sun.position.x = Math.sin(t * 0.5) * drift;
      ring.rotation.set(t * 0.3, t * 0.5, 0);
    },
  };
}
