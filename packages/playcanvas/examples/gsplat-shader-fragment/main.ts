// A gsplatModifyPS chunk: every splat drawn as a ring, per covered pixel
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, galaxyCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

// gaussianUV is (0,0) at the splat centre and has length 1 where the splat is clipped.
const glsl = /* glsl */ `
  uniform float uRingWidth;
  uniform float uRingAlpha;

  void modifySplatColor(vec2 gaussianUV, inout vec4 color) {
    float radius = length(gaussianUV);
    // fwidth converts a width in pixels into radius units: constant screen-space width
    float radiusPerPixel = fwidth(radius);
    float innerEdge = 1.0 - uRingWidth * radiusPerPixel;
    float ring = smoothstep(innerEdge - radiusPerPixel, innerEdge, radius);
    color.a = ring * uRingAlpha;
  }
`;
const wgsl = /* wgsl */ `
  uniform uRingWidth: f32;
  uniform uRingAlpha: f32;

  fn modifySplatColor(gaussianUV: vec2f, color: ptr<function, vec4f>) {
    let radius = length(gaussianUV);
    let radiusPerPixel = fwidth(radius);
    let innerEdge = 1.0 - uniform.uRingWidth * radiusPerPixel;
    let ring = smoothstep(innerEdge - radiusPerPixel, innerEdge, radius);
    *color = vec4f((*color).rgb, ring * uniform.uRingAlpha);
  }
`;

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 6.5, pitch: -40, autoRotate: 12 });
  const { app } = scene;
  scene.add(cloudContainer(scene.stage.device, galaxyCloud(9000, 5, 3)), 'galaxy');
  // The chunk replaces the colour step for every splat in the scene.
  const material = app.scene.gsplat.material;
  material.getShaderChunks('glsl').set('gsplatModifyPS', glsl);
  material.getShaderChunks('wgsl').set('gsplatModifyPS', wgsl);

  const params = { width: 1.5, alpha: 0.5, pulse: true };
  let time = 0;
  app.on('update', (dt: number) => {
    time += dt;
    material.setParameter('uRingWidth', params.width);
    material.setParameter('uRingAlpha', params.pulse ? 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(time * 2)) : params.alpha);
    material.update();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('uRingWidth (pixels)', 0.5, 6, 0.25, params.width, (v) => (params.width = v));
    panel.slider('uRingAlpha', 0.05, 1, 0.05, params.alpha, (v) => (params.alpha = v));
    panel.check('Pulse the alpha', true, (on) => (params.pulse = on));
  }

  return () => {
    material.getShaderChunks('glsl').delete('gsplatModifyPS');
    material.getShaderChunks('wgsl').delete('gsplatModifyPS');
    scene.dispose();
  };
};

export default mount;
