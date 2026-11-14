// Animation events: footsteps on a walk loop and landed at the end of a jump
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, material } from '../../shared/components.ts';
import { creatureScene, jumpClip, locomotion } from '../../shared/animation.ts';
import { createPanel } from '../../shared/panel.ts';
import { createLog } from '../../shared/scripting.ts';

interface Print {
  entity: pc.Entity;
  age: number;
}

const mount: Mount = async (el, ctx) => {
  const { scene, creature } = await creatureScene(el, ctx, { distance: 7 });
  const { app } = scene;
  const anim = creature.anim!;
  const out = createLog(el, ctx, 6);

  // Let the creature walk a circle: its parent moves, the clip only moves the limbs.
  const walker = new pc.Entity('walker');
  app.root.addChild(walker);
  walker.addChild(creature);

  const walk = locomotion('Walk', 1, 1);
  const jump = jumpClip();
  // Events belong to the clip. They can be listed in any order and carry extra properties.
  walk.events = new pc.AnimEvents([
    { time: 0.75, name: 'footstep', foot: 'right' },
    { time: 0.25, name: 'footstep', foot: 'left' },
  ]);
  // An event at the clip's duration fires when it reaches the end, even without a loop.
  jump.events = new pc.AnimEvents([{ time: jump.duration, name: 'landed' }]);
  anim.assignAnimation('Walk', walk);
  anim.assignAnimation('Jump', jump, undefined, 1, false);
  const layer = anim.baseLayer!;

  // Footprints fade away; a ring pulses where the jump lands.
  const prints: Print[] = [];
  const printMats = { left: material('#4ab3e8', { emissive: '#1a5a7a' }), right: material('#e8794a', { emissive: '#7a3a1a' }) };
  anim.on('footstep', (event: { foot: 'left' | 'right'; time: number; track: pc.AnimTrack }) => {
    out.log(`footstep: ${event.foot} foot at ${event.time} s of ${event.track.name}`);
    const foot = creature.findByName(event.foot === 'left' ? 'ShinL' : 'ShinR')!.getPosition();
    const disc = addShape(app.root, 'cylinder', printMats[event.foot], [foot.x, 0.03, foot.z], [0.3, 0.02, 0.3], 'print');
    prints.push({ entity: disc, age: 0 });
  });
  const ring = addShape(app.root, 'cylinder', material('#f2c14e', { emissive: '#f2c14e' }), [0, 0.04, 0], [0.1, 0.02, 0.1], 'landing ring');
  let ringAge = 99;
  anim.on('landed', () => {
    out.log('landed: the jump clip reached its end');
    ringAge = 0;
    if (layer.activeState === 'Jump') layer.transition('Walk', 0.3);
  });

  let a = 0;
  app.on('update', (dt: number) => {
    if (layer.activeState !== 'Jump') {
      a += dt * 0.9;
      walker.setLocalPosition(Math.cos(a) * 1.1, 0, Math.sin(a) * 1.1);
      walker.setLocalEulerAngles(0, 180 - a * pc.math.RAD_TO_DEG, 0);
    }
    for (let i = prints.length - 1; i >= 0; i--) {
      const p = prints[i]!;
      p.age += dt;
      const s = Math.max(0.01, 0.3 * (1 - p.age / 2.5));
      p.entity.setLocalScale(s, 0.02, s);
      if (p.age > 2.5) {
        p.entity.destroy();
        prints.splice(i, 1);
      }
    }
    ringAge += dt;
    const r = ringAge < 0.6 ? 0.2 + ringAge * 3 : 0.01;
    ring.setLocalScale(r, 0.02, r);
  });

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 4.5) {
        t = 0;
        layer.transition('Jump', 0.15);
      }
    });
  } else {
    const panel = createPanel(el);
    panel.button("transition('Jump')", () => layer.transition('Jump', 0.15));
    panel.button("transition('Walk')", () => layer.transition('Walk', 0.3));
    panel.slider('component speed', 0.1, 2, 0.1, 1, (v) => (anim.speed = v));
    panel.check('walk backwards (state speed -1)', false, (back) => anim.assignAnimation('Walk', walk, undefined, back ? -1 : 1, true));
    panel.readout('Events fire at any speed, on every loop, and when a clip plays backwards.');
  }
  return () => scene.dispose();
};

export default mount;
