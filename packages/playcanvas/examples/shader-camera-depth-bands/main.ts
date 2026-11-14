// Built-in matrix_view and camera_params: depth bands and the ortho flag
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, type ShaderDesc } from '../../shared/shaders.ts';

const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderCameraDepthBands',
  vertexGLSL: /* glsl */ `
    attribute vec3 aPosition;
    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;
    varying vec3 vWorldPos;
    void main(void) {
        vec4 worldPos = matrix_model * vec4(aPosition, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = matrix_viewProjection * worldPos;
    }
  `,
  fragmentGLSL: /* glsl */ `
    uniform mat4 matrix_view;      // world to view space
    uniform vec4 camera_params;    // 1/far, far, near, 1 if orthographic else 0
    uniform float bandSize;
    varying vec3 vWorldPos;
    void main(void) {
        float viewDepth = -(matrix_view * vec4(vWorldPos, 1.0)).z;
        float bands = viewDepth / bandSize;
        float stripe = step(0.5, fract(bands));
        // 0 at the near plane, 1 at the far plane; the camera here has a short far plane
        float range = clamp((viewDepth - camera_params.z) * camera_params.x, 0.0, 1.0);
        vec3 near = vec3(1.0, 0.75, 0.25);
        vec3 far = vec3(0.15, 0.3, 0.9);
        vec3 color = mix(near, far, range) * (0.55 + 0.45 * stripe);
        // an orthographic camera draws the bands in a slightly greener cast
        color = mix(color, color.gbr, camera_params.w * 0.5);
        gl_FragColor = vec4(color, 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 14, pitch: -22, yaw: 20, autoRotate: 5, target: new pc.Vec3(0, 0.5, 0) });
  const { app, camera } = scene;
  const cam = camera.camera!;
  cam.farClip = 30;
  cam.nearClip = 1;
  cam.orthoHeight = 6;

  const material = new pc.ShaderMaterial(shaderDesc);
  material.setParameter('bandSize', 1.5);
  addShape(app, 'plane', material, [0, 0, 0], [12, 1, 12]);
  for (let i = -3; i <= 3; i++) {
    const h = 1.5 + ((i + 3) % 3);
    addShape(app, 'box', material, [i * 1.5, h / 2, -i * 0.5], [1, h, 1]);
  }

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('bandSize', 0.5, 4, 0.1, 1.5, (v) => material.setParameter('bandSize', v));
    panel.slider('camera farClip', 15, 60, 1, 30, (v) => (cam.farClip = v));
    panel.check('orthographic (camera_params.w = 1)', false, (on) => (cam.projection = on ? pc.PROJECTION_ORTHOGRAPHIC : pc.PROJECTION_PERSPECTIVE));
  }

  return () => scene.dispose();
};

export default mount;
