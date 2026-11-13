// A text label on a plane, drawn into a DynamicTexture
import { Color3, DynamicTexture, MeshBuilder, StandardMaterial } from '@babylonjs/core';
import type { Mesh, Scene } from '@babylonjs/core';

export function makeLabel(scene: Scene, text: string, width = 4): Mesh {
  const plane = MeshBuilder.CreatePlane(`label-${text}`, { width, height: width / 6 }, scene);
  const tex = new DynamicTexture(`labelTex-${text}`, { width: 512, height: 85 }, scene);
  tex.hasAlpha = true;
  const g = tex.getContext() as CanvasRenderingContext2D;
  g.fillStyle = '#e8e8ee';
  g.font = 'bold 44px sans-serif';
  g.textAlign = 'center';
  g.fillText(text, 256, 58);
  tex.update();
  const mat = new StandardMaterial(`labelMat-${text}`, scene);
  mat.diffuseTexture = tex;
  mat.useAlphaFromDiffuseTexture = true;
  mat.emissiveColor = Color3.White();
  mat.disableLighting = true;
  plane.material = mat;
  return plane;
}
