// Custom adapter: registerTargetAdapter() for a canvas class, plus a registerPropertyResolver() for bar_N names
import { animate, createTimer } from 'animejs';
import type { AnimationParams } from 'animejs';
import { registerAdapter } from 'animejs/adapters';
import type { Mount } from '@/types.ts';
import './style.css';

/** A plain class with no animatable properties of its own: getters and setters only. */
class Equalizer {
  bars = new Array<number>(8).fill(0.2);
  private tint = 200;
  getHue(): number {
    return this.tint;
  }
  setHue(h: number): void {
    this.tint = h;
  }
  draw(ctx: CanvasRenderingContext2D, w: number, h: number): void {
    ctx.clearRect(0, 0, w, h);
    const bw = w / this.bars.length;
    this.bars.forEach((v, i) => {
      ctx.fillStyle = `hsl(${this.tint + i * 8} 80% 60%)`;
      ctx.fillRect(i * bw + 4, h - v * (h - 8), bw - 8, v * (h - 8));
    });
  }
}

// Registered once at module level: an Adapter is a namespace and cannot be unregistered.
const equalizerAdapter = registerAdapter();
const eqTarget = equalizerAdapter.registerTargetAdapter((t) => t instanceof Equalizer);
// A fixed name with getter, setter and a gate (hue only applies while there are bars).
eqTarget.registerProperty(
  'hue',
  (t: Equalizer) => t.getHue(),
  (t: Equalizer, value: number) => t.setHue(value),
  (t: Equalizer) => t.bars.length > 0,
);
// Names that cannot be listed upfront: bar_0 ... bar_7, matched when animated.
equalizerAdapter.registerPropertyResolver((target, name) => {
  if (!(target instanceof Equalizer) || !name.startsWith('bar_')) return null;
  const i = Number(name.slice(4));
  return { get: (t: Equalizer) => t.bars[i], set: (t: Equalizer, value: number) => { t.bars[i] = value; } };
});

const mount: Mount = (el, { preview }) => {
  const canvas = document.createElement('canvas');
  canvas.width = preview ? 240 : 480;
  canvas.height = preview ? 150 : 240;
  canvas.className = 'eq';
  el.append(canvas);
  const ctx = canvas.getContext('2d')!;
  const eq = new Equalizer();
  const readout = document.createElement('pre');
  readout.className = 'readout';

  const anims = [
    animate(eq, { hue: [200, 330], duration: 4000, loop: true, alternate: true, ease: 'inOutSine' }),
    ...eq.bars.map((_, i) =>
      animate(eq, {
        [`bar_${i}`]: [0.1, 0.45 + ((i * 37) % 55) / 100],
        duration: 700 + i * 140,
        loop: true,
        alternate: true,
        ease: 'inOutQuad',
      } as AnimationParams),
    ),
  ];
  const draw = createTimer({
    onUpdate: () => {
      eq.draw(ctx, canvas.width, canvas.height);
      readout.textContent = `eq.getHue() ${eq.getHue().toFixed(0)}   eq.bars[3] ${eq.bars[3]!.toFixed(2)}   (animated as "hue" and "bar_3")`;
    },
  });
  if (!preview) el.append(readout);

  return () => {
    draw.revert();
    anims.forEach((a) => a.revert());
  };
};

export default mount;
