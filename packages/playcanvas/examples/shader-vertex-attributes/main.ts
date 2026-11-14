// Vertex attributes in a ShaderMaterial: normals displace a blob
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addGeometry, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';

// Every `attribute` declared in the vertex shader must have a SEMANTIC_ entry in `attributes`
// under the same name. Each name below is bound to one of the mesh's vertex streams.
const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderVertexAttributes',
  vertexGLSL: /* glsl */ `
    attribute vec3 aPosition;   // SEMANTIC_POSITION
    attribute vec3 aNormal;     // SEMANTIC_NORMAL
    attribute vec2 aUv0;        // SEMANTIC_TEXCOORD0

    uniform mat4 matrix_model;
    uniform mat3 matrix_normal;
    uniform mat4 matrix_viewProjection;
    uniform float uTime;
    uniform float uAmount;

    varying float vDisplacement;
    varying vec3 vNormalW;
    varying vec2 vUv0;

    void main(void) {
        // push each vertex along its own normal by a travelling wave over the surface
        float wave = sin(aPosition.x * 7.0 + uTime * 2.0) * sin(aPosition.y * 6.0 - uTime * 1.5) * sin(aPosition.z * 8.0 + uTime);
        vDisplacement = wave;
        vec3 displaced = aPosition + aNormal * wave * uAmount;
        vNormalW = normalize(matrix_normal * aNormal);
        vUv0 = aUv0;
        gl_Position = matrix_viewProjection * matrix_model * vec4(displaced, 1.0);
    }
  `,
  fragmentGLSL: /* glsl */ `
    varying float vDisplacement;
    varying vec3 vNormalW;
    varying vec2 vUv0;
    void main(void) {
        float light = 0.45 + 0.55 * max(dot(normalize(vNormalW), normalize(vec3(0.5, 0.8, 0.4))), 0.0);
        vec3 low = vec3(0.1, 0.25, 0.8);
        vec3 high = vec3(1.0, 0.55, 0.2);
        vec3 color = mix(low, high, vDisplacement * 0.5 + 0.5);
        float latitude = step(0.5, fract(vUv0.y * 12.0));   // uv0 draws faint rings
        gl_FragColor = vec4(color * light * (0.85 + 0.15 * latitude), 1.0);
    }
  `,
  attributes: {
    aPosition: pc.SEMANTIC_POSITION,
    aNormal: pc.SEMANTIC_NORMAL,
    aUv0: pc.SEMANTIC_TEXCOORD0,
  },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 4.5, pitch: -15 });
  const { app } = scene;
  const material = new pc.ShaderMaterial(shaderDesc);
  material.setParameter('uAmount', 0.18);
  addGeometry(app, new pc.SphereGeometry({ radius: 1.1, latitudeBands: 64, longitudeBands: 64 }), material);

  onTick(app, (t) => material.setParameter('uTime', t));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('uAmount', 0, 0.5, 0.01, 0.18, (v) => material.setParameter('uAmount', v));
  }

  return () => scene.dispose();
};

export default mount;
