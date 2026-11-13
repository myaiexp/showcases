// PixiPlugin: degrees, scaleX/skewX, directional rotation and CSS-style colours on Pixi v8 Graphics
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import * as PIXI from 'pixi.js';
import { btn, h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(PixiPlugin);
// Give the plugin the PIXI library object (registerPIXI docs: needed in a bundled project)
PixiPlugin.registerPIXI(PIXI);

const W = 480;
const H = 250;
const DEG = Math.PI / 180;

const mount: Mount = async (el, { preview, signal }) => {
  const app = new PIXI.Application();
  await app.init({ width: W, height: H, background: 0x1a1a1f, antialias: true });
  if (signal.aborted) {
    app.destroy(true, { children: true });
    return () => {};
  }
  app.canvas.classList.add('cv');
  el.append(app.canvas);

  // White shapes drawn around their own origin, so tint gives the colour and rotation spins in place.
  const square = (x: number, y: number): PIXI.Graphics => {
    const g = new PIXI.Graphics().roundRect(-26, -26, 52, 52, 8).fill(0xffffff).poly([8, -10, 22, 0, 8, 10]).fill(0x111111);
    g.position.set(x, y);
    app.stage.addChild(g);
    return g;
  };
  const shape = (g: PIXI.Graphics, x: number, y: number, tint: number): PIXI.Graphics => {
    g.position.set(x, y);
    g.tint = tint;
    app.stage.addChild(g);
    return g;
  };

  // Row 1: the same -170 degree target (starting from 170) with three directions
  const dirs = ['_short', '_cw', '_ccw'] as const;
  const spinners = dirs.map((d, i) => {
    const g = square(100 + i * 140, 75);
    g.tint = [0x0ae448, 0xff8709, 0x9d95ff][i] ?? 0xffffff;
    g.rotation = 170 * DEG; // Pixi rotation is radians; the plugin tweens in degrees
    return g;
  });
  // Row 2: relative hsl colour, scale + skew, and position + alpha + colour
  const circle = shape(new PIXI.Graphics().circle(0, 0, 32).fill(0xffffff), 100, 180, 0xff3b30);
  const star = shape(new PIXI.Graphics().star(0, 0, 5, 34, 16).fill(0xffffff), 240, 180, 0xffd60a);
  const pill = shape(new PIXI.Graphics().roundRect(-30, -14, 60, 28, 14).fill(0xffffff), 340, 180, 0x888888);

  const tweens: gsap.core.Tween[] = [];
  const ctx = gsap.context(() => {
    spinners.forEach((g, i) => {
      tweens.push(gsap.to(g, { pixi: { rotation: `-170${dirs[i]}` }, duration: 2.2, ease: 'power2.inOut', repeat: -1, yoyo: true, repeatDelay: 0.4 }));
    });
    // relative hsl: keep saturation and lightness, move the hue half-way round the wheel
    tweens.push(gsap.to(circle, { pixi: { tint: 'hsl(+=180, +=0%, +=0%)' }, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true }));
    tweens.push(gsap.to(star, { pixi: { scaleX: 1.5, scaleY: 0.8, skewX: 30, rotation: 60, tint: 'purple' }, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true }));
    tweens.push(gsap.to(pill, { pixi: { x: 400, alpha: 0.35, tint: '#00BAE2' }, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true }));
  }, el);

  if (!preview) {
    const caption = h('p', 'caption', 'Top: rotation from 170 to "-170_short", "-170_cw" and "-170_ccw" (degrees, not radians). Bottom: tint as "hsl(+=180, +=0%, +=0%)", scaleX/scaleY/skewX/rotation with "purple", and x/alpha with "#00BAE2".');
    const bar = h('div', 'controls');
    btn('Pause / resume', () => tweens.forEach((t) => t.paused(!t.paused())), bar);
    el.append(caption, bar);
  }

  return () => {
    ctx.revert();
    app.destroy(true, { children: true });
  };
};

export default mount;
