// Scene renders into a pass post-process; a frame graph adds bloom on top
import {
  FrameGraph,
  FrameGraphBlackAndWhiteTask,
  FrameGraphBloomTask,
  FrameGraphCopyToBackbufferColorTask,
  PassPostProcess,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createSampleScene } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas, engine } = stage;
  const sample = createSampleScene(scene, canvas, ctx.preview);
  const camera = sample.camera;

  // A "pass" post-process makes the regular render land in a texture we can import.
  const passPostProcess = new PassPostProcess('pass', 1, camera);
  passPostProcess.samples = 4;
  // Resizing now creates the texture, which otherwise only exists after the first render.
  passPostProcess.resize(engine.getRenderWidth(), engine.getRenderHeight(), camera);

  const frameGraph = new FrameGraph(scene);
  const passHandle = frameGraph.textureManager.importTexture('pass post-process', passPostProcess.inputTexture.texture!);
  // A resize recreates the texture: re-import it under the same handle, then rebuild.
  const onSize = passPostProcess.onSizeChangedObservable.add(() => {
    frameGraph.textureManager.importTexture('pass post-process', passPostProcess.inputTexture.texture!, passHandle);
  });

  const bloomTask = new FrameGraphBloomTask('bloom', frameGraph, 0.5, 128, 0.1, false, 0.5);
  bloomTask.sourceTexture = passHandle;
  frameGraph.addTask(bloomTask);

  const bnwTask = new FrameGraphBlackAndWhiteTask('bnw', frameGraph);
  bnwTask.sourceTexture = bloomTask.outputTexture;
  bnwTask.disabled = true;
  frameGraph.addTask(bnwTask);

  const copyTask = new FrameGraphCopyToBackbufferColorTask('copytobackbuffer', frameGraph);
  copyTask.sourceTexture = bnwTask.outputTexture;
  frameGraph.addTask(copyTask);

  const onResize = engine.onResizeObservable.add(() => void frameGraph.buildAsync());
  await frameGraph.buildAsync();

  // Scene.render still runs; the graph executes after it, every frame.
  const onAfter = scene.onAfterRenderObservable.add(() => frameGraph.execute());

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('bloom.threshold', 0, 1, 0.01, 0.1, (v) => (bloomTask.bloom.threshold = v));
    panel.slider('bloom.weight', 0, 2, 0.05, 0.5, (v) => (bloomTask.bloom.weight = v));
    panel.slider('bloom.kernel', 8, 256, 4, 128, (v) => (bloomTask.bloom.kernel = v));
    panel.row();
    panel.check('black and white task', false, (on) => (bnwTask.disabled = !on));
  }

  let t = 0;
  stage.run(() => {
    sample.animate();
    if (ctx.preview) bloomTask.bloom.weight = 0.6 + Math.sin((t += 0.02)) * 0.5;
  });

  return () => {
    onAfter.remove();
    onResize.remove();
    onSize.remove();
    frameGraph.dispose();
    stage.dispose();
  };
};

export default mount;
