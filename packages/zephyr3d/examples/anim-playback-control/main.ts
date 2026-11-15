// AnimationSet.play() returns a handle: pause, resume, seek, speedRatio and fadeTo
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
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

  // play() returns the playback; null when the clip name is unknown
  const playback = model.animationSet.play('walk', { repeat: 0, speedRatio: 1 });
  if (!playback) throw new Error('no walk clip');

  const out = stage.readout();
  myApp.on('tick', () => {
    const text = `state ${playback.state}  time ${playback.time.toFixed(2)} s  normalizedTime ${playback.normalizedTime.toFixed(2)}  weight ${playback.weight.toFixed(2)}  speedRatio ${playback.speedRatio.toFixed(2)}`;
    if (out) out.textContent = text;
  });

  if (stage.bar) {
    let paused = false;
    const pause = button(stage.bar, 'pause', () => {
      paused = !paused;
      if (paused) playback.pause();
      else playback.resume();
      pause.textContent = paused ? 'resume' : 'pause';
    });
    button(stage.bar, 'seek(0)', () => playback.seek(0, { apply: true }));
    slider(stage.bar, 'normalizedTime', [0, 1, 0.01], 0, (v) => (playback.normalizedTime = v));
    slider(stage.bar, 'speedRatio', [-2, 3, 0.1], 1, (v) => (playback.speedRatio = v));
    button(stage.bar, 'fadeTo(0.2, 0.5)', () => playback.fadeTo(0.2, 0.5));
    button(stage.bar, 'fadeTo(1, 0.5)', () => playback.fadeTo(1, 0.5));
  } else {
    // Cards: change the speed and pause now and then
    stage.every(1800, (i) => {
      if (i % 3 === 0) playback.pause();
      else playback.resume();
      playback.speedRatio = i % 3 === 1 ? 2 : 1;
      stage.caption(playback.state === 'paused' ? 'pause()' : `speedRatio = ${playback.speedRatio}`);
    });
  }
  myApp.run();
});
