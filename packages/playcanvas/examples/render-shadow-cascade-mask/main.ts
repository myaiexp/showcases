// Render shadowCascadeMask: which cascades of a directional light a mesh casts into
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const CASCADES = [pc.SHADOW_CASCADE_0, pc.SHADOW_CASCADE_1, pc.SHADOW_CASCADE_2, pc.SHADOW_CASCADE_3];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: false, floor: 300, sun: { angles: [45, 30, 0], shadows: true }, clear: '#9fb4c8', ambient: '#4a5164' });
  const { app, camera, sun } = scene;
  camera.camera!.farClip = 200;
  const light = sun!.light!;
  light.numCascades = 4;
  light.cascadeDistribution = 0.6;
  light.shadowDistance = 80;
  light.shadowResolution = 1024;
  light.shadowBias = 0.3;

  // A row of posts running away from the camera: nearest in the first cascade, farthest in the last.
  const posts: pc.Entity[] = [];
  for (let i = 0; i < 24; i++) {
    posts.push(addShape(app.root, 'cylinder', material(i % 2 ? '#e8794a' : '#4ab3e8'), [0, 1.5, -i * 3.2], [0.7, 3, 0.7]));
  }
  const setMask = (mask: number): void => posts.forEach((p) => (p.render!.shadowCascadeMask = mask));
  camera.setPosition(-9, 4, 8);
  camera.lookAt(0, 0.5, -30);

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    camera.setPosition(-9 + Math.sin(t * 0.3) * 2, 4, 8);
    camera.lookAt(0, 0.5, -30);
    if (ctx.preview) setMask(CASCADES.slice(0, 1 + (Math.floor(t / 1.5) % 4)).reduce((a, b) => a | b, 0));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    let mask: number = pc.SHADOW_CASCADE_ALL;
    CASCADES.forEach((bit, i) =>
      panel.check(`cascade ${i}`, true, (on) => {
        mask = on ? mask | bit : mask & ~bit;
        setMask(mask);
      }),
    );
    panel.row();
    panel.readout('Each post casts only into the cascades that are ticked; the cascade it falls in decides where its shadow shows.');
  }

  return () => scene.dispose();
};

export default mount;
