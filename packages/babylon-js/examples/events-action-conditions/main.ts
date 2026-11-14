// ActionManager conditions and then() chains on a door
import {
  Action,
  ActionEvent,
  ActionManager,
  ArcRotateCamera,
  Color3,
  ExecuteCodeAction,
  HemisphericLight,
  InterpolateValueAction,
  MeshBuilder,
  PredicateCondition,
  SetValueAction,
  StandardMaterial,
  StateCondition,
  TransformNode,
  ValueCondition,
  Vector3,
} from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene } = stage;

  new ArcRotateCamera('camera', -Math.PI / 2 - 0.35, 1.15, 11, new Vector3(0, 1.2, 0), scene);
  const light = new HemisphericLight('light', new Vector3(0.3, 1, -0.3), scene);
  light.intensity = 0.95;
  scene.clearColor.set(0.08, 0.09, 0.12, 1);
  const floor = MeshBuilder.CreateGround('floor', { width: 16, height: 8 }, scene);
  const floorMat = new StandardMaterial('floor-mat', scene);
  floorMat.diffuseColor = new Color3(0.16, 0.18, 0.25);
  floor.material = floorMat;
  const paint = (m: Mesh, hex: string): StandardMaterial => {
    const mat = new StandardMaterial(`${m.name}-mat`, scene);
    mat.diffuseColor = Color3.FromHexString(hex);
    m.material = mat;
    return mat;
  };

  // The door hangs from a pivot node so rotation.y swings it about its edge.
  const pivot = new TransformNode('door-pivot', scene);
  pivot.position.set(-1.5, 0, 0);
  const door = MeshBuilder.CreateBox('door', { width: 3, height: 3, depth: 0.2 }, scene);
  door.parent = pivot;
  door.position.set(1.5, 1.5, 0);
  paint(door, '#e0af68');
  const frame = MeshBuilder.CreateBox('frame', { width: 3.6, height: 3.4, depth: 0.1 }, scene);
  frame.position.set(0, 1.7, 0.3);
  paint(frame, '#2a2f45');

  // A key, a lamp and a gauge.
  const key = MeshBuilder.CreateSphere('key', { diameter: 0.9, segments: 14 }, scene);
  key.position.set(-5, 0.5, -1);
  const keyMat = paint(key, '#f7768e');
  const lamp = MeshBuilder.CreateSphere('lamp', { diameter: 1 }, scene);
  lamp.position.set(4.5, 2.6, 0);
  const lampMat = paint(lamp, '#3b4261');
  const button = MeshBuilder.CreateCylinder('lamp-button', { height: 0.4, diameter: 1.1 }, scene);
  button.position.set(4.5, 0.2, -1);
  paint(button, '#7dcfff');

  // A free-form "state" property that StateCondition reads.
  const doorState = door as unknown as { state: string };
  doorState.state = 'locked';
  let doorLine: HTMLElement | undefined;
  const say = (text: string): void => {
    if (doorLine) doorLine.textContent = text;
  };

  // The key: unlock the door (SetValueAction on the state), glow, and remember it.
  key.actionManager = new ActionManager(scene);
  key.actionManager.registerAction(new SetValueAction(ActionManager.OnPickTrigger, doorState, 'state', 'unlocked'));
  key.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPickTrigger, keyMat, 'diffuseColor', Color3.FromHexString('#9ece6a'), 300));
  key.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, () => say('door.state = "unlocked"')));

  // The door: the condition is the last constructor argument. When it is false the trigger does nothing.
  const doorActions = new ActionManager(scene);
  door.actionManager = doorActions;
  const unlocked = new StateCondition(doorActions, doorState, 'unlocked');
  const open = doorActions.registerAction(new InterpolateValueAction(ActionManager.OnPickTrigger, pivot, 'rotation.y', -1.7, 700, unlocked)) as Action;
  // then(): the next pick runs the following action, and so on round the chain.
  open.then(new InterpolateValueAction(ActionManager.NothingTrigger, pivot, 'rotation.y', 0, 700));
  doorActions.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, () => say(doorState.state === 'unlocked' ? 'door picked: unlocked, so it swings' : 'door picked: locked, the condition is false')));

  // The lamp button: a PredicateCondition on the door angle lights the lamp, a ValueCondition
  // (door.state equals 'unlocked') makes it swell.
  const buttonActions = new ActionManager(scene);
  button.actionManager = buttonActions;
  const doorIsOpen = new PredicateCondition(buttonActions, () => pivot.rotation.y < -1);
  const keyUsed = new ValueCondition(buttonActions, doorState, 'state', 'unlocked', ValueCondition.IsEqual);
  buttonActions.registerAction(new InterpolateValueAction(ActionManager.OnPickTrigger, lampMat, 'emissiveColor', new Color3(1, 0.9, 0.3), 300, doorIsOpen));
  buttonActions.registerAction(new InterpolateValueAction(ActionManager.OnPickTrigger, lamp, 'scaling', new Vector3(1.5, 1.5, 1.5), 300, keyUsed));

  const pickMesh = (mesh: Mesh): void => mesh.actionManager?.processTrigger(ActionManager.OnPickTrigger, ActionEvent.CreateNew(mesh));
  // Reset to the locked, closed state.
  const reset = (): void => {
    doorState.state = 'locked';
    pivot.rotation.y = 0;
    keyMat.diffuseColor = Color3.FromHexString('#f7768e');
    lampMat.emissiveColor = new Color3(0, 0, 0);
    lamp.scaling.setAll(1);
    say('reset: door locked and closed');
  };

  // Cards (and the Replay button) run a scripted sequence of picks.
  let timers: ReturnType<typeof setTimeout>[] = [];
  const script = (): void => {
    for (const t of timers) clearTimeout(t);
    timers = [];
    reset();
    const steps: [number, () => void][] = [
      [600, () => pickMesh(door)], // locked: nothing happens
      [1600, () => pickMesh(key)], // sets the state
      [2600, () => pickMesh(door)], // opens
      [3600, () => pickMesh(button)], // lamp lights because the door is open
      [4600, () => pickMesh(door)], // chained action closes it
      [6000, script],
    ];
    for (const [at, fn] of steps) timers.push(setTimeout(fn, at));
  };

  if (ctx.preview) script();
  else {
    const panel = createPanel(el);
    doorLine = panel.readout('Click the door first: it is locked, so the condition blocks it. Then the red key, then the door, then the blue button.');
    panel.row();
    panel.button('Reset', reset);
    panel.button('Replay a scripted run', script);
  }

  stage.run();
  return () => {
    for (const t of timers) clearTimeout(t);
    stage.dispose();
  };
};

export default mount;
