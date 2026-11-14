// 100,000 sensor readings, with the settings that make drawing them fast
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { button, controlBar, select, toggle } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';
import { sensorSignal } from '../../shared/general-data.ts';

/** Each flag is one speed-up from performance.md; all on is the fast setup. */
interface Settings {
  parsingFalse: boolean;
  normalized: boolean;
  animationFalse: boolean;
  pointRadius0: boolean;
  spanGaps: boolean;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 170 });
  const label = caption(el);
  const s: Settings = { parsingFalse: true, normalized: true, animationFalse: true, pointRadius0: true, spanGaps: true };
  let count = 100_000;
  let chart: Chart<'line'> | null = null;

  const build = (): void => {
    chart?.destroy();
    const data = sensorSignal(count); // sorted, unique x: what normalized: true promises
    const t0 = performance.now();
    chart = new Chart(stage.canvas, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Temperature (°C)',
            data,
            borderColor: C.cyan,
            borderWidth: 1,
            // performance.md § Line Charts: no point drawing, spanGaps on.
            pointRadius: s.pointRadius0 ? 0 : 3,
            spanGaps: s.spanGaps,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        // performance.md § Parsing, Data normalization, Disable Animations.
        parsing: s.parsingFalse ? false : undefined,
        normalized: s.normalized,
        animation: s.animationFalse ? false : undefined,
        scales: { x: { type: 'linear', min: 0, max: count }, y: { min: 15, max: 35 } },
        plugins: { legend: { display: false }, tooltip: { enabled: !ctx.preview } },
      },
    });
    const built = performance.now() - t0;
    const t1 = performance.now();
    chart.update('none'); // a full redraw with no animation: the cost of one more frame
    const redraw = performance.now() - t1;
    label.textContent = `${count.toLocaleString('en-US')} points · build ${built.toFixed(0)} ms`;
    if (!ctx.preview) label.textContent += ` · redraw ${redraw.toFixed(0)} ms`;
  };
  build();

  if (bar) {
    select(bar, 'points', ['10000', '100000'] as const, String(count) as '10000' | '100000', (v) => {
      count = Number(v);
      build();
    });
    const flag = (name: string, key: keyof Settings): void => {
      toggle(bar, name, s[key], (v) => {
        s[key] = v;
        build();
      });
    };
    flag('parsing: false', 'parsingFalse');
    flag('normalized: true', 'normalized');
    flag('animation: false', 'animationFalse');
    flag('pointRadius: 0', 'pointRadius0');
    flag('spanGaps: true', 'spanGaps');
    button(bar, 'Rebuild', build);
  }
  // A card rebuilds the chart at other sizes to stay alive (each build takes a few hundred ms,
  // hence the slow pace); it always uses the fast settings.
  const sizes = [100_000, 20_000, 50_000];
  let i = 0;
  const stop = ctx.preview
    ? every(4000, () => {
        count = sizes[++i % sizes.length]!;
        build();
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
