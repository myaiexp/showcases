// camera.setReplacementShader overrides every material the camera draws
import { PrimitiveMesh, Shader } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, pbr, spin, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';

const VERT = `
attribute vec3 POSITION;
attribute vec3 NORMAL;
uniform mat4 renderer_MVPMat;
uniform mat4 renderer_NormalMat;
varying vec3 v_normal;
void main() {
  v_normal = normalize((renderer_NormalMat * vec4(NORMAL, 0.0)).xyz);
  gl_Position = renderer_MVPMat * vec4(POSITION, 1.0);
}`;

const FRAG = `
varying vec3 v_normal;
void main() { gl_FragColor = vec4(normalize(v_normal) * 0.5 + 0.5, 1.0); }`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 2, 8], target: [0, 0, 0], hint: 'One shader replaces every material the camera draws.' });
  const say = caption(stage);
  add(root, PrimitiveMesh.createPlane(engine, 14, 14), blinn(engine, [0.4, 0.45, 0.55], 4), [0, -1.2, 0], 'floor');
  const meshes = [PrimitiveMesh.createSphere(engine, 1), PrimitiveMesh.createTorus(engine, 0.9, 0.35), PrimitiveMesh.createCone(engine, 0.9, 2), PrimitiveMesh.createCapsule(engine, 0.6, 1.2)];
  meshes.forEach((m, i) => spin(add(root, m, pbr(engine, [0.9 - i * 0.2, 0.4 + i * 0.15, 0.3 + i * 0.2], 0, 0.5), [(i - 1.5) * 2.4, 0, 0]).entity, [15, 40, 0]));
  const normals = Shader.find('gfx-camera-normals') ?? Shader.create('gfx-camera-normals', VERT, FRAG);
  const apply = (on: boolean): void => {
    if (on) camera.setReplacementShader(normals);
    else camera.resetReplacementShader();
    say(on ? 'setReplacementShader(normals)' : 'resetReplacementShader()');
  };
  if (stage.preview) steps(camera.entity, 2.5, 2, (i) => apply(i === 1));
  else {
    apply(true);
    checkbox(stage.bar, 'replacement shader on', true, apply);
  }
  return stage.dispose;
};

export default mount;
