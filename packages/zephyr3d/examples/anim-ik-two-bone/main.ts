// A two-bone IK chain on the figure's arm: IKChain, TwoBoneIKSolver, IKModifier on the rig
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, IKChain, IKModifier, Mesh, Scene, SphereShape, TwoBoneIKSolver } from '@zephyr3d/scene';
import { animScene, findJoint, flat, loadGlb } from '../../shared/anim-kit.ts';
import { select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { figureGlb } from '../../shared/gltf/figure.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/figure.glb': figureGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(1.6, 1.5, 2.6), shadows: !stage.preview });
  const model = await loadGlb(scene, '/models/figure.glb');
  model.animationSet.playAnimation('idle', { repeat: 0 });

  const target = new Mesh(scene, new SphereShape({ radius: 0.04 }), flat(1, 0.75, 0.1));
  const marker = new Mesh(scene, new SphereShape({ radius: 0.03 }), flat(0.3, 0.9, 1));

  // The chain runs from the upper arm to the hand and must be built once the pose is ready
  const upperArm = findJoint(model, 'LeftArm');
  const hand = findJoint(model, 'LeftHand');
  const chain = IKChain.fromNodeHierarchy(upperArm, hand);
  const rig = model.animationSet.rigs[0]!.get()!;

  // poleVector is a world-space point that decides which way the elbow bends
  const poles = { behind: new Vector3(0.5, 1.1, -0.6), 'in front': new Vector3(0.5, 1.1, 0.8) };
  let modifier: IKModifier<TwoBoneIKSolver> | null = null;
  let weight = 1;
  const setPole = (name: keyof typeof poles): void => {
    if (modifier) rig.modifiers.splice(rig.modifiers.indexOf(modifier), 1);
    const solver = new TwoBoneIKSolver(chain, poles[name], 1);
    modifier = new IKModifier(solver, target.position, weight);
    rig.modifiers.push(modifier);
    marker.position = poles[name];
    stage.caption(`pole vector ${name}`);
  };
  setPole('behind');

  let radius = 0.15;
  myApp.on('tick', (_dt: number, elapsed: number) => {
    const a = elapsed / 900;
    // Moves in front of the shoulder, inside the arm's 0.5 m reach
    target.position.setXYZ(0.35 + radius * Math.cos(a), 1.2 + radius * Math.sin(a), 0.35);
    // If the target moves every frame, update the modifier's target
    modifier?.setTarget(target.getWorldPosition());
  });

  if (stage.bar) {
    slider(stage.bar, 'modifier weight', [0, 1, 0.05], weight, (v) => modifier && (modifier.weight = (weight = v)));
    slider(stage.bar, 'circle radius', [0, 0.25, 0.01], radius, (v) => (radius = v));
    select(stage.bar, 'pole', Object.keys(poles) as (keyof typeof poles)[], 'behind', setPole);
  }
  const out = stage.readout();
  if (out) out.textContent = 'blue dot: pole vector, orange dot: IK target, weight 0 keeps the idle clip';
  myApp.run();
});
