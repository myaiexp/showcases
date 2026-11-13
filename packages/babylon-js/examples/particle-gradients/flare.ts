// A soft round flare drawn into a DynamicTexture, so particles need no image file
import { DynamicTexture } from '@babylonjs/core';
import type { Scene } from '@babylonjs/core';

export function createFlareTexture(scene: Scene, size = 64): DynamicTexture {
  const texture = new DynamicTexture('flare', size, scene);
  const g = texture.getContext();
  const half = size / 2;
  const glow = g.createRadialGradient(half, half, 0, half, half, half);
  glow.addColorStop(0, 'rgba(255,255,255,1)');
  glow.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = glow;
  g.fillRect(0, 0, size, size);
  texture.hasAlpha = true;
  texture.update();
  return texture;
}
