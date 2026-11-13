// Builds the little building, door hinge and spot lights the sequence performs on
import { Color3, HemisphericLight, MeshBuilder, SpotLight, StandardMaterial, TransformNode, Vector3 } from '@babylonjs/core';
import type { Mesh, Scene } from '@babylonjs/core';

export function buildRoom(scene: Scene): { hinge: TransformNode; spots: SpotLight[] } {
  const ambient = new HemisphericLight('ambient', new Vector3(0, 1, 0), scene);
  ambient.intensity = 0.25;
  const ground = MeshBuilder.CreateGround('ground', { width: 60, height: 60 }, scene);
  const groundMat = new StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new Color3(0.25, 0.35, 0.25);
  groundMat.specularColor = Color3.Black();
  ground.material = groundMat;

  const wallMat = new StandardMaterial('wallMat', scene);
  wallMat.diffuseColor = new Color3(0.85, 0.8, 0.7);
  wallMat.backFaceCulling = false;
  const wall = (name: string, w: number, h: number, d: number, x: number, y: number, z: number): Mesh => {
    const m = MeshBuilder.CreateBox(name, { width: w, height: h, depth: d }, scene);
    m.position.set(x, y, z);
    m.material = wallMat;
    return m;
  };
  // 10 wide, 10 deep, 4 tall; the front wall (z = 0) has a 2 wide, 3 tall doorway.
  wall('back', 10, 4, 0.3, 0, 2, 10);
  wall('left', 0.3, 4, 10, -5, 2, 5);
  wall('right', 0.3, 4, 10, 5, 2, 5);
  wall('frontLeft', 4, 4, 0.3, -3, 2, 0);
  wall('frontRight', 4, 4, 0.3, 3, 2, 0);
  wall('lintel', 2, 1, 0.3, 0, 3.5, 0);
  wall('ceiling', 10, 0.3, 10, 0, 4.15, 5);

  // The door is a child of a hinge node on its right-hand edge, so rotating the hinge swings it.
  const hinge = new TransformNode('hinge', scene);
  hinge.position.set(1, 0, 0);
  const door = MeshBuilder.CreateBox('door', { width: 2, height: 3, depth: 0.15 }, scene);
  const doorMat = new StandardMaterial('doorMat', scene);
  doorMat.diffuseColor = new Color3(0.45, 0.28, 0.14);
  door.material = doorMat;
  door.parent = hinge;
  door.position.set(-1, 1.5, 0);

  const spots: SpotLight[] = [];
  for (const x of [-2.5, 2.5]) {
    const spot = new SpotLight(`spot${x}`, new Vector3(x, 3.6, 6), new Vector3(0, -1, 0), Math.PI / 1.6, 1, scene);
    spot.intensity = 0;
    spots.push(spot);
    const bulb = MeshBuilder.CreateSphere(`bulb${x}`, { diameter: 0.3 }, scene);
    bulb.position.copyFrom(spot.position);
    const bulbMat = new StandardMaterial(`bulbMat${x}`, scene);
    bulbMat.emissiveColor = new Color3(1, 0.9, 0.6);
    bulb.material = bulbMat;
  }
  return { hinge, spots };
}
