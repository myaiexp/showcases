// Polar axes: ring radius, angleAxis splitNumber and labels, splitArea, minorTick and radiusAxis label rotation
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, slider, button, every } from '../../shared/chart.ts';

// Points as [radius, angle in degrees]: two lobes on a circle, like a directional reading.
const DATA: [number, number][] = [];
for (let i = 0; i < 90; i++) {
  const angle = (i * 137.5) % 360;
  const lobe = 60 + 40 * Math.cos(((angle - 40) * Math.PI) / 180) + 25 * Math.cos(((angle - 220) * Math.PI) / 90);
  DATA.push([Math.round(Math.max(8, lobe + ((i * 7) % 11))), Math.round(angle)]);
}

interface Look { inner: number; splitNumber: number; inside: boolean; area: boolean; minor: boolean; rotate: number }

function build(look: Look, preview: boolean): EChartsOption {
  return {
    tooltip: { show: !preview },
    // polar.radius [inner, outer]: percentages of half the shorter canvas side; a non-zero inner makes a ring.
    polar: { radius: [`${look.inner}%`, '78%'], center: ['50%', '52%'] },
    angleAxis: {
      type: 'value',
      min: 0,
      max: 360,
      // splitNumber: recommended number of segments around the circle.
      splitNumber: look.splitNumber,
      // axisLabel.inside puts the labels inside the ring instead of outside it.
      axisLabel: { inside: look.inside, formatter: '{value}°', fontSize: preview ? 9 : 12 },
      splitArea: { show: look.area, areaStyle: { color: ['rgba(120,140,190,0.12)', 'rgba(120,140,190,0.02)'] } },
      minorTick: { show: look.minor, splitNumber: 3 },
      minorSplitLine: { show: look.minor, lineStyle: { color: 'rgba(255,255,255,0.08)' } },
    },
    radiusAxis: {
      type: 'value',
      min: 0,
      max: 120,
      splitNumber: 4,
      // rotate: tilts the radial labels; on a radiusAxis they run along the axis line.
      axisLabel: { rotate: look.rotate, fontSize: preview ? 9 : 11, show: !preview },
    },
    series: [{ type: 'scatter', coordinateSystem: 'polar', symbolSize: preview ? 6 : 9, data: DATA }],
  };
}

const mount: Mount = (el, ctx) => {
  const look: Look = { inner: 20, splitNumber: 12, inside: false, area: true, minor: false, rotate: 0 };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1500, () => {
      i++;
      look.inner = [0, 25, 45][i % 3]!;
      look.splitNumber = [12, 8, 6, 4][i % 4]!;
      look.inside = i % 4 >= 2;
      look.minor = i % 2 === 0;
      show();
    });
  } else {
    slider(bar!, 'inner radius %', [0, 60, 1], look.inner, (v) => {
      look.inner = v;
      show();
    });
    slider(bar!, 'angleAxis splitNumber', [2, 24, 1], look.splitNumber, (v) => {
      look.splitNumber = v;
      show();
    });
    slider(bar!, 'radius label rotate', [-90, 90, 15], look.rotate, (v) => {
      look.rotate = v;
      show();
    });
    const ins = button(bar!, 'angle labels inside: off', () => {
      look.inside = !look.inside;
      ins.textContent = `angle labels inside: ${look.inside ? 'on' : 'off'}`;
      show();
    });
    const area = button(bar!, 'splitArea: on', () => {
      look.area = !look.area;
      area.textContent = `splitArea: ${look.area ? 'on' : 'off'}`;
      show();
    });
    const minor = button(bar!, 'minorTick: off', () => {
      look.minor = !look.minor;
      minor.textContent = `minorTick: ${look.minor ? 'on' : 'off'}`;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
