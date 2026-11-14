// Rig for Graphics: Post Effects examples: sky rig, CameraFrame, test scene
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';
import { addMesh, createRig, daySky, pbrMaterial, type Rig, type RigOptions } from './pbr.ts';

export interface PostRigOptions extends RigOptions {
  toneMapping?: number;
  /** MSAA samples of the CameraFrame render target (1-4). Default 4. */
  samples?: number;
  /** Cast shadows from the sun. Default true. */
  shadows?: boolean;
}

export interface PostRig extends Rig {
  frame: pc.CameraFrame;
  /** Applies pending CameraFrame settings (what the engine calls update()). */
  apply(): void;
  /** Runs a settings change, then applies it: `rig.tweak(() => (frame.bloom.intensity = v))`. */
  tweak(change: () => void): void;
  /** Adds an effect to the frame (call apply() after) and destroys it with the rig. */
  addEffect<T extends pc.CameraFrameEffect>(effect: T): T;
  /** Destroys the frame, its added effects and the rig. Call last in the cleanup. */
  dispose(): void;
}

/** A createRig stage with a CameraFrame on its camera, tone mapping on, ready for effects. */
export async function createPostRig(el: HTMLElement, ctx: MountContext, options: PostRigOptions = {}): Promise<PostRig> {
  const rig = await createRig(el, ctx, {
    sky: daySky({ sun: 5, panels: false }),
    distance: 11,
    pitch: -16,
    yaw: 25,
    autoRotate: 6,
    ...options,
  });
  if (rig.sunLight && options.shadows !== false) {
    rig.sunLight.light!.castShadows = true;
    rig.sunLight.light!.shadowDistance = 40;
    rig.sunLight.light!.shadowResolution = 2048;
    rig.sunLight.light!.normalOffsetBias = 0.05;
  }
  const frame = new pc.CameraFrame(rig.app, rig.camera.camera!);
  frame.rendering.toneMapping = options.toneMapping ?? pc.TONEMAP_NEUTRAL;
  frame.rendering.samples = options.samples ?? 4;
  frame.update();
  const baseDispose = rig.dispose;
  const effects: pc.CameraFrameEffect[] = [];
  return Object.assign(rig, {
    frame,
    apply: () => frame.update(),
    tweak(change: () => void) {
      change();
      frame.update();
    },
    addEffect<T extends pc.CameraFrameEffect>(effect: T): T {
      frame.addEffect(effect);
      effects.push(effect);
      return effect;
    },
    dispose() {
      frame.destroy();
      // The camera frame does not own the effects added to it, so they are destroyed here.
      for (const effect of effects) effect.destroy();
      baseDispose();
    },
  });
}

export interface TestScene {
  /** Glowing bars well above 1.0: the lights bloom and flares act on. */
  neon: pc.Entity[];
  /** A row of spheres receding from the camera, for depth of field and fog. */
  row: pc.Entity[];
  /** Everything that turns, animated by `animate`. */
  animate(t: number): void;
}

/**
 * A reusable still life: a floor, stacked boxes touching it (ambient occlusion), a receding row of
 * spheres (depth of field), a few emissive bars (bloom), and a ring of coloured pieces.
 */
export function buildTestScene(app: pc.AppBase): TestScene {
  addMesh(app, 'plane', pbrMaterial('#4a505e', { gloss: 0.4 }), [0, -1.5, -2], [26, 1, 30]);

  // boxes leaning on each other: deep creases for ambient occlusion
  const stone = pbrMaterial('#c9ccd4', { gloss: 0.3 });
  addMesh(app, 'box', stone, [-1.2, -0.9, 0], [1.2, 1.2, 1.2]);
  addMesh(app, 'box', stone, [0.15, -0.9, 0.25], [1.2, 1.2, 1.2]);
  addMesh(app, 'box', stone, [-0.5, 0.2, 0.1], [1.2, 1.0, 1.2]);
  addMesh(app, 'sphere', pbrMaterial('#d96c4a', { gloss: 0.7 }), [1.7, -0.95, 0.9], 1.1);

  // a receding row of spheres
  const hues = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa', '#f472b6'];
  const row = hues.map((hex, i) => addMesh(app, 'sphere', pbrMaterial(hex, { gloss: 0.8 }), [-3.4 + (i % 2) * 0.5, -0.9, 3.6 - i * 2.4], 1.2));

  // glowing bars: emissive intensity far above 1 only means something when the frame is HDR
  const colours = ['#ff3b6b', '#3bff9c', '#3ba6ff'];
  const neon = colours.map((hex, i) => {
    const m = pbrMaterial('#000000', { emissive: new pc.Color().fromString(hex), emissiveIntensity: 30 });
    return addMesh(app, 'capsule', m, [3.6 + (i % 2) * 0.4, 0, 1 - i * 2.6], [0.28, 3, 0.28]);
  });

  const ring = ['box', 'cone', 'torus'] as const;
  const pieces = ring.map((type, i) => {
    const a = (i / ring.length) * Math.PI * 2;
    return addMesh(app, type, pbrMaterial(hues[(i + 2) % hues.length]!, { gloss: 0.6, metalness: 0.4, useMetalness: true }), [Math.cos(a) * 1.0 - 4.2, -0.3, Math.sin(a) * 1.0 - 4.5], 0.9);
  });

  return {
    neon,
    row,
    animate(t) {
      neon.forEach((b, i) => b.setLocalScale(0.28, 2.6 + Math.sin(t * 1.4 + i * 1.7) * 0.5, 0.28));
      pieces.forEach((p, i) => p.setLocalEulerAngles(t * (30 + i * 12), t * 40, 0));
    },
  };
}

/**
 * Flips `set` between true and false on a timer, for cards: with no controls, an effect is only
 * understood next to its own absence. Does nothing in the full view.
 */
export function previewToggle(app: pc.AppBase, ctx: MountContext, set: (on: boolean) => void, period = 2.2): void {
  if (!ctx.preview) return;
  let t = 0;
  let on = true;
  app.on('update', (dt: number) => {
    t += dt;
    if (t > period) {
      t = 0;
      set((on = !on));
    }
  });
}
