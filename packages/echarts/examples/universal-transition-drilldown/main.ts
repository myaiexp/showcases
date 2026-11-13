// Drill down and back up a bar chart; universalTransition splits and merges the bars
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';
import { LEVELS, PARENT } from './data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let group = 'things';
  let kind: 'bar' | 'pie' = 'bar';

  const show = (next: string): void => {
    group = next;
    const data = LEVELS[group]!;
    chart.setOption(
      {
        title: ctx.preview ? undefined : { text: group, subtext: group === 'things' ? 'click a bar to drill down' : 'click the background to go up' },
        tooltip: { show: !ctx.preview },
        grid: ctx.preview ? { top: 14, bottom: 22, left: 30, right: 10 } : { top: 70 },
        xAxis: { type: 'category', data: data.map((d) => d.name), show: kind === 'bar' },
        yAxis: { type: 'value', show: kind === 'bar' },
        series: [
          {
            // The same id across setOption calls is what links old and new elements.
            id: 'things',
            type: kind,
            radius: kind === 'pie' ? ['20%', '65%'] : undefined,
            // On: each old bar whose childGroupId equals new items' groupId splits into
            // them on the way down, and they merge back into it on the way up.
            universalTransition: { enabled: true, divideShape: 'split' },
            animationDurationUpdate: 700,
            data,
          },
        ],
      },
      // Merge mode: the series keeps its id and only its data and type change.
    );
  };
  show('things');

  if (ctx.preview) {
    // Down two levels and back up again, on a loop.
    const path = ['things', 'animals', 'dogs', 'animals', 'things', 'fruits'];
    let i = 0;
    const stop = every(1800, () => show(path[++i % path.length]!));
    return () => {
      stop();
      dispose();
    };
  }

  chart.on('click', (params) => {
    const item = LEVELS[group]?.[params.dataIndex];
    if (item?.childGroupId) show(item.childGroupId);
  });
  // A click on empty canvas (no element) goes back up a level.
  chart.getZr().on('click', (event) => {
    if (!event.target && PARENT[group]) show(PARENT[group]!);
  });
  button(bar!, 'Up', () => PARENT[group] && show(PARENT[group]!));
  button(bar!, 'Bar ⇄ pie', () => {
    kind = kind === 'bar' ? 'pie' : 'bar';
    show(group);
  });

  return dispose;
};

export default mount;
