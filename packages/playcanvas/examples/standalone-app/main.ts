// The standalone guide's spinning cube: AppBase, AppOptions and a WebGPU-first device
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const canvas = document.createElement('canvas');
  canvas.className = 'stage';
  el.append(canvas);

  // Create a graphics device, preferring WebGPU over WebGL 2.0.
  const device = await pc.createGraphicsDevice(canvas, {
    deviceTypes: [pc.DEVICETYPE_WEBGPU, pc.DEVICETYPE_WEBGL2],
  });
  device.maxPixelRatio = preview ? 1 : Math.min(window.devicePixelRatio, 2);

  // AppBase only carries the component systems and resource handlers it is given.
  const options = new pc.AppOptions();
  options.graphicsDevice = device;
  options.componentSystems = [pc.RenderComponentSystem, pc.CameraComponentSystem, pc.LightComponentSystem];
  options.resourceHandlers = [pc.TextureHandler, pc.ContainerHandler];

  const app = new pc.AppBase(canvas);
  app.init(options);
  // The guide fills the window; here the canvas fills its box, so the size follows the element.
  app.setCanvasResolution(pc.RESOLUTION_AUTO);
  app.setCanvasFillMode(pc.FILLMODE_NONE);
  app.start();
  const resize = new ResizeObserver(() => app.updateCanvasSize());
  resize.observe(canvas);

  const camera = new pc.Entity();
  camera.addComponent('camera', { clearColor: new pc.Color(0.3, 0.3, 0.7) });
  camera.setPosition(0, 0, 3);
  app.root.addChild(camera);

  const light = new pc.Entity();
  light.addComponent('light');
  light.setEulerAngles(45, 45, 0);
  app.root.addChild(light);

  const box = new pc.Entity();
  box.addComponent('render', { type: 'box' });
  app.root.addChild(box);

  app.on('update', (dt: number) => box.rotate(10 * dt, 20 * dt, 30 * dt));

  if (!preview) {
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = `Device: ${device.deviceType}`;
    el.append(note);
  }

  return () => {
    resize.disconnect();
    const gl = device.isWebGL2 ? canvas.getContext('webgl2') : null;
    app.destroy();
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  };
};

export default mount;
