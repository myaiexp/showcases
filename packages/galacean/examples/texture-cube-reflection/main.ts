// TextureCube sampled with textureCube(direction): environment reflection
import { BackgroundMode, Material, PrimitiveMesh, Shader, SkyBoxMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, demo, orbit, spin } from '../../shared/gfx-kit.ts';
import { duskSky, shadedCube } from '../../shared/gfx-cube.ts';

const VERT = `
attribute vec3 POSITION;
attribute vec3 NORMAL;
uniform mat4 renderer_MVPMat;
uniform mat4 renderer_ModelMat;
uniform mat4 renderer_NormalMat;
varying vec3 v_normal;
varying vec3 v_world;
void main() {
  v_normal = normalize((renderer_NormalMat * vec4(NORMAL, 0.0)).xyz);
  v_world = (renderer_ModelMat * vec4(POSITION, 1.0)).xyz;
  gl_Position = renderer_MVPMat * vec4(POSITION, 1.0);
}`;

const FRAG = `
uniform samplerCube u_cube;
uniform vec3 camera_Position;
varying vec3 v_normal;
varying vec3 v_world;
void main() {
  vec3 r = reflect(normalize(v_world - camera_Position), normalize(v_normal));
  vec3 c = textureCube(u_cube, vec3(-r.x, r.y, r.z)).rgb;
  gl_FragColor = vec4(pow(c, vec3(1.0 / 2.2)), 1.0);
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0.6, 5], light: false, hint: 'The sky and both reflections come from one TextureCube.' });
  const cube = shadedCube(engine, 128, duskSky);
  stage.own(() => cube.destroy());
  const sky = new SkyBoxMaterial(engine);
  sky.texture = cube;
  const { background } = stage.scene;
  background.mode = BackgroundMode.Sky;
  background.sky.material = sky;
  background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2);
  const shader = Shader.find('gfx-cube-reflection') ?? Shader.create('gfx-cube-reflection', VERT, FRAG);
  const mirror = new Material(engine, shader);
  mirror.shaderData.setTexture('u_cube', cube);
  spin(add(root, PrimitiveMesh.createSphere(engine, 1, 48), mirror, [-0.6, 0, 0]).entity, [0, 15, 0]);
  spin(add(root, PrimitiveMesh.createTorus(engine, 0.55, 0.22, 24, 48), mirror, [1.5, 0.2, 0.4]).entity, [40, 20, 0]);
  orbit(camera.entity, [0, 0, 0], 5, 0.8, 0.3);
  return stage.dispose;
};

export default mount;
