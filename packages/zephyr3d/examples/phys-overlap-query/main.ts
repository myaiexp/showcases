// overlap and overlapPoint: which colliders a moving shape or point is inside
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { slider, select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, dynBox, floor, launch, marker, mat, orbit, ORANGE, SLATE, startPhysics, staticBox, tint, YELLOW } from '../../shared/phys-kit.ts';
import { Mesh, SphereShape } from '@zephyr3d/scene';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 16, 12);
  const readout = stage.readout();

  // A grid of static blocks of different heights: the probe skims over them
  const blocks: Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const h = 0.4 + ((i * 3 + j * 5) % 4) * 0.35;
      blocks.push(staticBox(kit, new Vector3(0.9, h, 0.9), new Vector3(-4 + i * 2, h / 2, -4 + j * 2), SLATE));
    }
  }
  dynBox(kit, 0.5, new Vector3(0, 6, 0), BLUE); // a loose box falls into the probe's path now and then

  let mode: 'overlap' | 'overlapPoint' = 'overlap';
  let radius = 1.3;
  const probe = new Mesh(kit.scene, new SphereShape({ radius: 1 }), mat(YELLOW, 0.3));
  probe.castShadow = false;
  const dot = marker(kit, 0.12, ORANGE);
  const identity = Quaternion.identity();
  let t = 0;
  kit.myApp.on('tick', (dtMs: number) => {
    t += dtMs / 1000;
    const pos = new Vector3(Math.sin(t * 0.55) * 4.5, 0.9 + Math.sin(t * 1.3) * 0.5, Math.cos(t * 0.37) * 4);
    probe.position.set(pos);
    probe.scale.setXYZ(radius, radius, radius);
    probe.showState = mode === 'overlap' ? 'visible' : 'hidden';
    dot.position.set(pos);
    dot.showState = mode === 'overlapPoint' ? 'visible' : 'hidden';
    // The queries return Colliders; `collider.node` is the node they sit on
    const hit =
      mode === 'overlap' ? kit.world.overlap({ type: 'sphere', radius }, pos, identity) : kit.world.overlapPoint(pos);
    const nodes = new Set(hit.map((c) => c.node));
    for (const b of blocks) tint(b, nodes.has(b) ? ORANGE : SLATE);
    const text = `${mode}: ${hit.length} collider${hit.length === 1 ? '' : 's'}`;
    stage.caption(text);
    if (readout) readout.textContent = text;
  });

  if (stage.bar) {
    select(stage.bar, 'Query', ['overlap', 'overlapPoint'] as const, mode, (v) => (mode = v));
    slider(stage.bar, 'Sphere radius', [0.3, 2.5, 0.05], radius, (v) => (radius = v));
  } else {
    stage.every(5000, (i) => (mode = i % 2 ? 'overlapPoint' : 'overlap'));
  }

  orbit(kit, new Vector3(0, 9, 10), new Vector3(0, 0, 0));
  launch(kit);
});
