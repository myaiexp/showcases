// A custom shader chunk registered with ShaderChunks, #included by two shaders
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick } from '../../shared/shaders.ts';

// One chunk of helper code, registered once on the device's GLSL chunk map.
const UTILS = /* glsl */ `
    float stripes(float x, float count, float softness) {
        float f = abs(fract(x * count) - 0.5) * 2.0;
        return smoothstep(0.5 - softness, 0.5 + softness, f);
    }
    vec3 cosinePalette(float t) {
        return 0.5 + 0.5 * cos(6.2831853 * (t + vec3(0.0, 0.33, 0.67)));
    }
`;

const VERTEX = /* glsl */ `
    attribute vec3 aPosition;
    attribute vec2 aUv0;
    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;
    varying vec2 vUv0;
    void main(void) {
        vUv0 = aUv0;
        gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
    }
`;

const attributes = { aPosition: pc.SEMANTIC_POSITION, aUv0: pc.SEMANTIC_TEXCOORD0 };

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 7, pitch: -14 });
  const { app, stage } = scene;

  registerChunks(stage.device);

  // Both fragment shaders pull the same helpers in with #include "shaderShowcaseUtilsPS".
  const sphereMaterial = new pc.ShaderMaterial({
    uniqueName: 'ShaderCustomChunkSphere',
    vertexGLSL: VERTEX,
    attributes,
    fragmentGLSL: /* glsl */ `
      #include "shaderShowcaseUtilsPS"
      varying vec2 vUv0;
      uniform float uTime;
      uniform float uCount;
      void main(void) {
          float s = stripes(vUv0.y + uTime * 0.05, uCount, 0.1);
          gl_FragColor = vec4(cosinePalette(vUv0.x + uTime * 0.1) * s, 1.0);
      }
    `,
  });
  const torusMaterial = new pc.ShaderMaterial({
    uniqueName: 'ShaderCustomChunkTorus',
    vertexGLSL: VERTEX,
    attributes,
    fragmentGLSL: /* glsl */ `
      #include "shaderShowcaseUtilsPS"
      varying vec2 vUv0;
      uniform float uTime;
      uniform float uCount;
      void main(void) {
          float s = stripes(vUv0.x - uTime * 0.08, uCount, 0.2);
          gl_FragColor = vec4(mix(vec3(0.05, 0.08, 0.15), cosinePalette(vUv0.y * 2.0 + 0.3), s), 1.0);
      }
    `,
  });
  addShape(app, 'sphere', sphereMaterial, [-1.8, 0, 0], 2.8);
  addShape(app, 'torus', torusMaterial, [1.9, 0, 0], 2.4);

  let count = 10;
  onTick(app, (t) => {
    for (const m of [sphereMaterial, torusMaterial]) {
      m.setParameter('uTime', t);
      m.setParameter('uCount', count);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('stripe count (chunk function argument)', 2, 40, 1, count, (v) => (count = v));
  }

  return () => scene.dispose();
};

/** Registers the chunk on this device; a device belongs to one app, so nothing leaks between examples. */
function registerChunks(device: pc.GraphicsDevice): void {
  pc.ShaderChunks.get(device, pc.SHADERLANGUAGE_GLSL).set('shaderShowcaseUtilsPS', UTILS);
}

export default mount;
