// A script fires move on itself and another script listens through the entity
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox, createLog } from '../../shared/scripting.ts';

class Player extends pc.Script {
  static override scriptName = 'player';
  private t = 0;

  update(dt: number): void {
    this.t += dt;
    const x = Math.cos(this.t * 1.2) * 3;
    const z = Math.sin(this.t * 1.2) * 2;
    this.entity.setPosition(x, 1, z);
    // Every listener registered with on('move', ...) is called with these arguments.
    this.fire('move', x, z);
  }
}

class Display extends pc.Script {
  static override scriptName = 'display';
  playerEntity: pc.Entity | null = null;
  moves = 0;
  say: (text: string) => void = () => {};

  initialize(): void {
    const player = this.playerEntity?.script?.get(Player);
    if (!player) return;
    // Mirror the player across the middle of the floor.
    const onPlayerMove = (x: number, z: number): void => {
      this.moves++;
      this.entity.setPosition(-x, 1, -z);
    };
    player.on('move', onPlayerMove);
    this.once('destroy', () => player.off('move', onPlayerMove));
    this.say(`listening: player.hasEvent('move') = ${player.hasEvent('move')}`);

    // Remove the listener when the player script is destroyed.
    player.once('destroy', () => {
      player.off('move', onPlayerMove);
      this.say(`player destroyed, listener removed: hasEvent('move') = ${player.hasEvent('move')}`);
    });
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 10, pitch: -50 } });
  const { app } = scene;
  const out = createLog(el, ctx, 5);

  const playerBox = addBox(app.root, 'player', '#e8794a', [3, 1, 0]);
  playerBox.addComponent('script');
  const displayBox = addShape(app.root, 'sphere', material('#4ab3e8'), [-3, 1, 0], 1.1, 'display');
  displayBox.addComponent('script');

  const attach = (): void => {
    playerBox.script!.create(Player);
    displayBox.script!.destroy(Display);
    displayBox.script!.create(Display, { properties: { playerEntity: playerBox, say: out.log } });
  };
  attach();

  if (!ctx.preview) {
    const panel = createPanel(el);
    const count = panel.readout();
    app.on('update', () => {
      count.textContent = `display has handled ${displayBox.script!.get(Display)?.moves ?? 0} move events`;
    });
    panel.row();
    panel.button('destroy the Player script', () => playerBox.script!.destroy(Player));
    panel.button('recreate both scripts', attach);
  }
  return () => scene.dispose();
};

export default mount;
