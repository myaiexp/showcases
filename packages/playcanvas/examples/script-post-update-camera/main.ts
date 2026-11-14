// A tracking camera aims in postUpdate, after every script has moved the player
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox, tint } from '../../shared/scripting.ts';

class Player extends pc.Script {
  static override scriptName = 'player';
  private t = 0;
  update(dt: number): void {
    this.t += dt;
    this.entity.setPosition(Math.cos(this.t * 2.2) * 6, 1, Math.sin(this.t * 2.2) * 3);
  }
}

type Phase = 'update' | 'postUpdate';

class TrackingCamera extends pc.Script {
  static override scriptName = 'trackingCamera';
  player: pc.Entity | null = null;
  phase: Phase = 'postUpdate';

  update(): void {
    // This camera's script component was created first, so this runs before Player.update.
    if (this.phase === 'update') this.aim();
  }
  postUpdate(): void {
    // Every update has run: the player's position is final for this frame.
    if (this.phase === 'postUpdate') this.aim();
  }
  private aim(): void {
    if (this.player) this.entity.lookAt(this.player.getPosition());
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: false, floor: 20, sun: { intensity: 1.1 } });
  const { app, camera } = scene;
  camera.setPosition(0, 4, 11);

  // The camera entity gets its script component before the player does.
  camera.addComponent('script');
  const tracker = camera.script!.create(TrackingCamera)!;

  const player = addBox(app.root, 'player', '#7bc67b', [6, 1, 0], 1.2);
  player.addComponent('script');
  player.script!.create(Player);
  tracker.player = player;

  const grid = new pc.Entity('markers');
  app.root.addChild(grid);
  for (let i = -3; i <= 3; i++) addBox(grid, `post ${i}`, '#5a6070', [i * 3, 0.4, -5], 0.8);

  const setPhase = (p: Phase): void => {
    tracker.phase = p;
    tint(player, p === 'postUpdate' ? '#7bc67b' : '#e8794a');
  };

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      const before = Math.floor(t / 3);
      t += dt;
      if (Math.floor(t / 3) !== before) setPhase(tracker.phase === 'update' ? 'postUpdate' : 'update');
    });
  } else {
    const panel = createPanel(el);
    const readout = panel.readout();
    panel.select('aim in', ['postUpdate', 'update'] as const, 'postUpdate', setPhase);
    // The app's own update event fires after the scripts, so the camera has aimed by then.
    const to = new pc.Vec3();
    app.on('update', () => {
      to.sub2(player.getPosition(), camera.getPosition()).normalize();
      const miss = Math.acos(pc.math.clamp(camera.forward.dot(to), -1, 1)) * pc.math.RAD_TO_DEG;
      readout.textContent = `camera is ${miss.toFixed(2)} degrees off the player`;
    });
  }
  return () => scene.dispose();
};

export default mount;
