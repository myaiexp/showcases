// RenderPass overrideMaterial: every mesh drawn with one material, set and cleared at runtime
import * as THREE from 'three';
import { EffectComposer, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const CHOICES = ['none', 'MeshNormalMaterial', 'wireframe MeshBasicMaterial', 'flat MeshBasicMaterial'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const materials: Record<(typeof CHOICES)[number], THREE.Material | null> = {
    none: null,
    MeshNormalMaterial: stage.own(new THREE.MeshNormalMaterial()),
    'wireframe MeshBasicMaterial': stage.own(new THREE.MeshBasicMaterial({ color: 0x7fe3ff, wireframe: true })),
    'flat MeshBasicMaterial': stage.own(new THREE.MeshBasicMaterial({ color: 0xe8ecf2 })),
  };
  const composer = stage.own(new EffectComposer(stage.renderer));
  const renderPass = new RenderPass(stage.scene, stage.camera);
  composer.addPass(renderPass);

  const label = overlay(stage.box);
  const set = (name: (typeof CHOICES)[number]): void => {
    // Setting null puts the scene's own materials back.
    renderPass.overrideMaterial = materials[name] as THREE.Material; // the typings reject null
    label.textContent = `overrideMaterial = ${name === 'none' ? 'null' : name}`;
  };
  set('none');
  if (stage.bar) select(stage.bar, 'overrideMaterial', CHOICES, set, 'none');
  else {
    let i = 0;
    stage.every(2200, () => set(CHOICES[++i % CHOICES.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
