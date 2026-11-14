// Three titles on one chart: subtext, link targets, and textAlign around an anchor line
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';

type Align = 'auto' | 'left' | 'center' | 'right';
const ALIGNS: Align[] = ['left', 'center', 'right', 'auto'];

function build(align: Align, itemGap: number, preview: boolean): EChartsOption {
  return {
    // title can be an array: each entry is an independent title box.
    title: [
      {
        text: 'Weekly traffic',
        // subtext is the second line, with its own style and its own link (sublink).
        subtext: preview ? 'sublink opens a page' : 'Click the title or the subtext: link and sublink open pages',
        link: 'https://echarts.apache.org/en/option.html#title',
        // target: 'self' opens in the current window, 'blank' in a new one.
        target: 'blank',
        sublink: 'https://echarts.apache.org/en/option.html#title.sublink',
        subtarget: 'blank',
        left: 8,
        top: 4,
        textStyle: { fontSize: preview ? 14 : 18 },
        subtextStyle: { color: '#7ea6e0', fontSize: 11 },
        itemGap,
      },
      {
        text: 'Anchored at 50%',
        subtext: `textAlign: ${align}`,
        // The left value places the anchor point; textAlign says which edge of the text sits on it.
        left: '50%',
        top: preview ? '38%' : '30%',
        // 'auto' is documented but missing from the type definitions, hence the cast.
        textAlign: align as 'left',
        textStyle: { fontSize: 15 },
        subtextStyle: { fontSize: 12, color: '#e6a23c' },
        itemGap,
        // padding is the space inside the title box; the border makes the box visible.
        padding: [6, 10],
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        text: 'Right corner',
        subtext: 'right: 8',
        right: 8,
        top: 4,
        // textAlign 'right' keeps both lines flush with the right edge.
        textAlign: 'right',
        textStyle: { fontSize: 13, color: '#91cc75' },
        subtextStyle: { fontSize: 11 },
        itemGap,
      },
    ],
    // A thin line at the 50% anchor so the effect of textAlign can be read off.
    graphic: [
      {
        type: 'rect',
        left: '50%',
        top: 0,
        shape: { width: 1, height: 400 },
        style: { fill: 'rgba(255,255,255,0.35)' },
        silent: true,
      },
    ],
    grid: { top: preview ? '62%' : '52%', left: 40, right: 16, bottom: 30 },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    yAxis: { type: 'value', splitNumber: 2 },
    series: [{ type: 'line', smooth: true, data: [120, 200, 150, 260, 190], areaStyle: {} }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let align: Align = 'left';
  let gap = 10;
  const show = (): void => {
    chart.setOption(build(align, gap, ctx.preview));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1500, () => {
      align = ALIGNS[++i % 3]!;
      show();
    });
  } else {
    select(bar!, 'textAlign', ALIGNS, (v) => {
      align = v as Align;
      show();
    });
    slider(bar!, 'itemGap', [0, 30, 1], gap, (v) => {
      gap = v;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
