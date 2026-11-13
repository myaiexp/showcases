// depthTest, depthWrite and transparent: splats among opaque meshes
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, checkbox, overlay } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  // The three options are constructor options that land on the splat ShaderMaterial,
  // which SparkRenderer exposes as `.material`, so they can also change live.
  const stage = createStage(el, ctx, {
    position: [0, 0.4, 3.4],
    orbit: 0.3,
    spark: { depthTest: true, depthWrite: false, transparent: true },
  });
  stage.scene.add(new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, ctx.preview ? 12000 : 24000) }));
  stage.scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(2, 3, 4);
  stage.scene.add(sun);
  // Opaque meshes: a sphere through the knot's middle, and a slab passing in front of it.
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 16), new THREE.MeshStandardMaterial({ color: 0xd9534f }));
  const slab = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.6, 0.2), new THREE.MeshStandardMaterial({ color: 0xf0ad4e }));
  stage.scene.add(ball, slab);
  const label = overlay(el);

  const material = stage.spark.material;
  const show = (): void => {
    label.textContent = `depthTest ${material.depthTest}  depthWrite ${material.depthWrite}  transparent ${material.transparent}`;
  };

  let auto = true;
  let tests: HTMLInputElement | null = null;
  if (!ctx.preview) {
    const bar = controlBar(el);
    tests = checkbox(bar, 'depthTest', true, (v) => {
      auto = false;
      material.depthTest = v;
    });
    checkbox(bar, 'depthWrite', false, (v) => (material.depthWrite = v));
    checkbox(bar, 'transparent', true, (v) => {
      material.transparent = v;
      material.needsUpdate = true;
    });
  }

  stage.run((time) => {
    slab.position.set(Math.sin(time * 0.7) * 1.1, 0, 0.9);
    ball.position.y = Math.sin(time * 0.5) * 0.1;
    // Without depthTest the splats ignore the meshes and paint over them.
    if (auto) {
      material.depthTest = Math.floor(time / 4) % 2 === 0;
      if (tests) tests.checked = material.depthTest;
    }
    show();
  });
  return () => stage.dispose();
};

export default mount;
