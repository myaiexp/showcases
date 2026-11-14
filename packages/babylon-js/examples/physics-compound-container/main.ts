// PhysicsShapeContainer robot versus a single box shape
import { MeshBuilder, PhysicsBody, PhysicsMotionType, PhysicsShapeBox, PhysicsShapeContainer, PhysicsShapeSphere, Quaternion, TransformNode, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { radius: 15, beta: 1.15, target: new Vector3(0, 2, 0) } });
  const { scene } = ps;
  staticFloor(scene, 20, 10);

  // A static ledge with a gap, so the shapes' real silhouettes matter.
  const ledge = MeshBuilder.CreateBox('ledge', { width: 3, height: 1, depth: 3 }, scene);
  ledge.position.set(0, 0.5, 0);
  paint(ledge, '#565f89');
  const ledgeBody = new PhysicsBody(ledge, PhysicsMotionType.STATIC, false, scene);
  ledgeBody.shape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(3, 1, 3), scene);

  const bodyBox = (): PhysicsShapeBox => new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(1, 2, 1), scene);
  const headSphere = (): PhysicsShapeSphere => new PhysicsShapeSphere(Vector3.Zero(), 0.9, scene);

  // A robot: a root node that carries the body, a box torso and a sphere head as visual children.
  const makeRobot = (x: number, color: string, accurate: boolean): TransformNode => {
    const root = new TransformNode(accurate ? 'container-robot' : 'box-robot', scene);
    const torso = MeshBuilder.CreateBox('torso', { width: 1, height: 2, depth: 1 }, scene);
    torso.parent = root;
    const head = MeshBuilder.CreateSphere('head', { diameter: 1.8, segments: 14 }, scene);
    head.parent = root;
    head.position.y = 1.9;
    paint(torso, color);
    paint(head, color);
    root.position.set(x, 6, 0);
    root.rotationQuaternion = Quaternion.FromEulerAngles(0.4, 0, 0.5);

    const body = new PhysicsBody(root, PhysicsMotionType.DYNAMIC, false, scene);
    if (accurate) {
      // Container: each child shape is placed by a transform node, like the visual children.
      const container = new PhysicsShapeContainer(scene);
      const torsoNode = new TransformNode('torso-node', scene);
      torsoNode.parent = root;
      const headNode = new TransformNode('head-node', scene);
      headNode.parent = root;
      headNode.position.y = 1.9;
      container.addChildFromParent(root, bodyBox(), torsoNode);
      container.addChildFromParent(root, headSphere(), headNode);
      body.shape = container;
    } else {
      // One tall box: simple, but it ignores the round head and sticks out above the torso.
      const approx = new PhysicsShapeBox(new Vector3(0, 0.95, 0), Quaternion.Identity(), new Vector3(1, 3.8, 1), scene);
      body.shape = approx;
    }
    body.setMassProperties({ mass: 2 });
    return root;
  };

  let robots: TransformNode[] = [];
  const drop = (): void => {
    for (const r of robots) {
      r.physicsBody?.shape?.dispose();
      r.dispose();
    }
    robots = [makeRobot(-4, '#9ece6a', true), makeRobot(4, '#f7768e', false)];
  };
  drop();
  const timer = setInterval(drop, 5000);
  ps.onDispose(() => clearInterval(timer));

  ps.stage.run();
  return () => ps.dispose();
};

export default mount;
