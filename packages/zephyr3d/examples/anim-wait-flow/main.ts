// An async flow built on playback.waitForComplete(), with completionFadeOut between clips
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { animScene, loadGlb, logTo } from '../../shared/anim-kit.ts';
import { button, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { figureGlb } from '../../shared/gltf/figure.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/figure.glb': figureGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { shadows: !stage.preview });
  const model = await loadGlb(scene, '/models/figure.glb');
  const animSet = model.animationSet;
  const log = logTo(stage.readout(), 6);
  let fadeOut = 0.3;
  let stopped = false;
  let runId = 0;

  // The flow reads top to bottom. waitForComplete() only resolves when every repeat is done,
  // so a looping clip (repeat: 0) must be left with stopAnimation, not awaited.
  const sequence = async (id: number): Promise<void> => {
    while (!stopped && id === runId) {
      animSet.play('idle', { repeat: 0, fadeIn: 0.3 });
      log('idle (loops)');
      stage.caption("play('idle', { repeat: 0 })");
      await new Promise((r) => setTimeout(r, stage.preview ? 1200 : 2000));
      if (id !== runId) return;
      animSet.stopAnimation('idle', { fadeOut });
      const wave = animSet.play('wave', { repeat: 1, fadeIn: fadeOut, completionFadeOut: fadeOut });
      log('wave: await waitForComplete()');
      stage.caption('await wave.waitForComplete()');
      await wave?.waitForComplete();
      if (id !== runId) return;
      const jump = animSet.play('jump', { repeat: 1, fadeIn: 0.05, completionFadeOut: fadeOut });
      log(`jump: completionFadeOut ${fadeOut.toFixed(1)} s`);
      stage.caption(`jump: completionFadeOut ${fadeOut.toFixed(1)} s`);
      await jump?.waitForComplete();
    }
  };
  const restart = (): void => {
    runId++;
    for (const n of animSet.getAnimationNames()) animSet.stopAnimation(n);
    void sequence(runId);
  };
  stage.own(() => {
    stopped = true;
  });
  restart();

  if (stage.bar) {
    slider(stage.bar, 'completionFadeOut (s)', [0, 1, 0.1], fadeOut, (v) => (fadeOut = v));
    button(stage.bar, 'restart flow', restart);
  }
  myApp.run();
});
