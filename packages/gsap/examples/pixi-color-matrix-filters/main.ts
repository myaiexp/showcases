// PixiPlugin filters: saturation, hue, brightness, colorize, contrast, blur and a custom ColorMatrixFilter on a Graphics picture
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import * as PIXI from 'pixi.js';
import { btn, h } from '../../shared/ui.ts';
import { makePicture } from './picture.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const COLS = 4;
const CELL_W = 120;
const CELL_H = 130;
const W = COLS * CELL_W;
const H = 2 * CELL_H;

const mount: Mount = async (el, { preview, signal }) => {
  const app = new PIXI.Application();
  await app.init({ width: W, height: H, background: 0x1a1a1f, antialias: true });
  if (signal.aborted) {
    app.destroy(true, { children: true });
    return () => {};
  }
  app.canvas.classList.add('cv');
  el.append(app.canvas);

  const names = ['saturation: 0', 'hue: 180', 'brightness: 2', 'colorize: red', 'contrast: 1.8', 'blurX / blurY', 'colorMatrixFilter (sepia)', 'sequence'];
  const tiles = names.map((name, i): PIXI.Container => {
    const pic = makePicture(PIXI);
    pic.position.set((i % COLS) * CELL_W + CELL_W / 2, Math.floor(i / COLS) * CELL_H + 52);
    app.stage.addChild(pic);
    if (!preview) {
      const label = new PIXI.Text({ text: name, style: { fill: 0xbbbaa6, fontSize: 11 } });
      label.anchor.set(0.5, 0);
      label.position.set(pic.x, pic.y + 54);
      app.stage.addChild(label);
    }
    return pic;
  });

  // A custom ColorMatrixFilter that is already sepia: PixiPlugin tweens the picture's own filter toward its matrix.
  const sepia = new PIXI.ColorMatrixFilter();
  sepia.sepia(false);

  const tweens: gsap.core.Animation[] = [];
  const ctx = gsap.context(() => {
    const opts = { duration: 1.6, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: 0.3 };
    const go = (i: number, pixi: Record<string, unknown>): void => {
      tweens.push(gsap.to(tiles[i]!, { pixi, ...opts }));
    };
    go(0, { saturation: 0 });
    go(1, { hue: 180 });
    go(2, { brightness: 2 });
    go(3, { colorize: 'red', colorizeAmount: 1 });
    go(4, { contrast: 1.8 });
    go(5, { blurX: 10, blurY: 2 });
    go(6, { colorMatrixFilter: sepia });
    // one timeline: each step tweens one property, and the others return to their defaults
    const seq = gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { duration: 0.9 } });
    seq.to(tiles[7]!, { pixi: { colorize: 'red', colorizeAmount: 1 } })
      .to(tiles[7]!, { pixi: { hue: 180 } })
      .to(tiles[7]!, { pixi: { saturation: 0 } })
      .to(tiles[7]!, { pixi: { brightness: 2 } })
      .to(tiles[7]!, { pixi: { contrast: 1.5 } })
      .to(tiles[7]!, { pixi: { saturation: 1, contrast: 1, brightness: 1, hue: 0 } });
    tweens.push(seq);
  }, el);

  if (!preview) {
    const caption = h('p', 'caption', 'The same drawn picture in every tile (no image files). Each tile tweens one special pixi property; PixiPlugin creates the ColorMatrixFilter or BlurFilter behind it.');
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
