// Directional light cascades: numCascades, cascadeDistribution and shadowDistance
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: false, floor: 400, sun: { angles: [38, 28, 0], shadows: true }, clear: '#9fb4c8', ambient: '#4a5164' });
  const { app, camera, sun } = scene;
  camera.camera!.farClip = 200;
  const light = sun!.light!;
  light.shadowDistance = 90;
  light.shadowResolution = 512; // small on purpose, so the cascades show
  light.numCascades = 4;
  light.cascadeDistribution = 0.5;
  light.shadowBias = 0.3;

  // Posts along a road, tall enough to throw long shadows far from the camera.
  const cols = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8'];
  for (let i = 0; i < 30; i++) {
    for (const side of [-1, 1]) {
      const post = addShape(app.root, i % 3 ? 'cylinder' : 'box', material(cols[(i + (side > 0 ? 1 : 0)) % 4]!), [side * 4, 1.5, -i * 4], [0.5, 3, 0.5]);
      post.render!.castShadows = true;
    }
  }
  const walker = addShape(app.root, 'capsule', material('#ffffff'), [0, 0.8, 0], [0.8, 1.6, 0.8]);

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    const z = -((t * 6) % 100);
    walker.setLocalPosition(0, 0.8, z);
    camera.setPosition(0, 2.4, z + 6);
    camera.setEulerAngles(-10, 0, 0);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('numCascades', 1, 4, 1, 4, (v) => (light.numCascades = v));
    panel.slider('cascadeDistribution', 0, 1, 0.01, 0.5, (v) => (light.cascadeDistribution = v));
    panel.row();
    panel.slider('shadowDistance', 10, 150, 1, 90, (v) => (light.shadowDistance = v));
    panel.select('shadowResolution', ['256', '512', '1024', '2048'], '512', (v) => (light.shadowResolution = Number(v)));
    panel.row();
    panel.readout('One cascade stretches 512 texels over the whole distance; four spend them where the camera is.');
  }

  return () => scene.dispose();
};

export default mount;
