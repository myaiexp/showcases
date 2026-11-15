// Collision layers: two layers that collide, then pass through each other
import { Vector3 } from '@zephyr3d/base';
import { toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, colliderOf, dynBox, floor, launch, orbit, respawn, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

const LAYER_ROCKS = 1;
const LAYER_GHOSTS = 2;

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 12, 8);

  // The 16x16 collision matrix is symmetric and every pair collides by default
  const setPass = (pass: boolean): void => {
    kit.world.setLayerCollision(LAYER_ROCKS, LAYER_GHOSTS, !pass);
    stage.caption(pass ? 'layer 1 and layer 2 pass through each other' : 'layers 1 and 2 collide');
  };

  let cycle = 0;
  respawn(
    kit,
    () => {
      if (stage.preview) setPass(cycle++ % 2 === 1);
      const nodes = [];
      for (let i = 0; i < 3; i++) {
        const rock = dynBox(kit, 0.9, new Vector3(-1.4 + i * 1.4, 0.45 + i * 0.1, 0), BLUE, 3);
        colliderOf(rock).layer = LAYER_ROCKS; // `layer` says which layer a collider is on
        nodes.push(rock);
      }
      for (let i = 0; i < 5; i++) {
        const ghost = dynBox(kit, 0.5, new Vector3(-2.2 + i * 1.1, 3 + (i % 2) * 1.2, 0), YELLOW);
        colliderOf(ghost).layer = LAYER_GHOSTS;
        nodes.push(ghost);
      }
      return nodes;
    },
    6000,
    'Drop again',
  );

  if (stage.bar) {
    toggle(stage.bar, 'Pass through', false, setPass);
    setPass(false);
  }

  orbit(kit, new Vector3(0, 3.5, 8), new Vector3(0, 1, 0));
  launch(kit);
});
