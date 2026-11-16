// Subclassing: a Star shape drawn by its own _render on top of FabricObject
import { Canvas, FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel, pretty } from '../../shared/code-panel.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

class Star extends FabricObject {
  declare points: number;
  declare innerRatio: number;
  static override type = 'ShowcaseStar';
  // These change what _render draws, so they must invalidate the cached bitmap.
  static override cacheProperties = [...FabricObject.cacheProperties, 'points', 'innerRatio'];
  // They are also written by toObject, with no toObject override.
  static override customProperties = ['points', 'innerRatio'];

  constructor(options?: Record<string, any>) {
    super({ width: 100, height: 100, points: 5, innerRatio: 0.45, ...options } as ConstructorParameters<typeof FabricObject>[0]);
  }

  // Path in object space; width/height are the box, so scaling and rotation come free.
  override _render(ctx: CanvasRenderingContext2D): void {
    const outer = Math.min(this.width, this.height) / 2;
    ctx.beginPath();
    for (let i = 0; i < this.points * 2; i++) {
      const radius = i % 2 ? outer * this.innerRatio : outer;
      const angle = -Math.PI / 2 + (i * Math.PI) / this.points;
      ctx[i ? 'lineTo' : 'moveTo'](Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    ctx.closePath();
    this._renderPaintInOrder(ctx); // fill and stroke, honouring paintFirst
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'toObject()'],
    scene: [160, 200],
    hint: 'Star only overrides _render. Selecting, scaling and rotating work because it is still a FabricObject with a width and a height.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);
  const star = new Star({ left: 80, top: 100, width: 120, height: 120, fill: '#f2b134', stroke: '#a8700a', strokeWidth: 4, strokeLineJoin: 'round' });
  canvas.add(star);

  const refresh = (): void => {
    star.set({});
    canvas.requestRenderAll();
    const { points, innerRatio, type } = star.toObject();
    show(pretty({ type, points, innerRatio }, stage.preview));
    say(`${star.points} points`);
  };
  refresh();

  if (stage.bar) {
    slider(stage.bar, 'points', 3, 12, 1, 5, (v) => ((star.points = v), (star.dirty = true), refresh()));
    slider(stage.bar, 'inner radius', 0.1, 0.95, 0.05, 0.45, (v) => (star.set('innerRatio', v), refresh()), (v) => v.toFixed(2));
  } else {
    stage.loop((_dt, t) => {
      star.set({ innerRatio: 0.4 + (Math.sin(t * 1.5) + 1) * 0.2, angle: t * 20 });
      star.points = 5 + Math.floor(t / 2.5) % 4;
      star.dirty = true;
      refresh();
    });
  }

  return stage.dispose;
};

export default mount;
