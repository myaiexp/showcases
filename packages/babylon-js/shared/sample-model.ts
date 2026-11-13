// Procedural totem model exported in memory to glb, OBJ, STL and .babylon
import {
  Animation,
  AnimationGroup,
  Color3,
  MeshBuilder,
  NullEngine,
  PBRMaterial,
  Scene,
  SceneSerializer,
  TransformNode,
  type Mesh,
} from '@babylonjs/core';
import { GLTF2Export, OBJExport, STLExport, type IExportOptions } from '@babylonjs/serializers';

export interface SampleModel {
  root: TransformNode;
  /** Every mesh of the model, by name: base, body, head, ring, hat. */
  meshes: Record<'base' | 'body' | 'head' | 'ring' | 'hat', Mesh>;
  /** Slides the ring up and down the body. */
  bob: AnimationGroup;
}

const colour = (scene: Scene, name: string, c: Color3, metallic = 0.1, roughness = 0.6): PBRMaterial => {
  const m = new PBRMaterial(`${name}-mat`, scene);
  m.albedoColor = c;
  m.metallic = metallic;
  m.roughness = roughness;
  return m;
};

/** Builds the totem (about 2.4 units tall, sitting on y = 0) into `scene`. */
export function buildSampleModel(scene: Scene, name = 'totem'): SampleModel {
  const root = new TransformNode(name, scene);
  const part = (mesh: Mesh, y: number, c: Color3, metallic?: number, roughness?: number): Mesh => {
    mesh.parent = root;
    mesh.position.y = y;
    mesh.material = colour(scene, mesh.name, c, metallic, roughness);
    return mesh;
  };
  const base = part(MeshBuilder.CreateCylinder('base', { height: 0.3, diameter: 1.6, tessellation: 24 }, scene), 0.15, new Color3(0.45, 0.45, 0.5));
  const body = part(MeshBuilder.CreateBox('body', { width: 0.9, height: 1, depth: 0.9 }, scene), 0.8, new Color3(0.85, 0.35, 0.2));
  const head = part(MeshBuilder.CreateSphere('head', { diameter: 0.8, segments: 16 }, scene), 1.7, new Color3(0.95, 0.8, 0.3), 0.6, 0.3);
  const ring = part(MeshBuilder.CreateTorus('ring', { diameter: 1.3, thickness: 0.12, tessellation: 32 }, scene), 1.0, new Color3(0.2, 0.6, 0.85), 0.8, 0.25);
  const hat = part(MeshBuilder.CreateCylinder('hat', { height: 0.6, diameterTop: 0, diameterBottom: 0.6, tessellation: 20 }, scene), 2.4, new Color3(0.4, 0.75, 0.4));
  ring.rotation.x = 0.35;

  const bob = new AnimationGroup(`${name}-bob`, scene);
  const anim = new Animation('ring-bob', 'position.y', 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
  anim.setKeys([
    { frame: 0, value: 0.6 },
    { frame: 45, value: 1.5 },
    { frame: 90, value: 0.6 },
  ]);
  bob.addTargetedAnimation(anim, ring);
  return { root, meshes: { base, body, head, ring, hat }, bob };
}

/** Runs `build` on a throwaway scene (NullEngine: no canvas, no GL context) holding the totem. */
async function exportScene<T>(build: (scene: Scene, model: SampleModel) => Promise<T> | T): Promise<T> {
  const engine = new NullEngine();
  const scene = new Scene(engine);
  try {
    return await build(scene, buildSampleModel(scene));
  } finally {
    scene.dispose();
    engine.dispose();
  }
}

/** The totem as a binary glTF, ready for `LoadAssetContainerAsync` and friends. */
export function sampleGlb(options?: IExportOptions, name = 'totem'): Promise<File> {
  return exportScene(async (scene) => {
    const data = await GLTF2Export.GLBAsync(scene, name, { exportWithoutWaitingForScene: true, ...options });
    const blob = data.files[`${name}.glb`] as Blob;
    return new File([blob], `${name}.glb`, { type: 'model/gltf-binary' });
  });
}

/** The totem as Wavefront OBJ text (geometry only, global positions). */
export function sampleObj(): Promise<string> {
  return exportScene((_scene, m) => OBJExport.OBJ(Object.values(m.meshes), false, undefined, true));
}

/** The totem as STL: ASCII text, or a binary DataView. Meshes are exported as one combined solid. */
export function sampleStl<B extends boolean = false>(binary?: B): Promise<B extends true ? DataView : string> {
  return exportScene((_scene, m) => STLExport.CreateSTL(Object.values(m.meshes), false, 'totem', binary ?? false, true, false, false, false));
}

/** The totem as `.babylon` JSON text. */
export function sampleBabylonJson(): Promise<string> {
  return exportScene((scene) => JSON.stringify(SceneSerializer.Serialize(scene)));
}
