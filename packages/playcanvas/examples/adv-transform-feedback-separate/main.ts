// Transform feedback with one buffer per varying, feeding an instanced swarm
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene, rng } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { showNotice } from '../../shared/notice.ts';
import { createPanel } from '../../shared/panel.ts';

const COUNT = 1500;

// Inputs are assigned ATTR0, ATTR1, ATTR2 in declaration order. Custom names throughout: a standard
// name such as vertex_position would collide with the first custom attribute at location 0.
const simulationGLSL = /* glsl */ `
    attribute vec4 aPosition;
    attribute vec4 aVelocity;
    attribute vec4 aConstants;    // x max speed, y turn rate, z wobble phase
    varying vec4 out_position;
    varying vec4 out_velocity;
    varying vec4 out_instance;    // xyz position, w heading: what the render pass reads
    uniform float deltaTime;
    uniform vec3 target;

    void main(void) {
        vec3 p = aPosition.xyz;
        vec3 v = aVelocity.xyz;
        vec3 toTarget = target - p;
        float dist = max(length(toTarget), 0.001);
        // seek the moving target, but orbit it instead of piling up on it
        vec3 around = normalize(cross(vec3(0.0, 1.0, 0.0), toTarget) + vec3(0.0001));
        vec3 wanted = (toTarget / dist) * clamp(dist - 1.5, -1.0, 1.0) + around * 1.0;
        wanted.y += sin(aConstants.z + p.x) * 0.3;
        v += (normalize(wanted) * aConstants.x - v) * aConstants.y * deltaTime;
        p += v * deltaTime;
        out_position = vec4(p, 1.0);
        out_velocity = vec4(v, 0.0);
        out_instance = vec4(p, atan(-v.z, v.x));
    }
`;

// The chunk builds the model matrix from the instance stream: yaw about Y, a quarter turn that lays
// the cone's tip along +X, and a uniform scale.
const instancingGLSL = /* glsl */ `
    attribute vec4 aInstance;
    mat4 getModelMatrix() {
        float c = cos(aInstance.w) * 0.22;
        float s = sin(aInstance.w) * 0.22;
        float k = 0.22;
        return mat4(vec4(0.0, -k, 0.0, 0.0), vec4(c, 0.0, -s, 0.0), vec4(s, 0.0, c, 0.0), vec4(aInstance.xyz, 1.0));
    }
`;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, distance: 20, pitch: -20, autoRotate: 8, clear: '#0d1018', sun: { angles: [60, 25, 0], shadows: false } });
  const { app, stage } = scene;
  const device = stage.device;
  if (!device.isWebGL2) {
    showNotice(el, 'Transform feedback is WebGL 2 only; on WebGPU the same job is done with compute shaders.');
    return () => scene.dispose();
  }

  const format = (semantic: string): pc.VertexFormat => new pc.VertexFormat(device, [{ semantic, components: 4, type: pc.TYPE_FLOAT32 }]);
  const gpu = (semantic: string, data?: Float32Array): pc.VertexBuffer =>
    new pc.VertexBuffer(device, format(semantic), COUNT, { usage: pc.BUFFER_GPUDYNAMIC, data });

  const rand = rng(33);
  const positions = new Float32Array(COUNT * 4);
  const velocities = new Float32Array(COUNT * 4);
  const constants = new Float32Array(COUNT * 4);
  for (let i = 0; i < COUNT; i++) {
    positions.set([(rand() - 0.5) * 16, (rand() - 0.5) * 6, (rand() - 0.5) * 16, 1], i * 4);
    velocities.set([(rand() - 0.5) * 2, 0, (rand() - 0.5) * 2, 0], i * 4);
    constants.set([2 + rand() * 3, 0.8 + rand() * 1.6, rand() * 6.28, 0], i * 4);
  }
  // read and written, swapped each step: positions and velocities. Read only: the constants.
  // Written only: the instance stream, which the simulation never reads back.
  const positionsIn = gpu(pc.SEMANTIC_ATTR0, positions);
  const positionsOut = gpu(pc.SEMANTIC_ATTR0);
  const velocitiesIn = gpu(pc.SEMANTIC_ATTR1, velocities);
  const velocitiesOut = gpu(pc.SEMANTIC_ATTR1);
  const constantsIn = gpu(pc.SEMANTIC_ATTR2, constants);
  const instances = gpu(pc.SEMANTIC_ATTR12);

  const shader = pc.TransformFeedback.createShader(
    device,
    simulationGLSL,
    'AdvSwarmSimulation',
    ['out_position', 'out_velocity', 'out_instance'], // the order of the output buffers
    pc.TRANSFORM_FEEDBACK_SEPARATE,
  );
  const feedback = new pc.TransformFeedback([
    { input: positionsIn, output: positionsOut },
    { input: velocitiesIn, output: velocitiesOut },
    { input: constantsIn },
    { output: instances },
  ]);

  const material = colorMaterial('#6ad6c1', { gloss: 0.5 });
  material.setAttribute('aInstance', pc.SEMANTIC_ATTR12);
  material.getShaderChunks(pc.SHADERLANGUAGE_GLSL).set('transformInstancingVS', instancingGLSL);
  material.update();
  const holder = new pc.Entity('swarm');
  holder.addComponent('render', { type: 'cone', material, castShadows: false });
  app.root.addChild(holder);
  const meshInstance = holder.render!.meshInstances[0]!;
  meshInstance.setInstancing(instances);
  meshInstance.instancingCount = COUNT;

  const dt = device.scope.resolve('deltaTime');
  const target = device.scope.resolve('target');
  const point = new Float32Array(3);
  let t = 0;
  let radius = 7;
  app.on('update', (delta: number) => {
    t += delta;
    point[0] = Math.cos(t * 0.5) * radius;
    point[1] = Math.sin(t * 0.8) * 2;
    point[2] = Math.sin(t * 0.5) * radius * 0.7;
    dt.setValue(Math.min(delta, 0.05));
    target.setValue(point);
    feedback.process(shader);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('target orbit radius', 0, 10, 0.5, radius, (v) => (radius = v));
    panel.slider('agents drawn', 100, COUNT, 100, COUNT, (v) => (meshInstance.instancingCount = v));
    panel.row();
    panel.readout(`${COUNT} agents: state, constants and the instance stream live in four GPU buffers`);
  }

  return () => {
    feedback.destroy();
    material.destroy();
    for (const b of [positionsIn, positionsOut, velocitiesIn, velocitiesOut, constantsIn, instances]) b.destroy();
    scene.dispose();
  };
};

export default mount;
