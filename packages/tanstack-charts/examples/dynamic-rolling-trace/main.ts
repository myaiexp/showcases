// Streaming: a keyed window of samples, rolling path motion, fixed margins and clip
import { defineChart, lineY } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const value = (t: number): number => 50 + 28 * Math.sin(t / 5) + 12 * Math.sin(t / 1.7);
const visible = 24;
const overscan = 4;
const interval = 700;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The window advances one sample at a time; turn rolling off to see the plain morph.' });
  let head = visible;
  let rolling = true;
  const build = () => {
    const samples = Array.from({ length: visible + overscan + 1 }, (_, k) => {
      const t = head - visible - overscan + k;
      return { id: `s${t}`, t, v: Math.round(value(t) * 10) / 10 };
    });
    return defineChart({
      motion: {
        path: rolling ? { update: 'rolling', x: 'shift', y: 'reproject', fallback: 'snap' } : 'morph',
        transition: { type: 'tween', duration: interval, easing: 'linear' },
      },
      marks: [lineY(samples, { id: 'trace', x: 't', y: 'v', key: 'id', stroke: '#4ade80', strokeWidth: 2.5 })],
      scales: {
        x: { scale: scaleLinear().domain([head - visible, head]), axis: false },
        y: { scale: scaleLinear().domain([0, 100]), grid: true },
      },
      margin: { top: 10, right: 12, bottom: 12, left: 36 },
      clip: true,
    });
  };
  const options = () => ({ definition: build(), renderer: motion(), height: stage.height, ariaLabel: 'Live trace of a signal' });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  stage.every(interval, () => {
    head++;
    host.update(options());
  });
  if (stage.bar) checkbox(stage.bar, 'rolling path', true, (v) => { rolling = v; });
  return () => stage.dispose();
};

export default mount;
