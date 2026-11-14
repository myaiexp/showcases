// Transform feedback: a GPU particle simulation kept in one interleaved buffer
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene, rng } from '../../shared/advanced.ts';
import { showNotice } from '../../shared/notice.ts';
import { createPanel } from '../../shared/panel.ts';
import type { ShaderDesc } from '../../shared/shaders.ts';

const COUNT = 60000;

// The simulation: attributes in, varyings named out_* are captured into the output buffer.
// xyz is the position and w the remaining life; a dead particle respawns near the ground.
const simulationGLSL = /* glsl */ `
    attribute vec4 vertex_position;
    varying vec4 out_vertex_position;
    uniform float deltaTime;
    uniform float swirl;
    uniform float lift;

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main(void) {
        vec3 pos = vertex_position.xyz;
        float life = vertex_position.w - deltaTime;
        if (life <= 0.0) {
            float a = hash(pos.xz + life) * 6.2831853;
            float r = sqrt(hash(pos.zx * 1.7 + a)) * 1.6;
            pos = vec3(cos(a) * r, 0.0, sin(a) * r);
            life = 1.5 + hash(vec2(a, r)) * 3.0;
        } else {
            float angle = swirl * deltaTime / (0.6 + length(pos.xz));
            float c = cos(angle);
            float s = sin(angle);
            pos.xz = mat2(c, -s, s, c) * pos.xz;
            pos.y += lift * deltaTime * (0.6 + 0.4 * sin(life * 3.0 + pos.x));
            pos.xz *= 1.0 + deltaTime * 0.12;
        }
        out_vertex_position = vec4(pos, life);
    }
`;

// Drawing the same buffer as points: it is bound as an ordinary vertex stream.
const pointsDesc: ShaderDesc = {
  uniqueName: 'AdvTransformFeedbackPoints',
  vertexGLSL: /* glsl */ `
    attribute vec4 aState;
    uniform mat4 matrix_viewProjection;
    varying float vLife;
    void main(void) {
        vLife = aState.w;
        gl_Position = matrix_viewProjection * vec4(aState.xyz, 1.0);
        gl_PointSize = 1.5 + clamp(aState.w, 0.0, 2.0) * 1.2;
    }
  `,
  fragmentGLSL: /* glsl */ `
    varying float vLife;
    void main(void) {
        vec2 c = gl_PointCoord - 0.5;
        if (dot(c, c) > 0.25) discard;
        vec3 hot = vec3(1.0, 0.75, 0.3);
        vec3 cool = vec3(0.3, 0.45, 1.0);
        gl_FragColor = vec4(mix(cool, hot, clamp(vLife / 3.0, 0.0, 1.0)) * 0.55, 1.0);
    }
  `,
  attributes: { aState: pc.SEMANTIC_POSITION },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, sun: undefined, clear: '#07090f', distance: 9, pitch: -20, target: new pc.Vec3(0, 2.5, 0) });
  const { app, stage } = scene;
  const device = stage.device;
  if (!device.isWebGL2) {
    showNotice(el, 'Transform feedback is WebGL 2 only; on WebGPU the same job is done with compute shaders.');
    return () => scene.dispose();
  }

  // The state buffer: position and life per particle, GPU-dynamic because the GPU rewrites it.
  const rand = rng(21);
  const data = new Float32Array(COUNT * 4);
  for (let i = 0; i < COUNT; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * 3;
    data.set([Math.cos(a) * r, rand() * 5, Math.sin(a) * r, rand() * 4], i * 4);
  }
  const format = new pc.VertexFormat(device, [{ semantic: pc.SEMANTIC_POSITION, components: 4, type: pc.TYPE_FLOAT32 }]);
  const buffer = new pc.VertexBuffer(device, format, COUNT, { usage: pc.BUFFER_GPUDYNAMIC, data });
  const mesh = new pc.Mesh(device);
  mesh.vertexBuffer = buffer;
  mesh.primitive[0] = { type: pc.PRIMITIVE_POINTS, base: 0, baseVertex: 0, count: COUNT, indexed: false };

  const material = new pc.ShaderMaterial(pointsDesc);
  material.blendState = new pc.BlendState(true, pc.BLENDEQUATION_ADD, pc.BLENDMODE_ONE, pc.BLENDMODE_ONE);
  material.depthWrite = false;
  const meshInstance = new pc.MeshInstance(mesh, material, new pc.GraphNode('particles'));
  meshInstance.cull = false;
  const holder = new pc.Entity('particles');
  holder.addComponent('render', { meshInstances: [meshInstance], castShadows: false });
  app.root.addChild(holder);

  const shader = pc.TransformFeedback.createShader(device, simulationGLSL, 'AdvParticleSimulation');
  const feedback = new pc.TransformFeedback(buffer);
  const dt = device.scope.resolve('deltaTime');
  const swirl = device.scope.resolve('swirl');
  const lift = device.scope.resolve('lift');
  let swirlValue = 1.4;
  let liftValue = 1.2;
  app.on('update', (delta: number) => {
    dt.setValue(Math.min(delta, 0.05));
    swirl.setValue(swirlValue);
    lift.setValue(liftValue);
    // process() runs the shader without rasterising, then swaps the buffers: `buffer` holds the new state.
    feedback.process(shader);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('swirl', -4, 4, 0.1, swirlValue, (v) => (swirlValue = v));
    panel.slider('lift', 0, 3, 0.1, liftValue, (v) => (liftValue = v));
    panel.slider('points drawn', 1000, COUNT, 1000, COUNT, (v) => (mesh.primitive[0]!.count = v));
    panel.row();
    panel.readout(`${COUNT} particles simulated on the GPU, nothing read back`);
  }

  return () => {
    feedback.destroy();
    meshInstance.destroy();
    material.destroy();
    buffer.destroy();
    scene.dispose();
  };
};

export default mount;
