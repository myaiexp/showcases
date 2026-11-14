// A gsplatModifyVS chunk on the scene gsplat material, driven by uniforms
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, knotCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';
import { glslVertex, wgslVertex } from './shaders.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 6.5, pitch: -20 });
  const { app } = scene;
  scene.add(cloudContainer(scene.stage.device, knotCloud(16000, 7, 0.05)), 'knot');

  // One material for every splat in the scene: set the chunk for both shader languages.
  const material = app.scene.gsplat.material;
  material.getShaderChunks('glsl').set('gsplatModifyVS', glslVertex);
  material.getShaderChunks('wgsl').set('gsplatModifyVS', wgslVertex);

  const params = { twist: 0.9, breath: 0.35, gold: 1 };
  let time = 0;
  app.on('update', (dt: number) => {
    time += dt;
    // Uniforms of these chunks are material parameters, not device scope values.
    material.setParameter('uTime', time);
    material.setParameter('uTwist', params.twist);
    material.setParameter('uBreath', params.breath);
    material.setParameter('uGold', params.gold);
    material.update();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Twist (modifySplatCenter)', 0, 2, 0.05, params.twist, (v) => (params.twist = v));
    panel.slider('Breath (modifySplatRotationScale)', 0, 0.8, 0.05, params.breath, (v) => (params.breath = v));
    panel.slider('Gold flash (modifySplatColor)', 0, 1, 0.05, params.gold, (v) => (params.gold = v));
  }

  return () => {
    // Back to the default look, though the material goes with the app.
    material.getShaderChunks('glsl').delete('gsplatModifyVS');
    material.getShaderChunks('wgsl').delete('gsplatModifyVS');
    scene.dispose();
  };
};

export default mount;
