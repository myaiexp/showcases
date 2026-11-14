// GsplatRelighting: splats lit through a proxy mesh on its own layer
import * as pc from 'playcanvas';
// The script ships as plain JavaScript without type definitions.
// @ts-expect-error untyped module
import { GSplatRelighting } from 'playcanvas/scripts/esm/gsplat/gsplat-relighting.mjs';
import type { Mount } from '@/types.ts';
import { boxCloud, cloudContainer, createSplatScene, discShellCloud, type SplatCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

interface Relighting {
  blend: number;
  brightness: number;
  background: number;
  readonly layer: pc.Layer;
  configureMaterial(material: pc.Material): void;
}

/** Splats are captured with their light baked in: here a flat, even grey, so the new light is all you see. */
function grey(cloud: SplatCloud): SplatCloud {
  for (let i = 0; i < cloud.count; i++) cloud.colors.set([0.8, 0.8, 0.82, 1], i * 4);
  return cloud;
}

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 8, pitch: -22, autoRotate: 7 });
  const { app, camera } = scene;
  const device = scene.stage.device;

  // The splat scene: a cube and a ball.
  scene.add(cloudContainer(device, grey(boxCloud(9000, 0.9, 11, 0.07))), 'cube-splats').setPosition(-1.7, 0, 0);
  scene.add(cloudContainer(device, grey(discShellCloud(2600, 1))), 'ball-splats').setPosition(1.7, 0, 0);

  // The script goes on the camera that renders the splats.
  camera.addComponent('script');
  const relighting = camera.script!.create(GSplatRelighting, { properties: { blend: 1, brightness: 1.5 } }) as unknown as Relighting;
  const layers = [relighting.layer.id];

  // The proxy mesh: simple shapes that approximate the splat surfaces, on the relighting layer.
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color(0.5, 0.5, 0.5);
  relighting.configureMaterial(material); // makes it write the coverage mask
  const proxy = (type: 'box' | 'sphere', x: number, scale: number): pc.Entity => {
    const entity = new pc.Entity(`proxy-${type}`);
    entity.addComponent('render', { type, material, layers });
    entity.setPosition(x, 0, 0);
    entity.setLocalScale(scale, scale, scale);
    app.root.addChild(entity);
    return entity;
  };
  proxy('box', -1.7, 1.8);
  proxy('sphere', 1.7, 2);

  // Any standard lights work, as long as they are on the same layer.
  const sun = new pc.Entity('sun');
  sun.addComponent('light', { type: 'directional', layers, color: new pc.Color(1, 0.95, 0.85), intensity: 0.8 });
  sun.setEulerAngles(55, 120, 0);
  app.root.addChild(sun);
  const lamp = new pc.Entity('lamp');
  lamp.addComponent('light', { type: 'omni', layers, color: new pc.Color(0.3, 0.6, 1), range: 6, intensity: 3 });
  app.root.addChild(lamp);

  let time = 0;
  app.on('update', (dt: number) => {
    time += dt;
    lamp.setPosition(Math.cos(time * 1.1) * 3.4, Math.sin(time * 0.7) * 1.2 + 0.4, Math.sin(time * 1.1) * 3.4);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('blend', 0, 1, 0.05, 1, (v) => (relighting.blend = v));
    panel.slider('brightness', 0, 4, 0.1, 1.5, (v) => (relighting.brightness = v));
    panel.slider('background', 0, 3, 0.1, 1, (v) => (relighting.background = v));
    panel.readout('the splats are flat grey: all shading comes from the proxy meshes');
  }

  return () => scene.dispose();
};

export default mount;
