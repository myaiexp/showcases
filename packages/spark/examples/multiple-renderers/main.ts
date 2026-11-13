// Two SparkRenderers draw different splat sets into two halves of a canvas
import * as THREE from 'three';
import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, checkbox } from '../../shared/controls.ts';
import { pushButterfly, pushTorusKnot } from '../../shared/subjects.ts';

const SET_A = 1;
const SET_B = 2;

function paneLabel(el: HTMLElement, text: string, right: boolean): void {
  const div = document.createElement('div');
  div.textContent = text;
  div.style.cssText = `position:absolute;top:6px;${right ? 'right' : 'left'}:8px;font:12px ui-monospace,monospace;color:#e8ecf2;text-shadow:0 1px 2px #000;pointer-events:none`;
  el.append(div);
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.3, 3.4], orbit: 0.25 });
  el.style.position = 'relative';
  const { renderer, scene, spark: sparkA } = stage;

  // Two sets of splats. Spark picks the generators a viewpoint renders by camera layers.
  const knot = new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, ctx.preview ? 9000 : 20000) });
  knot.layers.set(SET_A);
  const butterfly = new SplatMesh({ constructSplats: (s) => pushButterfly(s, ctx.preview ? 12000 : 24000) });
  butterfly.layers.set(SET_B);
  butterfly.scale.setScalar(1.6);
  scene.add(knot, butterfly);
  // The one SparkRenderer in the scene is a mesh: let every camera layer draw it.
  sparkA.layers.enableAll();

  // The second renderer is not in the scene; it has its own settings and sort order.
  const sparkB = new SparkRenderer({ renderer, falloff: 0, maxStdDev: 1.6 });
  const camA = new THREE.PerspectiveCamera(55, 1, 0.01, 100);
  const camB = new THREE.PerspectiveCamera(55, 1, 0.01, 100);
  camA.layers.set(SET_A);
  camB.layers.set(SET_B);

  paneLabel(el, ctx.preview ? 'A' : 'spark A: default, knot set', false);
  paneLabel(el, ctx.preview ? 'B' : 'spark B: falloff 0, butterfly set', true);
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'B falloff', 0, 1, 0.01, 0, (v) => (sparkB.falloff = v));
    slider(bar, 'B maxStdDev', 1, 3, 0.05, 1.6, (v) => (sparkB.maxStdDev = v));
    checkbox(bar, 'B also draws set A', false, (on) => (on ? camB.layers.enable(SET_A) : camB.layers.disable(SET_A)));
  }

  let last = -1;
  renderer.setAnimationLoop((ms) => {
    const dt = last < 0 ? 0 : Math.min((ms - last) / 1000, 0.1);
    last = ms;
    stage.orbit?.update(dt);
    butterfly.rotation.y += dt * 0.4;
    const w = stage.canvas.clientWidth;
    const h = stage.canvas.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setScissorTest(true);
    const panes: [SparkRenderer, THREE.PerspectiveCamera, number][] = [
      [sparkA, camA, 0],
      [sparkB, camB, w / 2],
    ];
    for (const [spark, camera, x] of panes) {
      camera.position.copy(stage.camera.position);
      camera.quaternion.copy(stage.camera.quaternion);
      camera.aspect = w / 2 / h;
      camera.updateProjectionMatrix();
      renderer.setViewport(x, 0, w / 2, h);
      renderer.setScissor(x, 0, w / 2, h);
      // Each renderer draws through the SparkRenderer in the scene with its own data.
      spark.render(scene, camera);
    }
    renderer.setScissorTest(false);
  });
  return () => {
    sparkB.dispose();
    stage.dispose();
  };
};

export default mount;
