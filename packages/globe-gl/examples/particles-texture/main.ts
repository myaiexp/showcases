// Particles: particlesTexture paints each particle with a Three.js texture
import { CanvasTexture } from 'three';
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { near, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

/** A 64px sprite drawn in code: a soft glow or a five-point star. */
function sprite(kind: 'glow' | 'star', color: string): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  if (kind === 'glow') {
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.25, color);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
  } else {
    g.fillStyle = color;
    g.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 30 : 12;
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      g.lineTo(32 + r * Math.cos(a), 32 + r * Math.sin(a));
    }
    g.closePath();
    g.fill();
  }
  return new CanvasTexture(c);
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One set of glowing dots and one of stars, both drawn on a canvas. A texture replaces particlesColor.' });
  const dark = await texture('dark');

  const rand = rng(41);
  const glow = sprite('glow', '#ffb347');
  const star = sprite('star', '#ffe27a');
  const sets = [
    { texture: glow, size: 5, list: Array.from({ length: 180 }, () => near(rand, 25, 30, 40)) },
    { texture: star, size: 4, list: Array.from({ length: 120 }, () => near(rand, -15, 120, 40)) },
  ];

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .particlesData(sets)
    .particlesList('list')
    .particlesSize('size')
    .particlesTexture('texture')
    // Ignored while a texture is set.
    .particlesColor(() => 'white');
  stage.onDispose(() => {
    glow.dispose();
    star.dispose();
  });

  globe.pointOfView({ lat: 10, lng: 70, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.9;

  return stage.dispose;
};

export default mount;
