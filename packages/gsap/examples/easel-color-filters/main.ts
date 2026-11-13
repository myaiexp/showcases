// EaselPlugin: tint, saturation, hue, exposure and colorFilter tweens on cached EaselJS shapes
import { gsap } from 'gsap';
import { EaselPlugin } from 'gsap/EaselPlugin';
import { btn, h } from '../../shared/ui.ts';
import { loadCreateJS, type EaselShape } from './easel.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(EaselPlugin);

const W = 450;
const H = 170;

const mount: Mount = async (el, { preview, signal }) => {
  const createjs = await loadCreateJS();
  if (signal.aborted) return () => {};
  // registerCreateJS exists at runtime and in the docs' wording but not in gsap's .d.ts,
  // hence this narrow cast; it tells the plugin where the createjs namespace is.
  (EaselPlugin as unknown as { registerCreateJS(cjs: unknown): void }).registerCreateJS(createjs);

  const canvas = h('canvas', 'cv');
  canvas.width = W;
  canvas.height = H;
  el.append(canvas);

  const stage = new createjs.Stage(canvas);
  const make = (x: number, draw: (g: EaselShape['graphics']) => void): EaselShape => {
    const s = new createjs.Shape();
    draw(s.graphics);
    // ColorFilter and ColorMatrixFilter only work on a cached display object.
    s.cache(-60, -60, 120, 120);
    s.x = x;
    s.y = H / 2;
    stage.addChild(s);
    return s;
  };
  const circle = make(75, (g) => g.beginFill('#ff0000').drawCircle(0, 0, 50).endFill());
  const stripes = make(225, (g) => {
    ['#ff3b30', '#ff9500', '#ffd60a', '#34c759', '#0a84ff'].forEach((c, i) => g.beginFill(c).drawRect(-50 + i * 20, -50, 20, 100).endFill());
  });
  const panel = make(375, (g) => g.beginFill('#5e5ce6').drawRoundRect(-50, -50, 100, 100, 16).endFill().beginFill('#ffd60a').drawCircle(0, 0, 22).endFill());
  stage.update();

  // Redraw on every GSAP tick, as the docs' setup does.
  const redraw = (): void => stage.update();
  gsap.ticker.add(redraw);

  const tls: gsap.core.Timeline[] = [];
  const ctx = gsap.context(() => {
    const loop = (): gsap.core.Timeline => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.3, defaults: { duration: 1.4 } });
      tls.push(tl);
      return tl;
    };
    // tint: mix a color in at full strength, then at 50% with a size and position change
    loop()
      .to(circle, { scaleX: 0.6, scaleY: 0.6, easel: { tint: 0x00ff00 } })
      .to(circle, { scaleX: 1.2, scaleY: 0.8, easel: { tint: '#0000FF', tintAmount: 0.5 }, ease: 'elastic' });
    // ColorMatrixFilter properties: hue, then saturation, then contrast
    loop()
      .to(stripes, { easel: { hue: 180 } })
      .to(stripes, { easel: { saturation: 0 } })
      .to(stripes, { easel: { contrast: 1.6 } });
    // exposure (0 to 2, 1 is normal), then single ColorFilter properties
    loop()
      .to(panel, { easel: { exposure: 2 } })
      .to(panel, { easel: { exposure: 0.3 } })
      .to(panel, { easel: { colorFilter: { redMultiplier: 0.4, blueMultiplier: 0.8, greenOffset: 100 } } });
  }, el);

  if (!preview) {
    const caption = h('p', 'caption', 'tint and tintAmount (left), hue, saturation and contrast (middle), exposure and colorFilter properties (right). Each shape yoyos its own timeline.');
    const bar = h('div', 'controls');
    btn('Pause / resume', () => tls.forEach((t) => t.paused(!t.paused())), bar);
    btn('Restart', () => tls.forEach((t) => t.restart()), bar);
    el.append(caption, bar);
  }

  return () => {
    gsap.ticker.remove(redraw);
    ctx.revert();
    for (const t of tls) t.kill();
    stage.removeAllChildren();
  };
};

export default mount;
