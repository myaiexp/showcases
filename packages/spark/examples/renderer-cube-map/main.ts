// renderCubeMap bakes the splats around a point into a scene.background
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, button, select, overlay } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';
import { pushBlobShell } from '../../renderer-kit/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 0], orbit: false, fov: 70 });

  // The splat world around the origin: knots on a ring inside a coloured shell.
  const world = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const knot = new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, ctx.preview ? 5000 : 12000, 3 + i) });
    const a = (i / 5) * Math.PI * 2;
    knot.position.set(Math.cos(a) * 2.4, Math.sin(i * 1.7) * 0.5, Math.sin(a) * 2.4);
    knot.rotation.y = -a + Math.PI / 2;
    world.add(knot);
  }
  world.add(new SplatMesh({ constructSplats: (s) => pushBlobShell(s, { count: ctx.preview ? 1500 : 4000, radius: 8, scale: 0.3, opacity: 0.8 }) }));
  stage.scene.add(world);
  // An ordinary mesh that stays live in both modes, to show the background sits behind it.
  const cube = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), new THREE.MeshNormalMaterial());
  stage.scene.add(cube);
  const label = overlay(el);

  let size = 256;
  let baked = false;
  let busy = false;
  let disposed = false;
  const setLive = (): void => {
    stage.scene.background = null;
    world.visible = true;
    baked = false;
  };
  const bake = async (): Promise<void> => {
    if (busy) return;
    busy = true;
    try {
      // Render the splats as seen from the origin into 6 faces and get a CubeTexture back.
      const texture = await stage.spark.renderCubeMap({
        scene: stage.scene,
        worldCenter: new THREE.Vector3(0, 0, 0),
        size,
        hideObjects: [cube],
        update: true,
        filter: false,
      });
      if (disposed) return;
      stage.scene.background = texture;
      // The splats are no longer needed to draw the backdrop.
      world.visible = false;
      baked = true;
    } finally {
      busy = false;
    }
  };

  let bakeEvery = 0;
  if (!ctx.preview) {
    const bar = controlBar(el);
    button(bar, 'Bake cube map', () => void bake());
    button(bar, 'Back to live splats', setLive);
    select(bar, 'face size', ['64', '256', '512'] as const, (v) => {
      size = Number(v);
      if (baked) void bake();
    }, '256');
  } else {
    size = 128;
    bakeEvery = 5;
  }

  stage.run((time) => {
    // The eye wanders in a small circle: live splats show parallax, the baked map cannot.
    stage.camera.position.set(Math.cos(time * 0.6) * 0.5, 0, Math.sin(time * 0.6) * 0.5);
    stage.camera.rotation.set(Math.sin(time * 0.2) * 0.2, time * 0.25, 0, 'YXZ');
    cube.position.set(Math.sin(time * 0.4) * 0.8, 0, -1.4);
    cube.rotation.y = time;
    if (bakeEvery > 0) {
      // Cards alternate by themselves: five seconds live, five seconds baked.
      const phase = Math.floor(time / bakeEvery) % 2;
      if (phase === 1 && !baked) void bake();
      if (phase === 0 && baked) setLive();
    }
    label.textContent = baked ? `renderCubeMap background (${size}px faces)` : 'live splats';
  });
  return () => {
    disposed = true;
    stage.scene.background = null;
    stage.dispose();
  };
};

export default mount;
