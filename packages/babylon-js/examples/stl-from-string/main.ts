// STL loaded from an ASCII string and from binary bytes
import { ArcRotateCamera, Color4, DirectionalLight, HemisphericLight, ImportMeshAsync, Vector3 } from '@babylonjs/core';
import type { AbstractMesh } from '@babylonjs/core';
import { STLFileLoader } from '@babylonjs/loaders';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleStl } from '../../shared/sample-model.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 9, new Vector3(0, 1.2, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene).intensity = 0.5;
  new DirectionalLight('sun', new Vector3(-1, -1.5, 1), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.005;
  });

  // STL has geometry only: no colours, no materials.
  const ascii = await sampleStl();
  const binary = await sampleStl(true);

  let loaded: AbstractMesh[] = [];
  let disposed = false;
  async function load(keepCoordinates: boolean): Promise<void> {
    // By default the loader swaps the Y and Z axes (STL files are usually Z-up).
    STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES = keepCoordinates;
    for (const m of loaded) m.dispose();
    const left = await ImportMeshAsync('data:' + ascii, scene, { pluginExtension: '.stl' });
    // The STL plugin doesn't take raw bytes as a source, but it reads a File holding them.
    const bytes = new Uint8Array(binary.byteLength);
    bytes.set(new Uint8Array(binary.buffer, binary.byteOffset, binary.byteLength));
    const file = new File([bytes], 'totem.stl');
    const right = await ImportMeshAsync(file, scene, { pluginExtension: '.stl' });
    if (disposed) return;
    for (const m of left.meshes) m.position.x = -2;
    for (const m of right.meshes) m.position.x = 2;
    loaded = [...left.meshes, ...right.meshes];
  }
  await load(false);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout(`ASCII string (left): ${ascii.length} characters.  Binary bytes (right): ${binary.byteLength} bytes.`);
    panel.row();
    panel.check('DO_NOT_ALTER_FILE_COORDINATES', false, (on) => void load(on));
  }

  return () => {
    disposed = true;
    STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES = false;
    stage.dispose();
  };
};

export default mount;
