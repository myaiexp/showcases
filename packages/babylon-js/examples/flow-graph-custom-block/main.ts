// Custom data and execution blocks wired into a graph next to the built-in blocks
import {
  ArcRotateCamera,
  Color3,
  FlowGraphAssetType,
  FlowGraphCoordinator,
  FlowGraphFlipFlopBlock,
  FlowGraphSceneTickEventBlock,
  FlowGraphSetPropertyBlock,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { EveryNthBlock, SineWaveBlock } from './blocks.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 9, new Vector3(0, 1.5, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
  const cube = MeshBuilder.CreateBox('cube', { size: 1 }, scene);
  const mat = new StandardMaterial('cube', scene);
  mat.diffuseColor = new Color3(0.3, 0.6, 1);
  cube.material = mat;

  const coordinator = new FlowGraphCoordinator({ scene });
  const graph = coordinator.createGraph();
  const context = graph.createContext();
  const tick = new FlowGraphSceneTickEventBlock();
  graph.addEventBlock(tick);

  // Data path: SceneTick.timeSinceStart → SineWave → SetProperty(position.y), every frame.
  const wave = new SineWaveBlock();
  wave.time.connectTo(tick.timeSinceStart);
  wave.amplitude.setValue(1, context);
  const lift = new FlowGraphSetPropertyBlock<number, FlowGraphAssetType.Mesh>({ propertyName: 'position.y', target: cube });
  lift.value.connectTo(wave.value);
  tick.done.connectTo(lift.in);

  // Signal path: SceneTick → EveryNth → FlipFlop → swap the cube's colour.
  const everyNth = new EveryNthBlock();
  everyNth.n.setValue(40, context);
  const flip = new FlowGraphFlipFlopBlock();
  const warm = new FlowGraphSetPropertyBlock({ propertyName: 'material.diffuseColor', target: cube });
  warm.value.setValue(new Color3(1, 0.5, 0.2), context);
  const cool = new FlowGraphSetPropertyBlock({ propertyName: 'material.diffuseColor', target: cube });
  cool.value.setValue(new Color3(0.3, 0.6, 1), context);
  lift.out.connectTo(everyNth.in);
  everyNth.out.connectTo(flip.in);
  flip.onOn.connectTo(warm.in);
  flip.onOff.connectTo(cool.in);

  coordinator.start();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('SineWave amplitude', 0, 2, 0.05, 1, (v) => wave.amplitude.setValue(v, context));
    panel.slider('SineWave frequency', 0.1, 2, 0.05, 0.5, (v) => wave.frequency.setValue(v, context));
    panel.slider('EveryNth n (ticks)', 5, 120, 1, 40, (v) => everyNth.n.setValue(v, context));
  }
  stage.run(() => {
    cube.rotation.y += 0.01;
    // The wave swings below zero; keep the cube above the ground.
    cube.position.y += 1.6;
  });

  return () => {
    coordinator.dispose();
    stage.dispose();
  };
};

export default mount;
