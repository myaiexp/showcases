// In-memory default-environment textures: a gradient sky cube, a ground disc
import { CubeTexture, DynamicTexture, Texture } from '@babylonjs/core';
import type { Scene } from '@babylonjs/core';

/** Six canvas faces (+x -x +y -y +z -z) of a horizon-to-zenith gradient, as a CubeTexture. */
export function createSkyCube(scene: Scene): CubeTexture {
  const faces: string[] = [];
  for (const face of ['px', 'nx', 'py', 'ny', 'pz', 'nz']) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d')!;
    const gradient = g.createLinearGradient(0, 0, 0, 128);
    if (face === 'py') {
      gradient.addColorStop(0, '#26407a');
      gradient.addColorStop(1, '#26407a');
    } else if (face === 'ny') {
      gradient.addColorStop(0, '#9aa5b8');
      gradient.addColorStop(1, '#9aa5b8');
    } else {
      gradient.addColorStop(0, '#3c64b4');
      gradient.addColorStop(0.7, '#a9c7ea');
      gradient.addColorStop(1, '#e8d9c0');
    }
    g.fillStyle = gradient;
    g.fillRect(0, 0, 128, 128);
    faces.push(c.toDataURL('image/png'));
  }
  const cube = CubeTexture.CreateFromImages(faces, scene);
  cube.coordinatesMode = Texture.SKYBOX_MODE;
  return cube;
}

/** A radial fade from solid to transparent, which the ground uses for its soft edge. */
export function createGroundFade(scene: Scene): DynamicTexture {
  const tex = new DynamicTexture('ground-fade', 256, scene, true);
  const g = tex.getContext() as CanvasRenderingContext2D;
  const radial = g.createRadialGradient(128, 128, 20, 128, 128, 128);
  radial.addColorStop(0, 'rgba(255,255,255,1)');
  radial.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = radial;
  g.fillRect(0, 0, 256, 256);
  tex.update();
  tex.hasAlpha = true;
  return tex;
}
