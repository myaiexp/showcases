// toolbox custom tools (names starting with my) and a dataView built by optionToContent / contentToOption
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { seeded } from '../../shared/interaction-data.ts';

const TEAMS = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
const rand = seeded(51);
const draw = (): number[] => TEAMS.map(() => Math.round(20 + rand() * 70));

const SHUFFLE = 'path://M0,2h6l4,6l4,-6h6v2h-5l-4,6l4,6h5v2h-6l-4,-6l-4,6h-6v-2h5l4,-6l-4,-6h-5z';
const SORT = 'path://M2,4h18v3h-18z M2,10h13v3h-13z M2,16h8v3h-8z';

interface Look { content: string; readOnly: boolean; lang: string }

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let planned = draw();
  let actual = draw();
  const look: Look = { content: 'custom table', readOnly: false, lang: 'default' };

  const build = (): EChartsOption => ({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: {},
    grid: { top: 48, left: 40, right: 20, bottom: 56 },
    toolbox: {
      feature: {
        // Names that start with "my" are user-defined tools: an icon path, a title, an onclick.
        myShuffle: {
          show: true,
          title: 'Draw new numbers',
          icon: SHUFFLE,
          onclick: () => {
            planned = draw();
            actual = draw();
            show();
          },
        },
        mySort: {
          show: true,
          title: 'Sort teams by planned',
          icon: SORT,
          onclick: () => {
            const order = TEAMS.map((_, i) => i).sort((a, b) => planned[b]! - planned[a]!);
            const apply = <T,>(xs: T[]): T[] => order.map((i) => xs[i]!);
            TEAMS.splice(0, TEAMS.length, ...apply(TEAMS));
            planned = apply(planned);
            actual = apply(actual);
            show();
          },
        },
        dataView: {
          show: true,
          readOnly: look.readOnly,
          lang: look.lang === 'default' ? ['data view', 'turn off', 'refresh'] : ['Numbers', 'Close', 'Apply'],
          backgroundColor: '#1d2733',
          textColor: '#dde',
          buttonColor: '#2f6fb0',
          // optionToContent and contentToOption come as a pair: the first shows the data, the second reads it back.
          ...(look.content === 'custom table' ? { optionToContent, contentToOption } : {}),
        },
      },
    },
    xAxis: { type: 'category', data: TEAMS },
    yAxis: { type: 'value' },
    series: [
      { name: 'Planned', type: 'bar', data: planned },
      { name: 'Actual', type: 'bar', data: actual },
    ],
  });

  // A table of editable numbers. The option passed in is the chart's current option.
  function optionToContent(opt: Record<string, unknown>): HTMLElement {
    const axis = (opt.xAxis as { data: string[] }[])[0]!.data;
    const series = opt.series as { name: string; data: number[] }[];
    const table = document.createElement('table');
    table.style.cssText = 'width:100%;text-align:center';
    const head = table.insertRow();
    for (const h of ['Team', ...series.map((s) => s.name)]) head.insertCell().textContent = h;
    axis.forEach((team, i) => {
      const row = table.insertRow();
      row.insertCell().textContent = team; // textContent escapes; innerHTML strings would need encodeHTML
      for (const s of series) {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = String(s.data[i]);
        input.disabled = look.readOnly;
        input.style.width = '5em';
        row.insertCell().append(input);
      }
    });
    return table;
  }

  function contentToOption(view: HTMLDivElement): { series: { data: number[] }[] } {
    const rows = [...view.querySelectorAll('tr')].slice(1);
    const columns = [0, 1].map((col) => rows.map((r) => Number(r.querySelectorAll('input')[col]!.value)));
    // Keep the example's own arrays in step, so the next shuffle or sort starts from the edited numbers.
    planned = columns[0]!;
    actual = columns[1]!;
    return { series: columns.map((data) => ({ data })) };
  }

  const show = (): void => {
    chart.setOption(build());
  };
  show();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'dataView content', ['custom table', 'default textarea'], (v) => {
      look.content = v;
      show();
    });
    const ro = button(bar, 'readOnly: off', () => {
      look.readOnly = !look.readOnly;
      ro.textContent = 'readOnly: ' + (look.readOnly ? 'on' : 'off');
      show();
    });
    select(bar, 'dataView lang', ['default', 'custom'], (v) => {
      look.lang = v;
      show();
    });
    const hint = document.createElement('span');
    hint.textContent = 'Toolbox icons: shuffle, sort, data view. Edit a number in the table and press the refresh button.';
    bar.append(hint);
  } else {
    // What the shuffle tool does, on a timer.
    stop = every(1800, () => {
      planned = draw();
      actual = draw();
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
