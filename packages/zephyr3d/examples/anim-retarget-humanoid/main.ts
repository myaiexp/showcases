// copyHumanoidAnimationFrom copies a clip between rigs through the humanoid joint mapping
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type HumanoidRootMotionMode, type HumanoidRootMotionScaleMode } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { figureGlb } from '../../shared/gltf/figure.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/figure.glb': figureGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(0, 1.5, 4.8), shadows: !stage.preview });
  const source = await loadGlb(scene, '/models/figure.glb');
  const target = await loadGlb(scene, '/models/figure.glb');
  source.position.setXYZ(-0.8, 0, 0);
  target.position.setXYZ(0.8, 0, 0);
  target.scale.setXYZ(0.6, 0.6, 0.6);

  // Both rigs must carry a humanoidJointMapping; the engine detects it from the Mixamo names
  const mapped = (n: typeof source): boolean => n.animationSet.skeletons.every((s) => !!s.get()?.humanoidJointMapping);

  let rootMotion: HumanoidRootMotionMode = 'scaled';
  let scaleMode: 'legLength' | 'number' = 'legLength';
  let scaleNumber = 1.5;
  let lockY = false;
  const retarget = (): void => {
    const set = target.animationSet;
    // The destination must not already hold a clip of the new name
    set.stopAnimation('jump_retargeted');
    set.deleteAnimation('jump_retargeted');
    const rootMotionScale: HumanoidRootMotionScaleMode = scaleMode === 'number' ? scaleNumber : 'legLength';
    const clip = set.copyHumanoidAnimationFrom(source.animationSet, 'jump', 'jump_retargeted', {
      rootMotion,
      rootMotionScale,
      lockRootMotionAxes: { y: lockY },
    });
    if (clip) set.playAnimation('jump_retargeted', { repeat: 0 });
    stage.caption(`rootMotion: '${rootMotion}', rootMotionScale: ${scaleMode === 'number' ? scaleNumber : "'legLength'"}, lock y: ${lockY}`);
    const out = stage.readout();
    if (out) out.textContent = `humanoid mapping on both rigs: ${mapped(source) && mapped(target)}\nretargeted clip: ${clip ? `'${clip.name}', ${clip.timeDuration.toFixed(2)} s` : 'null'}`;
  };
  source.animationSet.playAnimation('jump', { repeat: 0 });
  retarget();

  if (stage.bar) {
    const modes: HumanoidRootMotionMode[] = ['scaled', 'copy', 'locked', 'none'];
    select(stage.bar, 'rootMotion', modes, rootMotion, (v) => ((rootMotion = v), retarget()));
    select(stage.bar, 'rootMotionScale', ['legLength', 'number'] as const, scaleMode, (v) => ((scaleMode = v), retarget()));
    slider(stage.bar, 'scale number', [0.2, 3, 0.1], scaleNumber, (v) => ((scaleNumber = v), retarget()));
    toggle(stage.bar, 'lock y', lockY, (v) => ((lockY = v), retarget()));
  } else {
    stage.every(2600, (i) => {
      rootMotion = (['scaled', 'copy', 'locked', 'none'] as const)[i % 4]!;
      retarget();
    });
  }
  myApp.run();
});
