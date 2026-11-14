// setWorkBufferModifier: a per-component copy shader with its own uniforms
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, knotCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

const glsl = /* glsl */ `
  uniform float uLift;
  uniform float uWobble;
  uniform float uTime;
  uniform vec3 uTint;

  void modifySplatCenter(inout vec3 center) {
    center.y += uLift + uWobble * sin(uTime * 2.0 + center.x * 3.0);
  }
  void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {}
  void modifySplatColor(vec3 center, inout vec4 color) {
    color.rgb *= uTint;
  }
`;
const wgsl = /* wgsl */ `
  uniform uLift: f32;
  uniform uWobble: f32;
  uniform uTime: f32;
  uniform uTint: vec3f;

  fn modifySplatCenter(center: ptr<function, vec3f>) {
    (*center).y += uniform.uLift + uniform.uWobble * sin(uniform.uTime * 2.0 + (*center).x * 3.0);
  }
  fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {}
  fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>) {
    *color = vec4f((*color).rgb * uniform.uTint, (*color).a);
  }
`;

const TINTS = [[1, 1, 1], [1, 0.45, 0.4], [0.45, 0.8, 1]];

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 10, pitch: -15 });
  const container = cloudContainer(scene.stage.device, knotCloud(7000, 7, 0.05));

  // One shared resource, three components: the copy shader runs once per component.
  const parts = TINTS.map((tint, i) => {
    const entity = scene.add(container, `copy-${i}`);
    entity.setPosition((i - 1) * 3.4, 0, 0);
    entity.gsplat!.setWorkBufferModifier({ glsl, wgsl });
    // The shader reads time, so the work buffer has to be rebuilt every frame.
    entity.gsplat!.workBufferUpdate = pc.WORKBUFFER_UPDATE_ALWAYS;
    entity.gsplat!.setParameter('uTint', tint);
    return entity;
  });

  const params = { lift: 0, wobble: 0.15 };
  let time = 0;
  scene.app.on('update', (dt: number) => {
    time += dt;
    parts.forEach((entity, i) => {
      const gs = entity.gsplat!;
      gs.setParameter('uTime', time + i);
      gs.setParameter('uWobble', params.wobble * (i + 0.5));
      gs.setParameter('uLift', i === 1 ? params.lift : 0);
    });
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('uLift (middle one)', -1, 1.5, 0.05, params.lift, (v) => (params.lift = v));
    panel.slider('uWobble', 0, 0.4, 0.01, params.wobble, (v) => (params.wobble = v));
    panel.readout('One container, three components: each copy gets its own tint and wobble');
  }
  return () => scene.dispose();
};

export default mount;
