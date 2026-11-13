// Builds a merged house of width 1 (detached) or 2 (semi-detached) from a generated texture
import { Color3, DynamicTexture, Mesh, MeshBuilder, StandardMaterial, Vector4 } from '@babylonjs/core';
import type { Scene } from '@babylonjs/core';

export function createHouse(scene: Scene, width: 1 | 2): Mesh {
  const tex = new DynamicTexture('wallTex', { width: 512, height: 128 }, scene);
  const g = tex.getContext() as CanvasRenderingContext2D;
  for (let i = 0; i < 4; i++) {
    g.fillStyle = i % 2 ? '#d9c79a' : '#ecdcb8';
    g.fillRect(i * 128, 0, 128, 128);
    g.fillStyle = '#8fc4e8';
    g.fillRect(i * 128 + 44, 36, 40, 40);
  }
  g.fillStyle = '#6b4a2b';
  g.fillRect(14, 50, 34, 78); // the front door
  tex.update();

  const wall = new StandardMaterial('wall', scene);
  wall.diffuseTexture = tex;
  const roofMat = new StandardMaterial('roof', scene);
  roofMat.diffuseColor = new Color3(0.55, 0.2, 0.15);

  const faceUV = [
    new Vector4(0.5, 0, 0.75, 1),
    new Vector4(0, 0, 0.25, 1),
    new Vector4(0.25, 0, 0.5, 1),
    new Vector4(0.75, 0, 1, 1),
  ];
  const box = MeshBuilder.CreateBox('box', { width, faceUV, wrap: true }, scene);
  box.material = wall;
  box.position.y = 0.5;
  const roof = MeshBuilder.CreateCylinder('roofMesh', { diameter: 1.3, height: 1.2 * width, tessellation: 3 }, scene);
  roof.material = roofMat;
  roof.scaling.x = 0.75;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;
  const house = Mesh.MergeMeshes([box, roof], true, false, undefined, false, true)!;
  house.name = `house${width}`;
  return house;
}
