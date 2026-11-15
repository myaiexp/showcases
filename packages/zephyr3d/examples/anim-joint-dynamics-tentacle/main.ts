// JointDynamicsSystem on a bone chain, attached to the rig with JointDynamicsModifier
import { InterpolatorScalar, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, JointDynamicsModifier, JointDynamicsSystem, Scene } from '@zephyr3d/scene';
import { animScene, findJoint, loadGlb } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { tentacleGlb, TENTACLE_JOINTS } from '../../shared/gltf/tentacle.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/tentacle.glb': tentacleGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(2.2, 1.3, 2.8), target: new Vector3(0, 0.8, 0), shadows: !stage.preview });
  const model = await loadGlb(scene, '/models/tentacle.glb');
  // The clip moves the joints; the dynamics add lag, inertia and overshoot on top
  model.animationSet.playAnimation('sway', { repeat: 0 });

  const jointDynamics = new JointDynamicsSystem({
    chainConfig: {
      systemRoot: model,
      chains: [{ start: findJoint(model, TENTACLE_JOINTS[0]!), end: findJoint(model, TENTACLE_JOINTS[7]!) }],
    },
    controllerConfig: {
      gravity: new Vector3(0, -9.8, 0),
      subSteps: 3,
      relaxation: 3,
      curves: {
        resistance: InterpolatorScalar.constant(0.92),
        hardness: InterpolatorScalar.constant(0.1),
        pointRadius: InterpolatorScalar.constant(0.03),
      },
      constraintOptions: { structuralVertical: true, bendingVertical: true },
    },
  });
  // The modifier updates the system after the skeleton animation step: no manual update()
  const modifier = new JointDynamicsModifier(jointDynamics);
  model.animationSet.rigs[0]!.get()!.modifiers.push(modifier);

  let wind = 0;
  let gravity = 9.8;
  let hardness = 0.1;
  const apply = (): void => {
    // Changes are partial: only the fields named are updated
    jointDynamics.controller.updateConfig({
      windForce: new Vector3(wind, 0, 0),
      gravity: new Vector3(0, -gravity, 0),
      curves: { hardness: InterpolatorScalar.constant(hardness) },
    });
  };
  if (stage.bar) {
    slider(stage.bar, 'wind (x)', [0, 60, 1], wind, (v) => ((wind = v), apply()));
    slider(stage.bar, 'gravity', [0, 25, 0.5], gravity, (v) => ((gravity = v), apply()));
    slider(stage.bar, 'hardness', [0, 0.5, 0.01], hardness, (v) => ((hardness = v), apply()));
    slider(stage.bar, 'modifier.weight', [0, 1, 0.05], 1, (v) => (modifier.weight = v));
  } else {
    // Cards: gusts of wind
    myApp.on('tick', (_dt: number, elapsed: number) => {
      wind = 30 * Math.max(0, Math.sin(elapsed / 900));
      apply();
    });
  }
  stage.caption('JointDynamicsSystem + JointDynamicsModifier');
  const out = stage.readout();
  if (out) out.textContent = 'modifier.weight 1 is full dynamics, 0 is the sway clip alone';
  myApp.run();
});
