// A ShaderMaterial with an INSTANCING branch and per-instance colour
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene, rng } from '../../shared/advanced.ts';
import { createPanel } from '../../shared/panel.ts';
import type { ShaderDesc } from '../../shared/shaders.ts';

const COUNT = 2500;

// INSTANCING is defined when the mesh instance has an instancing buffer, so the same shader
// also draws a plain mesh (position and colour then come from uniforms).
const shaderDesc: ShaderDesc = {
  uniqueName: 'AdvInstancingShaderColour',
  vertexGLSL: /* glsl */ `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;
    uniform float uTime;
    uniform float uBob;
    #ifdef INSTANCING
        attribute vec4 aInstPosScale;   // xyz position, w scale
        attribute vec3 aInstColor;
    #endif
    varying vec3 vColor;
    varying vec3 vNormal;

    void main(void) {
        vec3 offset = vec3(0.0);
        float scale = 1.0;
        vColor = vec3(0.8);
        #ifdef INSTANCING
            offset = aInstPosScale.xyz;
            scale = aInstPosScale.w;
            offset.y += sin(uTime * 2.0 + offset.x * 0.9 + offset.z * 0.7) * uBob;
            vColor = aInstColor;
        #endif
        vec4 world = matrix_model * vec4(aPosition * scale + offset, 1.0);
        vNormal = mat3(matrix_model) * aNormal;
        gl_Position = matrix_viewProjection * world;
    }
  `,
  fragmentGLSL: /* glsl */ `
    varying vec3 vColor;
    varying vec3 vNormal;
    void main(void) {
        float light = 0.35 + 0.65 * max(dot(normalize(vNormal), normalize(vec3(0.4, 0.8, 0.5))), 0.0);
        gl_FragColor = vec4(vColor * light, 1.0);
    }
  `,
  attributes: {
    aPosition: pc.SEMANTIC_POSITION,
    aNormal: pc.SEMANTIC_NORMAL,
    aInstPosScale: pc.SEMANTIC_ATTR12,
    aInstColor: pc.SEMANTIC_ATTR13,
  },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, sun: undefined, clear: '#0c0f16', distance: 17, pitch: -22, autoRotate: 14 });
  const { app } = scene;
  const device = app.graphicsDevice;

  // Per instance: position and scale (4 floats), then a colour (3 floats), interleaved.
  const format = new pc.VertexFormat(device, [
    { semantic: pc.SEMANTIC_ATTR12, components: 4, type: pc.TYPE_FLOAT32 },
    { semantic: pc.SEMANTIC_ATTR13, components: 3, type: pc.TYPE_FLOAT32 },
  ]);
  const rand = rng(5);
  const data = new Float32Array(COUNT * 7);
  const colour = new pc.Color();
  const inner = new pc.Color().fromString('#ff7a45');
  const outer = new pc.Color().fromString('#6aa7ff');
  for (let i = 0; i < COUNT; i++) {
    // a flat spiral galaxy: colour follows the radius
    const arm = i % 3;
    const r = 0.8 + Math.pow(rand(), 0.7) * 9;
    const a = r * 0.6 + (arm * Math.PI * 2) / 3 + (rand() - 0.5) * 0.5;
    colour.lerp(inner, outer, Math.min(r / 10, 1));
    data.set([Math.cos(a) * r, (rand() - 0.5) * 1.2, Math.sin(a) * r, 0.05 + rand() * 0.1, colour.r, colour.g, colour.b], i * 7);
  }
  const buffer = new pc.VertexBuffer(device, format, COUNT, { data });

  const material = new pc.ShaderMaterial(shaderDesc);
  material.setParameter('uBob', 0.15);
  const holder = new pc.Entity('stars');
  holder.addComponent('render', { type: 'sphere', material, castShadows: false });
  app.root.addChild(holder);
  const meshInstance = holder.render!.meshInstances[0]!;
  meshInstance.setInstancing(buffer);
  meshInstance.instancingCount = COUNT;

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    material.setParameter('uTime', t);
    holder.setLocalEulerAngles(0, t * 4, 0);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('instancingCount', 0, COUNT, 100, COUNT, (v) => (meshInstance.instancingCount = v));
    panel.slider('bob', 0, 0.6, 0.01, 0.15, (v) => material.setParameter('uBob', v));
  }

  return () => {
    material.destroy();
    buffer.destroy();
    scene.dispose();
  };
};

export default mount;
