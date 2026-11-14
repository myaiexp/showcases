// app.stats.user counters on MiniStats: a wave, a per-frame total, a timer
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 12, orbit: { distance: 9, pitch: -32 }, sun: { shadows: true } });
  const { app } = scene;
  const user = app.stats.user;

  // Counters are entries of a Map. Initialise them before MiniStats first reads them.
  user.set('wave', 10);
  user.set('moved', 0);
  user.set('workMs', 0);

  // A graph is a path under app.stats; "user.wave" reads the map entry named wave.
  const options = pc.MiniStats.getDefaultOptions();
  options.startSizeIndex = 2;
  options.stats.push(
    { name: 'Wave', stats: ['user.wave'], decimalPlaces: 1, watermark: 20 },
    { name: 'Moved', stats: ['user.moved'], decimalPlaces: 0, watermark: 60 },
    { name: 'Work', stats: ['user.workMs'], decimalPlaces: 2, unitsName: 'ms', watermark: 4 },
  );
  const miniStats = new pc.MiniStats(app, options);

  // The engine never resets user counters: a per-frame total is cleared on frameupdate.
  const reset = (): void => void user.set('moved', 0);
  app.on('frameupdate', reset);

  const mat = material('#4ab3e8', { metalness: 0.3, gloss: 0.6 });
  const balls = Array.from({ length: 60 }, (_, i) => {
    const e = new pc.Entity('ball');
    e.addComponent('render', { type: 'sphere', material: mat });
    e.setLocalScale(0.4, 0.4, 0.4);
    e.setLocalPosition(((i % 10) - 4.5) * 0.8, 0.4, (Math.floor(i / 10) - 2.5) * 0.8);
    app.root.addChild(e);
    return e;
  });

  const state = { moving: 30, work: ctx.preview ? 8 : 5 };
  const sink = { value: 0 };
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    user.set('wave', 10 + 10 * Math.sin(t));
    // The count that moved this frame, added up as the loop goes.
    for (let i = 0; i < state.moving; i++) {
      const b = balls[i]!;
      b.setLocalPosition(b.getLocalPosition().x, 0.4 + 0.3 * Math.sin(t * 2 + i), b.getLocalPosition().z);
      user.set('moved', user.get('moved')! + 1);
    }
    // Synchronous code is timed with two performance.now() calls; the unit is ms.
    const start = performance.now();
    for (let i = 0; i < state.work * 20000; i++) sink.value += Math.sqrt(i);
    user.set('workMs', performance.now() - start);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('balls moved per frame', 0, 60, 1, state.moving, (v) => (state.moving = v));
    panel.slider('busy loop size', 0, 100, 1, state.work, (v) => (state.work = v));
    panel.readout('Wave is a sine written once per frame; Moved is cleared on frameupdate; Work is timed with performance.now().');
  }

  return () => {
    app.off('frameupdate', reset);
    miniStats.destroy();
    user.clear();
    mat.destroy();
    scene.dispose();
  };
};

export default mount;
