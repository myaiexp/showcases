// sync: { target } starts a clip at another playing clip's phase, so the stride does not stumble
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type SceneNode } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
import { button, select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { figureGlb } from '../../shared/gltf/figure.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/figure.glb': figureGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(0, 1.5, 4.6), shadows: !stage.preview });
  const plain = await loadGlb(scene, '/models/figure.glb');
  // Loading the same file again gives a second actor with its own AnimationSet
  const synced: SceneNode = await loadGlb(scene, '/models/figure.glb');
  plain.position.setXYZ(-0.8, 0, 0);
  synced.position.setXYZ(0.8, 0, 0);

  let mode: 'normalized' | 'time' = 'normalized';
  let running = false;
  const toRun = (actor: SceneNode, sync: boolean): void => {
    const set = actor.animationSet;
    set.playAnimation('run', {
      repeat: 0,
      fadeIn: 0.3,
      // Without sync, run starts at 0 whatever phase walk had reached
      sync: sync ? { target: 'walk', mode } : undefined,
    });
    set.stopAnimation('walk', { fadeOut: 0.3 });
  };
  const toWalk = (actor: SceneNode): void => {
    actor.animationSet.stopAnimation('run', { fadeOut: 0.3 });
    actor.animationSet.playAnimation('walk', { repeat: 0, fadeIn: 0.3 });
  };
  for (const a of [plain, synced]) a.animationSet.playAnimation('walk', { repeat: 0 });
  // Walk at slightly different phases to begin with, so the difference shows at once
  plain.animationSet.getPlayback('walk')!.normalizedTime = 0.37;
  synced.animationSet.getPlayback('walk')!.normalizedTime = 0.37;

  const switchBoth = (): void => {
    running = !running;
    if (running) {
      toRun(plain, false);
      toRun(synced, true);
    } else {
      toWalk(plain);
      toWalk(synced);
    }
    stage.caption(running ? "run: left from 0, right sync: { target: 'walk' }" : 'back to walk');
  };
  const out = stage.readout();
  myApp.on('tick', () => {
    const phase = (a: SceneNode): string => {
      const pb = a.animationSet.getPlayback('run') ?? a.animationSet.getPlayback('walk');
      return pb ? `${pb.clip.name} ${pb.normalizedTime.toFixed(2)}` : '-';
    };
    if (out) out.textContent = `left (no sync): ${phase(plain)}    right (sync): ${phase(synced)}`;
  });
  if (stage.bar) {
    select(stage.bar, 'sync mode', ['normalized', 'time'] as const, mode, (v) => (mode = v));
    button(stage.bar, 'walk <-> run', switchBoth);
  } else {
    stage.every(2500, switchBoth);
  }
  myApp.run();
});
