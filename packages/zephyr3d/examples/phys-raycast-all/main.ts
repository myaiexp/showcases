// raycastAll: every collider along a ray, nearest first, with includeTriggers
import { Vector3 } from '@zephyr3d/base';
import { BoxShape, Collider, Mesh, NodePhysics } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { beam, floor, GREEN, launch, marker, mat, orbit, ORANGE, RED, SLATE, startPhysics, staticBox, YELLOW, BLUE } from '../../shared/phys-kit.ts';

const PALETTE = [RED, ORANGE, YELLOW, GREEN, BLUE];

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 18, 8);
  const readout = stage.readout();

  // Five pillars in a row; the middle one is a trigger (a ghost the ray sees only if asked)
  const pillars: Mesh[] = [];
  for (let i = 0; i < 6; i++) {
    const x = -5 + i * 2;
    if (i === 2) {
      const ghost = new Mesh(kit.scene, new BoxShape({ size: 0.9, sizeY: 3, sizeZ: 0.9 }), mat([0.2, 0.8, 1], 0.3));
      ghost.castShadow = false;
      ghost.position.setXYZ(x, 1.5, 0);
      const c = new Collider();
      c.size = new Vector3(0.9, 3, 0.9);
      c.isTrigger = true;
      ghost.physics = new NodePhysics({ colliders: [c] });
      ghost.name = 'trigger';
      pillars.push(ghost);
    } else {
      const p = staticBox(kit, new Vector3(0.9, 3, 0.9), new Vector3(x, 1.5, 0), SLATE);
      p.name = `pillar ${i + 1}`;
      pillars.push(p);
    }
  }

  let height = 1.5;
  let includeTriggers = false;
  const ray = beam(kit, YELLOW, 0.04);
  const dots = PALETTE.map((c) => marker(kit, 0.16, c));
  const origin = new Vector3();
  const direction = Vector3.axisPX();
  let t = 0;
  kit.myApp.on('tick', (dtMs: number) => {
    t += dtMs / 1000;
    // Cards flip includeTriggers every few seconds to show what it changes
    if (stage.preview) includeTriggers = Math.floor(t / 4) % 2 === 1;
    const y = stage.preview ? 1.5 + Math.sin(t * 0.9) * 1.3 : height;
    origin.setXYZ(-7.5, y, 0);
    // Every hit along the ray, nearest first
    const hits = kit.world.raycastAll(origin, direction, 30, { includeTriggers });
    ray.set(origin, new Vector3(7.5, y, 0));
    dots.forEach((d, i) => {
      const h = hits[i];
      d.showState = h ? 'visible' : 'hidden';
      if (h) d.position.set(h.point);
    });
    const text = (includeTriggers ? 'with triggers: ' : '') + (hits.length ? hits.map((h, i) => `${i + 1}: ${h.node.name || 'floor'} ${h.distance.toFixed(1)} m`).join('  ') : 'no hits');
    stage.caption(text);
    if (readout) readout.textContent = text;
  });

  if (stage.bar) {
    slider(stage.bar, 'Ray height', [0.2, 3.5, 0.05], height, (v) => (height = v));
    toggle(stage.bar, 'includeTriggers', false, (v) => (includeTriggers = v));
  }

  orbit(kit, new Vector3(0, 3.5, 11), new Vector3(0, 1.5, 0));
  launch(kit);
});
