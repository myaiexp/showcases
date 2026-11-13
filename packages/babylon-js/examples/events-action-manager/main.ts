// ActionManager triggers and actions on a row of meshes
import {
  ActionEvent,
  ActionManager,
  Color3,
  CombineAction,
  ExecuteCodeAction,
  FreeCamera,
  HemisphericLight,
  IncrementValueAction,
  InterpolateValueAction,
  MeshBuilder,
  SetValueAction,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  canvas.tabIndex = 0;

  const camera = new FreeCamera('camera', new Vector3(0, 3.2, -9.5), scene);
  camera.setTarget(new Vector3(0, 0.8, 0));
  const light = new HemisphericLight('light', new Vector3(0.3, 1, -0.3), scene);
  light.intensity = 0.95;
  scene.clearColor.set(0.08, 0.09, 0.12, 1);
  const floor = MeshBuilder.CreateGround('floor', { width: 16, height: 6 }, scene);
  const floorMat = new StandardMaterial('floor-mat', scene);
  floorMat.diffuseColor = new Color3(0.16, 0.18, 0.25);
  floor.material = floorMat;

  const solid = (mesh: Mesh, hex: string): StandardMaterial => {
    const m = new StandardMaterial(`${mesh.name}-mat`, scene);
    m.diffuseColor = Color3.FromHexString(hex);
    mesh.material = m;
    return m;
  };

  // A scene-level manager for scene triggers (every frame, keys); meshes get their own for pointer triggers.
  scene.actionManager = new ActionManager(scene);

  // 1. Spinner: OnEveryFrameTrigger + IncrementValueAction adds to a property path each frame.
  const spinner = MeshBuilder.CreateBox('spinner', { size: 1.3 }, scene);
  spinner.position.set(-6, 0.8, 0);
  solid(spinner, '#bb9af7');
  scene.actionManager.registerAction(new IncrementValueAction(ActionManager.OnEveryFrameTrigger, spinner, 'rotation.y', 0.03));
  scene.actionManager.registerAction(new IncrementValueAction(ActionManager.OnEveryFrameTrigger, spinner, 'rotation.x', 0.011));

  // 2. Hover: pointer over and out interpolate the scaling vector and the colour.
  const hover = MeshBuilder.CreateSphere('hover', { diameter: 1.5, segments: 20 }, scene);
  hover.position.set(-2, 0.8, 0);
  const hoverMat = solid(hover, '#7dcfff');
  hover.actionManager = new ActionManager(scene);
  hover.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPointerOverTrigger, hover, 'scaling', new Vector3(1.4, 1.4, 1.4), 250));
  hover.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPointerOverTrigger, hoverMat, 'diffuseColor', Color3.FromHexString('#f7768e'), 250));
  hover.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPointerOutTrigger, hover, 'scaling', new Vector3(1, 1, 1), 250));
  hover.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPointerOutTrigger, hoverMat, 'diffuseColor', Color3.FromHexString('#7dcfff'), 250));

  // 3. Pick: CombineAction runs its children together; the chained action undoes it on the next pick.
  const pick = MeshBuilder.CreateCylinder('pick', { height: 1.4, diameter: 1.4 }, scene);
  pick.position.set(2, 0.7, 0);
  const pickMat = solid(pick, '#9ece6a');
  pick.actionManager = new ActionManager(scene);
  const lift = new CombineAction(ActionManager.OnPickTrigger, [
    new InterpolateValueAction(ActionManager.NothingTrigger, pick, 'position.y', 2.2, 500),
    new SetValueAction(ActionManager.NothingTrigger, pickMat, 'diffuseColor', Color3.FromHexString('#e0af68')),
  ]);
  pick.actionManager.registerAction(lift);
  lift.then(
    new CombineAction(ActionManager.NothingTrigger, [
      new InterpolateValueAction(ActionManager.NothingTrigger, pick, 'position.y', 0.7, 500),
      new SetValueAction(ActionManager.NothingTrigger, pickMat, 'diffuseColor', Color3.FromHexString('#9ece6a')),
    ]),
  );

  // 4. Intersection: a patrolling ball lights a pad while it overlaps it (a trigger with a parameter mesh).
  const pad = MeshBuilder.CreateBox('pad', { width: 1.8, height: 0.1, depth: 1.8 }, scene);
  pad.position.set(6, 0.05, 0);
  const padMat = solid(pad, '#565f89');
  const ball = MeshBuilder.CreateSphere('patrol', { diameter: 1 }, scene);
  ball.position.set(3.8, 0.55, 0);
  solid(ball, '#ff9e64');
  ball.actionManager = new ActionManager(scene);
  ball.actionManager.registerAction(new SetValueAction({ trigger: ActionManager.OnIntersectionEnterTrigger, parameter: pad }, padMat, 'emissiveColor', new Color3(0.2, 0.9, 0.4)));
  ball.actionManager.registerAction(new SetValueAction({ trigger: ActionManager.OnIntersectionExitTrigger, parameter: pad }, padMat, 'emissiveColor', new Color3(0, 0, 0)));
  let t = 0;
  scene.onBeforeRenderObservable.add(() => {
    t += stage.engine.getDeltaTime() / 1000;
    ball.position.x = 5 + Math.sin(t * 1.3) * 2.4;
  });

  // Keys: a scene trigger with a string parameter compared with the key.
  const flashKey = (hex: string) => (): void => void (spinner.material as StandardMaterial).diffuseColor.copyFrom(Color3.FromHexString(hex));
  for (const [key, hex] of [['r', '#f7768e'], ['g', '#9ece6a'], ['b', '#7dcfff']] as const) {
    scene.actionManager.registerAction(new ExecuteCodeAction({ trigger: ActionManager.OnKeyUpTrigger, parameter: key }, flashKey(hex)));
  }

  // Cards take no pointer input, so they raise the same triggers by hand.
  const fire = (mesh: Mesh, trigger: number): void => mesh.actionManager?.processTrigger(trigger, ActionEvent.CreateNew(mesh));
  let step = 0;
  const timer = ctx.preview
    ? setInterval(() => {
        const s = step++ % 6;
        if (s === 0) fire(hover, ActionManager.OnPointerOverTrigger);
        if (s === 2) fire(hover, ActionManager.OnPointerOutTrigger);
        if (s === 1 || s === 4) fire(pick, ActionManager.OnPickTrigger);
      }, 900)
    : undefined;

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout('Move over the sphere, click the cylinder (it lifts, the next click lowers it). Click the canvas, then press R, G or B to recolor the spinner.');
  }

  stage.run();
  return () => {
    if (timer) clearInterval(timer);
    stage.dispose();
  };
};

export default mount;
