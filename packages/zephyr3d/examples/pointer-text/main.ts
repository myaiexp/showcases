// Input events through the Application: pointermove updates a string that tick draws
import { DEPTH_CLEAR_VALUE, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  let str = 'Move the pointer over the view';
  const clearColor = new Vector4(0, 0, 0, 1);
  // drawText() needs a font first.
  myApp.device.setFont('16px arial');

  // Drawing happens once per frame in tick; the input handler only updates state.
  myApp.on('tick', () => {
    myApp.device.clearFrameBuffer(clearColor, DEPTH_CLEAR_VALUE, 0);
    myApp.device.drawText(str, 30, 30, '#ffff00');
  });
  myApp.on('pointermove', (ev) => {
    str = `X:${ev.offsetX.toFixed()} Y:${ev.offsetY.toFixed()}`;
  });

  if (stage.preview) {
    // A card gets no pointer: dispatch the canvas's own pointermove events along a loop.
    stage.every(120, (i) => {
      const r = stage.canvas.getBoundingClientRect();
      const a = i * 0.25;
      const x = r.width * (0.5 + 0.35 * Math.cos(a));
      const y = r.height * (0.5 + 0.3 * Math.sin(a * 2));
      stage.canvas.dispatchEvent(new PointerEvent('pointermove', { clientX: r.left + x, clientY: r.top + y, bubbles: true }));
    });
  }
  myApp.run();
});
