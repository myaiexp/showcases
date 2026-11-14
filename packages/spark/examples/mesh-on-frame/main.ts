// SplatMesh onFrame rewriting splats each frame, then updateVersion()
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, controlBar, readout } from '../../shared/controls.ts';

const N = 36;
const center = new THREE.Vector3();
const scales = new THREE.Vector3(0.05, 0.05, 0.05);
const quat = new THREE.Quaternion();
const color = new THREE.Color();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.4, 2.8], target: [0, 0.1, 0], orbit: 0.2 });
  let regenerate = true;
  let frames = 0;
  let lastDelta = 0;

  const sheet = new SplatMesh({
    // N x N splats on a flat sheet; onFrame lifts them into a travelling wave.
    constructSplats: (splats) => {
      for (let i = 0; i < N * N; i++) splats.pushSplat(center.set(0, 0, 0), scales, quat, 1, color.set(1, 1, 1));
    },
    onFrame: ({ mesh, time, deltaTime }) => {
      const splats = mesh.packedSplats;
      if (!mesh.isInitialized || !splats) return;
      frames++;
      for (let i = 0; i < N * N; i++) {
        const x = ((i % N) / (N - 1) - 0.5) * 2.4;
        const z = (Math.floor(i / N) / (N - 1) - 0.5) * 2.4;
        const y = 0.25 * Math.sin(Math.hypot(x, z) * 5 - time * 2.5);
        color.setHSL(0.55 + y * 0.6, 0.8, 0.55 + y);
        splats.setSplat(i, center.set(x, y, z), scales, quat, 1, color);
      }
      // setSplat edits the CPU copy; needsUpdate re-uploads it to the GPU...
      splats.needsUpdate = true;
      // ...and updateVersion() asks Spark to regenerate this mesh's splats from it.
      if (regenerate) mesh.updateVersion();
      lastDelta = deltaTime;
    },
  });
  stage.scene.add(sheet);

  if (!ctx.preview) {
    const info = readout(el);
    const bar = controlBar(el);
    checkbox(bar, 'call updateVersion() in onFrame', true, (v) => (regenerate = v));
    const timer = window.setInterval(() => {
      info.textContent = `onFrame ran ${frames} times (deltaTime ${(lastDelta * 1000).toFixed(1)} ms); ${N * N} splats rewritten each time`;
    }, 250);
    stage.run();
    return () => (clearInterval(timer), stage.dispose());
  }
  stage.run();
  return () => stage.dispose();
};

export default mount;
