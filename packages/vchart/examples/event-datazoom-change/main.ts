// dataZoomChange: start, end and values as the window moves
import type { Mount } from '@/types.ts';
import { createChart, readout } from '../../shared/chart.ts';
import { slideWindow, walk } from '../../shared/components-data.ts';

interface ZoomEvent {
  value?: { start: number; end: number; startValue: string | number; endValue: string | number; newDomain?: unknown[] };
}

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(
    el,
    ctx,
    {
      type: 'line',
      data: [{ id: 'walk', values: walk(60) }],
      xField: 'x',
      yField: 'y',
      point: { visible: false },
      dataZoom: [{ orient: 'bottom', start: 0.1, end: 0.4, height: 22 }],
      axes: [{ orient: 'bottom', label: { visible: !ctx.preview } }, { orient: 'left' }],
    } as never,
    { previewHeight: 160 },
  );
  const out = readout(el);
  const pct = (n: number): string => `${(n * 100).toFixed(0)}%`;
  vchart.on('dataZoomChange', (e) => {
    const v = (e as ZoomEvent).value;
    if (v) out.textContent = `dataZoomChange: ${pct(v.start)} - ${pct(v.end)}\nvalues ${v.startValue} - ${v.endValue}, ${v.newDomain?.length ?? 0} categories in view`;
  });

  // The window is slid from code with setStartAndEnd on the dataZoom component; dragging works in the full view.
  const stop = slideWindow(vchart, 'dataZoom', 0.3, 120);

  return () => {
    stop();
    release();
  };
};

export default mount;
