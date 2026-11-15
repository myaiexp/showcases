// setMainScene and setMainCamera: point every pass at another scene or camera
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { neon, showroom } from '../../shared/scenes.ts';

const SCENES = ['showroom', 'neon'] as const;
const CAMERAS = ['orbit camera', 'high camera'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const showroomScene = showroom(stage.scene);
  const neonScene = new THREE.Scene();
  neonScene.background = new THREE.Color(0x05060a);
  const neonSubject = neon(neonScene);
  const highCamera = new THREE.PerspectiveCamera(60, 2, 0.1, 100);
  highCamera.position.set(0, 9, 4);
  highCamera.lookAt(0, 0.5, 0);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: THREE.HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, new BloomEffect({ mipmapBlur: true, luminanceThreshold: 1, intensity: 1.2 })));

  const label = overlay(stage.box);
  let sceneName: (typeof SCENES)[number] = 'showroom';
  let cameraName: (typeof CAMERAS)[number] = 'orbit camera';
  const apply = (): void => {
    // Every pass that has a scene or camera is switched: the RenderPass and the effects' camera.
    composer.setMainScene(sceneName === 'showroom' ? stage.scene : neonScene);
    composer.setMainCamera(cameraName === 'orbit camera' ? stage.camera : highCamera);
    label.textContent = `setMainScene(${sceneName})\nsetMainCamera(${cameraName})`;
  };
  apply();
  if (stage.bar) {
    select(stage.bar, 'scene', SCENES, (v) => ((sceneName = v), apply()), sceneName);
    select(stage.bar, 'camera', CAMERAS, (v) => ((cameraName = v), apply()), cameraName);
  } else {
    let i = 0;
    stage.every(2200, () => {
      i++;
      sceneName = SCENES[i % 2]!;
      cameraName = CAMERAS[(i >> 1) % 2]!;
      apply();
    });
  }

  stage.run((dt, t) => {
    showroomScene.update(t);
    neonSubject.update(t);
    // The stage only resizes its own camera.
    highCamera.aspect = stage.size.width / stage.size.height;
    highCamera.updateProjectionMatrix();
    composer.render(dt);
  });
  stage.onDispose(() => {
    neonScene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        for (const m of [o.material].flat()) m.dispose();
      }
    });
  });
  return () => stage.dispose();
};

export default mount;
