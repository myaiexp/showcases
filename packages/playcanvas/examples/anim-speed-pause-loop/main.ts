// State speed, backwards play, non-looping states, component speed and playing
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTrack } from '../../shared/animation.ts';

// A slow wind-up and a quick snap back, so playing it backwards is easy to see.
const swing = buildTrack('Swing', 2, [
  { path: ['pend', 'rod'], property: 'localRotation', times: [0, 1.5, 2], values: [[0, 0, 40], [0, 0, -50], [0, 0, 40]] },
]);

const SETUPS = [
  { label: 'speed 1, loops', speed: 1, loop: true, colour: '#4ab3e8' },
  { label: 'state speed 2', speed: 2, loop: true, colour: '#f2c14e' },
  { label: 'state speed -1', speed: -1, loop: true, colour: '#e8794a' },
  { label: 'loop false', speed: 1, loop: false, colour: '#7bc67b' },
];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 16, orbit: { distance: 10, pitch: -8, yaw: 0, autoRotate: 0, target: new pc.Vec3(0, 2, 0) } });
  const { app } = scene;

  const rigs = SETUPS.map((s, i) => {
    const root = new pc.Entity('pend');
    root.setLocalPosition((i - 1.5) * 2.4, 3.6, 0);
    app.root.addChild(root);
    addShape(root, 'sphere', material('#5a6070'), [0, 0, 0], 0.25, 'pivot');
    const rod = new pc.Entity('rod');
    root.addChild(rod);
    addShape(rod, 'box', material('#aab0c0'), [0, -1.2, 0], [0.1, 2.4, 0.1], 'bar');
    addShape(rod, 'sphere', material(s.colour), [0, -2.5, 0], 0.7, 'bob');
    root.addComponent('anim', { activate: true });
    // assignAnimation(path, track, layerName, speed, loop)
    root.anim!.assignAnimation('Swing', swing, undefined, s.speed, s.loop);
    return root;
  });

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 5) {
        t = 0;
        // Restart the non-looping state; it is held on its last frame until told otherwise.
        rigs[3]!.anim!.baseLayer!.play('Swing');
      }
    });
  } else {
    const panel = createPanel(el);
    panel.readout(SETUPS.map((s, i) => `${i + 1}: ${s.label}`).join('  |  '));
    panel.row();
    panel.slider('component speed', 0, 2, 0.1, 1, (v) => rigs.forEach((r) => (r.anim!.speed = v)));
    panel.check('component playing', true, (on) => rigs.forEach((r) => (r.anim!.playing = on)));
    panel.button("restart the non-looping state: play('Swing')", () => rigs[3]!.anim!.baseLayer!.play('Swing'));
    panel.button('component speed = -1 (holds every clip on its first frame)', () => rigs.forEach((r) => (r.anim!.speed = -1)));
  }
  return () => scene.dispose();
};

export default mount;
