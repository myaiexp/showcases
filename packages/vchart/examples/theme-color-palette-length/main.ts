// A data palette array applied in order and repeated
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';

const PALETTE = ['#FF6B6B', '#4ECDC4', '#F7DC6F', '#7568D9', '#5383F4'];

const rows = (n: number): { type: string; value: number }[] =>
  Array.from({ length: n }, (_, i) => ({ type: `group ${i + 1}`, value: 30 + ((i * 17) % 40) }));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(
    el,
    ctx,
    {
      type: 'bar',
      data: [{ id: 'groups', values: rows(5) }],
      xField: 'type',
      yField: 'value',
      seriesField: 'type',
      // Five colours: the sixth group starts the palette again.
      theme: { colorScheme: { default: PALETTE } },
      legends: { visible: !ctx.preview },
    } as never,
  );
  let released = false;
  const setCount = (n: number): void => {
    if (!released) void vchart.updateData('groups', rows(n));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let n = 5;
    stop = every(1500, () => {
      n = n >= 10 ? 3 : n + 1;
      setCount(n);
    });
  } else if (bar) {
    slider(bar, 'groups', [2, 14, 1], 5, setCount);
  }

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
