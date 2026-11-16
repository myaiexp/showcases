// Subclassing: a speech bubble whose tail sits inside the object's own box
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

class Bubble extends Rect {
  declare tailX: number;
  declare tailHeight: number;
  static override type = 'ShowcaseBubble';
  static override cacheProperties = [...Rect.cacheProperties, 'tailX', 'tailHeight'];
  static override customProperties = ['tailX', 'tailHeight'];

  constructor(options?: Record<string, any>) {
    super({ tailX: 0.3, tailHeight: 22, rx: 14, ry: 14, ...options } as ConstructorParameters<typeof Rect>[0]);
  }

  // Trap: the object cache is only as big as width x height (plus the stroke). Anything drawn outside
  // that box is cut off, so the tail is part of `height`: the body is the rest.
  override _render(ctx: CanvasRenderingContext2D): void {
    const { width: w, height: h, tailHeight: t } = this;
    const left = -w / 2;
    const bottom = h / 2 - t; // where the body ends and the tail starts
    const tipX = left + w * this.tailX;
    ctx.beginPath();
    ctx.roundRect(left, -h / 2, w, h - t, this.rx);
    ctx.moveTo(tipX - 12, bottom - 1);
    ctx.lineTo(tipX - 6, h / 2); // the tip
    ctx.lineTo(tipX + 12, bottom - 1);
    this._renderPaintInOrder(ctx);
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [200, 200],
    hint: 'A Rect subclass that adds a tail. tailX and tailHeight are cacheProperties, so set() repaints; the tail stays inside width x height so the cache does not clip it.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = briefStatus(stage);
  const bubble = new Bubble({ left: 100, top: 100, width: 150, height: 100, fill: '#fff', stroke: '#2b2a33', strokeWidth: 3 });
  canvas.add(bubble);
  const set = (props: Record<string, number>): void => {
    bubble.set(props);
    canvas.requestRenderAll();
    say(`tailX ${bubble.tailX.toFixed(2)}, tail ${Math.round(bubble.tailHeight)}`);
  };
  set({});

  if (stage.bar) {
    slider(stage.bar, 'tailX', 0.1, 0.9, 0.05, 0.3, (v) => set({ tailX: v }), (v) => v.toFixed(2));
    slider(stage.bar, 'tail height', 4, 50, 1, 22, (v) => set({ tailHeight: v }));
  } else stage.loop((_dt, t) => set({ tailX: 0.5 + Math.sin(t * 1.4) * 0.35, tailHeight: 28 + Math.sin(t * 2) * 12 }));

  return stage.dispose;
};

export default mount;
