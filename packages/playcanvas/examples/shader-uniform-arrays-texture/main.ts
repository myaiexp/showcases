// Uniform arrays and a texture, declared in GLSL and in reflected WGSL
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { showNotice } from '../../shared/notice.ts';
import { addShape, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';
import { canvasTexture } from '../../shared/textures.ts';

const attributes = { aPosition: pc.SEMANTIC_POSITION, aUv0: pc.SEMANTIC_TEXCOORD0 };

// An array of four vec3 tints and four float weights, plus a texture. The WGSL needs no @group or
// @binding: the engine reflects `uniform`, `var ...: texture_2d<f32>` and its `...Sampler` from the
// source. A texture is directly followed by its sampler, and f32 array items are wrapped in a
// struct, so they are read as `.element`.
const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderUniformArraysTexture',
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
    uniform vec3 tints[4];
    uniform float weights[4];
    uniform sampler2D uMap;
    void main(void) {
        int band = int(clamp(floor(vUv0.x * 4.0), 0.0, 3.0));
        float grain = texture2D(uMap, vUv0 * 3.0).r;
        vec3 color = tints[band] * weights[band] * mix(0.55, 1.0, grain);
        gl_FragColor = vec4(color, 1.0);
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
    uniform tints: array<vec3f, 4>;
    uniform weights: array<f32, 4>;
    var uMap: texture_2d<f32>;
    var uMapSampler: sampler;

    @fragment
    fn fragmentMain(input: FragmentInput) -> FragmentOutput {
        var output: FragmentOutput;
        let band = i32(clamp(floor(input.vUv0.x * 4.0), 0.0, 3.0));
        let grain = textureSample(uMap, uMapSampler, input.vUv0 * 3.0).r;
        let color = uniform.tints[band] * uniform.weights[band].element * mix(0.55, 1.0, grain);
        output.color = vec4f(color, 1.0);
        return output;
    }
  `,
  attributes,
};

const TINTS = [1, 0.35, 0.3, 1, 0.8, 0.25, 0.3, 0.9, 0.5, 0.35, 0.6, 1];

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { device: ctx.preview ? 'webgl2' : 'webgpu', distance: 7.5, pitch: -14 });
  const { app, stage } = scene;

  // grain: random greys, so the texture shows as speckle inside every band
  const texture = canvasTexture(
    stage.device,
    (g, s) => {
      for (let y = 0; y < s; y += 4) {
        for (let x = 0; x < s; x += 4) {
          const v = 120 + Math.floor(Math.random() * 135);
          g.fillStyle = `rgb(${v},${v},${v})`;
          g.fillRect(x, y, 4, 4);
        }
      }
    },
    { size: 128, name: 'grain', srgb: false },
  );

  const material = new pc.ShaderMaterial(shaderDesc);
  const weights = [1, 1, 1, 1];
  material.setParameter('tints', TINTS);
  material.setParameter('weights', weights);
  material.setParameter('uMap', texture);
  addShape(app, 'sphere', material, [-2.2, 0, 0], 2.8);
  addShape(app, 'cylinder', material, [2.2, 0, 0], [2.4, 2.6, 2.4]);

  onTick(app, (t) => {
    if (ctx.preview) {
      // an array is set again as a whole, as the docs ask, never edited in place
      material.setParameter('weights', weights.map((_, i) => 0.65 + 0.35 * Math.sin(t * 1.5 + i * 1.2)));
    }
  });

  if (!ctx.preview) {
    showNotice(el, stage.device.isWebGPU ? 'WebGPU: the reflected WGSL declarations are in use.' : 'WebGL 2: the GLSL source is in use; the WGSL pair runs on WebGPU.');
    const panel = createPanel(el);
    weights.forEach((w, i) =>
      panel.slider(`weights[${i}]`, 0, 1.5, 0.05, w, (v) => {
        weights[i] = v;
        material.setParameter('weights', [...weights]);
      }),
    );
  }

  return () => {
    texture.destroy();
    scene.dispose();
  };
};

export default mount;
