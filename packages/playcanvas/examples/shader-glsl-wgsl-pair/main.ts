// One ShaderMaterial with GLSL and WGSL: WebGPU takes WGSL, WebGL 2 takes GLSL
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';
import { showNotice } from '../../shared/notice.ts';

// The same effect twice. WGSL drops @group/@binding: uniforms, attributes and varyings use the
// engine's simplified declarations, and uniforms are read through the `uniform.` prefix.
const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderGlslWgslPair',
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
    uniform vec3 uTint;
    void main(void) {
        float rings = 0.5 + 0.5 * sin(length(vUv0 - 0.5) * 40.0 - uTime * 4.0);
        float spokes = 0.5 + 0.5 * sin(atan(vUv0.y - 0.5, vUv0.x - 0.5) * 8.0 + uTime);
        gl_FragColor = vec4(uTint * mix(rings, spokes, 0.5), 1.0);
    }
  `,
  vertexWGSL: /* wgsl */ `
    attribute aPosition: vec3f;
    attribute aUv0: vec2f;
    uniform matrix_model: mat4x4f;
    uniform matrix_viewProjection: mat4x4f;
    varying vUv0: vec2f;

    @vertex
    fn vertexMain(input: VertexInput) -> VertexOutput {
        var output: VertexOutput;
        output.position = uniform.matrix_viewProjection * uniform.matrix_model * vec4f(input.aPosition, 1.0);
        output.vUv0 = input.aUv0;
        return output;
    }
  `,
  fragmentWGSL: /* wgsl */ `
    varying vUv0: vec2f;
    uniform uTime: f32;
    uniform uTint: vec3f;

    @fragment
    fn fragmentMain(input: FragmentInput) -> FragmentOutput {
        var output: FragmentOutput;
        let centered = input.vUv0 - vec2f(0.5, 0.5);
        let rings = 0.5 + 0.5 * sin(length(centered) * 40.0 - uniform.uTime * 4.0);
        let spokes = 0.5 + 0.5 * sin(atan2(centered.y, centered.x) * 8.0 + uniform.uTime);
        output.color = vec4f(uniform.uTint * mix(rings, spokes, 0.5), 1.0);
        return output;
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aUv0: pc.SEMANTIC_TEXCOORD0 },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { device: ctx.preview ? 'webgl2' : 'webgpu', distance: 8, pitch: -14 });
  const { app, stage } = scene;
  const material = new pc.ShaderMaterial(shaderDesc);
  material.setParameter('uTint', [0.4, 0.8, 1]);
  addShape(app, 'sphere', material, [-2.5, 0, 0], 2.4);
  addShape(app, 'box', material, [0, 0, 0], 2);
  addShape(app, 'cylinder', material, [2.5, 0, 0], [2, 2.2, 2]);
  onTick(app, (t) => material.setParameter('uTime', t));

  if (!ctx.preview) {
    showNotice(
      el,
      stage.device.isWebGPU
        ? 'WebGPU: the vertexWGSL and fragmentWGSL sources are compiled directly.'
        : 'This browser gave WebGL 2, so the GLSL sources are used. On WebGPU the WGSL pair runs without transpiling.',
    );
    const panel = createPanel(el);
    panel.select('uTint', ['cyan', 'amber', 'pink'] as const, 'cyan', (name) => {
      material.setParameter('uTint', { cyan: [0.4, 0.8, 1], amber: [1, 0.7, 0.25], pink: [1, 0.4, 0.75] }[name]);
    });
  }

  return () => scene.dispose();
};

export default mount;
