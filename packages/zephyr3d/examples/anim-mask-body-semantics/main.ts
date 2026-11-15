// Humanoid masks by semantic joint: includeBody / excludeBody with HumanoidBodyRig, includeDescendants
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, HumanoidBodyRig, Scene } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
import { select, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { figureGlb } from '../../shared/gltf/figure.ts';
import { memoryFiles } from '../../shared/vfs.ts';

const JOINTS = [
  HumanoidBodyRig.LeftUpperArm, HumanoidBodyRig.RightUpperArm, HumanoidBodyRig.LeftLowerArm, HumanoidBodyRig.Spine,
  HumanoidBodyRig.Head, HumanoidBodyRig.LeftUpperLeg, HumanoidBodyRig.RightLowerLeg, HumanoidBodyRig.Hips,
];

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/figure.glb': figureGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { shadows: !stage.preview });
  const model = await loadGlb(scene, '/models/figure.glb');
  const animSet = model.animationSet;

  let joint: HumanoidBodyRig = HumanoidBodyRig.LeftUpperArm;
  let descendants = true;
  let exclude = false;
  let serial = 0;
  let current = '';
  const rebuild = (): void => {
    if (current) {
      animSet.stopAnimation(current);
      animSet.deleteAnimation(current);
    }
    current = `masked_${++serial}`;
    // Excluding starts from the whole body (preset fullBody), then takes the joint's branch out
    const clip = animSet.createSkeletalMaskedAnimation('run', current, {
      type: 'humanoid',
      preset: exclude ? 'fullBody' : undefined,
      includeBody: exclude ? undefined : [joint],
      excludeBody: exclude ? [joint] : undefined,
      includeDescendants: descendants,
      rootMotion: 'exclude',
    });
    animSet.playAnimation(current, { repeat: 0 });
    const key = exclude ? 'excludeBody' : 'includeBody';
    stage.caption(`${key}: [${joint}], includeDescendants: ${descendants}`);
    const out = stage.readout();
    if (out) out.textContent = `tracks in '${current}': ${clip ? [...clip.tracks.values()].reduce((n, t) => n + t.length, 0) : 0}`;
  };
  rebuild();

  if (stage.bar) {
    select(stage.bar, 'joint', JOINTS, joint, (v) => ((joint = v), rebuild()));
    toggle(stage.bar, 'excludeBody (else includeBody)', exclude, (v) => ((exclude = v), rebuild()));
    toggle(stage.bar, 'includeDescendants', descendants, (v) => ((descendants = v), rebuild()));
  } else {
    stage.every(2000, (i) => {
      joint = JOINTS[i % JOINTS.length]!;
      exclude = i % 4 === 3;
      rebuild();
    });
  }
  myApp.run();
});
