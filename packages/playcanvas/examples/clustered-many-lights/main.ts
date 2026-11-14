// Clustered lighting: hundreds of omni and spot lights from a 3D grid of cells
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addShape } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

interface Bulb {
  entity: pc.Entity;
  phase: number;
  radius: number;
  speed: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.02, 0.02, 0.03);

  // Clustered lighting is the default; its settings live on scene.lighting.
  const lighting = app.scene.lighting;
  lighting.shadowsEnabled = false;
  lighting.cookiesEnabled = false;
  lighting.maxLights = 1024; // above 255 the grid stores 16-bit light indices
  lighting.cells = new pc.Vec3(12, 3, 12);
  lighting.maxLightsPerCell = 48;

  addGround(app, '#6a7288', 40);
  for (let x = -7; x <= 7; x += 3.5) {
    for (let z = -7; z <= 7; z += 3.5) {
      addShape(app, (x + z) % 7 === 0 ? 'sphere' : 'box', '#c9ced9', [x, 0.8, z], 1.6, { castShadows: false });
    }
  }

  const bulbs: Bulb[] = [];
  const addBulbs = (count: number): void => {
    while (bulbs.length < count) {
      const i = bulbs.length;
      const entity = new pc.Entity(`bulb-${i}`);
      const colour = new pc.Color().fromString('#ffffff');
      const h = (i * 0.618) % 1;
      colour.set(0.5 + 0.5 * Math.cos(h * 6.283), 0.5 + 0.5 * Math.cos((h + 0.33) * 6.283), 0.5 + 0.5 * Math.cos((h + 0.67) * 6.283));
      const spot = i % 3 === 0;
      entity.addComponent('light', spot
        ? { type: 'spot', color: colour, range: 6, intensity: 3, innerConeAngle: 20, outerConeAngle: 45 }
        : { type: 'omni', color: colour, range: 4, intensity: 2 });
      app.root.addChild(entity);
      bulbs.push({ entity, phase: i * 2.399, radius: 2 + ((i * 37) % 100) / 100 * 8, speed: 0.15 + ((i * 53) % 100) / 400 });
    }
    while (bulbs.length > count) bulbs.pop()!.entity.destroy();
  };
  addBulbs(ctx.preview ? 120 : 200);

  const camera = addCamera(app, { clearColor: new pc.Color(0.01, 0.01, 0.02) });
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0.5, 0), distance: 16, pitch: -38, autoRotate: 8, interactive: !ctx.preview });

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    for (const b of bulbs) {
      const a = b.phase + t * b.speed;
      b.entity.setPosition(Math.cos(a) * b.radius, 1.2 + Math.sin(a * 2.3) * 0.5, Math.sin(a) * b.radius);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const readout = panel.readout();
    const show = (): void => {
      readout.textContent = `${bulbs.length} lights, cells ${lighting.cells.x}x${lighting.cells.y}x${lighting.cells.z}, max ${lighting.maxLightsPerCell} per cell`;
    };
    panel.slider('lights', 1, 800, 1, bulbs.length, (v) => (addBulbs(v), show()));
    panel.slider('cells (x and z)', 1, 30, 1, lighting.cells.x, (v) => ((lighting.cells = new pc.Vec3(v, lighting.cells.y, v)), show()));
    panel.slider('maxLightsPerCell', 4, 255, 1, lighting.maxLightsPerCell, (v) => ((lighting.maxLightsPerCell = v), show()));
    show();
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
