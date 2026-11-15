// DepthTextureMode.PrePass: water that foams where scene depth meets it
import { BlendFactor, DepthTextureMode, Material, PrimitiveMesh, RenderQueueType, Shader, Vector2 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, pbr, tick } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';

const VERT = `
attribute vec3 POSITION;
uniform mat4 renderer_MVPMat;
void main() { gl_Position = renderer_MVPMat * vec4(POSITION, 1.0); }`;

const FRAG = `
uniform sampler2D camera_DepthTexture;
uniform vec4 camera_DepthBufferParams;
uniform vec2 u_size;
uniform float u_foam;
float linear01(float z) { return 1.0 / (camera_DepthBufferParams.x * z + camera_DepthBufferParams.y); }
void main() {
  vec2 uv = gl_FragCoord.xy / u_size;
  float scene = linear01(texture2D(camera_DepthTexture, uv).r);
  float self = linear01(gl_FragCoord.z);
  float gap = (scene - self) * 60.0 * u_foam;
  float edge = 1.0 - smoothstep(0.0, 0.35, gap);
  vec3 water = mix(vec3(0.02, 0.18, 0.3), vec3(0.15, 0.55, 0.7), clamp(gap * 0.4, 0.0, 1.0));
  gl_FragColor = vec4(mix(water, vec3(1.0), edge), 0.35 + 0.6 * edge);
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 4, 8], target: [0, 0, 0], hint: 'Transparent objects do not write to the depth texture, so only the opaque shapes shape the foam.' });
  const say = caption(stage);
  camera.depthTextureMode = DepthTextureMode.PrePass;
  add(root, PrimitiveMesh.createPlane(engine, 16, 16), blinn(engine, [0.45, 0.4, 0.3], 4), [0, -1.4, 0], 'seabed');
  const rocks = [[-2.5, 0.2], [0.5, -0.8], [2.8, 0.6]].map(([x, z], i) => add(root, i === 1 ? PrimitiveMesh.createCuboid(engine, 1.6, 3, 1.6) : PrimitiveMesh.createSphere(engine, 1.1 + i * 0.1), pbr(engine, [0.5, 0.45 + i * 0.1, 0.4], 0, 0.8), [x!, -0.3, z!], 'rock').entity);
  const shader = Shader.find('gfx-camera-depth-water') ?? Shader.create('gfx-camera-depth-water', VERT, FRAG);
  const water = new Material(engine, shader);
  const state = water.renderState;
  state.renderQueueType = RenderQueueType.Transparent;
  state.depthState.writeEnabled = false;
  state.blendState.targetBlendState.enabled = true;
  state.blendState.targetBlendState.sourceColorBlendFactor = BlendFactor.SourceAlpha;
  state.blendState.targetBlendState.destinationColorBlendFactor = BlendFactor.OneMinusSourceAlpha;
  const size = new Vector2();
  water.shaderData.setFloat('u_foam', 1);
  add(root, PrimitiveMesh.createPlane(engine, 16, 16, 1, 1), water, [0, 0, 0], 'water');
  const apply = (on: boolean): void => {
    camera.depthTextureMode = on ? DepthTextureMode.PrePass : DepthTextureMode.None;
    water.shaderData.setFloat('u_foam', on ? 1 : 0);
    say(`depthTextureMode = ${on ? 'PrePass' : 'None'}`);
  };
  tick(root, (_dt, t) => {
    size.set(stage.canvas.width, stage.canvas.height);
    water.shaderData.setVector2('u_size', size);
    rocks.forEach((r, i) => r.transform.setPosition(r.transform.position.x, -0.3 + Math.sin(t * 0.8 + i * 2) * 0.5, r.transform.position.z));
  });
  apply(true);
  if (!stage.preview) checkbox(stage.bar, 'depthTextureMode = PrePass', true, apply);
  return stage.dispose;
};

export default mount;
