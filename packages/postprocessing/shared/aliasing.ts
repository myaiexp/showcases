// Antialiasing subject: hairline wires, thin slats and a grid that show jaggies
import * as THREE from 'three';
import { EffectPass, TextureEffect, type EffectComposer, type SMAAEffect } from 'postprocessing';
import type { SampleScene } from './scenes.ts';
import type { StageOptions } from './stage.ts';

/**
 * Stage options for antialiasing examples. Call `stage.renderer.setPixelRatio(1)` right after
 * createStage (before the composer is created): a 1:1 pixel ratio makes jaggies easy to see.
 */
export const AA_STAGE: StageOptions = {
  position: [0, 2.4, 5.2],
  target: [0, 1.2, 0],
  background: 0x05070c,
  orbit: 0.25,
};

/**
 * A wire icosahedron around a solid orange octahedron, a ring of thin slats and a fine grid:
 * unlit colours with hard contrast, so every edge is a staircase without antialiasing.
 */
export function wireCage(scene: THREE.Scene): SampleScene {
  const group = new THREE.Group();
  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.5, 1)),
    new THREE.LineBasicMaterial({ color: 0xffffff }),
  );
  wire.position.y = 1.7;
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.8), new THREE.MeshBasicMaterial({ color: 0xff7a1a }));
  core.position.y = 1.7;
  const grid = new THREE.GridHelper(24, 48, 0x9fb4ff, 0x9fb4ff);
  const slatMat = new THREE.MeshBasicMaterial({ color: 0xe8ecf2 });
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.03, 2.6, 0.03), slatMat);
    slat.position.set(Math.cos(a) * 3.2, 1.3, Math.sin(a) * 3.2);
    group.add(slat);
  }
  group.add(wire, core, grid);
  scene.add(group);
  return {
    group,
    update(t) {
      wire.rotation.set(t * 0.2, t * 0.35, 0);
      core.rotation.set(-t * 0.3, t * 0.5, 0);
    },
  };
}

export type SmaaView = 'result' | 'edges' | 'weights';

/**
 * Appends an EffectPass that replaces the frame with the SMAA effect's edges or weights texture.
 * The SMAA pass keeps running before it, so the textures are fresh. Because addPass gives
 * renderToScreen only to the last pass, switching the view back flips it by hand.
 */
export function addSmaaView(composer: EffectComposer, camera: THREE.Camera, smaaPass: EffectPass, smaa: SMAAEffect): (view: SmaaView) => void {
  const texture = new TextureEffect({ texture: smaa.edgesTexture });
  const viewPass = new EffectPass(camera, texture);
  composer.addPass(viewPass);
  return (view) => {
    if (view !== 'result') texture.texture = view === 'edges' ? smaa.edgesTexture : smaa.weightsTexture;
    viewPass.enabled = view !== 'result';
    viewPass.renderToScreen = view !== 'result';
    smaaPass.renderToScreen = view === 'result';
  };
}
