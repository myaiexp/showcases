// The legacy model component beside the render component that replaced it
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const TYPES = ['box', 'capsule', 'cone', 'cylinder', 'plane', 'sphere'] as const;

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 7, pitch: -20, autoRotate: 14 }, floor: 10, sun: { shadows: true } });
  const { app } = scene;

  // Same properties on both components: type, material, castShadows, receiveShadows.
  const mat = material('#a78bfa', { gloss: 0.6 });
  const legacy = new pc.Entity('model');
  legacy.addComponent('model', { type: 'sphere', material: mat, castShadows: true, receiveShadows: true });
  legacy.setLocalPosition(-1.6, 0.9, 0);
  app.root.addChild(legacy);

  const current = new pc.Entity('render');
  current.addComponent('render', { type: 'sphere', material: mat, castShadows: true, receiveShadows: true });
  current.setLocalPosition(1.6, 0.9, 0);
  app.root.addChild(current);

  let t = 0;
  let index = 5;
  const setType = (type: (typeof TYPES)[number]): void => {
    legacy.model!.type = type;
    current.render!.type = type;
  };
  app.on('update', (dt: number) => {
    t += dt;
    legacy.rotate(0, 40 * dt, 0);
    current.rotate(0, 40 * dt, 0);
    if (ctx.preview && Math.floor(t / 1.6) % TYPES.length !== index) {
      index = Math.floor(t / 1.6) % TYPES.length;
      setType(TYPES[index]!);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('type (both)', TYPES, 'sphere', setType);
    panel.check('castShadows (both)', true, (on) => ((legacy.model!.castShadows = on), (current.render!.castShadows = on)));
    panel.row();
    panel.readout('Left: model component (deprecated). Right: render component. Prefer render for new work.');
  }

  return () => scene.dispose();
};

export default mount;
