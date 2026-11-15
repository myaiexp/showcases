// Standard-Z, set before the engine loads: far-away depth crowds near 1 and the planes fight
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

export default zephyrExample(
  import.meta.url,
  async (stage) => {
    const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
    await myApp.ready();
    const scene = new Scene();
    const { update } = fightScene(scene);
    getEngine().setRenderable(scene, 0);
    myApp.on('tick', (_dt, elapsed) => update(elapsed / 1000));

    stage.caption(`Z_CONVENTION = '${Z_CONVENTION}': red z-fighting in the distance`);
    const out = stage.readout();
    if (out) {
      out.textContent = [
        `REVERSE_Z = ${REVERSE_Z}`,
        `DEPTH_CLEAR_VALUE = ${DEPTH_CLEAR_VALUE}`,
        `DEPTH_NEAREST = ${DEPTH_NEAREST}, DEPTH_FARTHEST = ${DEPTH_FARTHEST}`,
        `DEPTH_COMPARE_DEFAULT = '${DEPTH_COMPARE_DEFAULT}'`,
        'The same constants, flipped: code using them works under both conventions.',
      ].join('\n');
    }
    myApp.run();
  },
  // Without a bundler define, the convention comes from this global, read once when
  // @zephyr3d/base loads; the frame sets it on the iframe's window before importing.
  { globals: { __ZEPHYR3D_REVERSE_Z__: false } },
);
