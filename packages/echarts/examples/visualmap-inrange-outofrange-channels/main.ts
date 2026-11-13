// visualMap inRange channels (lightness, alpha, saturation, hue, size) and what outOfRange does to the rest
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { points } from '../../shared/interaction-data.ts';

const data = points(160, 17);

// Each entry is the visual value range for [visualMap.min, visualMap.max].
const IN_RANGE: Record<string, Record<string, unknown>> = {
  colorLightness: { colorLightness: [0.85, 0.25] },
  colorAlpha: { colorAlpha: [0.1, 1] },
  colorSaturation: { colorSaturation: [0.05, 1] },
  colorHue: { colorHue: [0, 280] },
  'symbolSize + opacity': { symbolSize: [6, 28], opacity: [0.35, 1] },
};

const OUT_OF_RANGE: Record<string, Record<string, unknown>> = {
  'faded (opacity 0.08)': { opacity: 0.08 },
  'grey colour': { color: '#555' },
  'tiny symbols': { symbolSize: 3 },
  'none (hidden by range only)': {},
};

function build(channel: string, outside: string, range: [number, number]): EChartsOption {
  return {
    tooltip: {},
    grid: { top: 16, left: 40, right: 90, bottom: 30 },
    xAxis: { type: 'value', min: 0, max: 100 },
    yAxis: { type: 'value', min: 0, max: 100 },
    visualMap: {
      type: 'continuous',
      dimension: 2,
      min: 0,
      max: 100,
      // range: the selected part of [min, max]; calculable adds the two draggable handles.
      range,
      calculable: true,
      right: 8,
      top: 'center',
      // inRange: visual channels for values inside the range; outOfRange: for values outside it.
      inRange: IN_RANGE[channel],
      outOfRange: OUT_OF_RANGE[outside],
      textStyle: { color: '#ccc' },
    },
    // The base colour: colorLightness/Alpha/Saturation/Hue all modify the colour the series has.
    series: [{ type: 'scatter', symbolSize: 14, itemStyle: { color: '#5fb4ff' }, data }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let channel = 'colorLightness';
  let outside = 'faded (opacity 0.08)';
  const show = (): void => {
    chart.setOption(build(channel, outside, [30, 70]), true);
  };
  show();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'inRange', Object.keys(IN_RANGE), (v) => {
      channel = v;
      show();
    });
    select(bar, 'outOfRange', Object.keys(OUT_OF_RANGE), (v) => {
      outside = v;
      show();
    });
  } else {
    // Slide the selected range along the bar and change the channel after each pass.
    const names = Object.keys(IN_RANGE);
    let lo = 0;
    let dir = 1;
    let pass = 0;
    stop = every(1000, () => {
      lo += dir * 10;
      if (lo > 60 || lo < 0) {
        dir = -dir;
        lo += dir * 10;
        if (dir > 0) {
          channel = names[++pass % names.length]!;
          show();
        }
      }
      chart.dispatchAction({ type: 'selectDataRange', selected: [lo, lo + 40] });
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
