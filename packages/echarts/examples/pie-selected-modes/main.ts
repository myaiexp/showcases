// Pie selection: selectedMode (single, multiple, series), selectedOffset and the select state style
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { SOURCES } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { mode: 'multiple', offset: 16, outline: true };
  const apply = (): void => {
    chart.setOption(
      {
        tooltip: { trigger: 'item' },
        legend: ctx.preview ? { show: false } : {},
        series: [
          {
            type: 'pie',
            radius: ctx.preview ? '65%' : '60%',
            center: ['50%', ctx.preview ? '50%' : '52%'],
            // Click a sector to select it: 'single' keeps one, 'multiple' many, 'series' selects them all together.
            selectedMode: look.mode === 'off' ? false : look.mode,
            // How far a selected sector slides out, in pixels.
            selectedOffset: look.offset,
            // The select state restyles selected sectors (also available per data item).
            select: { itemStyle: look.outline ? { borderColor: '#fff', borderWidth: 3 } : {} },
            label: { show: !ctx.preview },
            // data[i].selected starts a sector selected.
            data: SOURCES.map((d, i) => ({ ...d, selected: i === 0 })),
          },
        ],
      },
      true, // replace the old option, which also drops selections made in the previous mode
    );
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    // Toggle sectors with the toggleSelect action, as a click would.
    let n = 0;
    stop = every(900, () => {
      chart.dispatchAction({ type: 'toggleSelect', seriesIndex: 0, dataIndex: n % SOURCES.length });
      n += 1;
    });
  } else {
    select(bar!, 'selectedMode', ['multiple', 'single', 'series', 'off'], (v) => { look.mode = v; apply(); });
    slider(bar!, 'selectedOffset', [0, 40, 1], look.offset, (v) => { look.offset = v; apply(); });
    const outline = button(bar!, 'select.itemStyle border: on', () => {
      look.outline = !look.outline;
      outline.textContent = `select.itemStyle border: ${look.outline ? 'on' : 'off'}`;
      apply();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
