// A pie without data: showEmptyCircle draws a placeholder ring, emptyCircleStyle restyles it
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { SOURCES } from '../../shared/pie-data.ts';

const styles: Record<string, object> = {
  'default gray': {},
  'outline only': { color: 'transparent', borderColor: '#8a8f98', borderWidth: 2 },
  'dashed outline': { color: 'transparent', borderColor: '#e0b050', borderWidth: 2, borderType: 'dashed' },
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { empty: true, show: true, style: 'outline only' };
  const apply = (): void => {
    chart.setOption(
      {
        title: ctx.preview ? undefined : { text: look.empty ? 'No data yet' : 'Traffic sources', left: 'center', textStyle: { fontSize: 14 } },
        series: [
          {
            type: 'pie',
            radius: ['35%', '65%'],
            center: ['50%', '52%'],
            // With empty data a placeholder circle is drawn unless showEmptyCircle is false.
            showEmptyCircle: look.show,
            emptyCircleStyle: styles[look.style],
            label: { show: !ctx.preview },
            data: look.empty ? [] : SOURCES,
          },
        ],
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    // Alternate between a styled empty ring, a filled pie and the default gray circle.
    const frames = [
      { empty: true, style: 'outline only' },
      { empty: false, style: 'outline only' },
      { empty: true, style: 'dashed outline' },
      { empty: true, style: 'default gray' },
    ];
    let n = 0;
    stop = every(1500, () => {
      n += 1;
      const f = frames[n % frames.length]!;
      look.empty = f.empty;
      look.style = f.style;
      apply();
    });
  } else {
    const data = button(bar!, 'data: empty', () => {
      look.empty = !look.empty;
      data.textContent = `data: ${look.empty ? 'empty' : 'five sources'}`;
      apply();
    });
    const show = button(bar!, 'showEmptyCircle: true', () => {
      look.show = !look.show;
      show.textContent = `showEmptyCircle: ${look.show}`;
      apply();
    });
    select(bar!, 'emptyCircleStyle', Object.keys(styles), (v) => { look.style = v; apply(); }).value = look.style;
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
