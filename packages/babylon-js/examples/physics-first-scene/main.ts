// The docs' first physics scene: Havok, a falling sphere and a static ground, as aggregates
import {
  FreeCamera,
  HavokPlugin,
  HemisphericLight,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { loadHavok } from '../../shared/havok.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  // Havok is WebAssembly: initialize it before the plugin can use it.
  const havok = await loadHavok();
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  if (!ctx.preview) camera.attachControl(canvas, true);
  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  const ground = MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);

  // Enable physics with a gravity vector and the Havok plugin.
  scene.enablePhysics(new Vector3(0, -9.8, 0), new HavokPlugin(true, havok));

  // A static box shape for the ground: mass 0 means it never moves.
  new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0 }, scene);

  // Each new sphere gets a sphere shape and a dynamic body, sized from the mesh.
  const balls: { aggregate: PhysicsAggregate }[] = [];
  const drop = (): void => {
    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene);
    sphere.position.set((Math.random() - 0.5) * 2, 6, (Math.random() - 0.5) * 2);
    const aggregate = new PhysicsAggregate(sphere, PhysicsShapeType.SPHERE, { mass: 1, restitution: 0.75 }, scene);
    balls.push({ aggregate });
    // Keep the scene small: the oldest sphere goes once there are four.
    if (balls.length > 4) {
      const old = balls.shift()!;
      old.aggregate.transformNode.dispose();
      old.aggregate.dispose();
    }
  };
  drop();
  const timer = setInterval(drop, 2500);

  stage.run();
  return () => {
    clearInterval(timer);
    stage.dispose();
  };
};

export default mount;
