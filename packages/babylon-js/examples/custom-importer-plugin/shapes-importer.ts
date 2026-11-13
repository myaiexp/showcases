// A scene loader plugin for a made-up .shapes text format
import { AssetContainer, Color3, MeshBuilder, RegisterSceneLoaderPlugin, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { AbstractMesh, ISceneLoaderAsyncResult, ISceneLoaderPluginAsync, Mesh, Scene } from '@babylonjs/core';

/** Options callers pass as pluginOptions.shapes. */
export type ShapesOptions = { scale?: number };

// Registering the options type makes pluginOptions.shapes type-checked.
declare module '@babylonjs/core' {
  export interface SceneLoaderPluginOptions {
    shapes: ShapesOptions;
  }
}

/** One line per shape: `kind x y z size #colour`, e.g. `box -2 0.5 0 1 #e8743b`. */
function parse(text: string, scene: Scene, scale: number): Mesh[] {
  const meshes: Mesh[] = [];
  text.split('\n').forEach((line, i) => {
    const [kind, x, y, z, size, colour] = line.trim().split(/\s+/);
    if (!kind || kind.startsWith('#') || colour === undefined) return;
    const d = Number(size) * scale;
    const name = `${kind}${i}`;
    const mesh =
      kind === 'sphere'
        ? MeshBuilder.CreateSphere(name, { diameter: d, segments: 16 }, scene)
        : kind === 'cone'
          ? MeshBuilder.CreateCylinder(name, { height: d, diameterTop: 0, diameterBottom: d * 0.7 }, scene)
          : MeshBuilder.CreateBox(name, { size: d }, scene);
    mesh.position = new Vector3(Number(x), Number(y), Number(z)).scale(scale);
    const material = new StandardMaterial(`${name}-mat`, scene);
    material.diffuseColor = Color3.FromHexString(colour);
    mesh.material = material;
    meshes.push(mesh);
  });
  return meshes;
}

const result = (meshes: AbstractMesh[]): ISceneLoaderAsyncResult => ({
  meshes,
  particleSystems: [],
  skeletons: [],
  animationGroups: [],
  transformNodes: [],
  geometries: [],
  lights: [],
  spriteManagers: [],
});

class ShapesImporter implements ISceneLoaderPluginAsync {
  public readonly name = 'shapes';
  public readonly extensions = '.shapes';
  private readonly _scale: number;

  constructor(options: ShapesOptions = {}) {
    this._scale = options.scale ?? 1;
  }

  public async importMeshAsync(meshNames: string | readonly string[] | null | undefined, scene: Scene, data: unknown): Promise<ISceneLoaderAsyncResult> {
    const wanted = typeof meshNames === 'string' ? [meshNames] : (meshNames ?? []);
    const all = parse(String(data), scene, this._scale);
    const keep = wanted.length === 0 || wanted[0] === '' ? all : all.filter((m) => wanted.includes(m.name));
    for (const m of all) if (!keep.includes(m)) m.dispose();
    return result(keep);
  }

  public async loadAsync(scene: Scene, data: unknown): Promise<void> {
    parse(String(data), scene, this._scale);
  }

  public async loadAssetContainerAsync(scene: Scene, data: unknown): Promise<AssetContainer> {
    const container = new AssetContainer(scene);
    const meshes = parse(String(data), scene, this._scale);
    container.meshes.push(...meshes);
    for (const m of meshes) if (m.material) container.materials.push(m.material);
    container.removeAllFromScene(); // a container holds its assets outside the scene
    return container;
  }
}

/** The factory is called on every load and receives pluginOptions. */
export function registerShapesImporter(): void {
  RegisterSceneLoaderPlugin({
    name: 'shapes',
    extensions: '.shapes',
    createPlugin: (options) => new ShapesImporter(options.shapes),
  });
}
