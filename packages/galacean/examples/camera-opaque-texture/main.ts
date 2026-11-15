// camera_OpaqueTexture: transparent objects sample what opaque ones drew
import { BlendFactor, Downsampling, Material, PrimitiveMesh, RenderQueueType, Shader, Vector2 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, pbr, spin, tick } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';

const VERT = `
attribute vec3 POSITION;
uniform mat4 renderer_MVPMat;
void main() { gl_Position = renderer_MVPMat * vec4(POSITION, 1.0); }`;

const FRAG = `
uniform sampler2D camera_OpaqueTexture;
uniform vec2 u_size;
uniform vec4 scene_ElapsedTime;
void main() {
  vec2 uv = gl_FragCoord.xy / u_size;
  vec2 wobble = vec2(sin(uv.y * 40.0 + scene_ElapsedTime.x * 2.0), cos(uv.x * 40.0 + scene_ElapsedTime.x * 2.0)) * 0.012;
  vec3 behind = texture2D(camera_OpaqueTexture, uv + wobble).rgb;
  gl_FragColor = vec4(behind * vec3(0.85, 1.0, 1.0) + 0.05, 1.0);
}`;

const OPTIONS = ['None', 'TwoX', 'FourX'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1, 7], target: [0, 0, 0] });
  const say = caption(stage);
  camera.opaqueTextureEnabled = true;
  add(root, PrimitiveMesh.createPlane(engine, 20, 20), blinn(engine, [0.35, 0.4, 0.5], 4), [0, -1.5, 0], 'floor');
  const shapes = [PrimitiveMesh.createSphere(engine, 0.9), PrimitiveMesh.createTorus(engine, 0.8, 0.3), PrimitiveMesh.createCuboid(engine, 1.3, 1.3, 1.3)].map((m, i) => {
    return add(root, m, pbr(engine, [0.95 - i * 0.3, 0.45 + i * 0.2, 0.3 + i * 0.3], 0, 0.4), [(i - 1) * 2.4, 0, -2], 'shape').entity;
  });
  shapes.forEach((e) => spin(e, [20, 40, 0]));
  const shader = Shader.find('gfx-camera-opaque-glass') ?? Shader.create('gfx-camera-opaque-glass', VERT, FRAG);
  const glass = new Material(engine, shader);
  const state = glass.renderState;
  state.renderQueueType = RenderQueueType.Transparent;
  state.depthState.writeEnabled = false;
  state.blendState.targetBlendState.enabled = true;
  state.blendState.targetBlendState.sourceColorBlendFactor = BlendFactor.SourceAlpha;
  state.blendState.targetBlendState.destinationColorBlendFactor = BlendFactor.OneMinusSourceAlpha;
  const pane = add(root, PrimitiveMesh.createPlane(engine, 4, 3), glass, [0, 0, 1], 'glass');
  pane.entity.transform.setRotation(90, 0, 0);
  const size = new Vector2();
  tick(root, () => {
    size.set(stage.canvas.width, stage.canvas.height);
    glass.shaderData.setVector2('u_size', size);
    pane.entity.transform.setPosition(Math.sin(engine.time.elapsedTime * 0.6) * 1.2, 0, 1);
  });
  const apply = (name: (typeof OPTIONS)[number]): void => {
    camera.opaqueTextureDownsampling = Downsampling[name];
    say(`opaqueTextureDownsampling = ${name}`);
  };
  apply('None');
  if (!stage.preview) select(stage.bar, 'opaqueTextureDownsampling', OPTIONS, apply);
  return stage.dispose;
};

export default mount;
