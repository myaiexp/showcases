// Uniform nodes as parameters: animate a texture from JS with no shader rebuild
import * as THREE from 'three/webgpu';
import { uniform } from 'three/tsl';
import { zebraLines } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { model } from '../../shared/shapes.ts';
import { note } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  // Every texture parameter goes into a TSL function, so a uniform node can stand in
  // for any number or Color. Writing `.value` later changes the shader's input only.
  const thinness = uniform(0.5);
  const theta = uniform(0);
  const color = uniform(new THREE.Color(0x111111));
  const background = uniform(new THREE.Color(0xffffff));

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = zebraLines({
    scale: 2,
    thinness,
    phi: Math.PI / 2,
    theta,
    color,
    background,
  });
  model(stage, material, { spin: 0 });

  stage.frame((t) => {
    // Turn the stripes' axis around the sphere, breathe their width, cycle the hue.
    theta.value = t * 0.5;
    thinness.value = 0.5 + 0.35 * Math.sin(t * 1.3);
    background.value.setHSL((t * 0.05) % 1, 0.7, 0.7);
  });

  if (stage.panel) {
    note(stage.panel, 'theta, thinness and the background colour are uniforms written every frame from JavaScript; the material compiles once.');
  }

  stage.start();
  return stage.dispose;
};

export default mount;
