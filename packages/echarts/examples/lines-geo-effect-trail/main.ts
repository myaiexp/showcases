// series.lines on a geo map: routes from one hub with a moving effect symbol, trail, speed and end symbols
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, select, slider } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';
import { CITIES } from '../../shared/scatter-data.ts';
import { spokes } from '../../shared/geo-data.ts';

echarts.registerMap('lines-geo-effect-trail-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

// A hand-drawn plane pointing up: the effect symbol turns to follow the line's tangent.
const PLANE = 'path://M0,-10 L2,-3 L10,3 L10,5 L2,3 L1.5,8 L4,10 L4,11 L0,10 L-4,11 L-4,10 L-1.5,8 L-2,3 L-10,5 L-10,3 L-2,-3 Z';
const SYMBOLS: Record<string, string> = { circle: 'circle', arrow: 'arrow', triangle: 'triangle', rect: 'rect', plane: PLANE };
const ENDS = ['none', 'circle', 'arrow'];
const HUB = 'Helsinki';
const ROUTES = spokes(HUB);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  const s = { symbol: 'plane', trail: 0.4, period: 5, curve: 0.25, speed: 'by period', ends: 'none', round: 'false' };

  const option = (): Record<string, unknown> => ({
    // Trail effects ghost when other layers animate, so the animation is off for the whole chart.
    animation: false,
    geo: {
      map: 'lines-geo-effect-trail-world',
      roam: !ctx.preview,
      zoom: ctx.preview ? 1.15 : 1,
      itemStyle: { areaColor: '#232833', borderColor: '#3a4150', borderWidth: 0.5 },
      emphasis: { disabled: true },
    },
    series: [
      {
        type: 'lines',
        coordinateSystem: 'geo',
        // The effect layer must differ from the map's zlevel, as the docs advise.
        zlevel: 2,
        data: ROUTES,
        // Two coordinates per line: [from, to].
        lineStyle: { color: '#f2b94c', width: 1, opacity: 0.35, curveness: s.curve },
        // Symbols at the two ends of each line: one value or [from, to].
        symbol: s.ends === 'none' ? 'none' : ['none', s.ends],
        symbolSize: 7,
        effect: {
          show: true,
          symbol: SYMBOLS[s.symbol],
          symbolSize: s.symbol === 'plane' ? 10 : 6,
          color: '#fff3c4',
          trailLength: s.trail,
          // period is seconds per trip; constantSpeed (pixels per second) overrides it when > 0.
          period: s.period,
          constantSpeed: s.speed === 'constant speed' ? 60 : 0,
          roundTrip: s.round === 'true',
        },
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: CITIES.map((c) => ({ name: c.name, value: [c.lon, c.lat] })),
        symbolSize: 4,
        itemStyle: { color: '#8fb8ff' },
        tooltip: { formatter: '{b}' },
      },
    ],
  });
  chart.setOption(option());
  // Only the lines series changes after the first call, so the map's roam state is kept.
  const apply = (): void => {
    chart.setOption({ series: [(option().series as object[])[0]] });
  };

  if (bar) {
    select(bar, 'effect.symbol', Object.keys(SYMBOLS), (v) => {
      s.symbol = v;
      apply();
    }).value = s.symbol;
    slider(bar, 'trailLength', [0, 1, 0.05], s.trail, (v) => {
      s.trail = v;
      apply();
    });
    slider(bar, 'period (s)', [1, 12, 1], s.period, (v) => {
      s.period = v;
      apply();
    });
    select(bar, 'speed', ['by period', 'constant speed'], (v) => {
      s.speed = v;
      apply();
    });
    slider(bar, 'curveness', [0, 0.6, 0.05], s.curve, (v) => {
      s.curve = v;
      apply();
    });
    select(bar, 'end symbol', ENDS, (v) => {
      s.ends = v;
      apply();
    });
    select(bar, 'roundTrip', ['false', 'true'], (v) => {
      s.round = v;
      apply();
    });
  }

  // The preview has no controls, so it steps through symbols and trail lengths on a timer.
  const keys = Object.keys(SYMBOLS);
  let i = 0;
  const stop = ctx.preview
    ? every(2600, () => {
        i++;
        s.symbol = keys[i % keys.length]!;
        s.trail = [0.2, 0.6, 0.9][i % 3]!;
        s.curve = [0.2, 0.35][i % 2]!;
        apply();
      })
    : (): void => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
