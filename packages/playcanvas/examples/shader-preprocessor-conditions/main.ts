// Preprocessor conditions: #if comparisons, && / !, #define values and #undef
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';

// The shader source is full of directives; the engine resolves them before compiling, so the
// variant a material gets only contains the branches its defines select.
const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderPreprocessorConditions',
  vertexGLSL: /* glsl */ `
    attribute vec3 aPosition;
    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;
    varying vec3 vLocal;
    void main(void) {
        vLocal = aPosition;
        gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
    }
  `,
  fragmentGLSL: /* glsl */ `
    // QUALITY is set from the application: 0, 1 or 2. Comparisons choose how many octaves to sum.
    #if QUALITY == 0
        #define OCTAVES 1
    #elif QUALITY == 1
        #define OCTAVES 3
    #else
        #define OCTAVES 6
    #endif

    // an in-source define with a value, removed again by #undef for the debug tint below
    #define BASE_TINT 0.6
    #if QUALITY >= 2
        #undef BASE_TINT
        #define BASE_TINT 0.9
    #endif

    varying vec3 vLocal;
    uniform float uTime;

    float hash(vec3 p) {
        return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
    }
    float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
            mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
            mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
            f.z);
    }

    void main(void) {
        float sum = 0.0;
        float amp = 0.5;
        vec3 p = vLocal * 4.0 + vec3(0.0, uTime * 0.3, 0.0);
        for (int i = 0; i < OCTAVES; i++) {
            sum += noise(p) * amp;
            p *= 2.0;
            amp *= 0.5;
        }
        vec3 color = vec3(sum * BASE_TINT * 1.6);

        #if defined(GLOW) && !defined(FLAT)
            color += vec3(1.0, 0.45, 0.1) * pow(sum, 3.0) * 2.0;
        #endif
        #if defined(FLAT) || QUALITY == 0
            color = floor(color * 4.0) / 4.0;
        #endif
        gl_FragColor = vec4(color, 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 4.5, pitch: -12 });
  const { app } = scene;
  const material = new pc.ShaderMaterial(shaderDesc);
  addShape(app, 'sphere', material, [0, 0, 0], 3);

  const state = { quality: 1, glow: true, flat: false };
  const apply = (): void => {
    material.setDefine('QUALITY', String(state.quality));
    material.setDefine('GLOW', state.glow);
    material.setDefine('FLAT', state.flat);
    material.update();
  };
  apply();

  onTick(app, (t) => {
    material.setParameter('uTime', t);
    if (ctx.preview) {
      const q = Math.floor(t / 2) % 3;
      if (q !== state.quality) {
        state.quality = q;
        apply();
      }
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('QUALITY', ['0', '1', '2'] as const, '1', (v) => ((state.quality = Number(v)), apply()));
    panel.check('GLOW', true, (on) => ((state.glow = on), apply()));
    panel.check('FLAT', false, (on) => ((state.flat = on), apply()));
    panel.readout('GLOW only applies when FLAT is not defined');
  }

  return () => scene.dispose();
};

export default mount;
