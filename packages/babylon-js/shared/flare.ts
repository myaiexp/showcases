// A soft round flare texture, drawn on a canvas and loaded from a data URL
import { Texture } from '@babylonjs/core';
import type { Scene } from '@babylonjs/core';

/**
 * Every END sub-emitter spawn clones the burst system, and ParticleSystem.clone() clones
 * its particleTexture. DynamicTexture.clone() returns a fresh, empty canvas, so a
 * DynamicTexture flare would make every burst invisible. A Texture made from a data URL
 * clones by reloading the same URL, so each burst keeps the flare (no network involved).
 */
export function createFlareTexture(scene: Scene, size = 64): Texture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d')!;
  const half = size / 2;
  const glow = g.createRadialGradient(half, half, 0, half, half, half);
  glow.addColorStop(0, 'rgba(255,255,255,1)');
  glow.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = glow;
  g.fillRect(0, 0, size, size);
  const texture = new Texture(canvas.toDataURL('image/png'), scene);
  texture.hasAlpha = true;
  return texture;
}
