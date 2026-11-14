// One flow graph run in two execution contexts, each moving its own mesh
import {
  ArcRotateCamera,
  Color3,
  Constants,
  FlowGraphAssetType,
  FlowGraphConsoleLogBlock,
  FlowGraphCoordinator,
  FlowGraphGetVariableBlock,
  FlowGraphInterpolationBlock,
  FlowGraphPlayAnimationBlock,
  FlowGraphSceneReadyEventBlock,
  FlowGraphSetPropertyBlock,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 12, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);

  const mesh = (name: string, color: Color3, make: () => ReturnType<typeof MeshBuilder.CreateBox>) => {
    const m = make();
    const mat = new StandardMaterial(name, scene);
    mat.diffuseColor = color;
    m.material = mat;
    return m;
  };
  const sphere = mesh('sphere', new Color3(1, 0.5, 0.3), () => MeshBuilder.CreateSphere('sphere', { diameter: 1.2 }, scene));
  sphere.position.set(-2, 0.6, 0);
  const box = mesh('box', new Color3(0.3, 0.6, 1), () => MeshBuilder.CreateBox('box', { size: 1.1 }, scene));
  box.position.set(2, 0.55, 0);

  // The graph's own output, written into the page by a SetProperty block.
  const label = document.createElement('div');
  Object.assign(label.style, { position: 'absolute', top: '8px', left: '10px', color: '#fff', font: '12px monospace' });
  el.style.position = 'relative';
  el.append(label);

  // Coordinator → graph → contexts. The graph is the recipe, each context its ingredients.
  const coordinator = new FlowGraphCoordinator({ scene });
  const graph = coordinator.createGraph();

  const sphereCtx = graph.createContext();
  sphereCtx.setVariable('assetToWorkOn', sphere);
  sphereCtx.setVariable('endPosition', new Vector3(-2, 2.5, 3));
  sphereCtx.setVariable('startPosition', sphere.position.clone());
  const boxCtx = graph.createContext();
  boxCtx.setVariable('assetToWorkOn', box);
  boxCtx.setVariable('endPosition', new Vector3(3, 0.55, -3));
  boxCtx.setVariable('startPosition', box.position.clone());

  const sceneReady = new FlowGraphSceneReadyEventBlock();
  graph.addEventBlock(sceneReady);

  // A GetVariable block with an initial value, logged to the console and shown on the page.
  const message = new FlowGraphGetVariableBlock({ variable: 'readyMessage', initialValue: 'Hello Scene: both contexts started' });
  const log = new FlowGraphConsoleLogBlock();
  log.message.connectTo(message.value);
  sceneReady.done.connectTo(log.in);
  // SetProperty writes a property path on any object; its typings only name scene assets.
  const show = new FlowGraphSetPropertyBlock<string, FlowGraphAssetType.Mesh>({ propertyName: 'textContent', target: label as never });
  show.value.connectTo(message.value);
  log.out.connectTo(show.in);

  // Two keyframes, out and back, played in a loop on whatever object the context names.
  const interpolation = new FlowGraphInterpolationBlock({
    animationType: Constants.ANIMATIONTYPE_VECTOR3,
    propertyName: 'position',
    keyFramesCount: 2,
  });
  const endPosition = new FlowGraphGetVariableBlock({ variable: 'endPosition' });
  const startPosition = new FlowGraphGetVariableBlock({ variable: 'startPosition' });
  for (const c of [sphereCtx, boxCtx]) {
    interpolation.getDataInput('duration_0')!.setValue(1.2, c);
    interpolation.getDataInput('duration_1')!.setValue(2.4, c);
  }
  interpolation.getDataInput('value_0')!.connectTo(endPosition.value);
  interpolation.getDataInput('value_1')!.connectTo(startPosition.value);

  const asset = new FlowGraphGetVariableBlock({ variable: 'assetToWorkOn' });
  const play = new FlowGraphPlayAnimationBlock();
  play.object.connectTo(asset.value);
  play.animation.connectTo(interpolation.animation);
  for (const c of [sphereCtx, boxCtx]) play.loop.setValue(true, c);
  sceneReady.done.connectTo(play.in);

  coordinator.start();
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.003;
  });

  return () => {
    coordinator.dispose();
    label.remove();
    stage.dispose();
  };
};

export default mount;
