// PhysicsHelper radial explosion and gravitational field
import {
  Color3,
  MeshBuilder,
  PhysicsBody,
  PhysicsHelper,
  PhysicsMotionType,
  PhysicsRadialImpulseFalloff,
  PhysicsShapeBox,
  Quaternion,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { radius: 20, beta: 1.15, target: new Vector3(0, 2, 0) } });
  const { scene } = ps;
  staticFloor(scene, 40, 20);

  const shape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(1, 1, 1), scene);
  let boxes: Mesh[] = [];
  const build = (): void => {
    for (const b of boxes) b.dispose();
    boxes = [];
    const rows = ctx.preview ? 4 : 5;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < rows - r; c++) {
        const box = MeshBuilder.CreateBox('crate', { size: 1 }, scene);
        box.position.set((c - (rows - r - 1) / 2) * 1.05, 0.5 + r * 1.02, 0);
        paint(box, r % 2 ? '#e0af68' : '#bb9af7');
        const body = new PhysicsBody(box, PhysicsMotionType.DYNAMIC, false, scene);
        body.shape = shape;
        body.setMassProperties({ mass: 1 });
        boxes.push(box);
      }
    }
  };
  build();

  // The helper works on every body of the scene's physics world.
  const helper = new PhysicsHelper(scene);
  const origin = new Vector3(0, 0.3, 0);
  let radius = 8;
  let strength = 25;
  let falloff = PhysicsRadialImpulseFalloff.Linear;

  const flash = MeshBuilder.CreateSphere('blast-ring', { diameter: 2, segments: 16 }, scene);
  const flashMat = new StandardMaterial('blast-mat', scene);
  flashMat.emissiveColor = new Color3(1, 0.6, 0.2);
  flashMat.disableLighting = true;
  flashMat.alpha = 0;
  flash.material = flashMat;
  flash.position.copyFrom(origin);
  let flashAge = 1;

  const explode = (): void => {
    // A one-shot impulse: strength falls off with distance from the origin when Linear.
    const event = helper.applyRadialExplosionImpulse(origin, radius, strength, falloff);
    event?.dispose();
    flashAge = 0;
  };
  let well: ReturnType<PhysicsHelper['gravitationalField']> = null;
  const wellOn = (): void => {
    // A field acts every frame while enabled and pulls bodies towards its origin.
    well ??= helper.gravitationalField(new Vector3(0, 1, 0), radius + 4, strength * 0.5, PhysicsRadialImpulseFalloff.Constant);
    well?.enable();
  };
  const wellOff = (): void => well?.disable();
  ps.onDispose(() => {
    well?.dispose();
    well = null;
  });

  // Auto-play: explode, rebuild, pull, release, repeat.
  let step = 0;
  const cycle = (): void => {
    const s = step++ % 4;
    if (s === 0) build();
    else if (s === 1) explode();
    else if (s === 2) wellOn();
    else wellOff();
  };
  cycle();
  const timer = setInterval(cycle, ctx.preview ? 1800 : 2600);
  ps.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.button('Rebuild pyramid', build);
    panel.button('Explode', explode);
    panel.button('Gravity well on', wellOn);
    panel.button('Gravity well off', wellOff);
    panel.row();
    panel.slider('Radius', 2, 14, 1, radius, (v) => (radius = v));
    panel.slider('Strength', 5, 60, 1, strength, (v) => (strength = v));
    panel.select('Falloff', ['Linear', 'Constant'] as const, 'Linear', (v) => (falloff = PhysicsRadialImpulseFalloff[v]));
    panel.row();
    panel.readout('The auto-play cycles: rebuild, applyRadialExplosionImpulse, gravitationalField on, off.');
  }

  ps.stage.run(() => {
    if (flashAge < 1) {
      flashAge = Math.min(1, flashAge + ps.stage.engine.getDeltaTime() / 500);
      flash.scaling.setAll(0.2 + flashAge * radius);
      flashMat.alpha = 0.5 * (1 - flashAge);
    }
  });
  return () => ps.dispose();
};

export default mount;
