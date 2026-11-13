// AppendSceneAsync, ImportMeshAsync, LoadAssetContainerAsync on in-memory glb
import { AppendSceneAsync, ArcRotateCamera, Color4, HemisphericLight, ImportMeshAsync, LoadAssetContainerAsync, Vector3 } from '@babylonjs/core';
import type { Node } from '@babylonjs/core';
import { registerBuiltInLoaders } from '@babylonjs/loaders/dynamic';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleGlb } from '../../shared/sample-model.ts';
import { createStage } from '../../shared/stage.ts';

const APIS = ['AppendSceneAsync', 'ImportMeshAsync', 'LoadAssetContainerAsync'] as const;
const SOURCES = ['File', 'ArrayBuffer + pluginExtension', 'base64 data string'] as const;
type Api = (typeof APIS)[number];
type Source = (typeof SOURCES)[number];

const mount: Mount = async (el, ctx) => {
  // The loaders register once; each one is imported only when a file of its type is loaded.
  registerBuiltInLoaders();

  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 12, new Vector3(0, 1.2, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.004;
  });

  // The model never touches the network: it was exported from a procedural scene.
  const glb = await sampleGlb();
  const bytes = new Uint8Array(await glb.arrayBuffer());
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(glb);
  });

  const sourceFor = (kind: Source) =>
    kind === 'File'
      ? { source: glb, options: {} }
      : kind === 'ArrayBuffer + pluginExtension'
        ? // Raw bytes carry no file name, so the loader is chosen with pluginExtension.
          { source: bytes, options: { pluginExtension: '.glb' } }
        : // A data: URL string works the same way for any scene loading function.
          { source: dataUrl, options: {} };

  let slot = 0;
  let disposed = false;
  const placed: string[] = [];

  async function load(api: Api, kind: Source, readout?: HTMLElement): Promise<void> {
    const { source, options } = sourceFor(kind);
    const before = new Set<Node>(scene.rootNodes);
    let roots: Node[];
    if (api === 'AppendSceneAsync') {
      await AppendSceneAsync(source, scene, options);
      roots = scene.rootNodes.filter((n) => !before.has(n));
    } else if (api === 'ImportMeshAsync') {
      const result = await ImportMeshAsync(source, scene, options);
      roots = result.meshes.filter((m) => !m.parent);
    } else {
      const container = await LoadAssetContainerAsync(source, scene, options);
      container.addAllToScene(); // a container holds the assets until you add them
      roots = container.rootNodes;
    }
    if (disposed) return;
    const x = ((slot++ % 5) - 2) * 3;
    for (const root of roots) (root as Node & { position: Vector3 }).position.x = x;
    placed.push(`${api} (${kind}): ${roots.length} root, ${scene.meshes.length} meshes in scene`);
    if (readout) readout.textContent = placed.slice(-3).join('  |  ');
  }

  if (ctx.preview) {
    // One load per API, each from a different kind of in-memory source.
    for (let i = 0; i < APIS.length; i++) await load(APIS[i]!, SOURCES[i]!);
  } else {
    const panel = createPanel(el);
    let api: Api = 'AppendSceneAsync';
    let kind: Source = 'File';
    const out = panel.readout('Load a model to place it in the next slot.');
    panel.row();
    panel.select('Function', APIS, api, (v) => (api = v));
    panel.select('Source', SOURCES, kind, (v) => (kind = v));
    panel.button('Load another totem', () => void load(api, kind, out));
    for (let i = 0; i < APIS.length; i++) await load(APIS[i]!, SOURCES[i]!, out);
  }

  return () => {
    disposed = true;
    stage.dispose();
  };
};

export default mount;
