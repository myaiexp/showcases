// Masks by joint name for any rig: include and exclude take strings, RegExps or predicates
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type NamedJointsSkeletalAnimationMaskOptions } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
import { select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { figureGlb } from '../../shared/gltf/figure.ts';
import { memoryFiles } from '../../shared/vfs.ts';

type Variant = { label: string; code: string; options: Omit<NamedJointsSkeletalAnimationMaskOptions, 'type'> };

const VARIANTS: Variant[] = [
  {
    label: 'name, with exclude',
    code: "include: ['mixamorig:Spine'], exclude: ['mixamorig:RightArm']",
    options: { include: ['mixamorig:Spine'], exclude: ['mixamorig:RightArm'], includeDescendants: true },
  },
  {
    label: 'RegExp',
    code: 'include: [/Leg|Foot|Toe/]',
    options: { include: [/Leg|Foot|Toe/], includeDescendants: false },
  },
  {
    label: 'predicate',
    code: "include: [(joint) => joint.name.endsWith('Arm')]",
    options: { include: [(joint) => joint.name.endsWith('Arm')], includeDescendants: true },
  },
];

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/figure.glb': figureGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { shadows: !stage.preview });
  const model = await loadGlb(scene, '/models/figure.glb');
  const animSet = model.animationSet;

  VARIANTS.forEach((v, i) => {
    animSet.createSkeletalMaskedAnimation('run', `joints_${i}`, { type: 'joints', rootMotion: 'exclude', ...v.options });
  });
  let current = '';
  const show = (i: number): void => {
    if (current) animSet.stopAnimation(current);
    current = `joints_${i}`;
    animSet.playAnimation(current, { repeat: 0 });
    stage.caption(`{ type: 'joints', ${VARIANTS[i]!.code} }`);
    const out = stage.readout();
    if (out) out.textContent = `{ type: 'joints', ${VARIANTS[i]!.code}, includeDescendants: ${VARIANTS[i]!.options.includeDescendants} }`;
  };
  show(0);
  if (stage.bar) {
    select(stage.bar, 'matcher', VARIANTS.map((v) => v.label), VARIANTS[0]!.label, (label) => show(VARIANTS.findIndex((v) => v.label === label)));
  } else {
    stage.every(2200, (i) => show(i % VARIANTS.length));
  }
  myApp.run();
});
