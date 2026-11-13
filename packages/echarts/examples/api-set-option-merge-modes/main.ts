// One partial option applied under each setOption mode, with getOption and event counts as a readout
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const rand = (): number[] => days.map(() => Math.round(20 + Math.random() * 60));

function base(): EChartsOption {
  return {
    title: { text: 'Base option', left: 'center', textStyle: { fontSize: 13 } },
    legend: { bottom: 0 },
    tooltip: { trigger: 'axis' },
    grid: { top: 36, left: 40, right: 16, bottom: 44 },
    xAxis: { type: 'category', data: days },
    yAxis: { type: 'value' },
    series: [
      { id: 'a', name: 'A', type: 'line', data: rand() },
      { id: 'b', name: 'B', type: 'line', data: rand() },
      { id: 'c', name: 'C', type: 'line', data: rand() },
    ],
  };
}

// Only series 'b' is described, plus the axes so that the chart stays drawable after a notMerge.
function partial(): EChartsOption {
  return {
    xAxis: { type: 'category', data: days },
    yAxis: { type: 'value' },
    series: [{ id: 'b', name: 'B', type: 'line', data: rand(), lineStyle: { width: 5 } }],
  };
}

type Mode = 'merge (default)' | 'notMerge: true' | "replaceMerge: ['series']";

const mount: Mount = (el, ctx) => {
  // Pending one-shot timeouts, cleared on unmount with everything else.
  const timeouts = new Set<number>();
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const counts = { rendered: 0, finished: 0 };
  chart.on('rendered', () => { counts.rendered += 1; });
  chart.on('finished', () => { counts.finished += 1; });
  chart.setOption(base());

  const apply = (mode: Mode, lazyUpdate: boolean, silent: boolean): void => {
    const opts = {
      notMerge: mode === 'notMerge: true',
      replaceMerge: mode === "replaceMerge: ['series']" ? ['series'] : undefined,
      lazyUpdate,
      silent,
    };
    chart.setOption(partial(), opts);
  };

  let stop = (): void => {};
  if (ctx.preview) {
    const modes: Mode[] = ['merge (default)', 'notMerge: true', "replaceMerge: ['series']"];
    let step = 0;
    stop = every(1100, () => {
      step += 1;
      // Odd steps restore the base chart, even steps apply one mode.
      if (step % 2) chart.setOption(base(), true);
      else apply(modes[(step / 2 - 1) % 3]!, false, false);
    });
  } else {
    let mode: Mode = 'merge (default)';
    let lazy = false;
    let silent = false;
    const log = document.createElement('pre');
    log.style.cssText = 'margin:8px 0 0;font-size:12px;white-space:pre-wrap';
    const report = (when: string): void => {
      // getOption returns undefined until a first setOption, and every component as an array.
      const opt = chart.getOption() as { series?: { id?: string }[]; title?: { text?: string }[] } | undefined;
      const ids = (opt?.series ?? []).map((s) => s.id ?? '?').join(', ') || 'none';
      log.textContent = `${when}\ngetOption series: ${ids}\ntitle: ${opt?.title?.[0]?.text ?? '(none)'}\nrendered events: ${counts.rendered}, finished events: ${counts.finished}`;
    };
    select(bar!, 'merge mode', ['merge (default)', 'notMerge: true', "replaceMerge: ['series']"], (v) => { mode = v as Mode; });
    select(bar!, 'lazyUpdate', ['false', 'true'], (v) => { lazy = v === 'true'; });
    select(bar!, 'silent', ['false', 'true'], (v) => { silent = v === 'true'; });
    button(bar!, 'apply partial option (series b only)', () => {
      apply(mode, lazy, silent);
      report(`applied: ${mode}, lazyUpdate ${lazy}, silent ${silent} (read right after the call)`);
      // With lazyUpdate the chart refreshes on the next frame; read again after it.
      timeouts.add(window.setTimeout(() => { if (!chart.isDisposed()) report(`after a moment: ${mode}`); }, 1200));
    });
    button(bar!, 'reset base option', () => {
      chart.setOption(base(), true);
      report('reset: notMerge with the base option');
    });
    report('base option applied');
    el.append(log);
  }

  return () => {
    for (const t of timeouts) window.clearTimeout(t);
    stop();
    dispose();
  };
};

export default mount;
