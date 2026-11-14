// requestSceneDepthMap exposes uSceneDepthMap, which a water plane reads to foam where it meets objects
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const VERTEX = /* glsl */ `
attribute vec3 vertex_position;
uniform mat4 matrix_model;
uniform mat4 matrix_view;
uniform mat4 matrix_viewProjection;
varying float vViewDepth;
varying vec2 vWorldXZ;
void main(void) {
    vec4 world = matrix_model * vec4(vertex_position, 1.0);
    vViewDepth = -(matrix_view * world).z;
    vWorldXZ = world.xz;
    gl_Position = matrix_viewProjection * world;
}`;

// getLinearScreenDepth() reads the captured depth map of this camera at the fragment's pixel.
const FRAGMENT = /* glsl */ `
#include "screenDepthPS"
uniform float uFade;
uniform float uTime;
varying float vViewDepth;
varying vec2 vWorldXZ;
void main(void) {
    float behind = getLinearScreenDepth() - vViewDepth;
    float foam = 1.0 - clamp(behind / uFade, 0.0, 1.0);
    float ripple = 0.5 + 0.5 * sin(vWorldXZ.x * 3.0 + vWorldXZ.y * 2.0 + uTime * 2.0);
    vec3 water = mix(vec3(0.02, 0.2, 0.35), vec3(0.05, 0.45, 0.6), clamp(behind / 3.0, 0.0, 1.0));
    vec3 colour = mix(water, vec3(0.9, 0.97, 1.0), foam * (0.6 + 0.4 * ripple));
    gl_FragColor = vec4(colour, mix(0.55, 0.95, foam));
}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.4, 0.42, 0.48);
  addSun(app, 55, 30);

  // Rocks and a column poking through the water, over a sandy floor.
  addShape(app, 'plane', '#b79d6b', [0, -1, 0], [30, 1, 30]);
  addShape(app, 'sphere', '#8a8f99', [-2, 0, 1], 3);
  addShape(app, 'box', '#6b7280', [2.2, 0.2, -1], [2, 3, 2]);
  addShape(app, 'cylinder', '#cfd5e1', [0.5, 0.5, 3], [1, 4, 1]);
  addShape(app, 'sphere', '#8a8f99', [-4, -0.5, -3], 2);

  const water = new pc.ShaderMaterial({
    uniqueName: 'depth-layer-water',
    attributes: { vertex_position: pc.SEMANTIC_POSITION },
    vertexGLSL: VERTEX,
    fragmentGLSL: FRAGMENT,
  });
  water.blendType = pc.BLEND_NORMAL;
  water.depthWrite = false;
  water.setParameter('uFade', 0.6);
  water.setParameter('uTime', 0);
  const surface = new pc.Entity('water');
  surface.addComponent('render', { type: 'plane', material: water, castShadows: false, receiveShadows: false });
  surface.setLocalScale(30, 1, 30);
  surface.setLocalPosition(0, 0.1, 0);
  app.root.addChild(surface);

  const camera = addCamera(app, { clearColor: new pc.Color(0.5, 0.65, 0.8) });
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0, 0), distance: 11, pitch: -28, autoRotate: 8, interactive: !ctx.preview });
  // The camera only captures the depth map once a script asks for it.
  camera.camera!.requestSceneDepthMap(true);

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    water.setParameter('uTime', t);
    surface.setLocalPosition(0, 0.1 + Math.sin(t * 0.7) * 0.25, 0);
  });

  if (!ctx.preview) {
    createPanel(el).slider('foam width', 0.1, 2.5, 0.05, 0.6, (v) => water.setParameter('uFade', v));
  }

  return () => {
    orbit.dispose();
    camera.camera!.requestSceneDepthMap(false);
    stage.dispose();
  };
};

export default mount;
