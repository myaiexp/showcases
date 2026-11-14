// VFX-JS example: a <canvas> is copied once; update(canvas) after each drawing
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 200;
  canvas.style.width = ctx.preview ? '200px' : '400px';
  canvas.style.borderRadius = '4px';
  const g = canvas.getContext('2d')!;
  const draw = (t: number): void => {
    g.fillStyle = '#10142c';
    g.fillRect(0, 0, 320, 200);
    for (let i = 0; i < 6; i++) {
      g.fillStyle = `hsl(${i * 60 + t * 40}, 85%, 60%)`;
      g.beginPath();
      g.arc(160 + Math.cos(t + i) * 110, 100 + Math.sin(t * 1.3 + i) * 60, 18, 0, Math.PI * 2);
      g.fill();
    }
  };
  draw(0);
  stage.root.append(canvas);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(canvas, { shader: 'halftone' });

  // The card alternates: three seconds with update(), three without.
  let live = true;
  if (stage.bar) checkbox(stage.bar, 'vfx.update(canvas) every frame', true, (v) => (live = v));
  stage.frame((t) => {
    if (ctx.preview) live = Math.floor(t / 3) % 2 === 0;
    draw(t);
    // A canvas is copied when added. After drawing on it, copy it again.
    if (live) void vfx.update(canvas);
    stage.say(live ? 'draw, then vfx.update(canvas)' : 'drawing without update: the texture keeps the last copy');
  });
  return () => stage.dispose();
};

export default mount;
