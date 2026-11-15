// XR chapter helpers: floor-level scene, Enter VR/AR buttons, support notice
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';
import { createOrbit, type Orbit } from './orbit.ts';
import { showNotice } from './notice.ts';
import type { Panel } from './panel.ts';
import { createStage, type Stage, type StageOptions } from './stage.ts';
import { checkerTexture } from './textures.ts';

/**
 * True when the browser exposes WebXR at all. An `in` test, because `navigator.xr` is
 * typed only by @types/webxr, which this package does not import: the full repo check
 * saw it through another package's dependency, the playcanvas-only check does not.
 */
export const hasWebXr = (): boolean => typeof navigator !== 'undefined' && 'xr' in navigator;

export interface XrSceneOptions extends StageOptions {
  /** Orbit target, in metres above the floor; default the middle of the play area. */
  target?: pc.Vec3;
  distance?: number;
  pitch?: number;
  yaw?: number;
  /** Auto-rotate speed of the simulated viewer in degrees per second; default 6. */
  autoRotate?: number;
  /** Let the reader drag the simulated viewer in the full view; default true. */
  interactive?: boolean;
  /** Transparent clear colour, as an AR camera needs. Default false. */
  transparent?: boolean;
  /** Floor texture; default a checker. */
  floor?: boolean;
}

export interface XrScene {
  stage: Stage;
  app: pc.Application;
  /** The parent of the camera: move this to move the viewer, never the camera (using-webxr.md). */
  rig: pc.Entity;
  camera: pc.Entity;
  sun: pc.Entity;
  /** The simulated viewer; it is paused while a real session runs. */
  readonly orbit: Orbit;
  /** Orbit, then the stage. */
  dispose(): void;
}

/**
 * A stage whose graphics device is made XR compatible when the browser has WebXR, a
 * camera under a rig entity, a sun and a one-metre-grid floor. An orbit stands in for the
 * headset until a session starts: the session overwrites the camera pose, so the orbit
 * stops on `start` and resumes on `end`.
 */
export async function createXrScene(el: HTMLElement, ctx: MountContext, options: XrSceneOptions = {}): Promise<XrScene> {
  const stage = await createStage(el, ctx, { ...options, deviceOptions: { xrCompatible: hasWebXr(), ...options.deviceOptions } });
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);

  const rig = new pc.Entity('rig');
  app.root.addChild(rig);
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', { clearColor: new pc.Color(0.07, 0.08, 0.11, options.transparent ? 0 : 1), nearClip: 0.05, farClip: 60, fov: 60 });
  rig.addChild(camera);

  const sun = new pc.Entity('sun');
  sun.addComponent('light', { type: 'directional', intensity: 1, castShadows: true, shadowDistance: 14, shadowResolution: 1024, normalOffsetBias: 0.05 });
  sun.setEulerAngles(50, 30, 0);
  app.root.addChild(sun);

  const disposables: pc.Texture[] = [];
  if (options.floor !== false) {
    const checker = checkerTexture(app.graphicsDevice, '#3b4254', '#2a2f3d', 10, 256);
    const material = new pc.StandardMaterial();
    material.diffuseMap = checker;
    material.diffuseMapTiling.set(5, 5);
    material.gloss = 0.2;
    material.useMetalness = true;
    material.metalness = 0;
    material.update();
    const floor = new pc.Entity('floor');
    floor.addComponent('render', { type: 'plane', material, castShadows: false });
    floor.setLocalScale(10, 1, 10);
    app.root.addChild(floor);
    disposables.push(checker);
  }

  const target = options.target ?? new pc.Vec3(0, 1, -1.5);
  const makeOrbit = (): Orbit =>
    createOrbit(app, camera, {
      target,
      distance: options.distance ?? 4.5,
      pitch: options.pitch ?? -14,
      yaw: options.yaw ?? 20,
      autoRotate: options.autoRotate ?? 6,
      interactive: !ctx.preview && options.interactive !== false,
    });
  let orbit = makeOrbit();
  let paused = false;
  const onStart = (): void => {
    if (paused) return;
    paused = true;
    orbit.dispose();
  };
  const onEnd = (): void => {
    if (!paused) return;
    paused = false;
    orbit = makeOrbit();
  };
  app.xr?.on('start', onStart);
  app.xr?.on('end', onEnd);

  return {
    stage,
    app,
    rig,
    camera,
    sun,
    get orbit() {
      return orbit;
    },
    dispose() {
      app.xr?.off('start', onStart);
      app.xr?.off('end', onEnd);
      orbit.dispose();
      stage.dispose();
      disposables.forEach((t) => t.destroy());
    },
  };
}

export interface XrEntry {
  type: string;
  space: string;
  label: string;
  /** Session options: feature flags, depthSensing, optionalFeatures, DOM overlay root is set by the example. */
  options?: Record<string, unknown>;
}

export interface XrEntryHandle {
  /** Status line: availability, session start and end, errors. */
  status: HTMLElement;
  dispose(): void;
}

/**
 * The code path the docs describe: check `app.xr.supported` and `isAvailable(type)`, show
 * an Enter button only for session types that are available (it follows the `available`
 * event), and start from the click with `camera.camera.startXr(type, space, options)`.
 * Where nothing is available, say what is missing instead. The notice is never an error:
 * a browser without `navigator.xr` just has no session types.
 */
export function addXrEntry(el: HTMLElement, panel: Panel, scene: { app: pc.Application; camera: pc.Entity }, entries: XrEntry[]): XrEntryHandle {
  const { app, camera } = scene;
  const xr = app.xr;
  panel.row();
  const buttons = entries.map((entry) => {
    const b = panel.button(entry.label, () => start(entry));
    b.hidden = true;
    return b;
  });
  const exit = panel.button('Exit XR', () => xr?.end());
  exit.hidden = true;
  const status = panel.readout('');
  let notice: HTMLElement | null = null;

  const describe = (): string => {
    if (!hasWebXr()) return 'This browser has no WebXR: navigator.xr is undefined, so app.xr.supported is false.';
    if (!xr?.supported) return 'app.xr.supported is false in this browser.';
    const wanted = entries.map((e) => e.type).join(' / ');
    return `WebXR is present, but no ${wanted} session is available: no headset or compatible device is connected.`;
  };
  const refresh = (): void => {
    let any = false;
    entries.forEach((entry, i) => {
      const available = !!xr?.supported && xr.isAvailable(entry.type);
      // .btn sets display, which overrides the hidden attribute, so hide through style.
      buttons[i]!.style.display = !available || xr?.active ? 'none' : '';
      any ||= available;
    });
    exit.style.display = xr?.active ? '' : 'none';
    status.textContent = xr?.active ? `session running: ${xr.type} in ${xr.spaceType}` : any ? 'session types available' : 'no session available';
    notice?.remove();
    notice = any ? null : showNotice(el, describe());
  };
  const start = (entry: XrEntry): void => {
    try {
      camera.camera!.startXr(entry.type, entry.space, {
        ...entry.options,
        callback: (err: Error | null) => {
          if (err) status.textContent = `could not start ${entry.type}: ${err.message}`;
        },
      } as Parameters<pc.CameraComponent['startXr']>[2]);
    } catch (e) {
      status.textContent = `could not start ${entry.type}: ${(e as Error).message}`;
    }
  };
  refresh();
  xr?.on('available', refresh);
  xr?.on('start', refresh);
  xr?.on('end', refresh);
  const onError = (err: Error): void => {
    status.textContent = `XR error: ${err.message}`;
  };
  xr?.on('error', onError);
  return {
    status,
    dispose() {
      xr?.off('available', refresh);
      xr?.off('start', refresh);
      xr?.off('end', refresh);
      xr?.off('error', onError);
      notice?.remove();
    },
  };
}

/** A material of one hex colour, for the small shapes the XR examples put in the play area. */
export function xrMaterial(hex: string, props: Partial<pc.StandardMaterial> = {}): pc.StandardMaterial {
  const m = new pc.StandardMaterial();
  m.diffuse = new pc.Color().fromString(hex);
  m.useMetalness = true;
  m.metalness = 0;
  m.gloss = 0.5;
  Object.assign(m, props);
  m.update();
  return m;
}

/** A render entity of a primitive with a material, added to `parent`. */
export function xrShape(parent: pc.GraphNode, type: string, material: pc.Material, pos: [number, number, number], scale: number | [number, number, number] = 1): pc.Entity {
  const e = new pc.Entity(type);
  e.addComponent('render', { type: type as pc.RenderComponent['type'], material });
  e.setLocalPosition(...pos);
  if (typeof scale === 'number') e.setLocalScale(scale, scale, scale);
  else e.setLocalScale(...scale);
  parent.addChild(e);
  return e;
}
