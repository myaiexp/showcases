// Text in renderItem: textContent with textConfig.position on a circle, plus a plain text element with overflow and width
import type { CustomSeriesRenderItem } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const CITIES: [string, number, number, number][] = [
  ['Northern Archipelago', 12, 30, 42],
  ['Grand River Delta', 28, 65, 58],
  ['Old Harbour District', 45, 40, 36],
  ['Saint-Clair-sur-Mer', 60, 78, 50],
  ['Upper Valley Heights', 75, 28, 64],
  ['East Marsh', 88, 58, 30],
];
const POSITIONS = ['bottom', 'right', 'left', 'inside', 'insideBottom'] as const;
const OVERFLOWS = ['truncate', 'break', 'breakAll', 'none'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 400 });
  let position: (typeof POSITIONS)[number] = 'bottom';
  let overflow: (typeof OVERFLOWS)[number] = 'truncate';
  let width = 70;
  let ellipsis = '...';

  /** Data is [x, y, size, name index]; the name comes from CITIES by params.dataIndex. */
  const renderItem: CustomSeriesRenderItem = (params, api) => {
    const [x, y] = api.coord([api.value(0), api.value(1)]) as [number, number];
    const r = (api.value(2) as number) / 2 + 4;
    const color = api.visual('color') as string;
    const name = CITIES[params.dataIndex]![0];
    return {
      type: 'group',
      children: [
        {
          type: 'circle',
          shape: { cx: x, cy: y, r },
          style: { fill: color, opacity: 0.8 },
          // textContent is a text block attached to this circle; textConfig.position places it
          // relative to the circle. Its style takes the text props (width, overflow, ellipsis).
          textContent: {
            type: 'text',
            style: {
              text: name,
              fill: '#fff',
              font: api.font({ fontSize: ctx.preview ? 9 : 12 }),
              width,
              overflow,
              ellipsis,
            },
          },
          textConfig: { position },
        },
        // A standalone text element: the value, drawn above the circle at its own x and y.
        { type: 'text', style: { text: String(api.value(2)), x: x - 8, y: y - r - 16, fill: '#ddd', font: api.font({ fontSize: 11, fontWeight: 'bold' }) } },
      ],
    };
  };

  const show = (): void => {
    chart.setOption({
      grid: { top: 30, left: 36, right: 30, bottom: ctx.preview ? 24 : 40 },
      xAxis: { type: 'value', min: 0, max: 100 },
      yAxis: { type: 'value', min: 0, max: 100 },
      series: [{ type: 'custom', renderItem, colorBy: 'data', encode: { x: 0, y: 1, tooltip: [0, 1, 2] }, data: CITIES.map((c) => c.slice(1)) }],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => {
      i++;
      position = POSITIONS[i % POSITIONS.length]!;
      overflow = OVERFLOWS[i % 2]!;
      show();
    });
  } else {
    select(bar!, 'textConfig.position', POSITIONS, (v) => {
      position = v as typeof position;
      show();
    }).value = position;
    select(bar!, 'overflow', OVERFLOWS, (v) => {
      overflow = v as typeof overflow;
      show();
    });
    slider(bar!, 'width', [30, 160, 10], width, (v) => {
      width = v;
      show();
    });
    select(bar!, 'ellipsis', ['...', '~', ' (more)'], (v) => {
      ellipsis = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
