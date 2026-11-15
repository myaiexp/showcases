// Two complementary masked clips play together: walk below the waist, wave above it
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
import { slider, toggle } from '../../shared/controls.ts';
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

  // lowerBody keeps root motion by default; upperBody drops it
  animSet.createSkeletalMaskedAnimation('walk', 'walk_lower', { type: 'humanoid', preset: 'lowerBody' });
  animSet.createSkeletalMaskedAnimation('wave', 'wave_upper', { type: 'humanoid', preset: 'upperBody' });

  const play = (name: string, on: boolean): void => {
    if (on) animSet.playAnimation(name, { repeat: 0, weight: 1, fadeIn: 0.25 });
    else animSet.stopAnimation(name, { fadeOut: 0.25 });
  };
  play('walk_lower', true);
  play('wave_upper', true);
  stage.caption('walk_lower + wave_upper');

  if (stage.bar) {
    toggle(stage.bar, 'walk_lower', true, (v) => play('walk_lower', v));
    toggle(stage.bar, 'wave_upper', true, (v) => play('wave_upper', v));
    slider(stage.bar, 'wave_upper weight', [0, 1, 0.05], 1, (v) => {
      const pb = animSet.getPlayback('wave_upper');
      if (pb) pb.weight = v;
    });
  }
  const out = stage.readout();
  if (out) out.textContent = `clips: ${animSet.getAnimationNames().join(', ')}`;
  myApp.run();
});
