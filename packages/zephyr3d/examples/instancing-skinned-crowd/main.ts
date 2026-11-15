// A crowd of skinned figures from one GLB: shared Primitive and material, one AnimationSet each
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, getDevice, Scene, type SceneNode } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { figureGlb } from '../../shared/gltf/figure.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/figure.glb': figureGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const side = stage.preview ? 3 : 6;
  animScene(scene, { eye: new Vector3(0, 4.2, side * 1.1 + 3), target: new Vector3(0, 0.8, 0), floorSize: 14, shadows: false });

  // Every call reuses the loaded asset's primitives and materials: the instances share them,
  // while each actor keeps its own skeleton and AnimationSet
  const actors: SceneNode[] = [];
  for (let i = 0; i < side * side; i++) {
    const actor = await loadGlb(scene, '/models/figure.glb');
    actor.position.setXYZ(((i % side) - (side - 1) / 2) * 1.1, 0, (Math.floor(i / side) - (side - 1) / 2) * 1.1);
    actors.push(actor);
  }

  const clips = ['walk', 'run', 'idle', 'wave'];
  let varied = true;
  let spread = 0.3;
  const apply = (): void => {
    actors.forEach((actor, i) => {
      const set = actor.animationSet;
      for (const n of set.getAnimationNames()) set.stopAnimation(n);
      const name = varied ? clips[i % clips.length]! : 'walk';
      const pb = set.play(name, { repeat: 0, speedRatio: 1 + (varied ? ((i * 37) % 11) / 10 - 0.5 : 0) * spread * 2 });
      if (pb && varied) pb.normalizedTime = ((i * 0.37) % 1);
    });
    stage.caption(varied ? `${actors.length} actors, clips ${clips.join(' / ')}` : `${actors.length} actors, all walk in step`);
  };
  apply();

  const out = stage.readout();
  if (out) out.textContent = `${actors.length} skinned meshes on the ${getDevice().type} backend; WebGPU would batch them into indirect draws, WebGL2 uses the regular instance list`;
  if (stage.bar) {
    toggle(stage.bar, 'different clips and phases', varied, (v) => ((varied = v), apply()));
    slider(stage.bar, 'speed spread', [0, 1, 0.05], spread, (v) => ((spread = v), apply()));
  }
  myApp.run();
});
