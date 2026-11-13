// glTF loader options through pluginOptions.gltf: skips and callbacks
import { ArcRotateCamera, Color4, HemisphericLight, ImportMeshAsync, Vector3 } from '@babylonjs/core';
import { GLTFLoaderAnimationStartMode } from '@babylonjs/loaders';
import { registerBuiltInLoaders } from '@babylonjs/loaders/dynamic';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleGlb } from '../../shared/sample-model.ts';
import { createStage } from '../../shared/stage.ts';

const START_MODES = ['NONE', 'FIRST', 'ALL'] as const;

const mount: Mount = async (el, ctx) => {
  registerBuiltInLoaders();
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.15, 12, new Vector3(0, 1.2, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.004;
  });

  const glb = await sampleGlb();
  let slot = 0;
  let disposed = false;
  let readout: HTMLElement | undefined;

  async function load(skipMaterials: boolean, animationStartMode: keyof typeof GLTFLoaderAnimationStartMode): Promise<void> {
    let meshCount = 0;
    let materialCount = 0;
    let generator = '';
    const result = await ImportMeshAsync(glb, scene, {
      pluginOptions: {
        gltf: {
          skipMaterials, // meshes keep no glTF materials
          animationStartMode: GLTFLoaderAnimationStartMode[animationStartMode],
          // Callbacks fire while the file loads.
          onParsed: (data) => {
            generator = String((data.json as { asset?: { generator?: string } }).asset?.generator ?? 'unknown');
          },
          onMeshLoaded: () => meshCount++,
          onMaterialLoaded: () => materialCount++,
        },
      },
    });
    if (disposed) return;
    result.meshes[0]!.position.x = ((slot++ % 5) - 2) * 3;
    if (readout) {
      readout.textContent = `skipMaterials=${skipMaterials}, animationStartMode=${animationStartMode}: ${meshCount} meshes, ${materialCount} materials loaded, ${result.animationGroups.length} animation groups, generator "${generator}"`;
    }
  }

  // Three loads of the same glb: all defaults, no materials, animations left stopped.
  await load(false, 'FIRST');
  await load(true, 'FIRST');
  await load(false, 'NONE');

  if (!ctx.preview) {
    const panel = createPanel(el);
    readout = panel.readout('Pick options and load another totem.');
    panel.row();
    let skip = false;
    let mode: (typeof START_MODES)[number] = 'FIRST';
    panel.check('skipMaterials', skip, (on) => (skip = on));
    panel.select('animationStartMode', START_MODES, mode, (v) => (mode = v));
    panel.button('Load with these options', () => void load(skip, mode));
  }

  return () => {
    disposed = true;
    stage.dispose();
  };
};

export default mount;
