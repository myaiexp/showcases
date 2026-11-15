// renderer.shaderData carries per-renderer values for a shared material
import { Color, Material, MeshRenderer, PrimitiveMesh, Shader } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, tick } from '../../shared/gfx-kit.ts';

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
uniform vec4 u_tint;
varying vec3 v_normal;
void main() {
  float lit = 0.35 + 0.65 * max(dot(normalize(v_normal), normalize(vec3(0.4, 0.8, 0.5))), 0.0);
  gl_FragColor = vec4(u_tint.rgb * lit, 1.0);
}`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.5, 7], target: [0, 0, 0], light: false });
  const say = caption(stage);
  const shader = Shader.find('gfx-renderer-tint') ?? Shader.create('gfx-renderer-tint', VERT, FRAG);
  const shared = new Material(engine, shader);
  const mesh = PrimitiveMesh.createSphere(engine, 0.8, 24);
  const renderers = [0, 1, 2, 3, 4].map((i) => {
    const entity = root.createChild('ball');
    entity.transform.setPosition((i - 2) * 1.8, 0, 0);
    const r = entity.addComponent(MeshRenderer);
    r.mesh = mesh;
    r.setMaterial(shared);
    return r;
  });
  tick(root, (_dt, t) => {
    renderers.forEach((r, i) => {
      const h = t * 0.5 + i / 5;
      r.shaderData.setColor('u_tint', new Color(0.5 + 0.5 * Math.cos(h * 6.283), 0.5 + 0.5 * Math.cos((h + 0.33) * 6.283), 0.5 + 0.5 * Math.cos((h + 0.67) * 6.283), 1));
    });
    say('renderer.shaderData.setColor("u_tint", ...) per renderer, one shared Material');
  });
  stage.own(() => mesh.destroy());
  return stage.dispose;
};

export default mount;
