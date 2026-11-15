// showState visible/hidden/inherit on a parent and its children, and the resolved `hidden`
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, DirectionalLight, Mesh, Scene, SphereShape, type SceneNodeVisible } from '@zephyr3d/scene';
import { select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lambert, orbitCamera } from '../../shared/light-world.ts';

const STATES = ['inherit', 'visible', 'hidden'] as const;

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 1.2, 1.5), Vector3.zero(), Vector3.axisPY());

  // group > left, right: the children are inheriting by default
  const group = new Mesh(scene, new BoxShape({ size: 1.5 }), lambert(0.95, 0.85, 0.2));
  const left = new Mesh(scene, new SphereShape(), lambert(1, 0.4, 0.3));
  left.parent = group;
  left.position.setXYZ(-3, 0, 0);
  const right = new Mesh(scene, new SphereShape(), lambert(0.3, 0.6, 1));
  right.parent = group;
  right.position.setXYZ(3, 0, 0);

  orbitCamera(scene, new Vector3(0, 3, 10), 100);

  const out = stage.readout();
  const report = (): void => {
    const row = (name: string, n: Mesh): string => `${name.padEnd(6)} showState: ${n.showState.padEnd(8)} hidden: ${n.hidden}`;
    const text = [row('group', group), row('left', left), row('right', right)].join('\n');
    if (out) out.textContent = text;
    stage.caption(`group ${group.showState} / left ${left.showState} / right ${right.showState}`);
  };
  const set = (node: Mesh, v: SceneNodeVisible): void => {
    node.showState = v;
    report();
  };
  report();

  myApp.on('tick', (_dt, ms) => {
    group.rotation.fromEulerAngle(0, ms * 0.0004, 0);
  });

  if (stage.bar) {
    select(stage.bar, 'group', STATES, 'inherit', (v) => set(group, v));
    select(stage.bar, 'left', STATES, 'inherit', (v) => set(left, v));
    select(stage.bar, 'right', STATES, 'inherit', (v) => set(right, v));
  } else {
    // Cards: step through a few combinations.
    const steps: [SceneNodeVisible, SceneNodeVisible, SceneNodeVisible][] = [
      ['inherit', 'inherit', 'inherit'],
      ['hidden', 'inherit', 'inherit'],
      ['hidden', 'visible', 'inherit'],
      ['inherit', 'hidden', 'inherit'],
    ];
    stage.every(1600, (i) => {
      const [g, l, r] = steps[i % steps.length]!;
      group.showState = g;
      left.showState = l;
      right.showState = r;
      report();
    });
  }
  myApp.run();
});
