// ShaderMaterial from a shader description: GLSL, attributes, one material
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';

// The description: a unique name, the sources, and which vertex stream feeds which attribute.
const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderMaterialBasics',
  vertexGLSL: /* glsl */ `
    attribute vec3 aPosition;
    attribute vec2 aUv0;

    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;

    varying vec2 vUv0;

    void main(void) {
        vUv0 = aUv0;
        gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
    }
  `,
  fragmentGLSL: /* glsl */ `
    varying vec2 vUv0;
    uniform float uTime;

    void main(void) {
        vec2 p = vUv0 * 6.0;
        float v = sin(p.x + uTime) + sin(p.y * 1.3 - uTime * 0.7) + sin((p.x + p.y) * 0.7 + uTime * 0.5);
        vec3 color = 0.5 + 0.5 * cos(vec3(0.0, 2.0, 4.0) + v + uTime * 0.3);
        gl_FragColor = vec4(color, 1.0);
    }
  `,
  attributes: {
    aPosition: pc.SEMANTIC_POSITION,
    aUv0: pc.SEMANTIC_TEXCOORD0,
  },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 7.5, pitch: -15 });
  const { app } = scene;

  // One material, three meshes: every mesh instance that uses it draws with the same shader.
  const material = new pc.ShaderMaterial(shaderDesc);
  addShape(app, 'sphere', material, [-2.3, 0, 0], 1.8);
  addShape(app, 'torus', material, [0, 0, 0], 1.6);
  addShape(app, 'box', material, [2.3, 0, 0], 1.5);

  let speed = 1;
  let clock = 0;
  onTick(app, (_t, dt) => {
    clock += dt * speed;
    material.setParameter('uTime', clock);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('uTime speed', 0, 4, 0.1, 1, (v) => (speed = v));
    panel.readout(`device: ${scene.stage.device.deviceType}, language: ${scene.stage.device.isWebGPU ? 'GLSL transpiled to WGSL' : 'GLSL'}`);
  }

  return () => scene.dispose();
};

export default mount;
