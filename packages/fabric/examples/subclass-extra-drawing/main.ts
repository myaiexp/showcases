// Subclassing: a Rect subclass that draws a gauge on top and adds its own control
import { Canvas, Control, controlsUtils, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { createStage } from '../../shared/stage.ts';

type Opts = ConstructorParameters<typeof Rect>[0];

class Gauge extends Rect {
  declare level: number; // 0 to 1
  static override type = 'ShowcaseGauge';
  static override cacheProperties = [...Rect.cacheProperties, 'level'];
  static override customProperties = ['level'];

  constructor(options?: object) {
    super({ level: 0.3, ...options } as Opts);
  }

  // The rectangle first, then a bar over its lower part: extra drawing in object space.
  override _render(ctx: CanvasRenderingContext2D): void {
    super._render(ctx);
    const inset = 6;
    const full = this.height - inset * 2;
    ctx.fillStyle = '#e94b3c';
    ctx.fillRect(-this.width / 2 + inset, this.height / 2 - inset - full * this.level, this.width - inset * 2, full * this.level);
  }

  // createControls() runs for every new instance: the default eight handles plus a "+" button.
  static override createControls(): { controls: Record<string, Control> } {
    return {
      controls: {
        ...controlsUtils.createObjectDefaultControls(),
        plus: new Control({
          x: 0.5,
          y: -0.5,
          offsetX: 18,
          offsetY: -18,
          cursorStyle: 'pointer',
          // Runs on mouse up over the control; returning true says the click was handled.
          mouseUpHandler: (_event, transform) => {
            const gauge = transform.target as Gauge;
            gauge.set('level', gauge.level >= 1 ? 0 : Math.min(1, gauge.level + 0.2));
            gauge.canvas?.requestRenderAll();
            return true;
          },
          render(ctx, left, top) {
            ctx.save();
            ctx.translate(left, top);
            ctx.fillStyle = '#2e9e5b';
            ctx.beginPath();
            ctx.arc(0, 0, 11, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-5, 0);
            ctx.lineTo(5, 0);
            ctx.moveTo(0, -5);
            ctx.lineTo(0, 5);
            ctx.stroke();
            ctx.restore();
          },
        }),
      },
    };
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [200, 200],
    hint: 'Click the green + (top right of the selected gauge) to raise its level; at full it wraps to empty. Drag the other handles as usual.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = briefStatus(stage);
  const gauge = new Gauge({ left: 100, top: 105, width: 80, height: 130, fill: '#fff', stroke: '#2b2a33', strokeWidth: 3 });
  canvas.add(gauge);
  canvas.setActiveObject(gauge);
  canvas.on('after:render', () => say(`level ${Math.round(gauge.level * 100)}%`));

  if (stage.preview) {
    stage.every(700, () => {
      gauge.set('level', gauge.level >= 1 ? 0 : Math.min(1, gauge.level + 0.2));
      canvas.requestRenderAll();
    });
  }

  return stage.dispose;
};

export default mount;
