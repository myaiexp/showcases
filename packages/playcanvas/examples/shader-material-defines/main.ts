// Material.setDefine: per-material #define flags and values pick variants
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';

// One description, three materials. The shader never says which palette it is: setDefine adds
// `#define PALETTE FIRE` (or ICE, TOXIC) and `#define USE_STRIPES` ahead of the source.
const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderMaterialDefines',
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

    vec3 palette(float x) {
        #if PALETTE == FIRE
            return mix(vec3(0.3, 0.02, 0.0), vec3(1.0, 0.85, 0.2), x);
        #elif PALETTE == ICE
            return mix(vec3(0.02, 0.1, 0.35), vec3(0.8, 0.97, 1.0), x);
        #else
            return mix(vec3(0.02, 0.2, 0.05), vec3(0.7, 1.0, 0.2), x);
        #endif
    }

    void main(void) {
        float v = 0.5 + 0.5 * sin(vUv0.y * 18.0 + sin(vUv0.x * 12.0 + uTime) * 1.5 - uTime * 2.0);
        #ifdef USE_STRIPES
            v = floor(v * 5.0) / 4.0;
        #endif
        gl_FragColor = vec4(palette(v), 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aUv0: pc.SEMANTIC_TEXCOORD0 },
};

const PALETTES = ['FIRE', 'ICE', 'TOXIC'] as const;

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 8, pitch: -12, autoRotate: 10 });
  const { app } = scene;

  const materials = PALETTES.map((palette) => {
    const material = new pc.ShaderMaterial(shaderDesc);
    material.setDefine('PALETTE', palette);
    return material;
  });
  materials.forEach((m, i) => addShape(app, 'sphere', m, [(i - 1) * 2.6, 0, 0], 2.3));

  let stripes = false;
  const applyStripes = (): void => materials.forEach((m) => (m.setDefine('USE_STRIPES', stripes), m.update()));
  applyStripes();

  onTick(app, (t) => {
    materials.forEach((m) => m.setParameter('uTime', t));
    // Cards flip the stripes on and off by themselves.
    const want = Math.floor(t / 2.5) % 2 === 1;
    if (ctx.preview && stripes !== want) {
      stripes = want;
      applyStripes();
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('USE_STRIPES defined', false, (on) => ((stripes = on), applyStripes()));
    panel.select('right sphere PALETTE', PALETTES, 'TOXIC', (palette) => {
      materials[2]!.setDefine('PALETTE', palette);
      materials[2]!.update();
    });
  }

  return () => scene.dispose();
};

export default mount;
