// registerGLTFExtension with a custom extension, its options and enabled
import { ArcRotateCamera, Color4, HemisphericLight, ImportMeshAsync, Vector3 } from '@babylonjs/core';
import { registerBuiltInLoaders } from '@babylonjs/loaders/dynamic';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleGlb } from '../../shared/sample-model.ts';
import { createStage } from '../../shared/stage.ts';
import { NAME, registerTint } from './tint-extension.ts';

const mount: Mount = async (el, ctx) => {
  registerBuiltInLoaders();
  // Not a glTF format extension, so it would run for every glTF loaded anywhere on the page:
  // unregister it again on cleanup.
  const unregister = registerTint();

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

  async function load(enabled: boolean, color: [number, number, number], strength: number): Promise<void> {
    const result = await ImportMeshAsync(glb, scene, {
      pluginOptions: { gltf: { extensionOptions: { [NAME]: { enabled, color, strength } } } },
    });
    if (disposed) return;
    result.meshes[0]!.position.x = ((slot++ % 5) - 2) * 3;
  }

  // Left: extension disabled. Middle and right: enabled with two different tints.
  await load(false, [1, 1, 1], 0);
  await load(true, [1, 0.2, 0.2], 0.7);
  await load(true, [0.2, 0.4, 1], 0.7);

  if (!ctx.preview) {
    const panel = createPanel(el);
    let enabled = true;
    let tint: [number, number, number] = [0.2, 1, 0.3];
    let strength = 0.6;
    panel.check('extensionOptions.showcaseTint.enabled', enabled, (on) => (enabled = on));
    panel.slider('strength', 0, 1, 0.05, strength, (v) => (strength = v));
    panel.select('color', ['green', 'orange', 'purple'] as const, 'green', (v) => {
      tint = v === 'green' ? [0.2, 1, 0.3] : v === 'orange' ? [1, 0.6, 0.1] : [0.7, 0.2, 1];
    });
    panel.button('Load another totem', () => void load(enabled, tint, strength));
  }

  return () => {
    disposed = true;
    unregister();
    stage.dispose();
  };
};

export default mount;
