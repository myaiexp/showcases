// Render component: the six primitive types, shadows cast and received
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const TYPES = ['box', 'capsule', 'cone', 'cylinder', 'plane', 'sphere'] as const;
const COLOURS = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa', '#f472b6'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.2, 0.22, 0.28);

  const camera = new pc.Entity('camera');
  camera.addComponent('camera', { clearColor: new pc.Color(0.08, 0.09, 0.12) });
  app.root.addChild(camera);
  const orbit = createOrbit(app, camera, { distance: 9, pitch: -28, interactive: !ctx.preview });

  const sun = new pc.Entity('sun');
  sun.addComponent('light', { type: 'directional', castShadows: true, shadowDistance: 20, shadowResolution: 1024, normalOffsetBias: 0.05 });
  sun.setEulerAngles(50, 30, 0);
  app.root.addChild(sun);

  // The floor only receives shadows.
  const floor = new pc.Entity('floor');
  floor.addComponent('render', { type: 'plane', castShadows: false, receiveShadows: true });
  floor.setLocalScale(10, 1, 8);
  app.root.addChild(floor);

  // One entity per primitive type, each with its own StandardMaterial.
  const shapes = TYPES.map((type, i) => {
    const material = new pc.StandardMaterial();
    material.diffuse = new pc.Color().fromString(COLOURS[i]!);
    material.update();
    const entity = new pc.Entity(type);
    entity.addComponent('render', { type, material, castShadows: true, receiveShadows: true });
    entity.setLocalPosition((i % 3) * 2.4 - 2.4, 0.75, i < 3 ? -1.3 : 1.3);
    if (type === 'plane') entity.setLocalEulerAngles(60, 0, 0);
    app.root.addChild(entity);
    return entity;
  });

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    shapes.forEach((s, i) => {
      const p = s.getLocalPosition();
      s.setLocalPosition(p.x, 0.75 + Math.sin(t * 1.5 + i) * 0.2, p.z);
    });
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('castShadows', true, (on) => shapes.forEach((s) => (s.render!.castShadows = on)));
    panel.check('floor receiveShadows', true, (on) => (floor.render!.receiveShadows = on));
    panel.select('third shape type', TYPES, 'cone', (type) => (shapes[2]!.render!.type = type));
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
