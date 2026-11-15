// Motion blur from the motion-vector buffer: strength, shutter bias and the longest streak
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, Mesh, Scene, SphereShape } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera, pbr, sunAndFloor } from '../../shared/post-scene.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  scene.env.light.type = 'constant';
  scene.env.light.strength = 0.5;
  sunAndFloor(scene, 0.55);

  // Propeller blades spinning fast, and balls racing on a circle
  const hub = new Mesh(scene, new SphereShape({ radius: 0.3 }), pbr(0.3, 0.3, 0.35, 1, 0.3));
  hub.position.setXYZ(0, 2.2, 0);
  const blades: Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const b = new Mesh(scene, new BoxShape({ sizeX: 3.2, sizeY: 0.3, sizeZ: 0.12 }), pbr(0.95, 0.75, 0.2, 0, 0.4));
    b.parent = hub;
    b.rotation.fromEulerAngle(0, 0, (i * Math.PI) / 3);
    blades.push(b);
  }
  const racers = [0, 1, 2, 3].map((i) => new Mesh(scene, new SphereShape({ radius: 0.4 }), pbr(0.2 + i * 0.2, 0.5, 1 - i * 0.2, 0, 0.4)));

  const camera = orbitCamera(scene, new Vector3(0, 3.5, 9), new Vector3(0, 1.4, 0));
  camera.toneMap = true;
  camera.motionBlur = true;
  camera.motionBlurStrength = 1;

  myApp.on('tick', (_dt, ms) => {
    hub.rotation.fromEulerAngle(0, 0, ms * 0.012);
    racers.forEach((r, i) => {
      const a = ms * 0.003 + (i * Math.PI) / 2;
      r.position.setXYZ(Math.cos(a) * 4.2, 0.4, Math.sin(a) * 4.2);
    });
  });
  if (stage.bar) {
    toggle(stage.bar, 'motionBlur', true, (v) => (camera.motionBlur = v));
    slider(stage.bar, 'motionBlurStrength', [0, 3, 0.1], 1, (v) => (camera.motionBlurStrength = v));
    slider(stage.bar, 'motionBlurShutterBias', [0, 1, 0.05], camera.motionBlurShutterBias, (v) => (camera.motionBlurShutterBias = v));
    slider(stage.bar, 'motionBlurMaxLength', [4, 128, 2], camera.motionBlurMaxLength, (v) => (camera.motionBlurMaxLength = v));
  } else {
    stage.caption('motionBlurStrength 0 to 2');
    myApp.on('tick', (_dt, ms) => {
      camera.motionBlurStrength = 1 + Math.sin(ms * 0.001);
    });
  }
  myApp.run();
});
