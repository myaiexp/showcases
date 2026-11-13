// Sunburst geometry: levels.radius per ring, startAngle, clockwise and borderRadius
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { project } from '../../shared/hierarchy-data.ts';

// Each preset gives levels[1..3] their inner and outer radius.
const PRESETS: Record<string, [string, string][]> = {
  even: [['15%', '40%'], ['40%', '65%'], ['65%', '90%']],
  'thin core, wide edge': [['10%', '20%'], ['22%', '45%'], ['47%', '92%']],
  'thin outer ring': [['12%', '45%'], ['47%', '78%'], ['82%', '88%']],
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (preset: string, start: number, clockwise: boolean, rounding: number, animate: boolean): void => {
    chart.setOption({
      tooltip: { formatter: '{b}: {c} KB' },
      animation: animate,
      series: [
        {
          type: 'sunburst',
          data: project.children,
          // startAngle: where the first sector begins, in degrees (90 is the top).
          startAngle: start,
          // clockwise: false lays the sectors out counter-clockwise.
          clockwise,
          // levels[0] is the return-to-parent circle; then one entry per ring, each with its own radius.
          levels: [
            {},
            ...PRESETS[preset]!.map((radius) => ({ radius, itemStyle: { borderRadius: rounding, borderWidth: 2, borderColor: '#222' } })),
          ],
          label: { show: !ctx.preview, minAngle: 10, fontSize: 11 },
        },
      ],
    });
  };

  let preset = 'even';
  let start = 90;
  let clockwise = true;
  let rounding = 6;
  render(preset, start, clockwise, rounding, true);

  if (ctx.preview) {
    // Spin by stepping startAngle; no animation, so updates cannot pile up.
    const stop = every(120, () => {
      start = (start + 3) % 360;
      render(preset, start, clockwise, rounding, false);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'levels.radius', Object.keys(PRESETS), (v) => {
    preset = v;
    render(preset, start, clockwise, rounding, true);
  });
  slider(bar!, 'startAngle', [0, 360, 5], start, (v) => {
    start = v;
    render(preset, start, clockwise, rounding, true);
  });
  const cb = button(bar!, 'clockwise: on', () => {
    clockwise = !clockwise;
    cb.textContent = `clockwise: ${clockwise ? 'on' : 'off'}`;
    render(preset, start, clockwise, rounding, true);
  });
  slider(bar!, 'borderRadius', [0, 20, 1], rounding, (v) => {
    rounding = v;
    render(preset, start, clockwise, rounding, true);
  });

  return dispose;
};

export default mount;
