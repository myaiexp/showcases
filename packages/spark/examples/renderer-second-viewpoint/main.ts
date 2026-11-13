// A second SparkRenderer with a target renders another camera into a texture
import * as THREE from 'three';
import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, select, overlay } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

type View = 'top down' | 'behind';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.4, 3.4], orbit: 0.2 });
  const knot = new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, ctx.preview ? 12000 : 24000) });
  stage.scene.add(knot);

  // The second viewpoint is its own SparkRenderer: it is not added to the scene, but renders
  // the scene through the SparkRenderer that is. `target` makes it draw into a texture.
  const size = ctx.preview ? 128 : 320;
  const second = new SparkRenderer({ renderer: stage.renderer, target: { width: size, height: size } });
  const secondCamera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);

  // The texture is shown on a plane stuck to the main camera, as a picture-in-picture.
  const inset = new THREE.Mesh(
    new THREE.PlaneGeometry(0.6, 0.6),
    new THREE.MeshBasicMaterial({ map: second.target!.texture, toneMapped: false }),
  );
  // A slightly larger pale plane behind it makes a frame.
  const frame = new THREE.Mesh(new THREE.PlaneGeometry(0.64, 0.64), new THREE.MeshBasicMaterial({ color: 0x8a93a6 }));
  frame.position.z = -0.001;
  inset.add(frame);
  stage.camera.add(inset);
  stage.scene.add(stage.camera);
  const label = overlay(el, 'main camera');

  let view: View = 'top down';
  if (!ctx.preview) {
    select(controlBar(el), 'inset camera', ['top down', 'behind'] as const, (v) => (view = v));
  }

  stage.run((time) => {
    // Keep the inset in the bottom-right corner whatever the canvas shape.
    const halfH = Math.tan(THREE.MathUtils.degToRad(stage.camera.fov / 2)) * 1.3;
    inset.position.set(halfH * stage.camera.aspect - 0.4, -halfH + 0.4, -1.3);
    const a = time * 0.5;
    if (view === 'top down') secondCamera.position.set(Math.cos(a) * 0.5, 2.8, Math.sin(a) * 0.5);
    else secondCamera.position.set(-Math.cos(a) * 2.4, 0.3, -Math.sin(a) * 2.4);
    secondCamera.lookAt(0, 0, 0);
    // Hide the inset while it is being filled, or the plane would be drawn into its own texture.
    inset.visible = false;
    second.renderTarget({ scene: stage.scene, camera: secondCamera });
    inset.visible = true;
  });
  return () => {
    second.dispose();
    stage.dispose();
  };
};

export default mount;
