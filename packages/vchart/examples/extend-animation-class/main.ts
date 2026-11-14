// A class extending ACustomAnimate: bars spring up from the baseline, with the bounce count as a parameter
import type { Mount } from '@/types.ts';
import { ACustomAnimate } from '@visactor/vchart';
import { mountReplay, weekdayRows } from '../../shared/anim-data.ts';
import { slider } from '../../shared/chart.ts';

type Ends = { y?: number; y1?: number; height?: number };

class SpringUp extends ACustomAnimate<Ends> {
  override getEndProps(): Record<string, unknown> {
    return this.to as Record<string, unknown>;
  }

  override getFromProps(): Record<string, unknown> {
    const to = this.to as Ends;
    // Start flat on the baseline (y1 is the bottom edge of a vertical bar).
    return { y: to.y1, y1: to.y1, height: to.height === undefined ? undefined : 0 };
  }

  override onBind(): void {
    this.target?.setAttributes(this.getFromProps());
  }

  override onUpdate(end: boolean, ratio: number, _out: Record<string, unknown>): void {
    const to = this.to as Ends;
    const bounces = (this.params as { bounces: number }).bounces;
    const t = end ? 1 : 1 - Math.exp(-4 * ratio) * Math.cos(ratio * Math.PI * 2 * bounces);
    const bottom = to.y1 ?? 0;
    const frame: Ends = { y: bottom - (bottom - (to.y ?? 0)) * t, y1: bottom };
    // A vertical bar carries a height as well as y and y1; they must stay consistent.
    if (to.height !== undefined) frame.height = to.height * t;
    // In VRender 1.1 the `out` argument is not applied: write the frame to the graphic itself.
    this.target?.setAttributes(frame);
  }
}

const mount: Mount = (el, ctx) =>
  mountReplay<{ bounces: number }>(el, ctx, {
    initial: { bounces: 2 },
    period: 3600,
    build: ({ bounces }, preview) => ({
      type: 'bar',
      data: [{ id: 'sales', values: weekdayRows(15) }],
      xField: 'day',
      yField: 'sales',
      seriesField: 'day',
      legends: { visible: false },
      title: { visible: true, text: `SpringUp, ${bounces} bounces`, textStyle: { fontSize: preview ? 12 : 16 } },
      animationAppear: {
        bar: { channel: ['y', 'y1', 'height'], custom: SpringUp, customParameters: { bounces }, duration: 1500, easing: 'linear', oneByOne: 80 },
      },
    }),
    step: (_s, i) => ({ bounces: [2, 1, 3][i % 3] ?? 2 }),
    controls: (bar, set) => {
      slider(bar, 'bounces', [0.5, 5, 0.5], 2, (bounces) => set({ bounces }));
    },
  });

export default mount;
