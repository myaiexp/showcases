// Component click events by type, id and nodeName queries
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { clickAt, eventLog, salesRows } from '../../shared/events-data.ts';

const QUERIES = ["{ level: 'model', type: 'axis' }", "{ id: 'axis-left' }", "{ nodeName: 'axis-label' }"];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, container, release } = createChart(
    el,
    ctx,
    {
      type: 'bar',
      data: [{ id: 'sales', values: salesRows }],
      xField: 'day',
      yField: 'sales',
      seriesField: 'team',
      axes: [
        // The id in the spec is what the { id } query matches.
        { id: 'axis-left', orient: 'left', type: 'linear' },
        { id: 'axis-bottom', orient: 'bottom', type: 'band' },
      ],
    } as never,
    { previewHeight: 130 },
  );
  const out = readout(el);
  const log = eventLog(out, ctx.preview ? 3 : 8);

  const handler = (e: { model?: { id?: string | number; type?: string }; event?: { target?: { name?: string } } }): void => {
    log(`click: model ${e.model?.type ?? '-'} (id ${String(e.model?.id ?? '-')}), node ${e.event?.target?.name ?? '-'}`);
  };
  const listen = (name: string): void => {
    vchart.off('click', handler as never);
    log(`listening with ${name}`);
    const query = name === QUERIES[0] ? { level: 'model', type: 'axis' } : name === QUERIES[1] ? { id: 'axis-left' } : { nodeName: 'axis-label' };
    vchart.on('click', query as never, handler as never);
  };
  listen(QUERIES[0] as string);

  // Clicks the left axis and the bottom axis in turn, at the middle of each axis' area.
  let n = 0;
  const clickAxis = (): void => {
    const axes = vchart.getChart()?.getComponentsByKey('axes') ?? [];
    const axis = axes[n++ % axes.length];
    if (!axis) return;
    const start = axis.getLayoutStartPoint();
    const rect = axis.getLayoutRect();
    if ((axis as unknown as { getSpec(): { orient?: string } }).getSpec().orient === 'left') {
      // A vertical axis: aim at the label of the value 20, just left of the axis line.
      const y = vchart.convertValueToPosition(20, { axisId: 'axis-left' }, true);
      clickAt(container, start.x + rect.width - 12, typeof y === 'number' ? y : start.y + rect.height / 2);
    } else {
      clickAt(container, start.x + rect.width / 2, start.y + rect.height / 2);
    }
  };

  let released = false;
  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1100, () => {
      if (released) return;
      i += 1;
      if (i % 4 === 1) listen(QUERIES[Math.floor(i / 4) % 3] as string);
      clickAxis();
    });
  } else if (bar) {
    select(bar, 'query', QUERIES, listen);
    const b = document.createElement('button');
    b.textContent = 'Click an axis from code';
    b.addEventListener('click', clickAxis);
    bar.append(b);
    log('Axis events are on by default; click either axis.');
  }

  return () => {
    released = true;
    stop();
    vchart.off('click', handler as never);
    release();
  };
};

export default mount;
