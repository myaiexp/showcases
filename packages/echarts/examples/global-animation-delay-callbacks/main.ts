// Bars animated with numeric and callback animationDuration/Delay, easing and animationThreshold
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';

type DelayMode = 'none' | 'idx * 40' | 'reverse';
type DurationMode = 'fixed 800' | 'idx * 30 + 300';

interface Look { delay: DelayMode; duration: DurationMode; easing: string; threshold: number; count: number }

const wave = (n: number, phase: number): number[] =>
  Array.from({ length: n }, (_, i) => Math.round(55 + 35 * Math.sin(i / 3 + phase) + (i % 5) * 2));

function build(look: Look, data: number[]): EChartsOption {
  const n = data.length;
  return {
    grid: { top: 16, left: 40, right: 16, bottom: 28 },
    xAxis: { type: 'category', data: data.map((_, i) => String(i + 1)) },
    yAxis: { type: 'value', max: 100 },
    // Above this many graphics ECharts turns the animation off.
    animationThreshold: look.threshold,
    // The first animation: a number, or a callback of the data index.
    animationDuration: look.duration === 'fixed 800' ? 800 : (idx: number) => idx * 30 + 300,
    animationEasing: look.easing as 'linear',
    animationDelay: look.delay === 'none' ? 0 : look.delay === 'reverse' ? (idx: number) => (n - idx) * 40 : (idx: number) => idx * 40,
    // The Update variants run when setOption changes existing data.
    animationDurationUpdate: 700,
    animationEasingUpdate: look.easing as 'linear',
    animationDelayUpdate: look.delay === 'none' ? 0 : (idx: number) => idx * 20,
    series: [{ type: 'bar', data }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { delay: 'idx * 40', duration: 'fixed 800', easing: 'cubicOut', threshold: 200, count: 24 };
  let phase = 0;
  // notMerge replays the first animation; a merge shows the Update animation.
  const replay = (): void => {
    chart.setOption(build(look, wave(look.count, phase)), true);
  };
  const update = (): void => {
    phase += 1.2;
    chart.setOption(build(look, wave(look.count, phase)));
  };
  replay();

  let stop = (): void => {};
  if (ctx.preview) {
    const delays: DelayMode[] = ['idx * 40', 'reverse', 'none'];
    const easings = ['cubicOut', 'bounceOut', 'elasticOut', 'linear'];
    let i = 0;
    stop = every(2600, () => {
      i += 1;
      look.delay = delays[i % 3]!;
      look.easing = easings[i % 4]!;
      look.duration = i % 2 ? 'idx * 30 + 300' : 'fixed 800';
      replay();
    });
  } else {
    select(bar!, 'animationDelay', ['idx * 40', 'reverse', 'none'], (v) => { look.delay = v as DelayMode; replay(); });
    select(bar!, 'animationDuration', ['fixed 800', 'idx * 30 + 300'], (v) => { look.duration = v as DurationMode; replay(); });
    select(bar!, 'animationEasing', ['cubicOut', 'linear', 'quadraticInOut', 'bounceOut', 'elasticOut', 'backOut'], (v) => { look.easing = v; replay(); });
    slider(bar!, 'bars', [8, 60, 1], look.count, (v) => { look.count = v; replay(); });
    slider(bar!, 'animationThreshold', [5, 200, 5], look.threshold, (v) => { look.threshold = v; replay(); });
    button(bar!, 'replay', replay);
    button(bar!, 'update data', update);
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
