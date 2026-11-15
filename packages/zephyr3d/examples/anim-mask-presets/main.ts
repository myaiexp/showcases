// createSkeletalMaskedAnimation with a humanoid preset: only the chosen body part moves
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type HumanoidSkeletalAnimationMaskPreset } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
import { select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { figureGlb } from '../../shared/gltf/figure.ts';
import { memoryFiles } from '../../shared/vfs.ts';

const PRESETS: HumanoidSkeletalAnimationMaskPreset[] = [
  'fullBody', 'upperBody', 'lowerBody', 'head', 'arms', 'leftArm', 'rightArm', 'legs', 'leftLeg', 'rightLeg',
];

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/figure.glb': figureGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { shadows: !stage.preview });
  const model = await loadGlb(scene, '/models/figure.glb');
  const animSet = model.animationSet;

  let current = '';
  const show = (preset: HumanoidSkeletalAnimationMaskPreset): void => {
    if (current) animSet.stopAnimation(current);
    current = `run_${preset}`;
    // One masked clip per preset, cut from the full-body run clip the first time it is wanted. The mask
    // needs the humanoid joint mapping, which the engine finds from the Mixamo bone names.
    if (!animSet.getAnimationClip(current)) animSet.createSkeletalMaskedAnimation('run', current, { type: 'humanoid', preset });
    animSet.playAnimation(current, { repeat: 0 });
    stage.caption(`{ type: 'humanoid', preset: '${preset}' }`);
  };
  show('upperBody');
  if (stage.bar) select(stage.bar, 'preset', PRESETS, 'upperBody', show);
  else stage.every(1800, (i) => show(PRESETS[(i + 1) % PRESETS.length]!));
  const out = stage.readout();
  if (out) out.textContent = `getAnimationNames(): ${animSet.getAnimationNames().join(', ')}`;
  myApp.run();
});
