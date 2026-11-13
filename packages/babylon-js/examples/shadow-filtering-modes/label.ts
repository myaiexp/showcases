// A floating text label on a plane whose text can be redrawn
import { Color3, DynamicTexture, MeshBuilder, StandardMaterial } from '@babylonjs/core';
import type { Mesh, Scene } from '@babylonjs/core';

export function makeChangingLabel(scene: Scene, width: number): { mesh: Mesh; set(text: string): void } {
  const mesh = MeshBuilder.CreatePlane('modeLabel', { width, height: width / 8 }, scene);
  const tex = new DynamicTexture('modeLabelTex', { width: 1024, height: 128 }, scene);
  tex.hasAlpha = true;
  const mat = new StandardMaterial('modeLabelMat', scene);
  mat.diffuseTexture = tex;
  mat.useAlphaFromDiffuseTexture = true;
  mat.emissiveColor = Color3.White();
  mat.disableLighting = true;
  mesh.material = mat;
  return {
    mesh,
    set(text) {
      const g = tex.getContext() as CanvasRenderingContext2D;
      g.clearRect(0, 0, 1024, 128);
      g.fillStyle = '#ffffff';
      g.font = 'bold 80px sans-serif';
      g.textAlign = 'center';
      g.fillText(text, 512, 92);
      tex.update();
    },
  };
}
