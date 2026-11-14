// MeshInstance.setParameter: one shared material, a different tint per instance
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const VERTEX = /* glsl */ `
attribute vec3 vertex_position;
attribute vec3 vertex_normal;
uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;
varying vec3 vNormal;
void main(void) {
    vNormal = mat3(matrix_model) * vertex_normal;
    gl_Position = matrix_viewProjection * matrix_model * vec4(vertex_position, 1.0);
}`;

const FRAGMENT = /* glsl */ `
uniform vec3 tint;
varying vec3 vNormal;
void main(void) {
    float shade = 0.35 + 0.65 * max(dot(normalize(vNormal), normalize(vec3(0.4, 0.8, 0.5))), 0.0);
    gl_FragColor = vec4(pow(tint * shade, vec3(1.0 / 2.2)), 1.0);
}`;

const hue = (h: number): [number, number, number] => [0.55 + 0.45 * Math.cos(h * 6.283), 0.55 + 0.45 * Math.cos((h + 0.33) * 6.283), 0.55 + 0.45 * Math.cos((h + 0.67) * 6.283)];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;

  // The material has no tint of its own; each mesh instance supplies the uniform.
  const material = new pc.ShaderMaterial({
    uniqueName: 'mesh-instance-tint',
    attributes: { vertex_position: pc.SEMANTIC_POSITION, vertex_normal: pc.SEMANTIC_NORMAL },
    vertexGLSL: VERTEX,
    fragmentGLSL: FRAGMENT,
  });
  material.setParameter('tint', [1, 1, 1]);
  const mesh = pc.Mesh.fromGeometry(device, new pc.SphereGeometry({ radius: 0.55, latitudeBands: 24, longitudeBands: 24 }));

  const columns = 6;
  const rows = 3;
  const instances: pc.MeshInstance[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const instance = new pc.MeshInstance(mesh, material);
      const entity = new pc.Entity();
      entity.addComponent('render', { meshInstances: [instance], castShadows: false });
      entity.setLocalPosition((c - (columns - 1) / 2) * 1.3, (r - 1) * 1.3, 0);
      app.root.addChild(entity);
      instances.push(instance);
    }
  }

  const camera = addCamera(app);
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0, 0), distance: 10, pitch: -8, yaw: 0, autoRotate: 6, interactive: !ctx.preview });

  const state = { speed: 0.25, spread: 0.06 };
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt * state.speed;
    instances.forEach((mi, i) => mi.setParameter('tint', hue(t + i * state.spread)));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('hue speed', 0, 1, 0.05, state.speed, (v) => (state.speed = v));
    panel.slider('hue offset per instance', 0, 0.2, 0.005, state.spread, (v) => (state.spread = v));
    panel.readout(`${instances.length} mesh instances, 1 mesh, 1 material`);
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
