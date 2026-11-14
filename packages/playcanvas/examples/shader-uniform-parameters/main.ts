// Material.setParameter: floats, ints and vectors reach shader uniforms
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';

const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderUniformParameters',
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

    uniform vec3 tint;        // set with an array of 3 numbers
    uniform vec2 scroll;      // an array of 2
    uniform float sharpness;  // a plain number
    uniform int stripes;      // a whole number

    void main(void) {
        float wave = sin((vUv0.x + scroll.x) * 6.2831853 * float(stripes)) * sin((vUv0.y + scroll.y) * 6.2831853 * float(stripes));
        float band = smoothstep(-sharpness, sharpness, wave);
        gl_FragColor = vec4(mix(vec3(0.08), tint, band), 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aUv0: pc.SEMANTIC_TEXCOORD0 },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 5.5, pitch: -12 });
  const { app } = scene;
  const material = new pc.ShaderMaterial(shaderDesc);
  addShape(app, 'sphere', material, [-1.5, 0, 0], 2.4);
  addShape(app, 'cylinder', material, [1.6, 0, 0], [1.6, 2.4, 1.6]);

  // The values the panel edits. Vectors are written as new arrays every time they change.
  const state = { tint: [0.95, 0.55, 0.2], speed: 0.2, sharpness: 0.15, stripes: 3 };
  material.setParameter('tint', state.tint);
  material.setParameter('sharpness', state.sharpness);
  material.setParameter('stripes', state.stripes);

  onTick(app, (t) => {
    material.setParameter('scroll', [t * state.speed, t * state.speed * 0.5]);
    if (ctx.preview) {
      // Cards have no controls, so sweep a hue through the tint to show uniforms updating.
      state.tint = [0.95, 0.55 + 0.4 * Math.sin(t), 0.45 + 0.35 * Math.cos(t * 0.7)];
      material.setParameter('tint', state.tint);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const channel = (i: number) => (v: number) => {
      state.tint = state.tint.map((x, k) => (k === i ? v : x));
      material.setParameter('tint', state.tint);
    };
    panel.slider('tint r', 0, 1, 0.01, state.tint[0]!, channel(0));
    panel.slider('tint g', 0, 1, 0.01, state.tint[1]!, channel(1));
    panel.slider('tint b', 0, 1, 0.01, state.tint[2]!, channel(2));
    panel.row();
    panel.slider('scroll speed', 0, 1, 0.01, state.speed, (v) => (state.speed = v));
    panel.slider('sharpness (float)', 0.01, 1, 0.01, state.sharpness, (v) => material.setParameter('sharpness', v));
    panel.slider('stripes (int)', 1, 8, 1, state.stripes, (v) => material.setParameter('stripes', v));
  }

  return () => scene.dispose();
};

export default mount;
