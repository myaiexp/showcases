// An AnimationClip made in code: translation, Euler rotation and scale tracks on a box
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, Mesh, NodeEulerRotationTrack, NodeScaleTrack, NodeTranslationTrack, Scene } from '@zephyr3d/scene';
import { animScene, flat } from '../../shared/anim-kit.ts';
import { toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(3, 2.6, 4), target: new Vector3(0, 1.2, 0), shadows: !stage.preview });

  const box = new Mesh(scene, new BoxShape({ size: 0.8 }), flat(0.95, 0.55, 0.2));
  box.position.setXYZ(0, 0.4, 0);

  // createAnimation makes an empty clip; each track animates one property of the node it is added for
  const move = box.animationSet.createAnimation('move')!;
  move.addTrack(
    box,
    new NodeTranslationTrack('linear', [
      { time: 0, value: new Vector3(0, 0.4, 0) },
      { time: 1, value: new Vector3(0, 2.4, 0) },
      { time: 2, value: new Vector3(0, 0.4, 0) },
    ]),
  );
  const spin = box.animationSet.createAnimation('spin')!;
  // Four turns around Y over two seconds
  spin.addTrack(
    box,
    new NodeEulerRotationTrack('linear', [
      { time: 0, value: new Vector3(0, 0, 0) },
      { time: 2, value: new Vector3(0, 8 * Math.PI, 0) },
    ]),
  );
  const grow = box.animationSet.createAnimation('grow')!;
  grow.addTrack(
    box,
    new NodeScaleTrack('linear', [
      { time: 0, value: new Vector3(1, 1, 1) },
      { time: 1, value: new Vector3(1.6, 0.6, 1.6) },
      { time: 2, value: new Vector3(1, 1, 1) },
    ]),
  );
  const clips = ['move', 'spin', 'grow'];
  const set = (name: string, on: boolean): void => {
    if (on) box.animationSet.playAnimation(name, { repeat: 0 });
    else box.animationSet.stopAnimation(name);
  };
  clips.forEach((c) => set(c, true));
  stage.caption('move + spin + grow, repeat: 0');
  if (stage.bar) clips.forEach((c) => toggle(stage.bar!, c, true, (v) => set(c, v)));
  myApp.run();
});
