// worldToScreen pins HTML name tags on 3D entities; negative z is behind
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, canvas } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 55, 30, { castShadows: true, shadowDistance: 40 });
  addGround(app, '#3a4152', 40);

  const tagged = [
    { name: 'crate', entity: addShape(app, 'box', '#c8a165', [-3, 0.75, 0], 1.5), lift: 1.2 },
    { name: 'tower', entity: addShape(app, 'cylinder', '#cfd5e1', [0, 1.5, -2], [1, 3, 1]), lift: 1.5 },
    { name: 'orb', entity: addShape(app, 'sphere', '#4ab3e8', [3, 1, 0], 2), lift: 1.5 },
    { name: 'satellite', entity: addShape(app, 'sphere', '#ff4d6d', [0, 2, 0], 0.7), lift: 0.8 },
  ];

  const camera = addCamera(app);
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 1.2, 0), distance: 9, pitch: -18, autoRotate: 12, interactive: !ctx.preview });

  // A container that covers the canvas holds the tags.
  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  canvas.before(wrap);
  wrap.append(canvas);
  const layer = document.createElement('div');
  Object.assign(layer.style, { position: 'absolute', inset: '0', overflow: 'hidden', pointerEvents: 'none' });
  wrap.append(layer);
  const tags = tagged.map(({ name }) => {
    const tag = document.createElement('span');
    tag.textContent = name;
    Object.assign(tag.style, {
      position: 'absolute', transform: 'translate(-50%, -100%)', padding: '1px 8px', font: '0.75rem/1.5 monospace',
      color: '#111', background: '#f2c14e', borderRadius: '3px', whiteSpace: 'nowrap',
    });
    layer.append(tag);
    return tag;
  });

  const state = { hideBehind: true };
  const world = new pc.Vec3();
  const screen = new pc.Vec3();
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    // The satellite flies a wide loop that carries it behind the camera.
    tagged[3]!.entity.setPosition(Math.cos(t * 0.8) * 12, 2.5, Math.sin(t * 0.8) * 12);
    tagged.forEach(({ entity, lift }, i) => {
      // The tag floats `lift` units above the entity's centre.
      world.copy(entity.getPosition()).y += lift;
      camera.camera!.worldToScreen(world, screen);
      // x and y are CSS pixels from the canvas's top-left corner; z is the depth.
      const behind = screen.z < 0;
      tags[i]!.style.left = `${screen.x}px`;
      tags[i]!.style.top = `${screen.y}px`;
      tags[i]!.style.display = behind && state.hideBehind ? 'none' : 'block';
      tags[i]!.style.opacity = behind ? '0.5' : '1';
    });
  });

  if (!ctx.preview) {
    createPanel(el).check('hide tags when z < 0', true, (on) => (state.hideBehind = on));
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;
