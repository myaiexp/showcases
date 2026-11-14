// spec.animation: false turns every animation off; true brings them back
import type { Mount } from '@/types.ts';
import { weekdayRows } from '../../shared/anim-data.ts';
import { controlBar, createChart, every } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  let animated = true;
  const spec = () => ({
    type: 'bar' as const,
    data: [{ id: 'sales', values: weekdayRows(1) }],
    xField: 'day',
    yField: 'sales',
    animation: animated,
    title: { visible: true, text: animated ? 'animation: true' : 'animation: false', textStyle: { fontSize: ctx.preview ? 12 : 16 } },
  });
  const chart = createChart(el, ctx, spec());
  if (!ctx.preview) {
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = true;
    box.addEventListener('change', () => {
      animated = box.checked;
      void chart.vchart.updateSpec(spec());
    });
    const label = document.createElement('label');
    label.append(box, ' animation');
    controlBar(el).append(label);
    el.insertBefore(el.lastElementChild as Element, chart.container);
  }
  let i = 1;
  let n = 0;
  let alive = true;
  const stop = every(1800, () => {
    if (!alive) return;
    if (ctx.preview && ++n % 3 === 0) {
      animated = !animated;
      void chart.vchart.updateSpec(spec());
    }
    void chart.vchart.updateData('sales', weekdayRows(++i));
  });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
