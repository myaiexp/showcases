// A custom edge-detection post-process wrapped as a frame graph task
import {
  Constants,
  FrameGraph,
  FrameGraphClearTextureTask,
  FrameGraphCopyToBackbufferColorTask,
  FrameGraphCustomPostProcessTask,
  FrameGraphObjectRendererTask,
  type FrameGraphTextureCreationOptions,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createSampleScene } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';
import { EDGE_FRAGMENT } from './edge.glsl.ts';

const target = (format: number): FrameGraphTextureCreationOptions => ({
  size: { width: 100, height: 100 },
  options: { createMipMaps: false, types: [Constants.TEXTURETYPE_UNSIGNED_BYTE], formats: [format], samples: 4, useSRGBBuffers: [false] },
  sizeIsPercentage: true,
});

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas, engine } = stage;
  const sample = createSampleScene(scene, canvas, ctx.preview);

  const frameGraph = new FrameGraph(scene);
  scene.frameGraph = frameGraph;
  scene.cameraToUseForPointers = sample.camera;

  const clear = new FrameGraphClearTextureTask('clear', frameGraph);
  clear.clearColor = true;
  clear.clearDepth = true;
  clear.color.set(0.75, 0.8, 0.9, 1);
  clear.targetTexture = frameGraph.textureManager.createRenderTargetTexture('color', target(Constants.TEXTUREFORMAT_RGBA));
  clear.depthTexture = frameGraph.textureManager.createRenderTargetTexture('depth', target(Constants.TEXTUREFORMAT_DEPTH32_FLOAT));
  frameGraph.addTask(clear);

  const render = new FrameGraphObjectRendererTask('render', frameGraph, scene);
  render.targetTexture = clear.outputTexture;
  render.depthTexture = clear.outputDepthTexture;
  render.objectList = { meshes: scene.meshes, particleSystems: [] };
  render.camera = sample.camera;
  frameGraph.addTask(render);

  // The wrapper task: shader code passed directly, so useShaderStore is false.
  const params = { escale: 3, threshold: 0.1 };
  const edges = new FrameGraphCustomPostProcessTask('edgeDetection', frameGraph, {
    fragmentShader: EDGE_FRAGMENT,
    uniforms: ['escale', 'threshold', 'texelSize'],
    useShaderStore: false,
  });
  // onApplyObservable is where uniforms are set, as with a classic PostProcess.
  edges.onApplyObservable.add((effect) => {
    effect.setFloat('escale', params.escale);
    effect.setFloat('threshold', params.threshold);
    effect.setFloat2('texelSize', 1 / engine.getRenderWidth(), 1 / engine.getRenderHeight());
  });
  edges.sourceTexture = render.outputTexture;
  frameGraph.addTask(edges);

  const copy = new FrameGraphCopyToBackbufferColorTask('copy', frameGraph);
  copy.sourceTexture = edges.outputTexture;
  frameGraph.addTask(copy);

  const onResize = engine.onResizeObservable.add(() => void frameGraph.buildAsync());
  await frameGraph.buildAsync();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('edgeDetection task', true, (on) => (edges.disabled = !on));
    panel.slider('escale', 0, 10, 0.1, params.escale, (v) => (params.escale = v));
    panel.slider('threshold', 0, 1, 0.01, params.threshold, (v) => (params.threshold = v));
  }

  stage.run(() => sample.animate());

  return () => {
    onResize.remove();
    scene.frameGraph = null;
    frameGraph.dispose();
    stage.dispose();
  };
};

export default mount;
