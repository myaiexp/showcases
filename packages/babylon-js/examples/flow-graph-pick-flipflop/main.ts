// Flow graph lamps: mesh picks and a throttled MultiGate drive FlipFlop blocks
import {
  ArcRotateCamera,
  Color3,
  FlowGraphCallCounterBlock,
  FlowGraphCoordinator,
  FlowGraphFlipFlopBlock,
  FlowGraphMeshPickEventBlock,
  FlowGraphMultiGateBlock,
  FlowGraphSceneTickEventBlock,
  FlowGraphSetPropertyBlock,
  FlowGraphThrottleBlock,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const ON = [new Color3(1, 0.35, 0.2), new Color3(0.3, 1, 0.45), new Color3(0.35, 0.55, 1)];
const OFF = new Color3(0.05, 0.05, 0.08);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 9, new Vector3(0, 0.8, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene).intensity = 0.4;

  const lamps = ON.map((_, i) => {
    const lamp = MeshBuilder.CreateSphere(`lamp${i}`, { diameter: 1.4 }, scene);
    lamp.position.set((i - 1) * 2.2, 0.8, 0);
    const mat = new StandardMaterial(`lamp${i}`, scene);
    mat.emissiveColor = OFF.clone();
    lamp.material = mat;
    return lamp;
  });

  const coordinator = new FlowGraphCoordinator({ scene });
  const graph = coordinator.createGraph();
  const context = graph.createContext();

  // Each lamp: an entry signal → FlipFlop → SetProperty on the lamp's material colour.
  const flips = lamps.map((lamp, i) => {
    const flip = new FlowGraphFlipFlopBlock();
    const turnOn = new FlowGraphSetPropertyBlock({ propertyName: 'material.emissiveColor', target: lamp });
    turnOn.value.setValue(ON[i], context);
    const turnOff = new FlowGraphSetPropertyBlock({ propertyName: 'material.emissiveColor', target: lamp });
    turnOff.value.setValue(OFF, context);
    flip.onOn.connectTo(turnOn.in);
    flip.onOff.connectTo(turnOff.in);
    return flip;
  });

  // Full view: picking a lamp toggles it. A CallCounter sits between pick and flip-flop.
  const counters = lamps.map((lamp, i) => {
    const pick = new FlowGraphMeshPickEventBlock({ targetMesh: lamp });
    graph.addEventBlock(pick);
    const counter = new FlowGraphCallCounterBlock();
    pick.done.connectTo(counter.in);
    counter.out.connectTo(flips[i]!.in);
    return counter;
  });

  // Autoplay: every scene tick, throttled to one signal per interval, steps a looping MultiGate.
  const tick = new FlowGraphSceneTickEventBlock();
  graph.addEventBlock(tick);
  const throttle = new FlowGraphThrottleBlock();
  throttle.duration.setValue(0.6, context);
  const gate = new FlowGraphMultiGateBlock({ outputSignalCount: lamps.length, isLoop: true });
  tick.done.connectTo(throttle.in);
  throttle.out.connectTo(gate.in);
  gate.outputSignals.forEach((out, i) => out.connectTo(flips[i]!.in));

  coordinator.start();

  let autoplay = true;
  const setAutoplay = (on: boolean): void => {
    autoplay = on;
    // A disconnected throttle stops the gate; reconnecting resumes it.
    if (on) tick.done.connectTo(throttle.in);
    else tick.done.disconnectFrom(throttle.in);
  };
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('autoplay (SceneTick → Throttle → MultiGate)', autoplay, setAutoplay);
    panel.slider('throttle duration (s)', 0.1, 2, 0.1, 0.6, (v) => throttle.duration.setValue(v, context));
    panel.row();
    const picks = panel.readout();
    stage.run(() => {
      const counts = counters.map((c) => c.count.getValue(context));
      picks.textContent = `picks per lamp (CallCounter.count): ${counts.join(' · ')}`;
    });
  } else {
    stage.run(() => (camera.alpha += 0.002));
  }

  return () => {
    coordinator.dispose();
    stage.dispose();
  };
};

export default mount;
