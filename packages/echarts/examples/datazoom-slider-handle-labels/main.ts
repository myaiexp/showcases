// dataZoom slider appearance: handleIcon, handleSize, handle labels, labelFormatter, showDetail, data shadow
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { walk } from '../../shared/line-data.ts';

const N = 200;
const days = Array.from({ length: N }, (_, i) => new Date(Date.UTC(2026, 0, 1 + i)).toISOString().slice(0, 10));
const values = walk(N, 14, 100, 6);

const ICONS: Record<string, string | undefined> = {
  default: undefined,
  diamond: 'path://M5,0L10,5L5,10L0,5z',
  circle: 'path://M5,0a5,5 0 1,0 0.01,0z',
  triangle: 'path://M5,0L10,10L0,10z',
};

interface Look {
  icon: string;
  handleSize: number;
  detail: boolean;
  handleLabel: boolean;
  format: string;
  shadow: string;
  realtime: boolean;
  start: number;
  end: number;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 420 });
  const look: Look = { icon: 'diamond', handleSize: 80, detail: true, handleLabel: true, format: 'month-day', shadow: 'auto', realtime: true, start: 20, end: 50 };

  const apply = (): void => {
    chart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { top: 16, left: 44, right: 20, bottom: 80 },
      xAxis: { type: 'category', data: days },
      yAxis: { type: 'value', scale: true },
      dataZoom: [
        {
          type: 'slider',
          start: look.start,
          end: look.end,
          bottom: ctx.preview ? 4 : 20,
          height: 32,
          // handleIcon takes a path:// string; handleSize is pixels or a percent of the bar width.
          // For the built-in icon the key is left out: an explicit undefined replaces the
          // default icon and the slider throws.
          ...(ICONS[look.icon] ? { handleIcon: ICONS[look.icon] } : {}),
          handleSize: look.handleSize + '%',
          handleStyle: { color: '#5fb4ff', borderColor: '#fff', borderWidth: 1 },
          // showDetail: labels with the window edges while dragging; handleLabel (5.6) keeps them visible.
          showDetail: look.detail,
          handleLabel: { show: look.handleLabel },
          // labelFormatter(value, valueStr): on a category axis, value is the category index.
          labelFormatter: look.format === 'month-day' ? (_v: number, s: string) => s.slice(5) : look.format === 'index' ? (v: number) => '#' + v : undefined,
          // showDataShadow: the miniature of the data behind the bar; selectedDataBackground is the part inside the window.
          showDataShadow: look.shadow === 'auto' ? 'auto' : look.shadow === 'true',
          dataBackground: { lineStyle: { color: '#888' }, areaStyle: { color: '#555', opacity: 0.4 } },
          selectedDataBackground: { lineStyle: { color: '#5fb4ff' }, areaStyle: { color: '#5fb4ff', opacity: 0.4 } },
          fillerColor: 'rgba(95, 180, 255, 0.18)',
          // realtime: false redraws the chart only when the drag ends.
          realtime: look.realtime,
        },
        { type: 'inside', start: look.start, end: look.end },
      ],
      series: [{ type: 'line', data: values, showSymbol: false, areaStyle: { opacity: 0.12 } }],
      // notMerge: each apply is the whole option, so a removed handleIcon falls back to the default.
    }, true);
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'handleIcon', Object.keys(ICONS), (v) => {
      look.icon = v;
      apply();
    });
    slider(bar, 'handleSize %', [40, 200, 10], look.handleSize, (v) => {
      look.handleSize = v;
      apply();
    });
    select(bar, 'labelFormatter', ['month-day', 'index', 'default'], (v) => {
      look.format = v;
      apply();
    });
    select(bar, 'showDataShadow', ['auto', 'true', 'false'], (v) => {
      look.shadow = v;
      apply();
    });
    const d = button(bar, 'showDetail: on', () => {
      look.detail = !look.detail;
      d.textContent = 'showDetail: ' + (look.detail ? 'on' : 'off');
      apply();
    });
    const h = button(bar, 'handleLabel: on', () => {
      look.handleLabel = !look.handleLabel;
      h.textContent = 'handleLabel: ' + (look.handleLabel ? 'on' : 'off');
      apply();
    });
    const r = button(bar, 'realtime: on', () => {
      look.realtime = !look.realtime;
      r.textContent = 'realtime: ' + (look.realtime ? 'on' : 'off');
      apply();
    });
  } else {
    let start = 0;
    let dir = 1;
    stop = every(1000, () => {
      start += dir * 6;
      if (start > 60 || start < 0) dir = -dir;
      chart.dispatchAction({ type: 'dataZoom', start, end: start + 30 });
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
