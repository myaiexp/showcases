// Looped include: #include "chunk, COUNT" repeats a chunk with {i} counting
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';

// The chunk body, with {i} where the loop counter goes. Expanded RING_COUNT times it becomes
// ring0, ring1, ring2... each a separate block of code, with no GLSL loop involved.
const RING = /* glsl */ `
    {
        float radius{i} = (float({i}) + 1.0) / float(RING_COUNT) * 0.5;
        float width{i} = 0.012 + 0.01 * sin(uTime + float({i}));
        float hit{i} = 1.0 - smoothstep(width{i}, width{i} + 0.01, abs(length(centered) - radius{i}));
        vec3 tone{i} = 0.5 + 0.5 * cos(6.2831853 * (float({i}) / float(RING_COUNT) + vec3(0.0, 0.33, 0.67)));
        color = mix(color, tone{i}, hit{i});
    }
`;

const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderLoopedInclude',
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
        vec2 centered = vUv0 - 0.5;
        vec3 color = vec3(0.05, 0.06, 0.1);
        #include "ringPS, RING_COUNT"
        gl_FragColor = vec4(color, 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aUv0: pc.SEMANTIC_TEXCOORD0 },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 8, pitch: -15, autoRotate: 8 });
  const { app, stage } = scene;

  pc.ShaderChunks.get(stage.device, pc.SHADERLANGUAGE_GLSL).set('ringPS', RING);

  const material = new pc.ShaderMaterial(shaderDesc);
  // The count comes from a define, so every material can expand the chunk a different number of times.
  const setCount = (n: number): void => {
    material.setDefine('RING_COUNT', String(n));
    material.update();
  };
  setCount(5);
  // uv0 spans each shape once, so the rings centre on the middle of its uv square.
  addShape(app, 'sphere', material, [-2.6, 0, 0], 2.4);
  addShape(app, 'box', material, [0, 0, 0], 2);
  addShape(app, 'cylinder', material, [2.6, 0, 0], [2, 2.2, 2]);

  let count = 5;
  onTick(app, (t) => {
    material.setParameter('uTime', t);
    if (ctx.preview) {
      const next = 2 + (Math.floor(t / 1.5) % 7);
      if (next !== count) setCount((count = next));
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('RING_COUNT (include repeats)', 1, 9, 1, 5, (v) => setCount((count = v)));
  }

  return () => scene.dispose();
};

export default mount;
