// Activate off: playing = true alone does nothing until layers are started
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTrack } from '../../shared/animation.ts';

const hop = buildTrack('Hop', 1, [
  { path: ['cube'], property: 'localPosition', times: [0, 0.5, 1], values: [[0, 0.6, 0], [0, 2, 0], [0, 0.6, 0]] },
  { path: ['cube'], property: 'localScale', times: [0, 0.5, 1], values: [[1, 1, 1], [0.8, 1.3, 0.8], [1, 1, 1]] },
]);

const BOXES = [
  { label: 'activate: true', colour: '#7bc67b' },
  { label: 'activate: false, then playing = true', colour: '#f2c14e' },
  { label: 'activate: false, then playing = true and baseLayer.play()', colour: '#4ab3e8' },
];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 9, pitch: -22, yaw: 0, autoRotate: 0, target: new pc.Vec3(0, 1, 0) } });
  const { app } = scene;

  const cubes = BOXES.map((b, i) => {
    const e = addShape(app.root, 'box', material(b.colour), [(i - 1) * 2.8, 0.6, 0], 1, 'cube');
    // The anim component is configured at creation: only the first one starts by itself.
    e.addComponent('anim', { activate: i === 0 });
    e.anim!.assignAnimation('Hop', hop);
    return e;
  });

  const setPlaying = (i: number): void => {
    cubes[i]!.anim!.playing = true;
  };
  const startLayer = (i: number): void => {
    cubes[i]!.anim!.baseLayer!.play();
  };

  if (ctx.preview) {
    let t = 0;
    let step = 0;
    const idle = (i: number): void => {
      cubes[i]!.anim!.playing = false;
      cubes[i]!.anim!.baseLayer!.pause();
    };
    idle(1);
    idle(2);
    app.on('update', (dt: number) => {
      t += dt;
      if (t < 1.6) return;
      t = 0;
      step = (step + 1) % 4;
      // 1: playing alone changes nothing. 2: playing plus play() starts the third cube.
      // 3: play() on the second finally starts it. 0: stop both and begin again.
      if (step === 1) setPlaying(1);
      if (step === 2) {
        setPlaying(2);
        startLayer(2);
      }
      if (step === 3) startLayer(1);
      if (step === 0) {
        idle(1);
        idle(2);
      }
    });
  } else {
    const panel = createPanel(el);
    const out = panel.readout();
    app.on('update', () => {
      out.textContent = cubes.map((c, i) => `${i + 1}: playing=${c.anim!.playing} layer playing=${c.anim!.baseLayer!.playing}`).join('   |   ');
    });
    BOXES.forEach((b, i) => {
      panel.row();
      panel.readout(`${i + 1}  ${b.label}`);
      panel.button('anim.playing = true', () => setPlaying(i));
      panel.button('anim.baseLayer.play()', () => startLayer(i));
      panel.button('anim.baseLayer.pause()', () => cubes[i]!.anim!.baseLayer!.pause());
    });
  }
  return () => scene.dispose();
};

export default mount;
