// Shared PlayCanvas setup: canvas, device, Application, resize and teardown
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';

export interface Stage {
  canvas: HTMLCanvasElement;
  app: pc.Application;
  device: pc.GraphicsDevice;
  /** Destroys the app (entities, assets, input, update listeners), frees the GPU context and removes the canvas. */
  dispose(): void;
}

export interface StageOptions {
  /** Canvas height in the full view, in CSS pixels. Previews always fill their 200px card. */
  height?: number;
  /** 'webgpu' asks for WebGPU and falls back to WebGL 2 where the browser has none. Default 'webgl2'. */
  device?: 'webgl2' | 'webgpu';
  /** Attach Mouse, TouchDevice and Keyboard in the full view. Default true; cards never get input. */
  input?: boolean;
  /** Attach ElementInput, for user-interface examples that react to clicks. Full view only. */
  elementInput?: boolean;
  /** Extra graphics device options (antialias, alpha, stencil, xrCompatible …). */
  deviceOptions?: Record<string, unknown>;
  /** Don't call app.start(); the example starts the app itself (after loading assets, say). */
  manualStart?: boolean;
}

/**
 * The boilerplate the standalone guide writes out: a canvas in `el`, a graphics device,
 * a pc.Application on it, the canvas sized to its element, and app.start(). Cards render
 * at pixel ratio 1 to stay light. The app fills its canvas (FILLMODE_NONE plus
 * RESOLUTION_AUTO), and a ResizeObserver keeps the drawing buffer matched to the CSS size.
 */
export async function createStage(el: HTMLElement, { preview }: MountContext, options: StageOptions = {}): Promise<Stage> {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    display: 'block',
    width: '100%',
    height: preview ? '200px' : `${options.height ?? 440}px`,
    outline: 'none',
    touchAction: 'none',
  });
  canvas.tabIndex = preview ? -1 : 0;
  el.append(canvas);

  const deviceTypes = options.device === 'webgpu' ? [pc.DEVICETYPE_WEBGPU, pc.DEVICETYPE_WEBGL2] : [pc.DEVICETYPE_WEBGL2];
  const device = await pc.createGraphicsDevice(canvas, {
    deviceTypes,
    antialias: true,
    ...options.deviceOptions,
  });
  device.maxPixelRatio = preview ? 1 : Math.min(window.devicePixelRatio, 2);

  const input = !preview && options.input !== false;
  const app = new pc.Application(canvas, {
    graphicsDevice: device,
    mouse: input ? new pc.Mouse(canvas) : undefined,
    touch: input ? new pc.TouchDevice(canvas) : undefined,
    keyboard: input ? new pc.Keyboard(canvas) : undefined,
    elementInput: !preview && options.elementInput ? new pc.ElementInput(canvas) : undefined,
  });
  app.setCanvasFillMode(pc.FILLMODE_NONE);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);

  const observer = new ResizeObserver(() => app.updateCanvasSize());
  observer.observe(canvas);
  if (!options.manualStart) app.start();

  let disposed = false;
  return {
    canvas,
    app,
    device,
    dispose() {
      if (disposed) return;
      disposed = true;
      observer.disconnect();
      // The engine's device.destroy() drops its reference but keeps the WebGL context
      // alive until garbage collection, and a page only gets about 16 of them. Six
      // cards mount and unmount as the reader scrolls, so release it now.
      const gl = device.isWebGL2 ? canvas.getContext('webgl2') : null;
      try {
        app.destroy();
      } catch (err) {
        // A listener that throws during destroy (an asset or entity event, say) leaves the
        // app half torn down but still scheduling frames, and every frame then throws.
        // Cancel the pending frame so the loop stops, and let the host report the error.
        cancelAnimationFrame(app.frameRequestId);
        throw err;
      } finally {
        gl?.getExtension('WEBGL_lose_context')?.loseContext();
        canvas.remove();
      }
    },
  };
}

