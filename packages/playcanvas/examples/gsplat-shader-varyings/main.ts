// Varying streams: classify splats per splat, clip per pixel only where needed
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { boxCloud, cloudContainer, createSplatScene } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';
import { glslPS, glslVS, wgslPS, wgslVS } from './shaders.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 7.5, pitch: -25, autoRotate: 8 });
  const { app, camera } = scene;
  scene.add(cloudContainer(scene.stage.device, boxCloud(26000, 1.5, 11, 0.07)), 'box');

  // A per-splat uint written by the vertex chunk (setClipState) and read by the fragment
  // chunk (getClipState). Adding a stream rebuilds the shaders, so do it before rendering.
  app.scene.gsplat.varyings.add([{ name: 'clipState', type: pc.TYPE_UINT32, components: 1 }]);
  const material = app.scene.gsplat.material;
  material.getShaderChunks('glsl').set('gsplatModifyVS', glslVS);
  material.getShaderChunks('wgsl').set('gsplatModifyVS', wgslVS);
  material.getShaderChunks('glsl').set('gsplatModifyPS', glslPS);
  material.getShaderChunks('wgsl').set('gsplatModifyPS', wgslPS);

  const params = { size: 1.1, move: true };
  const half = new pc.Vec3();
  const centre = new pc.Vec3();
  const viewProj = new pc.Mat4();
  let time = 0;
  app.on('update', (dt: number) => {
    time += dt;
    const x = params.move ? Math.sin(time * 0.9) * 1.3 : 0;
    centre.set(x, 0.3, 0.6);
    half.set(params.size, params.size, params.size);
    // The fragment chunk rebuilds world positions from the pixel, so it needs the inverse view-projection.
    const cam = camera.camera!;
    viewProj.mul2(cam.projectionMatrix, cam.viewMatrix).invert();
    material.setParameter('uClipCenter', [centre.x, centre.y, centre.z]);
    material.setParameter('uClipHalf', [half.x, half.y, half.z]);
    material.setParameter('uInvViewProj', viewProj.data);
    material.update();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Clip box half-size', 0.3, 2, 0.05, params.size, (v) => (params.size = v));
    panel.check('Slide the box', true, (on) => (params.move = on));
    panel.readout('splats wholly inside or outside the box are decided once, in the vertex stage');
  }

  return () => {
    app.scene.gsplat.varyings.remove(['clipState']);
    scene.dispose();
  };
};

export default mount;
