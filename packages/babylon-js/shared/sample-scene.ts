// A small lit scene of coloured shapes for examples about rendering, not content
import {
  ArcRotateCamera,
  Color3,
  DirectionalLight,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
  type Mesh,
  type Scene,
} from '@babylonjs/core';

export interface SampleScene {
  camera: ArcRotateCamera;
  meshes: Mesh[];
  /** Spins the shapes; call once per frame. */
  animate(): void;
}

/**
 * A ground, a ring of six coloured shapes around a bright centre sphere, a hemispheric
 * and a directional light, and an ArcRotateCamera aimed at the middle (controls attached
 * outside previews). Emissive highlights give glow and bloom effects something to catch.
 */
export function createSampleScene(scene: Scene, canvas: HTMLCanvasElement, preview: boolean): SampleScene {
  const camera = new ArcRotateCamera('camera', -Math.PI / 2.4, 1.1, 13, new Vector3(0, 1, 0), scene);
  if (!preview) camera.attachControl(canvas, true);
  new HemisphericLight('sky', new Vector3(0, 1, 0), scene).intensity = 0.5;
  const sun = new DirectionalLight('sun', new Vector3(-1, -2, 1), scene);
  sun.intensity = 0.8;

  const ground = MeshBuilder.CreateGround('ground', { width: 16, height: 16 }, scene);
  const groundMat = new StandardMaterial('ground', scene);
  groundMat.diffuseColor = new Color3(0.25, 0.27, 0.32);
  groundMat.specularColor = Color3.Black();
  ground.material = groundMat;

  const makers = [
    () => MeshBuilder.CreateBox('box', { size: 1.4 }, scene),
    () => MeshBuilder.CreateTorus('torus', { diameter: 1.6, thickness: 0.45 }, scene),
    () => MeshBuilder.CreateCylinder('cylinder', { diameter: 1.2, height: 1.6 }, scene),
    () => MeshBuilder.CreateTorusKnot('knot', { radius: 0.6, tube: 0.22, radialSegments: 96 }, scene),
    () => MeshBuilder.CreatePolyhedron('poly', { type: 2, size: 0.8 }, scene),
    () => MeshBuilder.CreateCapsule('capsule', { radius: 0.5, height: 1.8 }, scene),
  ];
  const meshes: Mesh[] = makers.map((make, i) => {
    const mesh = make();
    const a = (i / makers.length) * Math.PI * 2;
    mesh.position.set(Math.cos(a) * 4, 1, Math.sin(a) * 4);
    const mat = new StandardMaterial(`mat${i}`, scene);
    mat.diffuseColor = Color3.FromHSV(i * 60, 0.75, 0.95);
    mat.specularColor = new Color3(0.4, 0.4, 0.4);
    mesh.material = mat;
    return mesh;
  });
  const core = MeshBuilder.CreateSphere('core', { diameter: 1.6, segments: 32 }, scene);
  core.position.y = 1.2;
  const coreMat = new StandardMaterial('core', scene);
  coreMat.emissiveColor = new Color3(1, 0.85, 0.5);
  core.material = coreMat;
  meshes.push(core, ground);

  return {
    camera,
    meshes,
    animate() {
      const dt = scene.getEngine().getDeltaTime() / 1000;
      for (const m of meshes.slice(0, makers.length)) {
        m.rotation.y += dt * 0.8;
        m.rotation.x += dt * 0.3;
      }
      if (preview) camera.alpha += dt * 0.15;
    },
  };
}
