// GLTF2Export.GLBAsync with node and animation filters, reloaded beside it
import { ArcRotateCamera, Camera, Color3, Color4, HemisphericLight, ImportMeshAsync, Light, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Node, TransformNode } from '@babylonjs/core';
import { GLTF2Export } from '@babylonjs/serializers';
import { registerBuiltInLoaders } from '@babylonjs/loaders/dynamic';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildSampleModel } from '../../shared/sample-model.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  registerBuiltInLoaders();
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.15, 12, new Vector3(0, 1.2, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);

  // The scene to export: the totem plus things that should not ship in a model file.
  const model = buildSampleModel(scene);
  const flat = (name: string, c: Color3): StandardMaterial => {
    const m = new StandardMaterial(name, scene);
    m.disableLighting = true;
    m.emissiveColor = c;
    m.backFaceCulling = false;
    return m;
  };
  const skybox = MeshBuilder.CreateSphere('skybox', { diameter: 60, segments: 8 }, scene);
  skybox.material = flat('sky-mat', new Color3(0.1, 0.12, 0.25));
  skybox.isPickable = false;
  const marker = MeshBuilder.CreateSphere('debug-marker', { diameter: 0.4 }, scene);
  marker.position.set(0, 3.2, 0);
  marker.material = flat('marker-mat', new Color3(1, 0.1, 0.1));
  model.bob.play(true);

  const options = { skipSkybox: true, skipMarkers: true, animations: true, removeNoop: true };
  let reloaded: TransformNode | undefined;
  let busy = false;
  let disposed = false;
  let readout: HTMLElement | undefined;

  async function exportAndReload(): Promise<void> {
    if (busy) return;
    busy = true;
    reloaded?.dispose();
    model.root.position.x = 0; // export at the origin, then slide the original aside
    const data = await GLTF2Export.GLBAsync(scene, 'export', {
      // Return false to leave a node (and its children) out of the file.
      shouldExportNode: (node: Node) => {
        if (node instanceof Camera || node instanceof Light) return false;
        if (options.skipSkybox && node.name === 'skybox') return false;
        if (options.skipMarkers && node.name.startsWith('debug-')) return false;
        return true;
      },
      shouldExportAnimation: () => options.animations,
      removeNoopRootNodes: options.removeNoop,
    });
    const glb = data.files['export.glb'] as Blob;
    const file = new File([glb], 'export.glb');
    const result = await ImportMeshAsync(file, scene, {});
    if (disposed) return;
    model.root.position.x = -2.5;
    reloaded = result.meshes[0] as TransformNode;
    reloaded.position.x = 2.5;
    busy = false;
    if (readout) {
      const names = result.meshes.map((m) => m.name).filter((n) => n !== '__root__');
      readout.textContent = `${(glb.size / 1024).toFixed(1)} KB glb, ${names.length} meshes reloaded (${names.join(', ')}), ${result.animationGroups.length} animation groups`;
    }
  }

  if (!ctx.preview) {
    const panel = createPanel(el);
    readout = panel.readout();
    panel.row();
    panel.check('skip the skybox', options.skipSkybox, (on) => (options.skipSkybox = on));
    panel.check('skip debug markers', options.skipMarkers, (on) => (options.skipMarkers = on));
    panel.check('shouldExportAnimation', options.animations, (on) => (options.animations = on));
    panel.check('removeNoopRootNodes', options.removeNoop, (on) => (options.removeNoop = on));
    panel.button('Export and reload', () => void exportAndReload());
  }
  void exportAndReload();
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.005;
  });

  return () => {
    disposed = true;
    stage.dispose();
  };
};

export default mount;
