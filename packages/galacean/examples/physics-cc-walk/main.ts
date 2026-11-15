// CharacterController.move with hand-made gravity, jumping and collision flags
import { CapsuleColliderShape, CharacterController, ControllerCollisionFlag, Keys, PrimitiveMesh, Script, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { flagNames } from '../../shared/phys-char.ts';
import { PALETTE, wall, world } from '../../shared/phys-kit.ts';

class CharacterMovement extends Script {
  scripted = false;
  flags = 0;
  grounded = false;
  private controller!: CharacterController;
  private velocity = new Vector3();
  private elapsed = 0;
  private moveSpeed = 4;
  private jumpForce = 6;
  override onAwake(): void {
    this.controller = this.entity.getComponent(CharacterController)!;
  }
  override onUpdate(frameTime: number): void {
    const deltaTime = Math.min(frameTime, 1 / 30);
    this.elapsed += deltaTime;
    const input = this.engine.inputManager;
    let horizontal = input.isKeyHeldDown(Keys.KeyA) ? -1 : input.isKeyHeldDown(Keys.KeyD) ? 1 : 0;
    let vertical = input.isKeyHeldDown(Keys.KeyS) ? 1 : input.isKeyHeldDown(Keys.KeyW) ? -1 : 0;
    let jump = input.isKeyDown(Keys.Space);
    if (this.scripted) {
      horizontal = Math.cos(this.elapsed * 0.7);
      vertical = Math.sin(this.elapsed * 0.7);
      jump = Math.floor(this.elapsed / 2.4) !== Math.floor((this.elapsed - deltaTime) / 2.4);
    }
    const direction = new Vector3(horizontal, 0, vertical);
    if (direction.length() > 0) direction.normalize();
    this.velocity.x = direction.x * this.moveSpeed;
    this.velocity.z = direction.z * this.moveSpeed;
    if (!this.grounded) this.velocity.y += this.scene.physics.gravity.y * deltaTime;
    if (this.grounded && jump) {
      this.velocity.y = this.jumpForce;
      this.grounded = false;
    }
    const displacement = new Vector3();
    Vector3.scale(this.velocity, deltaTime, displacement);
    this.flags = this.controller.move(displacement, 0, deltaTime);
    this.grounded = (this.flags & ControllerCollisionFlag.Down) !== 0;
    if (this.grounded) this.velocity.y = 0;
  }
}

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 9, 8], target: [0, 0, 0], floor: { w: 14, d: 10 }, hint: 'Click the canvas, then W A S D to walk and Space to jump.' });
  for (const [x, z] of [[-3, -1], [3.2, 1.4], [0, 3.4]] as const) wall(w.root, [x, 0.75, z], [1.2, 1.5, 1.2], PALETTE.blue, 'pillar');
  const hero = w.root.createChild('hero');
  hero.transform.setPosition(0, 1.1, 0);
  add(hero, PrimitiveMesh.createCapsule(w.engine, 0.4, 1.2, 20, 1), blinn(w.engine, [...PALETTE.amber], 30));
  const controller = hero.addComponent(CharacterController);
  const capsule = new CapsuleColliderShape();
  capsule.radius = 0.4;
  capsule.height = 1.2;
  controller.addShape(capsule);
  controller.stepOffset = 0.5;
  controller.slopeLimit = 45;
  const movement = hero.addComponent(CharacterMovement);
  movement.scripted = w.stage.preview;
  tick(w.root, () => w.say(`move() -> ${flagNames(movement.flags)}   grounded ${movement.grounded}`));
  return w.stage.dispose;
};

export default mount;
