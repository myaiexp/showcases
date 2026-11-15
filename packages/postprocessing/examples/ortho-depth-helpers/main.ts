// viewZToOrthographicDepth and orthographicDepthToViewZ: depth is linear in view distance
import { Mesh, MeshBasicMaterial, OrthographicCamera, SphereGeometry } from 'three';
import { DepthEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import { orthographicDepthToViewZ, viewZToOrthographicDepth } from './depth.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, readout, slider } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';

const NEAR = 1;
const FAR = 30;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { orbit: false, near: NEAR, far: FAR });
  const subject = corridor(stage.scene);

  const camera = new OrthographicCamera(-4, 4, 2.5, -2.5, NEAR, FAR);
  camera.position.set(0, 1.4, 6);
  camera.lookAt(0, 1.4, -10);

  // A marker sphere placed at a chosen distance in front of the camera.
  const marker = new Mesh(new SphereGeometry(0.7, 32, 16), new MeshBasicMaterial({ color: 0xffd23d }));
  stage.scene.add(marker);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, camera));
  // Orthographic depth is linear between near and far: the grey level is the helper's result.
  composer.addPass(new EffectPass(camera, new DepthEffect()));

  const label = stage.bar ? readout(stage.box) : overlay(stage.box);
  const place = (distance: number): void => {
    marker.position.set(0, 1.4, 6 - distance);
    const viewZ = -distance;
    const depth = viewZToOrthographicDepth(viewZ, NEAR, FAR);
    const back = orthographicDepthToViewZ(depth, NEAR, FAR);
    label.textContent = `distance ${distance.toFixed(1)}: viewZ ${viewZ.toFixed(1)}\nviewZToOrthographicDepth -> ${depth.toFixed(3)}  (the sphere's grey level)\northographicDepthToViewZ  -> ${back.toFixed(1)}`;
  };
  place(12);
  if (stage.bar) slider(stage.bar, 'distance from camera', NEAR, FAR, 0.5, 12, place);

  stage.run((dt, t) => {
    subject.update(t);
    if (stage.preview) place(NEAR + (FAR - NEAR) * (0.5 + 0.45 * Math.sin(t * 0.7)));
    camera.right = 2.5 * stage.camera.aspect;
    camera.left = -camera.right;
    camera.updateProjectionMatrix();
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
