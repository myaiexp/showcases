// Scene.fog is a FogParams object: type, color, start, end and density
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: false, floor: 240, clear: '#9fb4c8', sun: { angles: [55, 25, 0] } });
  const { app, camera } = scene;
  camera.setPosition(0, 2.2, 8);
  camera.lookAt(0, 1, -20);
  camera.camera!.farClip = 200;

  // Pillars marching away from the camera, so fog thickens with distance.
  const palette = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa'];
  for (let i = 0; i < 16; i++) {
    for (const side of [-1, 1]) {
      addShape(app.root, 'box', material(palette[(i + (side > 0 ? 2 : 0)) % palette.length]!), [side * 3, 1.5, -i * 5], [1.5, 3, 1.5]);
    }
  }
  const hero = addShape(app.root, 'sphere', material('#ffffff'), [0, 1, 0], 1.6);
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    hero.setLocalPosition(0, 1 + Math.sin(t * 2) * 0.3, -((t * 6) % 70));
    camera.setPosition(Math.sin(t * 0.4) * 1.5, 2.2, hero.getPosition().z + 8);
    camera.lookAt(0, 1, hero.getPosition().z - 20);
  });

  const fog = app.scene.fog;
  fog.type = pc.FOG_LINEAR;
  fog.color = new pc.Color().fromString('#9fb4c8');
  fog.start = 8;
  fog.end = 60;
  fog.density = 0.02;

  if (!ctx.preview) {
    const panel = createPanel(el);
    const types = [pc.FOG_NONE, pc.FOG_LINEAR, pc.FOG_EXP, pc.FOG_EXP2] as const;
    panel.select('fog.type', types, pc.FOG_LINEAR, (v) => (fog.type = v));
    panel.slider('start', 0, 40, 1, 8, (v) => (fog.start = v));
    panel.slider('end', 10, 150, 1, 60, (v) => (fog.end = v));
    panel.slider('density', 0, 0.1, 0.002, 0.02, (v) => (fog.density = v));
    panel.row();
    panel.readout('start and end belong to linear fog; density to exp and exp2.');
  }

  return () => {
    // The scene is destroyed with the app, so the fog settings go with it.
    scene.dispose();
  };
};

export default mount;
