// A hanging chain with a sphere collider, a flat plane and a grabber, updated by hand
import { InterpolatorScalar, Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, JointDynamicsSystem, Mesh, Scene, SceneNode, SphereShape } from '@zephyr3d/scene';
import { animScene, flat } from '../../shared/anim-kit.ts';
import { button, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(2.6, 1.6, 3.2), target: new Vector3(0, 1.1, 0), shadows: !stage.preview });

  // A bar and a chain of eight bead nodes hanging from it
  const root = new SceneNode(scene);
  root.position.setXYZ(0, 2.2, 0);
  const bar = new Mesh(scene, new BoxShape({ sizeX: 0.5, sizeY: 0.06, sizeZ: 0.06 }), flat(0.8, 0.8, 0.85));
  bar.parent = root;
  const beads: SceneNode[] = [];
  const bead = flat(0.95, 0.55, 0.2);
  for (let i = 0; i < 9; i++) {
    const node = new SceneNode(scene);
    node.parent = i === 0 ? root : beads[i - 1]!;
    node.position.setXYZ(0, i === 0 ? 0 : -0.2, 0);
    const ball = new Mesh(scene, new SphereShape({ radius: 0.06 }), bead);
    ball.parent = node;
    beads.push(node);
  }
  const jointDynamics = new JointDynamicsSystem({
    chainConfig: { systemRoot: root, chains: [{ start: beads[0]!, end: beads[8]! }] },
    controllerConfig: {
      gravity: new Vector3(0, -9.8, 0),
      subSteps: 3,
      relaxation: 3,
      curves: {
        resistance: InterpolatorScalar.constant(0.95),
        hardness: InterpolatorScalar.constant(0),
        pointRadius: InterpolatorScalar.constant(0.06),
      },
      constraintOptions: { structuralVertical: true, bendingVertical: true },
    },
  });

  // Colliders and grabbers read their SceneNode's transform every frame
  const ballNode = new Mesh(scene, new SphereShape({ radius: 0.25 }), flat(0.5, 0.55, 0.65));
  const grabNode = new Mesh(scene, new SphereShape({ radius: 0.12 }), flat(0.3, 0.9, 0.5));
  const collider = jointDynamics.addSphereCollider(0.25, ballNode, 0.4);
  const grabber = jointDynamics.addGrabber({ radius: 0.25, force: 0.5 }, grabNode);
  // The plane's normal points up; chains cannot sink below it
  const planeY = 0.7;
  const slab = new Mesh(scene, new BoxShape({ sizeX: 1.2, sizeY: 0.02, sizeZ: 1.2 }), flat(0.3, 0.35, 0.6));
  slab.position.setXYZ(0, planeY - 0.01, 0);
  const plane = jointDynamics.addFlatPlane(new Vector3(0, 1, 0), new Vector3(0, planeY, 0));
  jointDynamics.setGrabberEnabled(grabber, false);

  const on = { collider: true, plane: true, grabber: false };
  myApp.on('tick', (dt: number, elapsed: number) => {
    const t = elapsed / 1000;
    ballNode.position.setXYZ(0.55 * Math.sin(t * 1.3), 1.5, 0);
    grabNode.position.setXYZ(0, 1.2, 0.4 * Math.sin(t * 1.7));
    jointDynamics.update(dt / 1000);
  });
  const sync = (): void => {
    jointDynamics.setColliderEnabled(collider, on.collider);
    jointDynamics.setFlatPlaneEnabled(plane, on.plane);
    jointDynamics.setGrabberEnabled(grabber, on.grabber);
    ballNode.showState = on.collider ? 'visible' : 'hidden';
    slab.showState = on.plane ? 'visible' : 'hidden';
    grabNode.showState = on.grabber ? 'visible' : 'hidden';
    stage.caption(`collider ${on.collider ? 'on' : 'off'}, plane ${on.plane ? 'on' : 'off'}, grabber ${on.grabber ? 'on' : 'off'}`);
  };
  sync();
  if (stage.bar) {
    toggle(stage.bar, 'sphere collider', on.collider, (v) => ((on.collider = v), sync()));
    toggle(stage.bar, 'flat plane', on.plane, (v) => ((on.plane = v), sync()));
    toggle(stage.bar, 'grabber', on.grabber, (v) => ((on.grabber = v), sync()));
    button(stage.bar, 'resetChains()', () => jointDynamics.resetChains());
  } else {
    stage.every(2600, (i) => {
      on.collider = i % 3 !== 2;
      on.grabber = i % 3 === 2;
      sync();
    });
  }
  myApp.run();
});
