// A Loader subclass registered with resourceLoader reads a made-up voxel file into an entity of cubes
import { AssetPromise, type Engine, type Entity, type LoadItem, Loader, MeshRenderer, PrimitiveMesh, type ResourceManager, resourceLoader } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { releaseUrls, jsonBlobUrl } from '../../shared/assets-kit.ts';
import { slider } from '../../shared/controls.ts';
import { lit, phong, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';


const VOXELS = 'ShowcaseVoxels';

interface VoxelFile {
  cells: [number, number, number, number][];
}

/** What the loader resolves to: the parsed file and a way to build it. */
class VoxelResource {
  readonly engine: Engine;
  readonly file: VoxelFile;
  constructor(engine: Engine, file: VoxelFile) {
    this.engine = engine;
    this.file = file;
  }
  instantiate(): Entity {
    const root = this.engine.createEntity('voxels');
    const mesh = PrimitiveMesh.createCuboid(this.engine, 0.9, 0.9, 0.9);
    for (const [x, y, z, hue] of this.file.cells) {
      const cell = root.createChild('cell');
      cell.transform.setPosition(x, y, z);
      const renderer = cell.addComponent(MeshRenderer);
      renderer.mesh = mesh;
      const m = phong(this.engine, hsl(hue));
      renderer.setMaterial(m);
    }
    return root;
  }
}

function hsl(h: number): [number, number, number] {
  const f = (n: number): number => {
    const k = (n + h / 30) % 12;
    return 0.55 - 0.35 * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [f(0), f(8), f(4)];
}

// The docs write this as `@resourceLoader(FBX, ["fbx"]) class FBXLoader extends Loader<FBXResource>`.
class VoxelLoader extends Loader<VoxelResource> {
  override load(item: LoadItem, resourceManager: ResourceManager): AssetPromise<VoxelResource> {
    return new AssetPromise((resolve, reject) => {
      fetch(item.url ?? '')
        .then((r) => r.json() as Promise<VoxelFile>)
        .then((file) => resolve(new VoxelResource(resourceManager.engine, file)))
        .catch(reject);
    });
  }
}
resourceLoader(VOXELS, ['vxl'], false)(VoxelLoader);

/** A stepped pyramid of `layers` layers, hue by height. */
function pyramid(layers: number): VoxelFile {
  const cells: VoxelFile['cells'] = [];
  for (let y = 0; y < layers; y++) {
    const half = layers - y - 1;
    for (let x = -half; x <= half; x++) for (let z = -half; z <= half; z++) cells.push([x, y, z, 20 + y * 45]);
  }
  return { cells };
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Each change writes a new voxel file (a blob) and loads it through the custom loader.' });
  const { engine, root } = stage;
  stage.own(releaseUrls);
  lit(stage, [0, 5, 16], [0, 1.2, 0]);
  const info = panel(stage, 'bl');
  let current: Entity | undefined;
  let layers = 3;
  let token = 0;
  const build = async (n: number): Promise<void> => {
    const mine = ++token;
    const url = jsonBlobUrl(pyramid(n));
    const voxels = await engine.resourceManager.load<VoxelResource>({ type: VOXELS, url });
    if (mine !== token || ctx.signal.aborted) return;
    current?.destroy();
    current = voxels.instantiate();
    current.transform.setPosition(0, -1, 0);
    root.addChild(current);
    info.text(`load({ type: '${VOXELS}', url })\n-> VoxelResource with ${voxels.file.cells.length} cells`);
  };
  await build(layers);
  if (!stage.preview) slider(stage.bar, 'layers in the file', 1, 6, 1, layers, (v) => void build((layers = v)));
  let last = 0;
  tick(root, (dt, t) => {
    current?.transform.rotate(0, 30 * dt, 0);
    if (stage.preview && t - last > 2) {
      last = t;
      layers = (layers % 4) + 1;
      void build(layers);
    }
  });
  return stage.dispose;
};

export default mount;
