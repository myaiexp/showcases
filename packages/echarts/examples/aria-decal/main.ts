// aria: decal patterns as a second cue beside colour, and the generated aria-label text
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const referrers = [
  { value: 335, name: 'Direct Visit' },
  { value: 310, name: 'Email Marketing' },
  { value: 234, name: 'Union Ad' },
  { value: 135, name: 'Video Ad' },
  { value: 1548, name: 'Search Engine' },
];

// Custom decals: one per data item, looped in order. Translucent colours sit over the
// series colour; dashArrayX/Y draw stripes and dots like SVG stroke-dasharray.
const CUSTOM = [
  { symbol: 'rect', color: 'rgba(0,0,0,0.35)', dashArrayX: [1, 0], dashArrayY: [4, 3], rotation: -Math.PI / 4 },
  { symbol: 'circle', color: 'rgba(255,255,255,0.35)', symbolSize: 0.6, dashArrayX: 6, dashArrayY: 6 },
  { symbol: 'triangle', color: 'rgba(0,0,0,0.35)', symbolSize: 0.8 },
  { symbol: 'rect', color: 'rgba(255,255,255,0.3)', dashArrayX: [1, 0], dashArrayY: [2, 5] },
  { symbol: 'diamond', color: 'rgba(0,0,0,0.3)', symbolSize: 0.7 },
];

const MODES = ['off', 'default decals', 'custom decals'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, container, dispose } = createChart(el, ctx, { height: 380 });
  const label = document.createElement('p');
  label.style.fontSize = '13px';
  label.style.width = '100%';
  if (!ctx.preview) el.append(label);

  const render = (mode: Mode): void => {
    chart.setOption(
      {
        // aria.enabled turns on the generated description; decal.show adds patterns.
        aria: {
          enabled: true,
          decal: mode === 'off' ? { show: false } : mode === 'default decals' ? { show: true } : { show: true, decals: CUSTOM },
        },
        title: { text: 'Referrer of a User', left: 'center', show: !ctx.preview },
        series: [
          {
            name: 'Referrer',
            type: 'pie',
            radius: ctx.preview ? ['0%', '80%'] : ['0%', '62%'],
            label: { show: !ctx.preview },
            data: referrers,
          },
        ],
      },
      { notMerge: true },
    );
    // The description ECharts generated, as it reads to a screen reader.
    label.textContent = `aria-label: ${container.getAttribute('aria-label') ?? '(none)'}`;
  };

  let i = 1;
  render(MODES[i]!);

  if (ctx.preview) {
    const stop = every(1800, () => render(MODES[++i % MODES.length]!));
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'aria.decal', MODES, (v) => render(v as Mode)).value = MODES[i]!;
  return () => {
    label.remove();
    dispose();
  };
};

export default mount;
