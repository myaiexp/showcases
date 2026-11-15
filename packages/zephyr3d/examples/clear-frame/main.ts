// The smallest app: a tick handler that clears the frame buffer, colour changing over time
import { DEPTH_CLEAR_VALUE, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  // Every engine call belongs after ready(): it resolves once the device exists.
  await myApp.ready();

  // Hoisted out of the loop: a new Vector4 every frame would only feed the GC.
  const clearColor = new Vector4(0, 1, 0, 1);
  myApp.on('tick', (_dt, elapsed) => {
    // The docs clear to plain green; here green drifts towards cyan and back.
    const t = 0.5 + 0.5 * Math.sin(elapsed * 0.0015);
    clearColor.setXYZW(0.1 * t, 0.75 + 0.2 * t, 0.6 * t, 1);
    // DEPTH_CLEAR_VALUE is right under either depth convention (normal or reverse-Z).
    myApp.device.clearFrameBuffer(clearColor, DEPTH_CLEAR_VALUE, 0);
  });
  stage.caption('clearFrameBuffer(color, DEPTH_CLEAR_VALUE, 0) every tick');
  myApp.run();
});
