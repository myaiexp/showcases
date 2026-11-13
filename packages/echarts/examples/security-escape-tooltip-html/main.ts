// A tooltip formatter fed user-typed names: raw HTML, encodeHTML-escaped, and the safe string template
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every, echarts } from '../../shared/chart.ts';

// Names as a user might have typed them. Only inert markup is used here, but it shows the risk:
// a real attacker would put a script-carrying attribute in the same place.
const entries: [string, number][] = [
  ['Plain name', 40],
  ['<b style="color:#ee6666;font-size:22px">Injected style</b>', 62],
  ['5 < 7 & 7 > 5', 35],
  ['"quoted" & \'single\'', 51],
];

type Mode = 'raw HTML (unsafe)' | 'encodeHTML (safe)' | 'string template (safe)';

function build(mode: Mode): EChartsOption {
  const formatter: NonNullable<EChartsOption['tooltip']> =
    mode === 'string template (safe)'
      ? // A plain string is a template filled in internally: safe from injection.
        { formatter: '{b}: <b>{c}</b>' }
      : {
          formatter: (params) => {
            const p = params as { name: string; value: number };
            // Incorrect: the name goes into the HTML as is. Correct: escape it first.
            const name = mode === 'encodeHTML (safe)' ? echarts.format.encodeHTML(p.name) : p.name;
            return `${name}: <b>${p.value}</b>`;
          },
        };
  return {
    tooltip: { trigger: 'item', ...formatter },
    grid: { top: 24, left: 44, right: 16, bottom: 36 },
    xAxis: { type: 'category', data: ['A', 'B', 'C', 'D'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: entries.map(([name, value]) => ({ name, value })) }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const modes: Mode[] = ['raw HTML (unsafe)', 'encodeHTML (safe)', 'string template (safe)'];
  let mode: Mode = 'encodeHTML (safe)';
  const show = (): void => {
    chart.setOption(build(mode));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    // Cycle the formatter and show the tooltip on the injected name through dispatchAction.
    let i = 0;
    stop = every(2000, () => {
      i += 1;
      mode = modes[i % 3]!;
      show();
      chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: 1 });
    });
  } else {
    select(bar!, 'formatter', modes, (v) => { mode = v as Mode; show(); });
    const note = document.createElement('span');
    note.textContent = 'Hover the second bar: its name contains markup.';
    bar!.append(note);
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
