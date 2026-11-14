// An AppBase with only the systems, handlers and AppOptions an example lists
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';

export interface BaseApp {
  canvas: HTMLCanvasElement;
  app: pc.AppBase;
  device: pc.GraphicsDevice;
  dispose(): void;
}

export interface BaseAppConfig {
  systems: (typeof pc.ComponentSystem)[];
  handlers?: (typeof pc.ResourceHandler)[];
  /** Sets the remaining AppOptions (mouse, keyboard, soundManager ...) before init. */
  options?: (options: pc.AppOptions, canvas: HTMLCanvasElement) => void;
  height?: number;
}

/** The standalone guide's setup, with the canvas filling its box instead of the window. */
export async function createBaseApp(el: HTMLElement, { preview }: MountContext, config: BaseAppConfig): Promise<BaseApp> {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: preview ? '200px' : `${config.height ?? 360}px`, outline: 'none', touchAction: 'none' });
  el.append(canvas);
  const device = await pc.createGraphicsDevice(canvas, { deviceTypes: [pc.DEVICETYPE_WEBGL2], antialias: true });
  device.maxPixelRatio = preview ? 1 : Math.min(window.devicePixelRatio, 2);

  const options = new pc.AppOptions();
  options.graphicsDevice = device;
  options.componentSystems = config.systems;
  options.resourceHandlers = config.handlers ?? [];
  config.options?.(options, canvas);

  const app = new pc.AppBase(canvas);
  app.init(options);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);
  app.setCanvasFillMode(pc.FILLMODE_NONE);
  app.start();
  const resize = new ResizeObserver(() => app.updateCanvasSize());
  resize.observe(canvas);

  let done = false;
  return {
    canvas,
    app,
    device,
    dispose() {
      if (done) return;
      done = true;
      resize.disconnect();
      const gl = device.isWebGL2 ? canvas.getContext('webgl2') : null;
      app.destroy();
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
    },
  };
}
