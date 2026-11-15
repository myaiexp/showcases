// A glTF weights channel plays as a MorphTargetTrack, through animationSet like any other clip
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { blobGlb } from '../../shared/gltf/blob.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/blob.glb': blobGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(1.2, 1.1, 2.1), target: new Vector3(0, 0.5, 0), floorSize: 4, shadows: !stage.preview });
  const model = await loadGlb(scene, '/models/blob.glb');
  const animSet = model.animationSet;

  const clipName = animSet.getAnimationNames()[0]!;
  animSet.play(clipName, { repeat: 0 });
  stage.caption(`playAnimation('${clipName}'): a MorphTargetTrack`);
  const out = stage.readout();
  myApp.on('tick', () => {
    if (!out) return;
    const pb = animSet.getPlayback(clipName);
    const tracks = [...animSet.getAnimationClip(clipName)!.tracks.values()].flat().map((t) => t.constructor.name);
    out.textContent = `clip '${clipName}' tracks: ${tracks.join(', ')}   state: ${pb ? pb.state : 'stopped'}\ntargets: ${model.collectMorphTargetNames().join(', ')}   (stop the clip to set a weight by hand)`;
  });

  if (stage.bar) {
    toggle(stage.bar, 'play pulse', true, (v) => {
      if (v) animSet.play(clipName, { repeat: 0, fadeIn: 0.3 });
      else animSet.stopAnimation(clipName, { fadeOut: 0.3 });
    });
    slider(stage.bar, 'speedRatio', [0.1, 3, 0.1], 1, (v) => {
      const pb = animSet.getPlayback(clipName);
      if (pb) pb.speedRatio = v;
    });
    slider(stage.bar, 'playback weight', [0, 1, 0.05], 1, (v) => {
      const pb = animSet.getPlayback(clipName);
      if (pb) pb.weight = v;
    });
    slider(stage.bar, 'smile (by hand)', [0, 1, 0.01], 0, (v) => model.setMorphTargetWeight('smile', v));
  }
  myApp.run();
});
