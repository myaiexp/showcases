// A hand-built frame graph replaces Scene.render: clear, draw, two post-processes, copy out
import {
  Constants,
  FrameGraph,
  FrameGraphBlackAndWhiteTask,
  FrameGraphChromaticAberrationTask,
  FrameGraphClearTextureTask,
  FrameGraphCopyToBackbufferColorTask,
  FrameGraphObjectRendererTask,
  type FrameGraphTextureCreationOptions,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createSampleScene } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const target = (format: number, label: string): FrameGraphTextureCreationOptions => ({
  size: { width: 100, height: 100 },
  options: {
    createMipMaps: false,
    types: [Constants.TEXTURETYPE_UNSIGNED_BYTE],
    formats: [format],
    samples: 4,
    useSRGBBuffers: [false],
    labels: [label],
  },
  // 100 × 100 percent of the output size, so the textures follow canvas resizes.
  sizeIsPercentage: true,
});

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas, engine } = stage;
  const sample = createSampleScene(scene, canvas, ctx.preview);

  // With scene.frameGraph set there is no active camera, so pointers need one named.
  const frameGraph = new FrameGraph(scene);
  scene.frameGraph = frameGraph;
  scene.cameraToUseForPointers = sample.camera;

  // Textures are created through the texture manager, which returns handles, not textures.
  const colorTexture = frameGraph.textureManager.createRenderTargetTexture('color', target(Constants.TEXTUREFORMAT_RGBA, 'color'));
  const depthTexture = frameGraph.textureManager.createRenderTargetTexture('depth', target(Constants.TEXTUREFORMAT_DEPTH32_FLOAT, 'depth'));

  const clearTask = new FrameGraphClearTextureTask('clear', frameGraph);
  clearTask.clearColor = true;
  clearTask.clearDepth = true;
  clearTask.color.set(0.05, 0.06, 0.1, 1);
  clearTask.targetTexture = colorTexture;
  clearTask.depthTexture = depthTexture;
  frameGraph.addTask(clearTask);

  const renderTask = new FrameGraphObjectRendererTask('renderObjects', frameGraph, scene);
  renderTask.targetTexture = clearTask.outputTexture;
  renderTask.depthTexture = clearTask.outputDepthTexture;
  renderTask.objectList = { meshes: scene.meshes, particleSystems: [] };
  renderTask.camera = sample.camera;
  frameGraph.addTask(renderTask);

  // Each task's output texture handle is the next task's source.
  const aberration = new FrameGraphChromaticAberrationTask('aberration', frameGraph);
  aberration.sourceTexture = renderTask.outputTexture;
  aberration.postProcess.aberrationAmount = 40;
  frameGraph.addTask(aberration);

  const blackAndWhite = new FrameGraphBlackAndWhiteTask('blackAndWhite', frameGraph);
  blackAndWhite.sourceTexture = aberration.outputTexture;
  blackAndWhite.postProcess.degree = 0.7;
  frameGraph.addTask(blackAndWhite);

  const copyToBackbuffer = new FrameGraphCopyToBackbufferColorTask('copytobackbuffer', frameGraph);
  copyToBackbuffer.sourceTexture = blackAndWhite.outputTexture;
  frameGraph.addTask(copyToBackbuffer);

  // Build once now, and again whenever the output size changes.
  const onResize = engine.onResizeObservable.add(() => void frameGraph.buildAsync());
  await frameGraph.buildAsync();

  if (!ctx.preview) {
    const panel = createPanel(el);
    // A disabled post-process task passes its source through unchanged.
    panel.check('chromatic aberration task', true, (on) => (aberration.disabled = !on));
    panel.slider('aberrationAmount', 0, 120, 1, 40, (v) => (aberration.postProcess.aberrationAmount = v));
    panel.row();
    panel.check('black and white task', true, (on) => (blackAndWhite.disabled = !on));
    panel.slider('degree', 0, 1, 0.05, 0.7, (v) => (blackAndWhite.postProcess.degree = v));
  }

  let t = 0;
  stage.run(() => {
    sample.animate();
    // The card has no controls, so it pulses the aberration instead.
    if (ctx.preview) aberration.postProcess.aberrationAmount = 40 + Math.sin((t += 0.03)) * 35;
  });

  return () => {
    onResize.remove();
    scene.frameGraph = null;
    frameGraph.dispose();
    stage.dispose();
  };
};

export default mount;
