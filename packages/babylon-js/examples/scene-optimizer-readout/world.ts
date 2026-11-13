// A deliberately heavy little world for the optimizer to work on
import { Color3, Color4, DirectionalLight, DynamicTexture, FxaaPostProcess, MeshBuilder, ParticleSystem, ShadowGenerator, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { ArcRotateCamera, Mesh, Scene } from '@babylonjs/core';

export interface World {
  /** Spins the cubes; call once per frame with the elapsed seconds. */
  update(seconds: number): void;
  dispose(): void;
}

/** Builds the world into `scene`; the optimizer's changes (shadows, particles, scaling) all show here. */
export function buildWorld(scene: Scene, camera: ArcRotateCamera): World {
  scene.clearColor = new Color4(0.05, 0.07, 0.14, 1);
  const sun = new DirectionalLight('sun', new Vector3(-1, -2, -1), scene);
  sun.position = new Vector3(8, 14, 8);
  const shadows = new ShadowGenerator(1024, sun);
  shadows.useBlurExponentialShadowMap = true;

  const ground = MeshBuilder.CreateGround('ground', { width: 16, height: 16 }, scene);
  const groundMat = new StandardMaterial('ground-mat', scene);
  groundMat.diffuseColor = new Color3(0.3, 0.35, 0.4);
  ground.material = groundMat;
  ground.receiveShadows = true;

  // Twenty separate cubes sharing a material: MergeMeshesOptimization can merge them.
  const cubeMat = new StandardMaterial('cube-mat', scene);
  cubeMat.diffuseColor = new Color3(0.9, 0.55, 0.25);
  const cubes: Mesh[] = [];
  for (let i = 0; i < 20; i++) {
    const cube = MeshBuilder.CreateBox(`cube${i}`, { size: 1 }, scene);
    const a = (i / 20) * Math.PI * 2;
    cube.position.set(Math.cos(a) * 4.5, 0.6, Math.sin(a) * 4.5);
    cube.material = cubeMat;
    shadows.addShadowCaster(cube);
    cubes.push(cube);
  }

  const dot = new DynamicTexture('dot', 64, scene, false);
  const g = dot.getContext() as CanvasRenderingContext2D;
  const glow = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  glow.addColorStop(0, 'rgba(255,255,255,1)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = glow;
  g.fillRect(0, 0, 64, 64);
  dot.update();
  dot.hasAlpha = true;
  const sparks = new ParticleSystem('sparks', 600, scene);
  sparks.particleTexture = dot;
  sparks.emitter = new Vector3(0, 0.5, 0);
  sparks.minEmitBox = new Vector3(-0.5, 0, -0.5);
  sparks.maxEmitBox = new Vector3(0.5, 0, 0.5);
  sparks.color1 = new Color4(1, 0.8, 0.3, 1);
  sparks.color2 = new Color4(1, 0.3, 0.1, 1);
  sparks.minSize = 0.15;
  sparks.maxSize = 0.4;
  sparks.minLifeTime = 1;
  sparks.maxLifeTime = 2.4;
  sparks.emitRate = 250;
  sparks.direction1 = new Vector3(-0.5, 3, -0.5);
  sparks.direction2 = new Vector3(0.5, 4, 0.5);
  sparks.blendMode = ParticleSystem.BLENDMODE_ADD;
  sparks.start();

  // PostProcessesOptimization turns post processes off.
  const fxaa = new FxaaPostProcess('fxaa', 1, camera);

  return {
    update(seconds) {
      cubes.forEach((c, i) => (c.rotation.y = seconds * (0.4 + (i % 5) * 0.15)));
    },
    dispose() {
      sparks.dispose();
      fxaa.dispose(camera);
      shadows.dispose();
      sun.dispose();
      for (const m of [...scene.meshes]) m.dispose();
      dot.dispose();
    },
  };
}
