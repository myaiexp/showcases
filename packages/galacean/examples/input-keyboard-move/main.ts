// WASD or arrow keys move a cube with isKeyHeldDown; Space hops with isKeyDown
import { Keys, PrimitiveMesh, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { panel } from '../../shared/core-ui.ts';

interface Pad {
  held(k: Keys): boolean;
  pressed(k: Keys): boolean;
}

class Walker extends Script {
  pad?: Pad;
  private vy = 0;
  override onUpdate(dt: number): void {
    const pad = this.pad!;
    const t = this.entity.transform;
    const dx = (pad.held(Keys.KeyD) || pad.held(Keys.ArrowRight) ? 1 : 0) - (pad.held(Keys.KeyA) || pad.held(Keys.ArrowLeft) ? 1 : 0);
    const dz = (pad.held(Keys.KeyS) || pad.held(Keys.ArrowDown) ? 1 : 0) - (pad.held(Keys.KeyW) || pad.held(Keys.ArrowUp) ? 1 : 0);
    const p = t.position;
    if (pad.pressed(Keys.Space) && p.y <= 0.801) this.vy = 5;
    this.vy -= 14 * dt;
    t.setPosition(Math.max(-4.5, Math.min(4.5, p.x + dx * 4 * dt)), Math.max(0.8, p.y + this.vy * dt), Math.max(-2.5, Math.min(2.5, p.z + dz * 4 * dt)));
    if (dx || dz) t.setRotation(0, (Math.atan2(dx, dz) * 180) / Math.PI + 180, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click the canvas for keyboard focus, then use W A S D or the arrows to move and Space to hop.' });
  const { engine, root } = stage;
  lit(stage, [0, 7, 7], [0, 0, 0]);
  solid(root, PrimitiveMesh.createPlane(engine, 12, 7), phong(engine, [0.2, 0.23, 0.3]), [0, 0, 0], 'floor');
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6), phong(engine, PALETTE.green), [0, 0.8, 0]);
  solid(cube, PrimitiveMesh.createSphere(engine, 0.28, 12), phong(engine, PALETTE.white), [0, 0.2, -0.85], 'nose');
  const walker = cube.addComponent(Walker);
  const info = panel(stage, 'bl');
  const virtual = new Set<Keys>();
  const downNow = new Set<Keys>();
  walker.pad = stage.preview
    ? { held: (k) => virtual.has(k), pressed: (k) => downNow.has(k) }
    : { held: (k) => engine.inputManager.isKeyHeldDown(k), pressed: (k) => engine.inputManager.isKeyDown(k) };
  let last = 0;
  tick(root, (_dt, t) => {
    if (stage.preview) {
      // A scripted player: a lap around the floor with a hop at each corner.
      const k = (t % 12) / 3;
      virtual.clear();
      downNow.clear();
      virtual.add([Keys.KeyD, Keys.KeyS, Keys.KeyA, Keys.KeyW][Math.floor(k) % 4]!);
      if (Math.floor(t * 2) !== last && Math.floor(t * 2) % 5 === 0) downNow.add(Keys.Space);
      last = Math.floor(t * 2);
    }
    const p = cube.transform.position;
    info.text(`position ${p.x.toFixed(1)}, ${p.y.toFixed(1)}, ${p.z.toFixed(1)}`);
  });
  return stage.dispose;
};

export default mount;
