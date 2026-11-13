// Gauge pointer.icon and anchor.icon: built-in shapes and an SVG path, with offsetCenter and keepAspect
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

// An SVG path for a compass-needle style pointer (icons accept 'path://' data).
const NEEDLE = 'path://M2.5,0 L5,24 L2.5,20 L0,24 Z';
const ICONS: Record<string, string> = { default: '', arrow: 'arrow', triangle: 'triangle', diamond: 'diamond', pin: 'pin', path: NEEDLE };
const ANCHORS = ['default', 'circle', 'rect', 'roundRect', 'diamond', 'triangle'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  let pointer = 'path';
  let anchor = 'circle';
  let keepAspect = true;
  let above = true;
  let value = 40;

  const show = (): void => {
    chart.setOption({
      series: [
        {
          type: 'gauge',
          radius: ctx.preview ? '95%' : '82%',
          axisLine: { lineStyle: { width: 10 } },
          splitLine: { distance: 2, length: 8 },
          axisTick: { distance: 2 },
          axisLabel: { distance: 18, fontSize: ctx.preview ? 9 : 12 },
          pointer: {
            // icon: a built-in name, an 'image://' URL or a 'path://' SVG path; the icon is
            // stretched to pointer.width x pointer.length unless keepAspect keeps its ratio.
            ...(ICONS[pointer] ? { icon: ICONS[pointer] } : {}),
            width: pointer === 'path' ? 16 : 10,
            length: '70%',
            keepAspect,
            // showAbove: draw the pointer above the title and detail text.
            showAbove: above,
            itemStyle: { color: '#fac858' },
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 22,
            ...(anchor === 'default' ? {} : { icon: anchor }),
            // The anchor is its own shape; offsetCenter moves it away from the dial centre.
            offsetCenter: [0, 0],
            itemStyle: { color: '#222', borderColor: '#fac858', borderWidth: 3 },
          },
          title: { offsetCenter: [0, '30%'], fontSize: 14 },
          detail: { valueAnimation: true, offsetCenter: [0, '58%'], fontSize: ctx.preview ? 20 : 28 },
          data: [{ value, name: 'Heading' }],
        },
      ],
    });
  };
  show();

  const PREVIEW_STEPS = [['arrow', 'circle'], ['path', 'diamond'], ['triangle', 'roundRect'], ['pin', 'default']] as const;
  let step = 0;
  const stop = every(ctx.preview ? 1800 : 3000, () => {
    value = Math.round(5 + Math.random() * 90);
    if (ctx.preview) {
      [pointer, anchor] = PREVIEW_STEPS[++step % PREVIEW_STEPS.length]!;
      show();
    } else {
      chart.setOption({ series: [{ data: [{ value, name: 'Heading' }] }] });
    }
  });
  if (bar) {
    select(bar, 'pointer.icon', Object.keys(ICONS), (v) => {
      pointer = v;
      show();
    });
    select(bar, 'anchor.icon', ANCHORS, (v) => {
      anchor = v;
      show();
    });
    select(bar, 'pointer.keepAspect', ['true', 'false'], (v) => {
      keepAspect = v === 'true';
      show();
    }).value = 'true';
    select(bar, 'pointer.showAbove', ['true', 'false'], (v) => {
      above = v === 'true';
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
