// A GameCtrl built on EventDispatcher: one state, three scripts reacting to State_Change
import { type Entity, EventDispatcher, PrimitiveMesh, Script, type UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, phong, PALETTE, solid, tick, unlit } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const EnumState = { Idle: 0, Flying: 1, Crash: 2, Result: 3 } as const;
type EnumState = (typeof EnumState)[keyof typeof EnumState];

/** The tutorial's controller: holds the state and dispatches changes (made per mount, not a page-wide singleton). */
class GameCtrl extends EventDispatcher {
  private _gameState: EnumState = EnumState.Idle;
  set gameState(value: EnumState) {
    if (this._gameState !== value) {
      this._gameState = value;
      this.dispatch('State_Change', value);
    }
  }
  get gameState(): EnumState {
    return this._gameState;
  }
}

let ctrl = new GameCtrl();

class Bird extends Script {
  override onAwake(): void {
    ctrl.on('State_Change', (state: EnumState) => {
      const t = this.entity.transform;
      if (state === EnumState.Idle) t.setPosition(-2.4, 0, 0);
      else if (state === EnumState.Crash) t.setRotation(0, 0, -70);
      else t.setRotation(0, 0, 0);
    });
  }
  override onUpdate(dt: number): void {
    if (ctrl.gameState === EnumState.Flying) this.entity.transform.translate(0, Math.sin(this.engine.time.elapsedTime * 6) * dt * 2, 0);
  }
}
class Ground extends Script {
  moving = false;
  override onAwake(): void {
    ctrl.on('State_Change', (state: EnumState) => (this.moving = state === EnumState.Flying));
  }
  override onUpdate(dt: number): void {
    if (this.moving) this.entity.transform.translate(-2 * dt, 0, 0);
    if (this.entity.transform.position.x < -1) this.entity.transform.setPosition(1, this.entity.transform.position.y, 0);
  }
}
class Gui extends Script {
  material?: UnlitMaterial;
  override onAwake(): void {
    ctrl.on('State_Change', (state: EnumState) => this.material?.baseColor.set(state === EnumState.Result ? 1 : 0.2, 0.7, state === EnumState.Result ? 0.3 : 0.4, 1));
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Idle, Flying, Crash, Result: each script reacts to the same State_Change event in its own way.' });
  const { engine, root } = stage;
  ctrl = new GameCtrl();
  lit(stage, [0, 1, 8]);
  const bird: Entity = solid(root, PrimitiveMesh.createSphere(engine, 0.5, 16), phong(engine, PALETTE.amber), [-2.4, 0, 0], 'bird');
  bird.addComponent(Bird);
  const ground = solid(root, PrimitiveMesh.createCuboid(engine, 6, 0.3, 1), phong(engine, PALETTE.green), [0, -1.8, 0], 'ground');
  ground.addComponent(Ground);
  const guiMaterial = unlit(engine, [0.2, 0.7, 0.4]);
  const gui = solid(root, PrimitiveMesh.createCuboid(engine, 1.6, 0.5, 0.1), guiMaterial, [0, 1.8, 0], 'gui');
  gui.addComponent(Gui).material = guiMaterial;
  const info = panel(stage);
  const order = [EnumState.Idle, EnumState.Flying, EnumState.Crash, EnumState.Result];
  let i = 0;
  const advance = (): void => void (ctrl.gameState = order[++i % order.length]!);
  if (!stage.preview) button(stage.bar, 'Next state', advance);
  let last = 0;
  tick(root, (_dt, t) => {
    if (stage.preview && t - last > 1.5) {
      last = t;
      advance();
    }
    info.text(`GameCtrl.gameState = ${Object.keys(EnumState)[ctrl.gameState]}`);
  });
  return stage.dispose;
};

export default mount;
