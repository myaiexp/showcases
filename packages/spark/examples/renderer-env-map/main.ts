// renderEnvMap: splats around a chrome sphere become its live reflection
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, checkbox } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';
import { pushBlobShell } from '../../renderer-kit/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.8, 6], orbit: 0.15 });

  // Splats the sphere can reflect: four knots on a ring and a far, coloured backdrop.
  const world = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const knot = new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, ctx.preview ? 1500 : 4000, 3 + i) });
    const a = (i / 4) * Math.PI * 2;
    knot.position.set(Math.cos(a) * 3.2, 0.2 * i - 0.3, Math.sin(a) * 3.2);
    knot.rotation.y = -a;
    world.add(knot);
  }
  world.add(new SplatMesh({ constructSplats: (s) => pushBlobShell(s, { count: ctx.preview ? 150 : 500, radius: 9, scale: 0.55, opacity: 0.8 }) }));
  stage.scene.add(world);

  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 48, 24),
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.05 }),
  );
  stage.scene.add(ball);

  // Render the splats seen from the ball's centre, filter them, and hand the result to the
  // material. The ball hides itself while its own reflection is captured.
  let envMap: THREE.Texture | null = null;
  let busy = false;
  let doneAt = -10;
  let disposed = false;
  const refresh = async (): Promise<void> => {
    if (busy) return;
    busy = true;
    try {
      const next = await stage.spark.renderEnvMap({
        scene: stage.scene,
        worldCenter: ball.position,
        size: ctx.preview ? 64 : 128,
        hideObjects: [ball],
        update: true,
      });
      if (disposed) return next.dispose();
      stage.spark.recurseSetEnvMap(ball, next);
      envMap?.dispose();
      envMap = next;
    } finally {
      busy = false;
      doneAt = performance.now() / 1000;
    }
  };

  let live = true;
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'roughness', 0, 0.6, 0.01, 0.05, (v) => ((ball.material as THREE.MeshStandardMaterial).roughness = v));
    checkbox(bar, 'refresh as the splats move', true, (v) => (live = v));
  }

  stage.run((time, dt) => {
    world.rotation.y += dt * 0.35;
    // Wait a beat after each finished capture, so a slow machine is never swamped.
    if (live && !busy && time - doneAt > (ctx.preview ? 1 : 0.4)) void refresh();
  });
  return () => {
    disposed = true;
    envMap?.dispose();
    stage.dispose();
  };
};

export default mount;
