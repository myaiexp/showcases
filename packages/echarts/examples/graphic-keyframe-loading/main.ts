// Four loading animations built from graphic elements and keyframeAnimation: columns, spinner, stroked text, breathing circle
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, select, slider } from '../../shared/chart.ts';

type Element = Record<string, unknown>;
interface Settings { loop: boolean; duration: number }

/** Seven columns that squash and stretch in a wave: scaleY keyframes with a staggered delay. */
function columns(u: number, { loop, duration }: Settings): Element[] {
  return Array.from({ length: 7 }, (_, i) => ({
    type: 'rect',
    x: i * 20 * u,
    shape: { x: 0, y: -30 * u, width: 10 * u, height: 60 * u },
    style: { fill: '#5b8ff9' },
    keyframeAnimation: {
      duration,
      delay: (i * duration) / 5,
      loop,
      keyframes: [
        { percent: 0.5, scaleY: 0.1, easing: 'cubicIn' },
        { percent: 1, scaleY: 1, easing: 'cubicOut' },
      ],
    },
  }));
}

/** Eight dots on a ring whose opacity fades in turn, which reads as a rotation. */
function spinner(u: number, { loop, duration }: Settings): Element[] {
  return Array.from({ length: 8 }, (_, i) => ({
    type: 'circle',
    x: 30 * u * Math.cos((i / 8) * Math.PI * 2),
    y: 30 * u * Math.sin((i / 8) * Math.PI * 2),
    shape: { cx: 0, cy: 0, r: 5 * u },
    style: { fill: '#5ad8a6', opacity: 1 },
    keyframeAnimation: {
      duration,
      delay: (i * duration) / 8,
      loop,
      keyframes: [
        { percent: 0, style: { opacity: 1 } },
        { percent: 1, style: { opacity: 0.1 } },
      ],
    },
  }));
}

/** Text drawn by animating lineDash from nothing to a full outline, then filled in. */
function strokeText(u: number, { loop, duration }: Settings): Element[] {
  return [
    {
      type: 'text',
      style: { text: 'LOAD', fontSize: 34 * u, fontWeight: 'bold', fill: 'transparent', stroke: '#f6bd16', lineWidth: 1, lineDash: [0, 200], lineDashOffset: 0 },
      keyframeAnimation: {
        duration,
        loop,
        keyframes: [
          { percent: 0.7, style: { fill: 'transparent', lineDashOffset: 200, lineDash: [200, 0] } },
          { percent: 0.8, style: { fill: 'transparent' } },
          { percent: 1, style: { fill: '#f6bd16' } },
        ],
      },
    },
  ];
}

/** One circle that shrinks and grows: two scale keyframes with sinusoidal easing. */
function breathing(u: number, { loop, duration }: Settings): Element[] {
  return [
    {
      type: 'circle',
      shape: { cx: 0, cy: 0, r: 32 * u },
      style: { fill: '#e86452' },
      keyframeAnimation: {
        duration,
        loop,
        keyframes: [
          { percent: 0.5, easing: 'sinusoidalInOut', scaleX: 0.15, scaleY: 0.15 },
          { percent: 1, easing: 'sinusoidalInOut', scaleX: 1, scaleY: 1 },
        ],
      },
    },
  ];
}

const LOADERS = { columns, spinner, 'stroked text': strokeText, breathing } as const;
type Loader = keyof typeof LOADERS;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 340 });
  const settings: Settings = { loop: true, duration: 2000 };
  let which: Loader | 'all' = 'all';

  const show = (): void => {
    const u = ctx.preview ? 0.5 : which === 'all' ? 0.8 : 1.4;
    const names = which === 'all' ? (Object.keys(LOADERS) as Loader[]) : [which];
    const lefts = which === 'all' ? ['5%', '30%', '55%', '80%'] : ['center'];
    // setOption with notMerge: a new element list replaces the old one, so keyframes restart.
    chart.setOption(
      {
        graphic: {
          elements: names.map((name, i) => ({
            type: 'group',
            left: lefts[i],
            top: 'center',
            children: LOADERS[name](u, settings),
          })),
        },
      },
      true,
    );
  };
  show();

  if (bar) {
    select(bar, 'loader', ['all', ...Object.keys(LOADERS)], (v) => {
      which = v as typeof which;
      show();
    });
    select(bar, 'loop', ['loop', 'play once'], (v) => {
      settings.loop = v === 'loop';
      show();
    });
    slider(bar, 'duration (ms)', [500, 5000, 250], settings.duration, (v) => {
      settings.duration = v;
      show();
    });
    button(bar, 'replay', show);
  }

  return dispose;
};

export default mount;
