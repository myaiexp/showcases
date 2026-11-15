// LambdaPass between passes: read the renderer's draw-call counter after each stage
import * as THREE from 'three';
import { EffectComposer, EffectPass, LambdaPass, RenderPass, SepiaEffect, VignetteEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const label = overlay(stage.box);
  const seen: string[] = [];
  // renderer.info resets on every renderer.render() call, so right after a pass it describes that pass.
  const probe = (name: string) => (): void => {
    const { calls, triangles } = stage.renderer.info.render;
    seen.push(`after ${name}: ${calls} draw calls, ${triangles} triangles`);
  };

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new LambdaPass(probe('RenderPass')));
  composer.addPass(new EffectPass(stage.camera, new SepiaEffect()));
  composer.addPass(new LambdaPass(probe('sepia EffectPass')));
  composer.addPass(new EffectPass(stage.camera, new VignetteEffect()));

  if (stage.bar) {
    const crate = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const mat = new THREE.MeshStandardMaterial({ color: 0xd9dde6 });
    stage.onDispose(() => (crate.dispose(), mat.dispose()));
    let n = 0;
    // More meshes means more draw calls in the RenderPass and none extra in the effect passes.
    button(stage.bar, 'add 10 crates', () => {
      for (let i = 0; i < 10; i++) {
        const m = new THREE.Mesh(crate, mat);
        m.position.set(-3 + ((n + i) % 10) * 0.65, 0.15 + Math.floor((n + i) / 10) * 0.32, 4);
        stage.scene.add(m);
      }
      n += 10;
    });
  }

  stage.run((dt, t) => {
    seen.length = 0;
    subject.update(t);
    composer.render(dt);
    label.textContent = seen.join('\n');
  });
  return () => stage.dispose();
};

export default mount;
