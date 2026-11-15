// A script reaching around the tree: this.entity, getChild, findByName, findByPath and getComponent
import { type Entity, PrimitiveMesh, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, PALETTE, phong, solid } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

class Speed extends Script {
  rate = 1;
}

class Robot extends Script {
  head?: Entity;
  hand?: Entity;
  arm?: Entity;
  speed?: Speed | null;
  private t = 0;
  override onAwake(): void {
    const e = this.entity;
    this.arm = e.getChild(0);
    this.head = e.findByName('head');
    this.hand = e.findByPath('shoulder/arm/hand');
    this.speed = e.getComponent(Speed);
  }
  override onUpdate(dt: number): void {
    this.t += dt * (this.speed?.rate ?? 1);
    this.entity.transform.setRotation(0, this.t * 30, 0);
    this.arm?.transform.setRotation(0, 0, Math.sin(this.t * 2) * 40);
    this.head?.transform.setRotation(0, Math.sin(this.t * 3) * 50, 0);
    this.hand?.transform.setRotation(Math.sin(this.t * 5) * 70, 0, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'One script finds the shoulder, head and hand without any references handed in.' });
  const { engine, root } = stage;
  lit(stage, [0, 2.5, 9], [0, 1, 0]);
  const body = solid(root, PrimitiveMesh.createCuboid(engine, 1.2, 1.8, 0.8), phong(engine, PALETTE.grey), [0, 0.9, 0], 'robot');
  solid(body, PrimitiveMesh.createSphere(engine, 0.45, 16), phong(engine, PALETTE.amber), [0, 1.35, 0], 'head');
  const shoulder = body.createChild('shoulder');
  shoulder.transform.setPosition(0.6, 0.6, 0);
  const arm = solid(shoulder, PrimitiveMesh.createCuboid(engine, 1.4, 0.25, 0.25), phong(engine, PALETTE.cyan), [0.7, 0, 0], 'arm');
  solid(arm, PrimitiveMesh.createSphere(engine, 0.28, 12), phong(engine, PALETTE.green), [0.8, 0, 0], 'hand');
  body.addComponent(Speed).rate = 1;
  const robot = body.addComponent(Robot);
  panel(stage, 'bl').text(
    `this.entity.getChild(0)                   -> ${robot.arm?.name}\n` +
      `this.entity.findByName('head')            -> ${robot.head?.name}\n` +
      `this.entity.findByPath('shoulder/arm/hand') -> ${robot.hand?.name}\n` +
      `this.entity.getComponent(Speed)           -> rate ${robot.speed?.rate}`,
  );
  return stage.dispose;
};

export default mount;
