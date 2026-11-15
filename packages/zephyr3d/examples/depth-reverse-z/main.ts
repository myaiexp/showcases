// Reverse-Z (the default): near plane at depth 1, far at 0, so precision holds into the distance
import {
  DEPTH_CLEAR_VALUE,
  DEPTH_COMPARE_DEFAULT,
  DEPTH_FARTHEST,
  DEPTH_NEAREST,
  REVERSE_Z,
  Z_CONVENTION,
} from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, getEngine, Scene } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';
import { fightScene } from './fight.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  const { update } = fightScene(scene);
  getEngine().setRenderable(scene, 0);
  myApp.on('tick', (_dt, elapsed) => update(elapsed / 1000));

  // The active convention and the constants that are right under either one
  stage.caption(`Z_CONVENTION = '${Z_CONVENTION}': clean blue to the horizon`);
  const out = stage.readout();
  if (out) {
    out.textContent = [
      `REVERSE_Z = ${REVERSE_Z}`,
      `DEPTH_CLEAR_VALUE = ${DEPTH_CLEAR_VALUE}`,
      `DEPTH_NEAREST = ${DEPTH_NEAREST}, DEPTH_FARTHEST = ${DEPTH_FARTHEST}`,
      `DEPTH_COMPARE_DEFAULT = '${DEPTH_COMPARE_DEFAULT}'`,
      'Compare with the standard-Z example, which renders the same scene.',
    ].join('\n');
  }
  myApp.run();
});
