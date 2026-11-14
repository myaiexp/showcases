// query.onResize and a spec callback in a media action
import { registerMediaQuery } from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, readout, select } from '../../shared/chart.ts';
import { ELEMENT_ROWS, setSize, shrinkLoop } from '../../shared/adapt-data.ts';

const SIZES: Record<string, [number, number]> = { 'wide and tall': [0, 380], 'wide and short': [0, 200], 'narrow and tall': [300, 380], 'narrow and short': [300, 200] };

const mount: Mount = (el, ctx) => {
  registerMediaQuery();

  const bar = ctx.preview ? null : controlBar(el);
  const wide = Math.max(el.clientWidth || 600, 320);
  const tall = ctx.preview ? 200 : 380;
  const short = ctx.preview ? 120 : 200;
  const log: string[] = [];
  const out = bar ? readout(el) : null;
  const { container, release } = createChart(
    el,
    ctx,
    {
      type: 'rose',
      data: [{ id: 'elements', values: ELEMENT_ROWS }],
      valueField: 'value',
      categoryField: 'type',
      seriesField: 'type',
      outerRadius: 0.85,
      legends: { visible: !ctx.preview },
      media: [
        {
          // A callback instead of minWidth/maxWidth: it runs on every resize and returns the match.
          query: {
            onResize: (info: { width: number; height: number }) => {
              const hit = info.width < info.height * 1.6;
              log.unshift(`onResize ${Math.round(info.width)} x ${Math.round(info.height)} -> ${hit}`);
              if (out) out.textContent = log.slice(0, 5).join('\n');
              return hit;
            },
          },
          action: [
            {
              filterType: 'legends',
              // The action's spec as a callback: it receives the matched models and returns the change.
              spec: () => ({ visible: false }),
            },
            { filterType: 'chart', spec: { padding: 4 } },
            { filterType: 'rose', spec: { innerRadius: 0.4 } },
          ],
        },
      ],
    } as never,
    { previewHeight: tall },
  );
  if (!ctx.preview) setSize(container, 'width', wide);

  let stop = (): void => {};
  if (ctx.preview) {
    stop = shrinkLoop(container, 'height', tall, short, 2400);
  } else if (bar) {
    select(bar, 'chart size', Object.keys(SIZES), (name) => {
      const [w, h] = SIZES[name] ?? [0, 380];
      setSize(container, 'width', w || wide);
      setSize(container, 'height', h);
    });
  }

  return () => {
    stop();
    release();
  };
};

export default mount;
