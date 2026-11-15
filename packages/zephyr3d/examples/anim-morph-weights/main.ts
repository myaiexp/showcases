// Morph target weights: through the model root, by index or name on the mesh, or all at once
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type Mesh } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
import { select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { blobGlb } from '../../shared/gltf/blob.ts';
import { memoryFiles } from '../../shared/vfs.ts';

type Api = 'model.setMorphTargetWeight' | 'mesh.setMorphWeightByIndex' | 'mesh.setMorphWeight' | 'mesh.updateMorphWeights';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/blob.glb': blobGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(1.2, 1.1, 2.1), target: new Vector3(0, 0.5, 0), floorSize: 4, shadows: !stage.preview });
  const model = await loadGlb(scene, '/models/blob.glb');

  let faceMesh: Mesh | null = null;
  model.iterate((node) => {
    if (!faceMesh && node.isMesh()) faceMesh = node;
    return false;
  });
  const mesh = faceMesh as Mesh | null;
  if (!mesh) throw new Error('no mesh in blob.glb');
  // Names come from the glTF's extras.targetNames
  const names = model.collectMorphTargetNames();
  const weights = names.map(() => 0);

  let api: Api = 'model.setMorphTargetWeight';
  const set = (i: number, v: number): void => {
    const name = names[i]!;
    weights[i] = v;
    if (api === 'model.setMorphTargetWeight') model.setMorphTargetWeight(name, v);
    else if (api === 'mesh.setMorphWeightByIndex') {
      const index = mesh.getMorphTargetIndexByName(name);
      if (index >= 0) mesh.setMorphWeightByIndex(index, v);
    } else if (api === 'mesh.setMorphWeight') mesh.setMorphWeight(name, v);
    else mesh.updateMorphWeights(weights);
  };
  const out = stage.readout();
  const show = (): void => {
    stage.caption(`${api}('${names.join("', '")}')`);
    if (out) out.textContent = `collectMorphTargetNames(): ${names.join(', ')}\nweights: ${names.map((n, i) => `${n} ${mesh.getMorphWeight(n).toFixed(2)}`).join('  ')}\ngetMorphTargetIndexByName('${names[0]}') -> ${mesh.getMorphTargetIndexByName(names[0]!)}`;
  };
  show();
  if (stage.bar) {
    select(stage.bar, 'API', ['model.setMorphTargetWeight', 'mesh.setMorphWeightByIndex', 'mesh.setMorphWeight', 'mesh.updateMorphWeights'] as const, api, (v) => (api = v));
    names.forEach((name, i) =>
      slider(stage.bar!, name, [0, 1, 0.01], 0, (v) => {
        set(i, v);
        show();
      }),
    );
  } else {
    myApp.on('tick', (_dt: number, elapsed: number) => {
      const t = elapsed / 1000;
      names.forEach((_n, i) => set(i, 0.5 + 0.5 * Math.sin(t * 1.1 + i * 1.6)));
    });
  }
  myApp.run();
});
