// A new chart type, built on the bar controller, that crowns the tallest bar
import { BarController, Chart as ChartJs } from 'chart.js';
import type { BarElement, ChartTypeRegistry } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { C, alpha, numbers, seeded } from '../../shared/data.ts';

// charts.md § TypeScript Typings: the new type is declared next to the ones Chart.js has.
declare module 'chart.js' {
  interface ChartTypeRegistry {
    'showcase-crowned-bar': ChartTypeRegistry['bar'];
  }
}

// charts.md § Extending Existing Chart Types: keep everything the bar controller does,
// then draw one extra thing on top in draw().
class CrownedBarController extends BarController {
  static override id = 'showcase-crowned-bar';
  static override defaults = BarController.defaults;
  // Not in the type definitions, but the bar's own scales (category x, linear y) live here.
  static overrides = (BarController as unknown as { overrides: unknown }).overrides;

  override draw(): void {
    super.draw();
    const meta = this.getMeta();
    const values = meta.data.map((bar) => (bar as BarElement).y ?? Infinity);
    // The smallest y is the tallest bar (y grows downwards).
    const best = meta.data[values.indexOf(Math.min(...values))] as BarElement | undefined;
    if (!best) return;
    const props = best.getProps(['x', 'y', 'width', 'base']);
    const [x, y, width, base] = [Number(props.x), Number(props.y), props.width, props.base];
    const ctx = this.chart.ctx;
    ctx.save();
    ctx.strokeStyle = C.amber;
    ctx.lineWidth = 2;
    ctx.strokeRect(x - width / 2, y, width, base - y);
    // The crown: a three-pointed outline above the bar.
    const w = Math.min(width, 34);
    ctx.fillStyle = C.amber;
    ctx.beginPath();
    ctx.moveTo(x - w / 2, y - 4);
    ctx.lineTo(x - w / 2, y - 16);
    ctx.lineTo(x - w / 4, y - 9);
    ctx.lineTo(x, y - 18);
    ctx.lineTo(x + w / 4, y - 9);
    ctx.lineTo(x + w / 2, y - 16);
    ctx.lineTo(x + w / 2, y - 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
// Registered once, under a name no other example uses.
ChartJs.register(CrownedBarController);

const CLUBS = ['Chess', 'Choir', 'Robotics', 'Drama', 'Hiking', 'Film'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, "type: 'showcase-crowned-bar'");
  const rand = seeded(21);

  const chart = new Chart<keyof ChartTypeRegistry>(stage.canvas, {
    type: 'showcase-crowned-bar',
    data: {
      labels: CLUBS,
      datasets: [{ label: 'Members', data: numbers(6, 12, 60, rand), backgroundColor: alpha(C.blue, 0.6), borderRadius: 3 }],
    },
    options: {
      maintainAspectRatio: false,
      // A controller's draw() is clipped to the chart area, so the crown needs room under the top edge.
      scales: { y: { beginAtZero: true, grace: '18%' } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  const shuffle = (): void => {
    chart.data.datasets[0]!.data = numbers(6, 12, 60, rand);
    chart.update();
  };
  if (bar) button(bar, 'New sign-ups', shuffle);
  const stop = ctx.preview ? every(1900, shuffle) : () => {};
  void note;

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
