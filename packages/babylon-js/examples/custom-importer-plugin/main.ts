// RegisterSceneLoaderPlugin with a custom .shapes importer and options
import { AppendSceneAsync, ArcRotateCamera, Color4, HemisphericLight, ImportMeshAsync, LoadAssetContainerAsync, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { registerShapesImporter } from './shapes-importer.ts';

const SAMPLE = `# kind  x  y  z  size  colour
box     -2   0.5  0  1    #e8743b
sphere   0   0.6  0  1.2  #f2c14e
cone     2   0.75 0  1.5  #6fbf73
sphere   0   1.9  0  0.6  #5aa9e6`;

const mount: Mount = (el, ctx) => {
  registerShapesImporter();

  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 9, new Vector3(0, 0.8, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.005;
  });

  // The file name's extension picks the plugin; the text is the file's content.
  const source = (text: string): File => new File([text], 'scene.shapes');

  const clear = (): void => {
    for (const m of [...scene.meshes]) m.dispose();
  };
  let disposed = false;
  const load = async (text: string, scale: number, how: string): Promise<string> => {
    clear();
    const options = { pluginOptions: { shapes: { scale } } };
    if (how === 'AppendSceneAsync') await AppendSceneAsync(source(text), scene, options);
    else if (how === 'ImportMeshAsync') await ImportMeshAsync(source(text), scene, options);
    else (await LoadAssetContainerAsync(source(text), scene, options)).addAllToScene();
    return disposed ? '' : `${how}: ${scene.meshes.length} meshes`;
  };

  if (ctx.preview) {
    void load(SAMPLE, 1, 'AppendSceneAsync');
  } else {
    const panel = createPanel(el);
    const text = document.createElement('textarea');
    Object.assign(text.style, { width: '100%', height: '7.5em', boxSizing: 'border-box', background: 'var(--bg)', color: 'var(--fg-1)', border: '1px solid var(--border, #333)', fontFamily: 'monospace', fontSize: '0.85rem', padding: 'var(--space-2)' });
    text.value = SAMPLE;
    text.spellcheck = false;
    panel.el.prepend(text);
    const out = panel.readout();
    let scale = 1;
    let how = 'AppendSceneAsync';
    const run = (): void => void load(text.value, scale, how).then((s) => (out.textContent = s)).catch((e: unknown) => (out.textContent = String(e)));
    panel.row();
    panel.slider('pluginOptions.shapes.scale', 0.5, 2, 0.1, scale, (v) => ((scale = v), run()));
    panel.select('Function', ['AppendSceneAsync', 'ImportMeshAsync', 'LoadAssetContainerAsync'] as const, how, (v) => ((how = v), run()));
    panel.button('Load the text above', run);
    run();
  }

  return () => {
    disposed = true;
    stage.dispose();
  };
};

export default mount;
