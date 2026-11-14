// series.lineStyle: type / dashOffset / cap / join / miterLimit / shadow
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';

interface Look {
  type: string;
  dashOffset: number;
  cap: 'butt' | 'round' | 'square';
  join: 'bevel' | 'round' | 'miter';
  miterLimit: number;
  width: number;
  shadow: number;
}

const DASHES: Record<string, string | number[]> = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  '[10, 4, 2, 4]': [10, 4, 2, 4],
};

function build(look: Look, preview: boolean): EChartsOption {
  return {
    grid: { top: 20, left: 24, right: 24, bottom: 20 },
    xAxis: { type: 'category', data: ['a', 'b', 'c', 'd', 'e', 'f', 'g'], show: false },
    yAxis: { type: 'value', min: 0, max: 10, show: false },
    animation: !preview || look.dashOffset === 0,
    series: [
      {
        type: 'line',
        data: [2, 8, 2, 8, 2, 8, 2],
        showSymbol: false,
        lineStyle: {
          width: look.width,
          color: '#5470c6',
          // type: 'solid' | 'dashed' | 'dotted', or a dash array like [10, 4]; dashOffset shifts the pattern.
          type: DASHES[look.type] as never,
          dashOffset: look.dashOffset,
          // cap: how line ends are drawn; join: how segments meet (miterLimit applies to 'miter').
          cap: look.cap,
          join: look.join,
          miterLimit: look.miterLimit,
          // Shadow needs shadowBlur plus a colour; offsets move it.
          shadowBlur: look.shadow,
          shadowColor: 'rgba(0, 0, 0, 0.8)',
          shadowOffsetX: look.shadow / 2,
          shadowOffsetY: look.shadow / 2,
        },
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { type: 'dashed', dashOffset: 0, cap: 'butt', join: 'bevel', miterLimit: 10, width: 14, shadow: 0 };
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    // Marching dashes: dashOffset changes every frame-ish; redrawing without animation keeps it smooth.
    Object.assign(look, { type: '[10, 4, 2, 4]', cap: 'round', join: 'round', shadow: 10, width: 12, dashOffset: 1 });
    stop = every(80, () => {
      look.dashOffset = (look.dashOffset + 1) % 36;
      show();
    });
  } else {
    select(bar!, 'type', Object.keys(DASHES), (v) => {
      look.type = v;
      show();
    }).value = look.type;
    slider(bar!, 'dashOffset', [0, 40, 1], 0, (v) => {
      look.dashOffset = v;
      show();
    });
    select(bar!, 'cap', ['butt', 'round', 'square'], (v) => {
      look.cap = v as Look['cap'];
      show();
    });
    select(bar!, 'join', ['bevel', 'round', 'miter'], (v) => {
      look.join = v as Look['join'];
      show();
    });
    slider(bar!, 'miterLimit', [1, 20, 1], 10, (v) => {
      look.miterLimit = v;
      show();
    });
    slider(bar!, 'width', [2, 30, 1], look.width, (v) => {
      look.width = v;
      show();
    });
    slider(bar!, 'shadowBlur', [0, 30, 1], 0, (v) => {
      look.shadow = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
