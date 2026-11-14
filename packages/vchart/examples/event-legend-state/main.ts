// Legend click and hover events, with updateState on hover
import type { Mount } from '@/types.ts';
import { createChart, every, readout } from '../../shared/chart.ts';
import { clickAt, eventLog } from '../../shared/events-data.ts';
import { pick } from '../../shared/components-data.ts';

const TYPES = ['oxygen', 'silicon', 'aluminum', 'iron'];
const rows = TYPES.map((type, i) => ({ type, value: [46, 28, 14, 12][i] }));

const mount: Mount = (el, ctx) => {
  const { vchart, container, release } = createChart(
    el,
    ctx,
    {
      type: 'pie',
      data: [{ id: 'elements', values: rows }],
      valueField: 'value',
      categoryField: 'type',
      outerRadius: 0.85,
      innerRadius: 0.4,
      legends: { visible: true, orient: 'bottom', padding: 4 },
      // The custom state the hover handler switches on; the other slices fade.
      pie: { state: { legend_hover_reverse: { fillOpacity: 0.25 } } },
    } as never,
    { previewHeight: 150 },
  );
  const out = readout(el);
  const log = eventLog(out, ctx.preview ? 3 : 8);

  // The pattern of Event.md: on hover, read the item's name and mark every other datum.
  vchart.on('legendItemHover', (e) => {
    const name = (e as { value?: { data?: { label?: string } } }).value?.data?.label;
    log(`legendItemHover: ${name ?? '-'}`);
    if (name) void vchart.updateState({ legend_hover_reverse: { filter: (d: { type: string }) => d.type !== name } } as never);
  });
  vchart.on('legendItemUnHover', () => {
    log('legendItemUnHover');
    void vchart.updateState({ legend_hover_reverse: { filter: () => false } } as never);
  });
  vchart.on('legendItemClick', (e) => log(`legendItemClick: still selected ${JSON.stringify((e as { value?: string[] }).value)}`));

  let released = false;
  let stop = (): void => {};
  if (ctx.preview) {
    // Hover cannot be fired from code, so the card drives the same custom state directly and
    // clicks the legend items to toggle them (which does fire legendItemClick).
    let i = 0;
    stop = every(900, () => {
      if (released) return;
      i += 1;
      const name = pick(TYPES, i);
      void vchart.updateState({ legend_hover_reverse: { filter: (d: { type: string }) => d.type !== name } } as never);
      if (i % 5 === 0) {
        const legend = vchart.getChart()?.getComponentsByKey('legends')[0];
        const start = legend?.getLayoutStartPoint();
        const rect = legend?.getLayoutRect();
        if (start && rect) clickAt(container, start.x + rect.width * 0.2, start.y + rect.height / 2);
      }
    });
  } else log('Hover or click the legend items.');

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
