// morphTargetGroups: named expressions that drive several morph targets at once
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type Mesh } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
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
  let found: Mesh | null = null;
  model.iterate((node) => {
    if (!found && node.isMesh()) found = node;
    return false;
  });
  const faceMesh = found as Mesh | null;
  if (!faceMesh) throw new Error('no mesh in blob.glb');

  // A runtime group: each binding names a target on a mesh and how strongly the group drives it
  model.morphTargetGroups = [
    {
      name: 'happy',
      bindings: [
        { mesh: faceMesh, targetName: 'smile', weight: 1 },
        { mesh: faceMesh, targetName: 'stretch', weight: 0.3 },
      ],
      weight: 0,
    },
    {
      name: 'puffed',
      bindings: [
        { mesh: faceMesh, targetName: 'squash', weight: 0.7 },
        { mesh: faceMesh, targetName: 'spike', weight: 0.15 },
      ],
      weight: 0,
    },
    // A binary group snaps to 0 or 1 around the 0.5 threshold
    { name: 'pointy', bindings: [{ mesh: faceMesh, targetName: 'spike', weight: 1 }], isBinary: true, weight: 0 },
  ];
  const names = ['happy', 'puffed', 'pointy', 'stretch'];
  const set = (name: string, v: number): void => {
    // 'stretch' is no group: setMorphTargetGroupWeight falls back to the target of that name
    model.setMorphTargetGroupWeight(name, v);
  };
  stage.caption('setMorphTargetGroupWeight(name, w)');
  const out = stage.readout();
  if (out) out.textContent = `groups: ${model.collectMorphTargetGroupNames().join(', ')}   ('stretch' is no group: falls back to the target)`;

  if (stage.bar) {
    names.forEach((n) => slider(stage.bar!, n, [0, 1, 0.01], 0, (v) => set(n, v)));
  } else {
    myApp.on('tick', (_dt: number, elapsed: number) => {
      const t = elapsed / 1000;
      names.forEach((n, i) => set(n, Math.max(0, Math.sin(t * 0.9 + i * 1.5))));
    });
  }
  myApp.run();
});
