// Legend styling: icon, itemGap, formatter, orient, align, selector buttons and a line break in data
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';

const NAMES = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'];
const ICONS = ['roundRect', 'circle', 'rect', 'triangle', 'diamond', 'pin', 'arrow', 'none'];
const FORMATTERS = ['none', 'template', 'function'];

interface Look {
  orient: 'horizontal' | 'vertical';
  icon: string;
  align: 'auto' | 'left' | 'right';
  itemGap: number;
  formatter: string;
  selector: boolean;
  selectorPosition: 'auto' | 'start' | 'end';
  wrap: boolean;
}

const DATA = NAMES.map((name, s) => ({
  name,
  type: 'line' as const,
  smooth: true,
  showSymbol: false,
  data: Array.from({ length: 12 }, (_, i) => Math.round(40 + s * 12 + 25 * Math.sin(i / 2 + s))),
}));

function build(look: Look): EChartsOption {
  const vertical = look.orient === 'vertical';
  // legend.data can name the items explicitly; '\n' is a line break between rows.
  const items = NAMES.flatMap((name, i) => (look.wrap && i === 3 ? ['\n', name] : [name]));
  return {
    legend: {
      data: items,
      orient: look.orient,
      // Horizontal legends sit at the bottom (the v6 default), vertical ones on the right.
      ...(vertical ? { right: 8, top: 'middle', bottom: 'auto' } : { left: 'center', bottom: 6 }),
      // icon: the marker shape; 'none' hides it. itemGap: space between entries.
      icon: look.icon,
      itemGap: look.itemGap,
      // align: marker on the left or right of the text.
      align: look.align,
      // formatter: a template with {name}, or a function of the name.
      formatter:
        look.formatter === 'template'
          ? 'Series {name}'
          : look.formatter === 'function'
            ? (name: string) => `${name.slice(0, 1)}.${name.slice(1).toLowerCase()}`
            : undefined,
      // selector: 'all' / 'inverse' buttons placed by selectorPosition.
      selector: look.selector ? [{ type: 'all', title: 'All' }, { type: 'inverse', title: 'Invert' }] : false,
      selectorPosition: look.selectorPosition,
      selectorItemGap: 7,
      selectorButtonGap: 14,
    },
    tooltip: { trigger: 'axis' },
    grid: { top: 16, left: 40, right: vertical ? 170 : 16, bottom: vertical ? 24 : look.wrap ? 100 : 76 },
    xAxis: { type: 'category', data: Array.from({ length: 12 }, (_, i) => `M${i + 1}`) },
    yAxis: { type: 'value' },
    series: DATA,
  };
}

const mount: Mount = (el, ctx) => {
  const look: Look = { orient: 'horizontal', icon: 'roundRect', align: 'auto', itemGap: 10, formatter: 'none', selector: false, selectorPosition: 'auto', wrap: false };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const show = (): void => {
    // The series stay the same but legend.data changes, so replace the whole option.
    chart.setOption(build(look), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1400, () => {
      i++;
      look.icon = ICONS[i % 7]!;
      look.itemGap = 6 + (i % 3) * 10;
      look.formatter = FORMATTERS[i % 3]!;
      look.selector = i % 2 === 0;
      show();
    });
  } else {
    select(bar!, 'orient', ['horizontal', 'vertical'], (v) => {
      look.orient = v as Look['orient'];
      show();
    });
    select(bar!, 'icon', ICONS, (v) => {
      look.icon = v;
      show();
    });
    select(bar!, 'align', ['auto', 'left', 'right'], (v) => {
      look.align = v as Look['align'];
      show();
    });
    select(bar!, 'formatter', FORMATTERS, (v) => {
      look.formatter = v;
      show();
    });
    select(bar!, 'selectorPosition', ['auto', 'start', 'end'], (v) => {
      look.selectorPosition = v as Look['selectorPosition'];
      show();
    });
    slider(bar!, 'itemGap', [0, 40, 1], look.itemGap, (v) => {
      look.itemGap = v;
      show();
    });
    const sel = button(bar!, 'selector: off', () => {
      look.selector = !look.selector;
      sel.textContent = `selector: ${look.selector ? 'on' : 'off'}`;
      show();
    });
    const wrap = button(bar!, 'line break: off', () => {
      look.wrap = !look.wrap;
      wrap.textContent = `line break: ${look.wrap ? 'on' : 'off'}`;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
