// Position-and-scale instancing format read by a transformInstancingVS override
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene, rng } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

const COUNT = 3000;

// The chunk the engine includes when INSTANCING is on: it must provide getModelMatrix().
const chunkGLSL = /* glsl */ `
    attribute vec3 aInstPosition;
    attribute float aInstScale;

    mat4 getModelMatrix() {
        return mat4(
            vec4(aInstScale, 0.0, 0.0, 0.0),
            vec4(0.0, aInstScale, 0.0, 0.0),
            vec4(0.0, 0.0, aInstScale, 0.0),
            vec4(aInstPosition, 1.0)
        );
    }
`;
const chunkWGSL = /* wgsl */ `
    attribute aInstPosition: vec3f;
    attribute aInstScale: f32;

    fn getModelMatrix() -> mat4x4f {
        return mat4x4f(
            vec4f(aInstScale, 0.0, 0.0, 0.0),
            vec4f(0.0, aInstScale, 0.0, 0.0),
            vec4f(0.0, 0.0, aInstScale, 0.0),
            vec4f(aInstPosition, 1.0)
        );
    }
`;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, distance: 18, pitch: -20, autoRotate: 12 });
  const { app } = scene;
  const device = app.graphicsDevice;

  // 16 bytes per instance (three floats of position, one of scale) instead of 64 for a Mat4.
  const format = new pc.VertexFormat(device, [
    { semantic: pc.SEMANTIC_ATTR12, components: 3, type: pc.TYPE_FLOAT32 },
    { semantic: pc.SEMANTIC_ATTR13, components: 1, type: pc.TYPE_FLOAT32 },
  ]);
  const rand = rng(11);
  const data = new Float32Array(COUNT * 4);
  for (let i = 0; i < COUNT; i++) {
    // a lumpy ball of small cubes
    const r = Math.cbrt(rand()) * 7;
    const a = rand() * Math.PI * 2;
    const y = rand() * 2 - 1;
    const s = Math.sqrt(1 - y * y);
    data.set([Math.cos(a) * s * r, y * r, Math.sin(a) * s * r, 0.1 + rand() * 0.16], i * 4);
  }
  const buffer = new pc.VertexBuffer(device, format, COUNT, { data });

  // The material maps the attribute names in the chunk to the format's semantics.
  const material = colorMaterial('#a78bfa', { gloss: 0.6 });
  material.setAttribute('aInstPosition', pc.SEMANTIC_ATTR12);
  material.setAttribute('aInstScale', pc.SEMANTIC_ATTR13);
  material.getShaderChunks(pc.SHADERLANGUAGE_GLSL).set('transformInstancingVS', chunkGLSL);
  material.getShaderChunks(pc.SHADERLANGUAGE_WGSL).set('transformInstancingVS', chunkWGSL);
  material.update();

  const holder = new pc.Entity('custom instances');
  holder.addComponent('render', { type: 'box', material, castShadows: false });
  app.root.addChild(holder);
  const meshInstance = holder.render!.meshInstances[0]!;
  meshInstance.setInstancing(buffer);
  meshInstance.instancingCount = COUNT;

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('instancingCount', 0, COUNT, 100, COUNT, (v) => (meshInstance.instancingCount = v));
    panel.readout(`${buffer.numBytes / COUNT} bytes per instance (a Mat4 takes 64), ${(buffer.numBytes / 1024).toFixed(0)} KB in the buffer`);
  }

  return () => {
    material.destroy();
    buffer.destroy();
    scene.dispose();
  };
};

export default mount;
