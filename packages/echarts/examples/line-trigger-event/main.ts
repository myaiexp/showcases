// series.triggerEvent on a line with an area: which element raises mouse events
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';

const cats = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
type Trigger = 'false' | 'true' | 'line' | 'area';

function build(trigger: Trigger, flash: boolean): EChartsOption {
  return {
    grid: { top: 24, left: 40, right: 16, bottom: 28 },
    xAxis: { type: 'category', data: cats, boundaryGap: false },
    yAxis: { type: 'value', min: 0, max: 40 },
    series: [
      {
        type: 'line',
        data: [12, 22, 15, 31, 24, 34, 20],
        symbolSize: 9,
        lineStyle: { width: 4 },
        areaStyle: { opacity: flash ? 0.7 : 0.35 },
        // triggerEvent: false, true (line and area), 'line' (stroke only) or 'area' (fill only).
        triggerEvent: trigger === 'false' ? false : trigger === 'true' ? true : trigger,
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let trigger: Trigger = 'true';
  const show = (flash = false): void => {
    chart.setOption(build(trigger, flash), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    // No pointer here, so the preview just pulses the fill and cycles the setting.
    const all: Trigger[] = ['true', 'line', 'area', 'false'];
    let n = 0;
    stop = every(900, () => {
      n += 1;
      trigger = all[Math.floor(n / 2) % 4]!;
      show(n % 2 === 1);
    });
  } else {
    const log = document.createElement('pre');
    log.style.cssText = 'margin:8px 0 0;padding:8px;min-height:7.5em;font-size:12px;overflow:auto;background:rgba(127,127,127,0.12)';
    log.textContent = 'Move over or click the chart.';
    const lines: string[] = [];
    const record = (type: string, p: { selfType?: string; seriesName?: string; dataIndex?: number }): void => {
      lines.unshift(`${type.padEnd(9)} selfType: ${p.selfType ?? '(none: a point symbol)'}${p.dataIndex === undefined ? '' : `  dataIndex: ${p.dataIndex}`}`);
      lines.length = Math.min(lines.length, 6);
      log.textContent = lines.join('\n');
    };
    const onClick = (p: unknown): void => record('click', p as never);
    const onOver = (p: unknown): void => record('mouseover', p as never);
    chart.on('click', onClick);
    chart.on('mouseover', onOver);
    select(bar!, 'triggerEvent', ['true', 'line', 'area', 'false'], (v) => {
      trigger = v as Trigger;
      show();
    });
    button(bar!, 'clear log', () => {
      lines.length = 0;
      log.textContent = '';
    });
    el.append(log);
    const off = stop;
    stop = () => {
      off();
      chart.off('click', onClick);
      chart.off('mouseover', onOver);
      log.remove();
    };
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
