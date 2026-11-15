// The same translation keyframes under 'linear', 'step' and 'cubicspline-natural' interpolation
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, Mesh, NodeTranslationTrack, Scene, SphereShape } from '@zephyr3d/scene';
import type { InterpolationMode } from '@zephyr3d/base';
import { animScene, flat } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(0, 4.2, 4.6), target: new Vector3(0, 0.5, 0), shadows: false });

  // Waypoints of a zig-zag; every mode sees the same five keys (seconds, position)
  const keys = [
    { time: 0, value: new Vector3(-2, 0.2, 0) },
    { time: 1, value: new Vector3(-1, 1.6, 0) },
    { time: 2, value: new Vector3(0, 0.2, 0) },
    { time: 3, value: new Vector3(1, 1.6, 0) },
    { time: 4, value: new Vector3(2, 0.2, 0) },
  ];
  const lanes: { mode: InterpolationMode; z: number; color: [number, number, number] }[] = [
    { mode: 'linear', z: -1.2, color: [0.3, 0.8, 1] },
    { mode: 'step', z: 0, color: [1, 0.7, 0.2] },
    { mode: 'cubicspline-natural', z: 1.2, color: [0.5, 1, 0.5] },
  ];
  const playbacks = lanes.map(({ mode, z, color }) => {
    const ball = new Mesh(scene, new SphereShape({ radius: 0.15 }), flat(...color));
    ball.position.setXYZ(0, 0, z);
    // The keys' positions are relative to the ball's lane, so the lanes are separate nodes' own space
    for (const k of keys) {
      const cube = new Mesh(scene, new BoxShape({ size: 0.08 }), flat(...color));
      cube.position.setXYZ(k.value.x, k.value.y, z);
    }
    const clip = ball.animationSet.createAnimation(mode)!;
    // The first argument is the interpolation mode
    clip.addTrack(ball, new NodeTranslationTrack(mode, keys.map((k) => ({ time: k.time, value: new Vector3(k.value.x, k.value.y, z + k.value.z) }))));
    return ball.animationSet.play(mode, { repeat: 0 })!;
  });
  stage.caption("'linear' (blue), 'step' (orange), 'cubicspline-natural' (green)");
  if (stage.bar) slider(stage.bar, 'speedRatio', [0.1, 3, 0.1], 1, (v) => playbacks.forEach((p) => (p.speedRatio = v)));
  myApp.run();
});
