// Scaffolding for the animation examples: a lit floor, an orbit camera and a GLB loaded by fetchModel
import { Vector3, Vector4 } from '@zephyr3d/base';
import { GLTFImporter } from '@zephyr3d/loaders';
import {
  DirectionalLight,
  getEngine,
  getInput,
  LambertMaterial,
  Mesh,
  OrbitCameraController,
  PerspectiveCamera,
  PlaneShape,
  type SceneNode,
  type Scene,
} from '@zephyr3d/scene';

/** A key light, a grey floor and an orbit camera looking at `target`; the scene is made renderable. */
export function animScene(
  scene: Scene,
  opts: { eye?: Vector3; target?: Vector3; shadows?: boolean; floorSize?: number } = {},
): PerspectiveCamera {
  const { eye = new Vector3(2.2, 1.6, 3.2), target = new Vector3(0, 0.9, 0), shadows = true, floorSize = 8 } = opts;
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 2, 2), Vector3.zero(), Vector3.axisPY());
  light.castShadow = shadows;
  const mat = new LambertMaterial();
  mat.albedoColor = new Vector4(0.45, 0.47, 0.52, 1);
  new Mesh(scene, new PlaneShape({ size: floorSize }), mat);
  const camera = new PerspectiveCamera(scene, Math.PI / 4, 0.05, 100);
  scene.mainCamera = camera;
  camera.lookAt(eye, target, Vector3.axisPY());
  camera.controller = new OrbitCameraController({ center: target });
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);
  return camera;
}

/** Registers the glTF importer (once per page) and loads a GLB from the example's VFS. */
export async function loadGlb(scene: Scene, path: string): Promise<SceneNode> {
  const resources = getEngine().resourceManager;
  resources.setModelLoader('model/gltf-binary', new GLTFImporter());
  const model = await resources.fetchModel(path, scene);
  if (!model) throw new Error(`${path} did not load`);
  return model;
}

/** A small flat-coloured Lambert material. */
export function flat(r: number, g: number, b: number): LambertMaterial {
  const m = new LambertMaterial();
  m.albedoColor = new Vector4(r, g, b, 1);
  return m;
}

/** Appends lines to a readout, keeping the last `keep`. Cards have no readout: it does nothing there. */
export function logTo(out: HTMLPreElement | null, keep = 8): (line: string) => void {
  const lines: string[] = [];
  return (line) => {
    lines.push(line);
    if (lines.length > keep) lines.shift();
    if (out) out.textContent = lines.join('\n');
  };
}

/** The joint node whose name is `name`, with or without a prefix such as "mixamorig:". */
export function findJoint(root: SceneNode, name: string): SceneNode {
  let found: SceneNode | null = null;
  root.iterate((n) => {
    if (!found && (n.name === name || n.name.endsWith(`:${name}`))) found = n;
    return found !== null;
  });
  if (!found) throw new Error(`no joint named ${name}`);
  return found;
}
