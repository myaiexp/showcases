// AssetsManager mesh, text, binary, image and texture tasks with progress
import { ArcRotateCamera, AssetsManager, AssetTaskState, Color4, HemisphericLight, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { AbstractMesh } from '@babylonjs/core';
import { registerBuiltInLoaders } from '@babylonjs/loaders/dynamic';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleGlb } from '../../shared/sample-model.ts';
import { createStage } from '../../shared/stage.ts';

/** A small checkerboard as a data URL: the image the texture and image tasks read. */
function checkerDataUrl(): string {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      g.fillStyle = (x + y) % 2 ? '#2b3a55' : '#9fb4d9';
      g.fillRect(x * 16, y * 16, 16, 16);
    }
  }
  return c.toDataURL('image/png');
}

const mount: Mount = async (el, ctx) => {
  registerBuiltInLoaders();
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 8, new Vector3(0, 1, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.004;
  });

  const glb = await sampleGlb();
  const urls: string[] = [];
  const blobUrl = (data: BlobPart): string => {
    const url = URL.createObjectURL(new Blob([data]));
    urls.push(url);
    return url;
  };

  const log = document.createElement('pre');
  Object.assign(log.style, { width: '100%', margin: '0', padding: 'var(--space-2) var(--space-3)', boxSizing: 'border-box', background: 'var(--bg-surface)', color: 'var(--fg-2)', fontSize: '0.8rem', height: '9.5em', overflow: 'auto' });
  const print = (line: string): void => {
    log.textContent += `${line}\n`;
    log.scrollTop = log.scrollHeight;
  };
  let loaded: AbstractMesh[] = [];
  const ground = MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
  const groundMat = new StandardMaterial('ground-mat', scene);
  ground.material = groundMat;

  function runTasks(): void {
    for (const m of loaded) m.dispose();
    loaded = [];
    log.textContent = '';
    const manager = new AssetsManager(scene);
    manager.useDefaultLoadingScreen = !ctx.preview; // the preview card keeps its canvas clean

    // Each add...Task call returns a task with its own onSuccess and onError.
    const meshTask = manager.addMeshTask('totem task', '', '', glb);
    meshTask.onSuccess = (task) => {
      loaded = task.loadedMeshes;
      print(`mesh: ${task.loadedMeshes.length} meshes loaded`);
    };
    const textTask = manager.addTextFileTask('notes task', blobUrl('A text file that lives in memory.'));
    textTask.onSuccess = (task) => print(`text: "${task.text}"`);
    const binaryTask = manager.addBinaryFileTask('bytes task', blobUrl(new Uint8Array(2048)));
    binaryTask.onSuccess = (task) => print(`binary: ${task.data.byteLength} bytes`);
    const dataUrl = checkerDataUrl();
    const imageTask = manager.addImageTask('image task', dataUrl);
    imageTask.onSuccess = (task) => print(`image: ${task.image.width} x ${task.image.height}`);
    const textureTask = manager.addTextureTask('texture task', dataUrl);
    textureTask.onSuccess = (task) => {
      groundMat.diffuseTexture = task.texture;
      print('texture: applied to the ground');
    };
    // A blob URL that was revoked before use fails, to show the error path.
    const gone = URL.createObjectURL(new Blob(['x']));
    URL.revokeObjectURL(gone);
    manager.addTextFileTask('missing task', gone);

    manager.onProgress = (remaining, total, task) => print(`progress: ${total - remaining}/${total} (${task.name})`);
    manager.onTaskErrorObservable.add((task) => print(`error in "${task.name}": ${task.errorObject.message ?? 'failed'}`));
    manager.onTasksDoneObservable.add((tasks) => {
      const failed = tasks.filter((t) => t.taskState === AssetTaskState.ERROR).length;
      print(`done: ${tasks.length - failed} succeeded, ${failed} failed`);
    });
    void manager.loadAsync().catch(() => undefined); // rejects when a task failed; the log already says so
  }

  if (!ctx.preview) {
    el.append(log);
    const panel = createPanel(el);
    panel.button('Run the tasks again', runTasks);
  }
  runTasks();

  return () => {
    for (const url of urls) URL.revokeObjectURL(url);
    stage.dispose();
  };
};

export default mount;
