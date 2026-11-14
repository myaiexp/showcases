// OBJFileLoader flags on OBJ text loaded from a string
import { ArcRotateCamera, Color4, DirectionalLight, HemisphericLight, ImportMeshAsync, Vector3 } from '@babylonjs/core';
import type { AbstractMesh } from '@babylonjs/core';
import { OBJFileLoader } from '@babylonjs/loaders';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleObj } from '../../shared/sample-model.ts';
import { createStage } from '../../shared/stage.ts';
import { gemObj } from './gem.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 9, new Vector3(0, 0.8, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene).intensity = 0.5;
  new DirectionalLight('sun', new Vector3(-1, -1.5, 1), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.005;
  });

  const totemText = await sampleObj();
  let loaded: AbstractMesh[] = [];
  let disposed = false;
  const flags = { computeNormals: true, vertexColors: true, invertY: false };

  async function load(): Promise<void> {
    // These are static settings of the loader, read when a load starts.
    OBJFileLoader.COMPUTE_NORMALS = flags.computeNormals;
    OBJFileLoader.IMPORT_VERTEX_COLORS = flags.vertexColors;
    OBJFileLoader.INVERT_Y = flags.invertY;
    for (const m of loaded) m.dispose();
    // "data:" plus the OBJ text, and pluginExtension because a string has no file name.
    const gem = await ImportMeshAsync('data:' + gemObj(), scene, { pluginExtension: '.obj' });
    const totem = await ImportMeshAsync('data:' + totemText, scene, { pluginExtension: '.obj' });
    if (disposed) return;
    for (const m of gem.meshes) m.position.x = -2.5;
    for (const m of totem.meshes) m.position.x = 2.5;
    loaded = [...gem.meshes, ...totem.meshes];
  }
  await load();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout('Left: a hand-written OBJ with colours and no normals. Right: the exported totem OBJ.');
    panel.row();
    panel.check('COMPUTE_NORMALS', flags.computeNormals, (on) => ((flags.computeNormals = on), void load()));
    panel.check('IMPORT_VERTEX_COLORS', flags.vertexColors, (on) => ((flags.vertexColors = on), void load()));
    panel.check('INVERT_Y', flags.invertY, (on) => ((flags.invertY = on), void load()));
  }

  return () => {
    disposed = true;
    // Back to the loader defaults so other examples are unaffected.
    OBJFileLoader.COMPUTE_NORMALS = false;
    OBJFileLoader.IMPORT_VERTEX_COLORS = false;
    OBJFileLoader.INVERT_Y = false;
    stage.dispose();
  };
};

export default mount;
