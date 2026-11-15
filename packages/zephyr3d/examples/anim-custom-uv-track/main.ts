// A custom AnimationTrack subclass: calculateState, mixState, applyState, getBlendId, getDuration
import { Interpolator, Matrix4x4, Vector3 } from '@zephyr3d/base';
import type { Texture2D } from '@zephyr3d/device';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, AnimationTrack, BoxShape, getEngine, LambertMaterial, Mesh, Scene, type SceneNode } from '@zephyr3d/scene';
import { animScene } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { checker, png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

// Custom animation track: UV animation. The state is one number, the U offset.
class MyAnimationTrack extends AnimationTrack<Float32Array> {
  private readonly _state = new Float32Array(1);
  private readonly _interpolator: Interpolator;

  constructor(interpolator: Interpolator) {
    super();
    this._interpolator = interpolator;
  }
  // Abstract: copy the track
  clone(): this {
    return new MyAnimationTrack(this._interpolator.clone()) as this;
  }
  // The state at the given time
  calculateState(_target: object, currentTime: number): Float32Array {
    this._interpolator.interpolate(currentTime, this._state);
    return this._state;
  }
  // Used when clips with this blendId play together; must return a new state
  mixState(a: Float32Array, b: Float32Array, t: number): Float32Array {
    return new Float32Array([a[0]! + (b[0]! - a[0]!) * t]);
  }
  // Write the state to the node: shift every mesh's albedo texture coordinates
  applyState(target: object, state: Float32Array): void {
    (target as SceneNode).iterate((child) => {
      if (child.isMesh()) (child.material as LambertMaterial).albedoTexCoordMatrix = Matrix4x4.translation(new Vector3(state[0]!, 0, 0));
      return false;
    });
  }
  getBlendId(): string {
    return 'uv-animation';
  }
  getDuration(): number {
    return this._interpolator.maxTime;
  }
}

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/textures/checker.png': png(128, 128, checker(8, [240, 200, 80], [40, 50, 90])) });
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

  // Steps: a clip, an interpolator (times 0 s to 2 s, offsets 0 to 1), the track, then play
  const clip = box.animationSet.createAnimation('UserTrackTest')!;
  const interpolator = new Interpolator('linear', null, new Float32Array([0, 2]), new Float32Array([0, 1]));
  clip.addTrack(box, new MyAnimationTrack(interpolator));
  const playback = box.animationSet.play('UserTrackTest', { repeat: 0, speedRatio: 1, weight: 1, fadeIn: 0 })!;
  stage.caption('class MyAnimationTrack extends AnimationTrack');
  if (stage.bar) slider(stage.bar, 'speedRatio', [-2, 4, 0.1], 1, (v) => (playback.speedRatio = v));
  myApp.run();
});
