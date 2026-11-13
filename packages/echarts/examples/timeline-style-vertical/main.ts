// timeline styled and re-laid out: orient, inverse, controlPosition, label position, checkpointStyle, rewind
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, select, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/interaction-data.ts';

const YEARS = ['2022', '2023', '2024', '2025', '2026'];
const KINDS = ['Search', 'Social', 'Email', 'Direct'];
const rand = seeded(71);
const shares = YEARS.map(() => KINDS.map(() => Math.round(10 + rand() * 60)));

interface Look {
  orient: 'horizontal' | 'vertical';
  controls: 'start' | 'end';
  labelPosition: string;
  inverse: boolean;
  rewind: boolean;
  interval: number;
  symbol: string;
}

function build(look: Look, preview: boolean, currentIndex: number): EChartsOption {
  const vertical = look.orient === 'vertical';
  const timeline = {
    axisType: 'category',
    orient: look.orient,
    // inverse: runs the axis backwards; a vertical timeline usually reads top to bottom.
    inverse: look.inverse,
    // controlPosition: where the play/prev/next buttons sit; its values depend on the orientation.
    controlPosition: vertical ? (look.controls === 'start' ? 'top' : 'bottom') : look.controls === 'start' ? 'left' : 'right',
    currentIndex,
    autoPlay: true,
    playInterval: look.interval,
    loop: true,
    // rewind: after playing to the end, go back instead of wrapping around.
    rewind: look.rewind,
    // data items can be objects: here each year has its own tooltip text.
    data: YEARS.map((y) => ({ value: y, tooltip: { formatter: 'Traffic mix in ' + y } })),
    label: { position: look.labelPosition === 'auto' ? 'auto' : Number(look.labelPosition), color: '#ccc', fontSize: preview ? 10 : 12 },
    lineStyle: { color: '#667', width: 2 },
    itemStyle: { color: '#889' },
    // checkpointStyle: the marker of the current frame; progress styles the part already played.
    checkpointStyle: { symbol: look.symbol, symbolSize: 18, color: '#fac858', borderColor: '#fff', borderWidth: 1 },
    progress: { lineStyle: { color: '#fac858' }, itemStyle: { color: '#fac858' } },
    controlStyle: { show: !preview, itemSize: 20, itemGap: 10, color: '#aab', borderColor: '#aab' },
    ...(vertical
      ? { right: 8, top: preview ? 8 : 20, bottom: preview ? 8 : 20, width: preview ? 48 : 64 }
      : { left: 24, right: 24, bottom: 6, height: 56 }),
  };
  return {
    baseOption: {
      timeline,
      tooltip: {},
      legend: { show: !preview, left: 12, top: 8, orient: 'vertical' },
      series: [
        {
          name: 'Share',
          type: 'pie',
          radius: ['32%', '62%'],
          center: vertical ? ['42%', '50%'] : ['50%', '44%'],
          label: { formatter: '{b}: {c}' },
        },
      ],
    },
    options: YEARS.map((y, i) => ({
      title: { text: 'Traffic sources, ' + y, left: 'center', top: 4, textStyle: { fontSize: preview ? 12 : 15 } },
      series: [{ data: KINDS.map((name, k) => ({ name, value: shares[i]![k]! })) }],
    })),
  } as unknown as EChartsOption;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  const look: Look = {
    orient: 'vertical',
    controls: 'start',
    labelPosition: 'auto',
    inverse: true,
    rewind: false,
    interval: ctx.preview ? 1100 : 1800,
    symbol: 'diamond',
  };
  // A rebuild would restart the frame; read the current one first so the playback continues.
  // getOption() returns undefined until the first setOption, hence the optional chain.
  const show = (): void => {
    const tl = (chart.getOption() as { timeline?: { currentIndex?: number }[] } | undefined)?.timeline?.[0];
    chart.setOption(build(look, ctx.preview, tl?.currentIndex ?? 0), true);
  };
  show();

  if (bar) {
    select(bar, 'orient', ['vertical', 'horizontal'], (v) => {
      look.orient = v as Look['orient'];
      show();
    });
    select(bar, 'controlPosition', ['start', 'end'], (v) => {
      look.controls = v as Look['controls'];
      show();
    });
    select(bar, 'label.position', ['auto', '8', '-30'], (v) => {
      look.labelPosition = v;
      show();
    });
    select(bar, 'checkpointStyle.symbol', ['diamond', 'circle', 'pin', 'arrow'], (v) => {
      look.symbol = v;
      show();
    });
    slider(bar, 'playInterval ms', [600, 3000, 200], look.interval, (v) => {
      look.interval = v;
      show();
    });
    const inv = button(bar, 'inverse: on', () => {
      look.inverse = !look.inverse;
      inv.textContent = 'inverse: ' + (look.inverse ? 'on' : 'off');
      show();
    });
    const rw = button(bar, 'rewind: off', () => {
      look.rewind = !look.rewind;
      rw.textContent = 'rewind: ' + (look.rewind ? 'on' : 'off');
      show();
    });
  }

  return () => dispose();
};

export default mount;
