// IK without a skeleton: solver.solve(target) then applyToNodes() every frame on ordinary nodes
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, CylinderShape, IKChain, Mesh, Scene, SceneNode, SphereShape, TwoBoneIKSolver } from '@zephyr3d/scene';
import { animScene, flat } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(1.5, 1.3, 2.1), target: new Vector3(0, 0.65, 0), shadows: !stage.preview });

  // A three-joint arm: shoulder, elbow and wrist nodes, each bone a cylinder along +Y
  const arm = flat(0.35, 0.6, 0.95);
  const joints: SceneNode[] = [];
  for (let i = 0; i < 3; i++) {
    const joint = new SceneNode(scene);
    if (i > 0) {
      joint.parent = joints[i - 1]!;
      joint.position.setXYZ(0, 0.5, 0);
    } else {
      joint.position.setXYZ(0, 0.2, 0);
    }
    joints.push(joint);
    const ball = new Mesh(scene, new SphereShape({ radius: 0.07 }), flat(0.95, 0.95, 0.95));
    ball.parent = joint;
    if (i < 2) {
      const bone = new Mesh(scene, new CylinderShape({ topRadius: 0.04, bottomRadius: 0.05, height: 0.5 }), arm);
      bone.parent = joint;
      bone.position.setXYZ(0, 0.25, 0);
    }
  }
  const target = new Mesh(scene, new SphereShape({ radius: 0.05 }), flat(1, 0.75, 0.1));

  const chain = IKChain.fromNodeHierarchy(joints[0]!, joints[2]!);
  const solver = new TwoBoneIKSolver(chain, new Vector3(0, 0.6, 1.5), 1);

  let reach = 0.8;
  const out = stage.readout();
  myApp.on('tick', (_dt: number, elapsed: number) => {
    const a = elapsed / 1000;
    const dir = new Vector3(0.8 * Math.cos(a), 0.6 + 0.5 * Math.sin(a * 1.7), 0.8 * Math.sin(a)).inplaceNormalize();
    target.position = new Vector3(0, 0.2, 0).addBy(dir.scaleBy(reach));
    // Solve toward the target, then write the result to the nodes with a weight of 1.
    // solve() is false when the chain cannot reach; it still gets as close as it can.
    const ok = solver.solve(target.getWorldPosition());
    solver.applyToNodes(1);
    const d = Vector3.distance(joints[2]!.getWorldPosition(), target.getWorldPosition());
    if (out) out.textContent = `solve() -> ${ok}   reach ${reach.toFixed(2)} m of ${chain.totalLength.toFixed(2)} m   tip to target ${d.toFixed(3)} m`;
    stage.caption(ok ? 'solve() converged' : 'solve() false: out of reach');
  });
  if (stage.bar) slider(stage.bar, 'target distance (m)', [0.3, 1.4, 0.05], reach, (v) => (reach = v));
  else stage.every(2400, (i) => (reach = i % 2 ? 1.3 : 0.7));
  myApp.run();
});
