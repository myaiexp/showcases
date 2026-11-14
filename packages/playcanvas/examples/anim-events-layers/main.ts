// Every layer fires its clips' events, so shared clips fire twice
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, material } from '../../shared/components.ts';
import { creatureScene, locomotion } from '../../shared/animation.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const { scene, creature } = await creatureScene(el, ctx, { distance: 6 });
  const { app } = scene;
  const anim = creature.anim!;

  const walk = locomotion('Walk', 1, 1);
  walk.events = new pc.AnimEvents([{ time: 0.5, name: 'beat' }]);
  anim.assignAnimation('Walk', walk);

  // A second layer plays the same clip, at weight 0 so it changes nothing visible.
  const second = anim.addLayer('Second', 0);
  second.assignAnimation('Walk', walk);
  second.play('Walk');

  // Each beat launches a ball. Two layers means two balls per beat, one on top of the other.
  const mat = material('#f2c14e', { emissive: '#7a5a10' });
  const balls: { e: pc.Entity; v: number; vx: number }[] = [];
  let beats = 0;
  let sinceStart = 0;
  anim.on('beat', () => {
    beats++;
    balls.push({ e: addShape(app.root, 'sphere', mat, [0, 2.4, 0], 0.22, 'ball'), v: 3.2, vx: (Math.random() - 0.5) * 3 });
  });

  app.on('update', (dt: number) => {
    sinceStart += dt;
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i]!;
      b.v -= 6 * dt;
      const p = b.e.getPosition();
      b.e.setPosition(p.x + b.vx * dt, p.y + b.v * dt, p.z);
      if (p.y < 0.2) {
        b.e.destroy();
        balls.splice(i, 1);
      }
    }
  });

  if (ctx.preview) {
    let t = 0;
    let on = false;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 3) {
        t = 0;
        on = !on;
        second.weight = on ? 1 : 0;
      }
    });
  } else {
    const panel = createPanel(el);
    panel.slider('second layer weight (the clip has the same event)', 0, 1, 0.1, 0, (v) => (second.weight = v));
    panel.button('reset the counter', () => {
      beats = 0;
      sinceStart = 0;
    });
    const info = panel.readout();
    app.on('update', () => {
      info.textContent = `${beats} beat events in ${sinceStart.toFixed(1)} s, ${(beats / Math.max(sinceStart, 0.001)).toFixed(2)} per second (one layer would give 1)`;
    });
  }
  return () => scene.dispose();
};

export default mount;
