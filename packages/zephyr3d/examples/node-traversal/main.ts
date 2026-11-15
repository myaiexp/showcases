// Finding and walking nodes: findNodeByName, iterate, iterateBottomToTop and the isMesh/isLight guards
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  BoxShape,
  DirectionalLight,
  Mesh,
  Scene,
  SphereShape,
  CylinderShape,
  type SceneNode,
} from '@zephyr3d/scene';
import { button } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lambert, orbitCamera } from '../../shared/light-world.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 1, 1.5), Vector3.zero(), Vector3.axisPY());

  const plain = lambert(0.45, 0.55, 0.8);
  const lit = lambert(1, 0.8, 0.1);
  // A little figure: model > Body > Head, Arm.L, Arm.R. Names are what findNodeByName looks up.
  const model = new Mesh(scene, new BoxShape({ size: 0.1 }), plain);
  model.name = 'model';
  const part = (name: string, shape: BoxShape | SphereShape | CylinderShape, parent: SceneNode, x: number, y: number): Mesh => {
    const m = new Mesh(scene, shape, plain);
    m.name = name;
    m.parent = parent;
    m.position.setXYZ(x, y, 0);
    return m;
  };
  const body = part('Body', new BoxShape({ sizeX: 1.4, sizeY: 2, sizeZ: 0.8 }), model, 0, 0);
  part('Head', new SphereShape({ radius: 0.6 }), body, 0, 1.7);
  part('Arm.L', new CylinderShape({ topRadius: 0.2, bottomRadius: 0.2, height: 1.8 }), body, -1.2, 0);
  part('Arm.R', new CylinderShape({ topRadius: 0.2, bottomRadius: 0.2, height: 1.8 }), body, 1.2, 0);

  orbitCamera(scene, new Vector3(0, 1.5, 9), 100, new Vector3(0, 0.8, 0));

  const out = stage.readout();
  // Lights the visited nodes one after the other (driven by tick), so the walk order shows on screen.
  let walk: { label: string; order: SceneNode[]; start: number } | null = null;
  let now = 0;
  const sweep = (label: string, order: SceneNode[]): void => {
    walk = { label, order, start: now };
  };
  myApp.on('tick', (_dt, ms) => {
    now = ms;
    model.rotation.fromEulerAngle(0, Math.sin(ms * 0.0005) * 0.6, 0);
    if (!walk) return;
    const step = Math.floor((ms - walk.start) / 450);
    const visited = walk.order.slice(0, step + 1);
    scene.rootNode.iterate((n) => {
      if (n.isMesh()) n.material = n === visited[step] ? lit : plain;
    });
    if (out) out.textContent = `${walk.label}\n${visited.map((n) => n.name).join(' > ')}`;
    if (step >= walk.order.length) walk = null;
  });

  const topDown = (): void => {
    const order: SceneNode[] = [];
    model.iterate((node) => {
      order.push(node);
    });
    sweep('model.iterate(): self first, then descendants', order);
  };
  const bottomUp = (): void => {
    const order: SceneNode[] = [];
    model.iterateBottomToTop((node) => {
      order.push(node);
    });
    sweep('model.iterateBottomToTop(): children before parents', order);
  };
  const find = (): void => {
    const head = model.findNodeByName<Mesh>('Head');
    walk = null;
    scene.rootNode.iterate((n) => {
      if (n.isMesh()) n.material = n === head ? lit : plain;
    });
    if (out) out.textContent = `model.findNodeByName('Head') -> ${head ? head.name : 'null'}\nmodel.findNodeByName('Tail') -> ${model.findNodeByName('Tail')}`;
  };
  const counts = (): void => {
    let meshes = 0;
    let lights = 0;
    scene.rootNode.iterate((n) => {
      if (n.isMesh()) meshes++;
      else if (n.isLight()) lights++;
    });
    if (out) out.textContent = `isMesh(): ${meshes}   isLight(): ${lights}\nparent of Head: ${model.findNodeByName('Head')?.parent?.name}\nchildren of Body: ${body.children.map((c) => c.name).join(', ')}`;
  };

  if (stage.bar) {
    button(stage.bar, 'iterate()', topDown);
    button(stage.bar, 'iterateBottomToTop()', bottomUp);
    button(stage.bar, "findNodeByName('Head')", find);
    button(stage.bar, 'isMesh / isLight', counts);
    topDown();
  } else {
    // Cards: alternate the two walk orders.
    stage.caption('iterate() and iterateBottomToTop() visit nodes in different orders');
    topDown();
    stage.every(3600, (i) => (i % 2 ? bottomUp() : topDown()));
  }
  myApp.run();
});
