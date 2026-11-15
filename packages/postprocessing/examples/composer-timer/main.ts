// composer.render() with no argument uses the composer's own timer: scale it for slow motion
import { EffectComposer, EffectPass, RenderPass, ScanlineEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tune } from '../../shared/tune.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // ScanlineEffect scrolls with the delta time its pass receives; scrollSpeed is missing from the typings.
  const scanlines = new ScanlineEffect({ density: 1.4 });
  (scanlines as unknown as { scrollSpeed: number }).scrollSpeed = 0.15;
  composer.addPass(new EffectPass(stage.camera, scanlines));

  const timer = composer.getTimer();
  const update = tune(
    stage,
    [{ name: 'timescale', min: 0, max: 3, step: 0.05, value: 1, sweep: [0.1, 2.5, 8], set: (v) => (timer.timescale = v) }],
    'getTimer().timescale',
  );

  stage.run((_dt, t) => {
    update(t);
    // No deltaTime argument: the composer updates its timer and passes the scaled delta on.
    composer.render();
    // The scene follows the timer's elapsed time, so it slows down with the scanlines.
    subject.update(timer.elapsed);
  });
  return () => stage.dispose();
};

export default mount;
