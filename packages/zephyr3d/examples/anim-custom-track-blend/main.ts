// Two custom tracks in one clip (UV scroll, colour tint): distinct blendIds, and mixState across clips
import { Interpolator, Matrix4x4, Vector3, Vector4 } from '@zephyr3d/base';
import type { Texture2D } from '@zephyr3d/device';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, AnimationTrack, BoxShape, getEngine, LambertMaterial, Mesh, Scene, type SceneNode } from '@zephyr3d/scene';
import { animScene } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { checker, png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

const eachMaterial = (target: object, fn: (m: LambertMaterial) => void): void => {
  (target as SceneNode).iterate((n) => {
    if (n.isMesh()) fn(n.material as LambertMaterial);
    return false;
  });
};

// A track whose state is a Float32Array of `size` numbers read from an interpolator
abstract class VectorTrack extends AnimationTrack<Float32Array> {
  protected readonly _state: Float32Array<ArrayBuffer>;
  protected readonly _interpolator: Interpolator;
  constructor(interpolator: Interpolator, size: number) {
    super();
    this._interpolator = interpolator;
    this._state = new Float32Array(size);
  }
  calculateState(_target: object, currentTime: number): Float32Array {
    this._interpolator.interpolate(currentTime, this._state);
    return this._state;
  }
  // Linear mix of every component, in a new array as the docs require
  mixState(a: Float32Array, b: Float32Array, t: number): Float32Array {
    return a.map((v, i) => v + (b[i]! - v) * t);
  }
  getDuration(): number {
    return this._interpolator.maxTime;
  }
}
class UvTrack extends VectorTrack {
  constructor(interpolator: Interpolator) {
    super(interpolator, 1);
  }
  clone(): this {
    return new UvTrack(this._interpolator.clone()) as this;
  }
  applyState(target: object, s: Float32Array): void {
    eachMaterial(target, (m) => (m.albedoTexCoordMatrix = Matrix4x4.translation(new Vector3(s[0]!, 0, 0))));
  }
  getBlendId(): string {
    return 'uv-offset';
  }
}
class TintTrack extends VectorTrack {
  constructor(interpolator: Interpolator) {
    super(interpolator, 3);
  }
  clone(): this {
    return new TintTrack(this._interpolator.clone()) as this;
  }
  applyState(target: object, s: Float32Array): void {
    eachMaterial(target, (m) => (m.albedoColor = new Vector4(s[0]!, s[1]!, s[2]!, 1)));
  }
  // A different blendId from UvTrack, so both can live in the same clip
  getBlendId(): string {
    return 'tint';
  }
}

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/textures/checker.png': png(128, 128, checker(8, [255, 255, 255], [90, 90, 90])) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(1.8, 1.4, 2.6), target: new Vector3(0, 0.5, 0), floorSize: 4, shadows: false });

  const material = new LambertMaterial();
  material.albedoTexture = await getEngine().resourceManager.fetchTexture<Texture2D>('/textures/checker.png', {
    samplerOptions: { addressU: 'repeat', addressV: 'repeat' },
  });
  const box = new Mesh(scene, new BoxShape({ size: 1 }), material);
  box.position.setXYZ(0, 0.5, 0);

  // 'slow' scrolls one tile and fades through warm tints; 'fast' scrolls four and goes cool
  const addClip = (name: string, scroll: number, tints: number[]): void => {
    const clip = box.animationSet.createAnimation(name)!;
    clip.timeDuration = 2;
    const times = new Float32Array([0, 1, 2]);
    clip.addTrack(box, new UvTrack(new Interpolator('linear', null, times, new Float32Array([0, scroll / 2, scroll]))));
    clip.addTrack(box, new TintTrack(new Interpolator('linear', null, times, new Float32Array(tints))));
  };
  addClip('slow', 1, [1, 0.5, 0.2, 1, 0.9, 0.3, 1, 0.5, 0.2]);
  addClip('fast', 4, [0.3, 0.6, 1, 0.5, 1, 0.9, 0.3, 0.6, 1]);
  const slow = box.animationSet.play('slow', { repeat: 0, weight: 1 })!;
  const fast = box.animationSet.play('fast', { repeat: 0, weight: 1 })!;
  stage.caption('weights slow : fast blend through mixState');

  if (stage.bar) {
    slider(stage.bar, 'fast weight', [0, 1, 0.01], 1, (v) => (fast.weight = Math.max(v, 0.001)));
    slider(stage.bar, 'slow weight', [0, 1, 0.01], 1, (v) => (slow.weight = Math.max(v, 0.001)));
  } else {
    myApp.on('tick', (_dt: number, elapsed: number) => {
      fast.weight = 0.02 + 0.98 * (0.5 + 0.5 * Math.sin(elapsed / 800));
    });
  }
  myApp.run();
});
