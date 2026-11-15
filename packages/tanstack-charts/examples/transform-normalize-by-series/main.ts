// normalize by series with basis 'first': different starting levels become one comparable start
import { defineChart, lineY, normalize } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const series = makeSeries(50);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (indexed: boolean) => {
    const rows = normalize(series, { by: 'series', value: 'value', basis: 'first', as: 'index' });
    return defineChart({
      marks: [lineY(rows, { x: 'day', y: indexed ? 'index' : 'value', color: 'series', strokeWidth: 2.5 })],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true, axis: { label: indexed ? 'Relative to first value' : 'Raw value' } } },
    });
  };
  const states = [[false, 'raw values'], [true, "normalize({ by: 'series', basis: 'first' })"]] as const;
  lab(stage, { label: 'values', ariaLabel: 'Two series raw and indexed', states, build, ms: 2400, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
