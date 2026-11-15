// FABRIKSolver and CCDSolver bend an eight-joint tentacle toward a target, with IKAngleConstraint limits
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, CCDSolver, FABRIKSolver, IKAngleConstraint, IKChain, IKModifier, Mesh, Scene, SphereShape, type IKSolver } from '@zephyr3d/scene';
import { animScene, findJoint, flat, loadGlb } from '../../shared/anim-kit.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { tentacleGlb, TENTACLE_JOINTS } from '../../shared/gltf/tentacle.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/tentacle.glb': tentacleGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(2.2, 1.4, 2.8), target: new Vector3(0, 0.8, 0), shadows: !stage.preview });
  const model = await loadGlb(scene, '/models/tentacle.glb');

  const target = new Mesh(scene, new SphereShape({ radius: 0.05 }), flat(1, 0.75, 0.1));
  const chain = IKChain.fromNodeHierarchy(findJoint(model, TENTACLE_JOINTS[0]!), findJoint(model, TENTACLE_JOINTS[7]!));
  const rig = model.animationSet.rigs[0]!.get()!;
  // IK corrects the pose the animation produced, so keep a clip playing underneath
  model.animationSet.playAnimation('sway', { repeat: 0 });

  let kind: 'FABRIK' | 'CCD' = 'FABRIK';
  let iterations = 15;
  let limited = false;
  let modifier: IKModifier | null = null;
  const build = (): void => {
    if (modifier) rig.modifiers.splice(rig.modifiers.indexOf(modifier), 1);
    // The chain keeps its constraints, so reset them whenever the settings change
    chain.clearConstraints();
    if (limited) for (let i = 1; i < chain.length - 1; i++) chain.addConstraint(new IKAngleConstraint(i, 150, 180));
    // maxIterations and tolerance control iteration count and convergence distance
    const solver: IKSolver = kind === 'FABRIK' ? new FABRIKSolver(chain, iterations, 0.001) : new CCDSolver(chain, iterations, 0.001);
    modifier = new IKModifier(solver, target.position, 1);
    rig.modifiers.push(modifier);
    stage.caption(`new ${kind === 'FABRIK' ? 'FABRIKSolver' : 'CCDSolver'}(chain, ${iterations}, 0.001)${limited ? ' + IKAngleConstraint' : ''}`);
  };
  build();

  myApp.on('tick', (_dt: number, elapsed: number) => {
    const a = elapsed / 1100;
    target.position.setXYZ(0.65 * Math.cos(a), 0.9 + 0.35 * Math.sin(a * 1.3), 0.65 * Math.sin(a));
    modifier?.setTarget(target.getWorldPosition());
  });

  if (stage.bar) {
    select(stage.bar, 'solver', ['FABRIK', 'CCD'] as const, kind, (v) => ((kind = v), build()));
    slider(stage.bar, 'maxIterations', [1, 30, 1], iterations, (v) => ((iterations = v), build()));
    toggle(stage.bar, 'angle constraints (150 to 180)', limited, (v) => ((limited = v), build()));
  } else {
    stage.every(3500, (i) => {
      kind = i % 2 ? 'CCD' : 'FABRIK';
      build();
    });
  }
  myApp.run();
});
